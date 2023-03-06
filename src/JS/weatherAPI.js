const weatherWidget = document.querySelector('.weather');
const API_KEY = 'fccf2d671c66d0d845cceb32d377da4e';

const date = new Date();
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const year = date.getFullYear();
const day = ('0' + date.getDate()).slice(-2);
const month = months[date.getMonth()];
const currentDate = `${day} ${month} ${year}`;

function getWeather() {
  console.log(navigator.geolocation);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showDonetsk);
  }
}

async function showPosition(pos) {
  console.log('1');
  const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&exclude=hourly,daily&appid=${API_KEY}`;

  const requestOn = await fetch(`${URL}`);
  const result = await requestOn.json();

  if (requestOn.ok) {
    renderWeather(result);
  } else {
    console.log(requestOn.message);
  }
  console.log(
    'Latitude: ' + pos.coords.latitude + ', Longitude: ' + pos.coords.longitude
  );
}

async function showDonetsk() {
  const DonetskWeather = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=london&exclude=hourly,daily&appid=${API_KEY}`;
  const requestDonetsk = await fetch(`${DonetskWeather}`);
  const resultDonetsk = await requestDonetsk.json();
  if (requestDonetsk.ok) {
    renderWeather(resultDonetsk);
  }
}

function renderWeather(data) {
  const temp = Math.round(data.main.temp);
  const location = data.name;
  const statusWeather = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const currentDay = days[date.getDay()];

  const template = `<div class="weather__forecast-day">
          <div class="weather__temp-wrapper">
            <span class="weather__temp">${temp}°</span>
          </div>

          <div class="weather__forecast-day-wrapper">
            <div class="weather__sky">${statusWeather}</div>
            <div class="weather__place">
              <svg class="weather__place-icon">
                <use href="./images/icons.svg#place-weather"></use>
              </svg>
              <span class="weather__place-text">${location}</span>
            </div>
          </div>
        </div>
        <!-- * Іконка погоди -->
        <!-- & Варіант зображення для тегу  div -->
        <!-- <div class="weather__img"></div> -->
        <!-- & Варіант зображення для тегу img -->
        <img src="http://openweathermap.org/img/wn/${weatherIcon}@4x.png" class="weather__img" />
        <!-- */ Іконка погоди -->

        <!-- Нижня частина погоди -->
        <div class="weather__bottom-wrapper">
          <div class="weather__wrapper-date">
            <span class="weather__week-day">${currentDay}</span>
            <span class="weather__date-today">${currentDate}</span>
          </div>
          <!-- <div class="weather__forecast-week"> -->
          <a href="" class="weather__link">Weather for week</a>
          <!-- </div> -->
        </div>`;

  return (weatherWidget.innerHTML = template);
}

if (weatherWidget) {
  getWeather();
}

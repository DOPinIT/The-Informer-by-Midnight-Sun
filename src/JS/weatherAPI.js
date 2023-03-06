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

  const template = `        
                <div class="weather__forecast-day">
          <div class="weather__temp-wrapper">
            <span class="weather__temp">${temp}°</span>
          </div>

          <div class="weather__forecast-day-wrapper">
            <div class="weather__sky">${statusWeather}</div>
            <div class="weather__place">
              <svg class="weather__place-icon">
<svg 
<symbol id="place-weather" viewBox="0 0 32 32">
<path d="M16 2c-2.916 0.003-5.712 1.163-7.774 3.226s-3.222 4.858-3.226 7.774c-0.003 2.383 0.775 4.702 2.216 6.6 0 0 0.3 0.395 0.349 0.452l8.435 9.948 8.439-9.953c0.044-0.053 0.345-0.447 0.345-0.447l0.001-0.003c1.44-1.897 2.218-4.215 2.215-6.597-0.003-2.916-1.163-5.712-3.226-7.774s-4.858-3.222-7.774-3.226zM16 17c-0.791 0-1.564-0.235-2.222-0.674s-1.171-1.064-1.473-1.795c-0.303-0.731-0.382-1.535-0.228-2.311s0.535-1.489 1.095-2.048 1.272-0.94 2.048-1.095c0.776-0.154 1.58-0.075 2.311 0.228s1.356 0.815 1.795 1.473c0.44 0.658 0.674 1.431 0.674 2.222-0.001 1.060-0.423 2.077-1.173 2.827s-1.767 1.172-2.827 1.173z"></path>
</symbol>
</svg>
              </svg>
              <span class="weather__place-text">${location}</span>
            </div>
          </div>
        </div>
        <!-- * Іконка погоди -->
        <!-- & Варіант зображення для тегу  div -->
        <!-- <div class="weather__img"></div> -->
        <!-- & Варіант зображення для тегу img -->
        <img src="http://openweathermap.org/img/wn/${weatherIcon}@4x.png" alt="weather-icon" class="weather__img" />
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
        </div>        `;

  return (weatherWidget.innerHTML = template);
}

if (weatherWidget) {
  getWeather();
}

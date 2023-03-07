// make response markup
import DateTimestamp from './DateTimestamp';

/* обработка запроса по категории */
export function sectionResponseMarkup(responses) {
  const responseMarkup = responses.reduce((acc, response) => {
    const {
      multimedia: imageURL,
      material_type_facet: category,
      title,
      abstract: description,
      published_date: pubDate,
      url: pubURL,
    } = response;

    return (
      acc +
      markup(
        imageURL[2].url,
        category,
        title,
        description,
        DateTimestamp.createTimestamp(new Date(pubDate).getTime(), '/'),
        pubURL
      )
    );
  }, '');

  return responseMarkup;
}
/* обработка запроса "наиболее популярные статьи" */
export function favoriteResponseMarkup(responses) {
  const responseMarkup = responses.reduce((acc, response) => {
    const {
      media,
      section: category,
      title,
      abstract: description,
      published_date: pubDate,
      url: pubURL,
    } = response;
    let imgURL = media.length === 0 ? '' : media[0]['media-metadata'][2].url;
    acc.push(
      markup(
        imgURL,
        category,
        title,
        description,
        DateTimestamp.createTimestamp(new Date(pubDate).getTime(), '/'),
        pubURL
      )
    );
    return acc;
  }, []);

  const weather = '<li class="card__item weather"></li>';
  const screenWidth = screen.width;

  if (screenWidth >= 1280) {
    responseMarkup.splice(2, 0, weather);
  } else if (screenWidth >= 768 && screenWidth < 1280) {
    responseMarkup.splice(1, 0, weather);
  } else if (screenWidth < 768) {
    responseMarkup.splice(0, 0, weather);
  }

  return responseMarkup.join('');
}

/* обработка запроса по поиску */
export function searchResponseMarkup(responses) {
  const responseMarkup = responses.reduce((acc, response) => {
    const {
      multimedia,
      section_name: category,
      headline: { print_headline: title },
      snippet: description,
      pub_date: pubDate,
      web_url: pubURL,
    } = response;

    const imageURL =
      multimedia.length === 0
        ? ''
        : `https://www.nytimes.com/${multimedia[0].url}`;

    return (
      acc +
      markup(
        imageURL,
        category,
        title,
        description,
        DateTimestamp.createTimestamp(new Date(pubDate).getTime(), '/'),
        pubURL
      )
    );
  }, '');

  return responseMarkup;
}

function markup(imageURL, category, title, description, pubDate, pubURL) {
  let newDescription = description;
  if (newDescription.length > 112) {
    newDescription = `${newDescription.slice(0, 112)}...`;
  }

  return `
<li class="card__item">
        <!-- position: relative -->
        <div class="card__img-box">
          <div class="card__img" style="background-image: url('${imageURL}');"></div>
          
          <!-- position: absolute -->
          <div class="plate plate--category-name">
            <!-- textContent міняється у JS в залежності від категорії: -->
            <span class="plate__text--category-name">${category}</span>
          </div>

          <div class="plate plate--already-read">
            <span class="plate__text--already-read">Already read</span>
            <svg class="plate__icon--already-read">
              <use href="./images/icons.svg#already-read"></use>
            </svg>
          </div>

          <!-- Додавання до обраного: -->
          <button class="plate plate--add-to-favorite">
            Add to favorite
            <!-- <span class="plate__text--add-to-favorite">Add to favorite</span> -->
            <svg class="plate__icon--add-to-favorite">
              <use
                class="set-favorite"
                href="./images/icons.svg#heart-border"
              ></use>
              <!-- <use
                class="in-favorite"
                href="./images/icons.svg#heart-fill"
              ></use> -->
            </svg>
          </button>
          <!--/ position: absolute -->
        </div>
        <!--/ position: relative -->

        <div class="card__info-box">
          <h2 class="card__title">${title}</h2>
          <p class="card__description">${newDescription}</p>
          <div class="card__info-box-wrapper">
            <p class="card__date">${pubDate}</p>

            <!-- посиланння на новину: -->
            <a href="${pubURL}" class="card__read-more" target="_blank">Read more</a>
          </div>
        </div>
      </li>



      
      `;
}

/* рисуем календарь */

function calendarMarkup() {
  const calendar = `
   <!-- Погода - Третя дитина на початковому екрані -->
      <li class="card__item weather">
        <!-- position: relative -->
        <div class="weather__forecast-day">
          <div class="weather__temp-wrapper">
            <span class="weather__temp">23°</span>
          </div>

          <div class="weather__forecast-day-wrapper">
            <div class="weather__sky">Sunny</div>
            <div class="weather__place">
              <svg class="weather__place-icon">
                <use href="./images/icons.svg#place-weather"></use>
              </svg>
              <span class="weather__place-text">West Jakarta</span>
            </div>
          </div>
        </div>
        <!-- * Іконка погоди -->
        <!-- & Варіант зображення для тегу  div -->
        <!-- <div class="weather__img"></div> -->
        <!-- & Варіант зображення для тегу img -->
        <img src="./images/test-sun-w165.png" alt="sun" class="weather__img" />
        <!-- */ Іконка погоди -->

        <!-- Нижня частина погоди -->
        <div class="weather__bottom-wrapper">
          <div class="weather__wrapper-date">
            <span class="weather__week-day">Mon</span>
            <span class="weather__date-today">21 Jan 2021</span>
          </div>
          <!-- <div class="weather__forecast-week"> -->
          <a href="" class="weather__link">Weather for week</a>
          <!-- </div> -->
        </div>
      </li>`;

  return calendar;
}

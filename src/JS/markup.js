// make response markup
import DateTimestamp from './DateTimestamp';

/* обработка запроса по категории */
export function sectionResponseMarkup(responses) {
  const responseMarkup = responses.reduce((acc, response) => {
    const {
      thumbnail_standard: imageURL,
      material_type_facet: category,
      title,
      abstract: description,
      published_date: pubDate,
      url: pubURL,
    } = response;

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
    let imgURL = media.length === 0 ? '' : media[0]['media-metadata'][0].url;
    return (
      acc +
      markup(
        imgURL,
        category,
        title,
        description,
        DateTimestamp.createTimestamp(new Date(pubDate).getTime(), '/'),
        pubURL
      )
    );
  }, '');

  console.log(responseMarkup);
  return responseMarkup;
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

  return `<li class="card__item">
        <!-- position: relative -->
        <div class="card__img-box">
          <div class="card__img">
          <img
          class="card__img"
          src="${imageURL}"
          alt=""
          loading="lazy"
        />
          </div>
          
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
          <div class="plate plate--add-to-favorite">
            <span class="plate__text--add-to-favorite">Add to favorite</span>
            <svg class="plate__icon--add-to-favorite">
              <use class="non-favorite" href="./images/icons.svg#heart-border"></use>
              <use class="in-favorite" href="./images/icons.svg#heart-fill"></use>
            </svg>
          </div>
          <!--/ position: absolute -->
        </div>
        <!--/ position: relative -->

        <div class="card__info-box">
          <h2 class="card__title">
            ${title}
          </h2>
          <p class="card__description">
            ${newDescription}
          </p>
          <div class="card__info-box-wrapper">
            <p class="card__date">${pubDate}</p>

            <!-- посиланння на новину: -->
            <a href="${pubURL}" class="card__read-more">Read more</a>
          </div>
        </div>
      </li>`;
}

// make request markup

function sectionRequestMarkup() {}
function searchRequestMarkup() {}
function favoriteRequestMarkup(articlesList) {}

function markup(imageURL, category, title, description, pubDate, pubURL) {
  let newDescription = description;
  if (newDescription.length > 112) {
    newDescription = `${newDescription.slice(0, 112)}...`;
  }

  return `<li class="card__item">
        <!-- position: relative -->
        <div class="card__img-box">
          <di class="card__img">
          <img
          class="card__img"
          src=${imageURL}
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
            ${newDescription}...
          </p>
          <div class="card__info-box-wrapper">
            <p class="card__date">${pubDate}</p>

            <!-- посиланння на новину: -->
            <a href=${pubURL} class="card__read-more">Read more</a>
          </div>
        </div>
      </li>`;
}

// * Зчитування localStorage Favorite
export function getFavoriteArr() {
  const favoriteStr = localStorage.getItem('favorites');
  const favoriteArr = JSON.parse(favoriteStr) || [];
  return favoriteArr;
}
// */ Зчитування localStorage Favorite

// * Функція додає іконку до тих карток, що вже є у localStorage
export function firstDownloading(favoriteArr) {
  const cards = document.querySelectorAll('.card__title');

  // якщо масив не пустий
  if (favoriteArr.length) {
    // Встановлюю клас .is-active, якщо така картка є у localStorage
    for (let i = 0; i < favoriteArr.length; i += 1) {
      for (let j = 0; j < cards.length; j += 1) {
        const accord =
          favoriteArr[i].title.trim() === cards[j].textContent.trim();
        if (accord) {
          cards[j].closest('.card__item').classList.add('is-active');
        }
      }
    }
  }
}
// */ Функція додає іконку до тих карток, що вже є у localStorage

// * Додавання в обране
const favoriteArr = getFavoriteArr();

// Якщо ми на favorite, то розмітка:
if (document.body.classList.contains('favorite')) {
  const cards = document.querySelector('.gallery');
  cards.innerHTML = markupFavorite(favoriteArr);
}

// Вішаю слухача на всю галерею
const placeToFavorite = document.querySelector('.card');
if (placeToFavorite) {
  placeToFavorite.addEventListener('click', toggleToFavorite);
}

firstDownloading(favoriteArr); // при оновленні сторінки

function toggleToFavorite(e) {
  // Якщо клік не по add to favorite (іконка, або кнопка), то виходимо
  if (
    !e.target.classList.contains('plate--add-to-favorite') &&
    !e.target.classList.contains('plate__icon--add-to-favorite') &&
    !e.target.classList.contains('set-favorite')
  ) {
    return;
  }

  // інакше виконуємо дії
  // Замальовуємо іконку серця add-to-favorite
  const currentCardItem = e.target.closest('.card__item');
  currentCardItem.classList.toggle('is-active');

  // Селектори для подальшого запису картки в масив
  // imageURL, category, title, description, pubDate, pubURL
  // ~imageURL
  const currentCardImg = currentCardItem.querySelector('.card__img');
  // отримую обчислений стиль background-image
  const currentCardImgStyles = window.getComputedStyle(currentCardImg);
  // видаляю непотрібні символи з url (одинарні та подвійні лапки)
  const currentCardImgUrl = currentCardImgStyles.backgroundImage
    .match(/\((.*?)\)/)[1]
    .replace(/('|")/g, '');
  // ~/ imageURL

  const currentCardCategory = currentCardItem.querySelector(
    '.plate__text--category-name'
  );
  const currentCardTitle = currentCardItem.querySelector('.card__title');
  const currentCardDescription =
    currentCardItem.querySelector('.card__description');
  const currentCardDate = currentCardItem.querySelector('.card__date');
  const currentCardUrl = currentCardItem.querySelector('.card__read-more');

  // шукаю по title:
  let indexEl = -1; // початкове значення - title не знайдений
  for (let i = 0; i < favoriteArr.length; i += 1) {
    if (favoriteArr[i].title === currentCardTitle.textContent.trim()) {
      indexEl = i;
      break;
    }
  }

  if (indexEl === -1) {
    favoriteArr.push({
      imgUrl: currentCardImgUrl,
      category: currentCardCategory.textContent.trim(),
      title: currentCardTitle.textContent.trim(),
      description: currentCardDescription.textContent.trim(),
      date: currentCardDate.textContent.trim(),
      newsUrl: currentCardUrl.href,
    });
    localStorage.setItem('favorites', JSON.stringify(favoriteArr));
  } else {
    favoriteArr.splice(indexEl, 1);
    localStorage.setItem('favorites', JSON.stringify(favoriteArr));
  }

  // // Перемальовую розмітку після кожної зміни localStorage:
  if (document.body.classList.contains('favorite')) {
    window.location.reload();
    markupFavorite(favoriteArr);
  }
}
// */ Додавання в обране

// * Розмітка у favorite
function markupFavorite(favoriteArr) {
  return favoriteArr
    .map(
      ({
        imgUrl: imageURL,
        category,
        title,
        description,
        date: pubDate,
        newsUrl: pubURL,
      }) => {
        let newDescription = description || '';
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
            <!-- <span class="plate__text--add-to-favorite"></span> -->
            <svg class="plate__icon--add-to-favorite on-favorite">
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

            <!-- посилання на новину: -->
            <a href="${pubURL}" class="card__read-more">Read more</a>
          </div>
        </div>
      </li>`;
      }
    )
    .join('');
}
// */ Розмітка у favorite

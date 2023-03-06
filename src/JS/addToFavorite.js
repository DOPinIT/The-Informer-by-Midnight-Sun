// * Функція зчитування favorites-localStorage при оновленні сторінки
function firstDownloading(favoriteArr) {
  const cards = document.querySelectorAll('.card__title');

  // якщо масив не пустий^
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
// */ Функція зчитування favorites-localStorage при оновленні сторінки

// * Додавання в обране
const favoriteStr = localStorage.getItem('favorites');
const favoriteArr = JSON.parse(favoriteStr) || [];

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
  const currentCardCategory = currentCardItem.querySelector(
    '.plate__text--category-name'
  );
  const currentCardTitle = currentCardItem.querySelector('.card__title');
  const currentCardDescription =
    currentCardItem.querySelector('.card__description');
  const currentCardDate = currentCardItem.querySelector('.card__date');

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
      category: currentCardCategory.textContent.trim(),
      title: currentCardTitle.textContent.trim(),
      description: currentCardDescription.textContent.trim(),
      date: currentCardDate.textContent.trim(),
    });
    localStorage.setItem('favorites', JSON.stringify(favoriteArr));
  } else {
    favoriteArr.splice(indexEl, 1);
    localStorage.setItem('favorites', JSON.stringify(favoriteArr));
  }
}
// */ Додавання в обране

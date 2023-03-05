// * Доавання в обране - заготовка
const placeToFavorite = document.querySelector('.plate--add-to-favorite') || '';
console.log('placeToFavorite:', placeToFavorite);

if (placeToFavorite) {
  placeToFavorite.addEventListener('click', toggleToFavorite);
}

function toggleToFavorite() {
  const markFavorite = document.querySelector('.plate__icon--add-to-favorite');
  markFavorite.classList.toggle('is-favorite');
  // + додати запис заголовка в буфер сторінки
  faforites.push();
}

// function addToFavorites(params) {}
// const favorites = [];

// localStorage.setItem('favorites', JSON.stringify(favorites));

// */ Доавання в обране - заготовка

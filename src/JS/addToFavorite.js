// * Доавання в обране - заготовка
const plateFavorite = document.querySelector('.plate--add-to-favorite') || '';
if (plateFavorite) {
  plateFavorite.addEventListener('click', toggleToFavorite);
}

function toggleToFavorite() {
  const markFavorite = document.querySelector('.plate__icon--add-to-favorite');
  markFavorite.classList.toggle('is-favorite');
  // + додати запис заголовка в буфер сторінки
}
// */ Доавання в обране - заготовка

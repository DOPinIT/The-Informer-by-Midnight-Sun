import NewsApi from './newsAPI';
import getWeather from './weatherAPI';
import debounce from 'lodash.debounce';
import { favoriteResponseMarkup } from './markup';
import { firstDownloading, getFavoriteArr } from './addToFavorite';

const cardList = document.querySelector('.card');
const newsRequest = new NewsApi();
let screenWidth = window.innerWidth;
let baseFavoriteMarkup = [];

newsRequest
  .getMostViewedArticles()
  .then(response => {
    //получаем массив карточек
    const responseMarkup = favoriteResponseMarkup(response);
    //сохраняем его в базовую переменную
    baseFavoriteMarkup = [...responseMarkup];
    //получаем финальную разметку
    cardList.innerHTML = getFavoritePageMarkup(responseMarkup);
    getWeather();
    // додаю іконки сердець до необхідних карток
    firstDownloading(getFavoriteArr());
  })
  .catch(error => console.log(error.message));

function getFavoritePageMarkup(responseMarkup) {
  adaptationFromScreenWidth(responseMarkup);
  return responseMarkup.join('');
}

window.addEventListener('resize', debounce(markupOptimizer, 100));

function markupOptimizer() {
  screenWidth = window.innerWidth;
  const favoriteMarkup = [...baseFavoriteMarkup];
  adaptationFromScreenWidth(favoriteMarkup);
  cardList.innerHTML = favoriteMarkup.join('');
  getWeather();
  // додаю іконки сердець до необхідних карток
  firstDownloading(getFavoriteArr());
}

function adaptationFromScreenWidth(responseArray) {
  const weather = '<li class="card__item weather"></li>';

  if (screenWidth >= 1280) {
    responseArray.splice(2, 0, weather);
  } else if (screenWidth >= 768 && screenWidth < 1280) {
    responseArray.splice(1, 0, weather);
  } else if (screenWidth < 768) {
    responseArray.splice(0, 0, weather);
  }
}

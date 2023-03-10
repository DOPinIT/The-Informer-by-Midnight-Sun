import NewsApi from './newsAPI';
import getWeather from './weatherAPI';
import debounce from 'lodash.debounce';
import { favoriteResponseMarkup } from './markup';
import { firstDownloading, getFavoriteArr } from './addToFavorite';
import { checkStorage, load } from './saveToRead';
import Loading from './loading';

const cardList = document.querySelector('.card');
const newsRequest = new NewsApi();
let screenWidth = window.innerWidth;
let baseFavoriteMarkup = [];
const loading = new Loading();

newsRequest
  .getMostViewedArticles()
  .then(response => {
    //получаем массив карточек
    loading.open(cardList);
    const responseMarkup = favoriteResponseMarkup(response);
    //сохраняем его в базовую переменную
    baseFavoriteMarkup = [...responseMarkup];
    //получаем финальную разметку
    setTimeout(() => {
      loading.closed(cardList);
      cardList.innerHTML = getFavoritePageMarkup(responseMarkup);
      getWeather();
      const favoriteArr = getFavoriteArr();
      if (favoriteArr) {
        firstDownloading(favoriteArr);
      }
      const read = load('read');
      if (read) {
        checkStorage(read);
      }
    }, 200);
    /* cardList.innerHTML = getFavoritePageMarkup(responseMarkup); */
    // додаю іконки сердець до необхідних карток
  })
  .catch(error => console.log(error.message));

function getFavoritePageMarkup(responseMarkup) {
  adaptationFromScreenWidth(responseMarkup);
  return responseMarkup.join('');
}

window.addEventListener('resize', debounce(markupOptimizer, 100));

function markupOptimizer(e) {
  cardList.innerHTML = '';
  loading.open(cardList);

  screenWidth = e.currentTarget.innerWidth;
  const favoriteMarkup = [...baseFavoriteMarkup];
  /* baseFavoriteMarkup = [...favoriteMarkup]; */
  adaptationFromScreenWidth(favoriteMarkup);
  setTimeout(() => {
    loading.closed(cardList);
    cardList.innerHTML = favoriteMarkup.join('');
    getWeather();
    // додаю іконки сердець до необхідних карток
    const favoriteArr = getFavoriteArr();
    if (favoriteArr) {
      firstDownloading(favoriteArr);
    }
    const read = load('read');
    if (read) {
      checkStorage(read);
    }
  }, 400);
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

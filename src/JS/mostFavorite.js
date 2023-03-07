import NewsApi from './newsAPI';
import getWeather from './weatherAPI';
import { favoriteResponseMarkup } from './markup';
import { firstDownloading, getFavoriteArr } from './addToFavorite';

const cardList = document.querySelector('.card');
const newsRequest = new NewsApi();

const favoriteArr001 = getFavoriteArr();

newsRequest
  .getMostViewedArticles()
  .then(response => {
    cardList.innerHTML = favoriteResponseMarkup(response);
    getWeather();
    // додаю іконки сердець до необхідних карток
    firstDownloading(favoriteArr001);
  })
  .catch(error => console.log(error.message));

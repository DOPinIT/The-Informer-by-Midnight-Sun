import NewsApi from './newsApi.js';
import {
  sectionResponseMarkup,
  favoriteResponseMarkup,
  searchResponseMarkup,
} from './markup';

const searchFormRef = document.getElementById('search-form');
const searchInputRef = document.querySelector('.input-submit');
const gallery = document.querySelector('.card');

searchFormRef.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  console.log(formProps.searchQuery);

  new NewsApi()
    .articleSearchList(formProps.searchQuery)
    .then(response => {
      const pageMarkup = searchResponseMarkup(response);
      gallery.insertAdjacentHTML('beforeend', pageMarkup);
    })
    .catch(error => console.log(error.message));
}

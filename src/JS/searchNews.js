import NewsApi from './newsAPI.js';
import {
  sectionResponseMarkup,
  favoriteResponseMarkup,
  searchResponseMarkup,
} from './markup';
import { markupError } from './newsFilters.js';
import Loading from './loading';

const searchFormRef = document.getElementById('search-form');
const searchInputRef = document.querySelector('.input-submit');
const gallery = document.querySelector('.card');
const pagination = document.querySelector('.tui-pagination');
const loading = new Loading();

searchFormRef.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  gallery.innerHTML = '';
  loading.open(gallery);
  pagination.classList.add('isHidden');

  new NewsApi()
    .articleSearchList(formProps.searchQuery)
    .then(response => {
      loading.closed(gallery);
      if (response.length == 0) {
        gallery.innerHTML = markupError(
          'We haven’t found news for this prompt'
        );
        return;
      }
      pagination.classList.remove('isHidden');
      const pageMarkup = searchResponseMarkup(response);
      gallery.insertAdjacentHTML('beforeend', pageMarkup);
    })
    .catch(error => console.log(error.message));
}

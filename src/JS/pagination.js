import Pagination from 'tui-pagination';
import NewsApi from './newsAPI';
import {
  searchResponseMarkup,
  sectionResponseMarkup,
  favoriteResponseMarkup,
} from './markup';

const newsApi = new NewsApi();
// console.log(newsApi);

const container = document.querySelector('.tui-pagination');
const gallery = document.querySelector('.card');
const searchFormRef = document.getElementById('search-form');
const searchInputRef = document.querySelector('.input-submit');

searchFormRef.addEventListener('submit', onSubmit);
let text = '';

// Пагінація по пошуку новин (вставити картинку #):

function onSubmit(e) {
  e.preventDefault();

  const currentForm = e.currentTarget;
  const queryText = currentForm.elements.searchQuery.value.trim();

  if (!queryText) {
    // взять разметку у Миши при бедзагрузке
    return;
  }

  text = queryText;

  newsApi.articleSearchList(queryText).then(response => {
    // console.log(response);
    gallery.innerHTML = searchResponseMarkup(response);
  });

  const options = {
    totalItems: 100,
    itemsPerPage: 8,
    visiblePages: 3,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      disabledMoveButton:
        '<span class="btn-hidden tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(container, options);

  pagination.on('afterMove', e => {
    // console.log(e);
    newsApi.pageNumberBySearch = e.page - 1;
    newsApi.articleSearchList(text).then(response => {
      gallery.innerHTML = searchResponseMarkup(response);
    });
  });

  pagination.on('afterMove', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
}



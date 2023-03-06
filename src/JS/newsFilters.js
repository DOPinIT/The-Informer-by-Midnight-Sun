export default getFilteredNews;
import axios from 'axios';
import NewsApi from './newsAPI';
import { sectionResponseMarkup } from './markup';

const gallery = document.querySelector('.card');

const refs = {
  categories: document.querySelector('.categories'),
  categoriesList: document.querySelector('.categories__list'),
  othersBox: document.querySelector('.categories__box'),
  iconBtnBlue: document.querySelector('.btn__icon-blue'),
  iconBtnWhite: document.querySelector('.btn__icon-white'),
  otherBtn: document.getElementById('othersBtn'),
};

let widthScreen = screen.width;

if (refs.categories) {
  getFilteredNews();

  getSectionList().then(data => {
    const ElAll = data.results.map(section => section.display_name);

    if (widthScreen > 1279) {
      const ElForCategoriesList = ElAll.slice(0, 6);
      refs.categoriesList.innerHTML =
        createElForCategoriesList(ElForCategoriesList);

      const ElForOthersBox = ElAll.slice(6, ElAll.length);
      refs.othersBox.firstElementChild.innerHTML =
        createElForOthersBox(ElForOthersBox);
      return;
    }

    if (widthScreen > 767 && widthScreen < 1280) {
      const ElForCategoriesList = ElAll.slice(0, 4);
      refs.categoriesList.innerHTML =
        createElForCategoriesList(ElForCategoriesList);

      const ElForOthersBox = ElAll.slice(4, ElAll.length);
      refs.othersBox.firstElementChild.innerHTML =
        createElForOthersBox(ElForOthersBox);
      return;
    }

    refs.othersBox.firstElementChild.innerHTML = createElForOthersBox(ElAll);
  });
}

function createElForCategoriesList(arr) {
  let markup = '';
  arr.forEach(elem => {
    markup =
      markup +
      `<li class="categories__item"><button class="categories__btn">${elem}</button></li>`;
  });
  return markup;
}

function createElForOthersBox(arr) {
  let markup = '';
  arr.forEach(elem => {
    markup =
      markup +
      `<li class="categories__item"><button class="categories__othrs-btn">${elem}</button></li>`;
  });
  return markup;
}

function getFilteredNews() {
  refs.categories.addEventListener('click', e => {
    // console.dir(e.target);
    if (e.target.nodeName === 'BUTTON') {
      if (e.target.outerText === 'Others') {
        refs.othersBox.firstElementChild.classList.toggle('isHidden');
        refs.otherBtn.classList.toggle('is-active');
        setTimeout(() => {
          closeOthersBox();
        }, 0);
        closeOthersBox();
        return;
      }

      removeTadIsActiv();

      e.target.classList.toggle('is-active');

      console.log(e.target.textContent);
      const newsApi = new NewsApi();
      newsApi
        .getNewsListBySectionName(e.target.textContent)
        .then(response => {
          if (response === null) {
            throw new Error();
          }
          gallery.innerHTML = sectionResponseMarkup(response);
        })
        .catch(() => {
          gallery.innerHTML = '';
        });
    }
  });
}

function closeOthersBox() {
  window.addEventListener(
    'click',
    e => {
      if (e.target.outerText !== 'Others') {
        // console.log("qweqwe");
        refs.otherBtn.classList.remove('is-active');
        refs.othersBox.firstElementChild.classList.add('isHidden');
      }
    },
    { once: true }
  );
}

function removeTadIsActiv() {
  document.querySelectorAll('.categories__btn').forEach(button => {
    button.classList.remove('is-active');
  });
  document.querySelectorAll('.categories__othrs-btn').forEach(button => {
    button.classList.remove('is-active');
  });
}

function getSectionList() {
  const API_KEY = 'f4MnGfOgcSDDONkk5En7THEIhywC71B5';

  const URL = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`;

  return axios(URL)
    .then(({ data }) => data)
    .catch(console.log);
}

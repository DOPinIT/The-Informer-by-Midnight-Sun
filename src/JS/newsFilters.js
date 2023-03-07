import NewsApi from "./newsAPI";
import { sectionResponseMarkup } from './markup';
import { Spinner } from 'spin.js';
import { firstDownloading, getFavoriteArr } from './addToFavorite';

const refs = {
  categories: document.querySelector(".categories"),
  categoriesList: document.querySelector(".categories__list"),
  othersBox: document.querySelector(".categories__box"),
  iconBtnBlue: document.querySelector(".btn__icon-blue"),
  iconBtnWhite: document.querySelector(".btn__icon-white"),
  otherBtn: document.getElementById("othersBtn"),
  galleryList: document.querySelector(".card"),
}

const favoriteArr001 = getFavoriteArr();

const newsApi = new NewsApi();

const target = document.getElementById('foo');

const opts = {
  lines: 10, // The number of lines to draw
  length: 49, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-more', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#4b48db', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};


if (refs.categories) {
  renderCatehoriesList();

  rendersGalleryBySelectedCategory()
}



//  //  //Рендерить розмітку для категорій.
function renderCatehoriesList() {
  newsApi.getSectionList().then(ElAll => {
    // const ElAll = data.results.map(section => section.display_name)
    let widthScreen = window.innerWidth;
    if (widthScreen > 1279) {
      const ElForCategoriesList = ElAll.slice(0, 6)
      refs.categoriesList.innerHTML = createElForCategoriesList(ElForCategoriesList);

      const ElForOthersBox = ElAll.slice(6, ElAll.length)
      refs.othersBox.firstElementChild.innerHTML = createElForOthersBox(ElForOthersBox);
      return
    }

    if (widthScreen > 767 && widthScreen < 1280) {
      const ElForCategoriesList = ElAll.slice(0, 4)
      refs.categoriesList.innerHTML = createElForCategoriesList(ElForCategoriesList);

      const ElForOthersBox = ElAll.slice(4, ElAll.length)
      refs.othersBox.firstElementChild.innerHTML = createElForOthersBox(ElForOthersBox);
      return
    }

    refs.othersBox.firstElementChild.innerHTML = createElForOthersBox(ElAll);

  })
}

//  //  //Створює елементи для головного списку. 
function createElForCategoriesList(arr) {
  let markup = "";
  arr.forEach(elem => {
    markup = markup + `<li class="categories__item"><button class="categories__btn">${elem}</button></li>`;
  })
  return markup
}

//  //  //Створює елементи для боксу. 
function createElForOthersBox(arr) {
  let markup = "";
  arr.forEach(elem => {
    markup = markup + `<li class="categories__item"><button class="categories__othrs-btn">${elem}</button></li>`;
  })
  return markup
}

//  //  //Рендер галереї по вибраній категорії. 
function rendersGalleryBySelectedCategory() {
  refs.categories.addEventListener('click', (e) => {
    if (e.target.nodeName === "BUTTON") {
      if (e.target.outerText === "Others") {
        openOthersBox()
        setTimeout(() => { closeOthersBox() }, 0)
        return
      }

      removeTadIsActiv()

      e.target.classList.toggle('is-active');
      // console.log(e.target.textContent)
      renderGaleriList(e.target.textContent)
    }
  })
}

//  //  //Відкриває бокс з додатковими категоріями. 
function openOthersBox() {
  refs.othersBox.classList.toggle('isHidden');
  refs.otherBtn.classList.toggle('is-active');
}

//  //  //Зкариває бокс з додатковими категоріями по кліку. 
function closeOthersBox() {
  window.addEventListener('click', (e) => {
    if (e.target.outerText !== "Others") {
      refs.otherBtn.classList.remove('is-active');
      refs.othersBox.classList.add('isHidden');
    }
  }, { once: true })
}

//  //  //Шукає і видаляє активну категорію. 
function removeTadIsActiv() {
  document.querySelectorAll(".categories__btn").forEach(button => {
    button.classList.remove('is-active');
  });
  document.querySelectorAll(".categories__othrs-btn").forEach(button => {
    button.classList.remove('is-active');
  })
}

function renderGaleriList(cetegorie) {
  newsApi
    .getNewsListBySectionName(cetegorie)
    .then(response => {
      if (response === null) {
        refs.galleryList.innerHTML = '';
        refs.galleryList.classList.add('isActivSpiner');
        new Spinner(opts).spin(refs.galleryList);
        setTimeout(() => {
          refs.galleryList.classList.remove('isActivSpiner');
          refs.galleryList.innerHTML = markupError();
        }, 800)


        // refs.galleryList.innerHTML = markupError();
        return
      }
      // console.log(sectionResponseMarkup(response))
      refs.galleryList.innerHTML = '';
      refs.galleryList.classList.add('isActivSpiner');
      new Spinner(opts).spin(refs.galleryList);
      setTimeout(() => {
        refs.galleryList.classList.remove('isActivSpiner');
        refs.galleryList.innerHTML = sectionResponseMarkup(response);
        firstDownloading(favoriteArr001);
      }, 400)

      // refs.galleryList.innerHTML = sectionResponseMarkup(response);
    })
    .catch(() => {
      refs.galleryList.innerHTML = '';
    });
}

function markupError() {
  return `<div class="sectionError">
    <h1 class="sectionError__title">We haven’t found news from this category</h1>
    <div class="sectionError__img"></div>
  </div>`
}



// newsApi.getNewsListBySectionName(sectionName)
//     .then(newsList => {
//         console.log(newsList);
//         if (newsList === null) {
//             throw new Error();
//         }
//         const sectionMarkup = sectionResponseMarkup(newsList);
//         console.log(sectionMarkup);
//         console.log(gallery);
//         gallery.insertAdjacentHTML('beforeend', sectionMarkup);
//     })
//     .catch(error => error.message);
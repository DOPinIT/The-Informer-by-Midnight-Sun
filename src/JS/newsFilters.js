import NewsApi from "./newsAPI";
import { sectionResponseMarkup, searchResponseMarkup } from './markup';
import { firstDownloading, getFavoriteArr } from './addToFavorite';
import Loading from "./loading";
import {checkStorage, load} from './saveToRead';

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
const loading = new Loading();


if (refs.categories) {
  renderCatehoriesList();

  getGalleryListBySelectedCategory()
}



//  //  //Рендерить розмітку для категорій.
function renderCatehoriesList() {
  newsApi.getSectionList().then(ElAll => {
    ElAll = ElAll.reduce((acc, el)=>{
      if(el.includes("&")){
        return acc
      }
      if(el.includes("/")){
        return acc
      }
      acc.push(el);
      return acc
    },[])

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



//  //  //Визиває рендер галереї по вибраній категорії. 
function getGalleryListBySelectedCategory() {
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



//  //  //Рендерить галерею (коли прийшов нулл повідомленя markupError)
function renderGaleriList(cetegorie) {
  newsApi
    .getNewsListBySectionName(cetegorie)
    .then(response => {
      if (response === null) {
        refs.galleryList.innerHTML = '';
        loading.open(refs.galleryList);
        setTimeout(() => {
          loading.closed(refs.galleryList);
          refs.galleryList.innerHTML = markupError("We haven’t found news from this category");
        }, 800)
        return
      }
      refs.galleryList.innerHTML = '';
      loading.open(refs.galleryList)
      setTimeout(() => {
        loading.closed(refs.galleryList);
        refs.galleryList.innerHTML = sectionResponseMarkup(response);

        firstDownloading(favoriteArr001);
        const readNews = load('read');
        if(readNews){
        checkStorage(readNews);
        }
      }, 300)

    })
    .catch(() => {
      refs.galleryList.innerHTML = '';
    });
}
//  //  //Шаблон (коли прийшов нулл)
export function markupError(text) {
  return `<div class="sectionError">
    <h1 class="sectionError__title">${text}</h1>
    <div class="sectionError__img"></div>
  </div>`
}



// //  // ===========

document.querySelector(".wrapper-calendar").addEventListener('click', (e)=>{
  if(e.target.nodeName ===  "LI" && Number(e.target.textContent)){

    if(new Date(document.querySelector(".select-list__btn--text").textContent).getDate() === Number(e.target.textContent)){

    let selectedDate = new Date(document.querySelector(".select-list__btn--text").textContent);
      selectedDate = selectedDate.getTime() + 8600000;

    const searchQuery = document.querySelector(".input-submit").value;
    const gallery = document.querySelector('.card');
    const pagination = document.querySelector('.tui-pagination');

      if(searchQuery !== ''){
        newsApi.articleSearchList(searchQuery, selectedDate).then(response => {
  
        gallery.innerHTML = '';
        loading.open(gallery);
        pagination.classList.add('isHidden');
      
        setTimeout(()=>{
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
        }, 300)
      })
      }
    }
  }})
// // //======
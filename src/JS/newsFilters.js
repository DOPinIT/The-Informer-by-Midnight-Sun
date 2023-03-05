export default getFilteredNews;
import NewsApi from "./newsAPI";

const refs = {
    categories: document.querySelector(".categories"),
    categoriesList: document.querySelector(".categories__list"),
    othersBox: document.querySelector(".categories__box"),
    iconBtnBlue: document.querySelector(".btn__icon-blue"),
    iconBtnWhite: document.querySelector(".btn__icon-white"),
    otherBtn: document.getElementById("othersBtn"),
}

const newsApi = new NewsApi();

if (refs.categories) {

    newsApi.getSectionList().then(ElAll => {
        // const ElAll = data.results.map(section => section.display_name)
        let widthScreen = screen.width;
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

    getFilteredNews()
}

function createElForCategoriesList(arr) {
    let markup = "";
    arr.forEach(elem => {
        markup = markup + `<li class="categories__item"><button class="categories__btn">${elem}</button></li>`;
    })
    return markup
}

function createElForOthersBox(arr) {
    let markup = "";
    arr.forEach(elem => {
        markup = markup + `<li class="categories__item"><button class="categories__othrs-btn">${elem}</button></li>`;
    })
    return markup
}

function getFilteredNews() {
    refs.categories.addEventListener('click', (e) => {
        // console.dir(e.target);
        if (e.target.nodeName === "BUTTON") {
            if (e.target.outerText === "Others") {
                refs.othersBox.classList.toggle('isHidden');
                refs.otherBtn.classList.toggle('is-active');
                setTimeout(() => { closeOthersBox() }, 0)
                closeOthersBox()
                return
            }

            removeTadIsActiv()

            e.target.classList.toggle('is-active');

            newsApi.getNewsListBySectionName(e.target.textContent);
        }
    })
}

function closeOthersBox() {
    window.addEventListener('click', (e) => {
        if (e.target.outerText !== "Others") {
            // console.log("qweqwe");
            refs.otherBtn.classList.remove('is-active');
            refs.othersBox.classList.add('isHidden');
        }
    }, { once: true })
}

function removeTadIsActiv() {
    document.querySelectorAll(".categories__btn").forEach(button => {
        button.classList.remove('is-active');
    });
    document.querySelectorAll(".categories__othrs-btn").forEach(button => {
        button.classList.remove('is-active');
    })
}
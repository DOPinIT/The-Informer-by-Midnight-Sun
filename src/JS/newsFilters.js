export default getFilteredNews;
import axios from "axios";

const refs = {
    categories: document.querySelector(".categories"),
    categoriesList: document.querySelector(".categories__list"),
    othersBox: document.querySelector(".categories__othersBox"),
    iconBtnBlue: document.querySelector(".btn__icon-blue"),
    iconBtnWhite: document.querySelector(".btn__icon-white"),
    otherBtn: document.getElementById("othersBtn"),

}

getSectionList().then(data => {
    const ElAll = data.results.map(section => section.display_name)
    console.log(ElAll.length);

    const ElForCategoriesList = ElAll.slice(0, 6)
    console.log(ElForCategoriesList);
    refs.categoriesList.innerHTML = createElForCategoriesList(ElForCategoriesList);

    const ElForOthersBox = ElAll.slice(6, 19)
    console.log(ElForOthersBox);



    console.log(categories)

})

function createElForCategoriesList(arr) {
    let markup = "";
    arr.forEach(elem => {
        markup = `<li class="categories__item"><button class="categories__btn">${elem}</button></li>` + markup
    })
    return markup
}

getFilteredNews()

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

            console.log(e.target.textContent);
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









function getSectionList() {
    const API_KEY = 'f4MnGfOgcSDDONkk5En7THEIhywC71B5';

    const URL = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`;

    return axios(URL).then(({ data }) => data).catch(console.log)
}
export default getFilteredNews;
const refs = {
    categories: document.querySelector(".categories"),
    othersBox: document.querySelector(".categories__othersBox"),
    iconBtnBlue: document.querySelector(".btn__icon-blue"),
    iconBtnWhite: document.querySelector(".btn__icon-white"),
    otherBtn: document.getElementById("othersBtn"),

}

function getFilteredNews() {
    refs.categories.addEventListener('click', (e) => {
        if (e.target.nodeName === "BUTTON" || e.target.nodeName === "svg") {
            if (e.target.nodeName === "svg") {
                e.target.parentNode.classList.toggle('is-active');
                openOthersBox()
                removeTadIsActiv()
                return
            } else if (e.target.outerText === "Others") {
                e.target.classList.toggle('is-active');
                openOthersBox()
                return
            } else if (!refs.othersBox.classList.contains('isHidden')) {
                refs.othersBox.classList.add('isHidden');
                refs.iconBtnBlue.classList.add('isHidden');
                refs.iconBtnWhite.classList.remove('isHidden');
                refs.otherBtn.classList.remove('is-active');
            }

            removeTadIsActiv()

            e.target.classList.toggle('is-active');

            console.log(e.target.textContent);
        }
    })
}



function openOthersBox() {
    refs.othersBox.classList.toggle('isHidden');
    refs.iconBtnBlue.classList.toggle('isHidden');
    refs.iconBtnWhite.classList.toggle('isHidden');
}

function removeTadIsActiv() {
    document.querySelectorAll(".categories__btn").forEach(button => {
        button.classList.remove('is-active');
    });
    document.querySelectorAll(".categories__othrs-btn").forEach(button => {
        button.classList.remove('is-active');
    })
}
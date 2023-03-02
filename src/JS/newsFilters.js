export default getFilteredNews;
const refs = {
    categories: document.querySelector(".categories"),
    othersBox: document.querySelector(".categories__othersBox"),
    iconBtnBlue: document.querySelector(".btn__icon-blue"),
    iconBtnWhite: document.querySelector(".btn__icon-white"),
    otherBtn: document.getElementById("othersBtn"),

}

getFilteredNews()

function getFilteredNews() {
    refs.categories.addEventListener('click', (e) => {
        if (e.target.nodeName === "BUTTON" || e.target.nodeName === "svg") {
            if (e.target.nodeName === "svg") {
                refs.othersBox.classList.toggle('isHidden');
                setTimeout(() => { closeOthersBox() }, 0)
                e.target.parentNode.classList.toggle('is-active');
                removeTadIsActiv()
                return
            } else if (e.target.outerText === "Others") {
                e.target.focus({ focusVisible: false });

                refs.othersBox.classList.toggle('isHidden');
                e.target.classList.toggle('is-active');
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
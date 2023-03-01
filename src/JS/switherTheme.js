const body = document.querySelector("body");
const themeSwither = document.getElementById("switch");

const darkText = document.getElementById("dark")
const lightText = document.getElementById("light")

themeSwither.addEventListener("change", (e) => {
    e.preventDefault()
    body.classList.toggle("dark-mode");
    lightText.classList.toggle("hover-text");
    lightText.classList.toggle("light-text");
    darkText.classList.toggle("dark-text");
    darkText.classList.toggle("hover-text");

})

export default { body, themeSwither, darkText, lightText }
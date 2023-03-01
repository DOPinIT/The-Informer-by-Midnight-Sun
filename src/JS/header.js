// * Перемикання на необхідну сторінку (підкреслювання під назвою меню)
// Додаю клас.menu__link--current до необхідного посилання і знімаю його з інших посилань
const current = document.querySelector('.menu__link--current');
current.classList.remove('menu__link--current');

const links = document.querySelectorAll('.menu__link');
for (let i = 0; i < links.length; i += 1) {
  if (links[i].href === window.location.href) {
    links[i].classList.add('menu__link--current');
  }
}
// */ Перемикання на необхідну сторінку (підкреслювання під назвою меню)

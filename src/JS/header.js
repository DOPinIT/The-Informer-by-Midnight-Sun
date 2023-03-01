// * Перемикання на необхідну сторінку (підкреслювання під назвою меню)
// Додаю клас.menu__link--current до необхідного посилання і знімаю його з інших посилань

const navMenu = document.querySelector('.nav');
navMenu.addEventListener('click', makeActiveLink);

function makeActiveLink(e) {
  console.log('e', e);
  console.log('e.target', e.target);
  const current = document.querySelector('.menu__link--current');
  console.log('makeActiveLink >>> current:', current);

  if (current === e.target) {
    return;
  } else {
    current.classList.remove('menu__link--current');
    e.target.classList.add('menu__link--current');
  }
}
// */ Перемикання на необхідну сторінку (підкреслювання під назвою меню)

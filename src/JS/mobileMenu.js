// * Меню в $mobile
const mobileMenu = document.querySelector('[data-nav]');
const mobileMenuBtn = document.querySelector('[data-nav-btn]');
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
  mobileMenu.classList.toggle('is-open'); // відкриває/закриває моб.меню
  mobileMenuBtn.classList.toggle('is-open'); // міняє іконку (хрестик/бургер)

  // Заборонаю/дозволяю скрол при відкритому/закритому мобільному меню:
  document.body.style.overflow =
    document.body.style.overflow === 'hidden' ? '' : 'hidden';

  // Зв'язок кнопки і відкритого/закритого меню з нею пов'язаного:
  const expanded =
    mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  mobileMenuBtn.setAttribute('aria-expanded', !expanded);
}

// Відслідковую ховер миши по menu__item:
const menuItem = document.querySelectorAll('.menu__item');
for (let i = 0; i < menuItem.length; i += 1) {
  menuItem[i].addEventListener('mouseenter', onMouseEnter);
}
function onMouseEnter(e) {
  this.classList.add('on-mouse-enter');

  this.addEventListener('mouseleave', onMouseLeave);
}
function onMouseLeave(e) {
  this.classList.remove('on-mouse-enter');
}

// & Відкриття мобільного пошуку
const searchMobileBtn = document.querySelector('.search-mobile-open');
const searchInputMobile = document.querySelector('.input-box--mobile');
const searchMobileIcon = document.querySelector('.search-mobile-open__icon');

searchMobileBtn.addEventListener('click', searchMobileOpen);
function searchMobileOpen() {
  const inputSubmitMobile = document.querySelector('.input-submit--mobile');
  inputSubmitMobile.focus(); // Фокусують на input-пошуку
  // Відслідковую втрату фокусу:
  inputSubmitMobile.addEventListener('blur', closeSearchMobile);
  searchInputMobile.classList.toggle('is-open');
  searchMobileIcon.style.visibility = 'hidden';
}

function closeSearchMobile() {
  // Закриття input-пошуку по втраті фокусу:
  searchMobileIcon.style.visibility = 'inherit';
  searchInputMobile.classList.toggle('is-open');
  document.removeEventListener('blur', closeSearchMobile);
}
// &/ Відкриття мобільного пошуку
// * Меню в $mobile

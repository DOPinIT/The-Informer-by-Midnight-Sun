// const body = document.querySelector('body');
// const themeSwither = document.getElementById('switch');

// const darkText = document.getElementById('dark');
// const lightText = document.getElementById('light');

// themeSwither.addEventListener('change', e => {
//   e.preventDefault();
//   body.classList.toggle('dark-mode');
//   lightText.classList.toggle('hover-text');
//   lightText.classList.toggle('light-text');
//   darkText.classList.toggle('dark-text');
//   darkText.classList.toggle('hover-text');
// });

// export default { body, themeSwither, darkText, lightText };

// Мій варіант перемикача:
// * Зміна теми перемиканням класу dark-them
const themeSwitch = document.querySelector('.switch-input');
themeSwitch.addEventListener('click', changeTheme2);

function changeTheme2() {
  document.body.classList.toggle('dark-theme');
  // + додати ключ у local storage по body.dark-theme
}

// */ Зміна теми перемиканням класу dark-them

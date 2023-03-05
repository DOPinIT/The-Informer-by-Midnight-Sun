import themeSwitcher from './JS/switcherTheme.js';

// * Імпорт бібліотеки повідомлень:
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'right-top',
  opacity: 0.8,
  timeout: 3000,
  clickToClose: true,
  fontSize: '16px',
});

// * Імпорт бібліотеки axios
import axios from 'axios';

// * імпорт усього вмісту файлів:
import './JS/header';
import './JS/switcherTheme'; //виправлена ппомилка в назві
import './JS/mobileMenu';
import './JS/addToFavorite';
import './JS/modalTeam';
import './JS/calendar';
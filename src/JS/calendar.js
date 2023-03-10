import Notiflix from 'notiflix';

const daysList = document.querySelector('.days');
const currentDate = document.querySelector('.current-date');
const calendarBtn = document.querySelector('.select-list__btn--calendar');
const calendarBtnText = document.querySelector('.select-list__btn--text');
const calendarBox = document.querySelector('.calendar_box');
const currentYear = document.querySelector('.current-year');
const prevNextMonthIcon = document.querySelectorAll('.month-box svg');
const prevNextIcon = document.querySelectorAll('.icons svg');

if (
  window.location.pathname.includes('/favorite.html') ||
  window.location.pathname.includes('/read.html')
) {
  return;
}

calendarBtn.addEventListener('click', openCalendar);
daysList.addEventListener('click', selectedDate);

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

function openCalendar(e) {
  if (
    e.target.classList.contains('select-list__btn--calendar') ||
    e.target.classList.contains('calendar-icon') ||
    e.target.classList.contains('select-list__btn--text') ||
    e.target.classList.contains('select-list__icon--calendar') ||
    e.target.nodeName === 'use'
  ) {
    calendarBox.classList.toggle('calendar_isHidden');
    calendarBtn.classList.toggle('is-open');
    closeCalendar();
  }

  return;
}

function closeCalendar() {
  window.addEventListener('click', e => {
    if (
      e.target.classList.contains('select-list__btn--calendar') ||
      e.target.classList.contains('select-list__icon') ||
      e.target.nodeName === 'svg' ||
      e.target.classList.contains('calendar-icon') ||
      e.target.classList.contains('select-list__btn--text') ||
      e.target.classList.contains('select-list__icon--calendar') ||
      e.target.nodeName === 'use'
    ) {
      return;
    }
    calendarBox.classList.add('calendar_isHidden');
    calendarBtn.classList.remove('is-open');
  });
}

// отримуємо сьогоднішню дату яка відображається в кнопці
function getToDay() {
  calendarBtnText.textContent = date
    .toLocaleString()
    .split(',')[0]
    .replace(/\./g, '/');
}

getToDay();

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function renderCalendar() {
  let firstDayofMonth = new Date(currYear, currMonth, 0).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth + 1, -1).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = '';

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive not-active">${
      lastDateofLastMonth - i + 1
    }</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? 'active'
        : '';

    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive-next-month not-active">${
      i - lastDayofMonth + 1
    }</li>`;
  }
  currentDate.innerHTML = `${months[currMonth]}`;
  currentYear.innerHTML = ` ${currYear}`;
  daysList.innerHTML = liTag;
}
renderCalendar();

prevNextMonthIcon.forEach(icon => {
  icon.addEventListener('click', () => {
    currMonth = icon.id === 'prev-month' ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }

    renderCalendar();
  });
});

prevNextIcon.forEach(icon => {
  icon.addEventListener('click', () => {
    currYear = icon.id === 'prev' ? currYear - 1 : currYear + 1;

    renderCalendar();
  });
});

function getWeekendDays() {
  const days = document.querySelectorAll('.days li');
  days.forEach(day => {
    const dayOfWeek = new Date(
      currYear,
      currMonth,
      parseInt(day.innerText)
    ).getDay();

    if (dayOfWeek === 6 || dayOfWeek === 0) {
      if (day.classList.contains('active')) {
        return;
      }

      day.style.color = '#5F6775';
    }
  });
}

getWeekendDays();

// отримуємо дату з календаря по кліку для її відображення в кнопці
function selectedDate(e) {
  // if (e.target.classList.contains('inactive')) {
  //   currMonth -= 1;
  // } else if (e.target.classList.contains('inactive-next-month')) {
  //   currMonth += 1;
  //   if (currMonth > date.getMonth()) {
  //     const inActiveNextMonth = document.querySelectorAll(
  //       '.inactive-next-month'
  //     );
  //     for (const month of inActiveNextMonth) {
  //       month.classList.add('inactive-next-month--block');
  //     }
  //   }
  // }

  if (
    e.target.nodeName !== 'LI' ||
    e.target.classList.contains('inactive-next-month--block')
  ) {
    return;
  }

  const clickedDate = Number(e.target.textContent);
  const selectedDate = new Date(currYear, currMonth, clickedDate);

  if (selectedDate > date) {
    getToDay();
    Notiflix.Notify.failure(
      'There is no news from the future, the time machine is under development, please choose another date.'
    );
  } else {
    const dayString = selectedDate
      .toLocaleString()
      .split(',')[0]
      .replace(/\./g, '/');
    calendarBtnText.textContent = dayString;
  }
}

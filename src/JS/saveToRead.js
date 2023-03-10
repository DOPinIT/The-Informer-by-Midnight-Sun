import {
  firstDownloading,
  getFavoriteArr,
  addListenerOnGallery,
  toggleToFavorite,
} from './addToFavorite';

const readMoreButtons = document.querySelectorAll('.card__read-more');
const newGallery = document.querySelector('.container-read');

const readNews = load('read');
checkStorage(readNews);

export function checkStorage(readNews) {
  const cards = document.querySelectorAll('.card__title');
  if (readNews) {
    for (let i = 0; i < readNews.length; i += 1) {
      for (let j = 0; j < cards.length; j += 1) {
        const approved =
          readNews[i].title.trim() === cards[j].textContent.trim();
        if (approved) {
          const cardItem = cards[j].closest('.card__item');
          addAlreadyRead(cardItem);
        }
      }
    }
  }
}

if (newGallery) {
  const dateRead = load('date-read');
  const readNews = load('read');

if (dateRead) { dateRead.forEach(date => {
    const markup = markupDateRead(date);
    newGallery.insertAdjacentHTML('beforeend', markup);
  });}

  const revisionTitles = document.querySelectorAll('.revision-title');
  for (let i = 0; i < revisionTitles.length; i++) {
    const revisionTitle = revisionTitles[i].textContent.trim();
    const matchingNews = readNews.filter(news => news.date === revisionTitle);
    if (matchingNews.length > 0) {
      const cardReadList = revisionTitles[i].nextElementSibling;
      matchingNews.forEach(news => {
        cardReadList.innerHTML += news.items;
      });
    }
  }

  document.addEventListener('click', event => {
    if (event.target.matches('.revision-title')) {
      const cardRead = event.target.nextElementSibling;
      const dateIcon = event.target.closest('.date-icon');
      if (cardRead && cardRead.style.display === 'none') {
        cardRead.style.display = 'flex';
      } else if (cardRead) {
        cardRead.style.display = 'none';
        // dateIcon.classList.add('rotated');
      }
    }
  });

  document.addEventListener('click', e => {
    if (e.target.matches('.plate--add-to-favorite')) {
      const placeToFavorite = document.querySelector('.plate--add-to-favorite');
      toggleToFavorite(e);
    }
  });

  const favoriteArr = getFavoriteArr();
  firstDownloading(favoriteArr);
}

document.addEventListener('click', event => {
  if (event.target.matches('.card__read-more')) {
    const cardItem = event.target.closest('.card__item');
    addAlreadyRead(cardItem);
    const title = cardItem.querySelector('.card__title').textContent;
    const revisionDate = formatDate(new Date());
    let items = [];

    items.push(cardItem.outerHTML);

    const storageKey = 'read';
    let storedData = JSON.parse(localStorage.getItem(storageKey));
    if (!storedData) {
      storedData = [];
    }

    const data = {
      items: items,
      title: title,
      date: revisionDate,
    };

    const existingData = storedData.find(d => d.title === title);

    if (existingData) {
      Object.assign(existingData, data);
      localStorage.setItem(storageKey, JSON.stringify(storedData));
    } else {
      storedData.push(data);
      localStorage.setItem(storageKey, JSON.stringify(storedData));
    }
    let readDates = JSON.parse(localStorage.getItem('date-read'));
    if (!readDates) {
      readDates = [];
    }

    localStorage.setItem('date-read', JSON.stringify(readDates));

    const existingDate = readDates.find(d => readDates.includes(revisionDate));

    if (existingDate) {
      Object.assign(existingDate, data);
      localStorage.setItem('date-read', JSON.stringify(readDates));
    } else {
      readDates.push(revisionDate);
      localStorage.setItem('date-read', JSON.stringify(readDates));
    }
  }
});

export function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
  }
}

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

function addAlreadyRead(li) {
  const plateAlreadyRead = li.querySelector('.plate--already-read');
  if (plateAlreadyRead) {
    plateAlreadyRead.style.visibility = 'visible';
  }
}

function markupDateRead(date) {
  return `
   <div class="wrap-read">
     <p class="revision-title">${date}
      <svg class="date-icon" width="9" height="15"></svg>
     </p>
    <ul class="card card-read"></ul>
  </div>`;
}

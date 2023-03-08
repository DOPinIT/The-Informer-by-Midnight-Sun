const readMoreButtons = document.querySelectorAll('.card__read-more');
const newGallery = document.querySelector('.container-read');
const STORAGE_KEY = 'read';
readNews = getReadNews(STORAGE_KEY);

checkStorage(readNews);

function checkStorage(readNews) {
  const cards = document.querySelectorAll('.card__title');
  if (readNews.length) {
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
  const readNews = getReadNews(STORAGE_KEY);

  const list = document.createElement('ul');

  list.classList.add('card', 'card-read');
  readNews.forEach(({ items }) => {
    const li = document.createElement('li');
    li.innerHTML = items;
    addAlreadyRead(li);
    list.appendChild(li);
  });

  newGallery.appendChild(list);
}

document.addEventListener('click', event => {

  if (event.target.matches('.card__read-more')) {
    const cardItem = event.target.closest('.card__item');
     addAlreadyRead(cardItem)
    const title = cardItem.querySelector('.card__title').textContent;
    const revisionDate = formatDate(new Date());
    let items = [];

    items.push(cardItem.outerHTML);

    const storageKey = STORAGE_KEY;
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
      console.log(`Елемент з title ${title} перезаписано в localStorage`);
    } else {
      storedData.push(data);
      localStorage.setItem(storageKey, JSON.stringify(storedData));
      console.log(`Елемент з title ${title} додано в localStorage`);
    }
  }
});

function getReadNews(key) {
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



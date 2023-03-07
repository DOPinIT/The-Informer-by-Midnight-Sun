

const newGallery = document.querySelector('.container-read');
let cardItems = document.querySelectorAll('.card__item');

function updateDataIndex() {
  cardItems = document.querySelectorAll('.card__item');
  cardItems.forEach((cardItem, index) => {
    cardItem.dataset.index = index;
  });
}

if (document.querySelector('.gallery')) {
  window.addEventListener('load', updateDataIndex);
  window.addEventListener('DOMContentLoaded', updateDataIndex);
}

const storedKeys = Object.keys(localStorage);
const listKeys = storedKeys.filter(key => key.includes('list'));

const list = document.createElement('ul');
list.classList.add('card');

listKeys.forEach(key => {
  const storedData = JSON.parse(localStorage.getItem(key));

  if (storedData) {
    storedData.items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = item;
      const plateAlreadyRead = li.querySelector('.plate--already-read');
      plateAlreadyRead.style.visibility = 'visible';
      li.dataset.index = storedData.dataIndex;
      list.appendChild(li);
    });
  } else {
    console.log(`Елемент з ключем ${key} не знайдено в localStorage`);
  }
});

if (newGallery) newGallery.appendChild(list);

document.addEventListener('click', event => {

  if (event.target.matches('.card__read-more')) {

    const lis = document.querySelectorAll('.card__item');
    const index = parseInt(event.target.closest('.card__item').dataset.index);
    const items = [];

    const revisionDate = new Date();

    lis.forEach((li, liIndex) => {
      if (liIndex === index) {
        items.push(li.outerHTML);
        const plateAlreadyReadHome = li.querySelector('.plate--already-read');
        plateAlreadyReadHome.style.visibility = 'visible';
      }
    });

    const key = `list_${index}`;

    const storedData = {
      items: items,
      revisionDate: revisionDate,
      dataIndex: index
    };

    const storedKeys = Object.keys(localStorage);
    const listKeys = storedKeys.filter(key => key.startsWith('list_'));
    const existingKey = listKeys.find(key => {
      const storedIndex = parseInt(key.split('_')[1]);
      return storedIndex === index;
    });

    if (existingKey) {
      localStorage.setItem(existingKey, JSON.stringify(storedData));
      console.log(`Елемент з data-index ${index} перезаписано в localStorage`);
    }
  }
})

  document.addEventListener('click', event => {

    if (event.target.matches('.card__read-more')) {

      const lis = document.querySelectorAll('.card__item');
      const index = parseInt(event.target.closest('.card__item').dataset.index);
      const items = [];

      const revisionDate = new Date();

      lis.forEach((li, liIndex) => {
        if (liIndex === index) {
          items.push(li.outerHTML);
          const plateAlreadyReadHome = li.querySelector('.plate--already-read');
          plateAlreadyReadHome.style.visibility = 'visible';
        }
      });

      const key = `list_${index}`;

      const storedData = {
        items: items,
        revisionDate: revisionDate,
        dataIndex: index
      };

      const storedKeys = Object.keys(localStorage);
      const listKeys = storedKeys.filter(key => key.startsWith('list_'));
      const existingKey = listKeys.find(key => {
        const storedIndex = parseInt(key.split('_')[1]);
        return storedIndex === index;
      });

      if (existingKey) {
        localStorage.setItem(existingKey, JSON.stringify(storedData));
        console.log(`Елемент з data-index ${index} перезаписано в localStorage`);
      } else {
        localStorage.setItem(key, JSON.stringify(storedData));
        storedKeys.push(key);
        console.log(`Елемент з data-index ${index} додано в localStorage`);
      }
    }
  });

      
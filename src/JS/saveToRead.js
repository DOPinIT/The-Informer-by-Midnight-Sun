const readMoreLinks = document.querySelectorAll('.card__read-more');
const newGallery = document.querySelector('.container-read');
const cardItems = document.querySelectorAll('.card__item');

cardItems.forEach((cardItem, index) => {
  cardItem.dataset.index = index;
});

const storedKeys = Object.keys(localStorage);
const listKeys = storedKeys.filter(key => key.includes('list'));

const list = document.createElement('ul');
list.classList.add('card');

listKeys.forEach(key => {
  const items = JSON.parse(localStorage.getItem(key));

  if (items) {
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = item;
      list.appendChild(li);
    });
  } else {
    console.log(`Елемент з ключем ${key} не знайдено в localStorage`);
  }
});

if (newGallery) newGallery.appendChild(list);

readMoreLinks.forEach(link => {
  link.addEventListener('click', event => {
    const index = event.target.closest('.card__item').dataset.index;
    const lis = document.querySelectorAll('.card__item');
    const items = [];

    lis.forEach((li, liIndex) => {
      if (liIndex === parseInt(index)) {
        items.push(li.outerHTML);
      }
    });

    const key = `list_${index}`;
    localStorage.setItem(key, JSON.stringify(items));
    storedKeys.push(key);
    console.log(storedKeys);
  });
});

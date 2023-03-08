// * Зчитування масиву Read з localStorage
export function getReadArr() {
  const readStr = localStorage.getItem('read');
  const readArr = JSON.parse(readStr) || [];
  return readArr;
}
// */ Зчитування масиву Read з localStorage

// * Функція додає іконку до тих карток, що вже є у localStorage
// Її треба додати при кожному оновленні сторінки (після натискання на категорії чи запиту)
export function firstDownloadingRead(readArr) {
  const cards = document.querySelectorAll('.card__title');

  // якщо масив не пустий
  if (readArr.length) {
    // Встановлюю клас .is-active-read, якщо така картка є у localStorage
    for (let i = 0; i < readArr.length; i += 1) {
      for (let j = 0; j < cards.length; j += 1) {
        const accord = readArr[i].title.trim() === cards[j].textContent.trim();

        if (accord) {
          cards[j].closest('.card__item').classList.add('is-active-read');
        }
      }
    }
  }
}
// */ Функція додає іконку до тих карток, що вже є у localStorage

// * Додавання в обране
const readArr = getReadArr(); // зчитуємо масив Read з localStorage
firstDownloadingRead(readArr); // при оновленні сторінки
markupOnReadPage(); // перевірка, що ми на сторінці Read і виклик розмітки
addListenerOnGalleryRead();

// Якщо ми на сторінці read, то розмітка read:
export function markupOnReadPage() {
  console.log(document.body.classList.contains('read'));
  if (document.body.classList.contains('read')) {
    const cards = document.querySelector('.gallery');
    cards.innerHTML = markupRead(readArr);
  }
}

// Вішаю слухача на всю галерею щоби відслідковувати клік по посиланню Read
export function addListenerOnGalleryRead() {
  const placeToRead = document.querySelector('.card');
  if (placeToRead) {
    placeToRead.addEventListener('click', setToRead);
  }
}

export function setToRead(e) {
  // Якщо клік не по Read (посилання), то виходимо
  console.log('e.target', e.target);
  if (!e.target.classList.contains('card__read-more')) {
    return;
  }

  // Якщо ж клік по посиланню Read More, то виконуємо дії
  // Знаходжу поточну картку:
  const currentCardItem = e.target.closest('.card__item');
  console.log('setToRead >>> currentCardItem:', currentCardItem);
  currentCardItem.classList.add('is-active-read'); // показує іконку already read

  // Селектори для подальшого запису картки в масив
  // imageURL, category, title, description, pubDate, pubURL
  // ~imageURL
  const currentCardImg = currentCardItem.querySelector('.card__img');
  // отримую обчислений стиль background-image
  const currentCardImgStyles = window.getComputedStyle(currentCardImg);
  // видаляю непотрібні символи з url (одинарні та подвійні лапки)
  const currentCardImgUrl = currentCardImgStyles.backgroundImage
    .match(/\((.*?)\)/)[1]
    .replace(/('|")/g, '');
  // ~/ imageURL

  const currentCardCategory = currentCardItem.querySelector(
    '.plate__text--category-name'
  );
  const currentCardTitle = currentCardItem.querySelector('.card__title');
  const currentCardDescription =
    currentCardItem.querySelector('.card__description');
  const currentCardDate = currentCardItem.querySelector('.card__date');
  const currentCardUrl = currentCardItem.querySelector('.card__read-more');

  // шукаю по title:
  let indexEl = -1; // початкове значення - title не знайдений
  for (let i = 0; i < readArr.length; i += 1) {
    if (readArr[i].title === currentCardTitle.textContent.trim()) {
      indexEl = i;
      break;
    }
  }

  // Якщо такого тайтлу не існує в масиві read у Local Storage, то додаємо його туди
  if (indexEl === -1) {
    readArr.push({
      imgUrl: currentCardImgUrl,
      category: currentCardCategory.textContent.trim(),
      title: currentCardTitle.textContent.trim(),
      description: currentCardDescription.textContent.trim(),
      date: currentCardDate.textContent.trim(),
      newsUrl: currentCardUrl.href,
    });
    // оновлюємо масив read у Local Storage
    localStorage.setItem('read', JSON.stringify(readArr));
  }
}
// */ Додавання в обране

// * Розмітка у read
export function markupRead(readArr) {
  return readArr
    .map(
      ({
        imgUrl: imageURL,
        category,
        title,
        description,
        date: pubDate,
        newsUrl: pubURL,
      }) => {
        let newDescription = description || '';
        if (newDescription.length > 112) {
          newDescription = `${newDescription.slice(0, 112)}...`;
        }

        return `
      <li class="card__item">
        <!-- position: relative -->
        <div class="card__img-box">
          <div class="card__img" style="background-image: url('${imageURL}');"></div>

          <!-- position: absolute -->
          <div class="plate plate--category-name">
            <!-- textContent міняється у JS в залежності від категорії: -->
            <span class="plate__text--category-name">${category}</span>
          </div>

          <div class="plate plate--already-read">
            <span class="plate__text--already-read">Already read</span>
            <svg class="plate__icon--already-read">
              <use href="./images/icons.svg#already-read"></use>
            </svg>
          </div>

          <!-- Додавання до обраного: -->
          <button class="plate plate--add-to-favorite">
            Add to favorite
            <!-- <span class="plate__text--add-to-favorite"></span> -->
            <svg class="plate__icon--add-to-favorite">
              
            </svg>
          </button>
          <!--/ position: absolute -->
        </div>
        <!--/ position: relative -->

        <div class="card__info-box">
          <h2 class="card__title">${title}</h2>
          <p class="card__description">${newDescription}</p>
          <div class="card__info-box-wrapper">
            <p class="card__date">${pubDate}</p>

            <!-- посилання на новину: -->
            <a href="${pubURL}" class="card__read-more" target="_blank">Read more</a>
          </div>
        </div>
      </li>`;
      }
    )
    .join('');
}
// */ Розмітка у read

// Три крапки в description картки

// Перевірка вьюпорту варіант 1:
// for (let i = 0; i < cardDescription.length; i += 1) {
//   let descriptionLength = 130;
//  для різних вьюпортів:
// if (window.matchMedia('(min-width: 768px)').matches) {
//   descriptionLength = 140;
// } else
// if (window.matchMedia('(min-width: 1280px)').matches) {
//   descriptionLength = 170;
// }

// if (cardDescription[i].textContent.length > descriptionLength) {
//   cardDescription[i].textContent = `${cardDescription[i].textContent.slice(
//     0,
//     descriptionLength
//   )} ...`;
// }

setCardsDescriptionLength();

// Перевірка вьюпорту варіант 2:
window.addEventListener('resize', setCardsDescriptionLength);

function setCardsDescriptionLength() {
  // Початкова довжина рядку
  const cardDescription = document.querySelectorAll('.card__description');
  let descriptionLength = 130;

  // отримуємо ширину viewport
  const viewportWidth = window.innerWidth;

  for (let i = 0; i < cardDescription.length; i += 1) {
    //  для $tablet і $desktop:
    if (viewportWidth >= 768 && viewportWidth < 1280) {
      descriptionLength = 140;
    } else if (viewportWidth >= 1280) {
      descriptionLength = 170;
    }

    console.log(
      'setCardsDescriptionLength >>> descriptionLength:',
      descriptionLength
    );

    if (cardDescription[i].textContent.length > descriptionLength) {
      cardDescription[i].textContent = `${cardDescription[i].textContent.slice(
        0,
        descriptionLength
      )} ...`;
    }
  }
}

// Три крапки в description картки
const cardDescription = document.querySelectorAll('.card__description');

for (let i = 0; i < cardDescription.length; i += 1) {
  let descriptionLength = 130;
  //  для різних вьюпортів:
  if (window.matchMedia('(min-width: 768px)').matches) {
    descriptionLength = 140;
  }
  if (window.matchMedia('(min-width: 1280px)').matches) {
    descriptionLength = 170;
  }
  if (cardDescription[i].textContent.length > descriptionLength) {
    cardDescription[i].textContent = `${cardDescription[i].textContent.slice(
      0,
      descriptionLength
    )} ...`;
  }
}

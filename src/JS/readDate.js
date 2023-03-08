if (window.location.pathname.includes('/read')) {
  const revisionDate = document.querySelector('.revision-date');
  const dateIcon = document.querySelector('.date-icon');
  const galleryCard = document.querySelector('.card-read');

  revisionDate.addEventListener('click', function () {
    if (galleryCard) {
      if (galleryCard.style.display === 'none') {
      galleryCard.style.display = 'block';
      dateIcon.classList.remove('rotated');
    } else {
      galleryCard.style.display = 'none';
      dateIcon.classList.add('rotated');
    }}
  });
}

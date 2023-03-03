const revisionDate = document.querySelector(".revision-date");
const dateIcon = document.querySelector(".date-icon");
const gallery = document.querySelector(".gallery");

revisionDate.addEventListener("click", function() {
  if (gallery.style.display === "none") {
      gallery.style.display = "block";
      dateIcon.classList.remove("rotated");
  } else {
    gallery.style.display = "none";
    dateIcon.classList.add("rotated");
  }
});

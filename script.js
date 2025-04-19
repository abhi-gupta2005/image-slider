// script.js
const slides = document.querySelectorAll(".slide");
const thumbs = document.querySelectorAll(".thumb");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const sliderContainer = document.querySelector(".slider-container");

let currentIndex = 0;
let autoPlayInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    thumbs[i].classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
      thumbs[i].classList.add("active");
    }
  });
  currentIndex = index;
}

function nextSlide() {
  const newIndex = (currentIndex + 1) % slides.length;
  showSlide(newIndex);
}

function prevSlide() {
  const newIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(newIndex);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    const index = parseInt(thumb.getAttribute("data-index"));
    showSlide(index);
  });
});

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector(".slider");

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

slider.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    nextSlide();
  } else if (touchEndX > touchStartX + 50) {
    prevSlide();
  }
}

// Autoplay functionality
function startAutoplay() {
  autoPlayInterval = setInterval(nextSlide, 3000); // Change every 3 seconds
}

function stopAutoplay() {
  clearInterval(autoPlayInterval);
}

sliderContainer.addEventListener("mouseenter", stopAutoplay);
sliderContainer.addEventListener("mouseleave", startAutoplay);

startAutoplay();

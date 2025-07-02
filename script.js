// Mobile nav toggle
document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('show');
  document.querySelector('.cta').classList.toggle('show');
});

// Simple testimonial slider
const slides = document.querySelector('.slides');
const testimonials = document.querySelectorAll('.testimonial');
let idx = 0;

document.querySelector('.next').addEventListener('click', () => {
  idx = (idx + 1) % testimonials.length;
  slides.style.transform = `translateX(-${idx * 100}%)`;
});
document.querySelector('.prev').addEventListener('click', () => {
  idx = (idx - 1 + testimonials.length) % testimonials.length;
  slides.style.transform = `translateX(-${idx * 100}%)`;
});

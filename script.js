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
// custom smooth scroll with adjustable speed
function smoothScroll(targetSelector, duration) {
  const target = document.querySelector(targetSelector)
  const targetY = target.getBoundingClientRect().top + window.pageYOffset
  const startY  = window.pageYOffset
  const distance = targetY - startY
  let startTime = null

  function easeInOutQuad(t, b, c, d) {
    t /= d/2
    if (t < 1) return c/2*t*t + b
    t--
    return -c/2 * (t*(t-2) - 1) + b
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const nextY = easeInOutQuad(timeElapsed, startY, distance, duration)
    window.scrollTo(0, nextY)
    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

// hookup nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault()
    smoothScroll(a.getAttribute('href'), 200) // <-- 200ms for a faster scroll
  })
})

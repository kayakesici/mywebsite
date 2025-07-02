// mobile menu toggle
document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('show')
  document.querySelector('.btn.cta').classList.toggle('show')
})

// testimonial slider
const slides = document.querySelector('.slides')
const testimonials = document.querySelectorAll('.testimonial')
let idx = 0

document.querySelector('.next').addEventListener('click', () => {
  idx = (idx + 1) % testimonials.length
  slides.style.transform = `translateX(-${idx * 100}%)`
})
document.querySelector('.prev').addEventListener('click', () => {
  idx = (idx - 1 + testimonials.length) % testimonials.length
  slides.style.transform = `translateX(-${idx * 100}%)`
})

// smooth scroll
function smoothScroll(targetSelector, duration) {
  const target = document.querySelector(targetSelector)
  const targetPos = target.getBoundingClientRect().top + window.pageYOffset
  const startPos = window.pageYOffset
  const distance = targetPos - startPos
  let startTime = null

  function easeInOutQuad(t, b, c, d) {
    t /= d/2
    if (t < 1) return c/2*t*t + b
    t--
    return -c/2 * (t*(t-2) - 1) + b
  }

  function animate(time) {
    if (startTime === null) startTime = time
    const elapsed = time - startTime
    const run = easeInOutQuad(elapsed, startPos, distance, duration)
    window.scrollTo(0, run)
    if (elapsed < duration) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault()
    smoothScroll(a.getAttribute('href'), 200)
  })
})

// FAQ toggle
document.querySelectorAll('.faq-item h4').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('open')
  })
})

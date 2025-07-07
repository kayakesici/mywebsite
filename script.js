// mobile menu toggle
document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('show');
  document.querySelector('.btn.cta').classList.toggle('show');
});

// Optional: close menu on link click (for good UX)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('show');
    document.querySelector('.btn.cta').classList.remove('show');
  });
});

// testimonial slider
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

// linear scroll for in-page links
function linearScroll(targetSelector, duration) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  const targetPos = target.getBoundingClientRect().top + window.pageYOffset;
  const startPos = window.pageYOffset;
  const distance = targetPos - startPos;
  let startTime = null;

  function animate(time) {
    if (startTime === null) startTime = time;
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startPos + distance * progress);
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      linearScroll(href, 600);
    }
  });
});

// FAQ toggle
document.querySelectorAll('.faq-item h4').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('open');
  });
});

// back-to-top button (optional)
const backBtn = document.getElementById('backToTop');
if (backBtn) {
  window.addEventListener('scroll', () => {
    backBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  backBtn.addEventListener('click', () => {
    linearScroll('body', 600);
  });
}

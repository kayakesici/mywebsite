document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const ctaBtn = document.querySelector('.btn.cta.desktop-cta');
  navToggle.addEventListener('click', () => {
    const expanded = navLinks.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', expanded);
    navToggle.innerHTML = expanded
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      navToggle.setAttribute('aria-expanded', false);
      navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Smooth scroll for in-page links
  function smoothScroll(targetSelector, duration = 600) {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    const targetPos = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: targetPos, behavior: 'smooth' });
  }
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        smoothScroll(href, 600);
      }
    });
  });

  // Testimonial slider
  const slides = document.querySelector('.slides');
  const testimonials = document.querySelectorAll('.testimonial');
  const indicators = document.querySelector('.slider-indicators');
  let idx = 0, autoSlide, isPaused = false;

  function updateSlider() {
    slides.style.transform = `translateX(-${idx * 100}%)`;
    indicators.querySelectorAll('button').forEach((btn, i) => {
      btn.classList.toggle('active', i === idx);
    });
  }
  function goToSlide(i) {
    idx = (i + testimonials.length) % testimonials.length;
    updateSlider();
  }
  function nextSlide() { goToSlide(idx + 1); }
  function prevSlide() { goToSlide(idx - 1); }
  // Indicators
  indicators.innerHTML = '';
  testimonials.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    btn.addEventListener('click', () => goToSlide(i));
    indicators.appendChild(btn);
  });
  updateSlider();
  document.querySelector('.next').addEventListener('click', nextSlide);
  document.querySelector('.prev').addEventListener('click', prevSlide);

  // Auto-slide
  function startAutoSlide() {
    autoSlide = setInterval(() => { if (!isPaused) nextSlide(); }, 5000);
  }
  slides.addEventListener('mouseenter', () => isPaused = true);
  slides.addEventListener('mouseleave', () => isPaused = false);
  startAutoSlide();

  // Touch swipe
  let startX = 0;
  slides.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  slides.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) prevSlide();
    if (dx < -50) nextSlide();
  });

  // FAQ accordion (keyboard accessible)
  document.querySelectorAll('.faq-item h4').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.toggle('open');
      header.setAttribute('aria-expanded', isOpen);
    });
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
});

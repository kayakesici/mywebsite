document.addEventListener('DOMContentLoaded', () => {
  // Navbar functionality
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navLinks.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', expanded);
      navToggle.innerHTML = expanded
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        navToggle.setAttribute('aria-expanded', false);
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-item h4').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.toggle('open');
      header.setAttribute('aria-expanded', isOpen);
      
      // Close other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent && item.classList.contains('open')) {
          item.classList.remove('open');
          item.querySelector('h4').setAttribute('aria-expanded', false);
        }
      });
    });

    // Keyboard navigation for FAQ
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll('.testimonial');
  const indicators = document.querySelectorAll('.indicator');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  // Auto-advance testimonials
  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }

  // Set up auto-advance
  let testimonialInterval = setInterval(nextTestimonial, 5000);

  // Indicator click handlers
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentTestimonial = index;
      showTestimonial(currentTestimonial);
      
      // Reset auto-advance timer
      clearInterval(testimonialInterval);
      testimonialInterval = setInterval(nextTestimonial, 5000);
    });
  });

  // Pause auto-advance on hover
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(testimonialInterval);
    });

    testimonialSlider.addEventListener('mouseleave', () => {
      testimonialInterval = setInterval(nextTestimonial, 5000);
    });
  }

  // Touch/swipe support for testimonials
  let startX = 0;
  let endX = 0;

  if (testimonialSlider) {
    testimonialSlider.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });

    testimonialSlider.addEventListener('touchend', e => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next testimonial
          nextTestimonial();
        } else {
          // Swipe right - previous testimonial
          currentTestimonial = currentTestimonial === 0 
            ? testimonials.length - 1 
            : currentTestimonial - 1;
          showTestimonial(currentTestimonial);
        }
        
        // Reset auto-advance timer
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonial, 5000);
      }
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      const requiredFields = ['name', 'email', 'company', 'revenue', 'timeline'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.form-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        alert('Thank you! We\'ll be in touch within 24 hours to schedule your free strategy call.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // Navbar scroll effect
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for styling
    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.card, .stat, .team-member, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // Stats counter animation
  const statsSection = document.querySelector('.stats');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateStats();
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  function animateStats() {
    const stats = [
      { element: document.querySelector('.stat:nth-child(1) strong'), target: 400, suffix: '+' },
      { element: document.querySelector('.stat:nth-child(2) strong'), target: 500, suffix: 'M+', prefix: '£' },
      { element: document.querySelector('.stat:nth-child(3) strong'), target: 95, suffix: '%' }
    ];

    stats.forEach(stat => {
      if (stat.element) {
        animateNumber(stat.element, 0, stat.target, 2000, stat.prefix || '', stat.suffix || '');
      }
    });
  }

  function animateNumber(element, start, end, duration, prefix = '', suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      
      element.textContent = prefix + current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }

  // Lazy loading for images
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src; // Trigger loading
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Error handling for missing elements
  console.log('Business Exit Advisors website loaded successfully');
});

// Global error handler
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
  if ('performance' in window) {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
  }
});

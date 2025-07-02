// ... your existing nav-toggle + slider code ...

// FAQ toggle
document.querySelectorAll('.faq-item h4').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('open');
  });
});

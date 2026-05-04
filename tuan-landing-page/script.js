// Simple mobile menu toggle for smaller screens.
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    const expanded = navLinks.classList.contains('show');
    navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });
}

// Smooth scrolling for internal anchor links.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      navLinks?.classList.remove('show');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

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

// Lightbox gallery for interior images.
// - Click any interior card to open full-screen preview.
// - Use next/previous buttons to cycle images.
// - Close by button, backdrop click, or Escape key.
const galleryCards = document.querySelectorAll('.interior-card[data-lightbox-index]');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCounter = document.getElementById('lightboxCounter');
const closeButton = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-nav.prev');
const nextButton = document.querySelector('.lightbox-nav.next');

const galleryItems = Array.from(galleryCards).map((card) => {
  const img = card.querySelector('img');
  const label = card.querySelector('span');
  return {
    src: img?.getAttribute('src') || '',
    alt: img?.getAttribute('alt') || '',
    caption: label?.textContent?.trim() || ''
  };
});

let currentIndex = 0;

function renderLightbox(index) {
  const total = galleryItems.length;
  if (!total) return;
  currentIndex = (index + total) % total;
  const current = galleryItems[currentIndex];
  lightboxImage.src = current.src;
  lightboxImage.alt = current.alt;
  lightboxCaption.textContent = current.caption;
  lightboxCounter.textContent = `${currentIndex + 1} / ${total}`;
}

function openLightbox(index) {
  if (!lightbox) return;
  renderLightbox(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

galleryCards.forEach((card, index) => {
  card.addEventListener('click', () => openLightbox(index));
});

prevButton?.addEventListener('click', () => renderLightbox(currentIndex - 1));
nextButton?.addEventListener('click', () => renderLightbox(currentIndex + 1));
closeButton?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', (event) => {
  const closeTarget = event.target;
  if (
    closeTarget instanceof HTMLElement &&
    closeTarget.dataset.lightboxClose === 'true'
  ) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox?.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') renderLightbox(currentIndex - 1);
  if (event.key === 'ArrowRight') renderLightbox(currentIndex + 1);
});

/* ============================================
   REZISTOR FILMS — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroSlider();
});

/* Mobile Navigation */
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

/* Homepage Hero Slider */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero__slide');
  const titleLinks = document.querySelectorAll('.hero__title-link');
  if (slides.length === 0) return;

  let current = 0;
  const total = slides.length;
  const INTERVAL = 5000;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    titleLinks.forEach(t => t.classList.remove('active'));
    slides[index].classList.add('active');
    if (titleLinks[index]) titleLinks[index].classList.add('active');
    current = index;
  }

  // Auto-advance
  let timer = setInterval(() => {
    showSlide((current + 1) % total);
  }, INTERVAL);

  // Hover on title highlights corresponding slide
  titleLinks.forEach((link, i) => {
    link.addEventListener('mouseenter', () => {
      clearInterval(timer);
      showSlide(i);
    });
    link.addEventListener('mouseleave', () => {
      timer = setInterval(() => {
        showSlide((current + 1) % total);
      }, INTERVAL);
    });
  });

  // Start with first slide
  showSlide(0);
}

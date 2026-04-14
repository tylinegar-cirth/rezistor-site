/* ============================================
   REZISTOR FILMS — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroSlider();
  initSpotlight();
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

  const meta = {
    root: document.querySelector('.hero__meta'),
    director: document.querySelector('.hero__meta [data-field="director"]'),
    cast: document.querySelector('.hero__meta [data-field="cast"]'),
    castRow: document.querySelector('.hero__meta [data-cast-row]'),
    status: document.querySelector('.hero__meta [data-field="status"]'),
    index: document.querySelector('.hero__meta-index')
  };
  const progress = document.querySelector('.hero__progress');

  let current = 0;
  const total = slides.length;
  const INTERVAL = 5000;

  function pad(n) {
    return n < 10 ? '00' + n : n < 100 ? '0' + n : '' + n;
  }

  function resetProgress() {
    if (!progress) return;
    progress.style.animation = 'none';
    // force reflow so the animation restarts
    void progress.offsetWidth;
    progress.style.animation = '';
  }

  function updateMeta(link) {
    if (!link || !meta.root) return;
    const director = link.getAttribute('data-director') || '';
    const cast = link.getAttribute('data-cast') || '';
    const status = link.getAttribute('data-status') || '';

    // Fade the values out, swap text, fade back in
    [meta.director, meta.cast, meta.status].forEach(el => {
      if (el) el.classList.add('swap');
    });

    setTimeout(() => {
      if (meta.director) meta.director.textContent = director;
      if (meta.cast) meta.cast.textContent = cast;
      if (meta.status) meta.status.textContent = status;

      if (meta.castRow) {
        if (cast.trim() === '') {
          meta.castRow.setAttribute('data-empty', '');
        } else {
          meta.castRow.removeAttribute('data-empty');
        }
      }

      [meta.director, meta.cast, meta.status].forEach(el => {
        if (el) el.classList.remove('swap');
      });
    }, 220);
  }

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    titleLinks.forEach(t => t.classList.remove('active'));
    slides[index].classList.add('active');
    if (titleLinks[index]) titleLinks[index].classList.add('active');
    current = index;

    if (meta.index) meta.index.textContent = pad(index + 1);
    updateMeta(titleLinks[index]);
    resetProgress();
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

/* Cursor-following red spotlight — updates CSS variables on mousemove */
function initSpotlight() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  let pending = false;
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--mx', mx + 'px');
      document.documentElement.style.setProperty('--my', my + 'px');
      pending = false;
    });
  });
}

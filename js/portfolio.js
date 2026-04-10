/* ===================================================================
   StockFolio — Simplified Portfolio JS (Strategy + About only)
   =================================================================== */

// ── NAVIGATION ──────────────────────────────────────────────────────
const nav = document.getElementById('pf-nav');
const navToggle = document.getElementById('pf-nav-toggle');
const navLinks = document.getElementById('pf-nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});
navLinks.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.textContent = '☰';
  });
});

// ── FLOATING PARTICLES ──────────────────────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'pf-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    const colors = ['var(--accent-green)', 'var(--accent-blue)', 'var(--accent-gold)', '#a78bfa'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(p);
  }
})();

// ── SCROLL ANIMATIONS ───────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // stagger animation based on element index within its parent
      const siblings = Array.from(e.target.parentElement.children).filter(c => c.classList.contains('animate-in'));
      const idx = siblings.indexOf(e.target);
      e.target.style.transitionDelay = (idx * 0.1) + 's';
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// ── ACTIVE NAV LINK HIGHLIGHT ───────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.querySelectorAll('a[href^="#"]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

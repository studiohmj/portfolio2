/* ==========================================================================
   detail.js — case studies + profile.html, on top of js/core.js.
   Reveal, in-page anchors, clickable project images.
   ========================================================================== */

/* ---------- Always start at the top on page load ---------- */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

/* ---------- Scroll reveal — opacity, fired once per element ---------- */
(function () {
  const els = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver(entries => {
    /* Stagger only what enters together, top-left first (reads --reveal-delay) */
    entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
      .forEach((e, i) => {
        e.target.style.setProperty('--reveal-delay', Math.min(i, 4) * 60 + 'ms');
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
  els.forEach(el => obs.observe(el));
}());

/* ---------- Smooth scroll for in-page anchors ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = id.length > 1 && document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  });
});

/* ---------- Project card — click anywhere on the image to navigate ---------- */
document.querySelectorAll('.proj__image').forEach(img => {
  const link = img.querySelector('.proj__view-pill');
  if (!link) return;
  img.style.cursor = 'pointer';
  img.addEventListener('click', e => { if (!e.target.closest('.proj__view-pill')) window.location.href = link.href; });
});

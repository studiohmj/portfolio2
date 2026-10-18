/* ==========================================================================
   media.js — a project thumbnail becomes a quiet looping video only when
   its card (or index row) declares one: data-video="media/leporem.mp4".
   No attribute, no request — nothing is probed. See README.md.
   Also the cursor-follow thumbnail for the project index.
   ========================================================================== */

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function makeVideo(src, poster) {
  const v = document.createElement('video');
  v.muted = true; v.loop = true; v.playsInline = true;
  v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
  v.preload = 'metadata';
  if (poster) v.poster = poster;
  v.src = src;
  return v;
}

/* Play only while on screen (and never on reduced motion) */
const playIO = new IntersectionObserver(entries => entries.forEach(e => {
  const v = e.target;
  if (e.isIntersecting && !reduced) v.play().catch(() => {});
  else v.pause();
}), { threshold: 0.25 });

/* ---------- Card media: swap the image for a video when one exists ---------- */
function initCards() {
  // The image stays until the video has a frame, so a missing/broken file just keeps the image
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const box = e.target.querySelector('.card__media');
    const img = box.querySelector('img');
    const v = makeVideo(e.target.dataset.video, img?.currentSrc || img?.src);
    v.addEventListener('loadeddata', () => { img?.remove(); }, { once: true });
    v.addEventListener('error', () => v.remove(), { once: true });
    box.prepend(v);
    playIO.observe(v);
  }), { rootMargin: '600px 0px' });
  document.querySelectorAll('.card[data-video]').forEach(c => io.observe(c));
}

/* ---------- Index: thumbnail follows the cursor (fine pointers only) ---------- */
function initCursorThumb() {
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const thumb = document.getElementById('cursorThumb');
  const list = document.querySelector('.index__list');
  if (!thumb || !list || !fine.matches || reduced) return;
  const inner = thumb.querySelector('.cursor-thumb__inner');
  const pos = { x: 0, y: 0, tx: 0, ty: 0 };
  let raf = 0, active = null, last = 0;

  const loop = now => {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
    last = now;
    const k = 1 - Math.exp(-11 * dt);   // time-based follow, same feel at any refresh rate
    pos.x += (pos.tx - pos.x) * k;
    pos.y += (pos.ty - pos.y) * k;
    thumb.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
    raf = Math.abs(pos.tx - pos.x) + Math.abs(pos.ty - pos.y) > 0.3 || active ? requestAnimationFrame(loop) : 0;
    if (!raf) last = 0;
  };
  const show = row => {
    active = row;
    const src = row.dataset.thumb;
    inner.replaceChildren(Object.assign(new Image(), { src, alt: '', decoding: 'async' }));
    thumb.classList.add('is-on');
    if (row.dataset.video) {
      const v = makeVideo(row.dataset.video, src);
      v.addEventListener('loadeddata', () => { if (active === row) { inner.replaceChildren(v); v.play().catch(() => {}); } }, { once: true });
    }
  };

  list.querySelectorAll('.index__row').forEach(row => {
    row.addEventListener('pointerenter', e => {
      if (!active) { pos.x = pos.tx = e.clientX; pos.y = pos.ty = e.clientY; }
      show(row);
      if (!raf) raf = requestAnimationFrame(loop);
    });
  });
  list.addEventListener('pointermove', e => { pos.tx = e.clientX; pos.ty = e.clientY; });
  list.addEventListener('pointerleave', () => { active = null; thumb.classList.remove('is-on'); });
  window.addEventListener('scroll', () => { if (active) { active = null; thumb.classList.remove('is-on'); } }, { passive: true });
}

export function initMedia() {
  initCards();
  initCursorThumb();
}

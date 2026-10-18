/* ==========================================================================
   site.js — index.html only (ES module, no build step). Shared chrome comes
   from js/core.js; this adds the hero and loads the heavier pieces (media,
   scroll motion) on demand so the page works if a CDN is slow.
   ========================================================================== */

import { reduceMotion } from './core.js';

const root = document.documentElement;

/* ---------- Hero: sculpture video (SPEC §5, §6 #2, §7) ----------
   The poster <img> in .hero__media is always there. The video is opt-in:
     <div class="hero__media" data-video="media/hero-light" data-video-dark="media/hero-dark">
   loads <base>.webm / <base>.mp4 (the dark pair only in the dark theme, when given).
   No attribute → nothing is requested and the poster stays (README.md).
   Muted loop, no controls, plays only while on screen. Never on reduced motion or
   on phones (≤760px): those keep the poster. A broken or missing file leaves the poster. */
function initHeroVideo() {
  const box = document.querySelector('.hero__media');
  if (!box || !box.dataset.video) return;
  const img = box.querySelector('img');
  const phone = matchMedia('(max-width: 760px)');
  const dark = () => root.classList.contains('dark-mode');
  let video = null;

  const io = new IntersectionObserver(([e]) => {
    if (!video) return;
    if (e.isIntersecting) video.play().catch(() => {});
    else video.pause();
  }, { threshold: 0.2 });

  const unmount = () => {
    if (!video) return;
    io.unobserve(box);
    video.pause();
    video.remove();
    video = null;
    box.classList.remove('has-video');
  };

  const mount = () => {
    if (reduceMotion.matches || phone.matches) { unmount(); return; }
    const base = (dark() && box.dataset.videoDark) || box.dataset.video;
    if (video && video.dataset.base === base) return;
    unmount();
    const v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto'; v.disablePictureInPicture = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
    v.dataset.base = base;
    v.poster = (dark() && box.dataset.posterDark) || box.dataset.poster || img?.currentSrc || img?.src || '';
    for (const [ext, type] of [['webm', 'video/webm'], ['mp4', 'video/mp4']]) {
      const s = document.createElement('source');
      s.src = `${base}.${ext}`;
      s.type = type;
      v.append(s);
    }
    // The last source failing means no format loaded: drop the video, keep the poster
    v.lastElementChild.addEventListener('error', () => { if (video === v) unmount(); }, { once: true });
    v.addEventListener('loadeddata', () => { if (video === v) box.classList.add('has-video'); }, { once: true });
    box.append(v);
    video = v;
    io.observe(box);
  };

  mount();
  reduceMotion.addEventListener('change', mount);
  phone.addEventListener('change', mount);
  window.addEventListener('themechange', mount);
}

initHeroVideo();

/* ---------- Media (videos, cursor thumb) and scroll motion ---------- */
import('./media.js').then(m => m.initMedia()).catch(e => console.warn('Media enhancements unavailable.', e));
if (!reduceMotion.matches) {
  import('./motion.js').then(m => m.initMotion()).catch(e => { root.classList.remove('motion'); console.warn('Scroll motion unavailable.', e); });
}

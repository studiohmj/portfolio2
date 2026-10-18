/* ==========================================================================
   motion.js — SPEC §6 #3 scroll reveal, #4 section-title line masks,
   #8 Lenis smooth scroll. Nothing else moves (SPEC §1).
   Loaded only when prefers-reduced-motion is not set. The hero's load
   timeline (#1) is pure CSS (css/home.css, 14) so it never waits on a CDN.
   One language: a slow float — rise 40px from 0.985 scale over 1.4s (power3.out),
   opacity on its own 0.9s power1.out curve a beat later, 0.12s stagger.
   ========================================================================== */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
const root = document.documentElement;
const EASE = 'power3.out';      // position — CSS twin: cubic-bezier(0.22, 1, 0.36, 1)
const DUR = 1.4;
const FADE = { duration: 0.9, ease: 'power1.out', delay: 0.08 };   // opacity trails the position a little
const STAGGER = 0.12;

/* ---------- Lenis, driven by GSAP's ticker so ScrollTrigger stays in sync ---------- */
function initLenis() {
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // In-page links glide; focus moves to the target for keyboard users
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = id === '#top' ? document.body : document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(id === '#top' ? 0 : target, { duration: 1.2 });
    history.replaceState(null, '', id);
  }));
  window.addEventListener('scrolllock', e => (e.detail.locked ? lenis.stop() : lenis.start()));
  return lenis;
}

/* ---------- Line masks: split a title into its rendered lines, each rising out of a mask.
   Splits at reveal time (fonts are in by then) and restores the original markup after,
   so later resizes re-wrap normally. ---------- */
function splitLines(el) {
  const original = el.innerHTML;
  const words = [];
  const walk = (node, tone) => [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach(t => t && words.push({ t, tone }));
    else walk(n, tone || n.classList.contains('tone'));
  });
  walk(el, false);
  el.textContent = '';
  const spans = words.map(w => {
    if (/^\s+$/.test(w.t)) { el.append(w.t); return null; }
    const s = document.createElement('span');
    s.textContent = w.t;
    s.style.display = 'inline-block';
    if (w.tone) s.className = 'tone';
    el.append(s);
    return s;
  }).filter(Boolean);
  const lines = [];
  spans.forEach(s => {
    const top = s.offsetTop;
    const last = lines[lines.length - 1];
    if (last && Math.abs(last.top - top) < 4) last.spans.push(s); else lines.push({ top, spans: [s] });
  });
  el.textContent = '';
  const inners = lines.map(({ spans: row }) => {
    const line = document.createElement('span');
    const inner = document.createElement('span');
    line.className = 'line';
    inner.className = 'line__inner';
    row.forEach((s, i) => { if (i) inner.append(' '); inner.append(s); });
    line.append(inner);
    el.append(line);
    return inner;
  });
  return { inners, restore: () => { el.innerHTML = original; } };
}

/* ---------- Reveals ---------- */
function initReveals() {
  const titles = gsap.utils.toArray('.reveal.t-h2');
  const blocks = gsap.utils.toArray('.reveal').filter(el => !titles.includes(el));

  // Section titles: line by line from behind a mask
  titles.forEach(el => ScrollTrigger.create({
    trigger: el, start: 'top 86%', once: true,
    onEnter: () => {
      const { inners, restore } = splitLines(el);
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      gsap.fromTo(inners, { yPercent: 110 }, { yPercent: 0, duration: DUR, ease: EASE, stagger: STAGGER, onComplete: restore });
    },
  }));

  // Everything else floats up; blocks that enter together stagger top to bottom
  ScrollTrigger.batch(blocks, {
    start: 'top 88%', once: true,
    onEnter: batch => batch.forEach((el, i) => {
      const rows = el.matches('.approach, .awards__group, .index')
        ? el.querySelectorAll('.approach__item, .award-item, .index__list > li') : null;
      const tl = gsap.timeline({ delay: i * STAGGER });
      tl.to(el, { y: 0, scale: 1, duration: DUR, ease: EASE, clearProps: 'transform' }, 0)
        .to(el, { opacity: 1, ...FADE }, 0);
      if (rows && rows.length) {
        tl.from(rows, { y: 24, duration: DUR, ease: EASE, stagger: 0.06, clearProps: 'transform' }, 0.1)
          .from(rows, { opacity: 0, ...FADE, stagger: 0.06, clearProps: 'opacity' }, 0.1);
      }
    }),
  });
}

export function initMotion() {
  // The <head> fallback already gave up and showed everything: stay static rather than hide it again
  clearTimeout(window.__motionFallback);
  if (window.__motionLate) return;
  window.__lenis = initLenis();
  // Reveals only when the <head> script chose them (a fresh visit at the top). Coming back,
  // reloading or landing on a #section keeps everything in place.
  if (root.classList.contains('motion')) initReveals();
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

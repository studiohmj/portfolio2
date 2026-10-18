/* ==========================================================================
   core.js — shared behaviour for every page (ES module, no build step).
   Theme, nav, mobile menu, profile drawer (when the page has one).
   Page scripts import what they need from here: js/site.js (home),
   js/detail.js (case studies + profile).
   ========================================================================== */

const root = document.documentElement;
export const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Theme — light by default (SPEC §3), the choice persisted. Both class names
   are kept in sync: some rules read html.light, the colour sets read html.dark-mode. ---------- */
function setTheme(light) {
  root.classList.toggle('light', light);
  root.classList.toggle('dark-mode', !light);
  document.getElementById('themeToggle')?.setAttribute('aria-pressed', String(light));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#F4F3EF' : '#0E0E0F');
}
function initTheme() {
  const btn = document.getElementById('themeToggle');
  setTheme(root.classList.contains('light'));
  btn?.addEventListener('click', () => {
    const light = !root.classList.contains('light');
    root.classList.add('theme-transitioning');
    setTheme(light);
    try { localStorage.setItem('portfolio-theme-v2', light ? 'light' : 'dark'); } catch (e) {}
    setTimeout(() => root.classList.remove('theme-transitioning'), 500);
    window.dispatchEvent(new CustomEvent('themechange', { detail: { light } }));
  });
}

/* ---------- Focus trap shared by the menu and the drawer ---------- */
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
function trapTab(e, container, extra = []) {
  if (e.key !== 'Tab') return;
  const items = [...extra, ...container.querySelectorAll(FOCUSABLE)].filter(el => el.getClientRects().length);
  if (!items.length) return;
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && (document.activeElement === first || document.activeElement === container)) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ---------- Nav — transparent at the top; once scrolled it takes the solid colour of
   the section under it, and over the black stage (.stage / footer) its text turns
   On-stage (DESIGN §5) ---------- */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const stages = [...document.querySelectorAll('.stage, .footer')];
  const sync = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
    const y = nav.offsetHeight / 2;   // the section behind the middle of the bar
    nav.classList.toggle('on-stage', stages.some(s => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; }));
  };
  sync();
  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
}

/* ---------- Mobile menu ---------- */
function initMenu() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  const set = open => {
    menu.classList.toggle('open', open);
    menu.inert = !open;
    btn.setAttribute('aria-expanded', String(open));
    root.classList.toggle('menu-open', open);
    window.dispatchEvent(new CustomEvent('scrolllock', { detail: { locked: open } }));
  };
  btn.addEventListener('click', () => set(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', e => {
    if (!menu.classList.contains('open')) return;
    if (e.key === 'Escape') { set(false); btn.focus(); return; }
    trapTab(e, menu, [btn]);
  });
  matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) set(false); });
}

/* ---------- Profile drawer (index.html) ---------- */
function initDrawer() {
  const overlay = document.getElementById('profileDrawerOverlay');
  const drawer = document.getElementById('profileDrawer');
  if (!overlay || !drawer) return;
  let returnTo = null;
  const open = e => {
    returnTo = e.currentTarget;
    drawer.inert = false;
    drawer.classList.add('open');
    overlay.classList.add('open');
    window.dispatchEvent(new CustomEvent('scrolllock', { detail: { locked: true } }));
    drawer.focus({ preventScroll: true });
  };
  const close = () => {
    if (!drawer.classList.contains('open')) return;
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.inert = true;
    window.dispatchEvent(new CustomEvent('scrolllock', { detail: { locked: false } }));
    returnTo?.focus({ preventScroll: true });
  };
  document.querySelectorAll('.profile-drawer-trigger').forEach(t => t.addEventListener('click', open));
  drawer.querySelectorAll('#closeProfileDrawer, #closeProfileDrawer2, [data-close-drawer]').forEach(c => c.addEventListener('click', close));
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (!drawer.classList.contains('open')) return;
    if (e.key === 'Escape') { close(); return; }
    trapTab(e, drawer);
  });
}

/* ---------- Inline expand (pexp) — drawer and profile.html ---------- */
function initExpand() {
  document.querySelectorAll('.pexp-btn').forEach(btn => {
    const body = document.getElementById(btn.dataset.target);
    if (!body) return;
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      body.classList.toggle('open', !isOpen);
    });
  });
}

/* ---------- Scroll lock (menu / drawer) — Lenis listens to the same event ---------- */
window.addEventListener('scrolllock', e => { document.body.style.overflow = e.detail.locked ? 'hidden' : ''; });

/* ---------- Active nav link — same-page sections only (index.html) ---------- */
function initActiveLink() {
  const links = [...document.querySelectorAll('.nav__group a[href^="#"]')];
  if (!links.length) return;
  const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.classList.remove('is-active'));
      map.get(en.target.id)?.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

initTheme();
initNav();
initMenu();
initDrawer();
initExpand();
initActiveLink();

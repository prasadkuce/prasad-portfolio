(function () {
  'use strict';

  /* ── theme ───────────────────────────────────────────── */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('pg-theme'); } catch (e) {}
  if (stored === 'dark' || stored === 'light') root.setAttribute('data-theme', stored);

  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  var themeBtn = document.getElementById('theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('pg-theme', next); } catch (e) {}
    });
  }

  /* ── sticky nav border ───────────────────────────────── */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── scroll-spy ──────────────────────────────────────── */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── reveal on scroll ────────────────────────────────── */
  var targets = document.querySelectorAll('.section, .hero__text, .card, .stats');
  if ('IntersectionObserver' in window) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('reveal'); });
    var reveal = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px 18% 0px', threshold: 0 });
    Array.prototype.forEach.call(targets, function (el) { reveal.observe(el); });
  }

  /* ── earlier-projects expander ───────────────────────── */
  var expand = document.getElementById('expand');
  var more = document.getElementById('more');
  if (expand && more) {
    expand.addEventListener('click', function () {
      var open = expand.getAttribute('aria-expanded') === 'true';
      expand.setAttribute('aria-expanded', String(!open));
      more.hidden = open;
      expand.querySelector('.expand__text').textContent =
        open ? 'Show 5 earlier projects' : 'Hide earlier projects';
      if (open) expand.scrollIntoView({ block: 'center' });
    });
  }

  /* ── footer year ─────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

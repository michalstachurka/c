/* ============================================================
   main.js — KuchnieNaWymiar.eu (demo)
   Wspólna baza: pomocnicze funkcje, stan nagłówka,
   obserwator reveal, pływające CTA mobile.
   ============================================================ */

(function () {
  "use strict";

  var KNW = (window.KNW = window.KNW || {});

  KNW.$ = function (sel, ctx) {
    return (ctx || document).querySelector(sel);
  };

  KNW.$$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  KNW.reducedMotion = function () {
    return motionQuery.matches;
  };

  KNW.onMotionChange = function (fn) {
    if (motionQuery.addEventListener) motionQuery.addEventListener("change", fn);
  };

  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  /* --- Stan nagłówka po przewinięciu -------------------------- */

  var header = KNW.$(".site-header");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* --- Reveal: elementy wjeżdżające jak wyrównywane fronty ----- */

  function initReveals() {
    var items = KNW.$$(".reveal, .reveal-front");
    if (!items.length) return;

    if (KNW.reducedMotion() || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("in-view");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    items.forEach(function (el) {
      io.observe(el);
    });
  }

  initReveals();

  /* --- Pływające CTA (mobile): chowa się przy stopce/formularzu */

  var floating = KNW.$(".floating-cta");

  if (floating && "IntersectionObserver" in window) {
    var sentinels = KNW.$$(".site-footer, .brief, .start-cta");
    var hiddenBy = new Set();

    var fio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) hiddenBy.add(entry.target);
          else hiddenBy.delete(entry.target);
        });
        floating.classList.toggle("is-hidden", hiddenBy.size > 0);
      },
      { threshold: 0.05 }
    );

    sentinels.forEach(function (el) {
      fio.observe(el);
    });
  }

  /* --- Rok w stopce -------------------------------------------- */

  var yearEl = KNW.$("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

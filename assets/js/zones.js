/* ============================================================
   zones.js — KuchnieNaWymiar.eu (demo)
   1) Dostępne taby (selektor rytmu dnia, priorytety kuchni)
   2) Pozioma sekwencja pięciu stref:
      - desktop: pionowy scroll steruje przesunięciem toru
        (sticky, bez blokowania natywnego przewijania),
      - tablet/mobile: natywny poziomy scroll-snap + strzałki,
      - reduced motion: zwykła pionowa lista (CSS).
   ============================================================ */

(function () {
  "use strict";

  var KNW = window.KNW || {};
  var $ = KNW.$ || function (s, c) { return (c || document).querySelector(s); };
  var $$ = KNW.$$ || function (s, c) {
    return Array.prototype.slice.call((c || document).querySelectorAll(s));
  };

  /* ------------------------------------------------------------
     Taby — wzorzec WAI-ARIA ze strzałkami klawiatury
     ------------------------------------------------------------ */

  function initTabs(root) {
    var tabs = $$('[role="tab"]', root);
    var panels = tabs
      .map(function (tab) {
        return document.getElementById(tab.getAttribute("aria-controls"));
      })
      .filter(Boolean);

    if (!tabs.length) return;

    function select(tab, focus) {
      tabs.forEach(function (t, i) {
        var active = t === tab;
        t.setAttribute("aria-selected", active ? "true" : "false");
        t.tabIndex = active ? 0 : -1;
        if (panels[i]) panels[i].hidden = !active;
      });
      if (focus) tab.focus();

      /* Podświetlenie stref na planie SVG */
      var planId = root.getAttribute("data-plan");
      if (planId) {
        var plan = document.getElementById(planId);
        if (plan) {
          var zones = (tab.getAttribute("data-zones") || "").split(/\s+/);
          $$("[data-zone]", plan).forEach(function (z) {
            z.classList.toggle(
              "is-lit",
              zones.indexOf(z.getAttribute("data-zone")) !== -1
            );
          });
          $$(".routine-path", plan).forEach(function (p) {
            p.classList.toggle(
              "is-lit",
              p.getAttribute("data-path") === tab.getAttribute("data-path")
            );
          });
        }
      }
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        select(tab, false);
      });

      tab.addEventListener("keydown", function (e) {
        var dir = 0;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") dir = 1;
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") dir = -1;
        if (e.key === "Home") {
          e.preventDefault();
          select(tabs[0], true);
          return;
        }
        if (e.key === "End") {
          e.preventDefault();
          select(tabs[tabs.length - 1], true);
          return;
        }
        if (!dir) return;
        e.preventDefault();
        select(tabs[(i + dir + tabs.length) % tabs.length], true);
      });
    });

    var selected =
      tabs.filter(function (t) {
        return t.getAttribute("aria-selected") === "true";
      })[0] || tabs[0];

    select(selected, false);
  }

  $$("[data-tabs]").forEach(initTabs);

  /* ------------------------------------------------------------
     Pozioma sekwencja stref
     ------------------------------------------------------------ */

  var section = $("[data-zones-section]");
  if (!section) return;

  var viewport = $(".zones__viewport", section);
  var track = $(".zones__track", section);
  var panels = $$(".zone-panel", section);
  var counterCurrent = $(".zones__counter-current", section);
  var railFill = $(".zones__railfill", section);
  var prevBtn = $("[data-zones-prev]", section);
  var nextBtn = $("[data-zones-next]", section);

  if (!viewport || !track || !panels.length) return;

  var count = panels.length;
  var mode = null;
  var ticking = false;

  var desktopQuery = window.matchMedia("(min-width: 1024px)");

  function reduced() {
    return KNW.reducedMotion ? KNW.reducedMotion() : false;
  }

  function pad(n) {
    return (n < 10 ? "0" : "") + String(n);
  }

  function setState(index, progress) {
    index = Math.max(0, Math.min(count - 1, index));
    if (counterCurrent) counterCurrent.textContent = pad(index + 1);
    panels.forEach(function (p, i) {
      p.classList.toggle("is-current", i === index);
    });
    if (railFill) {
      var base = 1 / count;
      var w = base + (1 - base) * Math.max(0, Math.min(1, progress));
      railFill.style.width = String(Math.round(w * 1000) / 10) + "%";
    }
  }

  /* --- tryb sticky (desktop) ----------------------------------- */

  function stickyUpdate() {
    ticking = false;
    var rect = section.getBoundingClientRect();
    var vh = window.innerHeight;
    var total = rect.height - vh;
    if (total <= 0) return;

    var p = Math.max(0, Math.min(1, -rect.top / total));
    var max = track.scrollWidth - viewport.clientWidth;
    track.style.transform = "translate3d(" + String(-p * max) + "px, 0, 0)";
    setState(Math.round(p * (count - 1)), p);
  }

  function onStickyScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(stickyUpdate);
    }
  }

  /* --- tryb snap (dotyk / wąskie ekrany) ------------------------ */

  function snapUpdate() {
    ticking = false;
    var max = viewport.scrollWidth - viewport.clientWidth;
    var p = max > 0 ? viewport.scrollLeft / max : 0;
    setState(Math.round(p * (count - 1)), p);
  }

  function onSnapScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(snapUpdate);
    }
  }

  function snapTo(dir) {
    var max = viewport.scrollWidth - viewport.clientWidth;
    var p = max > 0 ? viewport.scrollLeft / max : 0;
    var index = Math.round(p * (count - 1)) + dir;
    index = Math.max(0, Math.min(count - 1, index));
    var target = (index / (count - 1)) * max;
    viewport.scrollTo({
      left: target,
      behavior: reduced() ? "auto" : "smooth"
    });
  }

  /* --- przełączanie trybów -------------------------------------- */

  function applyMode() {
    var next = reduced() ? "list" : desktopQuery.matches ? "sticky" : "snap";
    if (next === mode) return;

    /* sprzątanie */
    window.removeEventListener("scroll", onStickyScroll);
    viewport.removeEventListener("scroll", onSnapScroll);
    track.style.transform = "";
    section.classList.remove("zones--sticky", "zones--snap");

    mode = next;

    if (mode === "sticky") {
      section.classList.add("zones--sticky");
      window.addEventListener("scroll", onStickyScroll, { passive: true });
      stickyUpdate();
    } else if (mode === "snap") {
      section.classList.add("zones--snap");
      viewport.addEventListener("scroll", onSnapScroll, { passive: true });
      snapUpdate();
    } else {
      setState(count - 1, 1);
    }
  }

  if (prevBtn) prevBtn.addEventListener("click", function () { snapTo(-1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { snapTo(1); });

  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", applyMode);
  }
  if (KNW.onMotionChange) KNW.onMotionChange(applyMode);
  window.addEventListener("resize", function () {
    if (mode === "sticky") onStickyScroll();
  });

  applyMode();
})();

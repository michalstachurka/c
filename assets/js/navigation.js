/* ============================================================
   navigation.js — KuchnieNaWymiar.eu (demo)
   Menu mobilne: pełny ekran, focus trap, Escape, blokada
   przewijania tła.
   ============================================================ */

(function () {
  "use strict";

  var KNW = window.KNW || {};
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-menu");

  if (!toggle || !menu) return;

  var lastFocused = null;

  function focusables() {
    return Array.prototype.slice
      .call(
        menu.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )
      .filter(function (el) {
        return el.offsetParent !== null || menu.classList.contains("is-open");
      });
  }

  function openMenu() {
    lastFocused = document.activeElement;
    menu.removeAttribute("hidden");
    /* wymuszenie reflow, aby transition zadziałał po zdjęciu [hidden] */
    void menu.offsetHeight;
    menu.classList.add("is-open");
    document.documentElement.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Zamknij menu");
    document.body.style.overflow = "hidden";

    var first = focusables()[0];
    if (first) first.focus();

    document.addEventListener("keydown", onKeydown);
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    document.documentElement.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Otwórz menu");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKeydown);

    window.setTimeout(function () {
      if (!menu.classList.contains("is-open")) menu.setAttribute("hidden", "");
    }, 600);

    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key !== "Tab") return;

    /* Pętla fokusu: menu + przycisk zamykania */
    var items = [toggle].concat(focusables());
    if (!items.length) return;

    var first = items[0];
    var last = items[items.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  toggle.addEventListener("click", function () {
    if (menu.classList.contains("is-open")) closeMenu();
    else openMenu();
  });

  /* Zamknij po wybraniu linku */
  menu.addEventListener("click", function (e) {
    var link = e.target.closest("a");
    if (link) closeMenu();
  });

  /* Porządek przy zmianie szerokości okna */
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024 && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });
})();

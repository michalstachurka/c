/* ============================================================
   gallery.js — KuchnieNaWymiar.eu (demo)
   Galeria inspiracji: render z data/projects.js, filtry,
   dostępny lightbox (dialog, Escape, strzałki, licznik).
   Dodatkowo: przełącznik problem → rozwiązanie na stronie
   głównej (przesuwany front).
   ============================================================ */

(function () {
  "use strict";

  var KNW = window.KNW || {};
  var $ = KNW.$ || function (s, c) { return (c || document).querySelector(s); };
  var $$ = KNW.$$ || function (s, c) {
    return Array.prototype.slice.call((c || document).querySelectorAll(s));
  };

  /* ------------------------------------------------------------
     Problem → rozwiązanie (strona główna)
     ------------------------------------------------------------ */

  $$("[data-inspo-toggle]").forEach(function (btn) {
    var row = btn.closest(".inspo-row");
    if (!row) return;

    btn.addEventListener("click", function () {
      var open = row.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      var label = $(".inspo-row__toggle-label", btn);
      if (label) {
        label.textContent = open ? "Wróć do problemu" : "Zobacz rozwiązanie";
      }
    });
  });

  /* ------------------------------------------------------------
     Galeria — tylko realizacje.html
     ------------------------------------------------------------ */

  var grid = $("[data-project-grid]");
  if (!grid || !window.KNW_PROJECTS) return;

  var projects = window.KNW_PROJECTS;
  var lightbox = $("#lightbox");
  var lbImg = $("[data-lb-img]", lightbox);
  var lbTitle = $("[data-lb-title]", lightbox);
  var lbCat = $("[data-lb-cat]", lightbox);
  var lbProblem = $("[data-lb-problem]", lightbox);
  var lbSolution = $("[data-lb-solution]", lightbox);
  var lbCounter = $("[data-lb-counter]", lightbox);
  var emptyNote = $("[data-grid-empty]");

  var visible = projects.slice();
  var currentIndex = 0;

  function pad(n) {
    return (n < 10 ? "0" : "") + String(n);
  }

  /* --- render kart --------------------------------------------- */

  function cardTemplate(p, i) {
    var li = document.createElement("li");
    li.className = "r-card-wrap";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "r-card";
    btn.setAttribute("data-category", p.category);
    btn.setAttribute("data-id", p.id);
    btn.setAttribute("aria-haspopup", "dialog");
    btn.setAttribute(
      "aria-label",
      p.title + " — powiększ i zobacz opis problemu i rozwiązania"
    );

    var media = document.createElement("div");
    media.className = "media-frame";

    var img = document.createElement("img");
    img.src = p.image;
    img.alt = p.alt;
    img.loading = "lazy";
    img.decoding = "async";
    if (p.ratio === "16x9") img.style.aspectRatio = "16 / 9";
    if (p.ratio === "4x3") img.style.aspectRatio = "4 / 3";
    if (p.ratio === "3x4") img.style.aspectRatio = "3 / 4";
    if (p.ratio === "4x5") img.style.aspectRatio = "4 / 5";
    media.appendChild(img);

    if (p.demo !== false) {
      var tag = document.createElement("span");
      tag.className = "demo-tag";
      tag.textContent = "Inspiracja demonstracyjna";
      media.appendChild(tag);
    }

    var body = document.createElement("div");
    body.className = "r-card__body";

    var meta = document.createElement("div");
    meta.className = "r-card__meta";
    meta.innerHTML =
      "<span>" + pad(i + 1) + "</span><span>" + p.categoryLabel + "</span>";

    var title = document.createElement("div");
    title.className = "r-card__title";
    title.textContent = p.title;

    var hint = document.createElement("div");
    hint.className = "r-card__hintline";
    hint.innerHTML =
      '<span>Problem i rozwiązanie</span>' +
      '<svg class="btn__arrow" width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">' +
      '<path d="M0 6h14M10 1l5 5-5 5" stroke="currentColor" stroke-width="1.5"/></svg>';

    body.appendChild(meta);
    body.appendChild(title);
    body.appendChild(hint);

    btn.appendChild(media);
    btn.appendChild(body);

    btn.addEventListener("click", function () {
      openLightbox(p);
    });

    li.appendChild(btn);
    return li;
  }

  projects.forEach(function (p, i) {
    grid.appendChild(cardTemplate(p, i));
  });

  /* --- filtry ---------------------------------------------------- */

  var filters = $$("[data-filter]");

  function applyFilter(value) {
    visible = [];
    $$(".r-card", grid).forEach(function (card) {
      var match = value === "all" || card.getAttribute("data-category") === value;
      card.parentNode.classList.toggle("is-hidden", !match);
      card.parentNode.style.display = match ? "" : "none";
      if (match) {
        var proj = projects.filter(function (p) {
          return p.id === card.getAttribute("data-id");
        })[0];
        if (proj) visible.push(proj);
      }
    });
    if (emptyNote) emptyNote.classList.toggle("is-visible", visible.length === 0);
  }

  filters.forEach(function (btn) {
    /* liczniki */
    var val = btn.getAttribute("data-filter");
    var count =
      val === "all"
        ? projects.length
        : projects.filter(function (p) { return p.category === val; }).length;
    var countEl = $(".r-filter__count", btn);
    if (countEl) countEl.textContent = pad(count);

    btn.addEventListener("click", function () {
      filters.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      applyFilter(val);
    });
  });

  applyFilter("all");

  /* --- lightbox --------------------------------------------------- */

  function fillLightbox(p) {
    currentIndex = visible.indexOf(p);
    if (currentIndex < 0) currentIndex = 0;

    lbImg.src = p.image;
    lbImg.alt = p.alt;
    lbTitle.textContent = p.title;
    lbCat.textContent =
      p.categoryLabel + (p.demo !== false ? " · Inspiracja demonstracyjna" : "");
    lbProblem.textContent = p.problem;
    lbSolution.textContent = p.solution;
    lbCounter.textContent =
      pad(currentIndex + 1) + " / " + pad(visible.length);
  }

  function openLightbox(p) {
    if (!lightbox || typeof lightbox.showModal !== "function") return;
    fillLightbox(p);
    lightbox.showModal();
    document.body.style.overflow = "hidden";
  }

  function step(dir) {
    if (!visible.length) return;
    var next = (currentIndex + dir + visible.length) % visible.length;
    fillLightbox(visible[next]);
  }

  if (lightbox) {
    $("[data-lb-close]", lightbox).addEventListener("click", function () {
      lightbox.close();
    });
    $("[data-lb-prev]", lightbox).addEventListener("click", function () {
      step(-1);
    });
    $("[data-lb-next]", lightbox).addEventListener("click", function () {
      step(1);
    });

    lightbox.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    });

    /* klik w tło zamyka */
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.close();
    });

    lightbox.addEventListener("close", function () {
      document.body.style.overflow = "";
    });
  }
})();

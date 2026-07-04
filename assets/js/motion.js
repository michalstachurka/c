/* ============================================================
   motion.js — KuchnieNaWymiar.eu (demo)
   Ruch funkcjonalny: wskaźnik rytmu w hero, wideo hero
   z bezpiecznym fallbackiem, postęp linii procesu,
   cykliczne podświetlenie łańcucha ruchu.
   Wszystko respektuje prefers-reduced-motion.
   ============================================================ */

(function () {
  "use strict";

  var KNW = window.KNW || {};
  var $ = KNW.$ || function (s, c) { return (c || document).querySelector(s); };
  var $$ = KNW.$$ || function (s, c) {
    return Array.prototype.slice.call((c || document).querySelectorAll(s));
  };

  /* ------------------------------------------------------------
     1. Wskaźnik rytmu stref w hero
     ------------------------------------------------------------ */

  var indicator = $("[data-rhythm-indicator]");

  if (indicator) {
    var zones = $$(".rhythm-indicator__zone", indicator);
    var current = 0;
    var timer = null;

    var setZone = function (i) {
      current = i % zones.length;
      zones.forEach(function (z, idx) {
        z.classList.toggle("is-active", idx === current);
      });
      indicator.style.setProperty(
        "--rail-x",
        String(current * 100) + "%"
      );
      indicator.style.setProperty(
        "--rail-w",
        String(100 / zones.length) + "%"
      );
    };

    var stop = function () {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    var start = function () {
      stop();
      if (KNW.reducedMotion && KNW.reducedMotion()) return;
      timer = window.setInterval(function () {
        setZone(current + 1);
      }, 3400);
    };

    setZone(0);
    start();

    /* Nie mielić w tle */
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting) start();
          else stop();
        },
        { threshold: 0.2 }
      ).observe(indicator);
    }

    if (KNW.onMotionChange) {
      KNW.onMotionChange(function () {
        start();
      });
    }
  }

  /* ------------------------------------------------------------
     2. Wideo hero — tylko gdy plik istnieje i warunki pozwalają
     Fallback: statyczny kadr pozostaje pod spodem.
     ------------------------------------------------------------ */

  var heroVideo = $("[data-hero-video]");

  if (heroVideo) {
    var connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var saveData = connection && connection.saveData;
    var smallScreen = window.matchMedia("(max-width: 767px)").matches;
    var reduced = KNW.reducedMotion && KNW.reducedMotion();

    var removeVideo = function () {
      if (heroVideo.parentNode) heroVideo.parentNode.removeChild(heroVideo);
    };

    if (reduced || saveData || smallScreen) {
      removeVideo();
    } else {
      heroVideo.addEventListener(
        "canplay",
        function () {
          heroVideo.hidden = false;
          var p = heroVideo.play();
          if (p && p.catch) p.catch(function () { removeVideo(); });
        },
        { once: true }
      );
      heroVideo.addEventListener("error", removeVideo, true);
      var src = heroVideo.querySelector("source");
      if (src) src.addEventListener("error", removeVideo);
      heroVideo.load();
    }
  }

  /* ------------------------------------------------------------
     3. Linia procesu — wypełnienie sterowane przewijaniem
     ------------------------------------------------------------ */

  var process = $("[data-process]");

  if (process) {
    var fill = $(".process__fill", process);
    var steps = $$(".process-step", process);

    var setProgress = function (t) {
      if (fill) fill.style.width = String(Math.round(t * 100)) + "%";
      steps.forEach(function (step, i) {
        var threshold = (i + 0.5) / steps.length;
        step.classList.toggle("is-passed", t >= threshold - 0.001);
      });
    };

    if (KNW.reducedMotion && KNW.reducedMotion()) {
      setProgress(1);
    } else {
      var ticking = false;

      var update = function () {
        ticking = false;
        var rect = process.getBoundingClientRect();
        var vh = window.innerHeight;
        /* 0 gdy sekcja wchodzi, 1 zanim wyjdzie */
        var t = (vh * 0.82 - rect.top) / (rect.height + vh * 0.2);
        t = Math.max(0, Math.min(1, t));
        setProgress(t);
      };

      var onScroll = function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
    }
  }

  /* ------------------------------------------------------------
     4. Łańcuch ruchu (podstrona Kuchnie) — spokojny cykl
     ------------------------------------------------------------ */

  var chain = $("[data-flow-chain]");

  if (chain && !(KNW.reducedMotion && KNW.reducedMotion())) {
    var links = $$(".flow-chain__step", chain);
    var idx = links.findIndex(function (l) {
      return l.classList.contains("flow-chain__step--hot");
    });
    if (idx < 0) idx = 0;

    var chainTimer = window.setInterval(function () {
      if (document.hidden) return;
      links[idx].classList.remove("flow-chain__step--hot");
      idx = (idx + 1) % links.length;
      links[idx].classList.add("flow-chain__step--hot");
    }, 2100);

    if (KNW.onMotionChange) {
      KNW.onMotionChange(function () {
        if (KNW.reducedMotion()) window.clearInterval(chainTimer);
      });
    }
  }
})();

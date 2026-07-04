/* ============================================================
   form-demo.js — KuchnieNaWymiar.eu (demo)
   Formularz demonstracyjny: NICZEGO nie wysyła.
   - walidacja z czytelnymi błędami,
   - komunikat demo po „wysłaniu”,
   - opcjonalny link mailto: dopiero po świadomym kliknięciu,
   - pole pliku pokazuje wyłącznie lokalną nazwę.
   ============================================================ */

(function () {
  "use strict";

  var form = document.querySelector("[data-demo-form]");
  if (!form) return;

  var status = document.querySelector("[data-form-status]");
  var mailtoBtn = document.querySelector("[data-mailto]");

  /* --- załącznik: tylko lokalny podgląd nazwy ------------------- */

  var fileInput = form.querySelector('input[type="file"]');
  var fileName = form.querySelector("[data-file-name]");

  if (fileInput && fileName) {
    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files.length) {
        fileName.textContent =
          "Wybrano lokalnie: " +
          fileInput.files[0].name +
          " (plik nie zostanie nigdzie przesłany)";
      } else {
        fileName.textContent = "Nie wybrano pliku.";
      }
    });
  }

  /* --- walidacja ------------------------------------------------- */

  function fieldWrap(input) {
    return input.closest(".field");
  }

  function setError(input, show) {
    var wrap = fieldWrap(input);
    if (!wrap) return;
    wrap.classList.toggle("has-error", show);
    input.setAttribute("aria-invalid", show ? "true" : "false");
  }

  function validate() {
    var valid = true;
    var firstInvalid = null;

    form.querySelectorAll("[required]").forEach(function (input) {
      var ok = input.value.trim().length > 0;
      setError(input, !ok);
      if (!ok) {
        valid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });

    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  form.querySelectorAll("[required]").forEach(function (input) {
    input.addEventListener("input", function () {
      if (input.value.trim().length > 0) setError(input, false);
    });
  });

  /* --- „wysłanie” -------------------------------------------------- */

  form.addEventListener("submit", function (e) {
    e.preventDefault(); /* demo: nic nie wychodzi z przeglądarki */

    if (!validate()) return;

    if (status) {
      status.classList.add("is-visible");
      status.focus();
    }

    if (mailtoBtn) {
      var get = function (name) {
        var el = form.elements[name];
        return el && el.value ? el.value.trim() : "";
      };

      var lines = [
        "Imię: " + get("imie"),
        "Kontakt: " + get("kontakt"),
        "Rodzaj zabudowy: " + get("zabudowa"),
        "Lokalizacja: " + get("lokalizacja"),
        "Etap: " + get("etap"),
        "",
        get("wiadomosc")
      ];

      mailtoBtn.href =
        "mailto:kontakt@kuchnienawymiar.eu" +
        "?subject=" +
        encodeURIComponent("Zapytanie ze strony (demo) — meble na wymiar") +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
    }
  });
})();

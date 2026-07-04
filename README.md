# KuchnieNaWymiar.eu — demonstracyjna koncepcja strony

> **Nieoficjalna koncepcja demonstracyjna — projekt nie jest oficjalną stroną firmy.**
> Zbudowana na podstawie plików projektowych `claude.md` + `01…09` (koncepcja
> **„Kuchnia ma swój rytm”**). Czysty HTML + CSS + vanilla JS, bez frameworków
> i bibliotek. Strona ma `noindex, nofollow, noarchive` i formularz,
> który **niczego nie wysyła**.

---

## 1. Jak uruchomić lokalnie

Strona jest w pełni statyczna. Najprościej:

```bash
# w katalogu projektu
python3 -m http.server 8000
# → http://localhost:8000
```

albo dowolny inny serwer statyczny (`npx serve`, rozszerzenie Live Server itd.).
Otwarcie `index.html` bezpośrednio z dysku (file://) też działa — fonty
i grafiki są hostowane lokalnie.

## 2. Struktura plików

```text
/
├── index.html            strona główna (hero, rytm dnia, 5 stref, oferta, proces, inspiracje, CTA)
├── kuchnie.html          priorytety, materiały, układy (diagramy), przygotowanie do wyceny
├── inne-meble.html       szafy (interaktywna elewacja), łazienki, biura, wspólny język materiałów
├── realizacje.html       galeria z filtrami + dostępny lightbox (dane z data/projects.js)
├── kontakt.html          arkusz briefu (formularz demo), dane kontaktowe, lista przygotowania
├── assets/
│   ├── css/              fonts.css, reset.css, tokens.css, components.css, pages.css, responsive.css
│   ├── js/               main.js, navigation.js, motion.js, zones.js, gallery.js, form-demo.js
│   ├── fonts/            Fraunces, Bricolage Grotesque, Azeret Mono (woff2, subset latin + latin-ext)
│   ├── images/           placeholdery SVG (patrz punkt 4)
│   ├── video/            miejsce na hero wideo (patrz punkt 4)
│   └── icons/            favicon.svg
├── data/
│   └── projects.js       dane galerii inspiracji (łatwa podmiana na realne realizacje)
└── README.md
```

## 3. Typografia i licencje

- **Fraunces** — duże nagłówki (zmienna, `opsz/wght`, + italic dla akcentów),
- **Bricolage Grotesque** — tekst, UI, przyciski,
- **Azeret Mono** — etykiety techniczne, numery stref, wymiary.

Wszystkie trzy rodziny pochodzą z Google Fonts i są dostępne na licencji
**SIL Open Font License 1.1** — pliki `woff2` są hostowane lokalnie
w `assets/fonts/` (subsety `latin` i `latin-ext`, wymagane dla polskich znaków).

## 4. Materiały wizualne — CO JEST PLACEHOLDEREM

**Wszystkie obrazy w demo to autorskie placeholdery SVG** w stylistyce rysunku
warsztatowego (elewacje, plany, przekroje) w palecie projektu. Zgodnie ze
specyfikacją *nie* użyto przypadkowych zdjęć stockowych ani zdjęć firmy.
Docelowe materiały należy wygenerować promptami z `06-image-prompts.md`
i podmienić **1:1 po nazwie pliku** (zmieniając rozszerzenie na `.webp`
w HTML/`data/projects.js`):

| Placeholder (SVG) | Docelowy plik wg 06-image-prompts.md |
|---|---|
| `assets/images/hero-kitchen-rhythm-16x9.svg` | `hero-kitchen-rhythm-16x9.webp` (prompt 1) |
| `assets/images/kitchen-zones-top-view-4x3.svg` | `kitchen-zones-top-view-4x3.webp` (prompt 2) |
| `assets/images/zone-storage-pantry-3x4.svg` | `zone-storage-pantry-3x4.webp` (prompt 3) |
| `assets/images/zone-preparation-counter-3x4.svg` | `zone-preparation-counter-3x4.webp` (prompt 4) |
| `assets/images/zone-cleanup-sink-3x4.svg` | `zone-cleanup-sink-3x4.webp` (prompt 5) |
| `assets/images/materials-touch-detail-16x9.svg` | `materials-touch-detail-16x9.webp` (prompt 6) |
| `assets/images/wardrobe-inside-out-4x5.svg` | `wardrobe-inside-out-4x5.webp` (prompt 7) |
| `assets/images/bathroom-furniture-compact-4x5.svg` | `bathroom-furniture-compact-4x5.webp` (prompt 8) |

Placeholdery **bez gotowego promptu** (do dopisania na wzór promptów 3–5,
albo do zastąpienia zdjęciami klienta):

- `assets/images/zone-everyday-storage-3x4.svg` — strefa „Przechowywanie”
  (szuflady z wkładami),
- `assets/images/zone-cooking-station-3x4.svg` — strefa „Gotowanie”,
- `assets/images/inspiration-corner-solution-4x3.svg` — inspiracja „Trudny narożnik”,
- `assets/images/inspiration-narrow-kitchen-4x3.svg` — inspiracja „Wąska kuchnia”,
- `assets/images/inspiration-hidden-storage-4x3.svg` — inspiracja „Ukryte przechowywanie”.

**Wideo hero** (`assets/video/hero-kitchen-rhythm.mp4`) nie istnieje w repo —
markup i logika są gotowe (`motion.js`): wideo włącza się tylko wtedy, gdy plik
istnieje, ekran jest ≥768 px, użytkownik nie ma `prefers-reduced-motion`
ani `Save-Data`. Do wygenerowania promptami z `07-video-prompts.md`
(MP4 H.264 1080p ≤ ~6 MB + opcjonalnie WebM). Bez pliku strona używa
statycznego kadru — to zachowanie zgodne ze specyfikacją.

Po otrzymaniu **prawdziwych realizacji od firmy**: podmień `image`/`alt`
w `data/projects.js` i ustaw `demo: false` — etykieta „Inspiracja
demonstracyjna” zniknie automatycznie.

## 5. Dane, których celowo NIE ma w demie

Zgodnie z `01-research.md` (sekcje 4, 10, 11) pominięto lub opisano ostrożnie:

- liczbę „1000+ realizacji”, rabat „do −40%”, liczniki i statystyki,
- opinie klientów i logotypy partnerów,
- zakres gwarancji, terminy wyceny, soft-close „w standardzie”,
- marki płyt, blatów i okuć,
- obszar działania poza Krakowem.

Elementy wymagające potwierdzenia przez firmę są oznaczone w treści
(przypisy „wymaga potwierdzenia przez firmę”) — m.in. zakres mebli biurowych
i szczegóły procesu.

## 6. Dostępność i zachowanie

- jeden `<h1>` na podstronę, semantyczne sekcje i nagłówki, skip-link,
- menu mobilne: pełny ekran, focus trap, `Escape`, blokada przewijania tła,
- taby (rytm dnia, priorytety): wzorzec WAI-ARIA, strzałki, `Home`/`End`,
- lightbox: `<dialog>` + `showModal()` (natywny focus trap i `Escape`),
  strzałki ←/→, licznik, klik w tło zamyka,
- pozioma sekwencja stref: desktop — pionowy scroll steruje przesuwem
  (bez scroll-jackingu), dotyk — natywny scroll-snap + przyciski,
  `prefers-reduced-motion` — zwykła pionowa lista,
- wszystkie animacje wyłączane przez `prefers-reduced-motion: reduce`,
- formularz: `novalidate` + własne komunikaty, `aria-live`, pole pliku
  pokazuje tylko lokalną nazwę i niczego nie przesyła; `mailto:` otwiera się
  wyłącznie po świadomym kliknięciu użytkownika.

## 7. Krytyka wizualna po pierwszej wersji — co poprawiono

Po zbudowaniu pierwszej działającej wersji wykonano przegląd zrzutów
(360 / 768 / 1440 / 1920 px + stany interakcji) i poprawiono najsłabsze,
zbyt generyczne elementy — pełna lista w sekcji „Poprawki po krytyce”
na końcu tego pliku.

## 8. Konwersja na WordPress (na później)

Kod trzyma się prostych zasad pod przyszłą konwersję: tokeny w `tokens.css`,
komponenty klasowe bez zależności od JS frameworków, dane galerii w jednym
pliku `data/projects.js`, powtarzalny header/footer możliwy do przeniesienia
do szablonów PHP.

---

## Poprawki po krytyce (changelog)

Przegląd pierwszej wersji wykazał 5 słabych punktów; wszystkie poprawiono:

1. **Rysunki placeholder były wyblakłe** (kreski 1,4 px w viewBox 1200–1600 po
   przeskalowaniu do rozmiaru karty schodziły poniżej piksela — karty galerii
   i pasma oferty wyglądały jak puste szare prostokąty, czyli dokładnie
   „generyczna atrapa”). Przegenerowano wszystkie 13 plików: globalne
   pogrubienie kresek ×2,4, ciemniejsze wypełnienia paneli, mocniejsze słoje
   drewna i hachury.
2. **„Wąska kuchnia” i hero** — najbardziej puste kompozycje dogęszczono:
   plan wąskiej kuchni dostał poché ścian, dwa ciągi o różnych głębokościach,
   większe sprzęty i stonowany pas przejścia (Celery ≤ 8% zgodnie z brand
   systemem); elewacja hero dostała reling z akcesoriami nad blatem.
3. **Fronty interaktywnej szafy** (inne-meble) „pływały” poza korpusem —
   dodano `clipPath` i większy przesuw (±93 %), przez co chowają się za
   krawędzią jak realne drzwi przesuwne, zostawiając czytelne wnętrze.
4. **Nagłówek sekcji pięciu stref** wchodził pod przyklejony header w trybie
   sticky — dodano kompensujący padding; indeks sekcji i licznik `03 / 05`
   są teraz zawsze widoczne.
5. **Backdrop lightboxa** prześwitywał (0,94 → 0,97) — podgląd inspiracji
   nie konkuruje już z treścią strony pod spodem.

Testy końcowe: brak błędów JS na wszystkich podstronach; `prefers-reduced-motion`
zamienia sekwencję stref w pionową listę i usuwa wideo; taby działają strzałkami;
menu mobilne zamyka się Escape z powrotem fokusu; formularz nie wysyła danych
(status + opcjonalny `mailto:` po świadomym kliknięciu). Jedyny wpis w konsoli
to oczekiwane 404 nieistniejącego jeszcze hero-wideo (opisane w pkt 4).

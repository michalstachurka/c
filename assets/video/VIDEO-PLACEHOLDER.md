# Hero wideo — do wygenerowania

Docelowy plik: `hero-kitchen-rhythm.mp4` (MP4 H.264, 1080p, 3–6 Mbps, ≤ ~6 MB,
bez dźwięku) + opcjonalnie `hero-kitchen-rhythm.webm` (VP9/AV1).

Prompty i parametry: patrz `07-video-prompts.md` w dokumentacji projektu.

Zachowanie strony bez pliku: hero używa statycznego kadru
(`assets/images/hero-kitchen-rhythm-16x9.svg`, docelowo `.webp`) —
`assets/js/motion.js` usuwa element `<video>`, gdy źródło nie istnieje,
gdy użytkownik ma `prefers-reduced-motion` / `Save-Data` albo ekran < 768 px.

Po dodaniu pliku wideo nic nie trzeba zmieniać w kodzie — wystarczy,
że plik pojawi się pod powyższą nazwą. Warto wtedy też podmienić `poster`
w `index.html` na docelowy kadr `.webp`.

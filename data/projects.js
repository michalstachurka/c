/* ============================================================
   data/projects.js — KuchnieNaWymiar.eu (demo)

   Dane galerii inspiracji. KAŻDA pozycja jest materiałem
   demonstracyjnym (rysunek poglądowy / docelowo grafika
   wygenerowana wg 06-image-prompts.md) — NIE jest to
   udokumentowana realizacja firmy.

   Podmiana na prawdziwe realizacje klienta:
   1. wgraj zdjęcie do assets/images/,
   2. podmień "image" i "alt",
   3. ustaw "demo": false — zniknie etykieta
      „Inspiracja demonstracyjna”.
   ============================================================ */

window.KNW_PROJECTS = [
  {
    id: "kuchnia-rytm-dnia",
    title: "Kuchnia w rytmie dnia",
    category: "kuchnie",
    categoryLabel: "Kuchnie",
    image: "assets/images/hero-kitchen-rhythm-16x9.svg",
    ratio: "16x9",
    alt: "Rysunek poglądowy kuchni na wymiar z wyraźnymi strefami przechowywania, przygotowania i gotowania",
    problem: "Trzy strefy pracy rozrzucone po przeciwnych stronach pomieszczenia wydłużały każdą codzienną czynność.",
    solution: "Wysoka zabudowa zapasów przy wejściu, długi nieprzerwany blat i strefa gotowania w jednej sekwencji ruchu.",
    demo: true
  },
  {
    id: "uklad-z-gory",
    title: "Plan pięciu stref",
    category: "kuchnie",
    categoryLabel: "Kuchnie",
    image: "assets/images/kitchen-zones-top-view-4x3.svg",
    ratio: "4x3",
    alt: "Widok kuchni z góry pokazujący relacje między głównymi strefami pracy",
    problem: "Układ narzucony przez deweloperskie przyłącza nie odpowiadał kolejności: zakupy → mycie → krojenie → gotowanie.",
    solution: "Przeplanowanie ciągu roboczego tak, aby droga między lodówką, zlewem i płytą tworzyła krótki, naturalny trójkąt.",
    demo: true
  },
  {
    id: "spizarnia-wysoka",
    title: "Spiżarnia w wysokiej zabudowie",
    category: "kuchnie",
    categoryLabel: "Kuchnie",
    image: "assets/images/zone-storage-pantry-3x4.svg",
    ratio: "3x4",
    alt: "Wysoka zabudowa kuchenna z uporządkowaną strefą zapasów",
    problem: "Zapasy w płytkich szafkach nad blatem — produkty ginęły w drugim rzędzie i przeterminowywały się.",
    solution: "Jedna wysoka sekcja z pełnym wysuwem i szufladami wewnętrznymi: wszystko widoczne po jednym otwarciu.",
    demo: true
  },
  {
    id: "szuflady-codzienne",
    title: "Szuflady zamiast półek",
    category: "detale",
    categoryLabel: "Detale",
    image: "assets/images/zone-everyday-storage-3x4.svg",
    ratio: "3x4",
    alt: "Trzy szuflady kuchenne z wkładami na talerze, sztućce i garnki",
    problem: "Schylanie się do głębokich półek po garnki i talerze ustawione jeden na drugim.",
    solution: "Szuflady z pełnym wysuwem i wkładami: talerze, sztućce i garnki w zasięgu jednego ruchu, bez przekładania.",
    demo: true
  },
  {
    id: "blat-przygotowania",
    title: "Nieprzerwany blat roboczy",
    category: "kuchnie",
    categoryLabel: "Kuchnie",
    image: "assets/images/zone-preparation-counter-3x4.svg",
    ratio: "3x4",
    alt: "Przestronny blat roboczy z niszą i światłem roboczym w kuchni na wymiar",
    problem: "Blat pocięty sprzętami na krótkie odcinki — brakowało miejsca, żeby wygodnie kroić obok zlewu.",
    solution: "Sprzęty przesunięte na skraj ciągu, nisza na akcesoria i światło robocze nad całą długością przygotowania.",
    demo: true
  },
  {
    id: "strefa-gotowania",
    title: "Strefa gotowania pod ręką",
    category: "detale",
    categoryLabel: "Detale",
    image: "assets/images/zone-cooking-station-3x4.svg",
    ratio: "3x4",
    alt: "Strefa gotowania z płytą, okapem i półką na przyprawy",
    problem: "Przyprawy i akcesoria do gotowania przechowywane po drugiej stronie kuchni.",
    solution: "Głębokie szuflady pod płytą i półka przyprawowa na wyciągnięcie ręki od garnka.",
    demo: true
  },
  {
    id: "zmywanie-porzadek",
    title: "Zmywanie i segregacja",
    category: "detale",
    categoryLabel: "Detale",
    image: "assets/images/zone-cleanup-sink-3x4.svg",
    ratio: "3x4",
    alt: "Strefa zmywania ze zmywarką w zabudowie i szafką segregacji odpadów",
    problem: "Kosz stojący luzem i detergenty na blacie psuły porządek tuż po jego zrobieniu.",
    solution: "Szafka segregacji pod zlewem i zmywarka w zabudowie — porządkowanie kończy się jednym domknięciem frontu.",
    demo: true
  },
  {
    id: "detal-materialow",
    title: "Styk czterech materiałów",
    category: "detale",
    categoryLabel: "Detale",
    image: "assets/images/materials-touch-detail-16x9.svg",
    ratio: "16x9",
    alt: "Detal połączenia frontu, blatu, uchwytu frezowanego i wnętrza szuflady",
    problem: "Efektowne materiały z katalogu, które w codziennym użyciu okazywały się niewygodne przy otwieraniu i czyszczeniu.",
    solution: "Dobór frontu, blatu i uchwytu w jednym miejscu styku — sprawdzony dłonią, nie tylko okiem.",
    demo: true
  },
  {
    id: "szafa-od-srodka",
    title: "Szafa projektowana od środka",
    category: "szafy",
    categoryLabel: "Szafy",
    image: "assets/images/wardrobe-inside-out-4x5.svg",
    ratio: "4x5",
    alt: "Szafa na wymiar z drążkami o różnych wysokościach, półkami i szufladami",
    problem: "Katalogowy podział szafy: jeden drążek i sterta rzeczy, których nie dało się sensownie ułożyć.",
    solution: "Podział wnętrza od listy zawartości: dwa poziomy drążków, szuflady na drobiazgi i strefa na rzeczy sezonowe.",
    demo: true
  },
  {
    id: "lazienka-kompakt",
    title: "Łazienka na trudnych wymiarach",
    category: "lazienki",
    categoryLabel: "Łazienki",
    image: "assets/images/bathroom-furniture-compact-4x5.svg",
    ratio: "4x5",
    alt: "Meble łazienkowe na wymiar w kompaktowym wnętrzu z zabudową umywalki i wysokim słupkiem",
    problem: "Typowe szafki nie mieściły się między instalacją a ścianą, a rzeczy nie miały swojego miejsca.",
    solution: "Zabudowa od ściany do ściany wokół przyłączy: umywalka na blacie, słupek i ukryty kosz w jednej kompozycji.",
    demo: true
  },
  {
    id: "trudny-naroznik",
    title: "Narożnik bez martwej strefy",
    category: "kuchnie",
    categoryLabel: "Kuchnie",
    image: "assets/images/inspiration-corner-solution-4x3.svg",
    ratio: "4x3",
    alt: "Plan narożnika kuchni z mechanizmem obrotowym wykorzystującym martwą strefę",
    problem: "Głęboki narożnik, do którego nikt nie sięgał — najdroższe centymetry kuchni stały puste.",
    solution: "Mechanizm obrotowy zaplanowany pod konkretne rzeczy, które naprawdę będą tam przechowywane.",
    demo: true
  },
  {
    id: "waska-kuchnia",
    title: "Wąska kuchnia w dwóch liniach",
    category: "kuchnie",
    categoryLabel: "Kuchnie",
    image: "assets/images/inspiration-narrow-kitchen-4x3.svg",
    ratio: "4x3",
    alt: "Plan wąskiej kuchni z dwoma równoległymi ciągami i zachowanym przejściem",
    problem: "Wąskie pomieszczenie, w którym każda głębsza szafka zabierała przejście.",
    solution: "Dwa równoległe ciągi o różnych głębokościach i pilnowany wymiar przejścia — więcej blatu bez ciasnoty.",
    demo: true
  },
  {
    id: "ukryte-przechowywanie",
    title: "Zabudowa, która znika",
    category: "szafy",
    categoryLabel: "Szafy",
    image: "assets/images/inspiration-hidden-storage-4x3.svg",
    ratio: "4x3",
    alt: "Ściana zabudowy z frontami kieszeniowymi odsłaniającymi wewnętrzne półki",
    problem: "Otwarte regały zbierały kurz i wizualny chaos w pokoju dziennym.",
    solution: "Spokojna ściana frontów z chowanymi drzwiami: na co dzień cisza, po otwarciu — pełnowymiarowe miejsce pracy.",
    demo: true
  }
];

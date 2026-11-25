export interface CriticalPoint {
  value: number;
  label?: string;
  source: 'numerator' | 'denominator' | 'denominator_hole';
  included: boolean; // true = bulatan penuh (solid), false = bulatan kosong (open)
  isCanceledHole?: boolean; // khusus faktor yang dicoret pada Soal 5 (x != -2)
}

export interface RasionalStep {
  latex: string;
  note: string;
  isAlert?: boolean;
}

export interface RasionalProblem {
  id: string;
  compId: string;
  number: number;
  title: string;
  subtitle: string;
  problemLatex: string;
  durationFrames: number;
  steps: RasionalStep[];
  criticalPoints: CriticalPoint[];
  intervalSigns: ('+' | '-')[];
  axisRange: [number, number];
  hpSign: '+' | '-';
  hpSet: string;
  hpInterval: string;
  alertNote?: string;
}

export interface RasionalConceptPhase {
  title: string;
  subtitle: string;
  badge: string;
}

export const RASIONAL_CONCEPT = {
  phases: [
    {
      title: 'Pengertian & Bentuk Umum',
      subtitle: 'Bentuk f(x)/g(x) dengan Syarat Mutlak Penyebut',
      badge: 'Fase 1 / 3',
      generalForm: '\\frac{f(x)}{g(x)} > 0, \\quad \\frac{f(x)}{g(x)} \\ge 0, \\quad \\frac{f(x)}{g(x)} < 0, \\quad \\frac{f(x)}{g(x)} \\le 0',
      denominatorRule: 'g(x) \\neq 0',
      description: 'Pertidaksamaan rasional adalah pecahan yang pembilang dan/atau penyebutnya memuat variabel x. Syarat mutlak: penyebut TIDAK BOLEH bernilai nol.',
    },
    {
      title: 'Konsep Kritis: Pembilang vs Penyebut',
      subtitle: 'Aturan Bulatan Penuh vs Bulatan Kosong',
      badge: 'Fase 2 / 3',
      introExample: '\\frac{x - 2}{x + 1} \\ge 0',
      numeratorZero: 'x - 2 = 0 \\implies x = 2 \\quad (\\bullet \\text{ Boleh Masuk})',
      denominatorZero: 'x + 1 = 0 \\implies x = -1 \\quad (\\circ \\text{ Selalu Dikecualikan})',
      rule: 'Pembuat nol pembilang ikut jika bertanda ≤ atau ≥. Pembuat nol penyebut SELALU dikecualikan (bulatan kosong ○) apa pun tandanya!',
    },
    {
      title: 'Tabel Uji Tanda & 5 Langkah Emas',
      subtitle: 'Menentukan Daerah Positif (+) dan Negatif (-)',
      badge: 'Fase 3 / 3',
      rules: [
        { label: '(+) / (+) = (+)', desc: 'Tanda sama menghasilkan positif' },
        { label: '(-) / (-) = (+)', desc: 'Tanda sama menghasilkan positif' },
        { label: '(+) / (-) = (-)', desc: 'Tanda beda menghasilkan negatif' },
        { label: '(-) / (+) = (-)', desc: 'Tanda beda menghasilkan negatif' },
      ],
      goldenSteps: [
        '1. Nolkan ruas kanan (jadikan 0 di kanan)',
        '2. Samakan penyebut & faktorkan suku-sukunya',
        '3. Tentukan titik kritis pembilang dan penyebut',
        '4. Buat garis bilangan & uji tanda di setiap interval',
        '5. Tuliskan Himpunan Penyelesaian (ingat syarat penyebut ≠ 0)',
      ],
    },
  ],
};

export const RASIONAL_PROBLEMS: RasionalProblem[] = [
  // CONTOH 1: DASAR
  {
    id: 'soal-1',
    compId: 'Scene07A-Rasional-Soal1',
    number: 1,
    title: 'Contoh 1 — Pertidaksamaan Rasional Dasar',
    subtitle: 'Menentukan titik kritis pembilang dan penyebut',
    problemLatex: '\\frac{x - 2}{x + 1} \\ge 0',
    durationFrames: 1050,
    steps: [
      {
        latex: 'x - 2 = 0 \\implies x = 2 \\quad (\\text{Pembilang})',
        note: 'Titik kritis pembilang bernilai 2 (bulatan penuh karena tanda ≥)',
      },
      {
        latex: 'x + 1 = 0 \\implies x = -1 \\quad (\\text{Penyebut})',
        note: 'Titik kritis penyebut bernilai -1 (selalu bulatan kosong, x ≠ -1)',
        isAlert: true,
      },
      {
        latex: '\\text{Interval: } (-\\infty, -1), \\; (-1, 2), \\; (2, \\infty)',
        note: 'Garis bilangan terbagi menjadi 3 daerah uji tanda',
      },
      {
        latex: 'x < -1 \\; (+), \\; -1 < x < 2 \\; (-), \\; x > 2 \\; (+)',
        note: 'Substitusi titik uji menghasilkan pola tanda (+, -, +)',
      },
      {
        latex: 'x < -1 \\quad \\lor \\quad x \\ge 2',
        note: 'Ambil daerah bernilai positif (+) sesuai tanda ≥',
      },
    ],
    criticalPoints: [
      { value: -1, source: 'denominator', included: false },
      { value: 2, source: 'numerator', included: true },
    ],
    intervalSigns: ['+', '-', '+'],
    axisRange: [-4, 5],
    hpSign: '+',
    hpSet: '\\{x \\mid x < -1 \\text{ atau } x \\ge 2, x \\in \\mathbb{R}\\}',
    hpInterval: '(-\\infty, -1) \\cup [2, \\infty)',
  },

  // CONTOH 2: TINGKAT MENENGAH (FAKTORISASI PEMBILANG)
  {
    id: 'soal-2',
    compId: 'Scene07B-Rasional-Soal2',
    number: 2,
    title: 'Contoh 2 — Faktorisasi Pembilang Kuadrat',
    subtitle: 'Faktorisasi selisih kuadrat pada pembilang',
    problemLatex: '\\frac{x^2 - 4}{x - 1} < 0',
    durationFrames: 1050,
    steps: [
      {
        latex: '\\frac{(x - 2)(x + 2)}{x - 1} < 0',
        note: 'Faktorkan pembilang x² - 4 menjadi (x - 2)(x + 2)',
      },
      {
        latex: '\\text{Titik Pembilang: } x = -2, \\; x = 2',
        note: 'Kedua titik pembilang memakai bulatan kosong (tanda <)',
      },
      {
        latex: '\\text{Titik Penyebut: } x - 1 = 0 \\implies x = 1',
        note: 'Penyebut nol di x = 1 (syarat x ≠ 1, bulatan kosong)',
        isAlert: true,
      },
      {
        latex: '\\text{Uji tanda 4 daerah: } -, \\; +, \\; -, \\; +',
        note: 'Substitusi uji tanda menghasilkan selang-seling (-, +, -, +)',
      },
      {
        latex: 'x < -2 \\quad \\lor \\quad 1 < x < 2',
        note: 'Ambil daerah negatif (-) sesuai tanda pertidaksamaan <',
      },
    ],
    criticalPoints: [
      { value: -2, source: 'numerator', included: false },
      { value: 1, source: 'denominator', included: false },
      { value: 2, source: 'numerator', included: false },
    ],
    intervalSigns: ['-', '+', '-', '+'],
    axisRange: [-4, 4],
    hpSign: '-',
    hpSet: '\\{x \\mid x < -2 \\text{ atau } 1 < x < 2, x \\in \\mathbb{R}\\}',
    hpInterval: '(-\\infty, -2) \\cup (1, 2)',
  },

  // CONTOH 3: TANDA LEBIH KECIL SAMA DENGAN
  {
    id: 'soal-3',
    compId: 'Scene07C-Rasional-Soal3',
    number: 3,
    title: 'Contoh 3 — Pertidaksamaan Bertanda ≤',
    subtitle: 'Ketelitian pada titik pembilang pecahan',
    problemLatex: '\\frac{2x + 1}{x - 3} \\le 0',
    durationFrames: 1050,
    steps: [
      {
        latex: '2x + 1 = 0 \\implies x = -\\frac{1}{2} \\quad (\\bullet)',
        note: 'Pembilang bernilai nol di x = -1/2 (ikut serta, bulatan penuh)',
      },
      {
        latex: 'x - 3 = 0 \\implies x = 3 \\quad (\\circ)',
        note: 'Penyebut bernilai nol di x = 3 (syarat x ≠ 3, bulatan kosong)',
        isAlert: true,
      },
      {
        latex: 'x < -\\frac{1}{2} \\; (+), \\; -\\frac{1}{2} < x < 3 \\; (-), \\; x > 3 \\; (+)',
        note: 'Uji nilai di 3 interval menghasilkan pola (+, -, +)',
      },
      {
        latex: '-\\frac{1}{2} \\le x < 3',
        note: 'Ambil daerah negatif (-); x = -1/2 siku [ ], x = 3 kurung ( )',
      },
    ],
    criticalPoints: [
      { value: -0.5, label: '-1/2', source: 'numerator', included: true },
      { value: 3, source: 'denominator', included: false },
    ],
    intervalSigns: ['+', '-', '+'],
    axisRange: [-3, 5],
    hpSign: '-',
    hpSet: '\\left\\{x \\mid -\\frac{1}{2} \\le x < 3, x \\in \\mathbb{R}\\right\\}',
    hpInterval: '\\left[-\\frac{1}{2}, 3\\right)',
  },

  // CONTOH 4: PEMBILANG KUADRAT SELISIH SEMPURNA
  {
    id: 'soal-4',
    compId: 'Scene07D-Rasional-Soal4',
    number: 4,
    title: 'Contoh 4 — Pembilang Kuadrat & Tanda ≥',
    subtitle: 'Faktorisasi selisih kuadrat x² - 9',
    problemLatex: '\\frac{x^2 - 9}{x + 2} \\ge 0',
    durationFrames: 1050,
    steps: [
      {
        latex: '\\frac{(x - 3)(x + 3)}{x + 2} \\ge 0',
        note: 'Faktorkan x² - 9 menjadi (x - 3)(x + 3)',
      },
      {
        latex: '\\text{Titik Pembilang: } x = -3, \\; x = 3 \\quad (\\bullet)',
        note: 'Titik pembilang ikut serta karena tanda ≥ (bulatan penuh)',
      },
      {
        latex: '\\text{Titik Penyebut: } x + 2 = 0 \\implies x = -2 \\quad (\\circ)',
        note: 'Penyebut tidak boleh nol (x ≠ -2, bulatan kosong)',
        isAlert: true,
      },
      {
        latex: 'x < -3 \\; (-), \\; (-3, -2) \\; (+), \\; (-2, 3) \\; (-), \\; x > 3 \\; (+)',
        note: 'Substitusi uji menghasilkan pola tanda (-, +, -, +)',
      },
      {
        latex: '-3 \\le x < -2 \\quad \\lor \\quad x \\ge 3',
        note: 'Ambil daerah positif (+) serta titik batas pembilang',
      },
    ],
    criticalPoints: [
      { value: -3, source: 'numerator', included: true },
      { value: -2, source: 'denominator', included: false },
      { value: 3, source: 'numerator', included: true },
    ],
    intervalSigns: ['-', '+', '-', '+'],
    axisRange: [-5, 5],
    hpSign: '+',
    hpSet: '\\{x \\mid -3 \\le x < -2 \\text{ atau } x \\ge 3, x \\in \\mathbb{R}\\}',
    hpInterval: '[-3, -2) \\cup [3, \\infty)',
  },

  // CONTOH 5: FAKTOR SAMA (JEBAKAN CORET)
  {
    id: 'soal-5',
    compId: 'Scene07E-Rasional-Soal5',
    number: 5,
    title: 'Contoh 5 — Jebakan Faktor Tercoret',
    subtitle: 'Faktor sama di pembilang dan penyebut (Lubang Fungsi)',
    problemLatex: '\\frac{x^2 - x - 6}{x^2 - 4} > 0',
    durationFrames: 1200,
    steps: [
      {
        latex: '\\frac{(x - 3)(x + 2)}{(x - 2)(x + 2)} > 0',
        note: 'Faktorkan pembilang dan penyebut ke bentuk linier',
      },
      {
        latex: '\\text{Syarat Mutlak: } x \\neq -2 \\quad \\text{dan} \\quad x \\neq 2',
        note: 'Kunci syarat penyebut awal sebelum mencoret faktor apa pun!',
        isAlert: true,
      },
      {
        latex: '\\frac{x - 3}{x - 2} > 0 \\quad \\text{dengan syarat } x \\neq -2',
        note: 'Faktor (x + 2) dicoret untuk uji tanda, namun x = -2 tetap lubang (○)',
        isAlert: true,
      },
      {
        latex: '\\text{Titik kritis bentuk sederhana: } x = 2, \\; x = 3',
        note: 'Bentuk sederhana positif di x < 2 atau x > 3',
      },
      {
        latex: 'x < -2 \\quad \\lor \\quad -2 < x < 2 \\quad \\lor \\quad x > 3',
        note: 'Keluarkan titik lubang x = -2 dari daerah x < 2',
      },
    ],
    criticalPoints: [
      { value: -2, source: 'denominator_hole', included: false, isCanceledHole: true },
      { value: 2, source: 'denominator', included: false },
      { value: 3, source: 'numerator', included: false },
    ],
    intervalSigns: ['+', '+', '-', '+'],
    axisRange: [-4, 5],
    hpSign: '+',
    hpSet: '\\{x \\mid x < -2 \\text{ atau } -2 < x < 2 \\text{ atau } x > 3\\}',
    hpInterval: '(-\\infty, -2) \\cup (-2, 2) \\cup (3, \\infty)',
    alertNote: 'Faktor (x+2) dicoret, namun x = -2 tetap lubang tak terdefinisi!',
  },
];

export const RASIONAL_MISTAKES_SUMMARY = {
  mistakes: [
    {
      title: '1. Mengabaikan Syarat Penyebut (g(x) ≠ 0)',
      desc: 'Penyebut pecahan tidak boleh nol. Titik pembuat nol penyebut SELALU berupa bulatan kosong (○) dan tidak pernah masuk ke solusi.',
    },
    {
      title: '2. Memasukkan Titik Pembilang saat Tanda Murni (< atau >)',
      desc: 'Jika pertidaksamaan bertanda < atau >, pembuat nol pembilang bernilai bulatan kosong (○), bukan bulatan penuh.',
    },
    {
      title: '3. Melupakan Lubang saat Faktor Dicoret',
      desc: 'Jika faktor (x - c) dicoret, titik x = c tetap tidak boleh masuk solusi karena sejak awal membuat pecahan tidak terdefinisi.',
    },
    {
      title: '4. Mengalikan Silang Tanpa Mengetahui Tanda',
      desc: 'DILARANG mengalikan silang penyebut bervariabel jika tidak yakin apakah nilainya positif atau negatif karena arah tanda bisa terbalik!',
    },
  ],
  summaryPoints: [
    'Langkah 1: Ruas kanan wajib dijadikan nol.',
    'Langkah 2: Faktorkan pembilang dan penyebut.',
    'Langkah 3: Tentukan titik kritis (pembilang dan penyebut).',
    'Langkah 4: Lakukan uji tanda interval (+ / -) pada garis bilangan.',
    'Langkah 5: Tuliskan HP dengan memastikan penyebut tidak sama dengan nol.',
  ],
};

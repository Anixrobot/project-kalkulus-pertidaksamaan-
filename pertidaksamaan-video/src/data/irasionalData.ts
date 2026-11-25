export interface IrasionalLayer {
  label: string;
  condition: string;
  from: number;
  to: number;
  includeStart: boolean;
  includeEnd: boolean;
  color: string;
  toInfinity?: boolean;
  fromNegativeInfinity?: boolean;
  revealAtStep?: number;
}

export interface IrasionalIntersection {
  from: number;
  to: number;
  includeStart: boolean;
  includeEnd: boolean;
  toInfinity?: boolean;
}

export interface IrasionalStep {
  latex: string;
  note: string;
  isAlert?: boolean;
}

export interface IrasionalProblem {
  id: string;
  compId: string;
  number: number;
  title: string;
  subtitle: string;
  problemLatex: string;
  durationFrames: number;
  steps: IrasionalStep[];
  axisRange: [number, number];
  layers: IrasionalLayer[];
  intersection: IrasionalIntersection;
  hpSet: string;
  hpInterval: string;
  alertNote?: string;
}

export const IRASIONAL_CONCEPT = {
  phases: [
    {
      title: 'Pengertian Pertidaksamaan Irasional',
      subtitle: 'Variabel Berada di Bawah Tanda Akar',
      badge: 'Fase 1 / 3',
      generalForms: [
        '\\sqrt{x - 3} < 2',
        '\\sqrt{2x + 1} \\ge \\sqrt{x - 4}',
        '\\sqrt{x^2 - 4} \\le x + 2',
      ],
      description: 'Pertidaksamaan irasional adalah pertidaksamaan yang variabelnya berada di dalam tanda akar. Ciri khasnya memerlukan kehati-hatian ekstra pada daerah asal (domain).',
    },
    {
      title: '2 Prinsip Mutlak Syarat Akar',
      subtitle: 'Batas Real & Karakteristik Tanda Akar',
      badge: 'Fase 2 / 3',
      principles: [
        {
          label: '1. Syarat Numerus (Dalam Akar)',
          formula: 'f(x) \\ge 0',
          desc: 'Bilangan di dalam akar kuadrat tidak boleh negatif agar nilainya tetap terdefinisi di bilangan real.',
        },
        {
          label: '2. Nilai Hasil Akar Selalu Non-Negatif',
          formula: '\\sqrt{f(x)} \\ge 0',
          desc: 'Akar kuadrat bernilai positif atau nol. Akar kuadrat tidak pernah menghasilkan nilai negatif.',
        },
      ],
    },
    {
      title: '3 Langkah Emas & 2 Bentuk Utama',
      subtitle: 'Metode Pengkuadratan & Penarikan Irisan',
      badge: 'Fase 3 / 3',
      steps: [
        'Langkah 1: Tentukan Syarat Numerus dari setiap suku berakar (f(x) ≥ 0).',
        'Langkah 2: Kuadratkan kedua ruas jika kedua ruas sudah dipastikan bernilai non-negatif.',
        'Langkah 3: Tentukan irisan (daerah persekutuan) dari Langkah 1 dan Langkah 2 pada garis bilangan.',
      ],
      forms: [
        {
          title: 'Bentuk I (Satu Akar vs Konstanta)',
          eq: '\\sqrt{f(x)} < c \\implies f(x) \\ge 0 \\quad \\text{dan} \\quad f(x) < c^2',
        },
        {
          title: 'Bentuk II (Dua Akar Berdampingan)',
          eq: '\\begin{gathered} \\sqrt{f(x)} < \\sqrt{g(x)} \\\\ \\implies f(x) \\ge 0, \\; g(x) \\ge 0, \\; f(x) < g(x) \\end{gathered}',
        },
      ],
    },
  ],
};

export const IRASIONAL_PROBLEMS: IrasionalProblem[] = [
  // CONTOH 1: BENTUK I (SATU AKAR)
  {
    id: 'soal-1',
    compId: 'Scene09A-Irasional-Soal1',
    number: 1,
    title: 'Contoh 1 — Pertidaksamaan Irasional Bentuk I',
    subtitle: 'Satu tanda akar berhadapan dengan konstanta positif',
    problemLatex: '\\sqrt{2x - 4} < 4',
    durationFrames: 1050,
    steps: [
      {
        latex: '2x - 4 \\ge 0 \\implies 2x \\ge 4 \\implies x \\ge 2',
        note: 'Syarat Numerus: bagian dalam akar wajib ≥ 0 (Daerah I)',
        isAlert: true,
      },
      {
        latex: '(\\sqrt{2x - 4})^2 < 4^2 \\implies 2x - 4 < 16',
        note: 'Kuadratkan kedua ruas (kedua ruas sudah dipastikan non-negatif)',
      },
      {
        latex: '2x < 20 \\implies x < 10',
        note: 'Hasil penyelesaian aljabar setelah kuadrat (Daerah II)',
      },
      {
        latex: '\\text{Irisan: } x \\ge 2 \\quad \\text{DAN} \\quad x < 10 \\implies 2 \\le x < 10',
        note: 'Tarik irisan persekutuan antara Daerah I dan Daerah II',
      },
    ],
    axisRange: [0, 12],
    layers: [
      {
        label: 'Daerah I (Syarat Akar)',
        condition: 'x \\ge 2',
        from: 2,
        to: 12,
        includeStart: true,
        includeEnd: false,
        color: '#38bdf8',
        toInfinity: true,
        revealAtStep: 0,
      },
      {
        label: 'Daerah II (Hasil Kuadrat)',
        condition: 'x < 10',
        from: 0,
        to: 10,
        includeStart: false,
        includeEnd: false,
        color: '#fbbf24',
        fromNegativeInfinity: true,
        revealAtStep: 2,
      },
    ],
    intersection: {
      from: 2,
      to: 10,
      includeStart: true,
      includeEnd: false,
    },
    hpSet: '\\{x \\mid 2 \\le x < 10, x \\in \\mathbb{R}\\}',
    hpInterval: '[2, 10)',
    alertNote: 'Wajib mengiriskan syarat numerus x ≥ 2 dengan hasil kuadrat x < 10!',
  },

  // CONTOH 2: BENTUK II (DUA AKAR)
  {
    id: 'soal-2',
    compId: 'Scene09B-Irasional-Soal2',
    number: 2,
    title: 'Contoh 2 — Pertidaksamaan Irasional Bentuk II',
    subtitle: 'Dua tanda akar pada kedua ruas pertidaksamaan',
    problemLatex: '\\sqrt{x - 1} \\le \\sqrt{2x - 4}',
    durationFrames: 1200,
    steps: [
      {
        latex: 'x - 1 \\ge 0 \\implies x \\ge 1',
        note: 'Syarat Numerus Akar 1: x - 1 ≥ 0 (Daerah I)',
        isAlert: true,
      },
      {
        latex: '2x - 4 \\ge 0 \\implies x \\ge 2',
        note: 'Syarat Numerus Akar 2: 2x - 4 ≥ 0 (Daerah II)',
        isAlert: true,
      },
      {
        latex: 'x - 1 \\le 2x - 4 \\implies -x \\le -3 \\implies x \\ge 3',
        note: 'Kuadratkan kedua ruas & balik tanda saat bagi -1 (Daerah III)',
        isAlert: true,
      },
      {
        latex: '\\text{Irisan: } (x \\ge 1) \\cap (x \\ge 2) \\cap (x \\ge 3) \\implies x \\ge 3',
        note: 'Irisan ketiga syarat menghasilkan x ≥ 3',
      },
    ],
    axisRange: [0, 6],
    layers: [
      {
        label: 'Daerah I (Akar 1)',
        condition: 'x \\ge 1',
        from: 1,
        to: 6,
        includeStart: true,
        includeEnd: false,
        color: '#38bdf8',
        toInfinity: true,
        revealAtStep: 0,
      },
      {
        label: 'Daerah II (Akar 2)',
        condition: 'x \\ge 2',
        from: 2,
        to: 6,
        includeStart: true,
        includeEnd: false,
        color: '#fbbf24',
        toInfinity: true,
        revealAtStep: 1,
      },
      {
        label: 'Daerah III (Kuadrat)',
        condition: 'x \\ge 3',
        from: 3,
        to: 6,
        includeStart: true,
        includeEnd: false,
        color: '#a78bfa',
        toInfinity: true,
        revealAtStep: 2,
      },
    ],
    intersection: {
      from: 3,
      to: 6,
      includeStart: true,
      includeEnd: false,
      toInfinity: true,
    },
    hpSet: '\\{x \\mid x \\ge 3, x \\in \\mathbb{R}\\}',
    hpInterval: '[3, \\infty)',
    alertNote: 'Ketiga syarat wajib diiriskan secara bersamaan di garis bilangan!',
  },
];

export const IRASIONAL_SUMMARY = {
  pillars: [
    {
      title: 'Pilar 1: Cek Syarat Numerus',
      desc: 'Setiap fungsi di dalam akar wajib bernilai ≥ 0. Jika ada beberapa akar, cari syarat untuk masing-masing akar.',
    },
    {
      title: 'Pilar 2: Kuadratkan Kedua Ruas',
      desc: 'Pengkuadratan hanya sah jika kedua ruas dijamin non-negatif. Jika ruas kanan negatif, periksa sifat logisnya.',
    },
    {
      title: 'Pilar 3: Irisan Seluruh Syarat',
      desc: 'Himpunan penyelesaian akhir BUKAN hanya hasil kuadrat, melainkan irisan antara syarat numerus dan hasil pengkuadratan.',
    },
  ],
};

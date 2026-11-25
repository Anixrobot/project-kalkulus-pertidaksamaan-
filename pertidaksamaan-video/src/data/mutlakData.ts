export interface MutlakBound {
  value: number;
  label?: string;
  included: boolean;
  direction?: 'left' | 'right';
}

export interface MutlakStep {
  latex: string;
  note: string;
  isAlert?: boolean;
}

export interface MutlakProblem {
  id: string;
  compId: string;
  number: number;
  title: string;
  subtitle: string;
  problemLatex: string;
  durationFrames: number;
  pattern: 'inside_between' | 'outside_split';
  steps: MutlakStep[];
  axisRange: [number, number];
  bounds: MutlakBound[];
  hpSet: string;
  hpInterval: string;
  alertNote?: string;
}

export const MUTLAK_CONCEPT = {
  phases: [
    {
      title: 'Pengertian & Konsep Jarak',
      subtitle: 'Definisi Nilai Mutlak sebagai Jarak dari Titik 0',
      badge: 'Fase 1 / 3',
      definition: '|x| = \\begin{cases} x, & \\text{jika } x \\ge 0 \\\\ -x, & \\text{jika } x < 0 \\end{cases}',
      distanceNote: 'Nilai mutlak menyatakan jarak geometri dari titik asal 0. Jarak TIDAK PERNAH bernilai negatif: |x| ≥ 0 untuk setiap bilangan real x.',
    },
    {
      title: 'Karakteristik 2 Arah Nilai Mutlak',
      subtitle: 'Membandingkan Arah Mengumpul Tengah vs Memencar Keluar',
      badge: 'Fase 2 / 3',
      patterns: [
        {
          symbol: '< \\text{ atau } \\le',
          name: 'Jarak Dekat (Mengumpul di Tengah)',
          formula: '|x| \\le a \\iff -a \\le x \\le a',
          desc: 'Solusinya berupa satu segmen interval bersambung yang diapit di antara -a dan +a.',
        },
        {
          symbol: '> \\text{ atau } \\ge',
          name: 'Jarak Jauh (Memencar Keluar)',
          formula: '|x| \\ge a \\iff x \\le -a \\;\\lor\\; x \\ge a',
          desc: 'Solusinya terbelah menjadi dua cabang sinar: ke arah kiri -a ATAU ke arah kanan +a.',
        },
      ],
    },
    {
      title: '4 Langkah Emas Penyelesaian',
      subtitle: 'Alur Operasi Aljabar Pertidaksamaan Nilai Mutlak',
      badge: 'Fase 3 / 3',
      steps: [
        '1. Isolasi bentuk nilai mutlak |f(x)| sendirian di salah satu ruas.',
        '2. Periksa konstanta di ruas lain: jika c < 0, analisis langsung sifat jarak.',
        '3. Ubah bentuk mutlak menjadi bentuk aljabar linear sesuai rumusnya.',
        '4. Operasikan variabel x secara adil di seluruh ruas dan tuliskan HP intervalnya.',
      ],
    },
  ],
};

export const MUTLAK_PROBLEMS: MutlakProblem[] = [
  // CONTOH 1: TANDA KURANG DARI (<) -> MENGUMPUL TENGAH
  {
    id: 'soal-1',
    compId: 'Scene11A-Mutlak-Soal1',
    number: 1,
    title: 'Contoh 1 — Tanda Kurang Dari (<)',
    subtitle: 'Solusi mengumpul di antara dua batas nilai',
    problemLatex: '|2x - 3| < 7',
    durationFrames: 1050,
    pattern: 'inside_between',
    steps: [
      {
        latex: '-7 < 2x - 3 < 7',
        note: 'Ubah ke bentuk rentang tengah: -a < f(x) < a',
      },
      {
        latex: '-7 + 3 < 2x < 7 + 3 \\implies -4 < 2x < 10',
        note: 'Tambahkan 3 secara adil pada ketiga ruas',
      },
      {
        latex: '\\frac{-4}{2} < x < \\frac{10}{2} \\implies -2 < x < 5',
        note: 'Bagi ketiga ruas dengan 2 (positif, arah tanda tetap)',
      },
      {
        latex: '\\text{HP: } \\{x \\mid -2 < x < 5, x \\in \\mathbb{R}\\}',
        note: 'Solusi akhir berada di antara titik batas x = -2 dan x = 5',
      },
    ],
    axisRange: [-4, 7],
    bounds: [
      { value: -2, included: false },
      { value: 5, included: false },
    ],
    hpSet: '\\{x \\mid -2 < x < 5, x \\in \\mathbb{R}\\}',
    hpInterval: '(-2, 5)',
    alertNote: 'Tanda < menghasilkan interval mengumpul di tengah dengan kurung biasa ( )',
  },

  // CONTOH 2: TANDA LEBIH DARI SAMA DENGAN (>=) -> MEMENCAR KELUAR
  {
    id: 'soal-2',
    compId: 'Scene11B-Mutlak-Soal2',
    number: 2,
    title: 'Contoh 2 — Tanda Lebih Dari Sama Dengan (≥)',
    subtitle: 'Solusi memencar keluar ke arah kiri dan kanan',
    problemLatex: '|3x + 2| \\ge 8',
    durationFrames: 1050,
    pattern: 'outside_split',
    steps: [
      {
        latex: '3x + 2 \\le -8 \\quad \\lor \\quad 3x + 2 \\ge 8',
        note: 'Pecah menjadi 2 kondisi terpisah: f(x) ≤ -a ATAU f(x) ≥ a',
        isAlert: true,
      },
      {
        latex: '3x \\le -8 - 2 \\implies 3x \\le -10 \\implies x \\le -\\frac{10}{3}',
        note: 'Kondisi 1: Cabang kiri menuju minus tak hingga',
      },
      {
        latex: '3x \\ge 8 - 2 \\implies 3x \\ge 6 \\implies x \\ge 2',
        note: 'Kondisi 2: Cabang kanan menuju positif tak hingga',
      },
      {
        latex: 'x \\le -\\frac{10}{3} \\quad \\lor \\quad x \\ge 2',
        note: 'Gabungkan kedua cabang dengan kata penghubung ATAU (∪)',
      },
    ],
    axisRange: [-6, 5],
    bounds: [
      { value: -10 / 3, label: '-10/3', included: true, direction: 'left' },
      { value: 2, label: '2', included: true, direction: 'right' },
    ],
    hpSet: '\\left\\{x \\mid x \\le -\\frac{10}{3} \\text{ atau } x \\ge 2, x \\in \\mathbb{R}\\right\\}',
    hpInterval: '\\left(-\\infty, -\\frac{10}{3}\\right] \\cup [2, \\infty)',
    alertNote: 'Tanda ≥ menghasilkan dua sinar memencar dengan kurung siku [ ]!',
  },
];

export const MUTLAK_MISTAKES_SUMMARY = {
  mistakes: [
    {
      title: '1. Konstanta Negatif di Ruas Kanan (|f(x)| < -a)',
      desc: 'Nilai mutlak tidak pernah bernilai negatif. Jadi |x| < -3 langsung TIDAK MEMILIKI SOLUSI (Himpunan Kosong ∅). Jangan dikerjakan secara mekanis!',
    },
    {
      title: '2. Tertukar Rumus Antara Tanda < dan >',
      desc: 'Tanda < menghasilkan rentang mengumpul tengah (-a < x < a). Tanda > menghasilkan dua cabang terpisah (x < -a ATAU x > a). Jangan sampai terbalik!',
    },
    {
      title: '3. Lupa Membalik Tanda saat Pembagian Negatif',
      desc: 'Ketika mengisolasi variabel x dengan membagi bilangan negatif, arah tanda pertidaksamaan WAJIB dibalik.',
    },
  ],
  quickReferenceTable: [
    { form: '|f(x)| \\le a', solution: '-a \\le f(x) \\le a', type: 'Mengumpul di Tengah (Kurung Siku)' },
    { form: '|f(x)| < a', solution: '-a < f(x) < a', type: 'Mengumpul di Tengah (Kurung Biasa)' },
    { form: '|f(x)| \\ge a', solution: 'f(x) \\le -a \\;\\lor\\; f(x) \\ge a', type: 'Memencar Keluar (Kurung Siku)' },
    { form: '|f(x)| > a', solution: 'f(x) < -a \\;\\lor\\; f(x) > a', type: 'Memencar Keluar (Kurung Biasa)' },
  ],
};

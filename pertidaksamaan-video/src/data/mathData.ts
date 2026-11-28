/**
 * Data terstruktur & koordinat geometri presisi untuk proyek Remotion:
 * Pertidaksamaan Linear Satu Variabel (PtLSV) & Dua Variabel (PtLDV).
 *
 * Semua poligon DHP (dhpPolygon) dan segmen garis (lineSegmentInViewport)
 * sudah di-clip secara matematis terhadap viewport masing-masing agar
 * bebas dari bug arsiran terpotong saat dirender ke SVG.
 */

export type Point = [number, number];

export interface VideoConfig {
  fps: number;
  width: number;
  height: number;
  theme: {
    bgPrimary: string;
    bgCard: string;
    borderCard: string;
    textPrimary: string;
    textSecondary: string;
    accentPtLSV: string;
    accentPtLDV: string;
    accentAlert: string;
    accentHighlight: string;
    gridLine: string;
    axisLine: string;
  };
}

export interface SceneTiming {
  id: string;
  title: string;
  durationInSeconds: number;
  durationInFrames: number;
}

export interface AlgebraStep {
  latex: string;
  note?: string;
  isAlert?: boolean;
}

export interface PtLSVExample {
  id: string;
  title: string;
  subtitle: string;
  problemLatex: string;
  steps: AlgebraStep[];
  solution: {
    latex: string;
    intervalLatex: string;
    setBuilderLatex: string;
    boundaryValue: number;
    isInclusive: boolean; // true = bulatan penuh (solid dot), false = bulatan kosong (hollow dot)
    direction: 'right' | 'left';
    axisRange: [number, number];
  };
}

export interface PtLDVLayer {
  label: string;
  latex: string;
  color: string;
  polygon: Point[];
}

export interface PtLDVExample {
  id: string;
  title: string;
  subtitle: string;
  problemLatex: string;
  viewport: {
    x: [number, number];
    y: [number, number];
  };
  intercepts: {
    yAxis: Point;
    xAxis: Point;
  };
  lineEquationLatex: string;
  lineStyle: 'solid' | 'dashed';
  lineSegmentInViewport: [Point, Point];
  testOrigin: {
    point: Point;
    substitutionLatex: string;
    isTrue: boolean;
    badgeLabel: string;
    conclusion: string;
  };
  dhpColor: string;
  lineColor: string;
  dhpPolygon: Point[];
  quadrantOneOnly?: boolean;
  layerPolygons?: PtLDVLayer[];
}

export const VIDEO_CONFIG: VideoConfig = {
  fps: 30,
  width: 1920,
  height: 1080,
  theme: {
    bgPrimary: '#0f172a',
    bgCard: '#1e293b',
    borderCard: '#334155',
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    accentPtLSV: '#38bdf8',
    accentPtLDV: '#10b981',
    accentAlert: '#f43f5e',
    accentHighlight: '#fbbf24',
    gridLine: '#1e293b',
    axisLine: '#64748b',
  },
};

export const SCENE_TIMINGS: SceneTiming[] = [
  { id: 'scene-1-intro', title: 'Intro & Aturan Mutlak Pertidaksamaan', durationInSeconds: 12, durationInFrames: 360 },
  { id: 'scene-2-konsep-ptlsv', title: 'Konsep PtLSV & Garis Bilangan', durationInSeconds: 18, durationInFrames: 540 },
  { id: 'scene-3-latihan-ptlsv', title: 'Latihan Soal PtLSV (Soal 1 & 2)', durationInSeconds: 30, durationInFrames: 900 },
  { id: 'scene-4-konsep-ptldv', title: 'Konsep PtLDV & Uji Titik (0,0)', durationInSeconds: 16, durationInFrames: 480 },
  { id: 'scene-5-latihan-ptldv', title: 'Latihan Soal PtLDV (Soal 3 & 4)', durationInSeconds: 30, durationInFrames: 900 },
  { id: 'scene-6-sistem-ptldv', title: 'Aplikasi Sistem PtLDV (Soal 5)', durationInSeconds: 14, durationInFrames: 420 },
];

export const GOLDEN_RULE = {
  title: 'Aturan Mutlak Pertidaksamaan',
  safeOperations: 'Menjumlahkan atau mengurangi kedua ruas dengan bilangan apa pun TIDAK mengubah arah tanda pertidaksamaan.',
  flipRule: 'Jika mengali atau membagi kedua ruas dengan BILANGAN NEGATIF, maka arah tanda pertidaksamaan WAJIB DIBALIK.',
  flipExamples: [
    { fromLatex: '<', toLatex: '>' },
    { fromLatex: '\\le', toLatex: '\\ge' },
  ],
};

export const PTLSV_DATA: PtLSVExample[] = [
  {
    id: 'intro-ptlsv',
    title: 'Visualisasi Konsep PtLSV',
    subtitle: 'Isolasi variabel x pada garis bilangan 1D',
    problemLatex: '2x - 4 \\ge 0',
    steps: [
      { latex: '2x \\ge 4', note: 'Pindahkan -4 ke ruas kanan' },
      { latex: 'x \\ge 2', note: 'Bagi kedua ruas dengan 2 (positif, tanda tetap)' },
    ],
    solution: {
      latex: 'x \\ge 2',
      intervalLatex: '[2, \\infty)',
      setBuilderLatex: '\\{x \\mid x \\ge 2, x \\in \\mathbb{R}\\}',
      boundaryValue: 2,
      isInclusive: true,
      direction: 'right',
      axisRange: [-1, 6],
    },
  },
  {
    id: 'soal-1',
    title: 'Soal 1: PtLSV Sederhana',
    subtitle: 'Jebakan koefisien negatif (balik tanda)',
    problemLatex: '3(x - 2) + 4 < 5x - 6',
    steps: [
      { latex: '3x - 6 + 4 < 5x - 6', note: 'Buka tanda kurung dengan sifat distributif' },
      { latex: '3x - 2 < 5x - 6', note: 'Sederhanakan konstanta di ruas kiri' },
      { latex: '3x - 5x < -6 + 2', note: '5x pindah ke kiri jadi -5x, dan -2 pindah ke kanan jadi +2' },
      { latex: '-2x < -4', note: 'Sederhanakan kedua ruas' },
      {
        latex: 'x > \\frac{-4}{-2}',
        note: 'Dibagi -2 (bilangan negatif): tanda < WAJIB dibalik menjadi >',
        isAlert: true,
      },
      { latex: 'x > 2', note: 'Himpunan penyelesaian akhir' },
    ],
    solution: {
      latex: 'x > 2',
      intervalLatex: '(2, \\infty)',
      setBuilderLatex: '\\{x \\mid x > 2, x \\in \\mathbb{R}\\}',
      boundaryValue: 2,
      isInclusive: false,
      direction: 'right',
      axisRange: [-2, 6],
    },
  },
  {
    id: 'soal-2',
    title: 'Soal 2: PtLSV Bentuk Pecahan',
    subtitle: 'Menghilangkan penyebut dengan KPK & distribusi tanda negatif',
    problemLatex: '\\frac{2x - 1}{3} - \\frac{x + 2}{2} \\ge 1',
    steps: [
      {
        latex: '6 \\cdot \\left(\\frac{2x - 1}{3}\\right) - 6 \\cdot \\left(\\frac{x + 2}{2}\\right) \\ge 6 \\cdot 1',
        note: 'Kalikan seluruh ruas dengan KPK penyebut (3 dan 2 -> 6)',
      },
      { latex: '2(2x - 1) - 3(x + 2) \\ge 6', note: '6 ÷ 3 = 2  dan  6 ÷ 2 = 3, ruas kanan: 6 × 1 = 6' },
      {
        latex: '4x - 2 - 3x - 6 \\ge 6',
        note: 'Hati-hati distribusi negatif: -3(x + 2) menghasilkan -3x - 6',
        isAlert: true,
      },
      { latex: 'x - 8 \\ge 6', note: 'Gabungkan suku sejenis di ruas kiri' },
      { latex: 'x \\ge 14', note: 'Tambahkan kedua ruas dengan 8' },
    ],
    solution: {
      latex: 'x \\ge 14',
      intervalLatex: '[14, \\infty)',
      setBuilderLatex: '\\{x \\mid x \\ge 14, x \\in \\mathbb{R}\\}',
      boundaryValue: 14,
      isInclusive: true,
      direction: 'right',
      axisRange: [10, 18],
    },
  },
];

export const PTLDV_DATA: PtLDVExample[] = [
  {
    id: 'soal-3',
    title: 'Soal 3: PtLDV Garis Utuh',
    subtitle: 'Tanda inklusif (garis solid) dengan uji titik benar',
    problemLatex: '2x + 5y \\le 10',
    viewport: { x: [-2, 7], y: [-2, 4] },
    intercepts: { yAxis: [0, 2], xAxis: [5, 0] },
    lineEquationLatex: '2x + 5y = 10',
    lineStyle: 'solid',
    lineSegmentInViewport: [
      [-2, 2.8],
      [7, -0.8],
    ],
    testOrigin: {
      point: [0, 0],
      substitutionLatex: '2(0) + 5(0) \\le 10 \\implies 0 \\le 10',
      isTrue: true,
      badgeLabel: 'Uji (0,0): BENAR ✓',
      conclusion: 'Arsir penuh daerah bawah-kiri garis (menuju titik asal (0,0)).',
    },
    dhpColor: 'rgba(56, 189, 248, 0.25)',
    lineColor: '#38bdf8',
    dhpPolygon: [
      [-2, 2.8],
      [7, -0.8],
      [7, -2],
      [-2, -2],
    ],
  },
  {
    id: 'soal-4',
    title: 'Soal 4: PtLDV Garis Putus-putus',
    subtitle: 'Tanda ketat (garis dashed) dengan uji titik salah',
    problemLatex: '4x - 3y > 12',
    viewport: { x: [-2, 7], y: [-6, 5] },
    intercepts: { yAxis: [0, -4], xAxis: [3, 0] },
    lineEquationLatex: '4x - 3y = 12',
    lineStyle: 'dashed',
    lineSegmentInViewport: [
      [-1.5, -6],
      [6.75, 5],
    ],
    testOrigin: {
      point: [0, 0],
      substitutionLatex: '4(0) - 3(0) > 12 \\implies 0 > 12',
      isTrue: false,
      badgeLabel: 'Uji (0,0): SALAH ✗',
      conclusion: 'Arsir penuh daerah kanan-bawah garis (menjauhi titik asal (0,0)).',
    },
    dhpColor: 'rgba(244, 63, 94, 0.25)',
    lineColor: '#f43f5e',
    dhpPolygon: [
      [-1.5, -6],
      [6.75, 5],
      [7, 5],
      [7, -6],
    ],
  },
  {
    id: 'soal-5',
    title: 'Soal 5: Aplikasi Sistem PtLDV',
    subtitle: 'Irisan 3 pertidaksamaan (pengantar Program Linear)',
    problemLatex: 'x + y \\ge 4; \\quad x \\ge 0; \\quad y \\ge 0',
    viewport: { x: [-1, 7], y: [-1, 7] },
    intercepts: { yAxis: [0, 4], xAxis: [4, 0] },
    lineEquationLatex: 'x + y = 4',
    lineStyle: 'solid',
    lineSegmentInViewport: [
      [-1, 5],
      [5, -1],
    ],
    testOrigin: {
      point: [0, 0],
      substitutionLatex: '0 + 0 \\ge 4 \\implies 0 \\ge 4',
      isTrue: false,
      badgeLabel: 'Uji (0,0): SALAH ✗',
      conclusion: 'DHP berada di atas-kanan garis (0,4)-(4,0) dan terkunci hanya di Kuadran I.',
    },
    dhpColor: 'rgba(16, 185, 129, 0.32)',
    lineColor: '#10b981',
    dhpPolygon: [
      [0, 4],
      [4, 0],
      [7, 0],
      [7, 7],
      [0, 7],
    ],
    quadrantOneOnly: true,
    layerPolygons: [
      {
        label: 'Syarat x >= 0',
        latex: 'x \\ge 0',
        color: 'rgba(56, 189, 248, 0.14)',
        polygon: [
          [0, -1],
          [7, -1],
          [7, 7],
          [0, 7],
        ],
      },
      {
        label: 'Syarat y >= 0',
        latex: 'y \\ge 0',
        color: 'rgba(251, 191, 36, 0.14)',
        polygon: [
          [-1, 0],
          [7, 0],
          [7, 7],
          [-1, 7],
        ],
      },
      {
        label: 'Daerah x + y >= 4',
        latex: 'x + y \\ge 4',
        color: 'rgba(16, 185, 129, 0.16)',
        polygon: [
          [-1, 5],
          [5, -1],
          [7, -1],
          [7, 7],
          [-1, 7],
        ],
      },
    ],
  },
];

/**
 * Helper konversi koordinat Kartesius (x, y) ke koordinat piksel SVG.
 * Sumbu Y dibalik secara otomatis karena koordinat Y pada SVG bertambah ke bawah.
 */
export function mapMathToSvg(
  point: Point,
  viewport: { x: [number, number]; y: [number, number] },
  svgSize: { width: number; height: number; padding?: number }
): Point {
  const pad = svgSize.padding ?? 48;
  const plotW = svgSize.width - pad * 2;
  const plotH = svgSize.height - pad * 2;

  const [xMin, xMax] = viewport.x;
  const [yMin, yMax] = viewport.y;

  const svgX = pad + ((point[0] - xMin) / (xMax - xMin)) * plotW;
  const svgY = pad + ((yMax - point[1]) / (yMax - yMin)) * plotH;

  return [Number(svgX.toFixed(2)), Number(svgY.toFixed(2))];
}

/**
 * Helper mengubah array koordinat matematika menjadi string atribut `points` pada elemen <polygon> SVG.
 */
export function buildSvgPolygonPoints(
  polygon: Point[],
  viewport: { x: [number, number]; y: [number, number] },
  svgSize: { width: number; height: number; padding?: number }
): string {
  return polygon
    .map((pt) => mapMathToSvg(pt, viewport, svgSize).join(','))
    .join(' ');
}
export const FPS = 30;
export const TOTAL_MINUTES = 60;
export const TOTAL_FRAMES = TOTAL_MINUTES * 60 * FPS; // 108.000 frames

export interface CharacterProfile {
  id: 'ikhsan' | 'rafie' | 'pras' | 'dimas';
  name: string;
  fullName: string;
  role: string;
  topicBadge: string;
  desc: string;
}

export const CHARACTERS_INFO: Record<string, CharacterProfile> = {
  ikhsan: {
    id: 'ikhsan',
    name: 'IKHSAN',
    fullName: 'Ikhsan',
    role: 'Pemateri 2 • Pertidaksamaan Rasional (Pecahan)',
    topicBadge: 'CABANG 2: PERTIDAKSAMAAN RASIONAL (PECAHAN ALJABAR)',
    desc: 'Rambut messy bowl cut berponi, kacamata bulat, kemeja batik di balik jas biru muda polos, memegang pointer.'
  },
  rafie: {
    id: 'rafie',
    name: 'RAFIE',
    fullName: 'Rafie Armansyah',
    role: 'Moderator & Pemateri 1 • Pertidaksamaan Linear (PtLSV & PtLDV)',
    topicBadge: 'CABANG 1: PERTIDAKSAMAAN LINEAR (1 & 2 VARIABEL)',
    desc: 'Rambut hitam rapi belah tengah, berkacamata frame tipis, kemeja putih di balik jas biru muda polos, memegang tablet.'
  },
  pras: {
    id: 'pras',
    name: 'PRAS',
    fullName: 'Pras',
    role: 'Pemateri 3 • Pertidaksamaan Irasional (Bentuk Akar)',
    topicBadge: 'CABANG 3: PERTIDAKSAMAAN IRASIONAL (BENTUK AKAR)',
    desc: 'Rambut sedikit bergelombang tanpa kacamata, kaos polo gelap di balik jas biru muda polos, gestur tangan terbuka.'
  },
  dimas: {
    id: 'dimas',
    name: 'DIMAS',
    fullName: 'Dimas',
    role: 'Pemateri 4 • Pertidaksamaan Nilai Mutlak',
    topicBadge: 'CABANG 4: PERTIDAKSAMAAN NILAI MUTLAK |f(x)|',
    desc: 'Postur tegap/berisi, rambut sangat pendek (buzz cut), kaos hitam di balik jas biru muda polos.'
  }
};

export interface StepItem {
  label: string;
  badge: string;
  eq: string;
  desc: string;
}

export interface SceneItem {
  id: string;
  compId: string;
  code: string;
  part: number;
  partName: string;
  startMin: number;
  endMin: number;
  durationFrames?: number;
  presenter: 'all' | 'rafie' | 'ikhsan' | 'pras' | 'dimas';
  title: string;
  boardTitle: string;
  boardSubtitle: string;
  visualType:
    | 'presenter-intro'
    | 'intro-school'
    | 'number-line'
    | 'cartesian-ptldv'
    | 'sign-table'
    | 'mutlak-table'
    | 'concept-box'
    | 'summary-master';
  voScript: string;
  numberLineConfig?: {
    points: { val: number; filled: boolean; label: string }[];
    shades: { from: number; to: number; label: string }[];
    signs: { x: number; sign: string }[];
    caption: string;
  };
  cartesianConfig?: {
    mode: 'case1' | 'case2' | 'case3';
    equation: string;
    testText: string;
  };
  steps: StepItem[];
}

export const SCENES_DATA: SceneItem[] = [
  // 1. SCENE 01: INTRO SEKOLAH & 4 KARAKTER
  {
    id: 'scene-01',
    compId: 'Scene01-Intro',
    code: 'Scene 01',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 0,
    endMin: 2,
    presenter: 'all',
    title: 'Intro Eksterior Gedung Sekolah & Suasana Kelas Pagi',
    boardTitle: 'VIDEO PEMBELAJARAN MATEMATIKA — PERTIDAKSAMAAN',
    boardSubtitle: 'Target Durasi 60 Menit • Tema Nature Green • 4 Cabang Utama Pertidaksamaan',
    visualType: 'intro-school',
    voScript: '[SFX Bel Sekolah & Suasana Pagi] Gedung sekolah membesar (zoom-in), transisi masuk ke ruang kelas bernuansa hijau alam (Nature Green) bersama 4 pemateri: Ikhsan, Rafie, Pras, dan Dimas.',
    steps: [
      {
        label: 'Zoom-In Eksterior Gedung Sekolah & SFX Bel Pagi',
        badge: '00:00 - 00:40',
        eq: 'Selamat Datang di Kelas Kalkulus & Aljabar — Pertidaksamaan',
        desc: 'Kamera melakukan zoom-in perlahan menuju ruang kelas hijau alam dengan fokus utama papan tulis kayu cokelat tua.'
      },
      {
        label: 'Perkenalan 4 Pemateri Berseragam Jas Almamater Biru Muda Polos',
        badge: '00:40 - 01:20',
        eq: 'Rafie (Linear) • Ikhsan (Rasional) • Pras (Irasional) • Dimas (Nilai Mutlak)',
        desc: 'Keempat karakter tampil berjajar di depan papan tulis dengan jas almamater biru muda polos sesuai PRD.'
      },
      {
        label: 'Peta Konsep 60 Menit Pembelajaran & 20 Contoh Soal',
        badge: '01:20 - 02:00',
        eq: 'PtLSV & PtLDV ➔ Pecahan Rasional ➔ Bentuk Akar Irasional ➔ Nilai Mutlak',
        desc: 'Setiap pemateri mengupas konsep dasar, syarat mutlak, visualisasi garis bilangan/grafik, serta 5 contoh soal bertingkat.'
      }
    ]
  },

  // 2. SCENE 02A: INTRO SOLO RAFIE (TENGAH & ZOOM TANPA PAPAN TULIS)
  {
    id: 'scene-02a-intro-rafie',
    compId: 'Scene02A-IntroRafie',
    code: 'Scene 02A (Intro Rafie)',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 2,
    endMin: 3,
    presenter: 'rafie',
    title: 'Scene Intro Pemateri 1: Rafie Armansyah (Zoom Center Tanpa Papan Tulis)',
    boardTitle: 'PEMATERI 1: RAFIE ARMANSYAH',
    boardSubtitle: 'Pengantar Materi Pertidaksamaan Linear Satu & Dua Variabel (PtLSV & PtLDV)',
    visualType: 'presenter-intro',
    voScript: 'Halo semuanya! Selamat datang di video pembelajaran matematika kelompok kami. Kenalkan, gw Rafie Armansyah! Di bagian pertama ini, gw bakal memandu kalian membedah tuntas Pertidaksamaan Linear Satu Variabel dan Dua Variabel beserta 5 contoh soalnya. Yuk langsung kita mulai!',
    steps: [
      {
        label: 'Perkenalan Moderator & Pemateri 1: Rafie Armansyah',
        badge: 'Solo Zoom-In',
        eq: 'Pertidaksamaan Linear Satu Variabel (PtLSV) & Dua Variabel (PtLDV)',
        desc: 'Kamera melakukan zoom-in fokus ke arah Rafie di tengah kelas sebelum masuk ke papan tulis.'
      },
      {
        label: 'Fokus Materi: Aturan Kali/Bagi Negatif & Uji Titik (0,0)',
        badge: 'Highlight Topik',
        eq: 'Hukum Fundamental (<, >, ≤, ≥) • Garis Bilangan 1D • Grafik Kartesius 2D',
        desc: 'Membahas konsep dasar perbandingan ukuran, isolasi variabel, hingga arsiran Daerah Himpunan Penyelesaian (DHP).'
      }
    ]
  },

  // 3. SCENE 02: HUKUM FUNDAMENTAL (RAFIE + PAPAN TULIS)
  {
    id: 'scene-02',
    compId: 'Scene02-HukumFundamental',
    code: 'Scene 02',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 3,
    endMin: 5.5,
    presenter: 'rafie',
    title: 'Hukum Fundamental Pertidaksamaan',
    boardTitle: 'HUKUM FUNDAMENTAL PERTIDAKSAMAAN (<, >, ≤, ≥)',
    boardSubtitle: 'Pemateri: Rafie Armansyah • Aturan Mutlak Penjumlahan vs Perkalian/Pembagian Negatif',
    visualType: 'number-line',
    voScript: 'Secara sederhana, pertidaksamaan itu adalah kalimat matematika yang nunjukin perbandingan ukuran. Ingat aturan paling kritis: kalau dikali atau dibagi bilangan negatif, tanda wajib berbalik arah!',
    numberLineConfig: {
      points: [{ val: -3, filled: false, label: '−3' }],
      shades: [{ from: -3, to: 5.5, label: 'Solusi: x > −3' }],
      signs: [
        { x: -4.5, sign: '−' },
        { x: 1, sign: '+' }
      ],
      caption: 'Contoh Hukum Kali/Bagi Negatif: −2x < 6 ⟹ x > 6/(−2) ⟹ x > −3 (Tanda < berbalik jadi >)'
    },
    steps: [
      {
        label: 'Pengertian & Tanda Ketidaksamaan',
        badge: 'Konsep Dasar',
        eq: 'Tanda Pertidaksamaan: < (Kurang dari), > (Lebih dari), ≤, dan ≥',
        desc: 'Berbeda dengan persamaan (=) yang solusinya berupa titik tunggal, pertidaksamaan menghasilkan rentang nilai (interval).'
      },
      {
        label: 'Hukum 1: Penjumlahan & Pengurangan (Aman)',
        badge: 'Tanda Tetap',
        eq: 'a < b  ⟺  a + c < b + c   dan   a − c < b − c',
        desc: 'Menambah atau mengurangi kedua ruas dengan angka berapapun TIDAK mengubah arah tanda pertidaksamaan.'
      },
      {
        label: 'Hukum 2: Perkalian & Pembagian Bilangan Negatif (KRITIS!)',
        badge: 'Wajib Balik Tanda!',
        eq: '−2x < 6  ⟹  x > 6 / (−2)  ⟹  x > −3',
        desc: 'Jika mengali atau membagi kedua ruas dengan bilangan NEGATIF, maka tanda pertidaksamaan WAJIB BERBALIK ARAH (dari < menjadi >).'
      }
    ]
  },

  // 4. SCENE 03: KONSEP PtLSV
  {
    id: 'scene-03',
    compId: 'Scene03-KonsepPtLSV',
    code: 'Scene 03',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 5.5,
    endMin: 8,
    presenter: 'rafie',
    title: 'Konsep Pertidaksamaan Linear Satu Variabel (PtLSV)',
    boardTitle: '1. PERTIDAKSAMAAN LINEAR SATU VARIABEL (PtLSV)',
    boardSubtitle: 'Bentuk Umum: ax + b < c • Visualisasi Garis Bilangan Terbuka (○) vs Tertutup (●)',
    visualType: 'number-line',
    voScript: 'Sekarang kita masuk ke PtLSV atau Pertidaksamaan Linear Satu Variabel. Di sini variabelnya cuma satu, yaitu x berpangkat satu. Tugas kita adalah mengisolasi x sendirian di ruas kiri dan menggambarnya di garis bilangan.',
    numberLineConfig: {
      points: [{ val: 2, filled: true, label: '2 (●)' }],
      shades: [{ from: 2, to: 5.5, label: 'HP: x ≥ 2' }],
      signs: [
        { x: -1, sign: '−' },
        { x: 4, sign: '+' }
      ],
      caption: 'Visualisasi PtLSV: 2x − 4 ≥ 0 ⟹ 2x ≥ 4 ⟹ x ≥ 2 (Bulatan penuh ● karena tanda ≥)'
    },
    steps: [
      {
        label: 'Bentuk Umum & Isolasi Variabel PtLSV',
        badge: 'Langkah 1',
        eq: 'ax + b ≥ 0   (dengan a ≠ 0)',
        desc: 'Kelompokkan semua suku bervariabel x di ruas kiri dan konstanta angka di ruas kanan.'
      },
      {
        label: 'Menghilangkan Pecahan dengan KPK Penyebut',
        badge: 'Langkah 2',
        eq: 'Jika memuat pecahan ➔ Kalikan kedua ruas dengan KPK Penyebut',
        desc: 'Mengalikan kedua ruas dengan KPK positif akan menyederhanakan bentuk pecahan menjadi linear biasa.'
      },
      {
        label: 'Aturan Bulatan Kosong (○) vs Bulatan Penuh (●)',
        badge: 'Langkah 3',
        eq: 'Tanda < atau > : (a, b) Bulatan Kosong ○  |  Tanda ≤ atau ≥ : [a, b] Bulatan Penuh ●',
        desc: 'Contoh: 2x − 4 ≥ 0 ⟹ 2x ≥ 4 ⟹ x ≥ 2. Karena memakai ≥, angka 2 ikut masuk ke dalam solusi (●).'
      }
    ]
  },

  // 5. SCENE 04: KONSEP PtLDV
  {
    id: 'scene-04',
    compId: 'Scene04-KonsepPtLDV',
    code: 'Scene 04',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 8,
    endMin: 11,
    presenter: 'rafie',
    title: 'Konsep Pertidaksamaan Linear Dua Variabel (PtLDV) & Grafik 2D',
    boardTitle: '2. PERTIDAKSAMAAN LINEAR DUA VARIABEL (PtLDV)',
    boardSubtitle: 'Bentuk Umum: ax + by ≤ c • Daerah Himpunan Penyelesaian (DHP) & Metode Uji Titik (0,0)',
    visualType: 'cartesian-ptldv',
    voScript: 'Lanjut ke PtLDV yang punya dua variabel x dan y. Solusinya berupa luasan Daerah Himpunan Penyelesaian di bidang Kartesius 2D. Ingat: tanda ≤ atau ≥ pakai garis utuh, sedangkan < atau > pakai garis putus-putus!',
    cartesianConfig: {
      mode: 'case1',
      equation: '2x + 5y ≤ 10',
      testText: 'Titik Potong (0,2) & (5,0) • Garis Utuh • Uji (0,0): 0 ≤ 10 (BENAR ✅ Arsir ke 0,0)'
    },
    steps: [
      {
        label: 'Langkah 1: Cari Titik Potong Sumbu X dan Sumbu Y',
        badge: 'Titik Potong',
        eq: 'Ubah jadi ax + by = c  ➔  Saat x = 0 cari y, saat y = 0 cari x',
        desc: 'Misal pada 2x + 5y = 10: saat x = 0 diperoleh y = 2 → (0,2), dan saat y = 0 diperoleh x = 5 → (5,0).'
      },
      {
        label: 'Langkah 2: Tentukan Jenis Garis Pembatas',
        badge: 'Utuh vs Putus',
        eq: 'Tanda ≤ atau ≥ ➔ Garis Lurus Utuh (Solid)  |  Tanda < atau > ➔ Garis Putus-putus (Dashed)',
        desc: 'Garis utuh menandakan titik-titik tepat pada garis ikut menjadi solusi.'
      },
      {
        label: 'Langkah 3: Metode Uji Titik (0,0) untuk Menentukan Arsiran DHP',
        badge: 'Uji (0,0)',
        eq: 'Substitusi (0,0) ➔ Jika BENAR arsir mendekati (0,0), jika SALAH arsir menjauhi (0,0)',
        desc: 'Pada 2(0) + 5(0) ≤ 10 ⟹ 0 ≤ 10 (BENAR), maka arsir wilayah di bawah garis yang memuat titik (0,0).'
      }
    ]
  },

  // 6. SCENE 05A: SOAL 1 PtLSV (DASAR & JEBAKAN BALIK TANDA)
  {
    id: 'scene-05a',
    compId: 'Scene05A-Soal1-PtLSV',
    code: 'Scene 05A',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 11.0,
    endMin: 12.0,
    presenter: 'rafie',
    title: 'Pembahasan Soal 1: PtLSV Dasar (Jebakan Balik Tanda)',
    boardTitle: 'BEDAH SOAL 1: PtLSV DASAR & JEBAKAN BALIK TANDA',
    boardSubtitle: '3(x - 2) + 4 < 5x - 6 • Pembagian Koefisien Negatif Mengharuskan Tanda Berbalik',
    visualType: 'number-line',
    voScript: 'Kita masuk ke pembahasan Soal 1 PtLSV: 3(x - 2) + 4 < 5x - 6. Perhatikan saat -2x < -4 dibagi dengan -2, tanda ketaksamaan wajib berbalik arah menjadi x > 2!',
    numberLineConfig: {
      points: [{ val: 2, filled: false, label: '2 (○)' }],
      shades: [{ from: 2, to: 5.5, label: 'HP: x > 2' }],
      signs: [
        { x: -1, sign: '−' },
        { x: 4, sign: '+' }
      ],
      caption: 'Hasil Soal 1: HP = {x | x > 2, x ∈ ℝ} • Interval: (2, ∞)'
    },
    steps: [
      {
        label: 'Ekspansi Distributif',
        badge: 'Langkah 1',
        eq: '3(x - 2) + 4 < 5x - 6 ⟹ 3x - 6 + 4 < 5x - 6',
        desc: 'Distribusikan faktor 3 ke dalam tanda kurung.'
      },
      {
        label: 'Sederhanakan & Pindah Ruas',
        badge: 'Langkah 2',
        eq: '3x - 2 < 5x - 6 ⟹ 3x - 5x < -6 + 2 ⟹ -2x < -4',
        desc: 'Kumpulkan suku bervariabel x di ruas kiri dan konstanta di ruas kanan.'
      },
      {
        label: 'Bagi Negatif (Tanda Berbalik!)',
        badge: 'Langkah 3 (Kritis)',
        eq: 'x > (-4) / (-2) ⟹ x > 2',
        desc: 'Membagi dengan -2 membalik tanda < menjadi >. HP = {x | x > 2, x ∈ ℝ}.'
      }
    ]
  },

  // 7. SCENE 05B: SOAL 2 PtLSV (PECAHAN & DISTRIBUSI NEGATIF)
  {
    id: 'scene-05b',
    compId: 'Scene05B-Soal2-PtLSV',
    code: 'Scene 05B',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 12.0,
    endMin: 13.0,
    presenter: 'rafie',
    title: 'Pembahasan Soal 2: PtLSV Bentuk Pecahan',
    boardTitle: 'BEDAH SOAL 2: PtLSV PECAHAN & DISTRIBUSI NEGATIF',
    boardSubtitle: '(2x - 1)/3 - (x + 2)/2 ≥ 1 • Hilangkan Penyebut dengan KPK 6',
    visualType: 'number-line',
    voScript: 'Soal 2 adalah PtLSV pecahan: (2x - 1)/3 - (x + 2)/2 ≥ 1. Kita hilangkan pecahan dengan mengalikan kedua ruas dengan KPK 6, lalu waspadai tanda minus saat mendistribusikan suku kedua.',
    numberLineConfig: {
      points: [{ val: 14, filled: true, label: '14 (●)' }],
      shades: [{ from: 14, to: 18, label: 'HP: x ≥ 14' }],
      signs: [
        { x: 11, sign: '−' },
        { x: 16, sign: '+' }
      ],
      caption: 'Hasil Soal 2: HP = {x | x ≥ 14, x ∈ ℝ} • Interval: [14, ∞)'
    },
    steps: [
      {
        label: 'Kalikan Kedua Ruas dengan KPK(3,2) = 6',
        badge: 'Langkah 1',
        eq: '6 · [(2x - 1)/3] - 6 · [(x + 2)/2] ≥ 6 · 1',
        desc: 'Penyebut lenyap tanpa membalik tanda karena 6 bernilai positif.'
      },
      {
        label: 'Hati-hati Distribusi Tanda Minus',
        badge: 'Langkah 2 (Waspada)',
        eq: '2(2x - 1) - 3(x + 2) ≥ 6 ⟹ 4x - 2 - 3x - 6 ≥ 6',
        desc: 'Distribusi -3 ke +2 menghasilkan -6.'
      },
      {
        label: 'Sederhanakan & Solusi Akhir',
        badge: 'Langkah 3',
        eq: 'x - 8 ≥ 6 ⟹ x ≥ 14',
        desc: 'HP = {x | x ≥ 14, x ∈ ℝ} atau interval [14, ∞).'
      }
    ]
  },

  // 8. SCENE 05C: SOAL 3 PtLDV (GARIS UTUH SOLID)
  {
    id: 'scene-05c',
    compId: 'Scene05C-Soal3-PtLDV',
    code: 'Scene 05C',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 13.0,
    endMin: 14.0,
    presenter: 'rafie',
    title: 'Pembahasan Soal 3: PtLDV Garis Utuh',
    boardTitle: 'BEDAH SOAL 3: PtLDV GARIS UTUH (SOLID)',
    boardSubtitle: '2x + 5y ≤ 10 • Titik Potong (0,2) & (5,0) • Uji (0,0) BENAR',
    visualType: 'cartesian-ptldv',
    voScript: 'Sekarang kita masuk ke PtLDV 2D pada Soal 3: 2x + 5y ≤ 10. Garis pembatas digambar utuh solid karena memiliki tanda sama dengan, dan uji titik (0,0) menghasilkan pernyataan benar.',
    cartesianConfig: {
      mode: 'case1',
      equation: '2x + 5y ≤ 10',
      testText: 'Titik Potong (0,2) & (5,0) • Garis Utuh • Uji (0,0): 0 ≤ 10 (BENAR ✅ Arsir ke 0,0)'
    },
    steps: [
      {
        label: 'Titik Potong Sumbu X dan Y',
        badge: 'Langkah 1',
        eq: 'x = 0 ⟹ y = 2  →  (0, 2)  |  y = 0 ⟹ x = 5  →  (5, 0)',
        desc: 'Garis persamaan pembatas 2x + 5y = 10 memotong kedua sumbu koordinat.'
      },
      {
        label: 'Jenis Garis Pembatas',
        badge: 'Langkah 2',
        eq: 'Tanda ≤ (kurang dari atau sama dengan) ⟹ Garis Lurus Utuh (Solid)',
        desc: 'Titik-titik tepat pada garis ikut menjadi solusi.'
      },
      {
        label: 'Uji Titik Sembarang (0,0)',
        badge: 'Langkah 3',
        eq: '2(0) + 5(0) ≤ 10 ⟹ 0 ≤ 10 (BENAR ✅)',
        desc: 'DHP adalah wilayah sisi garis yang memuat titik asal (0,0).'
      }
    ]
  },

  // 9. SCENE 05D: SOAL 4 PtLDV (GARIS PUTUS-PUTUS DASHED)
  {
    id: 'scene-05d',
    compId: 'Scene05D-Soal4-PtLDV',
    code: 'Scene 05D',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 14.0,
    endMin: 15.0,
    presenter: 'rafie',
    title: 'Pembahasan Soal 4: PtLDV Garis Putus-putus',
    boardTitle: 'BEDAH SOAL 4: PtLDV GARIS PUTUS-PUTUS (DASHED)',
    boardSubtitle: '4x - 3y > 12 • Titik Potong (0,-4) & (3,0) • Uji (0,0) SALAH',
    visualType: 'cartesian-ptldv',
    voScript: 'Soal 4 adalah 4x - 3y > 12. Karena tandanya lebih dari murni tanpa sama dengan, garis pembatas wajib putus-putus, dan uji titik (0,0) salah sehingga arsiran menjauhi (0,0).',
    cartesianConfig: {
      mode: 'case2',
      equation: '4x − 3y > 12',
      testText: 'Titik Potong (0,−4) & (3,0) • Garis Putus-putus • Uji (0,0): 0 > 12 (SALAH ❌ Arsir Menjauhi 0,0)'
    },
    steps: [
      {
        label: 'Titik Potong Sumbu X dan Y',
        badge: 'Langkah 1',
        eq: 'x = 0 ⟹ y = -4  →  (0, -4)  |  y = 0 ⟹ x = 3  →  (3, 0)',
        desc: 'Garis persamaan pembatas 4x - 3y = 12 memotong sumbu Y negatif dan sumbu X positif.'
      },
      {
        label: 'Jenis Garis Pembatas',
        badge: 'Langkah 2',
        eq: 'Tanda > (lebih dari murni) ⟹ Garis Putus-putus (Dashed)',
        desc: 'Titik-titik tepat pada garis tidak termasuk solusi.'
      },
      {
        label: 'Uji Titik Sembarang (0,0)',
        badge: 'Langkah 3',
        eq: '4(0) - 3(0) > 12 ⟹ 0 > 12 (SALAH ❌)',
        desc: 'DHP adalah wilayah sisi garis yang TIDAK memuat titik asal (0,0).'
      }
    ]
  },

  // 10. SCENE 05E: SOAL 5 SISTEM PtLDV (KUADRAN I)
  {
    id: 'scene-05e',
    compId: 'Scene05E-Soal5-SistemPtLDV',
    code: 'Scene 05E',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 15.0,
    endMin: 16.0,
    presenter: 'rafie',
    title: 'Pembahasan Soal 5: Aplikasi Sistem PtLDV',
    boardTitle: 'BEDAH SOAL 5: SISTEM PtLDV KUADRAN I',
    boardSubtitle: 'x + y ≥ 4 ; x ≥ 0 ; y ≥ 0 • Irisan DHP Kuadran I + Transisi ke Ikhsan',
    visualType: 'cartesian-ptldv',
    voScript: 'Soal 5 adalah Sistem PtLDV: x + y ≥ 4 dengan kendala non-negatif x ≥ 0 dan y ≥ 0. DHP berada di Kuadran I di atas garis. Selanjutnya, materi Rasional akan dibahas oleh Ikhsan!',
    cartesianConfig: {
      mode: 'case3',
      equation: 'x + y ≥ 4 ; x ≥ 0 ; y ≥ 0',
      testText: 'Titik Potong (0,4) & (4,0) • Uji (0,0): 0 ≥ 4 (SALAH ❌) • Irisan Kuadran I'
    },
    steps: [
      {
        label: 'Garis Utama & Uji Titik',
        badge: 'Kendala 1',
        eq: 'x + y = 4  →  (0, 4) & (4, 0)  |  Uji (0,0): 0 ≥ 4 (SALAH ❌)',
        desc: 'Arsir menjauhi (0,0) ke arah atas-kanan garis.'
      },
      {
        label: 'Syarat Non-Negatif (Kuadran I)',
        badge: 'Kendala 2 & 3',
        eq: 'x ≥ 0 (Kanan sumbu Y)  dan  y ≥ 0 (Atas sumbu X)',
        desc: 'Membatasi daerah penyelesaian hanya pada Kuadran I.'
      },
      {
        label: 'Daerah Bersih Irisan (DHP)',
        badge: 'Kesimpulan',
        eq: 'DHP = Irisan ketiganya (Wilayah Kuadran I di atas garis x + y = 4)',
        desc: 'Transisi materi berikutnya: Pertidaksamaan Rasional oleh Ikhsan.'
      }
    ]
  },

  // 8. SCENE 06A: INTRO SOLO IKHSAN (TENGAH & ZOOM TANPA PAPAN TULIS)
  {
    id: 'scene-06a-intro-ikhsan',
    compId: 'Scene06A-IntroIkhsan',
    code: 'Scene 06A (Intro Ikhsan)',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 16,
    endMin: 17,
    presenter: 'ikhsan',
    title: 'Scene Intro Pemateri 2: Ikhsan (Zoom Center Tanpa Papan Tulis)',
    boardTitle: 'PEMATERI 2: IKHSAN',
    boardSubtitle: 'Pengantar Materi Pertidaksamaan Rasional (Bentuk Pecahan Aljabar)',
    visualType: 'presenter-intro',
    voScript: 'Siap, thank you, Rafie! Halo teman-teman semuanya, kenalin gw Ikhsan! Di segmen kedua ini, gw bakal ngajak kalian menyelami materi Pertidaksamaan Rasional atau bentuk pecahan aljabar. Ingat satu aturan emasnya: penyebut nggak boleh sama dengan nol! Yuk kita bahas ke papan tulis!',
    steps: [
      {
        label: 'Perkenalan Pemateri 2: Ikhsan',
        badge: 'Solo Zoom-In',
        eq: 'Pertidaksamaan Rasional: f(x) / g(x) > 0  dengan  g(x) ≠ 0',
        desc: 'Kamera melakukan zoom-in ke arah Ikhsan di tengah ruang kelas sebelum menampilkan papan tulis.'
      },
      {
        label: 'Fokus Materi: Titik Kritis, Tabel Uji Tanda & 5 Contoh Soal',
        badge: 'Highlight Topik',
        eq: 'Pembuat Nol Pembilang vs Penyebut • Larangan Kali Silang • Faktor Tercoret',
        desc: 'Membedah tuntas cara menentukan tanda interval pada garis bilangan dan menghindari 4 kesalahan fatal.'
      }
    ]
  },

  // 9. SCENE 06B: KONSEP RASIONAL (3 FASE VIA SEQUENCE)
  {
    id: 'scene-06b',
    compId: 'Scene06B-KonsepRasional',
    code: 'Scene 06B',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 17,
    endMin: 19.5,
    durationFrames: 1500,
    presenter: 'ikhsan',
    title: 'Pengertian Pertidaksamaan Rasional, Titik Kritis & Tabel Uji Tanda',
    boardTitle: 'PERTIDAKSAMAAN RASIONAL (PECAHAN ALJABAR)',
    boardSubtitle: 'Pemateri: Ikhsan • 3 Fase: Bentuk Umum, Titik Kritis, & 5 Langkah Baku',
    visualType: 'sign-table',
    voScript: 'Di segmen ini kita pelajari pertidaksamaan pecahan aljabar. Kunci utamanya: cari titik kritis pembilang dan penyebut, uji tanda interval, dan penyebut tidak boleh nol!',
    steps: []
  },

  // 10. SCENE 07A: SOAL 1 RASIONAL (DASAR)
  {
    id: 'scene-07a',
    compId: 'Scene07A-Rasional-Soal1',
    code: 'Scene 07A',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 19.5,
    endMin: 21,
    durationFrames: 1050,
    presenter: 'ikhsan',
    title: 'Pembahasan Soal 1: Rasional Dasar',
    boardTitle: 'BEDAH SOAL 1: RASIONAL DASAR',
    boardSubtitle: '(x - 2)/(x + 1) ≥ 0 • Titik Kritis x = 2 & x = -1',
    visualType: 'number-line',
    voScript: 'Soal 1: (x - 2)/(x + 1) ≥ 0. Titik pembuat nol pembilang x = 2 masuk, sedangkan penyebut x = -1 wajib dikeluarkan!',
    steps: []
  },

  // 11. SCENE 07B: SOAL 2 RASIONAL (SELISIH KUADRAT)
  {
    id: 'scene-07b',
    compId: 'Scene07B-Rasional-Soal2',
    code: 'Scene 07B',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 21,
    endMin: 22.5,
    durationFrames: 1050,
    presenter: 'ikhsan',
    title: 'Pembahasan Soal 2: Pemfaktoran Selisih Kuadrat',
    boardTitle: 'BEDAH SOAL 2: PEMFAKTORAN KUADRAT',
    boardSubtitle: '(x² - 4)/(x - 1) < 0 • Tiga Titik Kritis -2, 1, dan 2',
    visualType: 'number-line',
    voScript: 'Soal 2: faktorkan pembilang menjadi (x-2)(x+2). Uji tanda 4 daerah dan pilih interval bernilai negatif.',
    steps: []
  },

  // 12. SCENE 07C: SOAL 3 RASIONAL (TANDA KURANG DARI SAMA DENGAN)
  {
    id: 'scene-07c',
    compId: 'Scene07C-Rasional-Soal3',
    code: 'Scene 07C',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 22.5,
    endMin: 24,
    durationFrames: 1050,
    presenter: 'ikhsan',
    title: 'Pembahasan Soal 3: Tanda Kurang Dari Sama Dengan (≤)',
    boardTitle: 'BEDAH SOAL 3: TANDA KURANG DARI SAMA DENGAN',
    boardSubtitle: '(2x + 1)/(x - 3) ≤ 0 • Pembilang x = -1/2 (●), Penyebut x = 3 (○)',
    visualType: 'number-line',
    voScript: 'Soal 3: titik pembilang x = -1/2 tertutup, sedangkan penyebut x = 3 tetap terbuka!',
    steps: []
  },

  // 13. SCENE 07D: SOAL 4 RASIONAL (PEMBILANG KUADRAT)
  {
    id: 'scene-07d',
    compId: 'Scene07D-Rasional-Soal4',
    code: 'Scene 07D',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 24,
    endMin: 25.5,
    durationFrames: 1050,
    presenter: 'ikhsan',
    title: 'Pembahasan Soal 4: Pembilang Selisih Kuadrat',
    boardTitle: 'BEDAH SOAL 4: PEMBILANG KUADRAT',
    boardSubtitle: '(x² - 9)/(x + 2) ≥ 0 • Titik Kritis -3, -2, dan 3',
    visualType: 'number-line',
    voScript: 'Soal 4: (x² - 9)/(x + 2) ≥ 0 menghasilkan HP = [-3, -2) U [3, inf).',
    steps: []
  },

  // 14. SCENE 07E: SOAL 5 RASIONAL (FAKTOR SAMA / JEBAKAN CORET)
  {
    id: 'scene-07e',
    compId: 'Scene07E-Rasional-Soal5',
    code: 'Scene 07E',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 25.5,
    endMin: 27.5,
    durationFrames: 1200,
    presenter: 'ikhsan',
    title: 'Pembahasan Soal 5: Faktor Sama (Jebakan Coret)',
    boardTitle: 'BEDAH SOAL 5: JEBAKAN FAKTOR SAMA TERCORAT',
    boardSubtitle: '(x² - x - 6)/(x² - 4) > 0 • Titik x = -2 Tetap Menjadi Lubang Kosong!',
    visualType: 'number-line',
    voScript: 'Hati-hati! Faktor (x+2) yang dicoret tetap menyisakan syarat asal x ≠ -2 sebagai lubang kosong!',
    steps: []
  },

  // 15. SCENE 07F: KESALAHAN & RINGKASAN RASIONAL
  {
    id: 'scene-07f',
    compId: 'Scene07F-Rasional-KesalahanRingkasan',
    code: 'Scene 07F',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 27.5,
    endMin: 31,
    durationFrames: 1050,
    presenter: 'ikhsan',
    title: '4 Kesalahan Umum & Ringkasan Rasional',
    boardTitle: 'EVALUASI KESALAHAN & RINGKASAN RASIONAL',
    boardSubtitle: '4 Jebakan Utama: Penyebut ≠ 0, Larangan Kali Silang, & Lubang Tercoret',
    visualType: 'summary-master',
    voScript: 'Ingat 4 kesalahan umum pada pertidaksamaan rasional, terutama larangan melakukan perkalian silang!',
    steps: []
  },

  // 16. SCENE 08A: INTRO SOLO PRAS (TENGAH & ZOOM TANPA PAPAN TULIS)
  {
    id: 'scene-08a-intro-pras',
    compId: 'Scene08A-IntroPras',
    code: 'Scene 08A (Intro Pras)',
    part: 3,
    partName: 'Part 3: Irasional (Pras)',
    startMin: 31,
    endMin: 32,
    durationFrames: 1800,
    presenter: 'pras',
    title: 'Scene Intro Pemateri 3: Pras (Zoom Center Tanpa Papan Tulis)',
    boardTitle: 'PEMATERI 3: PRAS',
    boardSubtitle: 'Pengantar Materi Pertidaksamaan Irasional (Bentuk Akar)',
    visualType: 'presenter-intro',
    voScript: 'Oke, makasih Ikhsan! Halo semuanya, kenalin gw Pras! Sekarang kita masuk ke cabang ketiga yaitu Pertidaksamaan Irasional atau bentuk akar. Kunci utama nyelesaiin soal ini ada dua: wajib cek Syarat Numerus di dalam akar harus lebih besar atau sama dengan nol, baru kita kuadratin kedua ruas! Yuk simak pembahasannya!',
    steps: [
      {
        label: 'Perkenalan Pemateri 3: Pras',
        badge: 'Solo Zoom-In',
        eq: 'Pertidaksamaan Irasional (Bentuk Akar): √f(x) < c  &  √f(x) ≤ √g(x)',
        desc: 'Kamera melakukan zoom-in fokus ke arah Pras di tengah kelas sebelum masuk ke papan tulis.'
      },
      {
        label: 'Fokus Materi: Syarat Numerus f(x) ≥ 0 & Irisan Himpunan Penyelesaian',
        badge: 'Highlight Topik',
        eq: 'Syarat Akar: f(x) ≥ 0  ∩  Kuadrat Ruas  =  Himpunan Penyelesaian (HP)',
        desc: 'Membahas cara mencari irisan solusi pada garis bilangan untuk 1 akar maupun 2 akar.'
      }
    ]
  },

  // 17. SCENE 08B: KONSEP IRASIONAL (3 FASE VIA SEQUENCE)
  {
    id: 'scene-08b',
    compId: 'Scene08B-KonsepIrasional',
    code: 'Scene 08B',
    part: 3,
    partName: 'Part 3: Irasional (Pras)',
    startMin: 32,
    endMin: 35.5,
    durationFrames: 1500,
    presenter: 'pras',
    title: 'Konsep Pertidaksamaan Irasional (Bentuk Akar)',
    boardTitle: 'PERTIDAKSAMAAN IRASIONAL (BENTUK AKAR)',
    boardSubtitle: 'Pemateri: Pras • 3 Fase: Bentuk Akar, 2 Prinsip Mutlak, & 3 Langkah Emas',
    visualType: 'concept-box',
    voScript: 'Pertidaksamaan irasional memuat variabel di bawah tanda akar. Wajib cek syarat numerus sebelum mengkuadratkan kedua ruas!',
    steps: []
  },

  // 18. SCENE 09A: SOAL 1 IRASIONAL (BENTUK I - SATU AKAR)
  {
    id: 'scene-09a',
    compId: 'Scene09A-Irasional-Soal1',
    code: 'Scene 09A',
    part: 3,
    partName: 'Part 3: Irasional (Pras)',
    startMin: 35.5,
    endMin: 39,
    durationFrames: 1050,
    presenter: 'pras',
    title: 'Pembahasan Soal 1: Bentuk I (Satu Akar)',
    boardTitle: 'BEDAH SOAL 1: BENTUK I (SATU AKAR)',
    boardSubtitle: '√(2x - 4) < 4 • Syarat Numerus x ≥ 2 dan Hasil Kuadrat x < 10',
    visualType: 'number-line',
    voScript: 'Soal 1: irisan antara syarat numerus x ≥ 2 dan hasil kuadrat x < 10 menghasilkan HP = [2, 10).',
    steps: []
  },

  // 19. SCENE 09B: SOAL 2 IRASIONAL (BENTUK II - DUA AKAR)
  {
    id: 'scene-09b',
    compId: 'Scene09B-Irasional-Soal2',
    code: 'Scene 09B',
    part: 3,
    partName: 'Part 3: Irasional (Pras)',
    startMin: 39,
    endMin: 42.5,
    durationFrames: 1200,
    presenter: 'pras',
    title: 'Pembahasan Soal 2: Bentuk II (Dua Akar)',
    boardTitle: 'BEDAH SOAL 2: BENTUK II (DUA AKAR)',
    boardSubtitle: '√(x - 1) ≤ √(2x - 4) • Irisan 3 Layer Menghasilkan x ≥ 3',
    visualType: 'number-line',
    voScript: 'Soal 2: kita iriskan ketiga syarat numerus dan hasil kuadrat di garis bilangan bertingkat.',
    steps: []
  },

  // 20. SCENE 09C: RINGKASAN IRASIONAL
  {
    id: 'scene-09c',
    compId: 'Scene09C-Irasional-Ringkasan',
    code: 'Scene 09C',
    part: 3,
    partName: 'Part 3: Irasional (Pras)',
    startMin: 42.5,
    endMin: 45,
    durationFrames: 750,
    presenter: 'pras',
    title: 'Ringkasan 3 Pilar Pertidaksamaan Irasional',
    boardTitle: 'RINGKASAN 3 PILAR IRASIONAL',
    boardSubtitle: 'Syarat Numerus, Pengkuadratan Sah, & Irisan Persekutuan',
    visualType: 'summary-master',
    voScript: 'Itulah 3 pilar penting bentuk akar. Sekarang mari kita lanjut ke segmen terakhir: Nilai Mutlak bersama Dimas!',
    steps: []
  },

  // 21. SCENE 10A: INTRO SOLO DIMAS (TENGAH & ZOOM TANPA PAPAN TULIS)
  {
    id: 'scene-10a-intro-dimas',
    compId: 'Scene10A-IntroDimas',
    code: 'Scene 10A (Intro Dimas)',
    part: 4,
    partName: 'Part 4: Mutlak & Closing',
    startMin: 45,
    endMin: 46,
    durationFrames: 1800,
    presenter: 'dimas',
    title: 'Scene Intro Pemateri 4: Dimas (Zoom Center Tanpa Papan Tulis)',
    boardTitle: 'PEMATERI 4: DIMAS',
    boardSubtitle: 'Pengantar Materi Pertidaksamaan Nilai Mutlak |f(x)|',
    visualType: 'presenter-intro',
    voScript: 'Mantap, Pras! Halo semuanya, kenalin gw Dimas! Di bagian keempat ini kita bakal mengupas tuntas Pertidaksamaan Nilai Mutlak. Konsep dasarnya, nilai mutlak itu mengukur jarak suatu bilangan dari titik nol, jadi nilainya nggak mungkin negatif! Yuk langsung kita lihat rumusnya di papan tulis!',
    steps: [
      {
        label: 'Perkenalan Pemateri 4: Dimas',
        badge: 'Solo Zoom-In',
        eq: 'Pertidaksamaan Nilai Mutlak: |f(x)| < a   &   |f(x)| ≥ a',
        desc: 'Kamera melakukan zoom-in fokus ke arah Dimas di tengah kelas sebelum masuk ke papan tulis.'
      },
      {
        label: 'Fokus Materi: Konsep Jarak Fisik, Rumus Sifat & Evaluasi Kesalahan Umum',
        badge: 'Highlight Topik',
        eq: 'Tanda < (Mengumpul di Tengah)  vs  Tanda > (Memencar Kiri & Kanan)',
        desc: 'Membedah 5 contoh soal nilai mutlak termasuk jebakan konstanta negatif |x| < −5.'
      }
    ]
  },

  // 22. SCENE 10B: KONSEP NILAI MUTLAK (3 FASE VIA SEQUENCE)
  {
    id: 'scene-10b',
    compId: 'Scene10B-KonsepMutlak',
    code: 'Scene 10B',
    part: 4,
    partName: 'Part 4: Mutlak & Closing',
    startMin: 46,
    endMin: 49.5,
    durationFrames: 1500,
    presenter: 'dimas',
    title: 'Konsep Pertidaksamaan Nilai Mutlak |f(x)|',
    boardTitle: 'PERTIDAKSAMAAN NILAI MUTLAK |f(x)|',
    boardSubtitle: 'Pemateri: Dimas • 3 Fase: Konsep Jarak, Karakteristik 2 Arah, & 4 Langkah Emas',
    visualType: 'mutlak-table',
    voScript: 'Tanda kurang dari menghasilkan rentang mengumpul di tengah, sedangkan tanda lebih dari menghasilkan solusi memencar ke arah kiri dan kanan.',
    steps: []
  },

  // 23. SCENE 11A: SOAL 1 MUTLAK (TANDA KURANG DARI)
  {
    id: 'scene-11a',
    compId: 'Scene11A-Mutlak-Soal1',
    code: 'Scene 11A',
    part: 4,
    partName: 'Part 4: Mutlak & Closing',
    startMin: 49.5,
    endMin: 52.5,
    durationFrames: 1050,
    presenter: 'dimas',
    title: 'Pembahasan Soal 1: Tanda Kurang Dari (<)',
    boardTitle: 'BEDAH SOAL 1: TANDA KURANG DARI (<)',
    boardSubtitle: '|2x - 3| < 7 • Solusi Mengumpul di Tengah: -2 < x < 5',
    visualType: 'number-line',
    voScript: 'Soal 1: |2x - 3| < 7 dijepit menjadi -7 < 2x - 3 < 7. Hasil akhirnya -2 < x < 5.',
    steps: []
  },

  // 24. SCENE 11B: SOAL 2 MUTLAK (TANDA LEBIH DARI SAMA DENGAN)
  {
    id: 'scene-11b',
    compId: 'Scene11B-Mutlak-Soal2',
    code: 'Scene 11B',
    part: 4,
    partName: 'Part 4: Mutlak & Closing',
    startMin: 52.5,
    endMin: 55.5,
    durationFrames: 1050,
    presenter: 'dimas',
    title: 'Pembahasan Soal 2: Tanda Lebih Dari Sama Dengan (≥)',
    boardTitle: 'BEDAH SOAL 2: TANDA LEBIH DARI SAMA DENGAN (≥)',
    boardSubtitle: '|3x + 2| ≥ 8 • Solusi Memencar: x ≤ -10/3 atau x ≥ 2',
    visualType: 'number-line',
    voScript: 'Soal 2: |3x + 2| ≥ 8 dipecah menjadi dua cabang terpisah dengan kurung siku [ ].',
    steps: []
  },

  // 25. SCENE 11C: KESALAHAN & TABEL RUMUS CEPAT MUTLAK
  {
    id: 'scene-11c',
    compId: 'Scene11C-Mutlak-KesalahanRingkasan',
    code: 'Scene 11C',
    part: 4,
    partName: 'Part 4: Mutlak & Closing',
    startMin: 55.5,
    endMin: 58,
    durationFrames: 1200,
    presenter: 'dimas',
    title: '3 Kesalahan Umum & Tabel Rumus Cepat Mutlak',
    boardTitle: 'EVALUASI KESALAHAN & TABEL RUMUS CEPAT',
    boardSubtitle: 'Waspada Konstanta Negatif di Ruas Kanan & Tabel 4 Rumus Baku',
    visualType: 'summary-master',
    voScript: 'Waspadai jebakan nilai mutlak kurang dari angka negatif! Hafalkan 4 rumus cepat untuk ujian.',
    steps: []
  },

  // 20. SCENE 12: CLOSING SUMMARY
  {
    id: 'scene-12',
    compId: 'Scene12-ClosingSummary',
    code: 'Scene 12',
    part: 4,
    partName: 'Part 4: Mutlak & Closing',
    startMin: 57.5,
    endMin: 60,
    presenter: 'rafie',
    title: 'Closing & Ringkasan Master 4 Cabang Pertidaksamaan',
    boardTitle: 'RINGKASAN AKHIR — 4 CABANG UTAMA PERTIDAKSAMAAN',
    boardSubtitle: 'Penutup oleh Rafie Armansyah bersama Ikhsan, Pras, dan Dimas',
    visualType: 'summary-master',
    voScript: 'Terima kasih, Dimas, Pras, dan Ikhsan buat penjelasannya! Nah, itu dia teman-teman, 4 cabang utama dari materi Pertidaksamaan: mulai dari Linear, Rasional, Irasional, sampai Nilai Mutlak lengkap dengan 20 contoh soalnya. Terima kasih udah nonton video presentasi kelompok kami, sampai jumpa!',
    steps: [
      {
        label: '1. Linear (PtLSV & PtLDV) — Rafie Armansyah',
        badge: 'Ringkasan 1',
        eq: 'Kali/Bagi Negatif Balik Tanda • PtLDV: Garis Utuh (≤/≥), Putus (< / >), Uji (0,0)',
        desc: 'PtLSV diselesaikan pada garis bilangan 1D, sedangkan PtLDV menghasilkan Daerah Himpunan Penyelesaian (DHP) 2D.'
      },
      {
        label: '2. Rasional (Ikhsan) & 3. Irasional (Pras)',
        badge: 'Ringkasan 2 & 3',
        eq: 'Rasional: Penyebut g(x) ≠ 0 & Uji Tanda • Irasional: Syarat Numerus f(x) ≥ 0 & Irisan (∩)',
        desc: 'Pada rasional jangan pernah kali silang; pada irasional wajib mengiriskan hasil kuadrat dengan syarat akar.'
      },
      {
        label: '4. Nilai Mutlak (Dimas) & Penutupan Kelompok',
        badge: 'Ringkasan 4',
        eq: '|f(x)| < a (Mengumpul di Tengah)  |  |f(x)| > a (Memencar Kiri & Kanan)',
        desc: 'Terima kasih telah menyimak video pembelajaran 60 menit kelompok kami!'
      }
    ]
  }
];

#!/usr/bin/env node
/**
 * MCP SERVER & 1:1 EXACT VISUAL REBUILDER V3.0 — VIDEO PERTIDAKSAMAAN 60 MENIT
 * Fitur Baru V3.0:
 * - 4 Scene Intro Khusus Pemateri (Scene02A-IntroRafie, Scene06A-IntroIkhsan, Scene08A-IntroPras, Scene10A-IntroDimas)
 * - Di Scene Intro Pemateri: TANPA PAPAN TULIS, pemateri berdiri di TENGAH, dan kamera ZOOM-IN ke arah pemateri.
 *
 * Cara jalankan langsung: node mcp-pertidaksamaan-server.mjs --apply
 */
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const ROOT_DIR = process.cwd();

const FILES_TO_WRITE = {
  // ==========================================================================
  // 1. MASTER DATA 20 SCENE (TERMASUK 4 SCENE INTRO ZOOM PEMATERI)
  // ==========================================================================
  'src/data/scenesData.ts': `export const FPS = 30;
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
    role: 'Moderator & Pemateri 1 • Pertidaksamaan Linear (PLSV & PLDV)',
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
  presenter: 'all' | 'rafie' | 'ikhsan' | 'pras' | 'dimas';
  title: string;
  boardTitle: string;
  boardSubtitle: string;
  visualType:
    | 'presenter-intro'
    | 'intro-school'
    | 'number-line'
    | 'cartesian-pldv'
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
    mode: 'case1' | 'case2';
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
        eq: 'PLSV & PLDV ➔ Pecahan Rasional ➔ Bentuk Akar Irasional ➔ Nilai Mutlak',
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
    boardSubtitle: 'Pengantar Materi Pertidaksamaan Linear Satu & Dua Variabel (PLSV & PLDV)',
    visualType: 'presenter-intro',
    voScript: 'Halo semuanya! Selamat datang di video pembelajaran matematika kelompok kami. Kenalkan, gw Rafie Armansyah! Di bagian pertama ini, gw bakal memandu kalian membedah tuntas Pertidaksamaan Linear Satu Variabel dan Dua Variabel beserta 5 contoh soalnya. Yuk langsung kita mulai!',
    steps: [
      {
        label: 'Perkenalan Moderator & Pemateri 1: Rafie Armansyah',
        badge: 'Solo Zoom-In',
        eq: 'Pertidaksamaan Linear Satu Variabel (PLSV) & Dua Variabel (PLDV)',
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

  // 4. SCENE 03: KONSEP PLSV
  {
    id: 'scene-03',
    compId: 'Scene03-KonsepPLSV',
    code: 'Scene 03',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 5.5,
    endMin: 8,
    presenter: 'rafie',
    title: 'Konsep Pertidaksamaan Linear Satu Variabel (PLSV)',
    boardTitle: '1. PERTIDAKSAMAAN LINEAR SATU VARIABEL (PLSV)',
    boardSubtitle: 'Bentuk Umum: ax + b < c • Visualisasi Garis Bilangan Terbuka (○) vs Tertutup (●)',
    visualType: 'number-line',
    voScript: 'Sekarang kita masuk ke PLSV atau Pertidaksamaan Linear Satu Variabel. Di sini variabelnya cuma satu, yaitu x berpangkat satu. Tugas kita adalah mengisolasi x sendirian di ruas kiri dan menggambarnya di garis bilangan.',
    numberLineConfig: {
      points: [{ val: 2, filled: true, label: '2 (●)' }],
      shades: [{ from: 2, to: 5.5, label: 'HP: x ≥ 2' }],
      signs: [
        { x: -1, sign: '−' },
        { x: 4, sign: '+' }
      ],
      caption: 'Visualisasi PLSV: 2x − 4 ≥ 0 ⟹ 2x ≥ 4 ⟹ x ≥ 2 (Bulatan penuh ● karena tanda ≥)'
    },
    steps: [
      {
        label: 'Bentuk Umum & Isolasi Variabel PLSV',
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

  // 5. SCENE 04: KONSEP PLDV
  {
    id: 'scene-04',
    compId: 'Scene04-KonsepPLDV',
    code: 'Scene 04',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 8,
    endMin: 11,
    presenter: 'rafie',
    title: 'Konsep Pertidaksamaan Linear Dua Variabel (PLDV) & Grafik 2D',
    boardTitle: '2. PERTIDAKSAMAAN LINEAR DUA VARIABEL (PLDV)',
    boardSubtitle: 'Bentuk Umum: ax + by ≤ c • Daerah Himpunan Penyelesaian (DHP) & Metode Uji Titik (0,0)',
    visualType: 'cartesian-pldv',
    voScript: 'Lanjut ke PLDV yang punya dua variabel x dan y. Solusinya berupa luasan Daerah Himpunan Penyelesaian di bidang Kartesius 2D. Ingat: tanda ≤ atau ≥ pakai garis utuh, sedangkan < atau > pakai garis putus-putus!',
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

  // 6. SCENE 05A: SOAL 1 & 2 PLSV
  {
    id: 'scene-05a',
    compId: 'Scene05A-SoalPLSV',
    code: 'Scene 05A',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 11,
    endMin: 13.5,
    presenter: 'rafie',
    title: 'Pembahasan Contoh Soal 1 & 2 Pertidaksamaan Linear (PLSV)',
    boardTitle: 'BEDAH TUNTAS CONTOH SOAL 1 & 2 (PLSV)',
    boardSubtitle: 'Soal 1: PLSV Pembagian Negatif • Soal 2: PLSV Bentuk Pecahan (KPK = 6)',
    visualType: 'number-line',
    voScript: 'Kita langsung praktek ke Soal 1 dan Soal 2 PLSV. Perhatikan di Soal 1 saat −2x < −4 dibagi dengan −2, tandanya wajib berbalik dari kurang dari menjadi lebih dari sehingga x > 2. Di Soal 2 kita kalikan semua ruas dengan KPK 6.',
    numberLineConfig: {
      points: [{ val: 2, filled: false, label: '2 (○ Soal 1)' }],
      shades: [{ from: 2, to: 5.5, label: 'Soal 1: x > 2' }],
      signs: [
        { x: -1, sign: '−' },
        { x: 4, sign: '+' }
      ],
      caption: 'Hasil Soal 1: HP = {x | x > 2, x ∈ ℝ} • Hasil Soal 2: HP = {x | x ≥ 14, x ∈ ℝ}'
    },
    steps: [
      {
        label: 'Soal 1 (PLSV Dasar): 3(x − 2) + 4 < 5x − 6',
        badge: 'Contoh Soal 1',
        eq: '3x − 6 + 4 < 5x − 6  ⟹  3x − 2 < 5x − 6  ⟹  −2x < −4',
        desc: 'Bagi kedua ruas dengan −2 (tanda < wajib berbalik arah menjadi >): x > (−4)/(−2) ⟹ x > 2. HP = {x | x > 2, x ∈ ℝ}.'
      },
      {
        label: 'Soal 2 (PLSV Pecahan): (2x − 1)/3 − (x + 2)/2 ≥ 1',
        badge: 'Contoh Soal 2',
        eq: 'Kalikan KPK(3,2) = 6  ⟹  2(2x − 1) − 3(x + 2) ≥ 6',
        desc: 'Jabarkan kurung: 4x − 2 − 3x − 6 ≥ 6.'
      },
      {
        label: 'Penyelesaian Akhir Soal 2',
        badge: 'Hasil Soal 2',
        eq: 'x − 8 ≥ 6  ⟹  x ≥ 14   ➔   HP = {x | x ≥ 14, x ∈ ℝ}',
        desc: 'Karena kita mengalikan dengan +6 (positif) dan koefisien x positif, arah tanda ≥ tetap.'
      }
    ]
  },

  // 7. SCENE 05B: SOAL 3, 4 & 5 PLDV
  {
    id: 'scene-05b',
    compId: 'Scene05B-SoalPLDV',
    code: 'Scene 05B',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 13.5,
    endMin: 16,
    presenter: 'rafie',
    title: 'Pembahasan Contoh Soal 3, 4 & 5 (PLDV) + Transisi ke Ikhsan',
    boardTitle: 'BEDAH TUNTAS CONTOH SOAL 3, 4 & 5 (PLDV KARTESIUS)',
    boardSubtitle: 'Garis Utuh vs Garis Putus-putus & Sistem PLDV Kuadran I',
    visualType: 'cartesian-pldv',
    voScript: 'Untuk Soal 3, 4, dan 5 kita memetakan Daerah Himpunan Penyelesaian di bidang 2D. Di Soal 4, karena 4x − 3y > 12 memakai tanda >, garisnya putus-putus dan uji (0,0) salah sehingga diarsir menjauhi (0,0). Selanjutnya ada Pertidaksamaan Rasional yang bakal dijelasin sama rekan gw, Ikhsan. Silakan, San!',
    cartesianConfig: {
      mode: 'case2',
      equation: '4x − 3y > 12',
      testText: 'Titik Potong (0,−4) & (3,0) • Garis Putus-putus • Uji (0,0): 0 > 12 (SALAH ❌ Arsir Menjauhi 0,0)'
    },
    steps: [
      {
        label: 'Soal 3 (PLDV Garis Utuh): 2x + 5y ≤ 10',
        badge: 'Contoh Soal 3',
        eq: 'Titik Potong (0,2) & (5,0) • Garis Utuh • Uji (0,0): 0 ≤ 10 (BENAR)',
        desc: 'Kesimpulan Soal 3: Arsir daerah bawah-kiri garis yang memuat titik (0,0).'
      },
      {
        label: 'Soal 4 (PLDV Garis Putus-putus): 4x − 3y > 12',
        badge: 'Contoh Soal 4',
        eq: 'Titik Potong (0,−4) & (3,0) • Garis Putus-putus • Uji (0,0): 0 > 12 (SALAH)',
        desc: 'Kesimpulan Soal 4: Arsir daerah di seberang garis (kanan-bawah) yang menjauhi titik (0,0).'
      },
      {
        label: 'Soal 5 (Sistem PLDV): x + y ≥ 4; x ≥ 0; y ≥ 0',
        badge: 'Contoh Soal 5',
        eq: 'Garis melalui (0,4) & (4,0) • Uji (0,0): 0 ≥ 4 (SALAH) • Batas Kuadran I',
        desc: 'Kesimpulan Soal 5: DHP berada di Kuadran I (x ≥ 0, y ≥ 0) di sebelah ATAS/KANAN garis x + y = 4.'
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

  // 9. SCENE 06: KONSEP RASIONAL (IKHSAN + PAPAN TULIS)
  {
    id: 'scene-06',
    compId: 'Scene06-KonsepRasional',
    code: 'Scene 06',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 17,
    endMin: 20.5,
    presenter: 'ikhsan',
    title: 'Pengertian Pertidaksamaan Rasional, Titik Kritis & Tabel Uji Tanda',
    boardTitle: 'PERTIDAKSAMAAN RASIONAL (PECAHAN ALJABAR)',
    boardSubtitle: 'Pemateri: Ikhsan • Bentuk Umum f(x)/g(x) > 0 dengan Syarat Mutlak g(x) ≠ 0',
    visualType: 'sign-table',
    voScript: 'Oke teman-teman, beda sama yang linear tadi, di Pertidaksamaan Rasional ini bentuk matematikanya berupa pecahan f(x)/g(x). Kita harus mencari titik kritis dari pembilang dan penyebut, lalu melakukan uji tanda pada garis bilangan.',
    steps: [
      {
        label: 'Pengertian & Syarat Penyebut Pertidaksamaan Rasional',
        badge: 'Konsep Dasar',
        eq: 'f(x) / g(x) > 0   dengan Syarat Mutlak: Penyebut g(x) ≠ 0',
        desc: 'Pertidaksamaan rasional memuat pecahan aljabar di mana pembilang f(x) dan/atau penyebut g(x) berupa bentuk aljabar.'
      },
      {
        label: 'Konsep Titik Kritis (Pembuat Nol Pembilang & Penyebut)',
        badge: 'Titik Kritis',
        eq: 'Contoh: (x − 2)/(x + 1) ≥ 0 ➔ Pembilang x = 2 (●), Penyebut x = −1 (○)',
        desc: 'Nilai pembuat nol pembilang dapat dimasukkan jika tanda ≥ atau ≤. Nilai pembuat nol penyebut SELALU DIKECUALIKAN (○).'
      },
      {
        label: '5 Langkah Baku Penyelesaian Pertidaksamaan Rasional',
        badge: '5 Langkah',
        eq: '1. Ruas kanan = 0 ➔ 2. Faktorkan ➔ 3. Titik Kritis ➔ 4. Uji Tanda ➔ 5. Tentukan HP',
        desc: 'Jangan pernah mengalikan silang penyebut bervariabel x karena tanda g(x) belum diketahui positif atau negatifnya.'
      }
    ]
  },

  // 10. SCENE 07A: SOAL RASIONAL 1, 2 & 3
  {
    id: 'scene-07a',
    compId: 'Scene07A-SoalRasional123',
    code: 'Scene 07A',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 20.5,
    endMin: 25.5,
    presenter: 'ikhsan',
    title: 'Pembahasan Contoh Soal 1, 2 & 3 Pertidaksamaan Rasional',
    boardTitle: 'CONTOH SOAL 1, 2 & 3 — PERTIDAKSAMAAN RASIONAL',
    boardSubtitle: 'Dasar, Pemfaktoran Kuadrat (x² − 4), dan Tanda ≤',
    visualType: 'number-line',
    voScript: 'Mari kita bedah Contoh 1 sampai Contoh 3. Pada Contoh 1: (x − 2)/(x + 1) ≥ 0, titik kritisnya −1 dan 2. Ingat, meskipun tandanya ≥, titik x = −1 dari penyebut tetap pakai kurung biasa karena penyebut tidak boleh nol!',
    numberLineConfig: {
      points: [
        { val: -1, filled: false, label: '−1 (○)' },
        { val: 2, filled: true, label: '2 (●)' }
      ],
      shades: [
        { from: -5.5, to: -1, label: 'HP (+)' },
        { from: 2, to: 5.5, label: 'HP (+)' }
      ],
      signs: [
        { x: -3.2, sign: '+' },
        { x: 0.5, sign: '−' },
        { x: 3.8, sign: '+' }
      ],
      caption: 'Visualisasi Contoh 1: (x − 2)/(x + 1) ≥ 0 ➔ HP = (−∞, −1) ∪ [2, ∞)'
    },
    steps: [
      {
        label: 'Contoh 1 (Dasar): (x − 2) / (x + 1) ≥ 0',
        badge: 'Contoh 1',
        eq: 'Titik kritis: x = 2 (pembilang ●), x = −1 (penyebut ○) • Uji tanda: (+) (−) (+)',
        desc: 'Ambil interval positif serta x = 2 (x = −1 dikecualikan): HP = (−∞, −1) ∪ [2, ∞).'
      },
      {
        label: 'Contoh 2 (Tingkat Menengah): (x² − 4) / (x − 1) < 0',
        badge: 'Contoh 2',
        eq: 'Faktorkan: [(x − 2)(x + 2)] / (x − 1) < 0 • Titik kritis: −2, 1, 2',
        desc: 'Uji tanda 4 interval: (−) (+) (−) (+). Ambil yang negatif (semua titik terbuka): HP = (−∞, −2) ∪ (1, 2).'
      },
      {
        label: 'Contoh 3 (Tanda ≤): (2x + 1) / (x − 3) ≤ 0',
        badge: 'Contoh 3',
        eq: 'Pembilang nol: x = −1/2 (●) • Penyebut nol: x = 3 (○) • Uji tanda: (+) (−) (+)',
        desc: 'Ambil interval negatif dan masukkan x = −1/2 (x = 3 dikecualikan): HP = [−1/2, 3).'
      }
    ]
  },

  // 11. SCENE 07B: SOAL RASIONAL 4 & 5
  {
    id: 'scene-07b',
    compId: 'Scene07B-SoalRasional45',
    code: 'Scene 07B',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 25.5,
    endMin: 31,
    presenter: 'ikhsan',
    title: 'Contoh Soal 4 & 5 (Faktor Sama Tercoret) + 4 Kesalahan Umum',
    boardTitle: 'CONTOH SOAL 4 & 5 + KESALAHAN YANG PERLU DIHINDARI',
    boardSubtitle: 'Waspada Jebakan Faktor Sama yang Dicoret & Larangan Kali Silang',
    visualType: 'number-line',
    voScript: 'Perhatikan Contoh 5 yang sering menjebak: (x² − x − 6)/(x² − 4) > 0. Walaupun faktor (x + 2) bisa dicoret, syarat penyebut awal x ≠ −2 tetap berlaku sehingga −2 wajib dikeluarkan dari interval! Nah, materi Pertidaksamaan Irasional selanjutnya bakal dibahas sama Pras. Lanjut, Pras!',
    numberLineConfig: {
      points: [
        { val: -3, filled: true, label: '−3 (●)' },
        { val: -1.5, filled: false, label: '−2 (○)' },
        { val: 3, filled: true, label: '3 (●)' }
      ],
      shades: [
        { from: -3, to: -1.5, label: '[−3, −2)' },
        { from: 3, to: 5.5, label: '[3, ∞)' }
      ],
      signs: [
        { x: -4.3, sign: '−' },
        { x: -2.25, sign: '+' },
        { x: 0.8, sign: '−' },
        { x: 4.3, sign: '+' }
      ],
      caption: 'Visualisasi Contoh 4: (x² − 9)/(x + 2) ≥ 0 ➔ HP = [−3, −2) ∪ [3, ∞)'
    },
    steps: [
      {
        label: 'Contoh 4 (Pembilang Kuadrat): (x² − 9) / (x + 2) ≥ 0',
        badge: 'Contoh 4',
        eq: '[(x − 3)(x + 3)] / (x + 2) ≥ 0  ➔  HP = [−3, −2) ∪ [3, ∞)',
        desc: 'Uji tanda: x < −3 (−); −3 < x < −2 (+); −2 < x < 3 (−); x > 3 (+). Titik −3 dan 3 masuk, −2 dikecualikan.'
      },
      {
        label: 'Contoh 5 (Faktor Sama): (x² − x − 6) / (x² − 4) > 0',
        badge: 'Contoh 5',
        eq: '[(x − 3)(x + 2)] / [(x − 2)(x + 2)] > 0  (Syarat awal: x ≠ −2 dan x ≠ 2)',
        desc: 'Faktor (x + 2) dicoret ➔ (x − 3)/(x − 2) > 0 positif saat x < 2 atau x > 3. Keluarkan x = −2: HP = (−∞, −2) ∪ (−2, 2) ∪ (3, ∞).'
      },
      {
        label: '4 Kesalahan Umum yang Wajib Dihindari',
        badge: 'Evaluasi Penting',
        eq: '1. Penyebut ≠ 0 • 2. Pembilang ikut hanya jika ≥/≤ • 3. Faktor tercoret tetap ≠ 0 • 4. Dilarang kali silang!',
        desc: 'Jangan pernah mengalikan silang tanpa mengetahui tanda penyebut karena arah pertidaksamaan dapat berubah.'
      }
    ]
  },

  // 12. SCENE 08A: INTRO SOLO PRAS (TENGAH & ZOOM TANPA PAPAN TULIS)
  {
    id: 'scene-08a-intro-pras',
    compId: 'Scene08A-IntroPras',
    code: 'Scene 08A (Intro Pras)',
    part: 3,
    partName: 'Part 3: Irasional (Pras)',
    startMin: 31,
    endMin: 32,
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

  // 13. SCENE 08: KONSEP IRASIONAL (PRAS + PAPAN TULIS)
  {
    id: 'scene-08',
    compId: 'Scene08-KonsepIrasional',
    code: 'Scene 08',
    part: 3,
    partName: 'Part 3: Irasional (Pras)',
    startMin: 32,
    endMin: 36,
    presenter: 'pras',
    title: 'Pengertian Pertidaksamaan Irasional & Syarat Utama Numerus',
    boardTitle: 'PERTIDAKSAMAAN IRASIONAL (BENTUK AKAR)',
    boardSubtitle: 'Pemateri: Pras • Syarat Mutlak Numerus f(x) ≥ 0 & Hasil Akar √f(x) ≥ 0',
    visualType: 'concept-box',
    voScript: 'Di papan tulis kita bisa lihat, pertidaksamaan irasional memuat variabel di dalam tanda akar. Jangan pernah langsung mengkuadratkan kedua ruas sebelum kalian menuliskan syarat numerus f(x) ≥ 0!',
    steps: [
      {
        label: 'Pengertian Pertidaksamaan Irasional (Bentuk Akar)',
        badge: 'Definisi',
        eq: 'Contoh: √(x − 3) < 2  ;  √(2x + 1) ≥ √(x − 4)  ;  √(x² − 4) ≤ x + 2',
        desc: 'Pertidaksamaan irasional adalah pertidaksamaan di mana variabel atau peubahnya berada di dalam tanda akar.'
      },
      {
        label: 'Prinsip & 2 Syarat Utama Akar Pangkat Genap (Sangat Penting!)',
        badge: 'Syarat Mutlak',
        eq: 'A. Syarat Numerus: f(x) ≥ 0   |   B. Hasil Akar Selalu Non-Negatif: √f(x) ≥ 0',
        desc: 'Nilai fungsi di dalam tanda akar genap tidak boleh negatif agar terdefinisi pada himpunan bilangan real ℝ.'
      },
      {
        label: '3 Langkah Penyelesaian Umum & Rumus Bentuk I & II',
        badge: '3 Langkah',
        eq: 'HP Akhir = (Syarat Numerus f(x) ≥ 0)  ∩  (Hasil Kuadrat Kedua Ruas)',
        desc: 'Bentuk I: √f(x) < c ➔ f(x) ≥ 0 ∩ f(x) < c². Bentuk II: √f(x) < √g(x) ➔ f(x) ≥ 0 ∩ g(x) ≥ 0 ∩ f(x) < g(x).'
      }
    ]
  },

  // 14. SCENE 09A: SOAL IRASIONAL 1 & 2
  {
    id: 'scene-09a',
    compId: 'Scene09A-SoalIrasional12',
    code: 'Scene 09A',
    part: 3,
    partName: 'Part 3: Irasional (Pras)',
    startMin: 36,
    endMin: 40.5,
    presenter: 'pras',
    title: 'Pembahasan Contoh Soal 1 (Satu Akar) & Contoh Soal 2 (Dua Akar)',
    boardTitle: 'CONTOH SOAL 1 & 2 — PERTIDAKSAMAAN IRASIONAL',
    boardSubtitle: 'Mencari Irisan (∩) antara Syarat Akar dan Hasil Penguadratan Kedua Ruas',
    visualType: 'number-line',
    voScript: 'Kita lihat Contoh 1: √(2x − 4) < 4. Langkah pertama syarat dalam akar 2x − 4 ≥ 0 menghasilkan x ≥ 2. Langkah kedua kita kuadratkan kedua ruas dapat x < 10. Irisan keduanya adalah 2 ≤ x < 10!',
    numberLineConfig: {
      points: [
        { val: -1, filled: true, label: '2 (● Syarat Akar)' },
        { val: 3.5, filled: false, label: '10 (○ Kuadrat)' }
      ],
      shades: [{ from: -1, to: 3.5, label: 'Irisan HP: 2 ≤ x < 10' }],
      signs: [
        { x: -3.2, sign: '−' },
        { x: 1.25, sign: '+' },
        { x: 4.8, sign: '−' }
      ],
      caption: 'Irisan Contoh 1: (x ≥ 2) ∩ (x < 10) ➔ HP = {x | 2 ≤ x < 10, x ∈ ℝ}'
    },
    steps: [
      {
        label: 'Contoh 1 (Bentuk I - Satu Akar): √(2x − 4) < 4',
        badge: 'Contoh 1',
        eq: 'Syarat Akar: 2x − 4 ≥ 0 ⟹ x ≥ 2 (Daerah I) • Kuadrat: 2x − 4 < 16 ⟹ x < 10 (Daerah II)',
        desc: 'Irisan Daerah I (x ≥ 2) dan Daerah II (x < 10) menghasilkan: HP = {x | 2 ≤ x < 10, x ∈ ℝ}.'
      },
      {
        label: 'Contoh 2 (Bentuk II - Dua Akar): √(x − 1) ≤ √(2x − 4)',
        badge: 'Contoh 2 (Syarat)',
        eq: 'Syarat Akar 1: x − 1 ≥ 0 ⟹ x ≥ 1 (Daerah I) • Syarat Akar 2: 2x − 4 ≥ 0 ⟹ x ≥ 2 (Daerah II)',
        desc: 'Kedua fungsi di dalam masing-masing akar wajib memenuhi syarat non-negatif.'
      },
      {
        label: 'Kuadrat Ruas & Irisan 3 Daerah pada Contoh 2',
        badge: 'Contoh 2 (HP)',
        eq: 'Kuadrat: x − 1 ≤ 2x − 4 ⟹ x ≥ 3 (Daerah III) • Irisan: (x ≥ 1) ∩ (x ≥ 2) ∩ (x ≥ 3)',
        desc: 'Nilai x yang memenuhi ketiga kondisi tersebut secara bersamaan adalah: HP = {x | x ≥ 3, x ∈ ℝ}.'
      }
    ]
  },

  // 15. SCENE 09B: SOAL IRASIONAL 3, 4 & 5
  {
    id: 'scene-09b',
    compId: 'Scene09B-SoalIrasional345',
    code: 'Scene 09B',
    part: 3,
    partName: 'Part 3: Irasional (Pras)',
    startMin: 40.5,
    endMin: 45,
    presenter: 'pras',
    title: 'Pembahasan Contoh Soal 3, 4 & 5 Irasional + Transisi ke Dimas',
    boardTitle: 'CONTOH SOAL 3, 4 & 5 — VARIASI BENTUK AKAR LENGKAP',
    boardSubtitle: 'Bedah Soal √(x − 3) < 2, √(2x + 1) ≥ √(x − 4), dan √(x² − 4) ≤ x + 2',
    visualType: 'number-line',
    voScript: 'Sekarang kita selesaikan juga ketiga bentuk contoh di awal materi irasional: √(x − 3) < 2, √(2x + 1) ≥ √(x − 4), dan √(x² − 4) ≤ x + 2. Nah, tipe pertidaksamaan terakhir bakal bikin kalian sadar kalau matematika itu mutlak benarnya. Dimas, waktu dan tempat dipersilakan!',
    numberLineConfig: {
      points: [
        { val: 0, filled: true, label: '3 (●)' },
        { val: 3.5, filled: false, label: '7 (○)' }
      ],
      shades: [{ from: 0, to: 3.5, label: 'Contoh 3: 3 ≤ x < 7' }],
      signs: [
        { x: -2.5, sign: '−' },
        { x: 1.75, sign: '+' }
      ],
      caption: 'Contoh 3: √(x − 3) < 2 ➔ HP = [3, 7) • Contoh 4: HP = [4, ∞) • Contoh 5: HP = {−2} ∪ [2, ∞)'
    },
    steps: [
      {
        label: 'Contoh 3 (Satu Akar Dasar): √(x − 3) < 2',
        badge: 'Contoh 3',
        eq: 'Syarat: x − 3 ≥ 0 ⟹ x ≥ 3 • Kuadrat: x − 3 < 4 ⟹ x < 7',
        desc: 'Irisan (x ≥ 3) ∩ (x < 7) menghasilkan: HP = {x | 3 ≤ x < 7, x ∈ ℝ}.'
      },
      {
        label: 'Contoh 4 (Dua Akar Tanda ≥): √(2x + 1) ≥ √(x − 4)',
        badge: 'Contoh 4',
        eq: 'Syarat 1: x ≥ −1/2 • Syarat 2: x ≥ 4 • Kuadrat: 2x + 1 ≥ x − 4 ⟹ x ≥ −5',
        desc: 'Irisan (x ≥ −1/2) ∩ (x ≥ 4) ∩ (x ≥ −5) adalah: HP = {x | x ≥ 4, x ∈ ℝ}.'
      },
      {
        label: 'Contoh 5 (Akar Kuadrat vs Linear): √(x² − 4) ≤ x + 2',
        badge: 'Contoh 5',
        eq: 'Numerus: x ≤ −2 atau x ≥ 2 • Syarat kanan: x ≥ −2 • Kuadrat: x² − 4 ≤ x² + 4x + 4 ⟹ x ≥ −2',
        desc: 'Irisan ketiga syarat menghasilkan titik x = −2 atau rentang x ≥ 2: HP = {x | x = −2 atau x ≥ 2, x ∈ ℝ}.'
      }
    ]
  },

  // 16. SCENE 10A: INTRO SOLO DIMAS (TENGAH & ZOOM TANPA PAPAN TULIS)
  {
    id: 'scene-10a-intro-dimas',
    compId: 'Scene10A-IntroDimas',
    code: 'Scene 10A (Intro Dimas)',
    part: 4,
    partName: 'Part 4: Mutlak & Closing',
    startMin: 45,
    endMin: 46,
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

  // 17. SCENE 10: KONSEP NILAI MUTLAK (DIMAS + PAPAN TULIS)
  {
    id: 'scene-10',
    compId: 'Scene10-KonsepMutlak',
    code: 'Scene 10',
    part: 4,
    partName: 'Part 4: Mutlak & Closing',
    startMin: 46,
    endMin: 49.5,
    presenter: 'dimas',
    title: 'Pengertian Pertidaksamaan Nilai Mutlak, Konsep Jarak & Tabel Sifat',
    boardTitle: 'PERTIDAKSAMAAN NILAI MUTLAK |f(x)|',
    boardSubtitle: 'Pemateri: Dimas • Prinsip Jarak dari Titik Nol (|x| ≥ 0) & Karakteristik Tanda',
    visualType: 'mutlak-table',
    voScript: 'Perhatikan tabel di papan tulis: kalau tandanya kurang dari (<), daerah penyelesaiannya ngumpul di tengah-tengah. Tapi kalau tandanya lebih dari (>), daerah penyelesaiannya memencar ke arah kiri dan kanan.',
    steps: [
      {
        label: 'Pengertian & Konsep Dasar Jarak Fisik dari Titik Nol',
        badge: 'Prinsip Jarak',
        eq: '|x| ≥ 0 untuk setiap x ∈ ℝ  (Jarak tidak pernah bernilai negatif)',
        desc: 'Tanda < atau ≤ menunjukkan jarak dekat (mengumpul di tengah). Tanda > atau ≥ menunjukkan jarak jauh (memencar ke kiri dan kanan).'
      },
      {
        label: '4 Langkah Penyelesaian Pertidaksamaan Nilai Mutlak',
        badge: '4 Langkah',
        eq: '1. Isolasi |...| ➔ 2. Ubah ke sifat aljabar ➔ 3. Operasikan variabel x ➔ 4. Tulis HP',
        desc: 'Pastikan komponen tanda mutlak berdiri sendiri di satu ruas sebelum menggunakan sifat penjabaran mutlak.'
      },
      {
        label: 'Rumus Sifat Utama Nilai Mutlak (Syarat Konstanta a ≥ 0)',
        badge: 'Rumus Sifat',
        eq: '|f(x)| < a ⟺ −a < f(x) < a   |   |f(x)| > a ⟺ f(x) < −a atau f(x) > a',
        desc: 'Berlaku juga untuk tanda ≤ (interval tertutup) dan ≥ (interval tertutup memencar).'
      }
    ]
  },

  // 18. SCENE 11A: SOAL MUTLAK 1 & 2
  {
    id: 'scene-11a',
    compId: 'Scene11A-SoalMutlak12',
    code: 'Scene 11A',
    part: 4,
    partName: 'Part 4: Mutlak & Closing',
    startMin: 49.5,
    endMin: 53.5,
    presenter: 'dimas',
    title: 'Pembahasan Contoh Soal 1 (<) & Contoh Soal 2 (≥) Nilai Mutlak',
    boardTitle: 'CONTOH SOAL 1 & 2 — PERTIDAKSAMAAN NILAI MUTLAK',
    boardSubtitle: 'Mengumpul di Tengah vs Memencar ke Kiri dan Kanan',
    visualType: 'number-line',
    voScript: 'Kita bahas Contoh 1: |2x − 3| < 7. Karena pakai tanda kurang dari, kita jepit di tengah jadi −7 < 2x − 3 < 7. Tambah 3 di semua ruas lalu bagi 2, dapat −2 < x < 5. Sedangkan di Contoh 2: |3x + 2| ≥ 8 kita pecah ke kiri dan ke kanan!',
    numberLineConfig: {
      points: [
        { val: -2, filled: false, label: '−2 (○)' },
        { val: 3.5, filled: false, label: '5 (○)' }
      ],
      shades: [{ from: -2, to: 3.5, label: 'Contoh 1: −2 < x < 5' }],
      signs: [
        { x: -3.8, sign: '−' },
        { x: 0.8, sign: '+' },
        { x: 4.8, sign: '−' }
      ],
      caption: 'Contoh 1: |2x − 3| < 7 ➔ HP = {x | −2 < x < 5} (Mengumpul di tengah)'
    },
    steps: [
      {
        label: 'Contoh 1 (Tanda Kurang Dari): |2x − 3| < 7',
        badge: 'Contoh 1',
        eq: '−7 < 2x − 3 < 7  ⟹  −7 + 3 < 2x < 7 + 3  ⟹  −4 < 2x < 10',
        desc: 'Semua ruas dibagi 2 menghasilkan: −2 < x < 5. Jadi HP = {x | −2 < x < 5}.'
      },
      {
        label: 'Contoh 2 (Tanda Lebih Dari Sama Dengan): |3x + 2| ≥ 8 — Kondisi Kiri',
        badge: 'Contoh 2 (Kiri)',
        eq: 'Kondisi Pertama (Arah Kiri): 3x + 2 ≤ −8  ⟹  3x ≤ −10  ⟹  x ≤ −10/3',
        desc: 'Daerah penyelesaian cabang kiri menuju negatif tak hingga.'
      },
      {
        label: 'Contoh 2: |3x + 2| ≥ 8 — Kondisi Kanan & Gabungan HP',
        badge: 'Contoh 2 (Kanan)',
        eq: 'Kondisi Kedua (Arah Kanan): 3x + 2 ≥ 8  ⟹  3x ≥ 6  ⟹  x ≥ 2',
        desc: 'Gabungkan kedua kondisi: HP = {x | x ≤ −10/3 atau x ≥ 2}.'
      }
    ]
  },

  // 19. SCENE 11B: SOAL MUTLAK 3, 4 & 5
  {
    id: 'scene-11b',
    compId: 'Scene11B-SoalMutlak345',
    code: 'Scene 11B',
    part: 4,
    partName: 'Part 4: Mutlak & Closing',
    startMin: 53.5,
    endMin: 57.5,
    presenter: 'dimas',
    title: 'Contoh Soal 3, 4 & 5 Nilai Mutlak + Evaluasi Kesalahan Umum',
    boardTitle: 'CONTOH SOAL 3, 4 & 5 + EVALUASI KESALAHAN UMUM MUTLAK',
    boardSubtitle: 'Isolasi Mutlak, Mutlak Kedua Ruas, dan Jebakan Konstanta Negatif |x| < −5',
    visualType: 'number-line',
    voScript: 'Hati-hati sama 3 kesalahan umum di nilai mutlak! Pertama, kalau ketemu soal kayak Contoh 5 yaitu |x| < −5, jangan dijabarkan pakai rumus! Jarak mutlak mustahil kurang dari angka negatif, jadi jawabannya langsung Himpunan Kosong! Udah kebayang kan gimana bedanya keempat jenis pertidaksamaan tadi? Biar makin jelas, gw balikin lagi ke Rafie buat nutup presentasi kita.',
    numberLineConfig: {
      points: [
        { val: -3.3, filled: true, label: '−10/3 (●)' },
        { val: 2, filled: true, label: '2 (●)' }
      ],
      shades: [
        { from: -5.5, to: -3.3, label: 'x ≤ −10/3' },
        { from: 2, to: 5.5, label: 'x ≥ 2' }
      ],
      signs: [
        { x: -4.4, sign: '+' },
        { x: -0.5, sign: '−' },
        { x: 3.8, sign: '+' }
      ],
      caption: 'Visualisasi Memencar Kiri & Kanan: x ≤ −10/3 atau x ≥ 2'
    },
    steps: [
      {
        label: 'Contoh 3 (Isolasi Mutlak & Bagi Negatif): 2|4 − x| − 3 ≤ 5',
        badge: 'Contoh 3',
        eq: '2|4 − x| ≤ 8 ⟹ |4 − x| ≤ 4 ⟹ −4 ≤ 4 − x ≤ 4 ⟹ −8 ≤ −x ≤ 0',
        desc: 'Bagi semua ruas dengan −1 (tanda wajib berbalik arah): 8 ≥ x ≥ 0 atau HP = {x | 0 ≤ x ≤ 8}.'
      },
      {
        label: 'Contoh 4 (Mutlak Kedua Ruas): |2x − 1| > |x + 4|',
        badge: 'Contoh 4',
        eq: '[(2x − 1) + (x + 4)][(2x − 1) − (x + 4)] > 0  ⟹  (3x + 3)(x − 5) > 0',
        desc: 'Titik kritis x = −1 dan x = 5. Karena tanda >, penyelesaian memencar: HP = {x | x < −1 atau x > 5}.'
      },
      {
        label: 'Contoh 5 & Evaluasi Kesalahan Umum: Kasus |x| < −5',
        badge: 'Contoh 5 & Evaluasi',
        eq: '|x| < −5  ⟹  HP = ∅ (Himpunan Kosong / Tidak Memiliki Penyelesaian)',
        desc: '3 Kesalahan Umum: (1) Mengabaikan konstanta negatif, (2) Tertukar rumus < dan >, (3) Lupa membalik tanda saat dibagi negatif.'
      }
    ]
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
        label: '1. Linear (PLSV & PLDV) — Rafie Armansyah',
        badge: 'Ringkasan 1',
        eq: 'Kali/Bagi Negatif Balik Tanda • PLDV: Garis Utuh (≤/≥), Putus (< / >), Uji (0,0)',
        desc: 'PLSV diselesaikan pada garis bilangan 1D, sedangkan PLDV menghasilkan Daerah Himpunan Penyelesaian (DHP) 2D.'
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
`,

  // ==========================================================================
  // 2. CLASSROOM STAGE V3.0 (MENDUKUNG MODE PRESENTER-INTRO SOLO CENTER ZOOM)
  // ==========================================================================
  'src/components/ClassroomStage.tsx': `import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { SceneItem, CHARACTERS_INFO } from '../data/scenesData';
import { ChalkboardVisualizer } from './ChalkboardVisualizer';
import { TeacherCharacter } from './TeacherCharacter';
import { Scene01_Intro } from './Scene01_Intro';

export const ClassroomStage: React.FC<{ scene: SceneItem }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Khusus Scene 01 Intro: Tampilkan langsung komponen visual animasi 3 sub-sekuens
  if (scene.id === 'scene-01' || scene.compId === 'Scene01-Intro') {
    return <Scene01_Intro />;
  }

  // ── Auto-Switch & Timing Langkah Berbasis useCurrentFrame ──
  const totalSteps = scene.steps.length || 1;
  const framesPerStep = Math.max(1, Math.floor(durationInFrames / totalSteps));
  const activeStepIndex = Math.min(totalSteps - 1, Math.floor(frame / framesPerStep));
  const frameInStep = frame - activeStepIndex * framesPerStep;
  const stepProgress = frameInStep / framesPerStep;

  const isPresenterIntro = scene.visualType === 'presenter-intro';
  const presenterInfo =
    scene.presenter !== 'all' ? CHARACTERS_INFO[scene.presenter] : CHARACTERS_INFO.rafie;

  // Animasi Kamera Zoom-In Khusus Scene Intro Pemateri (Tanpa Papan Tulis, Fokus ke Pemateri di Tengah)
  const introSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60 }
  });
  const cameraZoom = isPresenterIntro
    ? interpolate(frame, [0, durationInFrames], [1.08, 1.38], {
        extrapolateRight: 'clamp'
      })
    : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: '#020617', overflow: 'hidden' }}>
      {/* KANVAS LOGIS 960x540 DI-SCALE 2X PERSIS MENJADI 1920x1080 FULL HD */}
      <div
        style={{
          width: 960,
          height: 540,
          transform: 'scale(2)',
          transformOrigin: 'top left',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#84b582',
          fontFamily: 'Inter, system-ui, sans-serif',
          overflow: 'hidden'
        }}
      >
        {/* 1. LANGIT-LANGIT KELAS & 3 LAMPU PANEL */}
        <div
          style={{
            height: 32,
            backgroundColor: '#d8caa8',
            borderBottom: '4px solid #8c6239',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 48px',
            zIndex: 10,
            flexShrink: 0
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 140,
                height: 10,
                backgroundColor: '#fef9c3',
                border: '1.5px solid #78716c',
                borderRadius: 2,
                boxShadow: '0 0 14px rgba(254,249,195,0.85)'
              }}
            />
          ))}
        </div>

        {/* 2. AREA DINDING RUANG KELAS HIJAU ALAM (NATURE GREEN) */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            background: isPresenterIntro
              ? 'radial-gradient(circle at 50% 45%, #8ec38c 0%, #6ea36c 65%, #568754 100%)'
              : 'linear-gradient(180deg, #7cb07a 0%, #689f66 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isPresenterIntro ? 'center' : 'flex-start',
            padding: '8px 20px',
            overflow: 'hidden'
          }}
        >
          {/* Jendela Kiri & Cahaya Matahari Pagi */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 8,
              bottom: 24,
              width: 44,
              backgroundColor: '#fef3c7',
              borderRight: '4px solid #8c6239',
              borderTop: '4px solid #8c6239',
              borderBottom: '4px solid #8c6239',
              zIndex: 5
            }}
          >
            <div style={{ width: '100%', height: '50%', borderBottom: '4px solid #8c6239' }} />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 180,
              pointerEvents: 'none',
              opacity: 0.22,
              background: 'linear-gradient(115deg, rgba(254,249,195,0.85) 0%, transparent 70%)',
              zIndex: 6
            }}
          />

          {/* Tanaman Hias di Sudut Kiri Bawah */}
          <div
            style={{
              position: 'absolute',
              left: 10,
              bottom: 4,
              zIndex: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            <div
              style={{
                width: 42,
                height: 52,
                borderRadius: 999,
                backgroundColor: '#047857',
                border: '2px solid #064e3b',
                marginBottom: -10
              }}
            />
            <div
              style={{
                width: 34,
                height: 32,
                backgroundColor: '#b45309',
                border: '2px solid #78350f',
                borderRadius: '0 0 8px 8px'
              }}
            />
          </div>

          {/* Pintu Kayu Kanan */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 10,
              bottom: 0,
              width: 44,
              backgroundColor: '#9a5b25',
              borderLeft: '4px solid #5c3412',
              borderTop: '4px solid #5c3412',
              zIndex: 5
            }}
          />

          {/* ============================================================== */}
          {/* CABANG TAMPILAN 1: SCENE INTRO PEMATERI (TANPA PAPAN TULIS!)   */}
          {/* Pemateri Berdiri Sendirian di Tengah + Kamera Zoom-In Halus    */}
          {/* ============================================================== */}
          {isPresenterIntro ? (
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                zIndex: 20
              }}
            >
              {/* Lingkaran Spotlight Lembut di Belakang Pemateri */}
              <div
                style={{
                  position: 'absolute',
                  top: '8%',
                  width: 320,
                  height: 320,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(254,249,195,0.45) 0%, rgba(16,185,129,0.15) 55%, transparent 75%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Banner Atas Topik Materi Pemateri (Bukan Papan Tulis) */}
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  opacity: introSpring,
                  transform: \`translateY(\${(1 - introSpring) * -14}px)\`,
                  zIndex: 25
                }}
              >
                <span
                  style={{
                    padding: '4px 16px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(2, 6, 23, 0.92)',
                    border: '2px solid #fbbf24',
                    color: '#fde68a',
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.4)'
                  }}
                >
                  🎬 SCENE INTRO PEMATERI • {presenterInfo.topicBadge}
                </span>
              </div>

              {/* Kontainer Karakter di Tengah dengan Efek Kamera Zoom-In */}
              <div
                style={{
                  height: '88%',
                  width: 250,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  transform: \`scale(\${cameraZoom})\`,
                  transformOrigin: 'center 62%',
                  filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.4))'
                }}
              >
                <TeacherCharacter
                  type={scene.presenter === 'all' ? 'rafie' : scene.presenter}
                  isSpeaking={true}
                  isActive={true}
                  frame={frame}
                />
              </div>

              {/* Lower-Third Nameplate Keren di Depan Pemateri */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 12,
                  backgroundColor: 'rgba(2, 6, 23, 0.94)',
                  border: '2px solid rgba(52, 211, 153, 0.8)',
                  borderRadius: 14,
                  padding: '8px 24px',
                  textAlign: 'center',
                  boxShadow: '0 14px 30px rgba(0,0,0,0.55)',
                  zIndex: 30,
                  minWidth: 420
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: '0.04em'
                  }}
                >
                  {presenterInfo.fullName.toUpperCase()}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: '#6ee7b7',
                    marginTop: 2
                  }}
                >
                  {presenterInfo.role}
                </div>
              </div>
            </div>
          ) : (
            /* ============================================================== */
            /* CABANG TAMPILAN 2: SCENE MATERI NORMAL (DENGAN PAPAN TULIS)    */
            /* ============================================================== */
            <>
              {/* PAPAN TULIS KAYU COKELAT TUA (LEBIH TINGGI & PROPORSIONAL) */}
              <div
                style={{
                  position: 'relative',
                  height: '98%',
                  width: scene.presenter === 'all' ? '88%' : '75%',
                  marginLeft: 24,
                  borderRadius: 14,
                  backgroundColor: '#1e4631',
                  border: '9px solid #7c4d2b',
                  boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  zIndex: 10
                }}
              >
                <ChalkboardVisualizer
                  scene={scene}
                  activeStepIndex={activeStepIndex}
                  stepProgress={stepProgress}
                  frameInStep={frameInStep}
                  framesPerStep={framesPerStep}
                />

                {/* Tatakan Kapur di Bawah Papan Tulis */}
                <div
                  style={{
                    height: 10,
                    backgroundColor: '#5c371c',
                    borderTop: '1px solid #9a653c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 28,
                    flexShrink: 0
                  }}
                >
                  <div style={{ width: 32, height: 4, backgroundColor: '#ffffff', borderRadius: 999 }} />
                  <div style={{ width: 24, height: 5, backgroundColor: '#fde68a', borderRadius: 2 }} />
                  <div style={{ width: 38, height: 6, backgroundColor: '#1e293b', borderRadius: 2 }} />
                </div>
              </div>

              {/* KARAKTER PEMATERI MENAPAK DI LANTAI & BERADA 100% DI DALAM LAYAR */}
              {scene.presenter === 'all' ? (
                <div
                  style={{
                    position: 'absolute',
                    left: 20,
                    right: 20,
                    top: 24,
                    bottom: 0,
                    zIndex: 20,
                    backgroundColor: 'rgba(2, 6, 23, 0.55)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-around',
                    padding: '0 20px 4px 20px'
                  }}
                >
                  {(['ikhsan', 'rafie', 'pras', 'dimas'] as const).map((charId) => (
                    <div
                      key={charId}
                      style={{
                        height: '90%',
                        width: 165,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <TeacherCharacter type={charId} isSpeaking={true} isActive={true} frame={frame} />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    right: 24,
                    bottom: 0,
                    height: '95%',
                    width: 175,
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    overflow: 'visible'
                  }}
                >
                  <TeacherCharacter
                    type={scene.presenter}
                    isSpeaking={true}
                    isActive={true}
                    frame={frame}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* 3. LANTAI KELAS NATURE GREEN (PROPORSI MENAWAN, TANPA BAR VO) */}
        <div
          style={{
            height: 44,
            backgroundColor: '#8ba68f',
            borderTop: '6px solid #7c4d2b',
            position: 'relative',
            boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.22)',
            display: 'flex',
            justifyContent: 'space-around',
            overflow: 'hidden',
            flexShrink: 0,
            zIndex: 15
          }}
        >
          {/* Garis Ubin Lantai Perspektif */}
          {[...Array(14)].map((_, i) => (
            <div key={i} style={{ width: 1, height: '100%', backgroundColor: 'rgba(30, 70, 49, 0.22)' }} />
          ))}
          {/* Pantulan Sinar Matahari di Lantai */}
          <div
            style={{
              position: 'absolute',
              left: 70,
              top: 4,
              width: 130,
              height: 24,
              backgroundColor: 'rgba(254, 240, 138, 0.32)',
              transform: 'skewX(-35deg)',
              borderRadius: 4
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
`
};

function applyExactRebuild() {
  const logs = [];
  for (const [relPath, content] of Object.entries(FILES_TO_WRITE)) {
    const fullPath = path.join(ROOT_DIR, relPath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
    logs.push(`✅ Updated V3.0: ${relPath}`);
  }
  return logs.join('\\n');
}

if (process.argv.includes('--apply')) {
  console.log('🚀 Menjalankan Update V3.0 (4 Scene Intro Pemateri Zoom Tengah Tanpa Papan Tulis)...');
  console.log(applyExactRebuild());
  console.log('🎉 Selesai! Cek localhost:3000 untuk melihat Scene02A-IntroRafie, Scene06A-IntroIkhsan, Scene08A-IntroPras, dan Scene10A-IntroDimas!');
  process.exit(0);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

rl.on('line', (line) => {
  if (!line.trim()) return;
  try {
    const req = JSON.parse(line);
    if (req.method === 'initialize') {
      process.stdout.write(
        JSON.stringify({
          jsonrpc: '2.0',
          id: req.id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: { name: 'mcp-pertidaksamaan-remotion', version: '3.0.0' }
          }
        }) + '\\n'
      );
    } else if (req.method === 'tools/list') {
      process.stdout.write(
        JSON.stringify({
          jsonrpc: '2.0',
          id: req.id,
          result: {
            tools: [
              {
                name: 'apply_exact_remotion_visuals',
                description:
                  'Update V3.0: Menambahkan 4 Scene Intro Pemateri (Rafie, Ikhsan, Pras, Dimas) di tengah layar dengan efek kamera Zoom-In tanpa papan tulis.',
                inputSchema: { type: 'object', properties: {} }
              }
            ]
          }
        }) + '\\n'
      );
    } else if (req.method === 'tools/call' && req.params?.name === 'apply_exact_remotion_visuals') {
      const output = applyExactRebuild();
      process.stdout.write(
        JSON.stringify({
          jsonrpc: '2.0',
          id: req.id,
          result: { content: [{ type: 'text', text: output }] }
        }) + '\\n'
      );
    }
  } catch (err) {
    // Abaikan baris non-JSON
  }
});
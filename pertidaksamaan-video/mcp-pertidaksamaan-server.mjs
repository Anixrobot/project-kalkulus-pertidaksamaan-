#!/usr/bin/env node
/**
 * MCP SERVER & 1:1 EXACT VISUAL REBUILDER — VIDEO PERTIDAKSAMAAN 60 MENIT
 * Bisa dijalankan langsung via: node mcp-pertidaksamaan-server.mjs --apply
 * Atau didaftarkan sebagai MCP Server di AI Antigravity (stdio protocol).
 */
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const ROOT_DIR = process.cwd();

const FILES_TO_WRITE = {
  // ==========================================================================
  // 1. MASTER DATA 16 SCENE (60 MENIT = 108.000 FRAMES) & 4 KARAKTER
  // ==========================================================================
  'src/data/scenesData.ts': `export const FPS = 30;
export const TOTAL_MINUTES = 60;
export const TOTAL_FRAMES = TOTAL_MINUTES * 60 * FPS; // 108.000 frames

export interface CharacterProfile {
  id: 'ikhsan' | 'rafie' | 'pras' | 'dimas';
  name: string;
  fullName: string;
  role: string;
  desc: string;
}

export const CHARACTERS_INFO: Record<string, CharacterProfile> = {
  ikhsan: {
    id: 'ikhsan',
    name: 'IKHSAN',
    fullName: 'Ikhsan',
    role: 'Pemateri 2 • Pertidaksamaan Rasional (Pecahan)',
    desc: 'Rambut messy bowl cut berponi, kacamata bulat, kemeja batik di balik jas biru muda polos, memegang pointer.'
  },
  rafie: {
    id: 'rafie',
    name: 'RAFIE',
    fullName: 'Rafie Armansyah',
    role: 'Moderator & Pemateri 1 • Opening, PLSV, PLDV & Closing',
    desc: 'Rambut hitam rapi belah tengah, berkacamata frame tipis, kemeja putih di balik jas biru muda polos, memegang tablet.'
  },
  pras: {
    id: 'pras',
    name: 'PRAS',
    fullName: 'Pras',
    role: 'Pemateri 3 • Pertidaksamaan Irasional (Bentuk Akar)',
    desc: 'Rambut sedikit bergelombang tanpa kacamata, kaos polo gelap di balik jas biru muda polos, gestur tangan terbuka.'
  },
  dimas: {
    id: 'dimas',
    name: 'DIMAS',
    fullName: 'Dimas',
    role: 'Pemateri 4 • Pertidaksamaan Nilai Mutlak',
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
  visualType: 'intro-school' | 'number-line' | 'cartesian-pldv' | 'sign-table' | 'mutlak-table' | 'concept-box' | 'summary-master';
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
  {
    id: 'scene-02',
    compId: 'Scene02-HukumFundamental',
    code: 'Scene 02',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 2,
    endMin: 5,
    presenter: 'rafie',
    title: 'Opening Moderator & Hukum Fundamental Pertidaksamaan',
    boardTitle: 'HUKUM FUNDAMENTAL PERTIDAKSAMAAN (<, >, ≤, ≥)',
    boardSubtitle: 'Pemateri: Rafie Armansyah • Aturan Mutlak Penjumlahan vs Perkalian/Pembagian Negatif',
    visualType: 'number-line',
    voScript: 'Halo semuanya! Selamat datang di video pembelajaran matematika kelompok kami. Kenalkan, gw Rafie Armansyah. Secara sederhana, pertidaksamaan itu adalah kalimat matematika yang nunjukin perbandingan ukuran. Ingat aturan paling kritis: kalau dikali atau dibagi bilangan negatif, tanda wajib berbalik arah!',
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
  {
    id: 'scene-03',
    compId: 'Scene03-KonsepPLSV',
    code: 'Scene 03',
    part: 1,
    partName: 'Part 1: Intro & Linear',
    startMin: 5,
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
  {
    id: 'scene-06',
    compId: 'Scene06-KonsepRasional',
    code: 'Scene 06',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 16,
    endMin: 20,
    presenter: 'ikhsan',
    title: 'Pengertian Pertidaksamaan Rasional, Titik Kritis & Tabel Uji Tanda',
    boardTitle: 'PERTIDAKSAMAAN RASIONAL (PECAHAN ALJABAR)',
    boardSubtitle: 'Pemateri: Ikhsan • Bentuk Umum f(x)/g(x) > 0 dengan Syarat Mutlak g(x) ≠ 0',
    visualType: 'sign-table',
    voScript: 'Siap, thank you, Rafie! Oke teman-teman, sekarang kita masuk ke jenis kedua yaitu Pertidaksamaan Rasional. Beda sama yang linear, di sini bentuk matematikanya berupa pecahan f(x)/g(x). Aturan paling penting: penyebutnya nggak boleh sama dengan nol!',
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
  {
    id: 'scene-07a',
    compId: 'Scene07A-SoalRasional123',
    code: 'Scene 07A',
    part: 2,
    partName: 'Part 2: Rasional (Ikhsan)',
    startMin: 20,
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
  {
    id: 'scene-08',
    compId: 'Scene08-KonsepIrasional',
    code: 'Scene 08',
    part: 3,
    partName: 'Part 3: Irasional (Pras)',
    startMin: 31,
    endMin: 36,
    presenter: 'pras',
    title: 'Pengertian Pertidaksamaan Irasional & Syarat Utama Numerus',
    boardTitle: 'PERTIDAKSAMAAN IRASIONAL (BENTUK AKAR)',
    boardSubtitle: 'Pemateri: Pras • Syarat Mutlak Numerus f(x) ≥ 0 & Hasil Akar √f(x) ≥ 0',
    visualType: 'concept-box',
    voScript: 'Oke, makasih Ikhsan. Halo semuanya, gw Pras! Sekarang kita bahas Pertidaksamaan Irasional atau bentuk akar. Kunci utama buat nyelesaiin soal ini ada dua syarat: kuadratin kedua ruas, dan syarat numerus yaitu nilai di dalam akar wajib lebih besar atau sama dengan nol!',
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
  {
    id: 'scene-10',
    compId: 'Scene10-KonsepMutlak',
    code: 'Scene 10',
    part: 4,
    partName: 'Part 4: Mutlak & Closing',
    startMin: 45,
    endMin: 49.5,
    presenter: 'dimas',
    title: 'Pengertian Pertidaksamaan Nilai Mutlak, Konsep Jarak & Tabel Sifat',
    boardTitle: 'PERTIDAKSAMAAN NILAI MUTLAK |f(x)|',
    boardSubtitle: 'Pemateri: Dimas • Prinsip Jarak dari Titik Nol (|x| ≥ 0) & Karakteristik Tanda',
    visualType: 'mutlak-table',
    voScript: 'Mantap, Pras! Halo semuanya, gw Dimas. Konsep dasarnya, nilai mutlak itu nunjukin jarak suatu angka dari titik nol di garis bilangan. Karena ngomongin jarak fisik, nilainya pasti selalu positif atau minimal nol! Kalau tandanya kurang dari (<), daerahnya ngumpul di tengah. Kalau lebih dari (>), daerahnya mencar ke kiri dan kanan.',
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
  // 2. KOMPONEN KARAKTER 2D PERSIS PREVIEW (DENGAN SKALA & MENAPAK DI LANTAI)
  // ==========================================================================
  'src/components/TeacherCharacter.tsx': `import React from 'react';
import { CHARACTERS_INFO } from '../data/scenesData';

export const TeacherCharacter: React.FC<{
  type: 'ikhsan' | 'rafie' | 'pras' | 'dimas';
  isSpeaking?: boolean;
  isActive?: boolean;
  frame?: number;
}> = ({ type = 'rafie', isSpeaking = true, isActive = true, frame = 0 }) => {
  const safeType = CHARACTERS_INFO[type] ? type : 'rafie';
  const info = CHARACTERS_INFO[safeType];

  const mouthOpen = isSpeaking ? Math.abs(Math.sin(frame * 0.45)) * 5 + 2 : 1.5;
  const armWave = isSpeaking ? Math.sin(frame * 0.2) * 3 : 0;

  const skinColor =
    safeType === 'pras' ? '#c68652' : safeType === 'dimas' ? '#cc8e59' : '#f1b88a';
  const bodyWidth = safeType === 'dimas' ? 88 : 74;
  const bodyX = 100 - bodyWidth / 2;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        userSelect: 'none'
      }}
    >
      <div
        style={{
          marginBottom: 4,
          padding: '2px 10px',
          borderRadius: 6,
          fontWeight: 900,
          fontSize: 13,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          backgroundColor: isActive ? 'rgba(2, 6, 23, 0.92)' : 'rgba(15, 23, 42, 0.75)',
          color: isActive ? '#ffffff' : '#cbd5e1',
          border: isActive ? '2px solid #ffffff' : '1px solid #475569',
          boxShadow: '0 6px 14px rgba(0,0,0,0.35)'
        }}
      >
        {info.name}
      </div>

      <svg
        viewBox="0 0 200 320"
        style={{ width: '100%', height: '100%', maxHeight: 295, overflow: 'visible' }}
      >
        <ellipse cx="100" cy="308" rx="48" ry="8" fill="rgba(0,0,0,0.28)" />

        <rect x={100 - bodyWidth * 0.38} y="205" width="24" height="88" rx="6" fill="#293548" stroke="#0f172a" strokeWidth="3" />
        <rect x={100 + bodyWidth * 0.38 - 24} y="205" width="24" height="88" rx="6" fill="#293548" stroke="#0f172a" strokeWidth="3" />

        <path
          d={\`M \${100 - bodyWidth * 0.38 - 6} 292 Q \${100 - bodyWidth * 0.38 + 10} 285 \${100 - bodyWidth * 0.38 + 26} 292 L \${100 - bodyWidth * 0.38 + 28} 305 L \${100 - bodyWidth * 0.38 - 8} 305 Z\`}
          fill={safeType === 'rafie' ? '#4a3728' : safeType === 'pras' ? '#854d27' : '#334155'}
          stroke="#0f172a"
          strokeWidth="3"
        />
        <path
          d={\`M \${100 + bodyWidth * 0.38 - 26} 292 Q \${100 + bodyWidth * 0.38 - 10} 285 \${100 + bodyWidth * 0.38 + 6} 292 L \${100 + bodyWidth * 0.38 + 8} 305 L \${100 + bodyWidth * 0.38 - 28} 305 Z\`}
          fill={safeType === 'rafie' ? '#4a3728' : safeType === 'pras' ? '#854d27' : '#334155'}
          stroke="#0f172a"
          strokeWidth="3"
        />

        <rect
          x={bodyX + 8}
          y="108"
          width={bodyWidth - 16}
          height="102"
          rx="8"
          fill={
            safeType === 'rafie'
              ? '#f8fafc'
              : safeType === 'ikhsan'
              ? '#e5dec9'
              : safeType === 'pras'
              ? '#263238'
              : '#1e293b'
          }
          stroke="#0f172a"
          strokeWidth="3"
        />

        {safeType === 'ikhsan' && (
          <g stroke="#9a3412" strokeWidth="1.5" opacity="0.55">
            <line x1="92" y1="115" x2="108" y2="135" />
            <line x1="108" y1="115" x2="92" y2="135" />
            <line x1="92" y1="145" x2="108" y2="165" />
            <line x1="108" y1="145" x2="92" y2="165" />
            <line x1="92" y1="175" x2="108" y2="195" />
          </g>
        )}

        {(safeType === 'rafie' || safeType === 'pras') && (
          <g>
            <polygon
              points="86,106 100,124 94,130 80,112"
              fill={safeType === 'rafie' ? '#ffffff' : '#1e293b'}
              stroke="#0f172a"
              strokeWidth="2.5"
            />
            <polygon
              points="114,106 100,124 106,130 120,112"
              fill={safeType === 'rafie' ? '#ffffff' : '#1e293b'}
              stroke="#0f172a"
              strokeWidth="2.5"
            />
          </g>
        )}

        <path
          d={\`M \${bodyX} 112 Q \${bodyX + 10} 104 \${bodyX + 26} 108 L \${bodyX + 28} 214 L \${bodyX - 2} 214 Z\`}
          fill="#7ec8f8"
          stroke="#0f172a"
          strokeWidth="3"
        />
        <path
          d={\`M \${bodyX + bodyWidth} 112 Q \${bodyX + bodyWidth - 10} 104 \${bodyX + bodyWidth - 26} 108 L \${bodyX + bodyWidth - 28} 214 L \${bodyX + bodyWidth + 2} 214 Z\`}
          fill="#7ec8f8"
          stroke="#0f172a"
          strokeWidth="3"
        />
        <polygon points={\`\${bodyX + 14},108 \${bodyX + 28},108 \${bodyX + 28},158 \${bodyX + 10},138\`} fill="#60b5f2" stroke="#0f172a" strokeWidth="2.5" />
        <polygon points={\`\${bodyX + bodyWidth - 14},108 \${bodyX + bodyWidth - 28},108 \${bodyX + bodyWidth - 28},158 \${bodyX + bodyWidth - 10},138\`} fill="#60b5f2" stroke="#0f172a" strokeWidth="2.5" />

        <g transform={\`rotate(\${armWave}, \${bodyX}, 125)\`}>
          <path
            d={\`M \${bodyX + 2} 115 L \${bodyX - 18} 165 L \${bodyX + 14} 172 L \${bodyX + 14} 135\`}
            fill="#7ec8f8"
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx={bodyX + 18} cy="170" r="8" fill={skinColor} stroke="#0f172a" strokeWidth="2.5" />
        </g>

        <g transform={\`rotate(\${-armWave * 1.2}, \${bodyX + bodyWidth}, 125)\`}>
          <path
            d={\`M \${bodyX + bodyWidth - 2} 115 L \${bodyX + bodyWidth + 26} 152 L \${bodyX + bodyWidth + 16} 168 L \${bodyX + bodyWidth - 10} 140\`}
            fill="#7ec8f8"
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx={bodyX + bodyWidth + 24} cy="154" r="8" fill={skinColor} stroke="#0f172a" strokeWidth="2.5" />

          {safeType === 'rafie' && (
            <rect
              x="82"
              y="148"
              width="34"
              height="42"
              rx="4"
              transform="rotate(10 98 168)"
              fill="#64748b"
              stroke="#0f172a"
              strokeWidth="2.5"
            />
          )}

          {safeType === 'ikhsan' && (
            <line
              x1={bodyX + bodyWidth + 24}
              y1="154"
              x2={bodyX + bodyWidth + 46}
              y2="132"
              stroke="#1e293b"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          )}
        </g>

        <rect x="91" y="92" width="18" height="20" rx="4" fill={skinColor} stroke="#0f172a" strokeWidth="2.5" />
        <ellipse
          cx="100"
          cy="64"
          rx={safeType === 'dimas' ? 31 : 28}
          ry="32"
          fill={skinColor}
          stroke="#0f172a"
          strokeWidth="3"
        />

        <circle cx={100 - (safeType === 'dimas' ? 31 : 28)} cy="66" r="6" fill={skinColor} stroke="#0f172a" strokeWidth="2.5" />
        <circle cx={100 + (safeType === 'dimas' ? 31 : 28)} cy="66" r="6" fill={skinColor} stroke="#0f172a" strokeWidth="2.5" />

        <path d="M 82 52 Q 88 49 94 52" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 106 52 Q 112 49 118 52" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="88" cy="60" r="3" fill="#0f172a" />
        <circle cx="112" cy="60" r="3" fill="#0f172a" />

        {(safeType === 'ikhsan' || safeType === 'rafie') && (
          <g stroke="#1e293b" strokeWidth="2.3" fill="rgba(255,255,255,0.18)">
            <circle cx="88" cy="60" r="8.5" />
            <circle cx="112" cy="60" r="8.5" />
            <line x1="96.5" y1="60" x2="103.5" y2="60" />
          </g>
        )}

        <path d="M 100 62 L 98 70 L 102 70" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="100" cy="79" rx="7" ry={mouthOpen} fill="#991b1b" stroke="#0f172a" strokeWidth="2" />

        {safeType === 'ikhsan' && (
          <path
            d="M 68 58 Q 66 26 100 25 Q 134 26 132 58 Q 120 46 112 54 Q 102 44 96 54 Q 84 45 68 58 Z"
            fill="#1e293b"
            stroke="#0f172a"
            strokeWidth="3"
          />
        )}
        {safeType === 'rafie' && (
          <path
            d="M 70 56 Q 68 24 100 26 Q 132 24 130 56 Q 116 38 100 46 Q 84 38 70 56 Z"
            fill="#1c1917"
            stroke="#0f172a"
            strokeWidth="3"
          />
        )}
        {safeType === 'pras' && (
          <path
            d="M 70 56 Q 65 32 82 28 Q 95 18 110 26 Q 128 24 130 56 Q 116 40 98 42 Q 82 40 70 56 Z"
            fill="#18181b"
            stroke="#0f172a"
            strokeWidth="3"
          />
        )}
        {safeType === 'dimas' && (
          <path
            d="M 69 54 Q 70 27 100 27 Q 130 27 131 54 Q 115 38 100 38 Q 85 38 69 54 Z"
            fill="#27272a"
            stroke="#0f172a"
            strokeWidth="3"
          />
        )}
      </svg>
    </div>
  );
};
`,

  // ==========================================================================
  // 3. PAPAN TULIS 2 KOLOM PERSIS PREVIEW (RUMUS KIRI + GRAFIK KANAN)
  // ==========================================================================
  'src/components/ChalkboardVisualizer.tsx': `import React from 'react';
import { SceneItem, CHARACTERS_INFO } from '../data/scenesData';

export const ChalkboardVisualizer: React.FC<{
  scene: SceneItem;
  activeStepIndex: number;
  stepProgress: number;
}> = ({ scene, activeStepIndex, stepProgress }) => {
  const currentStep = scene.steps[activeStepIndex] || scene.steps[0];
  const isTransitioning = stepProgress < 0.15;

  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '14px 20px',
        color: '#f1f5f9',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Efek Kapur Halus */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.12,
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 55%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 50%)'
        }}
      />

      {/* HEADER PAPAN TULIS */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          borderBottom: '1px solid rgba(167, 243, 208, 0.25)',
          paddingBottom: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                padding: '2px 8px',
                fontSize: 10,
                fontWeight: 800,
                textTransform: 'uppercase',
                borderRadius: 4,
                backgroundColor: 'rgba(251, 191, 36, 0.2)',
                color: '#fcd34d',
                border: '1px solid rgba(252, 211, 77, 0.4)'
              }}
            >
              {scene.code} • {scene.partName}
            </span>
            <span
              style={{
                padding: '2px 8px',
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 4,
                backgroundColor: 'rgba(2, 44, 34, 0.85)',
                color: '#6ee7b7',
                border: '1px solid rgba(16, 185, 129, 0.35)'
              }}
            >
              Langkah {activeStepIndex + 1} / {scene.steps.length}
            </span>
          </div>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: '0.02em',
              color: '#ffffff',
              margin: '4px 0 2px 0'
            }}
          >
            {scene.boardTitle}
          </h2>
          <p style={{ fontSize: 11, color: 'rgba(167, 243, 208, 0.85)', margin: 0 }}>
            {scene.boardSubtitle}
          </p>
        </div>

        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 800,
              backgroundColor: isTransitioning ? 'rgba(251, 191, 36, 0.25)' : 'rgba(2, 44, 34, 0.9)',
              color: isTransitioning ? '#fde68a' : '#a7f3d0',
              border: isTransitioning
                ? '1px solid rgba(252, 211, 77, 0.5)'
                : '1px solid rgba(52, 211, 153, 0.4)'
            }}
          >
            {isTransitioning ? '✨ ANIMASI TRANSISI RUMUS' : '🔒 HOLD FRAME (STATIC VO SYNC)'}
          </span>
        </div>
      </div>

      {/* ISI TENGAH PAPAN TULIS: 2 KOLOM (KIRI RUMUS & LANGKAH, KANAN DIAGRAM) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '5fr 5fr',
          gap: 14,
          margin: '10px 0',
          alignItems: 'center'
        }}
      >
        {/* KOLOM KIRI: KOTAK RUMUS KAPUR + 3 DAFTAR LANGKAH */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              backgroundColor: 'rgba(2, 44, 34, 0.68)',
              border: '2px solid rgba(110, 231, 183, 0.3)',
              opacity: Math.min(1, stepProgress * 8 + 0.25),
              transform: \`translateY(\${Math.max(0, (1 - stepProgress * 6) * 8)}px)\`
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 6
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#fcd34d'
                }}
              >
                {currentStep.label}
              </span>
              <span
                style={{
                  padding: '2px 6px',
                  fontSize: 9,
                  fontWeight: 700,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  color: '#d1fae5'
                }}
              >
                {currentStep.badge}
              </span>
            </div>

            <div
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                backgroundColor: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.18)',
                fontFamily: 'Fira Code, Consolas, monospace',
                fontSize: 13.5,
                fontWeight: 800,
                color: '#fde68a',
                lineHeight: 1.45
              }}
            >
              {currentStep.eq}
            </div>

            <p
              style={{
                marginTop: 8,
                marginBottom: 0,
                fontSize: 11.5,
                color: '#ecfdf5',
                lineHeight: 1.45
              }}
            >
              {currentStep.desc}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {scene.steps.map((st, idx) => {
              const isCurrent = idx === activeStepIndex;
              const isDone = idx < activeStepIndex;
              return (
                <div
                  key={idx}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 8,
                    fontSize: 11,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: isCurrent
                      ? 'rgba(251, 191, 36, 0.22)'
                      : isDone
                      ? 'rgba(6, 78, 59, 0.45)'
                      : 'rgba(0,0,0,0.22)',
                    border: isCurrent
                      ? '1px solid rgba(252, 211, 77, 0.65)'
                      : isDone
                      ? '1px solid rgba(16, 185, 129, 0.35)'
                      : '1px solid rgba(255,255,255,0.1)',
                    color: isCurrent ? '#ffffff' : isDone ? '#a7f3d0' : 'rgba(203,213,225,0.65)',
                    fontWeight: isCurrent ? 800 : 500
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 999,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 9,
                        fontWeight: 900,
                        backgroundColor: isCurrent
                          ? '#fbbf24'
                          : isDone
                          ? '#10b981'
                          : 'rgba(255,255,255,0.12)',
                        color: isCurrent || isDone ? '#020617' : '#ffffff'
                      }}
                    >
                      {isDone ? '✓' : idx + 1}
                    </span>
                    <span>{st.label}</span>
                  </div>
                  <span style={{ fontSize: 9.5, opacity: 0.8 }}>{st.badge}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* KOLOM KANAN: GARIS BILANGAN / KARTESIUS / TABEL UJI TANDA */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {scene.visualType === 'number-line' && scene.numberLineConfig && (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(2, 6, 23, 0.72)',
                border: '1px solid rgba(52, 211, 153, 0.35)'
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#6ee7b7',
                  marginBottom: 6,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>VISUALISASI GARIS BILANGAN & UJI TANDA</span>
                <span style={{ fontSize: 10, color: '#fcd34d' }}>○ Terbuka | ● Tertutup</span>
              </div>
              <svg viewBox="0 0 420 120" style={{ width: '100%', height: 112, overflow: 'visible' }}>
                {scene.numberLineConfig.shades.map((sh, i) => {
                  const mapX = (val: number) => 210 + val * 28;
                  const x1 = Math.max(25, Math.min(395, mapX(sh.from)));
                  const x2 = Math.max(25, Math.min(395, mapX(sh.to)));
                  const width = Math.max(10, x2 - x1);
                  return (
                    <g key={i}>
                      <rect
                        x={x1}
                        y="32"
                        width={width}
                        height="34"
                        rx="4"
                        fill="rgba(16, 185, 129, 0.28)"
                        stroke="#34d399"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <text
                        x={x1 + width / 2}
                        y="24"
                        textAnchor="middle"
                        fill="#6ee7b7"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {sh.label}
                      </text>
                    </g>
                  );
                })}

                <line x1="20" y1="66" x2="400" y2="66" stroke="#f8fafc" strokeWidth="3" />
                <polygon points="15,66 26,60 26,72" fill="#f8fafc" />
                <polygon points="405,66 394,60 394,72" fill="#f8fafc" />

                {scene.numberLineConfig.signs.map((sg, idx) => {
                  const cx = 210 + sg.x * 28;
                  const isPos = sg.sign === '+';
                  return (
                    <g key={idx} transform={\`translate(\${cx}, 46)\`}>
                      <circle
                        cx="0"
                        cy="0"
                        r="11"
                        fill={isPos ? 'rgba(16,185,129,0.25)' : 'rgba(244,63,94,0.25)'}
                        stroke={isPos ? '#34d399' : '#fb7185'}
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill={isPos ? '#6ee7b7' : '#fda4af'}
                        fontSize="13"
                        fontWeight="900"
                      >
                        {sg.sign}
                      </text>
                    </g>
                  );
                })}

                {scene.numberLineConfig.points.map((pt, idx) => {
                  const cx = 210 + pt.val * 28;
                  return (
                    <g key={idx} transform={\`translate(\${cx}, 66)\`}>
                      <circle
                        cx="0"
                        cy="0"
                        r="7"
                        fill={pt.filled ? '#fbbf24' : '#064e3b'}
                        stroke="#fbbf24"
                        strokeWidth="3"
                      />
                      <text
                        x="0"
                        y="25"
                        textAnchor="middle"
                        fill="#fde68a"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        {pt.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 10.5,
                  textAlign: 'center',
                  color: '#a7f3d0',
                  fontWeight: 700,
                  backgroundColor: 'rgba(2, 44, 34, 0.85)',
                  padding: '4px 8px',
                  borderRadius: 6,
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                {scene.numberLineConfig.caption}
              </div>
            </div>
          )}

          {scene.visualType === 'cartesian-pldv' && scene.cartesianConfig && (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(2, 6, 23, 0.72)',
                border: '1px solid rgba(52, 211, 153, 0.35)'
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#6ee7b7',
                  marginBottom: 6,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>BIDANG KARTESIUS 2D (DAERAH HIMPUNAN PENYELESAIAN)</span>
                <span style={{ color: '#fcd34d', fontSize: 10 }}>{scene.cartesianConfig.equation}</span>
              </div>
              <svg
                viewBox="0 0 360 175"
                style={{
                  width: '100%',
                  height: 140,
                  backgroundColor: 'rgba(15, 23, 42, 0.92)',
                  borderRadius: 8,
                  border: '1px solid #334155'
                }}
              >
                <g stroke="#1e293b" strokeWidth="1">
                  <line x1="0" y1="35" x2="360" y2="35" />
                  <line x1="0" y1="70" x2="360" y2="70" />
                  <line x1="0" y1="105" x2="360" y2="105" />
                  <line x1="0" y1="140" x2="360" y2="140" />
                  <line x1="70" y1="0" x2="70" y2="175" />
                  <line x1="140" y1="0" x2="140" y2="175" />
                  <line x1="210" y1="0" x2="210" y2="175" />
                  <line x1="280" y1="0" x2="280" y2="175" />
                </g>
                <line x1="20" y1="105" x2="340" y2="105" stroke="#94a3b8" strokeWidth="2" />
                <line x1="140" y1="12" x2="140" y2="165" stroke="#94a3b8" strokeWidth="2" />
                <text x="332" y="98" fill="#cbd5e1" fontSize="10" fontWeight="bold">X</text>
                <text x="146" y="22" fill="#cbd5e1" fontSize="10" fontWeight="bold">Y</text>

                {scene.cartesianConfig.mode === 'case1' ? (
                  <>
                    <polygon points="90,35 280,122 90,155" fill="rgba(56, 189, 248, 0.25)" />
                    <line x1="90" y1="35" x2="280" y2="122" stroke="#38bdf8" strokeWidth="3.5" />
                    <circle cx="140" cy="58" r="4.5" fill="#fbbf24" />
                    <text x="148" y="56" fill="#fde68a" fontSize="10" fontWeight="bold">(0,2)</text>
                    <circle cx="245" cy="105" r="4.5" fill="#fbbf24" />
                    <text x="235" y="122" fill="#fde68a" fontSize="10" fontWeight="bold">(5,0)</text>
                    <circle cx="140" cy="105" r="5" fill="#10b981" />
                    <text x="82" y="120" fill="#6ee7b7" fontSize="10" fontWeight="bold">Uji (0,0) ✅ DHP</text>
                  </>
                ) : (
                  <>
                    <polygon points="140,152 245,45 330,45 330,152" fill="rgba(244, 63, 94, 0.25)" />
                    <line x1="140" y1="152" x2="245" y2="45" stroke="#fb7185" strokeWidth="3.5" strokeDasharray="7 5" />
                    <circle cx="140" cy="152" r="4.5" fill="#fbbf24" />
                    <text x="102" y="156" fill="#fde68a" fontSize="10" fontWeight="bold">(0,−4)</text>
                    <circle cx="205" cy="105" r="4.5" fill="#fbbf24" />
                    <text x="195" y="96" fill="#fde68a" fontSize="10" fontWeight="bold">(3,0)</text>
                    <circle cx="140" cy="105" r="4.5" fill="#f43f5e" />
                    <text x="75" y="96" fill="#fda4af" fontSize="10" fontWeight="bold">Uji (0,0) ❌</text>
                    <text x="245" y="132" fill="#fda4af" fontSize="11" fontWeight="bold">DHP (Arsir)</text>
                  </>
                )}
              </svg>
              <div style={{ marginTop: 6, fontSize: 10.5, textAlign: 'center', color: '#fde68a', fontWeight: 700 }}>
                {scene.cartesianConfig.testText}
              </div>
            </div>
          )}

          {scene.visualType === 'sign-table' && (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(2, 6, 23, 0.72)',
                border: '1px solid rgba(52, 211, 153, 0.35)'
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#6ee7b7',
                  marginBottom: 8,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>TABEL UJI TANDA PECAHAN RASIONAL f(x)/g(x)</span>
                <span style={{ fontSize: 10, color: '#fda4af', fontWeight: 900 }}>Syarat Mutlak: g(x) ≠ 0</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(6, 78, 59, 0.85)', color: '#d1fae5', textAlign: 'left' }}>
                    <th style={{ padding: 7 }}>Pembilang f(x)</th>
                    <th style={{ padding: 7 }}>Penyebut g(x)</th>
                    <th style={{ padding: 7 }}>Hasil f(x)/g(x)</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'rgba(0,0,0,0.35)', fontWeight: 700 }}>
                  <tr>
                    <td style={{ padding: 6, color: '#6ee7b7' }}>Positif (+)</td>
                    <td style={{ padding: 6, color: '#6ee7b7' }}>Positif (+)</td>
                    <td style={{ padding: 6, color: '#34d399', fontWeight: 900 }}>Positif (+)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 6, color: '#fda4af' }}>Negatif (−)</td>
                    <td style={{ padding: 6, color: '#fda4af' }}>Negatif (−)</td>
                    <td style={{ padding: 6, color: '#34d399', fontWeight: 900 }}>Positif (+)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 6, color: '#6ee7b7' }}>Positif (+)</td>
                    <td style={{ padding: 6, color: '#fda4af' }}>Negatif (−)</td>
                    <td style={{ padding: 6, color: '#fb7185', fontWeight: 900 }}>Negatif (−)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 6, color: '#fda4af' }}>Negatif (−)</td>
                    <td style={{ padding: 6, color: '#6ee7b7' }}>Positif (+)</td>
                    <td style={{ padding: 6, color: '#fb7185', fontWeight: 900 }}>Negatif (−)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {scene.visualType === 'mutlak-table' && (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(2, 6, 23, 0.72)',
                border: '1px solid rgba(52, 211, 153, 0.35)'
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#fcd34d',
                  marginBottom: 8,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>TABEL RUMUS ACUAN CEPAT NILAI MUTLAK (Syarat: a ≥ 0)</span>
                <span style={{ fontSize: 10, color: '#6ee7b7' }}>Prinsip Jarak ≥ 0</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(6, 78, 59, 0.85)', color: '#ffffff', textAlign: 'left' }}>
                    <th style={{ padding: 6 }}>Bentuk Soal</th>
                    <th style={{ padding: 6 }}>Sifat Aljabar</th>
                    <th style={{ padding: 6 }}>Visualisasi Grafik</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'rgba(0,0,0,0.35)', fontWeight: 600 }}>
                  <tr>
                    <td style={{ padding: 6, color: '#fcd34d', fontFamily: 'monospace' }}>|f(x)| &lt; a</td>
                    <td style={{ padding: 6, color: '#a7f3d0', fontFamily: 'monospace' }}>−a &lt; f(x) &lt; a</td>
                    <td style={{ padding: 6, color: '#e2e8f0' }}>Mengumpul di tengah (Terbuka)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 6, color: '#fcd34d', fontFamily: 'monospace' }}>|f(x)| ≤ a</td>
                    <td style={{ padding: 6, color: '#a7f3d0', fontFamily: 'monospace' }}>−a ≤ f(x) ≤ a</td>
                    <td style={{ padding: 6, color: '#e2e8f0' }}>Mengumpul di tengah (Tertutup)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 6, color: '#fcd34d', fontFamily: 'monospace' }}>|f(x)| &gt; a</td>
                    <td style={{ padding: 6, color: '#a7f3d0', fontFamily: 'monospace' }}>f(x) &lt; −a ∪ f(x) &gt; a</td>
                    <td style={{ padding: 6, color: '#e2e8f0' }}>Memencar kiri & kanan (Terbuka)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 6, color: '#fcd34d', fontFamily: 'monospace' }}>|f(x)| ≥ a</td>
                    <td style={{ padding: 6, color: '#a7f3d0', fontFamily: 'monospace' }}>f(x) ≤ −a ∪ f(x) ≥ a</td>
                    <td style={{ padding: 6, color: '#e2e8f0' }}>Memencar kiri & kanan (Tertutup)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {(scene.visualType === 'intro-school' ||
            scene.visualType === 'concept-box' ||
            scene.visualType === 'summary-master') && (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(2, 6, 23, 0.72)',
                border: '1px solid rgba(52, 211, 153, 0.35)'
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 900, color: '#fcd34d', marginBottom: 8 }}>
                MATRIKS 4 CABANG UTAMA PERTIDAKSAMAAN (60 MENIT)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11 }}>
                <div style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(2,44,34,0.75)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <div style={{ fontWeight: 900, color: '#93c5fd' }}>1. Linear (Rafie)</div>
                  <div style={{ fontSize: 10.5, color: '#e2e8f0', marginTop: 2 }}>
                    PLSV Garis Bilangan & PLDV Uji Titik (0,0). Kali/bagi negatif balik tanda!
                  </div>
                </div>
                <div style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(2,44,34,0.75)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <div style={{ fontWeight: 900, color: '#6ee7b7' }}>2. Rasional (Ikhsan)</div>
                  <div style={{ fontSize: 10.5, color: '#e2e8f0', marginTop: 2 }}>
                    Pecahan f(x)/g(x) dengan syarat mutlak penyebut g(x) ≠ 0 & dilarang kali silang.
                  </div>
                </div>
                <div style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(2,44,34,0.75)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <div style={{ fontWeight: 900, color: '#fcd34d' }}>3. Irasional (Pras)</div>
                  <div style={{ fontSize: 10.5, color: '#e2e8f0', marginTop: 2 }}>
                    Bentuk akar √f(x) wajib memenuhi Syarat Numerus f(x) ≥ 0 & irisan (∩) solusi.
                  </div>
                </div>
                <div style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(2,44,34,0.75)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <div style={{ fontWeight: 900, color: '#f9a8d4' }}>4. Nilai Mutlak (Dimas)</div>
                  <div style={{ fontSize: 10.5, color: '#e2e8f0', marginTop: 2 }}>
                    Konsep jarak |x| ≥ 0: tanda &lt; mengumpul di tengah, tanda &gt; memencar kiri-kanan.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER PAPAN TULIS */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: 6,
          borderTop: '1px solid rgba(167, 243, 208, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 10.5,
          color: 'rgba(167, 243, 208, 0.9)'
        }}
      >
        <span>
          Rentang Waktu Segmen: <strong>Menit {scene.startMin.toFixed(1)} – {scene.endMin.toFixed(1)}</strong>
        </span>
        <span style={{ fontFamily: 'monospace' }}>
          Pemateri Aktif:{' '}
          <strong style={{ color: '#fcd34d', textTransform: 'uppercase' }}>
            {scene.presenter === 'all'
              ? 'SELURUH TIM (4 PEMATERI)'
              : CHARACTERS_INFO[scene.presenter]?.fullName}
          </strong>
        </span>
      </div>
    </div>
  );
};
`,

  // ==========================================================================
  // 4. CLASSROOM STAGE 1920x1080 (DENGAN AUTO-SCALE 2X AGAR 100% PRESISI)
  // ==========================================================================
  'src/components/ClassroomStage.tsx': `import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneItem, CHARACTERS_INFO } from '../data/scenesData';
import { ChalkboardVisualizer } from './ChalkboardVisualizer';
import { TeacherCharacter } from './TeacherCharacter';

export const ClassroomStage: React.FC<{ scene: SceneItem }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const sceneProgress = Math.min(0.999, frame / Math.max(1, durationInFrames));
  const activeStepIndex = Math.min(
    scene.steps.length - 1,
    Math.floor(sceneProgress * scene.steps.length)
  );
  const stepSpan = 1 / scene.steps.length;
  const stepProgress = (sceneProgress - activeStepIndex * stepSpan) / stepSpan;

  return (
    <AbsoluteFill style={{ backgroundColor: '#020617', overflow: 'hidden' }}>
      {/* KANVAS LOGIS 960x540 DI-SCALE TEPAT 2X MENJADI 1920x1080 FULL HD */}
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
            height: 36,
            backgroundColor: '#d5c7a3',
            borderBottom: '4px solid #8c6239',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 48px',
            zIndex: 10
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 140,
                height: 12,
                backgroundColor: '#fef9c3',
                border: '2px solid #78716c',
                borderRadius: 2,
                boxShadow: '0 0 15px rgba(254,249,195,0.85)'
              }}
            />
          ))}
        </div>

        {/* 2. DINDING RUANG KELAS HIJAU ALAM (NATURE GREEN) */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            background: 'linear-gradient(180deg, #7cb07a 0%, #6ea36c 100%)',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 24px',
            overflow: 'hidden'
          }}
        >
          {/* Jendela Kiri & Cahaya Matahari Pagi */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 10,
              bottom: 36,
              width: 48,
              backgroundColor: '#fef3c7',
              borderRight: '4px solid #8c6239',
              borderTop: '4px solid #8c6239',
              borderBottom: '4px solid #8c6239'
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
              background: 'linear-gradient(115deg, rgba(254,249,195,0.85) 0%, transparent 70%)'
            }}
          />

          {/* Tanaman Hias di Sudut Kiri Bawah */}
          <div
            style={{
              position: 'absolute',
              left: 10,
              bottom: 6,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: 44,
                height: 58,
                borderRadius: 999,
                backgroundColor: '#047857',
                border: '2px solid #0f172a',
                marginBottom: -10
              }}
            />
            <div
              style={{
                width: 36,
                height: 36,
                backgroundColor: '#b45309',
                border: '2px solid #0f172a',
                borderRadius: '0 0 8px 8px'
              }}
            />
          </div>

          {/* Pintu Kayu Kanan */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 14,
              bottom: 0,
              width: 48,
              backgroundColor: '#9a5b25',
              borderLeft: '4px solid #5c3412',
              borderTop: '4px solid #5c3412'
            }}
          />

          {/* PAPAN TULIS KAYU COKELAT TUA (82% LEBAR PANGGUNG) */}
          <div
            style={{
              position: 'relative',
              height: '100%',
              width: scene.presenter === 'all' ? '88%' : '81%',
              marginLeft: 18,
              borderRadius: 12,
              backgroundColor: '#1e4631',
              border: '9px solid #7c4d2b',
              boxShadow: '0 20px 40px rgba(0,0,0,0.45)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <ChalkboardVisualizer
              scene={scene}
              activeStepIndex={activeStepIndex}
              stepProgress={stepProgress}
            />

            <div
              style={{
                height: 9,
                backgroundColor: '#5c371c',
                borderTop: '1px solid #9a653c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 32
              }}
            >
              <div style={{ width: 32, height: 4, backgroundColor: '#ffffff', borderRadius: 999 }} />
              <div style={{ width: 24, height: 5, backgroundColor: '#fde68a', borderRadius: 2 }} />
              <div style={{ width: 40, height: 6, backgroundColor: '#1e293b', borderRadius: 2 }} />
            </div>
          </div>

          {/* KARAKTER PEMATERI MENAPAK DI LANTAI (TIDAK MENGAMBANG) */}
          {scene.presenter === 'all' ? (
            <div
              style={{
                position: 'absolute',
                left: 16,
                right: 16,
                top: 24,
                bottom: 0,
                zIndex: 20,
                backgroundColor: 'rgba(2, 6, 23, 0.55)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                padding: '0 24px 4px 24px'
              }}
            >
              {(['ikhsan', 'rafie', 'pras', 'dimas'] as const).map((charId) => (
                <div
                  key={charId}
                  style={{
                    height: '90%',
                    width: 170,
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
                right: 10,
                bottom: 0,
                height: '88%',
                width: 175,
                zIndex: 20,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center'
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
        </div>

        {/* 3. LANTAI KELAS & SUBTITLE VOICE OVER BAR */}
        <div
          style={{
            position: 'relative',
            zIndex: 30,
            backgroundColor: 'rgba(2, 6, 23, 0.96)',
            borderTop: '3px solid #7c4d2b',
            padding: '8px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 900,
                textTransform: 'uppercase',
                backgroundColor: '#10b981',
                color: '#020617',
                flexShrink: 0
              }}
            >
              VO • {scene.presenter === 'all' ? 'TIM KELOMPOK' : CHARACTERS_INFO[scene.presenter]?.name}
            </span>
            <p
              style={{
                fontSize: 12.5,
                color: '#d1fae5',
                fontWeight: 600,
                margin: 0,
                lineHeight: 1.35
              }}
            >
              “{scene.voScript}”
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            {scene.steps.map((_, idx) => (
              <span
                key={idx}
                style={{
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontSize: 10.5,
                  fontWeight: 800,
                  backgroundColor: idx === activeStepIndex ? '#fbbf24' : '#1e293b',
                  color: idx === activeStepIndex ? '#020617' : '#cbd5e1'
                }}
              >
                Step {idx + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
`,

  // ==========================================================================
  // 5. GENERIC SCENE, FULL VIDEO SERIES, & ROOT.TSX
  // ==========================================================================
  'src/scenes/GenericScene.tsx': `import React from 'react';
import { SCENES_DATA } from '../data/scenesData';
import { ClassroomStage } from '../components/ClassroomStage';

export const GenericScene: React.FC<{ sceneId: string }> = ({ sceneId }) => {
  const scene = SCENES_DATA.find((s) => s.id === sceneId) || SCENES_DATA[0];
  return <ClassroomStage scene={scene} />;
};
`,

  'src/scenes/FullVideo.tsx': `import React from 'react';
import { Series } from 'remotion';
import { SCENES_DATA, FPS } from '../data/scenesData';
import { ClassroomStage } from '../components/ClassroomStage';

export const PartSequence: React.FC<{ partNumber?: number }> = ({ partNumber }) => {
  const scenes = partNumber
    ? SCENES_DATA.filter((s) => s.part === partNumber)
    : SCENES_DATA;

  return (
    <Series>
      {scenes.map((sc) => {
        const durationInFrames = Math.round((sc.endMin - sc.startMin) * 60 * FPS);
        return (
          <Series.Sequence key={sc.id} durationInFrames={durationInFrames}>
            <ClassroomStage scene={sc} />
          </Series.Sequence>
        );
      })}
    </Series>
  );
};

export const FullVideo: React.FC = () => <PartSequence />;
export const Part1Linear: React.FC = () => <PartSequence partNumber={1} />;
export const Part2Rasional: React.FC = () => <PartSequence partNumber={2} />;
export const Part3Irasional: React.FC = () => <PartSequence partNumber={3} />;
export const Part4Mutlak: React.FC = () => <PartSequence partNumber={4} />;
`,

  'src/Root.tsx': `import React from 'react';
import { Composition, Folder } from 'remotion';
import { SCENES_DATA, FPS, TOTAL_FRAMES } from './data/scenesData';
import { ClassroomStage } from './components/ClassroomStage';
import {
  FullVideo,
  Part1Linear,
  Part2Rasional,
  Part3Irasional,
  Part4Mutlak
} from './scenes/FullVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="1-Render-Per-Scene">
        {SCENES_DATA.map((sc) => {
          const durationInFrames = Math.round((sc.endMin - sc.startMin) * 60 * FPS);
          return (
            <Composition
              key={sc.compId}
              id={sc.compId}
              component={() => <ClassroomStage scene={sc} />}
              durationInFrames={durationInFrames}
              fps={FPS}
              width={1920}
              height={1080}
            />
          );
        })}
      </Folder>

      <Folder name="2-Render-Per-Part">
        <Composition
          id="Part1-Linear-Rafie"
          component={Part1Linear}
          durationInFrames={16 * 60 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Part2-Rasional-Ikhsan"
          component={Part2Rasional}
          durationInFrames={15 * 60 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Part3-Irasional-Pras"
          component={Part3Irasional}
          durationInFrames={14 * 60 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Part4-Mutlak-Dimas-Closing"
          component={Part4Mutlak}
          durationInFrames={15 * 60 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>

      <Composition
        id="FullVideo"
        component={FullVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
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
    logs.push(`✅ Updated: ${relPath}`);
  }
  return logs.join('\n');
}

// Mode 1: Direct CLI execution (node mcp-pertidaksamaan-server.mjs --apply)
if (process.argv.includes('--apply')) {
  console.log('🚀 Menjalankan 1:1 Exact Visual Rebuild untuk Remotion Pertidaksamaan...');
  console.log(applyExactRebuild());
  console.log('🎉 Selesai! Silakan cek localhost:3000 — tampilan sekarang 100% presisi!');
  process.exit(0);
}

// Mode 2: Standard MCP Server (JSON-RPC 2.0 over stdio) untuk AI Antigravity
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
            serverInfo: { name: 'mcp-pertidaksamaan-remotion', version: '2.0.0' }
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
                  'Menulis ulang seluruh komponen Remotion Pertidaksamaan 60 Menit dengan resolusi 1920x1080 (scale 2x), papan tulis 2 kolom, dan 4 karakter menapak di lantai secara presisi 1:1.',
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

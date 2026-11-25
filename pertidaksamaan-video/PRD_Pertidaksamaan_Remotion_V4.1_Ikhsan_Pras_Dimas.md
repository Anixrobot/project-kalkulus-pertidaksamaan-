# Product Requirements Document (PRD) V4.1
## Proyek Video Edukasi Matematika Remotion: Upgrade Modul Ikhsan (Rasional), Pras (Irasional), & Dimas (Nilai Mutlak)

---

### 1. Ringkasan Eksekutif & Ruang Lingkup
PRD V4.1 memperluas standar arsitektur **V4.1 Data-Driven & Step-by-Step** (yang telah sukses diterapkan dan diverifikasi pada modul **Rafie — Pertidaksamaan Linear**) ke tiga segmen pemateri lainnya:
1. **Segmen 2 — Ikhsan:** Pertidaksamaan Rasional (sumber: `Materi_Pertidaksamaan_Rasional_Lengkap.html` / `.docx`)
2. **Segmen 3 — Pras:** Pertidaksamaan Irasional (sumber: `Pertidaksamaan Irasional.docx`)
3. **Segmen 4 — Dimas:** Pertidaksamaan Nilai Mutlak (sumber: `Pertidksamaan mutlak .html`)

**Aturan Isolasi (Non-Destructive):**
* Seluruh scene milik **Rafie** (`Scene02-HukumFundamental`, `Scene03-KonsepPtLSV`, `Scene04-KonsepPtLDV`, `Scene05A-Soal1-PtLSV` s.d. `Scene05E-Soal5-SistemPtLDV`), `Scene01-Intro`, seluruh **Intro Solo Pemateri** (`Scene02A-IntroRafie`, `Scene06A-IntroIkhsan`, `Scene08A-IntroPras`, `Scene10A-IntroDimas`), dan `Closing` **WAJIB DIPERTAHANKAN** dan tidak boleh rusak.

---

### 2. Spesifikasi Teknis & Standar Anti-Clipping V4.1
Seluruh segmen Ikhsan, Pras, dan Dimas wajib mewarisi standar teknis dari modul Rafie:
* **Framework:** Remotion + React + TypeScript + Tailwind CSS.
* **Resolusi & FPS:** `1920x1080` (16:9), `30 FPS` (teks footer Smartboard wajib tertulis `30 FPS`, dilarang `60 FPS`).
* **Auto-Scaling & Classroom Layer (V3.0 Lock):**
  * Kanvas logika `960x540` di-scale 2x ke `1920x1080` agar ruang kelas tema *Nature Green* dan karakter 2D menapak lantai secara proporsional.
  * **Tanpa Bar Script VO Bawah:** Dilarang menampilkan bar teleprompter/subtitle hitam di bagian bawah layar.
  * **Lebar Smartboard:** Dikunci pada `78%` lebar layar agar tidak menabrak karakter pemateri di sisi kanan.
* **Smartboard Theme (Dark Mode Slate):**
  * Background Board: `#0f172a` (`slate-900`)
  * Panel / Kartu Langkah: `#1e293b` (`slate-800`), Border: `#334155` (`slate-700`)
  * Teks Utama / Sekunder: `#f8fafc` (`slate-50`) / `#cbd5e1` (`slate-300`)
  * Aksen Biru (Konsep / Layer 1): `#38bdf8` (`sky-400`)
  * Aksen Hijau (Solusi Benar / Irisan / HP): `#10b981` (`emerald-500`)
  * Aksen Merah (Alert / Syarat Penyebut / Kesalahan Umum): `#f43f5e` (`rose-500`)
  * Aksen Kuning (Highlight / Layer 2 / Soal): `#fbbf24` (`amber-400`)
* **Engine Rumus (KaTeX Sinkron):**
  * Wajib menggunakan `<MathFormula />` berbasis `katex.renderToString()`.
  * **Dilarang keras** menggunakan MathJax atau mencampur string LaTeX mentah (`\ge`, `\le`, `\frac`, `\sqrt`) ke dalam teks biasa ber-CSS `uppercase`.
* **Engine Grafik (SVG Murni + Frame-Deterministic):**
  * Seluruh grafik garis bilangan uji tanda, irisan akar, dan jarak nilai mutlak wajib dibuat dengan **SVG murni + React** yang digerakkan oleh `useCurrentFrame()`, `spring()`, dan `interpolate()`.
  * **Dilarang keras** memakai Plotly.js, Chart.js, atau animasi CSS (`@keyframes` / `transition`).
  * Margin kiri-kanan di dalam `viewBox` SVG minimal `40px` agar angka ujung rentang, label titik kritis, dan ujung panah tidak terpotong.
* **Aturan Anti-Clipping Layout (V4.1 Lock):**
  * **Header Kartu Soal:** Badge `SOAL X` dan judul soal wajib pakai `flex items-center gap-3` (dilarang `position: absolute`).
  * **Kartu Langkah Aljabar (`StepStepperList.tsx`):**
    * Gunakan layout 1 baris rumus penuh (`white-space: nowrap`) di atas + caption penjelasan singkat di bawahnya.
    * Tinggi area tampil dikunci untuk **maksimal 3 kartu aktif bersamaan** (`180px` = `56px × 3 + gap 6px × 2`) dengan *sliding window* `translateY` (`62px` per step) dalam kontainer `overflow: hidden`.
    * Langkah yang sedang aktif disorot terang (`opacity: 1` + border aksen), langkah sebelumnya meredup (`opacity: 0.55`).
  * **Badge Himpunan Penyelesaian (HP) & Interval:** Gunakan `flex-wrap` atau tumpuk 2 baris rapi dengan padding aman minimal `16px` agar notasi HP tidak terpotong tepi kanan.
* **Aturan Ber-Step (Phase-Based `<Sequence>`):**
  * Semua scene materi konsep wajib dibagi menjadi **2 hingga 3 fase bersih** menggunakan `<Sequence>` (dilarang menumpuk seluruh sub-bab di satu frame).
  * Semua contoh soal wajib dipecah menjadi **1 Contoh Soal = 1 Scene (`Composition` terpisah di `Root.tsx`)** agar ringan dirender satuan dan mudah sinkron dengan audio VO.

---

### 3. Spesifikasi Karakter 2D Pemateri (Almamater Biru Muda Polos Tanpa Logo)
Semua karakter mengenakan jas almamater biru muda polos tanpa logo dan celana abu-abu gelap, berdiri menapak di lantai kelas *Nature Green*:
* **IKHSAN (Segmen 2 — Rasional):** Rambut berponi (*messy bowl cut*), kacamata bulat frame tebal, kemeja bermotif/batik di dalam jas almet, sneakers hitam-putih, memegang spidol/pointer.
* **PRAS (Segmen 3 — Irasional):** Rambut sedikit bergelombang/*spike-messy*, tanpa kacamata, kaos polo warna gelap di dalam jas almet, sneakers cokelat/putih, pose gestur tangan terbuka menjelaskan.
* **DIMAS (Segmen 4 — Nilai Mutlak):** Postur tubuh lebih tegap/bulky, potongan rambut sangat pendek (*buzz cut*), tanpa kacamata, kaos oblong hitam polos di dalam jas almet, sneakers hitam-putih.

---

### 4. Arsitektur Scene Modular Per Pemateri (Ber-Step & 1 Soal = 1 Scene)

#### A. SEGMEN 2: IKHSAN — Pertidaksamaan Rasional
*Data Source of Truth:* `src/data/rasionalData.ts` (diambil 100% dari `Materi_Pertidaksamaan_Rasional_Lengkap.html` / `.docx`).

| Composition ID | Durasi Base (30fps) | Alur Ber-Step (Kolom Kiri: KaTeX/Stepper • Kolom Kanan: Visual SVG) |
| :--- | :--- | :--- |
| `Scene06A-IntroIkhsan` | Pertahankan V3.0 | Intro solo Ikhsan di tengah kelas (*zoom-in*, tanpa papan tulis). |
| `Scene06B-KonsepRasional` | 50 dtk (`1500f`) | **Fase 1 (0–30%):** Pengertian $\frac{f(x)}{g(x)} > 0$, syarat mutlak $g(x) \neq 0$, 4 tanda pertidaksamaan.<br>**Fase 2 (30–65%):** Konsep **Titik Kritis** (pembilang boleh masuk jika $\ge/\le$, penyebut SELALU $\circ$ dikecualikan) + contoh pengantar $\frac{x-2}{x+1} \ge 0 \implies x=2, x=-1$.<br>**Fase 3 (65–100%):** Tabel Uji Tanda ($+/+ = +$, $-/- = +$, $+/- = -$, $-/+ = -$) + 5 Langkah Penyelesaian Umum (muncul berurutan). |
| `Scene07A-Rasional-Soal1` | 35 dtk (`1050f`) | **Contoh 1 (Dasar):** $\frac{x - 2}{x + 1} \ge 0$<br>• Step 1: Titik kritis $x = 2$ (pembilang, $\bullet$) & $x = -1$ (penyebut, $\circ$).<br>• Step 2: Interval $(-\infty, -1)$, $(-1, 2)$, $(2, \infty)$.<br>• Step 3: Uji tanda berturut-turut: `+`, `-`, `+`.<br>• Step 4 [Alert]: Ambil interval positif & $x = 2$; $x = -1$ dikecualikan.<br>• **HP:** $(-\infty, -1) \cup [2, \infty)$.<br>• *SVG Kanan (`SignChart1D`):* Rentang $[-4, 5]$, titik $-1 (\circ)$ dan $2 (\bullet)$, tanda `+ | - | +`, sorot hijau di kiri $-1$ dan kanan $2$. |
| `Scene07B-Rasional-Soal2` | 35 dtk (`1050f`) | **Contoh 2 (Tingkat Menengah):** $\frac{x^2 - 4}{x - 1} < 0$<br>• Step 1: Faktorkan $x^2 - 4 = (x - 2)(x + 2)$.<br>• Step 2: Titik kritis $x = -2, 2$ (pembilang) & $x = 1$ (penyebut).<br>• Step 3: Uji tanda 4 interval: `-`, `+`, `-`, `+`.<br>• Step 4: Ambil interval negatif; semua titik kritis tidak masuk ($\circ$).<br>• **HP:** $(-\infty, -2) \cup (1, 2)$.<br>• *SVG Kanan (`SignChart1D`):* Rentang $[-4, 4]$, titik $-2 (\circ), 1 (\circ), 2 (\circ)$, tanda `- | + | - | +`, sorot $(-\infty, -2)$ dan $(1, 2)$. |
| `Scene07C-Rasional-Soal3` | 35 dtk (`1050f`) | **Contoh 3 (Tanda $\le$):** $\frac{2x + 1}{x - 3} \le 0$<br>• Step 1: Pembilang nol: $2x + 1 = 0 \implies x = -\frac{1}{2}$ ($\bullet$).<br>• Step 2: Penyebut nol: $x - 3 = 0 \implies x = 3$ ($\circ$).<br>• Step 3: Uji tanda: $x < -\frac{1}{2}$ (`+`), $-\frac{1}{2} < x < 3$ (`-`), $x > 3$ (`+`).<br>• Step 4 [Alert]: Ambil interval negatif & $x = -\frac{1}{2}$; $x = 3$ tidak boleh masuk.<br>• **HP:** $[-\frac{1}{2}, 3)$.<br>• *SVG Kanan (`SignChart1D`):* Rentang $[-3, 5]$, titik $-\frac{1}{2} (\bullet)$ & $3 (\circ)$, tanda `+ | - | +`, sorot tengah $[-\frac{1}{2}, 3)$. |
| `Scene07D-Rasional-Soal4` | 35 dtk (`1050f`) | **Contoh 4 (Pembilang Kuadrat):** $\frac{x^2 - 9}{x + 2} \ge 0$<br>• Step 1: Faktorkan $x^2 - 9 = (x - 3)(x + 3)$.<br>• Step 2: Titik kritis $x = -3, 3$ (pembilang, $\bullet$) & $x = -2$ (penyebut, $\circ$).<br>• Step 3: Uji tanda: $x < -3$ (`-`), $-3 < x < -2$ (`+`), $-2 < x < 3$ (`-`), $x > 3$ (`+`).<br>• Step 4: Ambil interval positif serta $x = -3$ dan $x = 3$; $x = -2$ dikecualikan.<br>• **HP:** $[-3, -2) \cup [3, \infty)$.<br>• *SVG Kanan (`SignChart1D`):* Rentang $[-5, 5]$, titik $-3 (\bullet), -2 (\circ), 3 (\bullet)$, tanda `- | + | - | +`, sorot $[-3, -2)$ dan $[3, \infty)$. |
| `Scene07E-Rasional-Soal5` | 40 dtk (`1200f`) | **Contoh 5 (Faktor Sama — Jebakan Coret):** $\frac{x^2 - x - 6}{x^2 - 4} > 0$<br>• Step 1: Faktorkan $\frac{(x - 3)(x + 2)}{(x - 2)(x + 2)} > 0$.<br>• Step 2 [Alert Merah]: Kunci syarat penyebut awal: $x \neq -2$ dan $x \neq 2$.<br>• Step 3 [Alert Merah]: Faktor $(x + 2)$ dicoret untuk uji tanda, **tetapi $x = -2$ tetap lubang ($\circ$)**.<br>• Step 4: Bentuk sederhana $\frac{x - 3}{x - 2} > 0$ positif saat $x < 2$ atau $x > 3$; keluarkan $x = -2$ dari $x < 2$.<br>• **HP:** $(-\infty, -2) \cup (-2, 2) \cup (3, \infty)$.<br>• *SVG Kanan (`SignChart1D`):* Rentang $[-4, 5]$, titik $-2 (\circ \text{ lubang merah}), 2 (\circ), 3 (\circ)$, sorot $(-\infty, -2)$, $(-2, 2)$, dan $(3, \infty)$. |
| `Scene07F-Rasional-KesalahanRingkasan` | 35 dtk (`1050f`) | **Fase 1 (0–60%):** 4 Kartu Alert Merah Kesalahan Umum (penyebut $\neq 0$; titik pembilang hanya masuk saat $\ge/\le$; titik penyebut tetap dikecualikan meski faktor dicoret; larangan kali silang tanpa tahu tanda penyebut).<br>**Fase 2 (60–100%):** Kartu Ringkasan Inti Pertidaksamaan Rasional. |

---

#### B. SEGMEN 3: PRAS — Pertidaksamaan Irasional
*Data Source of Truth:* `src/data/irasionalData.ts` (diambil 100% dari `Pertidaksamaan Irasional.docx`).
*Catatan Ekspansi:* File sumber saat ini berisi 2 contoh soal (`Scene09A` & `Scene09B`). Komponen memakai template generik `IrasionalProblemScene.tsx` sehingga penambahan Soal 3–5 di masa depan hanya perlu menambah objek di `irasionalData.ts`.

| Composition ID | Durasi Base (30fps) | Alur Ber-Step (Kolom Kiri: KaTeX/Stepper • Kolom Kanan: Visual SVG) |
| :--- | :--- | :--- |
| `Scene08A-IntroPras` | Pertahankan V3.0 | Intro solo Pras di tengah kelas (*zoom-in*, tanpa papan tulis). |
| `Scene08B-KonsepIrasional` | 50 dtk (`1500f`) | **Fase 1 (0–30%):** Pengertian Pertidaksamaan Irasional (variabel di dalam tanda akar) + 3 contoh bentuk ($\sqrt{x-3} < 2$, $\sqrt{2x+1} \ge \sqrt{x-4}$, $\sqrt{x^2-4} \le x+2$).<br>**Fase 2 (30–65%):** 2 Prinsip Mutlak (Kartu Alert Merah): (A) Syarat Numerus $f(x) \ge 0$, (B) Hasil akar selalu $\sqrt{f(x)} \ge 0$.<br>**Fase 3 (65–100%):** 3 Langkah Penyelesaian Umum (Syarat Akar $\to$ Kuadratkan Kedua Ruas $\to$ Cari Irisan) + Perbandingan Bentuk I ($\sqrt{f(x)} < c, c>0$) vs Bentuk II ($\sqrt{f(x)} < \sqrt{g(x)}$). |
| `Scene09A-Irasional-Soal1` | 35 dtk (`1050f`) | **Contoh 1 (Bentuk I — Satu Akar):** $\sqrt{2x - 4} < 4$<br>• Step 1 [Alert]: Syarat Akar: $2x - 4 \ge 0 \implies 2x \ge 4 \implies x \ge 2$ (**Daerah I**).<br>• Step 2: Kuadratkan kedua ruas: $(\sqrt{2x - 4})^2 < 4^2 \implies 2x - 4 < 16$.<br>• Step 3: Sederhanakan: $2x < 20 \implies x < 10$ (**Daerah II**).<br>• Step 4: Irisan Daerah I ($x \ge 2$) DAN Daerah II ($x < 10$) $\implies 2 \le x < 10$.<br>• **HP:** $\{x \mid 2 \le x < 10, x \in \mathbb{R}\}$ / $[2, 10)$.<br>• *SVG Kanan (`IntersectionLine1D`):* Rentang $[0, 12]$; Layer 1 biru ($x \ge 2$, $\bullet$ kanan), Layer 2 kuning ($x < 10$, $\circ$ kiri), lalu sorot irisan hijau $[2, 10)$. |
| `Scene09B-Irasional-Soal2` | 40 dtk (`1200f`) | **Contoh 2 (Bentuk II — Dua Akar):** $\sqrt{x - 1} \le \sqrt{2x - 4}$<br>• Step 1 [Alert]: Syarat Akar 1: $x - 1 \ge 0 \implies x \ge 1$ (**Daerah I**).<br>• Step 2 [Alert]: Syarat Akar 2: $2x - 4 \ge 0 \implies x \ge 2$ (**Daerah II**).<br>• Step 3: Kuadratkan kedua ruas: $x - 1 \le 2x - 4 \implies x \ge 3$ (**Daerah III**).<br>• Step 4: Irisan Daerah I, II, dan III $\implies x \ge 3$.<br>• **HP:** $\{x \mid x \ge 3, x \in \mathbb{R}\}$ / $[3, \infty)$.<br>• *SVG Kanan (`IntersectionLine1D`):* Rentang $[0, 6]$; 3 layer bertumpuk ($x \ge 1$, $x \ge 2$, $x \ge 3$, semua $\bullet$ kanan), lalu redupkan area luar dan sorot tajam irisan hijau $[3, \infty)$. |
| `Scene09C-Irasional-Ringkasan` | 25 dtk (`750f`) | Ringkasan visual 3 pilar: Wajib cek Numerus $f(x) \ge 0$, kuadratkan saat kedua ruas non-negatif, dan iriskan seluruh daerah syarat di garis bilangan. |

---

#### C. SEGMEN 4: DIMAS — Pertidaksamaan Nilai Mutlak
*Data Source of Truth:* `src/data/mutlakData.ts` (diambil 100% dari `Pertidksamaan mutlak .html`).
*Catatan Ekspansi:* File sumber saat ini berisi 2 contoh soal (`Scene11A` & `Scene11B`). Komponen memakai template generik `MutlakProblemScene.tsx` sehingga penambahan Soal 3–5 nanti cukup menambah objek di `mutlakData.ts`.

| Composition ID | Durasi Base (30fps) | Alur Ber-Step (Kolom Kiri: KaTeX/Stepper • Kolom Kanan: Visual SVG) |
| :--- | :--- | :--- |
| `Scene10A-IntroDimas` | Pertahankan V3.0 | Intro solo Dimas di tengah kelas (*zoom-in*, tanpa papan tulis). |
| `Scene10B-KonsepMutlak` | 50 dtk (`1500f`) | **Fase 1 (0–30%):** Pengertian Pertidaksamaan Nilai Mutlak (`|...|` dengan $<, \le, >, \ge$, hasil berupa interval) + Konsep Dasar **Jarak** dari titik $0$ (tidak pernah negatif).<br>**Fase 2 (30–65%):** Karakteristik 2 Arah + Visual SVG Jarak dari $0$: Tanda `< / <=` (jarak dekat, mengumpul di tengah antara $-a$ dan $a$) vs Tanda `> / >=` (jarak jauh, memencar keluar ke kiri $-a$ dan kanan $a$).<br>**Fase 3 (65–100%):** 4 Langkah Penyelesaian Umum (Isolasi mutlak $\to$ Ubah ke aljabar linear $\to$ Operasikan $x$ secara adil di semua ruas $\to$ Tulis HP interval). |
| `Scene11A-Mutlak-Soal1` | 35 dtk (`1050f`) | **Contoh 1 (Tanda Kurang Dari `<`):** $|2x - 3| < 7$<br>• Step 1: Ubah ke rentang tengah: $-7 < 2x - 3 < 7$.<br>• Step 2: Tambah $3$ di semua ruas: $-7 + 3 < 2x < 7 + 3 \implies -4 < 2x < 10$.<br>• Step 3: Bagi $2$ di semua ruas: $-2 < x < 5$.<br>• Step 4: Tulis HP = $\{x \mid -2 < x < 5\}$ / $(-2, 5)$.<br>• *SVG Kanan (`AbsoluteDistanceLine1D`):* Rentang $[-4, 7]$, bulatan kosong ($\circ$) di $-2$ & $5$, batang hijau menyatu di tengah $(-2, 5)$. |
| `Scene11B-Mutlak-Soal2` | 35 dtk (`1050f`) | **Contoh 2 (Tanda Lebih Dari Sama Dengan `>=`):** $|3x + 2| \ge 8$<br>• Step 1: Pecah menjadi 2 kondisi (Kiri $\le -8$ ATAU Kanan $\ge 8$).<br>• Step 2 (Kondisi 1 — Kiri): $3x + 2 \le -8 \implies 3x \le -10 \implies x \le -\frac{10}{3}$.<br>• Step 3 (Kondisi 2 — Kanan): $3x + 2 \ge 8 \implies 3x \ge 6 \implies x \ge 2$.<br>• Step 4: Gabungkan HP = $\{x \mid x \le -\frac{10}{3} \text{ atau } x \ge 2\}$ / $(-\infty, -\frac{10}{3}] \cup [2, \infty)$.<br>• *SVG Kanan (`AbsoluteDistanceLine1D`):* Rentang $[-6, 5]$, bulatan penuh ($\bullet$) di $-\frac{10}{3}$ dengan panah ke kiri & bulatan penuh ($\bullet$) di $2$ dengan panah ke kanan. |
| `Scene11C-Mutlak-KesalahanRingkasan` | 40 dtk (`1200f`) | **Fase 1 (0–50%):** 3 Kartu Alert Merah Evaluasi Kesalahan Umum: (1) Konstanta negatif $|x| < -5 \implies$ Himpunan Kosong ($\emptyset$), (2) Tertukar rumus `<` vs `>`, (3) Lupa membalik tanda saat kali/bagi negatif.<br>**Fase 2 (50–100%):** Tabel Rumus Acuan Cepat (syarat $a \ge 0$): $|f(x)| \le a$, $|f(x)| < a$, $|f(x)| \ge a$, $|f(x)| > a$ + tipe grafiknya. |

---

### 5. Struktur Folder Modular V4.1
```text
src/
├── data/
│   ├── mathData.ts                 # Existing (Rafie - JANGAN DIUBAH)
│   ├── rasionalData.ts             # BARU: Data Konsep, 5 Soal, & 4 Kesalahan Umum (Ikhsan)
│   ├── irasionalData.ts            # BARU: Data Konsep, 2+ Soal, & Ringkasan (Pras)
│   └── mutlakData.ts               # BARU: Data Konsep, 2+ Soal, Kesalahan & Tabel Rumus (Dimas)
├── components/
│   ├── classroom/                  # Existing V3.0 (NatureGreenBg, Characters, ScalingWrapper)
│   └── math-v4/                    # Shared Engine V4.1
│       ├── MathFormula.tsx         # Existing (KaTeX sinkron)
│       ├── SmartboardShell.tsx     # Existing (Dark Mode Slate, lebar 78%, 30 FPS)
│       ├── StepStepperList.tsx     # Existing (Sliding window max 3 kartu = 180px)
│       ├── AlertRuleCard.tsx       # Existing (Kartu alert merah)
│       ├── NumberLine1D.tsx        # Existing (PtLSV)
│       ├── CartesianPlane2D.tsx    # Existing (PtLDV)
│       ├── SignChart1D.tsx         # BARU: Garis bilangan uji tanda (+ / -) & lubang faktor (Ikhsan)
│       ├── IntersectionLine1D.tsx  # BARU: Garis bilangan multi-layer & sorotan irisan (Pras)
│       └── AbsoluteDistanceLine1D.tsx # BARU: Garis bilangan jarak tengah vs memencar keluar (Dimas)
├── scenes/
│   ├── linear/                     # Existing V4.1 (Rafie - JANGAN DISENTUH)
│   ├── rasional/                   # BARU (Ikhsan): Konsep, ProblemScene (Soal 1-5), KesalahanRingkasan
│   ├── irasional/                  # BARU (Pras): Konsep, ProblemScene (Soal 1-2+), Ringkasan
│   └── mutlak/                     # BARU (Dimas): Konsep, ProblemScene (Soal 1-2+), KesalahanRingkasan
└── Root.tsx                        # Daftarkan seluruh Composition satuan + Segmen2/3/4-Full + FullVideo
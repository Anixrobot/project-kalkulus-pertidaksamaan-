# Product Requirements Document (PRD) — V2.0 (Clean Rebuild Edition)
**Project:** Video Pembelajaran Matematika — Pertidaksamaan (Full 60 Menit)  
**Workspace Path:** `project kalkulus/pertidaksamaan-video`  
**Target Durasi:** $60\text{ Menit}$ ($3600\text{ Detik}$ / $108.000\text{ Frames}$ @ $30\text{ FPS}$)  
**Resolusi Output:** Full HD $1920 \times 1080$ (`H.264 MP4` untuk YouTube)  
**Tech Stack:** Remotion 4.x, React 18, TypeScript, Tailwind CSS / Inline CSS, KaTeX, Lucide React  

---

## 1. Tujuan Rebuild & Pembersihan Proyek Lama
Proyek di dalam folder `pertidaksamaan-video` sebelumnya memiliki struktur scene lama (termasuk `Scene06_Kuadrat.tsx` yang sudah diganti). Dokumen PRD V2.0 ini menjadi acuan tunggal untuk melakukan **Clean Rebuild** agar:
1. Seluruh scene lama di `src/scenes/` dan komponen lama di `src/components/` diperbarui total mengikuti arsitektur **Remotion Studio Pertidaksamaan 60 Menit** versi terbaru.
2. Menghapus materi Pertidaksamaan Kuadrat lama dan menggantinya dengan **4 Cabang Utama Resmi**:
   - **Bagian 1:** Pertidaksamaan Linear Satu & Dua Variabel (PLSV & PLDV) — **Rafie Armansyah**
   - **Bagian 2:** Pertidaksamaan Rasional (Pecahan Aljabar) — **Ikhsan**
   - **Bagian 3:** Pertidaksamaan Irasional (Bentuk Akar) — **Pras**
   - **Bagian 4:** Pertidaksamaan Nilai Mutlak — **Dimas** (Ditutup oleh **Rafie Armansyah**)
3. Mendukung **Render Per Scene (Scene 01 – Scene 12)**, **Render Per Part (Part 1 – Part 4)**, dan **Full Video (60 Menit)** agar proses rendering di laptop ringan, anti-crash, dan siap digabung untuk YouTube.

---

## 2. Konsep Visual, Ruang Kelas & Desain 4 Karakter

### 2.1 Tema Lingkungan Kelas (Nature Green)
- **Langit-langit Kelas:** Warna krem hangat (`#d5c7a3`) dengan lis kayu (`#8c6239`) dan 3 lampu panel menyala (`#fef9c3`).
- **Dinding Kelas:** Gradasi hijau alam (*Nature Green* `#7cb07a` ke `#6ea36c`), dilengkapi jendela kaca di sisi kiri dengan efek cahaya pagi, tanaman hias di sudut kiri bawah, serta pintu kayu di sisi kanan.
- **Papan Tulis Utama (Chalkboard):** Hijau tua (`#1e4631`) dengan bingkai kayu cokelat tua (`#7c4d2b`) tebal, rak kapur di bagian bawah, serta tekstur kapur halus.
- **Subtitle Bar (Voice Over):** Panel bawah berwarna gelap transparan (`#020617`) yang menampilkan nama pembicara aktif dan transkrip Voice Over secara *real-time*.

### 2.2 Spesifikasi 4 Karakter (2D Flat SVG Animation)
Semua karakter wajib mengenakan **jas almamater biru muda polos (`#7ec8f8`) tanpa logo** sesuai PRD dan gambar referensi `public/characters_classroom.jpg`:
1. **RAFIE (`rafie` — Moderator & Pemateri 1):**
   - **Materi:** Opening, Hukum Fundamental Pertidaksamaan, PLSV, PLDV, 5 Contoh Soal Linear, dan Closing.
   - **Visual:** Rambut hitam rapi belah tengah, berkacamata frame tipis, kemeja putih berkerah di balik jas biru muda polos, celana gelap, sepatu cokelat tua, tangan memegang tablet abu-abu.
2. **IKHSAN (`ikhsan` — Pemateri 2):**
   - **Materi:** Pertidaksamaan Rasional (Pecahan), Titik Kritis, Tabel Uji Tanda, 5 Contoh Soal Rasional, dan 4 Kesalahan Umum.
   - **Visual:** Rambut *messy bowl cut* berponi, kacamata bulat, kemeja bermotif batik di balik jas biru muda polos, memegang spidol/pointer hitam.
3. **PRAS (`pras` — Pemateri 3):**
   - **Materi:** Pertidaksamaan Irasional (Bentuk Akar), Syarat Numerus, 5 Contoh Soal Irasional.
   - **Visual:** Kulit sawo matang, rambut sedikit bergelombang/spike, tanpa kacamata, kaos polo gelap berkerah di balik jas biru muda polos, gestur tangan terbuka menjelaskan.
4. **DIMAS (`dimas` — Pemateri 4):**
   - **Materi:** Pertidaksamaan Nilai Mutlak, Konsep Jarak Fisik, Tabel Rumus Cepat, 5 Contoh Soal Nilai Mutlak, dan Evaluasi Kesalahan Umum.
   - **Visual:** Postur lebih tegap/berisi (`bodyWidth` lebih lebar), rambut sangat pendek (*buzz cut*), kaos oblong hitam di balik jas biru muda polos, pose presentasi kokoh.

---

## 3. Strategi Animasi (Hold Frame) & Strategi Rendering YouTube

1. **Hold Frame & Static Visuals:**
   - Setiap Scene dibagi menjadi **3 Langkah Papan Tulis (Steps)** yang durasinya proporsional terhadap durasi Scene.
   - Animasi transisi rumus (`opacity` & `translateY` menggunakan `interpolate` / `spring` dari Remotion) **HANYA berjalan pada 25–30 frame pertama** saat pergantian langkah.
   - Setelah frame ke-30 pada langkah tersebut, visual papan tulis berada dalam mode **HOLD FRAME (Statis)** sementara animasi mulut karakter (*lip-sync* ringan menggunakan fungsi sinus `Math.sin(frame * 0.45)`) tetap berjalan mengikuti Voice Over.
2. **Arsitektur Komposisi `src/Root.tsx` (Wajib Didaftarkan Semua):**
   - **Folder `1-Per-Scene-Render` (Rekomendasi Utama untuk Render Ringan):**
     - `Scene01-Intro` ($2\text{ menit} = 3.600\text{ frames}$)
     - `Scene02-HukumFundamental` ($3\text{ menit} = 5.400\text{ frames}$)
     - `Scene03-KonsepPLSV` ($3\text{ menit} = 5.400\text{ frames}$)
     - `Scene04-KonsepPLDV` ($3\text{ menit} = 5.400\text{ frames}$)
     - `Scene05A-SoalPLSV` ($2.5\text{ menit} = 4.500\text{ frames}$)
     - `Scene05B-SoalPLDV` ($2.5\text{ menit} = 4.500\text{ frames}$)
     - `Scene06-KonsepRasional` ($4\text{ menit} = 7.200\text{ frames}$)
     - `Scene07A-SoalRasional123` ($5.5\text{ menit} = 9.900\text{ frames}$)
     - `Scene07B-SoalRasional45` ($5.5\text{ menit} = 9.900\text{ frames}$)
     - `Scene08-KonsepIrasional` ($5\text{ menit} = 9.000\text{ frames}$)
     - `Scene09A-SoalIrasional12` ($4.5\text{ menit} = 8.100\text{ frames}$)
     - `Scene09B-SoalIrasional345` ($4.5\text{ menit} = 8.100\text{ frames}$)
     - `Scene10-KonsepMutlak` ($4.5\text{ menit} = 8.100\text{ frames}$)
     - `Scene11A-SoalMutlak12` ($4\text{ menit} = 7.200\text{ frames}$)
     - `Scene11B-SoalMutlak345` ($4\text{ menit} = 7.200\text{ frames}$)
     - `Scene12-ClosingSummary` ($2.5\text{ menit} = 4.500\text{ frames}$)
   - **Folder `2-Modular-Parts` (4 Segmen Pemateri):**
     - `Part1-Linear-Rafie` ($16\text{ menit} = 28.800\text{ frames}$)
     - `Part2-Rasional-Ikhsan` ($15\text{ menit} = 27.000\text{ frames}$)
     - `Part3-Irasional-Pras` ($14\text{ menit} = 25.200\text{ frames}$)
     - `Part4-Mutlak-Dimas-Closing` ($15\text{ menit} = 27.000\text{ frames}$)
   - **Master Composition:**
     - `FullVideo` ($60\text{ menit} = 108.000\text{ frames}$)

---

## 4. Struktur File Baru di VS Code (`pertidaksamaan-video`)

```text
pertidaksamaan-video/
├── public/
│   └── characters_classroom.jpg
├── scripts/
│   ├── render-scenes.mjs        # Script otomatis render per scene agar ringan
│   └── concat-list.txt          # Daftar urutan MP4 untuk digabung FFmpeg
├── src/
│   ├── data/
│   │   └── scenesData.ts        # Master data 15 scene, 20 contoh soal, rumus, & VO
│   ├── components/
│   │   ├── ClassroomStage.tsx   # Layout kelas Nature Green + Chalkboard + Subtitle
│   │   ├── TeacherCharacter.tsx # SVG 2D Flat 4 Karakter (Ikhsan, Rafie, Pras, Dimas)
│   │   ├── ChalkboardContent.tsx# Visualisasi langkah rumus & Hold Frame indicator
│   │   ├── NumberLine.tsx       # Visualisasi garis bilangan, bulatan kosong/penuh, & uji tanda
│   │   ├── CartesianPlot.tsx    # Grafik 2D Kartesius PLDV (Garis utuh vs putus-putus)
│   │   └── MathText.tsx         # Formatter rumus & tabel uji tanda / nilai mutlak
│   ├── scenes/
│   │   ├── GenericScene.tsx     # Komponen renderer dinamis berbasis sceneId
│   │   ├── FullVideo.tsx        # <Series> penggabung seluruh 15 scene (108.000 frames)
│   │   ├── Scene01_Intro.tsx
│   │   ├── Scene02_HukumFundamental.tsx
│   │   ├── Scene03_KonsepPLSV.tsx
│   │   ├── Scene04_KonsepPLDV.tsx
│   │   ├── Scene05A_SoalPLSV.tsx
│   │   ├── Scene05B_SoalPLDV.tsx
│   │   ├── Scene06_KonsepRasional.tsx
│   │   ├── Scene07A_SoalRasional123.tsx
│   │   ├── Scene07B_SoalRasional45.tsx
│   │   ├── Scene08_KonsepIrasional.tsx
│   │   ├── Scene09A_SoalIrasional12.tsx
│   │   ├── Scene09B_SoalIrasional345.tsx
│   │   ├── Scene10_KonsepMutlak.tsx
│   │   ├── Scene11A_SoalMutlak12.tsx
│   │   ├── Scene11B_SoalMutlak345.tsx
│   │   └── Scene12_ClosingSummary.tsx
│   ├── index.css
│   ├── index.ts
│   └── Root.tsx
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

---

## 5. Kurikulum Lengkap & 20 Contoh Soal yang Wajib Dimasukkan ke `scenesData.ts`

### Bagian 1: Pertidaksamaan Linear (Rafie Armansyah — Menit 00:00 s/d 16:00)
- **Hukum Fundamental:** Menambah/mengurangi kedua ruas tidak mengubah tanda. Mengali/membagi kedua ruas dengan bilangan **negatif** wajib membalik arah tanda ketidaksamaan (contoh: $-2x < 6 \implies x > -3$).
- **PLSV:** Bentuk $ax + b < c$. Tanda $<$ atau $>$ memakai bulatan kosong ($\circ$), tanda $\le$ atau $\ge$ memakai bulatan penuh ($\bullet$).
- **PLDV:** Bentuk $ax + by \le c$. Cari titik potong sumbu $X$ ($y=0$) dan sumbu $Y$ ($x=0$). Tanda $\le/\ge$ garis utuh, tanda $</>$ garis putus-putus. Uji titik $(0,0)$.
- **5 Contoh Soal Linear:**
  1. **Soal 1 (PLSV Dasar):** $3(x - 2) + 4 < 5x - 6 \implies 3x - 2 < 5x - 6 \implies -2x < -4 \implies x > 2$. $\text{HP} = \{x \mid x > 2, x \in \mathbb{R}\}$.
  2. **Soal 2 (PLSV Pecahan):** $\frac{2x - 1}{3} - \frac{x + 2}{2} \ge 1$ (kalikan KPK $6$) $\implies 2(2x - 1) - 3(x + 2) \ge 6 \implies x - 8 \ge 6 \implies x \ge 14$.
  3. **Soal 3 (PLDV Garis Utuh):** $2x + 5y \le 10$, titik potong $(0,2)$ dan $(5,0)$, garis utuh, uji $(0,0) \implies 0 \le 10$ (BENAR, arsir menuju $(0,0)$).
  4. **Soal 4 (PLDV Garis Putus-putus):** $4x - 3y > 12$, titik potong $(0,-4)$ dan $(3,0)$, garis putus-putus, uji $(0,0) \implies 0 > 12$ (SALAH, arsir menjauhi $(0,0)$).
  5. **Soal 5 (Sistem PLDV Kuadran I):** $x + y \ge 4; x \ge 0; y \ge 0$, titik potong $(0,4)$ dan $(4,0)$, DHP di Kuadran I sebelah kanan-atas garis.

### Bagian 2: Pertidaksamaan Rasional (Ikhsan — Menit 16:00 s/d 31:00)
- **Konsep & Syarat Mutlak:** $\frac{f(x)}{g(x)} > 0$ dengan syarat penyebut $g(x) \neq 0$. Titik kritis pembuat nol penyebut selalu dikecualikan ($\circ$). Dilarang mengalikan silang.
- **5 Contoh Soal Rasional:**
  1. **Contoh 1 (Dasar):** $\frac{x - 2}{x + 1} \ge 0 \implies$ titik kritis $x = -1$ ($\circ$) dan $x = 2$ ($\bullet$). Uji tanda $(+) (-) (+) \implies \text{HP} = (-\infty, -1) \cup [2, \infty)$.
  2. **Contoh 2 (Menengah):** $\frac{x^2 - 4}{x - 1} < 0 \implies \frac{(x - 2)(x + 2)}{x - 1} < 0 \implies$ titik kritis $-2, 1, 2$. Uji tanda $(-) (+) (-) (+) \implies \text{HP} = (-\infty, -2) \cup (1, 2)$.
  3. **Contoh 3 (Tanda $\le$):** $\frac{2x + 1}{x - 3} \le 0 \implies$ titik kritis $x = -\frac{1}{2}$ ($\bullet$) dan $x = 3$ ($\circ$). Uji tanda $(+) (-) (+) \implies \text{HP} = [-\frac{1}{2}, 3)$.
  4. **Contoh 4 (Pembilang Kuadrat):** $\frac{x^2 - 9}{x + 2} \ge 0 \implies \frac{(x - 3)(x + 3)}{x + 2} \ge 0 \implies \text{HP} = [-3, -2) \cup [3, \infty)$.
  5. **Contoh 5 (Faktor Sama Tercoret):** $\frac{x^2 - x - 6}{x^2 - 4} > 0 \implies \frac{(x - 3)(x + 2)}{(x - 2)(x + 2)} > 0$ dengan syarat $x \neq -2$ dan $x \neq 2$. $\text{HP} = (-\infty, -2) \cup (-2, 2) \cup (3, \infty)$.

### Bagian 3: Pertidaksamaan Irasional (Pras — Menit 31:00 s/d 45:00)
- **Konsep & Syarat Utama:** Untuk $\sqrt{f(x)}$, wajib berlaku **Syarat Numerus** $f(x) \ge 0$ dan hasil akar $\sqrt{f(x)} \ge 0$. Solusi akhir adalah irisan ($\cap$) antara syarat numerus dan hasil kuadrat kedua ruas.
- **5 Contoh Soal Irasional:**
  1. **Contoh 1 (Satu Akar):** $\sqrt{2x - 4} < 4 \implies$ Syarat: $2x - 4 \ge 0 \implies x \ge 2$. Kuadrat: $2x - 4 < 16 \implies x < 10$. Irisan: $\text{HP} = \{x \mid 2 \le x < 10, x \in \mathbb{R}\}$.
  2. **Contoh 2 (Dua Akar):** $\sqrt{x - 1} \le \sqrt{2x - 4} \implies$ Syarat 1: $x \ge 1$, Syarat 2: $x \ge 2$, Kuadrat: $x - 1 \le 2x - 4 \implies x \ge 3$. Irisan: $\text{HP} = \{x \mid x \ge 3, x \in \mathbb{R}\}$.
  3. **Contoh 3 (Satu Akar Dasar):** $\sqrt{x - 3} < 2 \implies$ Syarat: $x \ge 3$, Kuadrat: $x - 3 < 4 \implies x < 7$. Irisan: $\text{HP} = \{x \mid 3 \le x < 7, x \in \mathbb{R}\}$.
  4. **Contoh 4 (Dua Akar Tanda $\ge$):** $\sqrt{2x + 1} \ge \sqrt{x - 4} \implies$ Syarat 1: $x \ge -\frac{1}{2}$, Syarat 2: $x \ge 4$, Kuadrat: $x \ge -5$. Irisan: $\text{HP} = \{x \mid x \ge 4, x \in \mathbb{R}\}$.
  5. **Contoh 5 (Akar Kuadrat vs Linear):** $\sqrt{x^2 - 4} \le x + 2 \implies$ Numerus: $x \le -2$ atau $x \ge 2$; Syarat ruas kanan: $x \ge -2$; Kuadrat: $x^2 - 4 \le x^2 + 4x + 4 \implies x \ge -2$. Irisan: $\text{HP} = \{x \mid x = -2 \text{ atau } x \ge 2, x \in \mathbb{R}\}$.

### Bagian 4: Pertidaksamaan Nilai Mutlak & Closing (Dimas & Rafie — Menit 45:00 s/d 60:00)
- **Konsep Dasar Jarak:** $|x| \ge 0$. Untuk $a \ge 0$: bentuk $|f(x)| < a \iff -a < f(x) < a$ (mengumpul di tengah); bentuk $|f(x)| > a \iff f(x) < -a \text{ atau } f(x) > a$ (memencar ke kiri dan kanan).
- **5 Contoh Soal Nilai Mutlak:**
  1. **Contoh 1 (Tanda Kurang Dari):** $|2x - 3| < 7 \implies -7 < 2x - 3 < 7 \implies -4 < 2x < 10 \implies -2 < x < 5$. $\text{HP} = \{x \mid -2 < x < 5\}$.
  2. **Contoh 2 (Tanda Lebih Dari Sama Dengan):** $|3x + 2| \ge 8 \implies 3x + 2 \le -8 \text{ (yaitu } x \le -\frac{10}{3}\text{)} \text{ atau } 3x + 2 \ge 8 \text{ (yaitu } x \ge 2\text{)}$.
  3. **Contoh 3 (Isolasi Mutlak & Bagi Negatif):** $2|4 - x| - 3 \le 5 \implies |4 - x| \le 4 \implies -4 \le 4 - x \le 4 \implies -8 \le -x \le 0 \implies 0 \le x \le 8$.
  4. **Contoh 4 (Mutlak Kedua Ruas):** $|2x - 1| > |x + 4| \implies (3x + 3)(x - 5) > 0 \implies \text{HP} = \{x \mid x < -1 \text{ atau } x > 5\}$.
  5. **Contoh 5 (Evaluasi Konstanta Negatif):** $|x| < -5 \implies \text{HP} = \emptyset$ (Himpunan Kosong, karena jarak mutlak tidak mungkin kurang dari bilangan negatif).
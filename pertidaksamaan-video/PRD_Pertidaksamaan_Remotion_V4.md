# Product Requirements Document (PRD) V4.0
## Proyek Video Edukasi Matematika Remotion: Seri Pertidaksamaan (Upgrade Modul PtLSV & PtLDV)

### 1. Ringkasan Eksekutif & Tujuan Perubahan
PRD V4.0 memperbarui arsitektur V3.0 untuk menyelesaikan masalah ketidakpresisian grafik matematika, *frame drop* saat rendering, dan *hardcoded math data* pada segmen **Pertidaksamaan Linear (Rafie)** tanpa memutus kesinambungan visual maupun teknis dengan segmen pemateri lain (**Ikhsan — Rasional**, **Pras — Irasional**, **Dimas — Nilai Mutlak**).

Seluruh materi teks, alur animasi, angka, rumus LaTeX, dan koordinat poligon pada segmen Pertidaksamaan Linear kini tunduk pada *Single Source of Truth* yang tersimpan di dua file pendamping:
1. `spesifikasi_materi_remotion_ptlsv_ptldv.md` (Naskah, aturan visual, alur 6 sub-scene)
2. `mathData.ts` (Data numerik, ekspresi LaTeX, koordinat poligon DHP, dan helper `mapMathToSvg()`)

---

### 2. Spesifikasi Teknis & Tech Stack Wajib
* **Framework Video:** Remotion + React + TypeScript + Tailwind CSS.
* **Resolusi & Frame Rate:** `1920x1080` (16:9), `30 FPS`.
* **Canvas Auto-Scaling (Kompatibilitas V3.0):**
  * Elemen ruang kelas *Nature Green* dan karakter 2D tetap mengikuti sistem *viewport scaling* 2x (`960x540` $\to$ `1920x1080`) agar posisi karakter proporsional dan menapak di lantai.
  * Elemen **Smartboard Matematika (SVG + KaTeX)** dirender tajam dalam koordinat piksel/vektor presisi via `mapMathToSvg()` agar sudut kemiringan garis tidak terdistorsi.
* **Engine Grafik (Wajib):** **SVG Murni + React** dengan animasi *frame-deterministic* (`useCurrentFrame()`, `spring()`, `interpolate()`). **Dilarang keras** menggunakan Plotly.js, Chart.js, atau transisi CSS/DOM asinkron.
* **Engine Rumus (Wajib):** **KaTeX sinkron** via `katex.renderToString()` (impor `katex/dist/katex.min.css`). **Dilarang keras** menggunakan MathJax.
* **Strategi Render Modular:** Setiap scene dan sub-scene wajib didaftarkan sebagai `<Composition>` terpisah di `Root.tsx` agar dapat dirender satuan (hemat RAM & mudah sinkronisasi *Voice Over* menuju total target video 60 menit).

---

### 3. Desain Visual & Harmonisasi Tema (V3.0 + V4.0)
Agar transisi antar-pemateri tetap mulus:
1. **Layer Lingkungan (V3.0 Lock):**
   * Ruang kelas tema *Nature Green*.
   * 4 karakter 2D dengan jas almamater biru polos menapak di lantai.
   * Scene **Intro Pemateri Solo** tetap menggunakan teknik *zoom-in* karakter tanpa papan tulis.
2. **Layer Smartboard Matematika (V4.0 Dark Mode Slate):**
   * Papan tulis menggunakan layout 2 kolom (Kiri: Aljabar KaTeX & Kartu Alert; Kanan: Visualisasi Grafik SVG Presisi).
   * Palet warna wajib Smartboard & UI Matematika:
     * Background Utama Board: `#0f172a` (`slate-900`)
     * Kartu / Panel Langkah: `#1e293b` (`slate-800`) dengan border `#334155` (`slate-700`)
     * Teks Utama / Sekunder: `#f8fafc` (`slate-50`) / `#cbd5e1` (`slate-300`)
     * Aksen PtLSV (Biru): `#38bdf8` (`sky-400`)
     * Aksen PtLDV / Solusi Benar (Hijau): `#10b981` (`emerald-500`)
     * Aksen Alert / Balik Tanda / Salah (Merah): `#f43f5e` (`rose-500`)
     * Aksen Highlight / Latihan Soal (Kuning): `#fbbf24` (`amber-400`)

---

### 4. Standarisasi Istilah & Kontrak Data (`mathData.ts`)
* **Terminologi Wajib:** Seluruh judul, label, narasi visual, dan nama komponen wajib memakai **PtLSV** dan **PtLDV** (dilarang menulis PLSV/PLDV).
* **Kontrak Data Wajib dari `mathData.ts`:**
  * Grafik 1D (PtLSV): membaca rentang sumbu, `boundaryValue`, tipe bulatan (penuh/kosong), arah sinar, dan notasi interval.
  * Grafik 2D (PtLDV): membaca `viewport`, titik potong sumbu, `lineStyle` (`solid` / `dashed`), `lineSegmentInViewport` (`[p1, p2]`), `dhpPolygon`, dan `layerPolygons` (khusus sistem pertidaksamaan).
  * Konversi Koordinat: seluruh pemetaan titik `(x, y)` matematika ke koordinat SVG `(sx, sy)` **wajib** melalui helper `mapMathToSvg()` dari `mathData.ts`.

---

### 5. Arsitektur 20 Scene & Rincian Modul Rafie (PtLSV & PtLDV)

#### A. Peta Integrasi Kelompok (Tidak Boleh Memecah Scene Pemateri Lain)
| Segmen | Pemateri | Topik Utama | Status pada V4.0 |
| :--- | :--- | :--- | :--- |
| Opening | Semua | Intro Sekolah/Kelas & Agenda | Pertahankan V3.0 |
| **Segmen 1** | **Rafie** | **Intro Solo + Pertidaksamaan Linear (PtLSV & PtLDV)** | **Clean Rebuild (Data-Driven V4.0)** |
| Segmen 2 | Ikhsan | Intro Solo + Pertidaksamaan Rasional | Pertahankan (siap adopsi komponen SVG/KaTeX) |
| Segmen 3 | Pras | Intro Solo + Pertidaksamaan Irasional | Pertahankan (siap adopsi komponen SVG/KaTeX) |
| Segmen 4 | Dimas | Intro Solo + Pertidaksamaan Nilai Mutlak | Pertahankan (siap adopsi komponen SVG/KaTeX) |
| Closing | Semua | Rangkuman & Penutup | Pertahankan V3.0 |

#### B. Rincian 6 Sub-Scene Inti Segmen Rafie (`~120 detik` / `3600 frames` base duration, fleksibel untuk VO)
1. **Linear-01 — Intro & Aturan Mutlak Pertidaksamaan (`12 dtk` / `360 frames`)**
   * Judul: *Bedah Tuntas Pertidaksamaan Linear (1 & 2 Variabel)*.
   * Konten: Penjumlahan/pengurangan aman; **Golden Rule**: kali/bagi bilangan negatif wajib balik tanda (`<` $\to$ `>`, `<=` $\to$ `>=`).
   * Animasi: Kartu peringatan berbingkai `#f43f5e`; simbol `<` berotasi halus $180^\circ$ menjadi `>` tepat saat label $\times(-)$ atau $\div(-)$ muncul.
2. **Linear-02 — Konsep PtLSV & Visualisasi Garis Bilangan (`18 dtk` / `540 frames`)**
   * Konten: Definisi 1 variabel pangkat 1, aturan bulatan kosong ($\circ$, `(` `)`) vs bulatan penuh ($\bullet$, `[` `]`), contoh $2x - 4 \ge 0 \implies x \ge 2$, interval $[2, \infty)$.
   * Perbaikan Grafik: Sumbu abu-abu rentang $[-1, 6]$, **bulatan penuh hijau tepat di $x = 2$** (`boundaryValue`), sinar hijau (*ray*) + area sorotan meluncur ke kanan dengan ujung panah.
3. **Linear-03 — Latihan Soal PtLSV (`30 dtk` / `900 frames` — `15 dtk` per soal)**
   * **Soal 1 (Jebakan Balik Tanda):** $3(x - 2) + 4 < 5x - 6 \implies -2x < -4 \implies x > 2$. Alert visual merah saat bagi $-2$. Garis bilangan $[-2, 6]$, bulatan kosong di $x = 2$, panah ke kanan, interval $(2, \infty)$.
   * **Soal 2 (Pecahan & Distribusi Negatif):** $\frac{2x - 1}{3} - \frac{x + 2}{2} \ge 1 \implies \times 6 \implies 2(2x-1) - 3(x+2) \ge 6 \implies 4x - 2 - 3x - 6 \ge 6 \implies x \ge 14$. Alert visual distribusi $-3(x+2) = -3x - 6$. Garis bilangan $[10, 18]$, bulatan penuh di $x = 14$, panah ke kanan, interval $[14, \infty)$.
4. **Linear-04 — Konsep PtLDV (`16 dtk` / `480 frames`)**
   * Konten: Definisi DHP 2D & 3 langkah utama (titik potong sumbu, garis utuh vs putus-putus, uji titik $(0,0)$ + catatan titik uji alternatif $(1,0)$ / $(0,1)$ jika garis melalui $(0,0)$).
   * Animasi: Dua kartu perbandingan gaya garis berdampingan + efek *ripple/ping* pada titik asal $(0,0)$ di bidang Kartesius mini.
5. **Linear-05 — Latihan Soal PtLDV (`30 dtk` / `900 frames` — `15 dtk` per soal)**
   * **Urutan Animasi Wajib (5 Tahap):** (1) Munculkan bidang Kartesius sesuai `viewport` $\to$ (2) Munculkan titik potong sumbu $Y$ & $X$ berlabel $\to$ (3) Tarik garis pembatas penuh `lineSegmentInViewport[0]` ke `[1]` via `strokeDashoffset` sesuai `lineStyle` $\to$ (4) Tampilkan uji titik $(0,0)$ + lencana BENAR (`#10b981`) atau SALAH (`#f43f5e`) $\to$ (5) Sapukan (`clipPath`/fade) `dhpPolygon` penuh sampai tepi *viewport*.
   * **Soal 3 (Garis Utuh):** $2x + 5y \le 10$, titik $(0,2)$ & $(5,0)$, solid, uji $(0,0)$ BENAR, arsir bawah-kiri pada $x \in [-2, 7], y \in [-2, 4]$.
   * **Soal 4 (Garis Putus-putus):** $4x - 3y > 12$, titik $(0,-4)$ & $(3,0)$, dashed, uji $(0,0)$ SALAH, arsir kanan-bawah penuh (termasuk area $x < 3$ di bawah garis) pada $x \in [-2, 7], y \in [-6, 5]$.
6. **Linear-06 — Aplikasi Sistem PtLDV / Soal 5 (`14 dtk` / `420 frames`)**
   * Soal: $x + y \ge 4;\; x \ge 0;\; y \ge 0$.
   * Konten: Pembatas Kuadran I ($x \ge 0, y \ge 0$), garis utuh $(0,4)$–$(4,0)$, uji $(0,0)$ SALAH.
   * Animasi: Munculkan 3 arsiran bertahap dari `layerPolygons` (opasitas `0.15`), lalu redupkan area luar dan sorot tajam `dhpPolygon` sebagai irisan DHP final di Kuadran I.

---

### 6. Struktur Folder Modular yang Disarankan
```text
src/
├── data/
│   └── mathData.ts                 # Single Source of Truth (file lokal terbaru)
├── components/
│   ├── classroom/                  # Komponen V3.0 (NatureGreenBg, Characters, ScalingWrapper)
│   └── math-v4/                    # Komponen Reusable V4.0 (dapat dipakai semua pemateri)
│       ├── MathFormula.tsx         # Wrapper katex.renderToString() sinkron
│       ├── SmartboardShell.tsx     # Panel Dark Mode Slate 2-kolom
│       ├── AlertRuleCard.tsx       # Kartu peringatan & animasi rotasi simbol 180°
│       ├── NumberLine1D.tsx        # SVG Garis Bilangan 1D (pakai boundaryValue)
│       └── CartesianPlane2D.tsx    # SVG Kartesius 2D (pakai mapMathToSvg, dhpPolygon, layerPolygons)
├── scenes/
│   ├── linear/                     # Segmen Rafie (Intro Solo + LinearScene1..6)
│   ├── rasional/                   # Segmen Ikhsan (jangan diubah kecuali integrasi shared)
│   ├── irasional/                  # Segmen Pras (jangan diubah kecuali integrasi shared)
│   └── mutlak/                     # Segmen Dimas (jangan diubah kecuali integrasi shared)
└── Root.tsx                        # Registrasi Composition modular per scene & FullVideo
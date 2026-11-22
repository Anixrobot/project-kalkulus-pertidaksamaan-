# Spesifikasi Materi & Arahan Visual Remotion: Pertidaksamaan Linear (PtLSV & PtLDV)

Dokumen ini adalah *single source of truth* untuk naskah materi, alur *scene*, perbaikan visual grafik, serta aturan teknis pembuatan video edukasi matematika menggunakan **Remotion**. Seluruh data numerik, ekspresi LaTeX, dan koordinat poligon grafik tersimpan di file pendamping `mathData.ts`.

---

## 1. Standar Teknis & Visual untuk AI Agent Remotion

* **Tech Stack Wajib:**
  * **Grafik 1D & 2D:** Gunakan **SVG murni + React** yang digerakkan oleh `useCurrentFrame()`, `spring()`, dan `interpolate()`. **Dilarang menggunakan Plotly.js** atau library grafik berbasis animasi CSS/DOM asinkron karena rawan *frame drop* saat *render*.
  * **Render Rumus:** Gunakan **KaTeX** (`katex.renderToString()`) secara sinkron. **Dilarang menggunakan MathJax** karena proses *render* asinkron bisa menyebabkan rumus belum muncul pada *frame* awal.
* **Standarisasi Istilah:**
  * Gunakan singkatan **PtLSV** (*Pertidaksamaan Linear Satu Variabel*) dan **PtLDV** (*Pertidaksamaan Linear Dua Variabel*) sebagai pengganti PLSV/PLDV agar konsisten dengan kurikulum matematika dan tidak tertukar dengan materi *Persamaan*.
* **Palet Warna (Dark Mode Slate):**
  * Background Utama: `#0f172a` (`slate-900`)
  * Kartu / Panel: `#1e293b` (`slate-800`) dengan border `#334155` (`slate-700`)
  * Teks Utama / Sekunder: `#f8fafc` (`slate-50`) / `#cbd5e1` (`slate-300`)
  * Aksen PtLSV (Biru): `#38bdf8` (`sky-400`)
  * Aksen PtLDV / Solusi Benar (Hijau): `#10b981` (`emerald-500`)
  * Aksen Alert / Balik Tanda / Salah (Merah): `#f43f5e` (`rose-500`)
  * Aksen Highlight / Latihan (Kuning): `#fbbf24` (`amber-400`)
* **Konfigurasi Video Default:** Resolusi `1920x1080` (16:9), `30 FPS`, total durasi estimasi `~120 detik` (`3600 frames`).

---

## 2. Alur Scene & Materi Detail

### Scene 1: Intro & Aturan Mutlak Pertidaksamaan
* **Durasi Saran:** `12 detik` (`360 frames`)
* **Judul:** Bedah Tuntas Pertidaksamaan Linear (1 & 2 Variabel)
* **Poin Materi:**
  * Penjumlahan atau pengurangan kedua ruas dengan bilangan apa pun **tidak mengubah** arah tanda pertidaksamaan.
  * **Aturan Mutlak (Golden Rule):** Jika mengali atau membagi kedua ruas dengan **bilangan negatif**, maka arah tanda pertidaksamaan **WAJIB DIBALIK** (contoh: $\lt$ berubah menjadi $\gt$, dan $\le$ berubah menjadi $\ge$).
* **Arahan Animasi:**
  * Tampilkan kartu peringatan berbingkai merah (`#f43f5e`).
  * Animasikan simbol $\lt$ berputar $180^\circ$ secara halus menjadi $\gt$ tepat saat label operasi $\times (-)$ atau $\div (-)$ muncul.

---

### Scene 2: Konsep PtLSV (Satu Variabel) & Visualisasi Garis Bilangan
* **Durasi Saran:** `18 detik` (`540 frames`)
* **Poin Materi:**
  * **Definisi:** Hanya memuat satu variabel ($x$) berpangkat tertinggi $1$. Tujuannya adalah mengisolasi $x$ sendirian di satu ruas.
  * **Aturan Titik Batas & Notasi Interval:**
    * Tanda $\lt$ atau $\gt$ menggunakan **bulatan kosong** ($\circ$), batas tidak ikut, kurung interval biasa `(` atau `)`.
    * Tanda $\le$ atau $\ge$ menggunakan **bulatan penuh** ($\bullet$), batas ikut, kurung interval siku `[` atau `]`.
  * **Contoh Pengantar:**
    $$2x - 4 \ge 0 \implies 2x \ge 4 \implies x \ge 2$$
    Notasi interval: $[2, \infty)$.
* **Arahan Animasi (Perbaikan Bug Grafik Lama):**
  * Gambar sumbu garis bilangan netral warna abu-abu dengan rentang $x \in [-1, 6]$.
  * Letakkan **bulatan penuh** ($\bullet$) warna hijau tepat di koordinat $x = 2$ (bukan di ujung kanan $x = 6$).
  * Animasikan sinar hijau (*ray*) dan area sorotan meluncur dari $x = 2$ menuju arah kanan ($\infty$) lengkap dengan ujung panah.

---

### Scene 3: Latihan Soal PtLSV (Soal 1 & Soal 2)
* **Durasi Saran:** `30 detik` (`900 frames` — masing-masing soal `15 detik`)

#### Soal 1: PtLSV Sederhana + Jebakan Balik Tanda
* **Soal:** Tentukan Himpunan Penyelesaian dari:
  $$3(x - 2) + 4 \lt 5x - 6$$
* **Langkah Penyelesaian:**
  1. Buka tanda kurung: $3x - 6 + 4 \lt 5x - 6$
  2. Sederhanakan ruas kiri: $3x - 2 \lt 5x - 6$
  3. Kelompokkan variabel dan konstanta: $3x - 5x \lt -6 + 2$
  4. Hasil penyederhanaan: $-2x \lt -4$
  5. **ALERT VISUAL (Bagi Negatif):** Bagi kedua ruas dengan $-2$, sehingga tanda $\lt$ wajib berubah menjadi $\gt$:
     $$x \gt \frac{-4}{-2} \implies x \gt 2$$
* **Visualisasi Akhir:** Garis bilangan rentang $[-2, 6]$, **bulatan kosong** ($\circ$) di $x = 2$, panah ke kanan, notasi interval $(2, \infty)$.

#### Soal 2: PtLSV Bentuk Pecahan
* **Soal:** Tentukan Himpunan Penyelesaian dari:
  $$\frac{2x - 1}{3} - \frac{x + 2}{2} \ge 1$$
* **Langkah Penyelesaian:**
  1. Kalikan semua ruas dengan KPK penyebut ($3$ dan $2$, yaitu $6$):
     $$6 \cdot \left(\frac{2x - 1}{3}\right) - 6 \cdot \left(\frac{x + 2}{2}\right) \ge 6 \cdot 1$$
  2. Sederhanakan penyebut: $2(2x - 1) - 3(x + 2) \ge 6$
  3. **ALERT VISUAL (Distribusi Negatif):** Perhatikan perkalian $-3$ ke dalam $(x + 2)$ yang menghasilkan $-3x - 6$ (bukan $+6$):
     $$4x - 2 - 3x - 6 \ge 6$$
  4. Gabungkan suku sejenis: $x - 8 \ge 6 \implies x \ge 14$
* **Visualisasi Akhir:** Garis bilangan rentang $[10, 18]$, **bulatan penuh** ($\bullet$) di $x = 14$, panah ke kanan, notasi interval $[14, \infty)$.

---

### Scene 4: Konsep PtLDV (Dua Variabel)
* **Durasi Saran:** `16 detik` (`480 frames`)
* **Poin Materi:**
  * **Definisi:** Melibatkan dua variabel ($x$ dan $y$). Solusinya berupa wilayah yang disebut **Daerah Himpunan Penyelesaian (DHP)** pada bidang Kartesius 2D.
  * **3 Langkah Menentukan DHP:**
    1. **Cari Titik Potong Sumbu:** Substitusi $x = 0$ untuk titik potong sumbu $Y$, dan $y = 0$ untuk titik potong sumbu $X$.
    2. **Tentukan Jenis Garis Pembatas:**
       * Tanda $\le$ atau $\ge$: **Garis Utuh** (*solid*) — titik di sepanjang garis ikut menjadi solusi.
       * Tanda $\lt$ atau $\gt$: **Garis Putus-putus** (*dashed*) — titik di sepanjang garis tidak ikut menjadi solusi.
    3. **Uji Titik $(0,0)$:** Substitusikan $x = 0$ dan $y = 0$ ke pertidaksamaan awal.
       * Jika hasilnya **BENAR**: arsir daerah yang memuat titik $(0,0)$.
       * Jika hasilnya **SALAH**: arsir daerah berlawanan yang menjauhi titik $(0,0)$.
       * *Catatan Kaki:* Jika garis batas tepat melewati $(0,0)$, pilih titik uji lain di luar garis seperti $(1,0)$ atau $(0,1)$.
* **Arahan Animasi:** Tampilkan dua kartu berdampingan (perbandingan gaya garis utuh vs putus-putus), lalu animasikan efek *ripple/ping* pada titik asal $(0,0)$ di bidang Kartesius mini.

---

### Scene 5: Latihan Soal PtLDV (Soal 3 & Soal 4)
* **Durasi Saran:** `30 detik` (`900 frames` — masing-masing soal `15 detik`)
* **Urutan Animasi per Grafik (Wajib):**
  1. Munculkan bidang Kartesius sesuai `viewport` dari `mathData.ts`.
  2. Munculkan titik potong sumbu $Y$ dan sumbu $X$ dengan label koordinat.
  3. Tarik garis pembatas penuh dari ujung ke ujung *viewport* menggunakan animasi `strokeDashoffset` (sesuai `lineStyle`).
  4. Tampilkan titik uji $(0,0)$, substitusi aljabar, lalu munculkan lencana **BENAR** (hijau) atau **SALAH** (merah).
  5. Sapukan (*fade/clip reveal*) poligon DHP dari `dhpPolygon` secara penuh sampai ke tepi *viewport* tanpa ada area yang terpotong.

#### Soal 3: PtLDV Garis Utuh
* **Soal:** Tentukan DHP dari $2x + 5y \le 10$
* **Titik Potong:**
  * Saat $x = 0 \implies 5y = 10 \implies y = 2$, diperoleh $(0,2)$.
  * Saat $y = 0 \implies 2x = 10 \implies x = 5$, diperoleh $(5,0)$.
* **Jenis Garis:** Garis **utuh** (*solid*) karena tanda $\le$.
* **Uji Titik $(0,0)$:** $2(0) + 5(0) \le 10 \implies 0 \le 10$ (**BENAR**).
* **Kesimpulan DHP:** Arsir penuh daerah bawah-kiri garis yang memuat titik $(0,0)$ pada *viewport* $x \in [-2, 7], y \in [-2, 4]$.

#### Soal 4: PtLDV Garis Putus-putus
* **Soal:** Tentukan DHP dari $4x - 3y \gt 12$
* **Titik Potong:**
  * Saat $x = 0 \implies -3y = 12 \implies y = -4$, diperoleh $(0,-4)$.
  * Saat $y = 0 \implies 4x = 12 \implies x = 3$, diperoleh $(3,0)$.
* **Jenis Garis:** Garis **putus-putus** (*dashed*) karena tanda $\gt$.
* **Uji Titik $(0,0)$:** $4(0) - 3(0) \gt 12 \implies 0 \gt 12$ (**SALAH**).
* **Kesimpulan DHP:** Arsir penuh daerah kanan-bawah garis yang menjauhi titik $(0,0)$ pada *viewport* $x \in [-2, 7], y \in [-6, 5]$ (memastikan area $x \lt 3$ di bawah garis ikut terarsir penuh).

---

### Scene 6: Aplikasi Sistem PtLDV (Soal 5 — Pengantar Program Linear)
* **Durasi Saran:** `14 detik` (`420 frames`)
* **Soal:** Tentukan DHP dari sistem pertidaksamaan:
  $$x + y \ge 4; \quad x \ge 0; \quad y \ge 0$$
* **Langkah Penyelesaian:**
  1. **Pembatas Kuadran:** Syarat $x \ge 0$ (kanan sumbu $Y$) dan $y \ge 0$ (atas sumbu $X$) mengunci daerah penyelesaian final agar **hanya berada di Kuadran I**.
  2. **Titik Potong $x + y = 4$:** Sumbu $Y$ di $(0,4)$ dan sumbu $X$ di $(4,0)$.
  3. **Jenis Garis:** Semua garis pembatas menggunakan **garis utuh** (*solid*) karena bertanda $\ge$.
  4. **Uji Titik $(0,0)$ untuk $x + y \ge 4$:** $0 + 0 \ge 4 \implies 0 \ge 4$ (**SALAH**).
  5. **Kesimpulan DHP:** Daerah irisan berada di sebelah atas-kanan garis $(0,4)$–$(4,0)$, dibatasi ketat oleh sumbu $X$ positif dan sumbu $Y$ positif di Kuadran I.
* **Arahan Animasi:** Gunakan array `layerPolygons` di `mathData.ts` untuk memunculkan ketiga arsiran secara bertahap dengan opasitas rendah (`0.15`), lalu redupkan area luar dan sorot tajam `dhpPolygon` sebagai irisan DHP final di Kuadran I.

---

## 3. Checklist Verifikasi Sebelum Render Akhir

1. Semua rumus dirender via KaTeX tanpa teks LaTeX mentah yang bocor ke layar.
2. Pada semua grafik PtLSV, titik batas (bulatan penuh/kosong) diletakkan tepat di nilai `boundaryValue`, bukan di ujung rentang sumbu.
3. Pada semua grafik PtLDV, garis pembatas direntangkan dari `lineSegmentInViewport[0]` hingga `lineSegmentInViewport[1]` dan arsiran menggunakan `dhpPolygon` yang sudah di-*clip* presisi terhadap *viewport*.
4. Rasio aspek koordinat sumbu $X$ dan $Y$ di SVG dikalkulasi melalui helper `mapMathToSvg()` di `mathData.ts` agar sudut kemiringan garis tidak terdistorsi.
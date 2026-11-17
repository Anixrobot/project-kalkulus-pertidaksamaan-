# Product Requirements Document (PRD) — V3.0 (Presenter Solo Intro & Camera Zoom Edition)
**Project:** Video Pembelajaran Matematika — Pertidaksamaan (Full 60 Menit)  
**Workspace Path:** `project kalkulus/pertidaksamaan-video`  
**Target Durasi:** $60\text{ Menit}$ ($3600\text{ Detik}$ / $108.000\text{ Frames}$ @ $30\text{ FPS}$)  
**Resolusi Output:** Full HD $1920 \times 1080$ (`H.264 MP4` untuk YouTube)  
**Tech Stack:** Remotion 4.x, React 18, TypeScript, Inline/Tailwind CSS, KaTeX, Lucide React  

---

## 1. Spesifikasi Baru V3.0: Scene Intro Khusus Pemateri (Solo Center & Zoom-In)
Sesuai revisi terbaru, sebelum masing-masing pemateri menjelaskan materi di papan tulis, wajib ada **Scene Intro Pemateri** dengan aturan visual mutlak berikut:
1. **TANPA PAPAN TULIS (No Chalkboard):** Papan tulis kayu **tidak ditampilkan sama sekali** pada scene intro pemateri. Latar belakang murni menampilkan dinding kelas *Nature Green* dengan pencahayaan *spotlight* lembut dan aksen jendela/tanaman kelas.
2. **Posisi Pemateri di Tengah (Center Stage):** Hanya menampilkan **1 karakter pemateri aktif** yang berdiri tepat di tengah layar (`center`).
3. **Animasi Kamera Zoom-In ke Pemateri:** Menggunakan `interpolate` / `spring` Remotion, kamera melakukan gerakan **Zoom-In halus** dari skala `1.08` menuju `1.38` terfokus ke arah tengah badan/wajah pemateri, sehingga penonton fokus penuh pada perkenalan pemateri dan pengantar topik yang akan dibawakan.
4. **Diterapkan untuk Keempat Pemateri Tepat Sebelum Materi Mereka:**
   - **`Scene02A-IntroRafie` (Menit 02:00 – 03:00):** Rafie Armansyah tampil sendirian di tengah layar + kamera *zoom-in* memperkenalkan diri dan membuka materi **Pertidaksamaan Linear (PLSV & PLDV)**.
   - **`Scene06A-IntroIkhsan` (Menit 16:00 – 17:00):** Ikhsan tampil sendirian di tengah layar + kamera *zoom-in* memperkenalkan diri dan membuka materi **Pertidaksamaan Rasional (Pecahan)**.
   - **`Scene08A-IntroPras` (Menit 31:00 – 32:00):** Pras tampil sendirian di tengah layar + kamera *zoom-in* memperkenalkan diri dan membuka materi **Pertidaksamaan Irasional (Bentuk Akar)**.
   - **`Scene10A-IntroDimas` (Menit 45:00 – 46:00):** Dimas tampil sendirian di tengah layar + kamera *zoom-in* memperkenalkan diri dan membuka materi **Pertidaksamaan Nilai Mutlak**.

---

## 2. Daftar Lengkap 20 Scene Komposisi (`1-Render-Per-Scene`) — Total 60 Menit

Seluruh 20 scene di bawah ini wajib terdaftar di `src/Root.tsx` di dalam folder `1-Render-Per-Scene`:

| No | ID Komposisi Remotion | Pemateri | Mode Visual | Rentang Menit | Durasi | Frames (30 FPS) |
|---|---|---|---|---|---|---|
| 1 | `Scene01-Intro` | Semua (4 Karakter) | Kelas & Papan Tulis | `00.0 – 02.0` | $2.0\text{ mnt}$ | $3.600\text{ frames}$ |
| 2 | **`Scene02A-IntroRafie`** | **Rafie (Solo Tengah)** | **ZOOM PEMATERI (Tanpa Papan Tulis)** | `02.0 – 03.0` | $1.0\text{ mnt}$ | $1.800\text{ frames}$ |
| 3 | `Scene02-HukumFundamental` | Rafie | Papan Tulis + Garis Bilangan | `03.0 – 05.5` | $2.5\text{ mnt}$ | $4.500\text{ frames}$ |
| 4 | `Scene03-KonsepPLSV` | Rafie | Papan Tulis + Garis Bilangan | `05.5 – 08.0` | $2.5\text{ mnt}$ | $4.500\text{ frames}$ |
| 5 | `Scene04-KonsepPLDV` | Rafie | Papan Tulis + Grafik Kartesius | `08.0 – 11.0` | $3.0\text{ mnt}$ | $5.400\text{ frames}$ |
| 6 | `Scene05A-SoalPLSV` | Rafie | Papan Tulis + Soal 1 & 2 Linear | `11.0 – 13.5` | $2.5\text{ mnt}$ | $4.500\text{ frames}$ |
| 7 | `Scene05B-SoalPLDV` | Rafie | Papan Tulis + Soal 3, 4, 5 Linear | `13.5 – 16.0` | $2.5\text{ mnt}$ | $4.500\text{ frames}$ |
| 8 | **`Scene06A-IntroIkhsan`** | **Ikhsan (Solo Tengah)** | **ZOOM PEMATERI (Tanpa Papan Tulis)** | `16.0 – 17.0` | $1.0\text{ mnt}$ | $1.800\text{ frames}$ |
| 9 | `Scene06-KonsepRasional` | Ikhsan | Papan Tulis + Tabel Uji Tanda | `17.0 – 20.5` | $3.5\text{ mnt}$ | $6.300\text{ frames}$ |
| 10 | `Scene07A-SoalRasional123` | Ikhsan | Papan Tulis + Soal 1, 2, 3 Rasional | `20.5 – 25.5` | $5.0\text{ mnt}$ | $9.000\text{ frames}$ |
| 11 | `Scene07B-SoalRasional45` | Ikhsan | Papan Tulis + Soal 4 & 5 Rasional | `25.5 – 31.0` | $5.5\text{ mnt}$ | $9.900\text{ frames}$ |
| 12 | **`Scene08A-IntroPras`** | **Pras (Solo Tengah)** | **ZOOM PEMATERI (Tanpa Papan Tulis)** | `31.0 – 32.0` | $1.0\text{ mnt}$ | $1.800\text{ frames}$ |
| 13 | `Scene08-KonsepIrasional` | Pras | Papan Tulis + Syarat Numerus | `32.0 – 36.0` | $4.0\text{ mnt}$ | $7.200\text{ frames}$ |
| 14 | `Scene09A-SoalIrasional12` | Pras | Papan Tulis + Soal 1 & 2 Irasional | `36.0 – 40.5` | $4.5\text{ mnt}$ | $8.100\text{ frames}$ |
| 15 | `Scene09B-SoalIrasional345` | Pras | Papan Tulis + Soal 3, 4, 5 Irasional | `40.5 – 45.0` | $4.5\text{ mnt}$ | $8.100\text{ frames}$ |
| 16 | **`Scene10A-IntroDimas`** | **Dimas (Solo Tengah)** | **ZOOM PEMATERI (Tanpa Papan Tulis)** | `45.0 – 46.0` | $1.0\text{ mnt}$ | $1.800\text{ frames}$ |
| 17 | `Scene10-KonsepMutlak` | Dimas | Papan Tulis + Tabel Sifat Mutlak | `46.0 – 49.5` | $3.5\text{ mnt}$ | $6.300\text{ frames}$ |
| 18 | `Scene11A-SoalMutlak12` | Dimas | Papan Tulis + Soal 1 & 2 Mutlak | `49.5 – 53.5` | $4.0\text{ mnt}$ | $7.200\text{ frames}$ |
| 19 | `Scene11B-SoalMutlak345` | Dimas | Papan Tulis + Soal 3, 4, 5 Mutlak | `53.5 – 57.5` | $4.0\text{ mnt}$ | $7.200\text{ frames}$ |
| 20 | `Scene12-ClosingSummary` | Rafie | Papan Tulis + Ringkasan 4 Cabang | `57.5 – 60.0` | $2.5\text{ mnt}$ | $4.500\text{ frames}$ |

---

## 3. Desain Layar `presenter-intro` (Tanpa Papan Tulis, Karakter di Tengah + Zoom-In)
Ketika `scene.visualType === 'presenter-intro'`:
- **Papan Tulis (`Chalkboard`) Dihilangkan:** Tidak boleh ada elemen papan tulis di belakang pemateri.
- **Latar Kelas Nature Green Bersih:** Hanya menampilkan dinding hijau alam, pencahayaan lembut di tengah (*radial spotlight*), jendela kiri, pintu kanan, dan lantai kelas.
- **Karakter Pemateri di Tengah (`Center`):** Karakter (`rafie`, `ikhsan`, `pras`, atau `dimas`) ditempatkan persis di tengah layar dengan ukuran besar dan proporsional.
- **Efek Kamera Zoom-In Halus:** Menggunakan frame aktif dari `useCurrentFrame()`, skala kamera untuk area pemateri membesar secara halus (`scale(1.06)` menuju `scale(1.34)`), memberi kesan kamera menyorot mendekati pemateri saat sedang menyapa penonton.
- **Badge Lower-Third Sinematik:** Di bagian bawah/samping karakter terdapat plakat kaca transparan elegan berisi nama lengkap pemateri, peran, dan judul besar materi yang akan dibahas (contoh: *"RAFIE ARMANSYAH — Materi 1: Pertidaksamaan Linear Satu & Dua Variabel"*).
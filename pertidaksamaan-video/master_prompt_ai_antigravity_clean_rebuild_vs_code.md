# MASTER PROMPT UNTUK AI ANTIGRAVITY (VS CODE)
**Instruksi Penggunaan:** Copy seluruh teks di dalam blok di bawah ini dan Paste langsung ke chat **AI Antigravity** di dalam workspace VS Code `project kalkulus/pertidaksamaan-video`.

---

## SALIN TEKS PROMPT DI BAWAH INI KE ANTIGRAVITY:

Halo Antigravity! Saya ingin kamu melakukan **CLEAN REBUILD (Bangun Ulang Total)** pada proyek Remotion di dalam folder `pertidaksamaan-video` ini agar 100% sama persis dengan arsitektur terbaru kami dan bebas dari error/konflik file lama.

Tolong kerjakan secara berurutan, mandiri, dan tuntas mengikuti langkah-langkah wajib di bawah ini:

### TAHAP 1: HAPUS FILE SCENE LAMA YANG KONFLIK
Di dalam `src/scenes/`, saat ini ada file versi lama seperti `Scene01_Opening.tsx`, `Scene02_Pendahuluan.tsx`, `Scene03_SifatLinier.tsx`, `Scene04_LinierSatuVariabel.tsx`, `Scene05_LinierDuaVariabel.tsx`, `Scene06_Kuadrat.tsx`, `Scene07_Irasional.tsx`, dan `Scene08_Penutup.tsx`.
1. **HAPUS SEMUA file `Scene01_...` sampai `Scene08_...` yang lama tersebut** (terutama `Scene06_Kuadrat.tsx` karena materi Kuadrat sudah diganti menjadi Rasional & Nilai Mutlak).
2. Pastikan tidak ada lagi import ke file-file lama tersebut di `src/scenes/FullVideo.tsx` maupun `src/Root.tsx`.

---

### TAHAP 2: BUAT MASTER DATA `src/data/scenesData.ts` (15 SCENE = 60 MENIT / 108.000 FRAMES)
Buat folder `src/data/` dan file `src/data/scenesData.ts` yang menampung konfigurasi penuh:
- `FPS = 30`, `TOTAL_MINUTES = 60`, `TOTAL_FRAMES = 108000`.
- Data 4 Karakter Pemateri (`CHARACTERS_INFO`):
  1. `ikhsan` (IKHSAN - Pemateri 2: Pertidaksamaan Rasional, rambut messy bowl cut berponi, kacamata bulat, kemeja batik di balik jas almamater biru muda polos `#7ec8f8`, memegang pointer).
  2. `rafie` (RAFIE - Moderator & Pemateri 1: Opening, PLSV, PLDV & Closing, rambut hitam rapi belah tengah, kacamata tipis, kemeja putih di balik jas almamater biru muda polos `#7ec8f8`, memegang tablet).
  3. `pras` (PRAS - Pemateri 3: Pertidaksamaan Irasional, rambut bergelombang tanpa kacamata, kaos polo gelap di balik jas almamater biru muda polos `#7ec8f8`, gestur tangan terbuka).
  4. `dimas` (DIMAS - Pemateri 4: Pertidaksamaan Nilai Mutlak, postur tegap berisi, rambut buzz cut, kaos hitam di balik jas almamater biru muda polos `#7ec8f8`).
- Data `SCENES_DATA` yang berisi **16 Komposisi Scene Berurutan** (total tepat 60 menit / 108.000 frames) lengkap dengan `steps` (masing-masing 3 langkah per scene), `voScript`, `visualType` (`intro-school` | `number-line` | `cartesian-pldv` | `sign-table` | `mutlak-table` | `concept-box` | `summary-master`), `numberLineConfig`, dan `cartesianConfig`:
  1. `Scene01_Intro` (`0` - `2` mnt, `3600` frames, presenter: `'all'`, Part 1): Intro Eksterior Gedung Sekolah & Suasana Kelas Pagi.
  2. `Scene02_HukumFundamental` (`2` - `5` mnt, `5400` frames, presenter: `'rafie'`, Part 1): Opening Moderator & Hukum Fundamental Pertidaksamaan (Kali/Bagi negatif balik tanda: `-2x < 6 => x > -3`).
  3. `Scene03_KonsepPLSV` (`5` - `8` mnt, `5400` frames, presenter: `'rafie'`, Part 1): Konsep PLSV (`2x - 4 >= 0 => x >= 2`, bulatan kosong vs penuh).
  4. `Scene04_KonsepPLDV` (`8` - `11` mnt, `5400` frames, presenter: `'rafie'`, Part 1): Konsep PLDV & Grafik 2D Kartesius (`2x + 5y <= 10`, titik potong `(0,2)` & `(5,0)`, uji titik `(0,0)`).
  5. `Scene05A_SoalPLSV` (`11` - `13.5` mnt, `4500` frames, presenter: `'rafie'`, Part 1): Pembahasan Contoh Soal 1 (`3(x - 2) + 4 < 5x - 6 => x > 2`) & Soal 2 (`(2x - 1)/3 - (x + 2)/2 >= 1 => x >= 14`).
  6. `Scene05B_SoalPLDV` (`13.5` - `16` mnt, `4500` frames, presenter: `'rafie'`, Part 1): Pembahasan Contoh Soal 3 (`2x + 5y <= 10`), Soal 4 (`4x - 3y > 12` garis putus-putus), & Soal 5 (`x + y >= 4; x >= 0; y >= 0`) + Transisi ke Ikhsan.
  7. `Scene06_KonsepRasional` (`16` - `20` mnt, `7200` frames, presenter: `'ikhsan'`, Part 2): Pengertian Pertidaksamaan Rasional `f(x)/g(x) > 0`, syarat mutlak `g(x) != 0`, titik kritis, dan Tabel Uji Tanda.
  8. `Scene07A_SoalRasional123` (`20` - `25.5` mnt, `9900` frames, presenter: `'ikhsan'`, Part 2): Contoh 1 `(x - 2)/(x + 1) >= 0 => HP = (-∞, -1) U [2, ∞)`, Contoh 2 `(x^2 - 4)/(x - 1) < 0 => HP = (-∞, -2) U (1, 2)`, Contoh 3 `(2x + 1)/(x - 3) <= 0 => HP = [-1/2, 3)`.
  9. `Scene07B_SoalRasional45` (`25.5` - `31` mnt, `9900` frames, presenter: `'ikhsan'`, Part 2): Contoh 4 `(x^2 - 9)/(x + 2) >= 0 => HP = [-3, -2) U [3, ∞)`, Contoh 5 Faktor Sama `(x^2 - x - 6)/(x^2 - 4) > 0 => HP = (-∞, -2) U (-2, 2) U (3, ∞)`, dan 4 Kesalahan Umum.
  10. `Scene08_KonsepIrasional` (`31` - `36` mnt, `9000` frames, presenter: `'pras'`, Part 3): Pengertian Pertidaksamaan Irasional (Bentuk Akar), Syarat Numerus `f(x) >= 0`, Hasil Akar `>= 0`, Bentuk I & II.
  11. `Scene09A_SoalIrasional12` (`36` - `40.5` mnt, `8100` frames, presenter: `'pras'`, Part 3): Contoh 1 Satu Akar `√(2x - 4) < 4 => HP = [2, 10)` dan Contoh 2 Dua Akar `√(x - 1) <= √(2x - 4) => HP = [3, ∞)`.
  12. `Scene09B_SoalIrasional345` (`40.5` - `45` mnt, `8100` frames, presenter: `'pras'`, Part 3): Contoh 3 `√(x - 3) < 2 => HP = [3, 7)`, Contoh 4 `√(2x + 1) >= √(x - 4) => HP = [4, ∞)`, Contoh 5 `√(x^2 - 4) <= x + 2 => HP = {-2} U [2, ∞)`.
  13. `Scene10_KonsepMutlak` (`45` - `49.5` mnt, `8100` frames, presenter: `'dimas'`, Part 4): Konsep Dasar Jarak Fisik `|x| >= 0`, Karakteristik Tanda `<` (mengumpul di tengah) vs `>` (memencar kiri-kanan), dan Tabel Rumus Cepat.
  14. `Scene11A_SoalMutlak12` (`49.5` - `53.5` mnt, `7200` frames, presenter: `'dimas'`, Part 4): Contoh 1 `|2x - 3| < 7 => -2 < x < 5` dan Contoh 2 `|3x + 2| >= 8 => x <= -10/3 atau x >= 2`.
  15. `Scene11B_SoalMutlak345` (`53.5` - `57.5` mnt, `7200` frames, presenter: `'dimas'`, Part 4): Contoh 3 `2|4 - x| - 3 <= 5 => 0 <= x <= 8`, Contoh 4 `|2x - 1| > |x + 4| => x < -1 atau x > 5`, Contoh 5 & Evaluasi Kesalahan Umum `|x| < -5 => HP = Himpunan Kosong`.
  16. `Scene12_ClosingSummary` (`57.5` - `60` mnt, `4500` frames, presenter: `'rafie'`, Part 4): Closing & Ringkasan Master 4 Cabang Pertidaksamaan bersama seluruh tim.

---

### TAHAP 3: REBUILD KOMPONEN DI `src/components/`
Bangun ulang komponen-komponen berikut menggunakan React + TypeScript + Remotion (`useCurrentFrame`, `useVideoConfig`, `interpolate`, `spring`) tanpa ketergantungan eksternal yang rawan error:
1. `src/components/TeacherCharacter.tsx`:
   - Komponen SVG 2D Flat untuk keempat karakter (`ikhsan`, `rafie`, `pras`, `dimas`) dengan jas almamater biru muda polos (`#7ec8f8`), label nama di atas kepala, animasi mulut lip-sync halus berdasarkan `frame`, dan ayunan lengan lembut saat berbicara.
2. `src/components/NumberLine.tsx`:
   - Komponen SVG Garis Bilangan yang menerima `points` (bulatan kosong vs penuh), `shades` (arsiran hijau interval HP), `signs` (`+` dan `-`), dan `caption`.
3. `src/components/CartesianPlot.tsx`:
   - Komponen SVG Grafik Kartesius 2D untuk PLDV yang menampilkan grid, sumbu X & Y, garis utuh (`2x + 5y <= 10`) atau garis putus-putus (`4x - 3y > 12`), titik potong, uji titik `(0,0)`, dan arsiran Daerah Himpunan Penyelesaian (DHP).
4. `src/components/MathText.tsx`:
   - Komponen untuk menampilkan kotak rumus kapur di papan tulis, Tabel Uji Tanda Pecahan Rasional, Tabel Rumus Cepat Nilai Mutlak, serta matriks konsep.
5. `src/components/ClassroomStage.tsx`:
   - Layout ruang kelas **Nature Green** resolusi $1920 \times 1080$ yang berisi langit-langit berlampu 3 panel, dinding hijau `#7cb07a`, jendela kiri, tanaman, papan tulis kayu cokelat tua (`#1e4631` dengan border `#7c4d2b`), karakter pemateri aktif di kanan papan tulis (atau 4 karakter berjajar saat `presenter === 'all'`), dan bar subtitle Voice Over di bagian bawah.
   - Implementasikan strategi **Hold Frame**: ketika berpindah ke Step baru di papan tulis, jalankan animasi `spring`/`interpolate` hanya pada 25 frame pertama step tersebut, lalu kunci statis (*Hold Frame*) selama sisa durasi step.

---

### TAHAP 4: BUAT SCENE MODULAR DI `src/scenes/` & DAFTARKAN DI `src/Root.tsx`
1. Buat `src/scenes/GenericScene.tsx` yang menerima `sceneId` dan merender `ClassroomStage` berdasarkan data scene tersebut.
2. Buat `src/scenes/FullVideo.tsx` yang menggabungkan ke-16 scene secara berurutan menggunakan `<Series>` dari `remotion` (total $108.000\text{ frames}$), serta komponen `Part1Linear`, `Part2Rasional`, `Part3Irasional`, dan `Part4Mutlak`.
3. Di dalam `src/Root.tsx`, daftarkan:
   - `<Folder name="1-Render-Per-Scene">` berisi 16 `<Composition>` untuk masing-masing scene (`Scene01-Intro` s/d `Scene12-ClosingSummary`) dengan durasi frame masing-masing scene.
   - `<Folder name="2-Render-Per-Part">` berisi 4 `<Composition>` (`Part1-Linear-Rafie`, `Part2-Rasional-Ikhsan`, `Part3-Irasional-Pras`, `Part4-Mutlak-Dimas-Closing`).
   - `<Composition id="FullVideo" ... durationInFrames={108000} fps={30} width={1920} height={1080} />`.

---

### TAHAP 5: TAMBAHKAN SCRIPT RENDER PER SCENE DI `package.json` & `scripts/render-scenes.mjs`
Agar saya bisa mendownload/merender video per scene dengan ringan untuk di-upload ke YouTube:
1. Buat file `scripts/render-scenes.mjs` (Node.js script) yang merender ke-16 scene satu per satu ke dalam folder `out/scenes/Scene01-Intro.mp4` s/d `out/scenes/Scene12-ClosingSummary.mp4`, lalu otomatis membuat file `out/scenes/concat-list.txt` untuk digabung menggunakan FFmpeg.
2. Tambahkan script berikut di `package.json`:
   - `"start": "remotion studio"`
   - `"render:scenes": "node scripts/render-scenes.mjs"`
   - `"render:part1": "remotion render Part1-Linear-Rafie out/Part1_Linear_Rafie.mp4"`
   - `"render:part2": "remotion render Part2-Rasional-Ikhsan out/Part2_Rasional_Ikhsan.mp4"`
   - `"render:part3": "remotion render Part3-Irasional-Pras out/Part3_Irasional_Pras.mp4"`
   - `"render:part4": "remotion render Part4-Mutlak-Dimas-Closing out/Part4_Mutlak_Dimas.mp4"`
   - `"merge:youtube": "ffmpeg -f concat -safe 0 -i out/scenes/concat-list.txt -c copy out/FullVideo_60Menit_YouTube.mp4"`
3. Jalankan pengecekan TypeScript (`npx tsc --noEmit`) untuk memastikan **0 error**.
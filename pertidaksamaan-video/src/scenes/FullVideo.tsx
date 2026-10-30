import React from "react";
import { Series } from "remotion";
import { Scene01_Opening } from "./Scene01_Opening";
import { Scene02_Pendahuluan } from "./Scene02_Pendahuluan";
import { Scene03_SifatLinier } from "./Scene03_SifatLinier";
import { Scene04_LinierSatuVariabel } from "./Scene04_LinierSatuVariabel";
import { Scene05_LinierDuaVariabel } from "./Scene05_LinierDuaVariabel";
import { Scene06_Kuadrat } from "./Scene06_Kuadrat";
import { Scene07_Irasional } from "./Scene07_Irasional";
import { Scene08_Penutup } from "./Scene08_Penutup";

export const FullVideo: React.FC = () => {
  return (
    <Series>
      {/* 1. Pembukaan Kelas & Judul (6 detik = 360 frame @ 60 FPS) */}
      <Series.Sequence durationInFrames={360}>
        <Scene01_Opening />
      </Series.Sequence>

      {/* 2. Definisi & 5 Notasi Simbol (8 detik = 480 frame @ 60 FPS) */}
      <Series.Sequence durationInFrames={480}>
        <Scene02_Pendahuluan />
      </Series.Sequence>

      {/* 3. Sifat Operasi Pertidaksamaan (9 detik = 540 frame @ 60 FPS) */}
      <Series.Sequence durationInFrames={540}>
        <Scene03_SifatLinier />
      </Series.Sequence>

      {/* 4. Linier Satu Variabel & Contoh 01 (10 detik = 600 frame @ 60 FPS) */}
      <Series.Sequence durationInFrames={600}>
        <Scene04_LinierSatuVariabel />
      </Series.Sequence>

      {/* 5. Linier Dua Variabel, Kartesius & Contoh 02 (10 detik = 600 frame @ 60 FPS) */}
      <Series.Sequence durationInFrames={600}>
        <Scene05_LinierDuaVariabel />
      </Series.Sequence>

      {/* 6. Pertidaksamaan Kuadrat & Contoh 03 (11 detik = 660 frame @ 60 FPS) */}
      <Series.Sequence durationInFrames={660}>
        <Scene06_Kuadrat />
      </Series.Sequence>

      {/* 7. Pertidaksamaan Irasional & Contoh 04 (11 detik = 660 frame @ 60 FPS) */}
      <Series.Sequence durationInFrames={660}>
        <Scene07_Irasional />
      </Series.Sequence>

      {/* 8. Rangkuman Tips & Penutup (7 detik = 420 frame @ 60 FPS) */}
      <Series.Sequence durationInFrames={420}>
        <Scene08_Penutup />
      </Series.Sequence>
    </Series>
  );
};

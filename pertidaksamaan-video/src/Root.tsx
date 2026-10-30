import "./index.css";
import React from "react";
import { Composition, Folder } from "remotion";

// Master Video
import { FullVideo } from "./scenes/FullVideo";

// Individual Scenes
import { Scene01_Opening } from "./scenes/Scene01_Opening";
import { Scene02_Pendahuluan } from "./scenes/Scene02_Pendahuluan";
import { Scene03_SifatLinier } from "./scenes/Scene03_SifatLinier";
import { Scene04_LinierSatuVariabel } from "./scenes/Scene04_LinierSatuVariabel";
import { Scene05_LinierDuaVariabel } from "./scenes/Scene05_LinierDuaVariabel";
import { Scene06_Kuadrat } from "./scenes/Scene06_Kuadrat";
import { Scene07_Irasional } from "./scenes/Scene07_Irasional";
import { Scene08_Penutup } from "./scenes/Scene08_Penutup";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Komposisi Video Lengkap (Ultra Smooth 60 FPS - 4320 frame / 72 detik) */}
      <Composition
        id="VideoPertidaksamaanLengkap"
        component={FullVideo}
        durationInFrames={4320}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Folder Per-Scene (Masing-masing 60 FPS) */}
      <Folder name="Scenes-Pembelajaran">
        <Composition
          id="01-Opening-Kelas"
          component={Scene01_Opening}
          durationInFrames={360}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="02-Pendahuluan-Notasi"
          component={Scene02_Pendahuluan}
          durationInFrames={480}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="03-Sifat-Operasi"
          component={Scene03_SifatLinier}
          durationInFrames={540}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="04-Linier-Satu-Variabel"
          component={Scene04_LinierSatuVariabel}
          durationInFrames={600}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="05-Linier-Dua-Variabel"
          component={Scene05_LinierDuaVariabel}
          durationInFrames={600}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="06-Pertidaksamaan-Kuadrat"
          component={Scene06_Kuadrat}
          durationInFrames={660}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="07-Pertidaksamaan-Irasional"
          component={Scene07_Irasional}
          durationInFrames={660}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="08-Rangkuman-Penutup"
          component={Scene08_Penutup}
          durationInFrames={420}
          fps={60}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};

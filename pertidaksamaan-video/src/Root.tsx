import React from 'react';
import './index.css';
import { Composition, Folder } from 'remotion';
import { SCENES_DATA, FPS } from './data/scenesData';
import { ClassroomStage } from './components/ClassroomStage';
import {
  FullVideo,
  Part1Linear,
  Part2Rasional,
  Part3Irasional,
  Part4Mutlak,
  getSceneDuration,
  getPartDuration,
  getTotalDuration,
} from './scenes/FullVideo';
import {
  RasionalScene1_Konsep,
  Scene07A_Rasional_Soal1,
  Scene07D_Rasional_Soal4,
} from './scenes/rasional';
import {
  IrasionalScene1_Konsep,
  Scene09A_Irasional_Soal1,
  Scene09B_Irasional_Soal2,
} from './scenes/irasional';
import {
  MutlakScene1_Konsep,
  Scene11A_Mutlak_Soal1,
  Scene11B_Mutlak_Soal2,
} from './scenes/mutlak';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── KOMPOSISI 28 SCENE MODULAR V4.1 (1-RENDER-PER-SCENE) ── */}
      <Folder name="1-Render-Per-Scene">
        {SCENES_DATA.map((sc) => {
          const durationInFrames = getSceneDuration(sc);
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

      {/* ── KOMPOSISI PER-SEGMEN PEMATERI (4 SEGMEN UTAMA KELOMPOK) ── */}
      <Folder name="2-Render-Per-Part">
        <Composition
          id="Part1-Linear-Rafie"
          component={Part1Linear}
          durationInFrames={getPartDuration(1)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Part2-Rasional-Ikhsan"
          component={Part2Rasional}
          durationInFrames={getPartDuration(2)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Part3-Irasional-Pras"
          component={Part3Irasional}
          durationInFrames={getPartDuration(3)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Part4-Mutlak-Dimas-Closing"
          component={Part4Mutlak}
          durationInFrames={getPartDuration(4)}
          fps={FPS}
          width={1920}
          height={1080}
        />

        {/* ── ALIAS V4.1 SEGMEN SESUAI PRD ── */}
        <Composition
          id="Segmen1-Rafie-Linear-Full"
          component={Part1Linear}
          durationInFrames={getPartDuration(1)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Segmen2-Ikhsan-Rasional-Full"
          component={Part2Rasional}
          durationInFrames={getPartDuration(2)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Segmen3-Pras-Irasional-Full"
          component={Part3Irasional}
          durationInFrames={getPartDuration(3)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Segmen4-Dimas-Mutlak-Full"
          component={Part4Mutlak}
          durationInFrames={getPartDuration(4)}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>

      {/* ── ALIAS KOMPOSISI LAMA UNTUK BACKWARD-COMPATIBILITY ── */}
      <Folder name="Legacy-Scene-Aliases">
        <Composition
          id="Scene06-KonsepRasional"
          component={RasionalScene1_Konsep}
          durationInFrames={1500}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene07A-SoalRasional123"
          component={Scene07A_Rasional_Soal1}
          durationInFrames={1050}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene07B-SoalRasional45"
          component={Scene07D_Rasional_Soal4}
          durationInFrames={1050}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene08-KonsepIrasional"
          component={IrasionalScene1_Konsep}
          durationInFrames={1500}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene09A-SoalIrasional12"
          component={Scene09A_Irasional_Soal1}
          durationInFrames={1050}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene09B-SoalIrasional345"
          component={Scene09B_Irasional_Soal2}
          durationInFrames={1200}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene10-KonsepMutlak"
          component={MutlakScene1_Konsep}
          durationInFrames={1500}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene11A-SoalMutlak12"
          component={Scene11A_Mutlak_Soal1}
          durationInFrames={1050}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene11B-SoalMutlak345"
          component={Scene11B_Mutlak_Soal2}
          durationInFrames={1050}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>

      {/* ── FULL VIDEO UTUH GABUNGAN 4 SEGMEN ── */}
      <Composition
        id="FullVideo"
        component={FullVideo}
        durationInFrames={getTotalDuration()}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};

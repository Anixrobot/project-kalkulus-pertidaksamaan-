import React from 'react';
import { Series } from 'remotion';
import { ClassroomStage } from '../../components/ClassroomStage';
import { SCENES_DATA } from '../../data/scenesData';
import { LinearScene1_IntroAturanMutlak } from './LinearScene1_IntroAturanMutlak';
import { LinearScene2_KonsepPtLSV } from './LinearScene2_KonsepPtLSV';
import { LinearScene3_LatihanPtLSV } from './LinearScene3_LatihanPtLSV';
import { LinearScene4_KonsepPtLDV } from './LinearScene4_KonsepPtLDV';
import { LinearScene5_LatihanPtLDV } from './LinearScene5_LatihanPtLDV';
import { LinearScene6_SistemPtLDV } from './LinearScene6_SistemPtLDV';

export const LINEAR_SUB_SCENES_DURATIONS = {
  introSolo: 1800, // 60 dtk (Scene02A-IntroRafie)
  scene1: 360,     // 12 dtk
  scene2: 540,     // 18 dtk
  scene3: 900,     // 30 dtk
  scene4: 480,     // 16 dtk
  scene5: 900,     // 30 dtk
  scene6: 420,     // 14 dtk
};

export const SEGMEN1_TOTAL_FRAMES =
  LINEAR_SUB_SCENES_DURATIONS.introSolo +
  LINEAR_SUB_SCENES_DURATIONS.scene1 +
  LINEAR_SUB_SCENES_DURATIONS.scene2 +
  LINEAR_SUB_SCENES_DURATIONS.scene3 +
  LINEAR_SUB_SCENES_DURATIONS.scene4 +
  LINEAR_SUB_SCENES_DURATIONS.scene5 +
  LINEAR_SUB_SCENES_DURATIONS.scene6; // 5400 frames

/**
 * Segmen 1 Penuh (Rafie — Pertidaksamaan Linear PtLSV & PtLDV)
 * Menggabungkan Intro Solo Rafie + 6 Sub-Scene Linear V4.0 secara berurutan.
 */
export const Segmen1_Linear_Full: React.FC = () => {
  const introScene = SCENES_DATA.find((s) => s.compId === 'Scene02A-IntroRafie');

  return (
    <Series>
      {introScene && (
        <Series.Sequence durationInFrames={LINEAR_SUB_SCENES_DURATIONS.introSolo}>
          <ClassroomStage scene={introScene} />
        </Series.Sequence>
      )}
      <Series.Sequence durationInFrames={LINEAR_SUB_SCENES_DURATIONS.scene1}>
        <LinearScene1_IntroAturanMutlak />
      </Series.Sequence>
      <Series.Sequence durationInFrames={LINEAR_SUB_SCENES_DURATIONS.scene2}>
        <LinearScene2_KonsepPtLSV />
      </Series.Sequence>
      <Series.Sequence durationInFrames={LINEAR_SUB_SCENES_DURATIONS.scene3}>
        <LinearScene3_LatihanPtLSV />
      </Series.Sequence>
      <Series.Sequence durationInFrames={LINEAR_SUB_SCENES_DURATIONS.scene4}>
        <LinearScene4_KonsepPtLDV />
      </Series.Sequence>
      <Series.Sequence durationInFrames={LINEAR_SUB_SCENES_DURATIONS.scene5}>
        <LinearScene5_LatihanPtLDV />
      </Series.Sequence>
      <Series.Sequence durationInFrames={LINEAR_SUB_SCENES_DURATIONS.scene6}>
        <LinearScene6_SistemPtLDV />
      </Series.Sequence>
    </Series>
  );
};

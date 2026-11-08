import React from 'react';
import { Composition, Folder } from 'remotion';
import { SCENES_DATA, FPS, TOTAL_FRAMES } from './data/scenesData';
import { ClassroomStage } from './components/ClassroomStage';
import {
  FullVideo,
  Part1Linear,
  Part2Rasional,
  Part3Irasional,
  Part4Mutlak
} from './scenes/FullVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="1-Render-Per-Scene">
        {SCENES_DATA.map((sc) => {
          const durationInFrames = Math.round((sc.endMin - sc.startMin) * 60 * FPS);
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

      <Folder name="2-Render-Per-Part">
        <Composition
          id="Part1-Linear-Rafie"
          component={Part1Linear}
          durationInFrames={16 * 60 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Part2-Rasional-Ikhsan"
          component={Part2Rasional}
          durationInFrames={15 * 60 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Part3-Irasional-Pras"
          component={Part3Irasional}
          durationInFrames={14 * 60 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Part4-Mutlak-Dimas-Closing"
          component={Part4Mutlak}
          durationInFrames={15 * 60 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>

      <Composition
        id="FullVideo"
        component={FullVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};

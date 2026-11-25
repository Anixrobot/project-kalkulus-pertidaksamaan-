import React from 'react';
import { Series } from 'remotion';
import { SCENES_DATA, FPS } from '../data/scenesData';
import { ClassroomStage } from '../components/ClassroomStage';

export const getSceneDuration = (sc: typeof SCENES_DATA[0]): number => {
  return sc.durationFrames ?? Math.round((sc.endMin - sc.startMin) * 60 * FPS);
};

export const getPartDuration = (partNumber: number): number => {
  return SCENES_DATA.filter((s) => s.part === partNumber).reduce(
    (acc, sc) => acc + getSceneDuration(sc),
    0
  );
};

export const getTotalDuration = (): number => {
  return SCENES_DATA.reduce((acc, sc) => acc + getSceneDuration(sc), 0);
};

export const PartSequence: React.FC<{ partNumber?: number }> = ({ partNumber }) => {
  const scenes = partNumber
    ? SCENES_DATA.filter((s) => s.part === partNumber)
    : SCENES_DATA;

  return (
    <Series>
      {scenes.map((sc) => {
        const durationInFrames = getSceneDuration(sc);
        return (
          <Series.Sequence key={sc.id} durationInFrames={durationInFrames}>
            <ClassroomStage scene={sc} />
          </Series.Sequence>
        );
      })}
    </Series>
  );
};

export const FullVideo: React.FC = () => <PartSequence />;
export const Part1Linear: React.FC = () => <PartSequence partNumber={1} />;
export const Part2Rasional: React.FC = () => <PartSequence partNumber={2} />;
export const Part3Irasional: React.FC = () => <PartSequence partNumber={3} />;
export const Part4Mutlak: React.FC = () => <PartSequence partNumber={4} />;

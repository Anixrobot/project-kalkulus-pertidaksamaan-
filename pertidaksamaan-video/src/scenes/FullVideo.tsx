import React from 'react';
import { Series } from 'remotion';
import { SCENES_DATA, FPS } from '../data/scenesData';
import { ClassroomStage } from '../components/ClassroomStage';

export const PartSequence: React.FC<{ partNumber?: number }> = ({ partNumber }) => {
  const scenes = partNumber
    ? SCENES_DATA.filter((s) => s.part === partNumber)
    : SCENES_DATA;

  return (
    <Series>
      {scenes.map((sc) => {
        const durationInFrames = Math.round((sc.endMin - sc.startMin) * 60 * FPS);
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

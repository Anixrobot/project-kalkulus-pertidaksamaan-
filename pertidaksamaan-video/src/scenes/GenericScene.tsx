import React from 'react';
import { SCENES_DATA } from '../data/scenesData';
import { ClassroomStage } from '../components/ClassroomStage';

export const GenericScene: React.FC<{ sceneId: string }> = ({ sceneId }) => {
  const scene = SCENES_DATA.find((s) => s.id === sceneId) || SCENES_DATA[0];
  return <ClassroomStage scene={scene} />;
};

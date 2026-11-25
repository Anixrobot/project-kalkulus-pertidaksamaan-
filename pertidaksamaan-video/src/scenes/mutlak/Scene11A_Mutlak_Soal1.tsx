import React from 'react';
import { MUTLAK_PROBLEMS } from '../../data/mutlakData';
import { MutlakProblemScene } from './MutlakProblemScene';

export const Scene11A_Mutlak_Soal1: React.FC = () => {
  return <MutlakProblemScene problem={MUTLAK_PROBLEMS[0]} />;
};

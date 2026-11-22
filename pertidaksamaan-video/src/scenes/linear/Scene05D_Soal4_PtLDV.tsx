import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { CartesianPlane2D } from '../../components/math-v4/CartesianPlane2D';
import { StepStepperList } from '../../components/math-v4/StepStepperList';
import { PTLDV_DATA } from '../../data/mathData';

export interface LinearSceneProps {
  durationInFrames?: number;
}

/**
 * Scene05D_Soal4_PtLDV
 * Pembahasan Soal 4: 4x - 3y > 12 (Garis Putus-putus Dashed & Uji Asal SALAH)
 * Memastikan area x < 3 di bawah garis ikut terarsir penuh via dhpPolygon.
 */
export const Scene05D_Soal4_PtLDV: React.FC<LinearSceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const prob = PTLDV_DATA[1]; // soal-4 (4x - 3y > 12)

  const steps = [
    { latex: '4x - 3y = 12', note: 'Ubah ke persamaan garis pembatas' },
    { latex: '(0, -4) \\;\\text{dan}\\; (3, 0)', note: 'Titik potong sumbu: x=0 -> y=-4, y=0 -> x=3' },
    { latex: '\\text{Garis Putus-putus (Dashed) } >', note: 'Tanda ketat (>): titik pada garis tidak ikut solusi' },
    { latex: '4(0) - 3(0) > 12 \\implies 0 > 12 \\; (\\text{SALAH})', note: 'Uji titik (0,0) menghasilkan SALAH -> arsir menjauhi (0,0)', isAlert: true },
    { latex: '\\text{DHP: Arsir daerah kanan-bawah garis}', note: 'Arsir penuh daerah seberang menjauhi titik (0,0)' },
  ];

  const framesPerStep = Math.max(1, Math.floor(durationInFrames / steps.length));
  const activeStepIndex = Math.min(steps.length - 1, Math.floor(frame / framesPerStep));

  const leftContent = (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Header Soal (Badge & Judul Dipisah Rapi) */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[9.5px] font-bold text-rose-400 border border-rose-500/30 shrink-0">
            SOAL 4
          </span>
          <span className="text-[10.5px] font-bold text-slate-200 truncate">
            {prob.subtitle}
          </span>
        </div>
        <div className="rounded-lg bg-slate-900/90 px-2 py-1 border border-slate-700/60 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-semibold">Tentukan DHP dari:</span>
          <MathFormula math={prob.problemLatex} fontSize={13} color="#f43f5e" />
        </div>
      </div>

      {/* Alur Langkah Aljabar Ber-Step */}
      <StepStepperList
        steps={steps}
        activeStepIndex={activeStepIndex}
        accentColor="#f43f5e"
      />

      {/* Kesimpulan DHP */}
      <div className="rounded-xl border border-rose-500/50 bg-rose-950/20 px-2 py-1.5 text-[9.5px] text-slate-300">
        <span className="font-bold text-rose-400">Kesimpulan DHP: </span>
        {prob.testOrigin.conclusion}
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col items-center justify-center w-full">
      <CartesianPlane2D
        viewport={prob.viewport}
        intercepts={prob.intercepts}
        lineEquationLatex={prob.lineEquationLatex}
        lineStyle={prob.lineStyle}
        lineSegmentInViewport={prob.lineSegmentInViewport}
        testOrigin={prob.testOrigin}
        dhpColor={prob.dhpColor}
        lineColor={prob.lineColor}
        dhpPolygon={prob.dhpPolygon}
        width={320}
        height={250}
        startFrame={0}
      />
    </div>
  );

  return (
    <SmartboardShell
      title="Pembahasan Soal 4: PtLDV Garis Putus-putus"
      subtitle={prob.subtitle}
      badge="PtLDV • SOAL 4"
      stepBadge={`Langkah ${activeStepIndex + 1} / ${steps.length}`}
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

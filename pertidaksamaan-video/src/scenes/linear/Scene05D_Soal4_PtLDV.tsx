import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
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
 * Sinkron 1:1 dengan CartesianPlane2D 5 tahap & anti-spoiler kesimpulan.
 */
export const Scene05D_Soal4_PtLDV: React.FC<LinearSceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const prob = PTLDV_DATA[1]; // soal-4 (4x - 3y > 12)

  const steps = [
    { latex: '4x - 3y = 12', note: 'Ubah tanda > menjadi = untuk garis pembatas' },
    {
      latex: 'x=0 \\to y=-4\\,(0,-4),\\;\\; y=0 \\to x=3\\,(3,0)',
      note: 'Cari titik potong: x=0 -> -3y=12 (y=-4), y=0 -> 4x=12 (x=3)',
    },
    {
      latex: '\\text{Garis Putus-putus (Dashed)} \\;>',
      note: 'Tanda ketat (>): titik pada garis tidak ikut solusi',
    },
    {
      latex: '4(0) - 3(0) > 12 \\implies 0 > 12 \\;(\\text{SALAH})',
      note: 'Uji (0,0) SALAH -> arsir area seberang menjauhi (0,0)',
      isAlert: true,
    },
    {
      latex: '\\text{DHP: Daerah kanan-bawah menjauhi } (0,0)',
      note: 'Arsir penuh sisi kanan-bawah garis (termasuk area x < 3)',
    },
  ];

  // Langkah 1..4 mendapat porsi seimbang di 0..78%, Langkah 5 & Kesimpulan DHP di 78%..100%
  const finalStepStart = Math.floor(durationInFrames * 0.78);
  const framesPerStep = Math.max(1, Math.floor(finalStepStart / 4));
  const isFinalStepReached = frame >= finalStepStart;
  const activeStepIndex = isFinalStepReached
    ? 4
    : Math.min(3, Math.floor(frame / framesPerStep));
  const stepStartFrame = isFinalStepReached
    ? finalStepStart
    : activeStepIndex * framesPerStep;

  const conclusionSpring = isFinalStepReached
    ? spring({
        frame: frame - finalStepStart,
        fps,
        config: { damping: 14, stiffness: 85 },
      })
    : 0;

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
        <div className="rounded-lg bg-slate-900/90 px-2 py-1 border border-slate-700/60 flex items-center justify-between gap-2">
          <span className="text-[10px] text-slate-400 font-semibold shrink-0">Tentukan DHP dari:</span>
          <MathFormula math={prob.problemLatex} fontSize={12.5} color="#f43f5e" />
        </div>
      </div>

      {/* Alur Langkah Aljabar Ber-Step */}
      <StepStepperList
        steps={steps}
        activeStepIndex={activeStepIndex}
        accentColor="#f43f5e"
      />

      {/* Kesimpulan DHP (Anti-Spoiler: tampil hanya pada Langkah 5) */}
      <div
        className="rounded-xl border border-rose-500/60 px-2 py-1.5 text-[9.5px] text-slate-100"
        style={{
          backgroundColor: '#3b1120',
          opacity: isFinalStepReached ? conclusionSpring : 0,
          transform: `translateY(${(1 - conclusionSpring) * 6}px)`,
        }}
      >
        <span className="font-bold text-rose-300">Kesimpulan DHP: </span>
        <span style={{ color: '#fecdd3' }}>{prob.testOrigin.conclusion}</span>
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
        height={245}
        activeStep={activeStepIndex + 1}
        stepStartFrame={stepStartFrame}
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

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
 * Scene05E_Soal5_SistemPtLDV
 * Pembahasan Soal 5: x + y >= 4; x >= 0; y >= 0 (Sistem PtLDV Kuadran I)
 * Sinkron 1:1 dengan layerPolygons bertahap lalu menyorot dhpPolygon di Kuadran I (anti-spoiler).
 */
export const Scene05E_Soal5_SistemPtLDV: React.FC<LinearSceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const prob = PTLDV_DATA[2]; // soal-5

  const steps = [
    {
      latex: 'x \\ge 0 \\quad\\text{dan}\\quad y \\ge 0',
      note: 'Syarat non-negatif: solusi terkunci ketat hanya di Kuadran I',
    },
    {
      latex: 'x=0 \\to y=4\\,(0,4),\\;\\; y=0 \\to x=4\\,(4,0)',
      note: 'Cari titik potong x + y = 4: x=0 -> y=4, y=0 -> x=4',
    },
    {
      latex: '\\text{Garis Lurus Utuh (Solid)} \\;\\ge',
      note: 'Tanda inklusif (>=): garis x + y = 4 ikut menjadi batas solusi',
    },
    {
      latex: '0 + 0 \\ge 4 \\implies 0 \\ge 4 \\;(\\text{SALAH})',
      note: 'Uji titik asal (0,0) SALAH -> arsir di atas-kanan garis',
      isAlert: true,
    },
    {
      latex: '\\text{DHP: Irisan Kuadran I di atas } x + y = 4',
      note: 'Irisan 3 pertidaksamaan diarsir tajam hanya di Kuadran I',
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
          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9.5px] font-bold text-emerald-400 border border-emerald-500/30 shrink-0">
            SOAL 5
          </span>
          <span className="text-[10.5px] font-bold text-slate-200 truncate">
            {prob.subtitle}
          </span>
        </div>
        <div className="rounded-lg bg-slate-900/90 px-2 py-1 border border-slate-700/60 flex items-center justify-between gap-2">
          <span className="text-[10px] text-slate-400 font-semibold shrink-0">Tentukan DHP Sistem:</span>
          <MathFormula math={prob.problemLatex} fontSize={11.5} color="#10b981" />
        </div>
      </div>

      {/* Alur Langkah Aljabar Ber-Step */}
      <StepStepperList
        steps={steps}
        activeStepIndex={activeStepIndex}
        accentColor="#10b981"
      />

      {/* Kesimpulan DHP Sistem (Anti-Spoiler: tampil hanya pada Langkah 5) */}
      <div
        className="rounded-xl border border-emerald-500/50 bg-emerald-950/30 px-2 py-1.5 text-[9.5px] text-slate-200"
        style={{
          opacity: isFinalStepReached ? conclusionSpring : 0,
          transform: `translateY(${(1 - conclusionSpring) * 6}px)`,
        }}
      >
        <span className="font-bold text-emerald-400">Kesimpulan DHP: </span>
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
        layerPolygons={prob.layerPolygons}
        width={320}
        height={245}
        activeStep={activeStepIndex + 1}
        stepStartFrame={stepStartFrame}
      />
    </div>
  );

  return (
    <SmartboardShell
      title="Pembahasan Soal 5: Aplikasi Sistem PtLDV"
      subtitle={prob.subtitle}
      badge="PtLDV • SOAL 5"
      stepBadge={`Langkah ${activeStepIndex + 1} / ${steps.length}`}
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

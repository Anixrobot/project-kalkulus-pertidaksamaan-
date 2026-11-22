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
 * Scene05C_Soal3_PtLDV
 * Pembahasan Soal 3: 2x + 5y <= 10 (Garis Utuh & Uji Asal BENAR)
 * Langkah aljabar ber-step sinkron dengan 5 tahap animasi CartesianPlane2D.
 */
export const Scene05C_Soal3_PtLDV: React.FC<LinearSceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const prob = PTLDV_DATA[0]; // soal-3 (2x + 5y <= 10)

  const steps = [
    { latex: '2x + 5y = 10', note: 'Ubah ke persamaan garis pembatas' },
    { latex: '(0, 2) \\;\\text{dan}\\; (5, 0)', note: 'Titik potong sumbu: x=0 -> y=2, y=0 -> x=5' },
    { latex: '\\text{Garis Lurus Utuh (Solid) } \\le', note: 'Tanda inklusif: titik pada garis ikut solusi' },
    { latex: '2(0) + 5(0) \\le 10 \\implies 0 \\le 10 \\; (\\text{BENAR})', note: 'Uji titik asal (0,0) menghasilkan pernyataan BENAR' },
    { latex: '\\text{DHP: Arsir daerah bawah-kiri memuat } (0,0)', note: 'Arsir penuh daerah solusi menuju titik (0,0)' },
  ];

  const framesPerStep = Math.max(1, Math.floor(durationInFrames / steps.length));
  const activeStepIndex = Math.min(steps.length - 1, Math.floor(frame / framesPerStep));

  // Sinkronkan frame animasi grafik dengan progres langkah
  const graphStartFrame = 0;

  const leftContent = (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Header Soal (Badge & Judul Dipisah Rapi) */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[9.5px] font-bold text-sky-400 border border-sky-500/30 shrink-0">
            SOAL 3
          </span>
          <span className="text-[10.5px] font-bold text-slate-200 truncate">
            {prob.subtitle}
          </span>
        </div>
        <div className="rounded-lg bg-slate-900/90 px-2 py-1 border border-slate-700/60 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-semibold">Tentukan DHP dari:</span>
          <MathFormula math={prob.problemLatex} fontSize={13} color="#38bdf8" />
        </div>
      </div>

      {/* Alur Langkah Aljabar Ber-Step */}
      <StepStepperList
        steps={steps}
        activeStepIndex={activeStepIndex}
        accentColor="#38bdf8"
      />

      {/* Kesimpulan DHP */}
      <div className="rounded-xl border border-emerald-500/50 bg-emerald-950/20 px-2 py-1.5 text-[9.5px] text-slate-300">
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
        width={320}
        height={250}
        startFrame={graphStartFrame}
      />
    </div>
  );

  return (
    <SmartboardShell
      title="Pembahasan Soal 3: PtLDV Garis Utuh"
      subtitle={prob.subtitle}
      badge="PtLDV • SOAL 3"
      stepBadge={`Langkah ${activeStepIndex + 1} / ${steps.length}`}
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

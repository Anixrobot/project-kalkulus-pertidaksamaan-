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
 * Scene05E_Soal5_SistemPtLDV
 * Pembahasan Soal 5: x + y >= 4; x >= 0; y >= 0 (Sistem PtLDV Kuadran I)
 * Menggunakan layerPolygons (opasitas 0.15) secara bertahap lalu menyorot dhpPolygon di Kuadran I.
 */
export const Scene05E_Soal5_SistemPtLDV: React.FC<LinearSceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const prob = PTLDV_DATA[2]; // soal-5

  const steps = [
    { latex: 'x \\ge 0 \\quad\\text{dan}\\quad y \\ge 0', note: 'Syarat non-negatif: solusi terkunci ketat hanya di Kuadran I' },
    { latex: 'x + y = 4 \\implies (0, 4) \\;\\text{dan}\\; (4, 0)', note: 'Titik potong sumbu garis utama: x=0 -> y=4, y=0 -> x=4' },
    { latex: '\\text{Garis Lurus Utuh (Solid) } \\ge', note: 'Tanda inklusif: garis x + y = 4 ikut menjadi batas solusi' },
    { latex: '0 + 0 \\ge 4 \\implies 0 \\ge 4 \\; (\\text{SALAH})', note: 'Uji titik asal (0,0) SALAH -> arsir di atas-kanan garis', isAlert: true },
    { latex: '\\text{DHP: Irisan Kuadran I di atas } x + y = 4', note: 'Irisan 3 lapisan pertidaksamaan diarsir tajam di Kuadran I' },
  ];

  const framesPerStep = Math.max(1, Math.floor(durationInFrames / steps.length));
  const activeStepIndex = Math.min(steps.length - 1, Math.floor(frame / framesPerStep));

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
        <div className="rounded-lg bg-slate-900/90 px-2 py-1 border border-slate-700/60 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-semibold">Tentukan DHP Sistem:</span>
          <MathFormula math={prob.problemLatex} fontSize={12} color="#10b981" />
        </div>
      </div>

      {/* Alur Langkah Aljabar Ber-Step */}
      <StepStepperList
        steps={steps}
        activeStepIndex={activeStepIndex}
        accentColor="#10b981"
      />

      {/* Kesimpulan DHP Sistem */}
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
        layerPolygons={prob.layerPolygons}
        width={320}
        height={250}
        startFrame={0}
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

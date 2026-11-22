import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { CartesianPlane2D } from '../../components/math-v4/CartesianPlane2D';
import { PTLDV_DATA } from '../../data/mathData';

export interface LinearSceneProps {
  durationInFrames?: number;
}

/**
 * LinearScene5_LatihanPtLDV
 * Pembahasan Lengkap Contoh Soal PtLDV:
 * - Soal 3: 2x + 5y <= 10 (Garis Utuh Solid & Uji Asal BENAR)
 * - Soal 4: 4x - 3y > 12 (Garis Putus-putus Dashed & Uji Asal SALAH)
 * - Soal 5: x + y >= 4; x >= 0; y >= 0 (Sistem PtLDV Kuadran I via layerPolygons)
 * Berpindah secara otomatis & mulus sesuai pembagian durasi scene menjadi 3 langkah.
 */
export const LinearScene5_LatihanPtLDV: React.FC<LinearSceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Bagi durasi scene rata menjadi 3 segmen soal
  const stepFrames = Math.max(1, Math.floor(durationInFrames / 3));
  const currentStep = Math.min(2, Math.floor(frame / stepFrames));
  const relativeFrame = frame - currentStep * stepFrames;

  const currentProb = PTLDV_DATA[currentStep];

  const switchSpring = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  const getStepBadge = () => {
    if (currentStep === 0) return 'Soal 3 / 5';
    if (currentStep === 1) return 'Soal 4 / 5';
    return 'Soal 5 / 5';
  };

  const getBadgeCategory = () => {
    if (currentStep === 0) return 'SOAL 3 (GARIS UTUH)';
    if (currentStep === 1) return 'SOAL 4 (PUTUS-PUTUS)';
    return 'SOAL 5 (SISTEM PtLDV)';
  };

  const leftContent = (
    <div
      className="flex flex-col gap-2.5"
      style={{
        opacity: switchSpring,
        transform: `translateY(${(1 - switchSpring) * 10}px)`,
      }}
    >
      {/* Header Soal */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 shadow-md">
        <div className="flex items-center justify-between mb-1">
          <span
            className={`rounded px-2 py-0.5 text-[10px] font-bold border ${
              currentStep === 0
                ? 'bg-sky-500/20 text-sky-400 border-sky-500/30'
                : currentStep === 1
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            }`}
          >
            {getBadgeCategory()}
          </span>
          <span className="text-[10px] text-slate-400">{currentProb.subtitle}</span>
        </div>
        <div className="rounded-lg bg-slate-900/90 p-2 border border-slate-700/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-semibold">Tentukan DHP dari:</span>
          <MathFormula math={currentProb.problemLatex} fontSize={13} color={currentProb.lineColor} />
        </div>
      </div>

      {/* Rincian Langkah Penyelesaian Sesuai Soal */}
      <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-2.5 shadow-md flex-1 flex flex-col justify-between">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Langkah Pengerjaan:
        </div>

        {currentStep < 2 ? (
          /* Soal 3 & Soal 4: Single PtLDV */
          <div className="space-y-1.5 text-xs">
            <div className="rounded bg-slate-800/60 p-1.5 border border-slate-700/50">
              <div className="text-[10px] font-bold text-amber-400 mb-0.5">1. Titik Potong Sumbu:</div>
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>Sumbu Y: <strong className="text-amber-300">({currentProb.intercepts.yAxis[0]}, {currentProb.intercepts.yAxis[1]})</strong></span>
                <span>Sumbu X: <strong className="text-amber-300">({currentProb.intercepts.xAxis[0]}, {currentProb.intercepts.xAxis[1]})</strong></span>
              </div>
            </div>

            <div className="rounded bg-slate-800/60 p-1.5 border border-slate-700/50">
              <div className="text-[10px] font-bold text-sky-400 mb-0.5">2. Garis Pembatas:</div>
              <div className="text-[10.5px] text-slate-300">
                Persamaan: <MathFormula math={currentProb.lineEquationLatex} fontSize={11} color="#38bdf8" /> •{' '}
                <strong className={currentProb.lineStyle === 'solid' ? 'text-emerald-400' : 'text-rose-400'}>
                  {currentProb.lineStyle === 'solid' ? 'Garis Utuh (Solid ≤)' : 'Garis Putus-putus (Dashed >)'}
                </strong>
              </div>
            </div>

            <div className="rounded bg-slate-800/60 p-1.5 border border-slate-700/50">
              <div className="text-[10px] font-bold text-emerald-400 mb-0.5">3. Uji Titik Asal (0,0):</div>
              <div className="flex items-center justify-between text-[11px]">
                <MathFormula math={currentProb.testOrigin.substitutionLatex} fontSize={11.5} color="#f8fafc" />
                <span
                  className={`font-bold px-1.5 py-0.5 rounded text-[9.5px] ${
                    currentProb.testOrigin.isTrue
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  {currentProb.testOrigin.badgeLabel}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Soal 5: Sistem PtLDV Kuadran I */
          <div className="space-y-1.5 text-xs">
            <div className="rounded bg-slate-800/60 p-1.5 border border-slate-700/50">
              <div className="text-[10px] font-bold text-sky-400 mb-0.5">1. Syarat Non-Negatif:</div>
              <div className="text-[10.5px] text-slate-300">
                <MathFormula math="x \ge 0" fontSize={11} color="#38bdf8" /> &amp;{' '}
                <MathFormula math="y \ge 0" fontSize={11} color="#fbbf24" /> mengunci solusi hanya di <strong>Kuadran I</strong>.
              </div>
            </div>

            <div className="rounded bg-slate-800/60 p-1.5 border border-slate-700/50">
              <div className="text-[10px] font-bold text-emerald-400 mb-0.5">2. Garis Batas x + y = 4:</div>
              <div className="text-[10.5px] text-slate-300">
                Titik potong (0,4) &amp; (4,0) • Uji (0,0): 0 ≥ 4{' '}
                <span className="rounded bg-rose-500/20 text-rose-400 px-1 text-[9.5px] font-bold border border-rose-500/40">
                  SALAH
                </span>
              </div>
            </div>

            <div className="rounded bg-emerald-950/20 p-1.5 border border-emerald-500/40">
              <div className="text-[10px] font-bold text-emerald-400 mb-0.5">3. Irisan DHP Final:</div>
              <div className="text-[10px] text-emerald-200/90">
                Arsir irisan di atas-kanan garis yang terkunci di dalam Kuadran I.
              </div>
            </div>
          </div>
        )}

        {/* Kesimpulan DHP */}
        <div className="border-t border-slate-800 pt-1.5 mt-1 text-[10px] text-slate-300">
          <span className="font-bold text-emerald-400">Kesimpulan DHP: </span>
          {currentProb.testOrigin.conclusion}
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        opacity: switchSpring,
        transform: `scale(${0.96 + switchSpring * 0.04})`,
      }}
    >
      <CartesianPlane2D
        key={currentProb.id}
        viewport={currentProb.viewport}
        intercepts={currentProb.intercepts}
        lineEquationLatex={currentProb.lineEquationLatex}
        lineStyle={currentProb.lineStyle}
        lineSegmentInViewport={currentProb.lineSegmentInViewport}
        testOrigin={currentProb.testOrigin}
        dhpColor={currentProb.dhpColor}
        lineColor={currentProb.lineColor}
        dhpPolygon={currentProb.dhpPolygon}
        layerPolygons={currentProb.layerPolygons}
        width={370}
        height={280}
        startFrame={0}
      />
    </div>
  );

  return (
    <SmartboardShell
      title={
        currentStep === 0
          ? 'Latihan Soal 3: PtLDV Garis Utuh'
          : currentStep === 1
          ? 'Latihan Soal 4: PtLDV Garis Putus-putus'
          : 'Latihan Soal 5: Aplikasi Sistem PtLDV'
      }
      subtitle={currentProb.subtitle}
      badge="PtLDV • LATIHAN SOAL"
      stepBadge={getStepBadge()}
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

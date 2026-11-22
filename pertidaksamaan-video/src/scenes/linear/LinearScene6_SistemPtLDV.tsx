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
 * LinearScene6_SistemPtLDV (14 dtk / 420 frames)
 * Aplikasi Sistem PtLDV (Soal 5: x + y >= 4, x >= 0, y >= 0)
 * Menampilkan animasi arsiran bertahap via layerPolygons (opasitas 0.15)
 * lalu menyorot tajam dhpPolygon sebagai irisan final di Kuadran I.
 */
export const LinearScene6_SistemPtLDV: React.FC<LinearSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const soal5 = PTLDV_DATA[2];

  const introSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const leftContent = (
    <div
      className="flex flex-col gap-2.5"
      style={{
        opacity: introSpring,
        transform: `translateY(${(1 - introSpring) * 10}px)`,
      }}
    >
      {/* Header Soal 5 */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 shadow-md">
        <div className="flex items-center justify-between mb-1">
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
            SOAL 5 (SISTEM PtLDV)
          </span>
          <span className="text-[10px] text-slate-400">Pengantar Program Linear</span>
        </div>
        <div className="rounded-lg bg-slate-900/90 p-2 border border-slate-700/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-semibold">Tentukan DHP Sistem:</span>
          <MathFormula math="x + y \ge 4; \; x \ge 0; \; y \ge 0" fontSize={13} color="#10b981" />
        </div>
      </div>

      {/* Rincian Langkah Analisis Irisan */}
      <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-2.5 shadow-md flex-1 flex flex-col justify-between">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Tahapan Menemukan Irisan DHP:
        </div>

        <div className="space-y-1.5 text-xs">
          {/* Syarat 1 & 2: Non-Negatif (Kuadran I) */}
          <div className="rounded bg-slate-800/60 p-1.5 border border-slate-700/50">
            <div className="text-[10px] font-bold text-sky-400 mb-0.5">
              1. Syarat Non-Negatif (Terkunci di Kuadran I):
            </div>
            <div className="text-[10.5px] text-slate-300">
              <MathFormula math="x \ge 0" fontSize={11} color="#38bdf8" /> (kanan sumbu Y) &amp;{' '}
              <MathFormula math="y \ge 0" fontSize={11} color="#fbbf24" /> (atas sumbu X)
            </div>
          </div>

          {/* Garis Utama & Uji Titik */}
          <div className="rounded bg-slate-800/60 p-1.5 border border-slate-700/50">
            <div className="text-[10px] font-bold text-emerald-400 mb-0.5">
              2. Garis Pembatas Utama:
            </div>
            <div className="text-[10.5px] text-slate-300">
              Titik potong (0,4) &amp; (4,0). Uji (0,0):{' '}
              <MathFormula math="0 + 0 \ge 4 \implies 0 \ge 4" fontSize={11} color="#fca5a5" />{' '}
              <span className="rounded bg-rose-500/20 text-rose-400 px-1 text-[9.5px] font-bold border border-rose-500/40">
                SALAH
              </span>
            </div>
          </div>

          {/* Irisan DHP Final */}
          <div className="rounded bg-emerald-950/20 p-1.5 border border-emerald-500/40">
            <div className="text-[10px] font-bold text-emerald-400 mb-0.5">
              3. Irisan DHP Final:
            </div>
            <p className="text-[10px] text-emerald-200/90 leading-relaxed">
              Arsir daerah di atas-kanan garis (0,4)-(4,0) yang secara bersamaan memenuhi x ≥ 0 dan y ≥ 0.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-1 text-[9.5px] text-slate-400 flex items-center justify-between">
          <span>Lapisan arsiran bertahap:</span>
          <span className="font-mono text-emerald-400 font-bold">layerPolygons → dhpPolygon</span>
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-2 text-center">
        <div className="text-xs font-bold text-slate-200">Grafik Irisan Sistem PtLDV</div>
        <div className="text-[10px] text-slate-400">
          Irisan 3 pertidaksamaan bertahap terkunci di Kuadran I
        </div>
      </div>

      <CartesianPlane2D
        viewport={soal5.viewport}
        intercepts={soal5.intercepts}
        lineEquationLatex={soal5.lineEquationLatex}
        lineStyle={soal5.lineStyle}
        lineSegmentInViewport={soal5.lineSegmentInViewport}
        testOrigin={soal5.testOrigin}
        dhpColor={soal5.dhpColor}
        lineColor={soal5.lineColor}
        dhpPolygon={soal5.dhpPolygon}
        layerPolygons={soal5.layerPolygons}
        width={370}
        height={280}
        startFrame={0}
      />
    </div>
  );

  return (
    <SmartboardShell
      title="Aplikasi Sistem PtLDV (Soal 5)"
      subtitle="Irisan Pertidaksamaan & Pengantar Program Linear"
      badge="SISTEM PtLDV • APLIKASI"
      stepBadge="Soal 5 / 5"
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

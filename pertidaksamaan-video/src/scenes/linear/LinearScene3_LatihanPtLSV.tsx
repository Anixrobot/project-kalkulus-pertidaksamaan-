import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { NumberLine1D } from '../../components/math-v4/NumberLine1D';
import { PTLSV_DATA } from '../../data/mathData';

export interface LinearSceneProps {
  durationInFrames?: number;
}

/**
 * LinearScene3_LatihanPtLSV
 * Latihan Soal PtLSV: Soal 1 (Jebakan Balik Tanda) & Soal 2 (Pecahan & Distribusi Negatif)
 * Berpindah secara otomatis & mulus tepat di tengah durasi scene.
 */
export const LinearScene3_LatihanPtLSV: React.FC<LinearSceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Switch soal tepat di pertengahan durasi
  const halfFrames = Math.floor(durationInFrames / 2);
  const isSoal2 = frame >= halfFrames;
  const currentProb = isSoal2 ? PTLSV_DATA[2] : PTLSV_DATA[1];
  const relativeFrame = isSoal2 ? frame - halfFrames : frame;

  // Animasi transisi pergantian soal
  const switchSpring = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  const leftContent = (
    <div
      className="flex flex-col gap-2.5"
      style={{
        opacity: switchSpring,
        transform: `translateY(${(1 - switchSpring) * 10}px)`,
      }}
    >
      {/* Header Soal & Badge */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 shadow-md">
        <div className="flex items-center justify-between mb-1">
          <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30">
            {isSoal2 ? 'LATIHAN SOAL 2' : 'LATIHAN SOAL 1'}
          </span>
          <span className="text-[10px] text-slate-400">{currentProb.subtitle}</span>
        </div>
        <div className="rounded-lg bg-slate-900/90 p-2 border border-slate-700/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-semibold">Tentukan HP dari:</span>
          <MathFormula math={currentProb.problemLatex} fontSize={14} color="#38bdf8" />
        </div>
      </div>

      {/* Alur Langkah Penyelesaian */}
      <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-2.5 shadow-md flex-1 overflow-hidden flex flex-col justify-between">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Langkah Penyelesaian Aljabar:
        </div>
        <div className="space-y-1.5 text-xs">
          {currentProb.steps.map((st, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded p-1 ${
                st.isAlert ? 'border border-rose-500/60 bg-rose-950/30 text-rose-300' : 'text-slate-300'
              }`}
            >
              <MathFormula
                math={st.latex}
                fontSize={st.isAlert ? 13 : 11.5}
                color={st.isAlert ? '#f43f5e' : '#f8fafc'}
              />
              <span className={`text-[9px] ${st.isAlert ? 'font-bold text-rose-400' : 'text-slate-400'}`}>
                {st.note}
              </span>
            </div>
          ))}
        </div>

        {/* Kotak Kesimpulan Solusi */}
        <div className="border-t border-slate-800 pt-1.5 mt-1 flex items-center justify-between">
          <span className="text-[10px] font-bold text-emerald-400">Himpunan Penyelesaian (HP):</span>
          <div className="flex items-center gap-2">
            <MathFormula math={currentProb.solution.latex} fontSize={13} color="#10b981" />
            <span className="text-slate-500 text-[10px] font-mono">
              <MathFormula math={currentProb.solution.intervalLatex} fontSize={12} color="#38bdf8" />
            </span>
          </div>
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
      <div className="mb-2 text-center">
        <div className="text-xs font-bold text-slate-200">
          Plot Solusi Garis Bilangan ({currentProb.title})
        </div>
        <div className="text-[10px] text-slate-400">
          Titik batas x = {currentProb.solution.boundaryValue} (
          {currentProb.solution.isInclusive ? 'Bulatan Penuh ●' : 'Bulatan Kosong ○'})
        </div>
      </div>

      <NumberLine1D
        key={currentProb.id}
        boundaryValue={currentProb.solution.boundaryValue}
        isInclusive={currentProb.solution.isInclusive}
        direction={currentProb.solution.direction}
        axisRange={currentProb.solution.axisRange}
        intervalLatex={currentProb.solution.intervalLatex}
        setBuilderLatex={currentProb.solution.setBuilderLatex}
        accentColor={currentProb.solution.isInclusive ? '#10b981' : '#38bdf8'}
        width={440}
        height={135}
      />
    </div>
  );

  return (
    <SmartboardShell
      title={isSoal2 ? 'Latihan Soal 2: PtLSV Pecahan' : 'Latihan Soal 1: PtLSV Balik Tanda'}
      subtitle={currentProb.subtitle}
      badge="PtLSV • LATIHAN SOAL"
      stepBadge={isSoal2 ? 'Soal 2 / 2' : 'Soal 1 / 2'}
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

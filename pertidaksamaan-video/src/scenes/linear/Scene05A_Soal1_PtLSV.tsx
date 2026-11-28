import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { NumberLine1D } from '../../components/math-v4/NumberLine1D';
import { StepStepperList } from '../../components/math-v4/StepStepperList';
import { PTLSV_DATA } from '../../data/mathData';

export interface LinearSceneProps {
  durationInFrames?: number;
}

/**
 * Scene05A_Soal1_PtLSV
 * Pembahasan Soal 1: 3(x - 2) + 4 < 5x - 6
 * Menampilkan alur aljabar ber-step via StepStepperList & sinkronisasi plot garis bilangan di akhir.
 */
export const Scene05A_Soal1_PtLSV: React.FC<LinearSceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const prob = PTLSV_DATA[1]; // soal-1
  const totalSteps = prob.steps.length;

  // Bagi frame bertahap anti-spoiler: langkah akhir & solusi tampil hanya pada finalStepStart (78%)
  const finalStepStart = Math.floor(durationInFrames * 0.78);
  const introStepsCount = Math.max(1, totalSteps - 1);
  const framesPerStep = Math.max(1, Math.floor(finalStepStart / introStepsCount));
  const isFinalStepReached = frame >= finalStepStart;
  const activeStepIndex = isFinalStepReached
    ? totalSteps - 1
    : Math.min(introStepsCount - 1, Math.floor(frame / framesPerStep));

  const hpRevealSpring = isFinalStepReached
    ? spring({
        frame: frame - finalStepStart,
        fps,
        config: { damping: 14, stiffness: 85 },
      })
    : 0;

  const leftContent = (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Header Soal (Badge & Judul Dipisah Rapi, Anti-Tumpang Tindih) */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[9.5px] font-bold text-sky-400 border border-sky-500/30 shrink-0">
            SOAL 1
          </span>
          <span className="text-[10.5px] font-bold text-slate-200 truncate">
            {prob.subtitle}
          </span>
        </div>
        <div className="rounded-lg bg-slate-900/90 px-2 py-1 border border-slate-700/60 flex items-center justify-between gap-2">
          <span className="text-[10px] text-slate-400 font-semibold shrink-0">Tentukan HP dari:</span>
          <MathFormula math={prob.problemLatex} fontSize={12.5} color="#38bdf8" />
        </div>
      </div>

      {/* Alur Langkah Aljabar Ber-Step (StepStepperList) */}
      <StepStepperList
        steps={prob.steps}
        activeStepIndex={activeStepIndex}
        accentColor="#38bdf8"
      />

      {/* Kesimpulan Himpunan Penyelesaian (Anti-Spoiler: opacity 0 sebelum langkah akhir) */}
      <div
        className="rounded-xl border border-emerald-500/60 bg-emerald-950/40 px-2 py-1.5 flex flex-wrap items-center justify-between gap-1.5"
        style={{
          opacity: isFinalStepReached ? hpRevealSpring : 0,
          transform: `translateY(${(1 - hpRevealSpring) * 6}px)`,
        }}
      >
        <span className="text-[9.5px] font-bold text-emerald-400 shrink-0">
          Himpunan Penyelesaian:
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <MathFormula math={prob.solution.latex} fontSize={11.5} color="#10b981" />
          <MathFormula math={prob.solution.intervalLatex} fontSize={11} color="#38bdf8" />
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-1 text-center">
        <div className="text-[11.5px] font-bold text-slate-200">
          Plot Solusi Garis Bilangan
        </div>
        <div className="text-[9.5px] text-slate-400">
          {isFinalStepReached
            ? `Titik batas x = ${prob.solution.boundaryValue} (Bulatan Kosong ○, arah kanan)`
            : 'Selesaikan langkah aljabar di kiri untuk memplot solusi'}
        </div>
      </div>

      <NumberLine1D
        boundaryValue={prob.solution.boundaryValue}
        isInclusive={prob.solution.isInclusive}
        direction={prob.solution.direction}
        axisRange={prob.solution.axisRange}
        intervalLatex={prob.solution.intervalLatex}
        setBuilderLatex={prob.solution.setBuilderLatex}
        accentColor="#38bdf8"
        width={315}
        height={100}
        showSolution={isFinalStepReached}
        solutionStartFrame={finalStepStart}
      />
    </div>
  );

  return (
    <SmartboardShell
      title="Pembahasan Soal 1: PtLSV"
      subtitle={prob.subtitle}
      badge="PtLSV • SOAL 1"
      stepBadge={`Langkah ${Math.min(activeStepIndex + 1, totalSteps)} / ${totalSteps}`}
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

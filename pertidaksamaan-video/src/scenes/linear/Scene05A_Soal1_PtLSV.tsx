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

  // Bagi frame untuk memunculkan langkah satu per satu
  // Sisakan 25% durasi terakhir untuk penyorotan hasil akhir & garis bilangan
  const algebraDuration = Math.floor(durationInFrames * 0.72);
  const framesPerStep = Math.max(1, Math.floor(algebraDuration / totalSteps));
  const activeStepIndex = Math.min(totalSteps - 1, Math.floor(frame / framesPerStep));
  const isFinalStepReached = frame >= algebraDuration;

  const graphEntranceSpring = spring({
    frame: frame - algebraDuration,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

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
        <div className="rounded-lg bg-slate-900/90 px-2 py-1 border border-slate-700/60 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-semibold">Tentukan HP dari:</span>
          <MathFormula math={prob.problemLatex} fontSize={13} color="#38bdf8" />
        </div>
      </div>

      {/* Alur Langkah Aljabar Ber-Step (StepStepperList) */}
      <StepStepperList
        steps={prob.steps}
        activeStepIndex={activeStepIndex}
        accentColor="#38bdf8"
      />

      {/* Kesimpulan Himpunan Penyelesaian */}
      <div
        className={`rounded-xl border px-2 py-1.5 flex items-center justify-between transition-all ${
          isFinalStepReached
            ? 'border-emerald-500/60 bg-emerald-950/40'
            : 'border-slate-800 bg-slate-900/60 opacity-60'
        }`}
      >
        <span className="text-[9.5px] font-bold text-emerald-400">Himpunan Penyelesaian:</span>
        <div className="flex items-center gap-2">
          <MathFormula math={prob.solution.latex} fontSize={12} color="#10b981" />
          <span className="text-slate-400 text-[9.5px] font-mono">
            <MathFormula math={prob.solution.intervalLatex} fontSize={11} color="#38bdf8" />
          </span>
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        opacity: isFinalStepReached ? graphEntranceSpring : 0.45,
        transform: `scale(${isFinalStepReached ? 0.96 + graphEntranceSpring * 0.04 : 0.96})`,
      }}
    >
      <div className="mb-1 text-center">
        <div className="text-[11.5px] font-bold text-slate-200">
          Plot Solusi Garis Bilangan
        </div>
        <div className="text-[9.5px] text-slate-400">
          {isFinalStepReached
            ? `Titik batas x = ${prob.solution.boundaryValue} (Bulatan Kosong ○, arah kanan)`
            : 'Selesaikan aljabar di kiri untuk memplot garis bilangan'}
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

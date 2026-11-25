import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { SignChart1D } from '../../components/math-v4/SignChart1D';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { StepStepperList } from '../../components/math-v4/StepStepperList';
import { RasionalProblem } from '../../data/rasionalData';

export interface RasionalProblemSceneProps {
  problem: RasionalProblem;
}

/**
 * RasionalProblemScene V4.1
 * Template generik 2-kolom untuk Soal 1 s.d. Soal 5 Pertidaksamaan Rasional (Ikhsan).
 * Kolom Kiri: Header Soal, StepStepperList KaTeX ber-step, dan Kesimpulan HP.
 * Kolom Kanan: SignChart1D (garis bilangan titik kritis, tanda +/-, titik denominator selalu included: false).
 */
export const RasionalProblemScene: React.FC<RasionalProblemSceneProps> = React.memo(({ problem }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const totalSteps = problem.steps.length;
  // Sisakan 25% durasi terakhir untuk penyorotan hasil HP dan garis bilangan
  const algebraDuration = Math.floor(durationInFrames * 0.75);
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
          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9.5px] font-bold text-emerald-400 border border-emerald-500/30 shrink-0">
            SOAL {problem.number}
          </span>
          <span className="text-[10.5px] font-bold text-slate-200 truncate">
            {problem.subtitle}
          </span>
        </div>
        <div className="rounded-lg bg-slate-900/90 px-2 py-1 border border-slate-700/60 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-semibold">Tentukan HP dari:</span>
          <MathFormula math={problem.problemLatex} fontSize={13} color="#10b981" />
        </div>
      </div>

      {/* Alur Langkah Aljabar Ber-Step (StepStepperList) */}
      <StepStepperList
        steps={problem.steps}
        activeStepIndex={activeStepIndex}
        accentColor="#10b981"
      />

      {/* Kesimpulan Himpunan Penyelesaian */}
      <div
        className={`rounded-xl border px-2 py-1.5 flex flex-wrap items-center justify-between gap-1 ${
          isFinalStepReached
            ? 'border-emerald-500/60 bg-emerald-950/40'
            : 'border-slate-800 bg-slate-900/60 opacity-60'
        }`}
      >
        <span className="text-[9.5px] font-bold text-emerald-400 shrink-0">Himpunan Penyelesaian:</span>
        <div className="flex items-center gap-2">
          <span className="text-slate-300 text-[9.5px] font-mono">
            <MathFormula math={problem.hpInterval} fontSize={10} color="#10b981" />
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
          Plot Garis Bilangan Uji Tanda 1D
        </div>
        <div className="text-[9.5px] text-slate-400 flex items-center justify-center gap-1 flex-wrap">
          {isFinalStepReached ? (
            <>
              <span>Penyelesaian akhir:</span>
              <MathFormula math={problem.hpInterval} fontSize={9.5} color="#10b981" />
            </>
          ) : (
            <span>Selesaikan aljabar di kiri untuk memplot garis bilangan</span>
          )}
        </div>
      </div>

      <SignChart1D
        criticalPoints={problem.criticalPoints}
        intervalSigns={problem.intervalSigns}
        axisRange={problem.axisRange}
        hpSign={problem.hpSign}
        hpInterval={problem.hpInterval}
        hpSet={problem.hpSet}
        accentColor="#10b981"
        width={315}
        height={120}
      />
    </div>
  );

  return (
    <SmartboardShell
      title={`Pembahasan Soal ${problem.number}: Rasional`}
      subtitle={problem.subtitle}
      badge={`RASIONAL • SOAL ${problem.number}`}
      stepBadge={`Langkah ${Math.min(activeStepIndex + 1, totalSteps)} / ${totalSteps}`}
      presenter="ikhsan"
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 2: Pertidaksamaan Rasional • Pemateri: Ikhsan"
    />
  );
});


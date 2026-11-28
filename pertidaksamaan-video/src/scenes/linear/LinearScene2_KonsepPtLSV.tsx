import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { NumberLine1D } from '../../components/math-v4/NumberLine1D';
import { PTLSV_DATA } from '../../data/mathData';

export interface LinearSceneProps {
  durationInFrames?: number;
}

const Phase1KonsepPtLSV: React.FC<{ phaseDuration: number }> = ({ phaseDuration }) => {
  const relFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phaseSpring = spring({ frame: relFrame, fps, config: { damping: 15, stiffness: 85 } });

  const pRatio = relFrame / Math.max(1, phaseDuration);
  const hlDef = pRatio < 0.25;
  const hlGoal = pRatio >= 0.25 && pRatio < 0.5;
  const hlOpen = pRatio >= 0.5 && pRatio < 0.75;
  const hlClosed = pRatio >= 0.75;

  const leftContent = (
    <div
      className="flex flex-col gap-2.5"
      style={{
        opacity: Math.max(0.25, phaseSpring),
        transform: `translateY(${(1 - phaseSpring) * 8}px)`,
      }}
    >
      <div
        className="rounded-xl border bg-slate-800/80 p-3 shadow-md"
        style={{
          borderColor: hlDef ? '#38bdf8' : '#334155',
          opacity: hlDef ? 1 : 0.78,
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-400 border border-sky-500/30">
            DEFINISI
          </span>
          <span className="text-xs font-bold text-slate-200">
            Pertidaksamaan Linear Satu Variabel
          </span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Pertidaksamaan yang memuat <strong>tepat satu variabel</strong> (umumnya variabel <span className="text-sky-400 font-bold">x</span>) dengan pangkat tertinggi bernilai <strong>1</strong>.
        </p>
      </div>

      <div
        className="rounded-xl border bg-slate-900/90 p-3 shadow-md"
        style={{
          borderColor: hlGoal ? '#38bdf8' : 'rgba(51, 65, 85, 0.8)',
          opacity: pRatio >= 0.2 ? (hlGoal ? 1 : 0.78) : 0.35,
        }}
      >
        <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
          Tujuan Penyelesaian PtLSV:
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
          Mengisolasi variabel <span className="text-sky-400 font-bold">x</span> berdiri sendirian di salah satu ruas menggunakan aturan operasi aljabar.
        </p>
        <div className="rounded-lg bg-slate-800/80 p-2 text-center border border-slate-700/70">
          <MathFormula
            math="ax + b < c \;\;\text{atau}\;\; ax + b \ge c"
            fontSize={12.5}
            color="#38bdf8"
          />
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div
      className="flex flex-col gap-2.5 w-full justify-center"
      style={{
        opacity: Math.max(0.25, phaseSpring),
        transform: `scale(${0.97 + phaseSpring * 0.03})`,
      }}
    >
      <div className="text-center text-xs font-bold text-slate-200 mb-0.5">
        Aturan Penandaan Titik Batas pada Garis Bilangan
      </div>

      {/* Kartu Bulatan Kosong */}
      <div
        className="rounded-xl border bg-slate-900/90 p-3 shadow"
        style={{
          borderColor: hlOpen ? '#38bdf8' : 'rgba(56, 189, 248, 0.3)',
          opacity: pRatio >= 0.45 ? (hlOpen ? 1 : 0.75) : 0.3,
        }}
      >
        <div className="flex items-center justify-between mb-1.5 border-b border-slate-800 pb-1">
          <div className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded-full border-2 border-sky-400 bg-transparent" />
            <span className="font-bold text-sky-400 text-xs">Bulatan Kosong (○)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Tanda: &lt; atau &gt;</span>
        </div>
        <div className="text-[10.5px] text-slate-300 leading-relaxed">
          Titik batas <strong>TIDAK IKUT</strong> ke dalam himpunan penyelesaian. Notasi kurung interval menggunakan kurung biasa: <span className="font-mono text-sky-300">(a, b)</span>.
        </div>
      </div>

      {/* Kartu Bulatan Penuh */}
      <div
        className="rounded-xl border bg-emerald-950/20 p-3 shadow"
        style={{
          borderColor: hlClosed ? '#10b981' : 'rgba(16, 185, 129, 0.3)',
          opacity: pRatio >= 0.7 ? (hlClosed ? 1 : 0.75) : 0.3,
        }}
      >
        <div className="flex items-center justify-between mb-1.5 border-b border-emerald-900/40 pb-1">
          <div className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded-full bg-emerald-400" />
            <span className="font-bold text-emerald-400 text-xs">Bulatan Penuh (●)</span>
          </div>
          <span className="text-[10px] text-emerald-300 font-mono">Tanda: ≤ atau ≥</span>
        </div>
        <div className="text-[10.5px] text-slate-200 leading-relaxed">
          Titik batas <strong>IKUT SERTA</strong> ke dalam himpunan penyelesaian. Notasi kurung interval menggunakan kurung siku: <span className="font-mono text-emerald-300">[a, b]</span>.
        </div>
      </div>
    </div>
  );

  return (
    <SmartboardShell
      title="Konsep PtLSV & Aturan Titik Batas"
      subtitle="Fase 1: Definisi Satu Variabel & Makna Bulatan Kosong vs Penuh"
      badge="PtLSV • FASE 1/2"
      stepBadge="Fase 1: Konsep & Notasi"
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

const Phase2ContohPtLSV: React.FC<{ phaseDuration: number }> = ({ phaseDuration }) => {
  const relFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const introData = PTLSV_DATA[0]; // intro-ptlsv (2x - 4 >= 0)

  const phaseSpring = spring({ frame: relFrame, fps, config: { damping: 15, stiffness: 85 } });

  // Bagi Fase 2 (~1500f / 50 dtk) menjadi 3 sub-langkah bertahap:
  // Step 1 (0..30%): 2x >= 4; kanan hanya sumbu netral
  // Step 2 (30..65%): x >= 2; himpunan solusi & plot masih ditahan
  // Step 3 (65..100%): Himpunan Solusi + plot x=2 (bulatan penuh) + sinar kanan + [2, ∞)
  const step1End = Math.floor(phaseDuration * 0.3);
  const step2End = Math.floor(phaseDuration * 0.65);

  const visibleStepCount = relFrame < step1End ? 1 : 2;
  const isFinalRevealed = relFrame >= step2End;

  const revealSpring = isFinalRevealed
    ? spring({
        frame: Math.max(0, relFrame - step2End),
        fps,
        config: { damping: 14, stiffness: 80 },
      })
    : 0;

  const leftContent = (
    <div
      className="flex flex-col gap-2.5"
      style={{
        opacity: Math.max(0.25, phaseSpring),
        transform: `translateY(${(1 - phaseSpring) * 8}px)`,
      }}
    >
      <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30">
            CONTOH PENGANTAR
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-300">Selesaikan:</span>
            <MathFormula math={introData.problemLatex} fontSize={13} color="#fbbf24" />
          </div>
        </div>
        <p className="text-[10px] text-slate-400">
          Ikuti langkah isolasi variabel x hingga solusi akhir ditemukan.
        </p>
      </div>

      <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-2.5 shadow-md space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex justify-between">
          <span>Langkah Pengerjaan Aljabar:</span>
          <span className="text-sky-400 font-mono">
            Langkah {isFinalRevealed ? '2' : visibleStepCount} / 2
          </span>
        </div>

        {introData.steps.map((st, i) => {
          const isShown = i < visibleStepCount;
          const isCurrent =
            (!isFinalRevealed && i === visibleStepCount - 1) ||
            (isFinalRevealed && i === introData.steps.length - 1);

          return (
            <div
              key={i}
              className="rounded p-2 border"
              style={{
                opacity: isShown ? (isCurrent ? 1 : 0.65) : 0,
                backgroundColor: isCurrent ? 'rgba(30, 41, 59, 0.9)' : 'rgba(15, 23, 42, 0.7)',
                borderColor: isCurrent ? '#10b981' : 'rgba(51, 65, 85, 0.6)',
              }}
            >
              <div className="font-mono text-sm mb-0.5">
                <MathFormula math={st.latex} fontSize={13} color="#f8fafc" />
              </div>
              <div className="text-[9.5px] text-slate-400">{st.note}</div>
            </div>
          );
        })}

        {/* Anti-Spoiler: Himpunan Solusi BARU muncul di Langkah Akhir */}
        <div
          className="rounded-lg bg-emerald-950/40 border border-emerald-500/50 p-2 flex flex-wrap items-center justify-between gap-1"
          style={{ opacity: isFinalRevealed ? revealSpring : 0 }}
        >
          <span className="text-[10px] font-bold text-emerald-400">Himpunan Solusi:</span>
          <div className="flex items-center gap-2">
            <MathFormula math={introData.solution.latex} fontSize={12.5} color="#10b981" />
            <MathFormula math="[2, \infty)" fontSize={12} color="#38bdf8" />
          </div>
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        opacity: Math.max(0.45, phaseSpring),
        transform: `scale(${0.97 + phaseSpring * 0.03})`,
      }}
    >
      <div className="mb-2 text-center">
        <div className="text-xs font-bold text-slate-200">Plot Solusi Garis Bilangan 1D</div>
        <div className="text-[10px] text-slate-400">
          {isFinalRevealed
            ? `Titik batas x = ${introData.solution.boundaryValue} (Bulatan Penuh ● karena tanda ≥)`
            : 'Selesaikan isolasi variabel di kiri untuk memplot garis bilangan'}
        </div>
      </div>

      <NumberLine1D
        boundaryValue={introData.solution.boundaryValue}
        isInclusive={introData.solution.isInclusive}
        direction={introData.solution.direction}
        axisRange={introData.solution.axisRange}
        intervalLatex="[2, \infty)"
        setBuilderLatex={introData.solution.setBuilderLatex}
        accentColor="#10b981"
        showSolution={isFinalRevealed}
        solutionStartFrame={step2End}
        width={315}
        height={100}
      />
    </div>
  );

  return (
    <SmartboardShell
      title="Visualisasi Solusi PtLSV"
      subtitle="Fase 2: Pemetaan Solusi pada Garis Bilangan 1D (Ber-Step)"
      badge="PtLSV • FASE 2/2"
      stepBadge={isFinalRevealed ? 'Solusi: [2, ∞)' : `Langkah ${visibleStepCount} / 2`}
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

/**
 * LinearScene2_KonsepPtLSV (Scene03-KonsepPtLSV — 2700f / 90 detik)
 * V4.2 Upgrade: 2 fase <Sequence> (40 dtk konsep + 50 dtk contoh pengantar anti-spoiler).
 */
export const LinearScene2_KonsepPtLSV: React.FC<LinearSceneProps> = () => {
  const { durationInFrames } = useVideoConfig();
  const phase1Dur = Math.floor(durationInFrames * (40 / 90));
  const phase2Dur = durationInFrames - phase1Dur;

  return (
    <>
      <Sequence durationInFrames={phase1Dur} name="Fase 1: Konsep & Notasi PtLSV">
        <Phase1KonsepPtLSV phaseDuration={phase1Dur} />
      </Sequence>
      <Sequence from={phase1Dur} durationInFrames={phase2Dur} name="Fase 2: Contoh 2x - 4 >= 0">
        <Phase2ContohPtLSV phaseDuration={phase2Dur} />
      </Sequence>
    </>
  );
};

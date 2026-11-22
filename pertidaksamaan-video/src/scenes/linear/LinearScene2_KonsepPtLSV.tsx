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
 * LinearScene2_KonsepPtLSV (Scene03-KonsepPtLSV)
 * Refactored V4.1: 2 Fase Bersih & Terarah
 * - Fase 1 (0% - 45%): Definisi PtLSV & Perbandingan Bulatan Kosong vs Penuh (Besar & Lega)
 * - Fase 2 (45% - 100%): Contoh Pengantar 2x - 4 >= 0 Step-by-Step + Sinkronisasi Garis Bilangan 1D
 */
export const LinearScene2_KonsepPtLSV: React.FC<LinearSceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const introData = PTLSV_DATA[0]; // intro-ptlsv (2x - 4 >= 0)
  const phase1End = Math.floor(durationInFrames * 0.45);

  const phase = frame < phase1End ? 1 : 2;
  const relFrame = phase === 1 ? frame : frame - phase1End;

  const phaseSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  // ── FASE 1: Definisi PtLSV & Aturan Bulatan Kosong vs Penuh ──
  if (phase === 1) {
    const leftContent = (
      <div
        className="flex flex-col gap-2.5"
        style={{
          opacity: phaseSpring,
          transform: `translateY(${(1 - phaseSpring) * 10}px)`,
        }}
      >
        <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-3 shadow-md">
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

        <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-3 shadow-md">
          <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Tujuan Penyelesaian PtLSV:
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
            Mengisolasi variabel <span className="text-sky-400 font-bold">x</span> berdiri sendirian di salah satu ruas menggunakan aturan operasi aljabar.
          </p>
          <div className="rounded-lg bg-slate-800/70 p-2 text-center border border-slate-700/60 font-mono text-sky-300 text-xs">
            ax + b &lt; c \quad \lor \quad ax + b \ge c
          </div>
        </div>
      </div>
    );

    const rightContent = (
      <div
        className="flex flex-col gap-2.5 w-full justify-center"
        style={{
          opacity: phaseSpring,
          transform: `scale(${0.96 + phaseSpring * 0.04})`,
        }}
      >
        <div className="text-center text-xs font-bold text-slate-200 mb-0.5">
          Aturan Penandaan Titik Batas pada Garis Bilangan
        </div>

        {/* Kartu Bulatan Kosong */}
        <div className="rounded-xl border border-sky-500/40 bg-slate-900/90 p-3 shadow">
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
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-3 shadow">
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
  }

  // ── FASE 2: Contoh Pengantar 2x - 4 >= 0 Step-by-Step & Garis Bilangan ──
  const leftContent = (
    <div
      className="flex flex-col gap-2.5"
      style={{
        opacity: phaseSpring,
        transform: `translateY(${(1 - phaseSpring) * 10}px)`,
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
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Langkah Pengerjaan Aljabar:
        </div>

        {introData.steps.map((st, i) => (
          <div key={i} className="rounded bg-slate-800/70 p-2 border border-slate-700/60">
            <div className="font-mono text-sm mb-0.5">
              <MathFormula math={st.latex} fontSize={13} color="#f8fafc" />
            </div>
            <div className="text-[9.5px] text-slate-400">{st.note}</div>
          </div>
        ))}

        <div className="rounded-lg bg-emerald-950/30 border border-emerald-500/40 p-2 flex items-center justify-between">
          <span className="text-[10px] font-bold text-emerald-400">Himpunan Solusi:</span>
          <div className="flex items-center gap-2">
            <MathFormula math={introData.solution.latex} fontSize={13} color="#10b981" />
            <span className="text-slate-400 text-[10px] font-mono">
              <MathFormula math={introData.solution.intervalLatex} fontSize={12} color="#38bdf8" />
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
        opacity: phaseSpring,
        transform: `scale(${0.96 + phaseSpring * 0.04})`,
      }}
    >
      <div className="mb-2 text-center">
        <div className="text-xs font-bold text-slate-200">Plot Solusi Garis Bilangan 1D</div>
        <div className="text-[10px] text-slate-400">
          Titik batas x = {introData.solution.boundaryValue} (Bulatan Penuh ● karena tanda ≥)
        </div>
      </div>

      <NumberLine1D
        boundaryValue={introData.solution.boundaryValue}
        isInclusive={introData.solution.isInclusive}
        direction={introData.solution.direction}
        axisRange={introData.solution.axisRange}
        intervalLatex={introData.solution.intervalLatex}
        setBuilderLatex={introData.solution.setBuilderLatex}
        accentColor="#10b981"
        width={315}
        height={100}
      />
    </div>
  );

  return (
    <SmartboardShell
      title="Visualisasi Solusi PtLSV"
      subtitle="Fase 2: Pemetaan Solusi x ≥ 2 pada Garis Bilangan 1D"
      badge="PtLSV • FASE 2/2"
      stepBadge="Fase 2: Garis Bilangan"
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

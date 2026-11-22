import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { AlertRuleCard } from '../../components/math-v4/AlertRuleCard';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { GOLDEN_RULE } from '../../data/mathData';

export interface LinearSceneProps {
  durationInFrames?: number;
}

/**
 * LinearScene1_IntroAturanMutlak (Scene02-HukumFundamental)
 * Refactored V4.1: 3 Fase Ber-Step Murni
 * - Fase 1 (0% - 35%): Pengertian Dasar Persamaan vs Pertidaksamaan & 4 Simbol
 * - Fase 2 (35% - 65%): Operasi Aman (Penjumlahan/Pengurangan & Kali/Bagi Positif)
 * - Fase 3 (65% - 100%): Golden Rule (Kali/Bagi Bilangan Negatif Wajib Balik Tanda)
 */
export const LinearScene1_IntroAturanMutlak: React.FC<LinearSceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const phase1End = Math.floor(durationInFrames * 0.35);
  const phase2End = Math.floor(durationInFrames * 0.65);

  const phase = frame < phase1End ? 1 : frame < phase2End ? 2 : 3;
  const relFrame = phase === 1 ? frame : phase === 2 ? frame - phase1End : frame - phase2End;

  const phaseSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  // ── FASE 1: Pengertian Dasar Persamaan vs Pertidaksamaan ──
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
              FASE 1 DARI 3
            </span>
            <span className="text-xs font-bold text-slate-200">
              Hakikat Pertidaksamaan
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Pertidaksamaan adalah kalimat terbuka matematika yang menyatakan hubungan <strong>perbandingan ukuran</strong> antara dua ekspresi menggunakan tanda ketidaksamaan.
          </p>
        </div>

        {/* Tabel Perbandingan Persamaan vs Pertidaksamaan */}
        <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-3 shadow-md">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Perbandingan Karakteristik Solusi:
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg border border-slate-700 bg-slate-800/70 p-2">
              <div className="font-bold text-slate-300 text-[11px] mb-1">
                Persamaan (<MathFormula math="=" fontSize={12} color="#94a3b8" />)
              </div>
              <div className="text-[10px] text-slate-400">
                Solusinya berupa <strong>1 titik tunggal</strong>.
              </div>
              <div className="mt-1 rounded bg-slate-900 p-1 text-center font-mono text-emerald-400 text-[10px]">
                x = 3
              </div>
            </div>

            <div className="rounded-lg border border-sky-500/40 bg-sky-950/20 p-2">
              <div className="font-bold text-sky-400 text-[11px] mb-1">
                Pertidaksamaan (<MathFormula math="<, >, \le, \ge" fontSize={11} color="#38bdf8" />)
              </div>
              <div className="text-[10px] text-slate-300">
                Solusinya berupa <strong>rentang nilai (interval)</strong>.
              </div>
              <div className="mt-1 rounded bg-slate-900 p-1 text-center font-mono text-sky-300 text-[10px]">
                x &gt; 3 ➔ (3, ∞)
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const rightContent = (
      <div
        className="flex flex-col gap-2 w-full"
        style={{
          opacity: phaseSpring,
          transform: `scale(${0.96 + phaseSpring * 0.04})`,
        }}
      >
        <div className="text-center text-xs font-bold text-slate-200 mb-1">
          4 Tanda Ketidaksamaan Baku
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-2.5 shadow">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-base font-black text-sky-400">&lt;</span>
              <span className="text-[11px] font-bold text-slate-200">Kurang Dari</span>
            </div>
            <div className="text-[9.5px] text-slate-400">Nilai строго lebih kecil dari batas.</div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-2.5 shadow">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-base font-black text-sky-400">&gt;</span>
              <span className="text-[11px] font-bold text-slate-200">Lebih Dari</span>
            </div>
            <div className="text-[9.5px] text-slate-400">Nilai строго lebih besar dari batas.</div>
          </div>

          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-2.5 shadow">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-base font-black text-emerald-400">≤</span>
              <span className="text-[11px] font-bold text-emerald-300">Kurang Dari / Sama</span>
            </div>
            <div className="text-[9.5px] text-slate-300">Nilai maksimum; titik batas IKUT.</div>
          </div>

          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-2.5 shadow">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-base font-black text-emerald-400">≥</span>
              <span className="text-[11px] font-bold text-emerald-300">Lebih Dari / Sama</span>
            </div>
            <div className="text-[9.5px] text-slate-300">Nilai minimum; titik batas IKUT.</div>
          </div>
        </div>
      </div>
    );

    return (
      <SmartboardShell
        title="Pengertian & Tanda Pertidaksamaan"
        subtitle="Fase 1: Memahami Perbedaan Persamaan vs Pertidaksamaan"
        badge="PtLSV & PtLDV • FASE 1/3"
        stepBadge="Fase 1: Definisi & Simbol"
        leftColumn={leftContent}
        rightColumn={rightContent}
        footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
      />
    );
  }

  // ── FASE 2: Operasi Aman (Arah Tanda Tetap) ──
  if (phase === 2) {
    const leftContent = (
      <div
        className="flex flex-col gap-2.5"
        style={{
          opacity: phaseSpring,
          transform: `translateY(${(1 - phaseSpring) * 10}px)`,
        }}
      >
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-3 shadow-md">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-slate-900">
              ✓
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Operasi Aman (Arah Tanda Tetap)
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {GOLDEN_RULE.safeOperations}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-3 shadow-md space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Dua Kaidah Operasi Aman:
          </div>
          <div className="rounded bg-slate-800/80 p-2 border border-slate-700/60">
            <div className="text-[10.5px] font-semibold text-slate-200 mb-1">
              1. Penjumlahan & Pengurangan:
            </div>
            <MathFormula math="a < b \iff a \pm c < b \pm c \quad (\forall c \in \mathbb{R})" fontSize={12} color="#38bdf8" />
          </div>
          <div className="rounded bg-slate-800/80 p-2 border border-slate-700/60">
            <div className="text-[10.5px] font-semibold text-slate-200 mb-1">
              2. Perkalian / Pembagian Bilangan Positif:
            </div>
            <MathFormula math="a < b \iff a \cdot c < b \cdot c \quad (\text{untuk } c > 0)" fontSize={12} color="#10b981" />
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
        <div className="rounded-xl border border-emerald-500/30 bg-slate-900/90 p-4 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 border-b border-slate-800 pb-1.5 flex justify-between items-center">
            <span>Contoh Nyata Operasi Positif</span>
            <span className="text-[10px] font-mono text-slate-400">Bagi +2</span>
          </div>
          <div className="space-y-2.5 my-2">
            <div className="flex items-center justify-between font-mono text-sm bg-slate-800/70 p-2 rounded">
              <span className="text-slate-400 text-xs font-sans">Soal Awal:</span>
              <MathFormula math="2x < 6" fontSize={14} color="#f8fafc" />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Bagi kedua ruas dengan +2:</span>
              <span className="text-emerald-400 font-bold font-mono">2 &gt; 0 (Positif)</span>
            </div>
            <div className="flex items-center justify-between font-mono text-sm bg-emerald-950/40 border border-emerald-500/40 p-2 rounded">
              <span className="text-emerald-400 text-xs font-sans font-bold">Solusi:</span>
              <MathFormula math="x < 3" fontSize={14} color="#10b981" />
            </div>
          </div>
          <div className="text-[10px] text-emerald-300/80 text-center mt-2">
            Arah tanda &lt; TETAP &lt; karena pembagi adalah bilangan positif.
          </div>
        </div>
      </div>
    );

    return (
      <SmartboardShell
        title="Operasi Aman Pertidaksamaan"
        subtitle="Fase 2: Kaidah Penjumlahan, Pengurangan & Operasi Bilangan Positif"
        badge="PtLSV & PtLDV • FASE 2/3"
        stepBadge="Fase 2: Operasi Aman"
        leftColumn={leftContent}
        rightColumn={rightContent}
        footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
      />
    );
  }

  // ── FASE 3: Golden Rule (Kali/Bagi Bilangan Negatif Wajib Balik Tanda) ──
  const leftContent = (
    <div
      className="flex flex-col gap-2.5"
      style={{
        opacity: phaseSpring,
        transform: `translateY(${(1 - phaseSpring) * 10}px)`,
      }}
    >
      <AlertRuleCard
        title="Golden Rule (Aturan Kritis!)"
        message={GOLDEN_RULE.flipRule}
        operationLabel="×(-) atau ÷(-)"
        startRotateFrame={15}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-3 shadow-md text-xs">
        <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-1">
          Kaidah Formal Aljabar:
        </div>
        <div className="rounded bg-rose-950/30 p-2 border border-rose-500/40 font-mono text-center">
          <MathFormula math="a < b \iff a \cdot c > b \cdot c \quad (\text{untuk } c < 0)" fontSize={13} color="#f43f5e" />
        </div>
        <div className="text-[9.5px] text-slate-400 mt-1.5 leading-snug">
          Berlaku identik untuk tanda pertidaksamaan lainnya: <MathFormula math="\le" fontSize={11} color="#fca5a5" /> berbalik menjadi <MathFormula math="\ge" fontSize={11} color="#fca5a5" />.
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
      <div className="rounded-xl border-2 border-rose-500/50 bg-slate-900/90 p-4 shadow-xl">
        <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 border-b border-slate-800 pb-1.5 flex justify-between items-center">
          <span>Studi Kasus: Bahaya Negatif</span>
          <span className="text-[10px] font-mono text-rose-300">Bagi -2</span>
        </div>
        <div className="space-y-2.5 my-2">
          <div className="flex items-center justify-between font-mono text-sm bg-slate-800/70 p-2 rounded">
            <span className="text-slate-400 text-xs font-sans">Soal:</span>
            <MathFormula math="-2x < 6" fontSize={14} color="#f8fafc" />
          </div>
          <div className="flex items-center justify-between text-xs text-rose-300 px-1 font-semibold">
            <span>Bagi kedua ruas dengan -2:</span>
            <span>Tanda &lt; wajib dibalik!</span>
          </div>
          <div className="flex items-center justify-between font-mono text-sm bg-rose-950/40 border border-rose-500/60 p-2 rounded">
            <span className="text-rose-400 text-xs font-sans font-bold">Hasil:</span>
            <MathFormula math="x > \frac{6}{-2} \implies x > -3" fontSize={13} color="#f43f5e" />
          </div>
        </div>
        <div className="rounded bg-rose-950/30 p-2 text-center text-[10.5px] font-bold text-rose-300 border border-rose-500/40">
          ⚠️ Jangan lupa membalik tanda saat mengali/membagi dengan negatif!
        </div>
      </div>
    </div>
  );

  return (
    <SmartboardShell
      title="Golden Rule: Aturan Balik Tanda"
      subtitle="Fase 3: Bahaya Pembagian Negatif & Hukum Pembalikan Arah Tanda"
      badge="PtLSV & PtLDV • FASE 3/3"
      stepBadge="Fase 3: Golden Rule"
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

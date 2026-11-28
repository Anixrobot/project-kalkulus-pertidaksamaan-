import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { AlertRuleCard } from '../../components/math-v4/AlertRuleCard';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { GOLDEN_RULE } from '../../data/mathData';

export interface LinearSceneProps {
  durationInFrames?: number;
}

const getCardFocus = (
  relFrame: number,
  phaseDuration: number,
  revealAtRatio: number,
  activeUntilRatio: number
) => {
  const progress = relFrame / Math.max(1, phaseDuration);
  const revealed = progress >= revealAtRatio;
  const isActive = progress >= revealAtRatio && progress < activeUntilRatio;
  return {
    revealed,
    isActive,
    opacity: !revealed ? 0.18 : isActive ? 1 : 0.72,
  };
};

const Phase1Pengertian: React.FC<{ phaseDuration: number }> = ({ phaseDuration }) => {
  const relFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phaseSpring = spring({ frame: relFrame, fps, config: { damping: 15, stiffness: 85 } });

  const cDef = getCardFocus(relFrame, phaseDuration, 0, 0.32);
  const cComp = getCardFocus(relFrame, phaseDuration, 0.28, 0.62);
  const cSymStrict = getCardFocus(relFrame, phaseDuration, 0.56, 0.8);
  const cSymInc = getCardFocus(relFrame, phaseDuration, 0.75, 1.05);

  const leftContent = (
    <div
      className="flex flex-col gap-2.5"
      style={{
        opacity: Math.max(0.25, phaseSpring),
        transform: `translateY(${(1 - phaseSpring) * 8}px)`,
      }}
    >
      <div
        className="rounded-xl border p-3 shadow-md"
        style={{
          backgroundColor: cDef.isActive ? 'rgba(30, 41, 59, 0.95)' : 'rgba(30, 41, 59, 0.7)',
          borderColor: cDef.isActive ? '#38bdf8' : '#334155',
          opacity: cDef.opacity,
        }}
      >
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
      <div
        className="rounded-xl border p-3 shadow-md"
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          borderColor: cComp.isActive ? '#38bdf8' : 'rgba(51, 65, 85, 0.8)',
          opacity: cComp.opacity,
        }}
      >
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
              <MathFormula math="x = 3" fontSize={11} color="#10b981" />
            </div>
          </div>

          <div className="rounded-lg border border-sky-500/50 bg-sky-950/30 p-2">
            <div className="font-bold text-sky-400 text-[11px] mb-1">
              Pertidaksamaan (<MathFormula math="<, >, \le, \ge" fontSize={11} color="#38bdf8" />)
            </div>
            <div className="text-[10px] text-slate-300">
              Solusinya berupa <strong>rentang nilai (interval)</strong>.
            </div>
            <div className="mt-1 rounded bg-slate-900 p-1 text-center font-mono text-sky-300 text-[10px]">
              <MathFormula math="x > 3 \implies (3, \infty)" fontSize={10.5} color="#38bdf8" />
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
        opacity: Math.max(0.25, phaseSpring),
        transform: `scale(${0.97 + phaseSpring * 0.03})`,
      }}
    >
      <div className="text-center text-xs font-bold text-slate-200 mb-1">
        4 Tanda Ketidaksamaan Baku
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div
          className="rounded-xl border bg-slate-900/90 p-2.5 shadow"
          style={{
            borderColor: cSymStrict.isActive ? '#38bdf8' : '#334155',
            opacity: cSymStrict.opacity,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-base font-black text-sky-400">&lt;</span>
            <span className="text-[11px] font-bold text-slate-200">Kurang Dari</span>
          </div>
          <div className="text-[9.5px] text-slate-400">Nilai lebih kecil murni dari batas (batas tidak ikut).</div>
        </div>

        <div
          className="rounded-xl border bg-slate-900/90 p-2.5 shadow"
          style={{
            borderColor: cSymStrict.isActive ? '#38bdf8' : '#334155',
            opacity: cSymStrict.opacity,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-base font-black text-sky-400">&gt;</span>
            <span className="text-[11px] font-bold text-slate-200">Lebih Dari</span>
          </div>
          <div className="text-[9.5px] text-slate-400">Nilai lebih besar murni dari batas (batas tidak ikut).</div>
        </div>

        <div
          className="rounded-xl border bg-emerald-950/25 p-2.5 shadow"
          style={{
            borderColor: cSymInc.isActive ? '#10b981' : 'rgba(16, 185, 129, 0.4)',
            opacity: cSymInc.opacity,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-base font-black text-emerald-400">≤</span>
            <span className="text-[11px] font-bold text-emerald-300">Kurang Dari / Sama</span>
          </div>
          <div className="text-[9.5px] text-slate-300">Nilai maksimum; titik batas IKUT dalam solusi.</div>
        </div>

        <div
          className="rounded-xl border bg-emerald-950/25 p-2.5 shadow"
          style={{
            borderColor: cSymInc.isActive ? '#10b981' : 'rgba(16, 185, 129, 0.4)',
            opacity: cSymInc.opacity,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-base font-black text-emerald-400">≥</span>
            <span className="text-[11px] font-bold text-emerald-300">Lebih Dari / Sama</span>
          </div>
          <div className="text-[9.5px] text-slate-300">Nilai minimum; titik batas IKUT dalam solusi.</div>
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
};

const Phase2OperasiAman: React.FC<{ phaseDuration: number }> = ({ phaseDuration }) => {
  const relFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phaseSpring = spring({ frame: relFrame, fps, config: { damping: 15, stiffness: 85 } });

  const cSafeIntro = getCardFocus(relFrame, phaseDuration, 0, 0.3);
  const cRule1 = getCardFocus(relFrame, phaseDuration, 0.25, 0.55);
  const cRule2 = getCardFocus(relFrame, phaseDuration, 0.5, 0.8);
  const cEx = getCardFocus(relFrame, phaseDuration, 0.7, 1.05);

  const leftContent = (
    <div
      className="flex flex-col gap-2"
      style={{
        opacity: Math.max(0.25, phaseSpring),
        transform: `translateY(${(1 - phaseSpring) * 8}px)`,
      }}
    >
      <div
        className="rounded-xl border bg-emerald-950/25 p-2.5 shadow-md"
        style={{
          borderColor: cSafeIntro.isActive ? '#10b981' : 'rgba(16, 185, 129, 0.35)',
          opacity: cSafeIntro.opacity,
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-slate-900">
            ✓
          </span>
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
            Operasi Aman (Arah Tanda Tetap)
          </span>
        </div>
        <p className="text-[10.5px] text-slate-300 leading-relaxed">
          {GOLDEN_RULE.safeOperations}
        </p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-2.5 shadow-md space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Dua Kaidah Operasi Aman:
        </div>
        <div
          className="rounded bg-slate-800/80 p-2 border"
          style={{
            borderColor: cRule1.isActive ? '#38bdf8' : 'rgba(51, 65, 85, 0.6)',
            opacity: cRule1.opacity,
          }}
        >
          <div className="text-[10.5px] font-semibold text-slate-200 mb-1">
            1. Penjumlahan &amp; Pengurangan:
          </div>
          <MathFormula math="a < b \iff a \pm c < b \pm c \quad (\forall c \in \mathbb{R})" fontSize={12} color="#38bdf8" />
        </div>
        <div
          className="rounded bg-slate-800/80 p-2 border"
          style={{
            borderColor: cRule2.isActive ? '#10b981' : 'rgba(51, 65, 85, 0.6)',
            opacity: cRule2.opacity,
          }}
        >
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
        opacity: cEx.opacity,
        transform: `scale(${0.97 + phaseSpring * 0.03})`,
      }}
    >
      <div
        className="rounded-xl border-2 bg-slate-900/90 p-3.5 shadow-xl"
        style={{
          borderColor: cEx.isActive ? '#10b981' : 'rgba(16, 185, 129, 0.35)',
        }}
      >
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 border-b border-slate-800 pb-1.5 flex justify-between items-center">
          <span>Contoh Nyata Operasi Positif</span>
          <span className="text-[10px] font-mono text-slate-300">Bagi +2</span>
        </div>
        <div className="space-y-2 my-2">
          <div className="flex items-center justify-between font-mono text-sm bg-slate-800/70 p-2 rounded">
            <span className="text-slate-400 text-xs font-sans">Soal Awal:</span>
            <MathFormula math="2x < 6" fontSize={14} color="#f8fafc" />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300 px-1">
            <span>Bagi kedua ruas dengan +2:</span>
            <span className="text-emerald-400 font-bold font-mono">2 &gt; 0 (Positif)</span>
          </div>
          <div className="flex items-center justify-between font-mono text-sm bg-emerald-950/40 border border-emerald-500/40 p-2 rounded">
            <span className="text-emerald-400 text-xs font-sans font-bold">Solusi:</span>
            <MathFormula math="x < 3" fontSize={14} color="#10b981" />
          </div>
        </div>
        <div className="text-[10px] text-emerald-300/90 text-center mt-2">
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
};

const Phase3GoldenRule: React.FC<{ phaseDuration: number }> = ({ phaseDuration }) => {
  const relFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phaseSpring = spring({ frame: relFrame, fps, config: { damping: 15, stiffness: 85 } });

  const cAlert = getCardFocus(relFrame, phaseDuration, 0, 0.45);
  const cFormal = getCardFocus(relFrame, phaseDuration, 0.35, 0.7);
  const cCase = getCardFocus(relFrame, phaseDuration, 0.6, 1.05);

  const leftContent = (
    <div
      className="flex flex-col gap-2"
      style={{
        opacity: Math.max(0.25, phaseSpring),
        transform: `translateY(${(1 - phaseSpring) * 8}px)`,
      }}
    >
      <div style={{ opacity: cAlert.opacity }}>
        <AlertRuleCard
          title="Golden Rule (Aturan Kritis!)"
          message={GOLDEN_RULE.flipRule}
          operationLabel="×(-) atau ÷(-)"
          startRotateFrame={120}
        />
      </div>

      <div
        className="rounded-xl border-2 p-2.5 shadow-md text-xs"
        style={{
          backgroundColor: '#3b1120',
          borderColor: cFormal.isActive ? '#f43f5e' : 'rgba(244, 63, 94, 0.55)',
          opacity: cFormal.opacity,
        }}
      >
        <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#fecdd3' }}>
          Kaidah Formal Aljabar:
        </div>
        <div className="rounded bg-[#1e0911] p-1.5 border border-rose-500/50 font-mono text-center">
          <MathFormula math="a < b \iff a \cdot c > b \cdot c \quad (\text{untuk } c < 0)" fontSize={12.5} color="#ffffff" />
        </div>
        <div className="text-[9.5px] mt-1.5 leading-snug" style={{ color: '#fecdd3' }}>
          Berlaku identik untuk tanda lainnya: <MathFormula math="\le" fontSize={11} color="#ffffff" /> berbalik menjadi <MathFormula math="\ge" fontSize={11} color="#ffffff" />.
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div
      className="flex flex-col gap-2.5 w-full justify-center"
      style={{
        opacity: cCase.opacity,
        transform: `scale(${0.97 + phaseSpring * 0.03})`,
      }}
    >
      <div
        className="rounded-xl border-2 p-3.5 shadow-xl"
        style={{
          backgroundColor: '#3b1120',
          borderColor: cCase.isActive ? '#f43f5e' : 'rgba(244, 63, 94, 0.55)',
        }}
      >
        <div className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-rose-500/40 pb-1.5 flex justify-between items-center" style={{ color: '#fecdd3' }}>
          <span>Studi Kasus: Bahaya Negatif</span>
          <span className="text-[10px] font-mono bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">Bagi -2</span>
        </div>
        <div className="space-y-2 my-2">
          <div className="flex items-center justify-between font-mono text-sm bg-[#1e0911] p-2 rounded border border-rose-500/30">
            <span className="text-rose-200 text-xs font-sans">Soal:</span>
            <MathFormula math="-2x < 6" fontSize={14} color="#ffffff" />
          </div>
          <div className="flex items-center justify-between text-xs text-white px-1 font-semibold">
            <span>Bagi kedua ruas dengan -2:</span>
            <span className="text-amber-300">Tanda &lt; wajib dibalik!</span>
          </div>
          <div className="flex items-center justify-between font-mono text-sm bg-[#1e0911] border-2 border-rose-500 p-2 rounded">
            <span className="text-rose-200 text-xs font-sans font-bold">Hasil:</span>
            <MathFormula math="x > \frac{6}{-2} \implies x > -3" fontSize={13} color="#ffffff" />
          </div>
        </div>
        <div className="rounded bg-[#1e0911] p-2 text-center text-[10px] font-bold border border-rose-500/50" style={{ color: '#fecdd3' }}>
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

/**
 * LinearScene1_IntroAturanMutlak (Scene02-HukumFundamental — 2700f / 90 detik)
 * V4.2 Upgrade: 3 fase <Sequence> (30 dtk per fase), progressive card highlight, rotasi SVG < -> >.
 */
export const LinearScene1_IntroAturanMutlak: React.FC<LinearSceneProps> = () => {
  const { durationInFrames } = useVideoConfig();
  const phase1Dur = Math.floor(durationInFrames / 3);
  const phase2Dur = Math.floor(durationInFrames / 3);
  const phase3Dur = durationInFrames - phase1Dur - phase2Dur;

  return (
    <>
      <Sequence durationInFrames={phase1Dur} name="Fase 1: Pengertian & Simbol">
        <Phase1Pengertian phaseDuration={phase1Dur} />
      </Sequence>
      <Sequence from={phase1Dur} durationInFrames={phase2Dur} name="Fase 2: Operasi Aman">
        <Phase2OperasiAman phaseDuration={phase2Dur} />
      </Sequence>
      <Sequence from={phase1Dur + phase2Dur} durationInFrames={phase3Dur} name="Fase 3: Golden Rule">
        <Phase3GoldenRule phaseDuration={phase3Dur} />
      </Sequence>
    </>
  );
};

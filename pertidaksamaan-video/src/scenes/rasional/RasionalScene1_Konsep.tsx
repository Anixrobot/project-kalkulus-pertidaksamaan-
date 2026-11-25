import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { SignChart1D } from '../../components/math-v4/SignChart1D';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { CriticalPoint, RASIONAL_CONCEPT } from '../../data/rasionalData';

export interface RasionalSceneProps {
  durationInFrames?: number;
}

/**
 * RasionalScene1_Konsep (Scene06B-KonsepRasional, 1500f)
 * 3 Fase Bersih via <Sequence>:
 * - Fase 1 (0 - 450f, 30%): Pengertian f(x)/g(x) > 0, syarat mutlak g(x) != 0, 4 tanda pertidaksamaan.
 * - Fase 2 (450 - 975f, 35%): Konsep Titik Kritis (Pembilang vs Penyebut) + contoh pengantar (x-2)/(x+1) >= 0.
 * - Fase 3 (975 - 1500f, 35%): Tabel Uji Tanda (+/+, -/-, +/-, -/+) + 5 Langkah Penyelesaian Umum.
 */
export const RasionalScene1_Konsep: React.FC<RasionalSceneProps> = () => {
  const { durationInFrames } = useVideoConfig();
  const totalFrames = durationInFrames || 1500;
  const phase1Frames = Math.floor(totalFrames * 0.3); // 450f
  const phase2Frames = Math.floor(totalFrames * 0.35); // 525f
  const phase3Frames = totalFrames - phase1Frames - phase2Frames; // 525f

  // Titik kritis untuk contoh pengantar di Fase 2
  const introCriticalPoints: CriticalPoint[] = [
    { value: -1, source: 'denominator', included: false },
    { value: 2, source: 'numerator', included: true },
  ];

  return (
    <>
      {/* ── FASE 1: PENGERTIAN & BENTUK UMUM ── */}
      <Sequence durationInFrames={phase1Frames} name="Fase 1: Bentuk Umum">
        <SmartboardShell
          title="Konsep Pertidaksamaan Rasional"
          subtitle="Fase 1: Pengertian Pecahan Aljabar & Syarat Mutlak Penyebut"
          badge="RASIONAL • FASE 1/3"
          stepBadge="Fase 1: Pengertian"
          presenter="ikhsan"
          footerNote="Segmen 2: Pertidaksamaan Rasional • Pemateri: Ikhsan"
          leftColumn={
            <div className="flex flex-col gap-2 w-full">
              <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[9.5px] font-bold text-sky-400 border border-sky-500/30">
                    DEFINISI
                  </span>
                  <span className="text-[11px] font-bold text-slate-200">
                    Pertidaksamaan Rasional (Pecahan Aljabar)
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed">
                  Pertidaksamaan yang memuat bentuk pecahan dengan variabel <span className="text-sky-400 font-bold">x</span> pada pembilang dan/atau penyebutnya.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-2.5 shadow-md">
                <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  4 Bentuk Umum Pertidaksamaan:
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    '\\frac{f(x)}{g(x)} > 0',
                    '\\frac{f(x)}{g(x)} \\ge 0',
                    '\\frac{f(x)}{g(x)} < 0',
                    '\\frac{f(x)}{g(x)} \\le 0',
                  ].map((form, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-slate-800/70 py-1.5 px-2 text-center border border-slate-700/60"
                    >
                      <MathFormula math={form} fontSize={11.5} color="#38bdf8" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
          rightColumn={
            <div className="flex flex-col gap-2 w-full max-w-[325px]">
              <div className="rounded-xl border-2 border-rose-500/70 bg-rose-950/30 p-2.5 shadow-xl">
                <div className="flex items-center gap-1.5 mb-1 text-rose-400 font-bold text-[10.5px]">
                  <span>⚠️</span>
                  <span>SYARAT MUTLAK PECAHAN:</span>
                </div>
                <div className="rounded-lg bg-slate-900/90 p-2 text-center border border-rose-500/40 mb-1.5">
                  <MathFormula math="g(x) \neq 0" fontSize={16} color="#f43f5e" />
                </div>
                <p className="text-[9.5px] text-slate-300 leading-relaxed">
                  Penyebut suatu pecahan <strong>TIDAK BOLEH bernilai nol</strong>. Nilai pembuat nol penyebut tidak pernah boleh menjadi solusi!
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-800/90 p-2 shadow-md text-[9.5px] text-slate-300">
                <span className="font-bold text-sky-400">💡 Target Solusi: </span>
                Mencari interval nilai x real yang memenuhi tanda pertidaksamaan tanpa melanggar syarat penyebut.
              </div>
            </div>
          }
        />
      </Sequence>

      {/* ── FASE 2: TITIK KRITIS PEMBILANG VS PENYEBUT ── */}
      <Sequence from={phase1Frames} durationInFrames={phase2Frames} name="Fase 2: Titik Kritis">
        <SmartboardShell
          title="Konsep Titik Kritis (Critical Points)"
          subtitle="Fase 2: Pembilang (Boleh Ikut) vs Penyebut (Selalu Bulatan Kosong)"
          badge="RASIONAL • FASE 2/3"
          stepBadge="Fase 2: Titik Kritis"
          presenter="ikhsan"
          footerNote="Segmen 2: Pertidaksamaan Rasional • Pemateri: Ikhsan"
          leftColumn={
            <div className="flex flex-col gap-1.5 w-full">
              <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 shadow-md">
                <div className="text-[10px] font-bold text-amber-400 mb-1">
                  Contoh Pengantar: <MathFormula math="\frac{x - 2}{x + 1} \ge 0" fontSize={12} color="#fbbf24" />
                </div>
                <div className="space-y-1 text-[9.5px]">
                  <div className="rounded bg-emerald-950/30 border border-emerald-500/40 p-1.5 text-emerald-300">
                    <strong>1. Pembuat Nol Pembilang:</strong> <MathFormula math="x - 2 = 0 \implies x = 2" fontSize={11} color="#10b981" />
                    <div className="text-[9px] text-slate-300">Bulatan Penuh (●) karena tanda memakai sama dengan (≥).</div>
                  </div>
                  <div className="rounded bg-rose-950/30 border border-rose-500/40 p-1.5 text-rose-300">
                    <strong>2. Pembuat Nol Penyebut:</strong> <MathFormula math="x + 1 = 0 \implies x = -1" fontSize={11} color="#f43f5e" />
                    <div className="text-[9px] text-slate-300">SELALU Bulatan Kosong (○) karena syarat <MathFormula math="x \neq -1" fontSize={9} color="#f43f5e" />.</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-sky-500/40 bg-sky-950/20 p-2 text-[9.5px] text-sky-200">
                <strong>Aturan Emas:</strong> Titik kritis membagi garis bilangan menjadi beberapa daerah interval untuk diuji tanda positif atau negatifnya.
              </div>
            </div>
          }
          rightColumn={
            <div className="flex flex-col items-center justify-center w-full">
              <div className="mb-1 text-center">
                <div className="text-[11px] font-bold text-slate-200">Garis Bilangan Titik Kritis</div>
                <div className="text-[9px] text-slate-400">Titik -1 (○ penyebut) dan Titik 2 (● pembilang)</div>
              </div>
              <SignChart1D
                criticalPoints={introCriticalPoints}
                intervalSigns={['+', '-', '+']}
                axisRange={[-3, 4]}
                hpSign="+"
                hpInterval="(-\infty, -1) \cup [2, \infty)"
                accentColor="#10b981"
                width={315}
                height={118}
              />
            </div>
          }
        />
      </Sequence>

      {/* ── FASE 3: TABEL UJI TANDA & 5 LANGKAH EMAS ── */}
      <Sequence from={phase1Frames + phase2Frames} durationInFrames={phase3Frames} name="Fase 3: Tabel & Langkah">
        <SmartboardShell
          title="Tabel Uji Tanda & 5 Langkah Emas"
          subtitle="Fase 3: Menentukan Tanda Interval (+ / -) & Prosedur Sistematis"
          badge="RASIONAL • FASE 3/3"
          stepBadge="Fase 3: 5 Langkah"
          presenter="ikhsan"
          footerNote="Segmen 2: Pertidaksamaan Rasional • Pemateri: Ikhsan"
          leftColumn={
            <div className="flex flex-col gap-1.5 w-full">
              <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 shadow-md">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                  Aturan Tanda Pembagian (+ / -)
                </div>
                <div className="grid grid-cols-2 gap-1 text-[9.5px]">
                  <div className="rounded bg-slate-900/80 p-1 border border-slate-700/60 text-center font-mono text-emerald-400">
                    (+) / (+) = (+)
                  </div>
                  <div className="rounded bg-slate-900/80 p-1 border border-slate-700/60 text-center font-mono text-emerald-400">
                    (-) / (-) = (+)
                  </div>
                  <div className="rounded bg-slate-900/80 p-1 border border-slate-700/60 text-center font-mono text-rose-400">
                    (+) / (-) = (-)
                  </div>
                  <div className="rounded bg-slate-900/80 p-1 border border-slate-700/60 text-center font-mono text-rose-400">
                    (-) / (+) = (-)
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-2 shadow-md text-[9.5px] text-slate-300">
                <span className="font-bold text-sky-400">Penting: </span>
                Tanda pecahan persis sama dengan tanda perkalian suku-sukunya.
              </div>
            </div>
          }
          rightColumn={
            <div className="flex flex-col gap-1 w-full max-w-[325px]">
              <div className="text-[10.5px] font-bold text-slate-200 mb-0.5">5 Langkah Penyelesaian Umum:</div>
              {RASIONAL_CONCEPT.phases[2]?.goldenSteps?.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-700/70 bg-slate-800/80 px-2 py-1 text-[9.5px] text-slate-300 flex items-center gap-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          }
        />
      </Sequence>
    </>
  );
};


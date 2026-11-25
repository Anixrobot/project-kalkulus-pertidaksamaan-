import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { AbsoluteDistanceLine1D } from '../../components/math-v4/AbsoluteDistanceLine1D';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { MUTLAK_CONCEPT } from '../../data/mutlakData';

export interface MutlakSceneProps {
  durationInFrames?: number;
}

/**
 * MutlakScene1_Konsep (Scene10B-KonsepMutlak, 1500f)
 * 3 Fase Bersih via <Sequence>:
 * - Fase 1 (0 - 450f, 30%): Pengertian nilai mutlak |x| & konsep geometri jarak dari 0.
 * - Fase 2 (450 - 975f, 35%): Karakteristik 2 arah: Mengumpul di tengah (<) vs Memencar keluar (>).
 * - Fase 3 (975 - 1500f, 35%): 4 Langkah Emas penyelesaian aljabar.
 */
export const MutlakScene1_Konsep: React.FC<MutlakSceneProps> = () => {
  const { durationInFrames } = useVideoConfig();
  const totalFrames = durationInFrames || 1500;
  const phase1Frames = Math.floor(totalFrames * 0.3); // 450f
  const phase2Frames = Math.floor(totalFrames * 0.35); // 525f
  const phase3Frames = totalFrames - phase1Frames - phase2Frames; // 525f

  return (
    <>
      {/* ── FASE 1: PENGERTIAN & JARAK GEOMETRI ── */}
      <Sequence durationInFrames={phase1Frames} name="Fase 1: Konsep Jarak">
        <SmartboardShell
          title="Konsep Pertidaksamaan Nilai Mutlak"
          subtitle="Fase 1: Pengertian & Jarak Geometri dari Titik 0"
          badge="MUTLAK • FASE 1/3"
          stepBadge="Fase 1: Definisi Jarak"
          presenter="dimas"
          footerNote="Segmen 4: Pertidaksamaan Nilai Mutlak • Pemateri: Dimas"
          leftColumn={
            <div className="flex flex-col gap-2 w-full">
              <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded bg-violet-500/20 px-2 py-0.5 text-[9.5px] font-bold text-violet-400 border border-violet-500/30">
                    DEFINISI FORMAL
                  </span>
                  <span className="text-[11px] font-bold text-slate-200">
                    Nilai Mutlak Suku Tunggal
                  </span>
                </div>
                <div className="rounded-lg bg-slate-900/90 p-2 border border-slate-700/60 my-1 text-center">
                  <MathFormula
                    math="|x| = \begin{cases} x, & \text{jika } x \ge 0 \\ -x, & \text{jika } x < 0 \end{cases}"
                    fontSize={11.5}
                    color="#a78bfa"
                  />
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed mt-1">
                  Secara geometri, <span className="text-violet-400 font-bold">|x|</span> menyatakan jarak titik x dari titik asal 0 pada garis bilangan real.
                </p>
              </div>

              <div className="rounded-xl border border-violet-500/40 bg-violet-950/20 p-2 shadow-md">
                <div className="text-[9.5px] font-bold uppercase tracking-wider text-violet-300 mb-0.5">
                  Prinsip Mutlak Jarak:
                </div>
                <div className="text-[10px] text-slate-300 leading-snug">
                  Karena jarak tidak pernah berarah negatif, maka untuk setiap bilangan real x berlaku:
                  <div className="text-center font-bold text-emerald-400 mt-1 font-mono text-[11px]">
                    <MathFormula math="|x| \ge 0 \quad (\text{selalu non-negatif})" fontSize={11} color="#10b981" />
                  </div>
                </div>
              </div>
            </div>
          }
          rightColumn={
            <div className="flex flex-col items-center justify-center w-full gap-2">
              <div className="text-[11.5px] font-bold text-slate-200 text-center">
                Visualisasi Jarak Simetris Dari 0
              </div>
              <AbsoluteDistanceLine1D
                mode="concept_distance"
                conceptDistanceA={3}
                bounds={[{ value: -3, included: true }, { value: 3, included: true }]}
                axisRange={[-5, 5]}
                accentColor="#a78bfa"
                width={315}
                height={120}
              />
              <div className="rounded-lg bg-slate-800/80 p-2 border border-slate-700/60 text-center w-full max-w-[315px]">
                <span className="text-[9.5px] text-slate-300">
                  Jarak titik <span className="text-violet-300 font-bold">-3</span> ke 0 adalah 3. Jarak titik <span className="text-violet-300 font-bold">+3</span> ke 0 juga sama-sama 3.
                </span>
              </div>
            </div>
          }
        />
      </Sequence>

      {/* ── FASE 2: KARAKTERISTIK 2 ARAH ── */}
      <Sequence from={phase1Frames} durationInFrames={phase2Frames} name="Fase 2: Karakteristik 2 Arah">
        <SmartboardShell
          title="Konsep Pertidaksamaan Nilai Mutlak"
          subtitle="Fase 2: Karakteristik 2 Arah: Mengumpul vs Memencar"
          badge="MUTLAK • FASE 2/3"
          stepBadge="Fase 2: 2 Arah Solusi"
          presenter="dimas"
          footerNote="Segmen 4: Pertidaksamaan Nilai Mutlak • Pemateri: Dimas"
          leftColumn={
            <div className="flex flex-col gap-2 w-full">
              {/* Kasus 1: Mengumpul di tengah */}
              <div className="rounded-xl border border-emerald-500/40 bg-slate-800/80 p-2 shadow-md">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
                    TANDA &lt; atau &le;
                  </span>
                  <span className="text-[10.5px] font-bold text-slate-200">
                    Jarak Dekat (Mengumpul di Tengah)
                  </span>
                </div>
                <div className="rounded bg-slate-900/90 p-1.5 border border-slate-700/60 text-center">
                  <MathFormula math="|f(x)| \le a \iff -a \le f(x) \le a" fontSize={11.5} color="#10b981" />
                </div>
                <div className="text-[9.5px] text-slate-300 mt-1">
                  Himpunan berupa satu ruas bersambung diapit batas kiri -a dan batas kanan +a.
                </div>
              </div>

              {/* Kasus 2: Memencar keluar */}
              <div className="rounded-xl border border-amber-500/40 bg-slate-800/80 p-2 shadow-md">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-400 border border-amber-500/30">
                    TANDA &gt; atau &ge;
                  </span>
                  <span className="text-[10.5px] font-bold text-slate-200">
                    Jarak Jauh (Memencar Keluar)
                  </span>
                </div>
                <div className="rounded bg-slate-900/90 p-1.5 border border-slate-700/60 text-center">
                  <MathFormula math="|f(x)| \ge a \iff f(x) \le -a \;\lor\; f(x) \ge a" fontSize={11.5} color="#fbbf24" />
                </div>
                <div className="text-[9.5px] text-slate-300 mt-1">
                  Himpunan terpecah menjadi dua sinar terpisah ke kiri dan ke kanan kata sambung ATAU.
                </div>
              </div>
            </div>
          }
          rightColumn={
            <div className="flex flex-col items-center justify-center w-full gap-1.5">
              <div className="text-[11px] font-bold text-slate-200 text-center">
                Pola Interval Garis Bilangan
              </div>
              <AbsoluteDistanceLine1D
                mode="solution"
                pattern="inside_between"
                bounds={[
                  { value: -3, label: '-a', included: true },
                  { value: 3, label: '+a', included: true },
                ]}
                axisRange={[-5, 5]}
                hpInterval="[-a, a]"
                accentColor="#10b981"
                width={315}
                height={84}
              />
              <AbsoluteDistanceLine1D
                mode="solution"
                pattern="outside_split"
                bounds={[
                  { value: -3, label: '-a', included: true, direction: 'left' },
                  { value: 3, label: '+a', included: true, direction: 'right' },
                ]}
                axisRange={[-5, 5]}
                hpInterval="(-\infty, -a] \cup [a, \infty)"
                accentColor="#fbbf24"
                width={315}
                height={84}
              />
            </div>
          }
        />
      </Sequence>

      {/* ── FASE 3: 4 LANGKAH EMAS PENYELESAIAN ── */}
      <Sequence from={phase1Frames + phase2Frames} durationInFrames={phase3Frames} name="Fase 3: 4 Langkah Emas">
        <SmartboardShell
          title="Konsep Pertidaksamaan Nilai Mutlak"
          subtitle="Fase 3: 4 Langkah Emas Menyelesaikan Masalah Nilai Mutlak"
          badge="MUTLAK • FASE 3/3"
          stepBadge="Fase 3: 4 Langkah Emas"
          presenter="dimas"
          footerNote="Segmen 4: Pertidaksamaan Nilai Mutlak • Pemateri: Dimas"
          leftColumn={
            <div className="flex flex-col gap-1.5 w-full">
              <div className="rounded-xl border border-violet-500/40 bg-violet-950/30 p-2 shadow-md">
                <div className="text-[10px] font-bold uppercase tracking-wider text-violet-300 mb-0.5">
                  4 TAHAPAN PROSEDURAL SISTEMATIS
                </div>
                <div className="text-[9.5px] text-slate-300">
                  Ikuti alur terstruktur ini untuk menghindari jebakan tanda negatif dan pecahan aljabar.
                </div>
              </div>

              <div className="space-y-1">
                {MUTLAK_CONCEPT.phases[2]?.steps?.map((st, i) => (
                  <div key={i} className="rounded-lg border border-slate-700 bg-slate-800/80 p-1.5 shadow-sm">
                    <span className="text-[10px] text-slate-200 leading-snug font-medium block">
                      {st}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          }
          rightColumn={
            <div className="flex flex-col gap-2 w-full justify-center">
              <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-2.5 shadow-md">
                <div className="text-[10.5px] font-bold text-violet-300 mb-1">
                  Peringatan Logika Ruas Kanan:
                </div>
                <div className="space-y-1.5 text-[9.5px] text-slate-300">
                  <div className="rounded bg-rose-950/40 border border-rose-500/40 p-1.5">
                    <span className="font-bold text-rose-400 block mb-0.5">Bentuk |f(x)| &lt; -c (c &gt; 0):</span>
                    Tidak ada nilai mutlak yang negatif. Langsung himpunan kosong: <span className="font-mono text-rose-300">HP = ∅</span>.
                  </div>
                  <div className="rounded bg-emerald-950/40 border border-emerald-500/40 p-1.5">
                    <span className="font-bold text-emerald-400 block mb-0.5">Bentuk |f(x)| &gt; -c (c &gt; 0):</span>
                    Nilai mutlak selalu ≥ 0, sehingga selalu lebih dari bilangan negatif. Solusi: <span className="font-mono text-emerald-300">HP = ℝ</span>.
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 text-center">
                <div className="text-[10px] font-bold text-slate-200">
                  Siap Membahas Contoh Soal 1 &amp; 2
                </div>
                <div className="text-[9px] text-slate-400">
                  Kasus Kurang Dari (&lt;) dan Lebih Dari Sama Dengan (&ge;)
                </div>
              </div>
            </div>
          }
        />
      </Sequence>
    </>
  );
};

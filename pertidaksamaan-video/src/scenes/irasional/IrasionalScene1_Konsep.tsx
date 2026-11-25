import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { IRASIONAL_CONCEPT } from '../../data/irasionalData';

export interface IrasionalSceneProps {
  durationInFrames?: number;
}

/**
 * IrasionalScene1_Konsep (Scene08B-KonsepIrasional, 1500f)
 * 3 Fase Bersih via <Sequence>:
 * - Fase 1 (0 - 450f, 30%): Pengertian bentuk akar variabel + 3 contoh bentuk.
 * - Fase 2 (450 - 975f, 35%): 2 Prinsip Mutlak: Syarat Numerus f(x) >= 0 dan hasil akar sqrt(f(x)) >= 0.
 * - Fase 3 (975 - 1500f, 35%): 3 Langkah Umum (Syarat Akar -> Kuadratkan -> Irisan) + Bentuk I & II.
 */
export const IrasionalScene1_Konsep: React.FC<IrasionalSceneProps> = () => {
  const { durationInFrames } = useVideoConfig();
  const totalFrames = durationInFrames || 1500;
  const phase1Frames = Math.floor(totalFrames * 0.3); // 450f
  const phase2Frames = Math.floor(totalFrames * 0.35); // 525f
  const phase3Frames = totalFrames - phase1Frames - phase2Frames; // 525f

  return (
    <>
      {/* ── FASE 1: PENGERTIAN & CIRI KHAS ── */}
      <Sequence durationInFrames={phase1Frames} name="Fase 1: Bentuk Akar">
        <SmartboardShell
          title="Konsep Pertidaksamaan Irasional"
          subtitle="Fase 1: Pengertian Variabel di Bawah Tanda Akar"
          badge="IRASIONAL • FASE 1/3"
          stepBadge="Fase 1: Bentuk Akar"
          presenter="pras"
          footerNote="Segmen 3: Pertidaksamaan Irasional • Pemateri: Pras"
          leftColumn={
            <div className="flex flex-col gap-2 w-full">
              <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[9.5px] font-bold text-sky-400 border border-sky-500/30">
                    DEFINISI
                  </span>
                  <span className="text-[11px] font-bold text-slate-200">
                    Pertidaksamaan Irasional (Bentuk Akar)
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed">
                  Pertidaksamaan yang memuat variabel (seperti <span className="text-sky-400 font-bold">x</span>) di dalam tanda akar kuadrat <MathFormula math="\sqrt{\dots}" fontSize={11} color="#38bdf8" />.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-2.5 shadow-md">
                <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  3 Contoh Bentuk Pertidaksamaan Irasional:
                </div>
                <div className="space-y-1 font-mono text-sky-300 text-[10.5px]">
                  {IRASIONAL_CONCEPT.phases[0]?.generalForms?.map((eq, i) => (
                    <div key={i} className="rounded bg-slate-800/70 p-1.5 border border-slate-700/60 text-center">
                      <MathFormula math={eq} fontSize={12} color="#38bdf8" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
          rightColumn={
            <div className="flex flex-col gap-2 w-full max-w-[325px]">
              <div className="rounded-xl border border-amber-500/50 bg-amber-950/20 p-2.5 shadow-md">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[10.5px] mb-1">
                  <span>💡</span>
                  <span>Tantangan Utama:</span>
                </div>
                <p className="text-[9.5px] text-slate-300 leading-relaxed">
                  Operasi aljabar biasa tidak boleh langsung diterapkan! Kita wajib memastikan angka di dalam akar bernilai sah (tidak menghasilkan bilangan imajiner).
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-800/90 p-2 text-[9.5px] text-slate-300">
                <span className="font-bold text-sky-400">Target Belajar: </span>
                Menguasai cara mencari irisan antara daerah syarat akar dan hasil pengkuadratan kedua ruas.
              </div>
            </div>
          }
        />
      </Sequence>

      {/* ── FASE 2: 2 PRINSIP MUTLAK SYARAT AKAR ── */}
      <Sequence from={phase1Frames} durationInFrames={phase2Frames} name="Fase 2: 2 Prinsip Mutlak">
        <SmartboardShell
          title="2 Prinsip Mutlak Syarat Akar"
          subtitle="Fase 2: Syarat Numerus f(x) ≥ 0 & Hasil Akar Selalu Non-Negatif"
          badge="IRASIONAL • FASE 2/3"
          stepBadge="Fase 2: 2 Prinsip"
          presenter="pras"
          footerNote="Segmen 3: Pertidaksamaan Irasional • Pemateri: Pras"
          leftColumn={
            <div className="flex flex-col gap-2 w-full">
              <div className="rounded-xl border-2 border-rose-500/70 bg-rose-950/30 p-2.5 shadow-xl">
                <div className="flex items-center gap-1.5 mb-1 text-rose-400 font-bold text-[10px]">
                  <span>⚠️</span>
                  <span>PRINSIP 1: SYARAT NUMERUS (DALAM AKAR)</span>
                </div>
                <div className="rounded-lg bg-slate-900/90 p-2 text-center border border-rose-500/40 mb-1">
                  <MathFormula math="f(x) \ge 0" fontSize={16} color="#f43f5e" />
                </div>
                <p className="text-[9.5px] text-slate-300 leading-relaxed">
                  Bagian di dalam akar kuadrat <strong>TIDAK BOLEH NEGATIF</strong> agar terdefinisi pada himpunan bilangan real.
                </p>
              </div>
            </div>
          }
          rightColumn={
            <div className="flex flex-col gap-2 w-full max-w-[325px]">
              <div className="rounded-xl border border-sky-500/50 bg-sky-950/20 p-2.5 shadow-md">
                <div className="flex items-center gap-1.5 mb-1 text-sky-400 font-bold text-[10px]">
                  <span>✨</span>
                  <span>PRINSIP 2: HASIL AKAR NON-NEGATIF</span>
                </div>
                <div className="rounded-lg bg-slate-900/90 p-2 text-center border border-sky-500/40 mb-1">
                  <MathFormula math="\sqrt{f(x)} \ge 0" fontSize={16} color="#38bdf8" />
                </div>
                <p className="text-[9.5px] text-slate-300 leading-relaxed">
                  Akar utama selalu menghasilkan nilai positif atau nol. Akar kuadrat tidak pernah bernilai negatif!
                </p>
              </div>
            </div>
          }
        />
      </Sequence>

      {/* ── FASE 3: 3 LANGKAH EMAS & 2 BENTUK UTAMA ── */}
      <Sequence from={phase1Frames + phase2Frames} durationInFrames={phase3Frames} name="Fase 3: 3 Langkah Emas">
        <SmartboardShell
          title="3 Langkah Emas & 2 Bentuk Utama"
          subtitle="Fase 3: Prosedur Pengkuadratan & Penarikan Irisan Daerah"
          badge="IRASIONAL • FASE 3/3"
          stepBadge="Fase 3: 3 Langkah"
          presenter="pras"
          footerNote="Segmen 3: Pertidaksamaan Irasional • Pemateri: Pras"
          leftColumn={
            <div className="flex flex-col gap-1.5 w-full">
              <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 shadow-md">
                <div className="text-[10px] font-bold text-amber-400 mb-1">
                  3 Langkah Penyelesaian Emas:
                </div>
                <div className="space-y-1 text-[9px] text-slate-300">
                  {IRASIONAL_CONCEPT.phases[2]?.steps?.map((st, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-2 text-[9.5px] text-emerald-200">
                <strong>Kunci Final:</strong> HP akhir adalah IRISAN (persekutuan) dari seluruh syarat yang ada.
              </div>
            </div>
          }
          rightColumn={
            <div className="flex flex-col gap-1.5 w-full max-w-[325px]">
              <div className="text-[10px] font-bold text-slate-200 mb-0.5">2 Bentuk Soal Utama:</div>
              {IRASIONAL_CONCEPT.phases[2]?.forms?.map((f, i) => (
                <div key={i} className="rounded-lg border border-slate-700 bg-slate-800/90 p-2 shadow">
                  <div className="text-[9.5px] font-bold text-sky-400 mb-0.5">{f.title}</div>
                  <div className="rounded bg-slate-900/80 p-1 text-center font-mono">
                    <MathFormula math={f.eq} fontSize={10} color="#fbbf24" />
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </Sequence>
    </>
  );
};


import React from 'react';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { IRASIONAL_SUMMARY } from '../../data/irasionalData';

export const IrasionalScene_Ringkasan: React.FC = () => {
  return (
    <SmartboardShell
      title="Ringkasan Materi Pertidaksamaan Irasional"
      subtitle="3 Pilar Kunci Menyelesaikan Bentuk Akar Tanpa Terkecoh"
      badge="IRASIONAL • RINGKASAN"
      stepBadge="Kesimpulan Segmen 3"
      presenter="pras"
      footerNote="Segmen 3: Pertidaksamaan Irasional • Pemateri: Pras"
      leftColumn={
        <div className="flex flex-col gap-2 w-full">
          <div className="rounded-xl border border-sky-500/50 bg-sky-950/30 p-2 shadow-md">
            <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400 mb-0.5">
              3 PILAR POKOK BENTUK AKAR
            </div>
            <p className="text-[9.5px] text-slate-300">
              Jangan pernah langsung menguadratkan sebelum memastikan kedua ruas non-negatif dan memeriksa syarat numerus.
            </p>
          </div>

          <div className="space-y-1.5">
            {IRASIONAL_SUMMARY.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-700 bg-slate-800/80 p-2 shadow-sm"
              >
                <div className="text-[10.5px] font-bold text-sky-300 mb-0.5">
                  {pillar.title}
                </div>
                <div className="text-[9.5px] text-slate-300 leading-snug">
                  {pillar.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      rightColumn={
        <div className="flex flex-col gap-2 w-full justify-center">
          <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-2.5 shadow-md">
            <div className="text-[10.5px] font-bold text-emerald-400 mb-1">
              Rumus Kunci Operasi Akar
            </div>
            <div className="space-y-1.5 text-[10px]">
              <div className="rounded bg-slate-800/80 p-1.5 border border-slate-700/60">
                <span className="text-slate-400 block text-[9px] mb-0.5">Definisi Domain (Syarat Numerus):</span>
                <MathFormula math="\sqrt{f(x)} \implies f(x) \ge 0" fontSize={11} color="#38bdf8" />
              </div>
              <div className="rounded bg-slate-800/80 p-1.5 border border-slate-700/60">
                <span className="text-slate-400 block text-[9px] mb-0.5">Pengkuadratan Ruas Non-Negatif:</span>
                <MathFormula math="0 \le A < B \iff A^2 < B^2" fontSize={11} color="#10b981" />
              </div>
              <div className="rounded bg-slate-800/80 p-1.5 border border-slate-700/60">
                <span className="text-slate-400 block text-[9px] mb-0.5">Himpunan Akhir:</span>
                <MathFormula math="\text{HP} = \text{Daerah Syarat} \cap \text{Daerah Kuadrat}" fontSize={11} color="#fbbf24" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-indigo-500/40 bg-indigo-950/30 p-2 text-center">
            <div className="text-[10px] font-bold text-indigo-300">
              Berikutnya: Pertidaksamaan Nilai Mutlak
            </div>
            <div className="text-[9px] text-slate-400">
              Bersama Dimas Pratama (Segmen 4)
            </div>
          </div>
        </div>
      }
    />
  );
};

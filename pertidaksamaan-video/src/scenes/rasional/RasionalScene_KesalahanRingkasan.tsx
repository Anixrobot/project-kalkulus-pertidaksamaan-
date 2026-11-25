import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { RASIONAL_MISTAKES_SUMMARY } from '../../data/rasionalData';

export const RasionalScene_KesalahanRingkasan: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const totalFrames = durationInFrames || 1050;
  const phase1Frames = Math.floor(totalFrames * 0.6); // 630f
  const phase2Frames = totalFrames - phase1Frames; // 420f

  return (
    <>
      {/* ── FASE 1: 4 KESALAHAN UMUM (ALERT MERAH) ── */}
      <Sequence durationInFrames={phase1Frames} name="Fase 1: 4 Kesalahan Umum">
        <SmartboardShell
          title="Evaluasi 4 Kesalahan Fatal"
          subtitle="Jebakan Umum Pertidaksamaan Rasional yang Wajib Dihindari"
          badge="RASIONAL • EVALUASI"
          stepBadge="Fase 1: 4 Kesalahan"
          presenter="ikhsan"
          footerNote="Segmen 2: Pertidaksamaan Rasional • Pemateri: Ikhsan"
          leftColumn={
            <div className="flex flex-col gap-1.5 w-full">
              {RASIONAL_MISTAKES_SUMMARY.mistakes.slice(0, 2).map((m, idx) => (
                <div key={idx} className="rounded-xl border border-rose-500/50 bg-rose-950/20 p-2 shadow">
                  <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[10px] mb-1">
                    <span>⚠️</span>
                    <span>{m.title}</span>
                  </div>
                  <p className="text-[9px] text-slate-300 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          }
          rightColumn={
            <div className="flex flex-col gap-1.5 w-full max-w-[325px]">
              {RASIONAL_MISTAKES_SUMMARY.mistakes.slice(2, 4).map((m, idx) => (
                <div key={idx} className="rounded-xl border border-rose-500/50 bg-rose-950/20 p-2 shadow">
                  <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[10px] mb-1">
                    <span>⚠️</span>
                    <span>{m.title}</span>
                  </div>
                  <p className="text-[9px] text-slate-300 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          }
        />
      </Sequence>

      {/* ── FASE 2: RINGKASAN INTI PERTIDAKSAMAAN RASIONAL ── */}
      <Sequence from={phase1Frames} durationInFrames={phase2Frames} name="Fase 2: Ringkasan Inti">
        <SmartboardShell
          title="Ringkasan Inti Pertidaksamaan Rasional"
          subtitle="Ikhtisar Langkah & Kaidah Penyelesaian Pecahan Aljabar"
          badge="RASIONAL • KESIMPULAN"
          stepBadge="Fase 2: Ringkasan"
          presenter="ikhsan"
          footerNote="Segmen 2: Pertidaksamaan Rasional • Pemateri: Ikhsan"
          leftColumn={
            <div className="flex flex-col gap-1.5 w-full">
              <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 shadow-md">
                <div className="text-[10px] font-bold text-emerald-400 mb-1">
                  Kunci Keberhasilan Pertidaksamaan Rasional:
                </div>
                <div className="space-y-1 text-[9px] text-slate-300">
                  {RASIONAL_MISTAKES_SUMMARY.summaryPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
          rightColumn={
            <div className="flex flex-col gap-2 w-full max-w-[325px]">
              <div className="rounded-xl border border-emerald-500/50 bg-emerald-950/30 p-2.5 shadow-xl text-center">
                <div className="text-emerald-400 font-bold text-xs mb-1">🎉 Materi Rasional Selesai!</div>
                <p className="text-[9.5px] text-slate-300 leading-relaxed mb-2">
                  Selanjutnya, rekan kita <strong>Pras</strong> akan membedah tuntas materi <strong>Pertidaksamaan Irasional (Bentuk Akar)</strong>.
                </p>
                <div className="rounded-lg bg-slate-900/90 py-1.5 px-2 border border-slate-700/60 font-mono text-sky-400 text-[10px]">
                  Menuju Segmen 3: Pras — Pertidaksamaan Irasional ➔
                </div>
              </div>
            </div>
          }
        />
      </Sequence>
    </>
  );
};

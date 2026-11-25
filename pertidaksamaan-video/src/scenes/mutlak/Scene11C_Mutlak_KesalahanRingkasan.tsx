import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { MathFormula } from '../../components/math-v4/MathFormula';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { MUTLAK_MISTAKES_SUMMARY } from '../../data/mutlakData';

export interface MutlakKesalahanProps {
  durationInFrames?: number;
}

export const Scene11C_Mutlak_KesalahanRingkasan: React.FC<MutlakKesalahanProps> = () => {
  const { durationInFrames } = useVideoConfig();
  const totalFrames = durationInFrames || 1200;
  const phase1Frames = Math.floor(totalFrames * 0.5); // 600f
  const phase2Frames = totalFrames - phase1Frames; // 600f

  return (
    <>
      {/* ── FASE 1: 3 KESALAHAN UMUM SISWA ── */}
      <Sequence durationInFrames={phase1Frames} name="Fase 1: 3 Kesalahan Umum">
        <SmartboardShell
          title="Evaluasi & Kesalahan Umum Nilai Mutlak"
          subtitle="Fase 1: 3 Jebakan Logika & Kesalahan Konseptual Terbanyak"
          badge="MUTLAK • EVALUASI"
          stepBadge="Fase 1: 3 Jebakan Fatal"
          presenter="dimas"
          footerNote="Segmen 4: Pertidaksamaan Nilai Mutlak • Pemateri: Dimas"
          leftColumn={
            <div className="flex flex-col gap-1.5 w-full">
              <div className="rounded-xl border border-rose-500/50 bg-rose-950/30 p-1.5 shadow-md">
                <div className="text-[9.5px] font-bold uppercase tracking-wider text-rose-400 mb-0.5">
                  PERINGATAN EVALUASI
                </div>
                <div className="text-[9px] text-slate-300">
                  Hindari 3 kekeliruan fatal yang sering mengurangi poin saat ujian:
                </div>
              </div>

              <div className="space-y-1">
                {MUTLAK_MISTAKES_SUMMARY.mistakes.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-slate-700 bg-slate-800/80 p-1.5 shadow-sm">
                    <div className="text-[10px] font-bold text-rose-300 mb-0.5">
                      {item.title}
                    </div>
                    <div className="text-[9px] text-slate-300 leading-snug">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          rightColumn={
            <div className="flex flex-col gap-2 w-full justify-center">
              <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-2.5 shadow-md">
                <div className="text-[10.5px] font-bold text-violet-300 mb-1">
                  Analisis Cepat Kasus Khusus:
                </div>
                <div className="space-y-1.5 text-[9.5px]">
                  <div className="rounded bg-slate-800/80 p-1.5 border border-slate-700/60">
                    <span className="text-slate-400 block text-[9px] mb-0.5">Kasus 1: |2x - 1| &lt; -4</span>
                    <span className="text-rose-400 font-bold">Langsung HP = ∅</span> (tidak ada bilangan real yang jaraknya negatif).
                  </div>
                  <div className="rounded bg-slate-800/80 p-1.5 border border-slate-700/60">
                    <span className="text-slate-400 block text-[9px] mb-0.5">Kasus 2: |3x + 5| &ge; -2</span>
                    <span className="text-emerald-400 font-bold">Langsung HP = ℝ</span> (karena |...| selalu &ge; 0 &gt; -2).
                  </div>
                  <div className="rounded bg-slate-800/80 p-1.5 border border-slate-700/60">
                    <span className="text-slate-400 block text-[9px] mb-0.5">Kasus 3: -2x &lt; 6</span>
                    <span className="text-amber-400 font-bold">Wajib balik tanda:</span> x &gt; -3 saat dibagi bilangan negatif.
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </Sequence>

      {/* ── FASE 2: TABEL 4 RUMUS CEPAT NILAI MUTLAK ── */}
      <Sequence from={phase1Frames} durationInFrames={phase2Frames} name="Fase 2: Tabel Rumus Cepat">
        <SmartboardShell
          title="Tabel Referensi Rumus Cepat Nilai Mutlak"
          subtitle="Fase 2: 4 Rumus Standar Hubungan Tanda & Solusi Interval"
          badge="MUTLAK • RUMUS CEPAT"
          stepBadge="Fase 2: Ringkasan Rumus"
          presenter="dimas"
          footerNote="Segmen 4: Pertidaksamaan Nilai Mutlak • Pemateri: Dimas"
          leftColumn={
            <div className="flex flex-col gap-1.5 w-full">
              <div className="rounded-xl border border-violet-500/50 bg-violet-950/30 p-2 shadow-md">
                <div className="text-[10px] font-bold tracking-wider text-violet-300 mb-0.5">
                  PANDUAN OPERASI CEPAT (a &gt; 0)
                </div>
                <div className="text-[9.5px] text-slate-300">
                  Hafalkan pola bentuk pertidaksamaan untuk menentukan arah penyelesaian secara instan.
                </div>
              </div>

              <div className="space-y-1">
                {MUTLAK_MISTAKES_SUMMARY.quickReferenceTable.map((row, idx) => (
                  <div key={idx} className="rounded-lg border border-slate-700 bg-slate-800/80 p-1.5 shadow-sm">
                    <div className="flex items-center justify-between mb-0.5">
                      <MathFormula math={row.form} fontSize={11} color="#a78bfa" />
                      <span className="text-[8.5px] font-medium text-emerald-400 bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-500/30">
                        {row.type}
                      </span>
                    </div>
                    <div className="rounded bg-slate-900/90 px-1.5 py-0.5 border border-slate-700/60">
                      <MathFormula math={row.solution} fontSize={10.5} color="#38bdf8" />
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
                  Ikhtisar 4 Segmen Pertidaksamaan
                </div>
                <div className="space-y-1.5 text-[9.5px] text-slate-300">
                  <div className="p-1 rounded bg-slate-800/80 border border-slate-700/60">
                    <span className="text-sky-300 font-bold">1. Linear (Rafie):</span> Balik tanda saat kali/bagi negatif &amp; uji titik DHP.
                  </div>
                  <div className="p-1 rounded bg-slate-800/80 border border-slate-700/60">
                    <span className="text-emerald-300 font-bold">2. Rasional (Ikhsan):</span> Syarat penyebut ≠ 0, jangan kali silang, bulatan kosong.
                  </div>
                  <div className="p-1 rounded bg-slate-800/80 border border-slate-700/60">
                    <span className="text-amber-300 font-bold">3. Irasional (Pras):</span> Wajib syarat numerus ≥ 0 dan irisan pengkuadratan.
                  </div>
                  <div className="p-1 rounded bg-slate-800/80 border border-slate-700/60">
                    <span className="text-violet-300 font-bold">4. Mutlak (Dimas):</span> Konsep jarak, &lt; mengumpul tengah, &gt; memencar keluar.
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-2 text-center">
                <div className="text-[10px] font-bold text-emerald-300">
                  Materi Lengkap Selesai!
                </div>
                <div className="text-[9px] text-slate-400">
                  Lanjut ke Closing &amp; Kesimpulan Kelompok
                </div>
              </div>
            </div>
          }
        />
      </Sequence>
    </>
  );
};

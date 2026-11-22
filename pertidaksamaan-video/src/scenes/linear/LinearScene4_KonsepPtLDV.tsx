import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { MathFormula } from '../../components/math-v4/MathFormula';

export interface LinearSceneProps {
  durationInFrames?: number;
}

/**
 * LinearScene4_KonsepPtLDV (Scene04-KonsepPtLDV)
 * Refactored V4.1: 2 Fase Bersih & Terarah
 * - Fase 1 (0% - 45%): Definisi DHP, 3 Langkah Emas & Perbandingan Garis Utuh vs Putus-putus
 * - Fase 2 (45% - 100%): Simulasi Uji Titik (0,0) pada Bidang Kartesius (Garis TIDAK melewati (0,0))
 */
export const LinearScene4_KonsepPtLDV: React.FC<LinearSceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const phase1End = Math.floor(durationInFrames * 0.45);
  const phase = frame < phase1End ? 1 : 2;
  const relFrame = phase === 1 ? frame : frame - phase1End;

  const phaseSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  // Animasi ripple ping pada titik asal (0,0)
  const pingLoop = (frame % 30) / 30;
  const rippleScale = interpolate(pingLoop, [0, 1], [1, 2.6]);
  const rippleOpacity = interpolate(pingLoop, [0, 0.7, 1], [0.8, 0.3, 0]);

  // ── FASE 1: Definisi DHP & 3 Langkah Emas ──
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
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
              DEFINISI PtLDV
            </span>
            <span className="text-xs font-bold text-slate-200">
              Daerah Himpunan Penyelesaian (DHP)
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Melibatkan dua variabel (umumnya <span className="text-sky-400 font-bold">x</span> dan <span className="text-emerald-400 font-bold">y</span>). Himpunan penyelesaiannya berupa <strong>luasan bidang datar (DHP)</strong> pada bidang Kartesius 2D.
          </p>
        </div>

        <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-3 shadow-md">
          <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-300 mb-2">
            3 Langkah Emas Menentukan DHP:
          </div>
          <div className="space-y-1.5 text-[10.5px] text-slate-300">
            <div className="rounded bg-slate-800/70 p-1.5 border border-slate-700/60 flex items-start gap-2">
              <span className="rounded bg-sky-500/20 text-sky-400 font-bold px-1.5 py-0.5 text-[9px] shrink-0">
                1
              </span>
              <div>
                <strong className="text-slate-100">Cari Titik Potong Sumbu:</strong> Substitusi x = 0 (sumbu Y) dan y = 0 (sumbu X).
              </div>
            </div>

            <div className="rounded bg-slate-800/70 p-1.5 border border-slate-700/60 flex items-start gap-2">
              <span className="rounded bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 text-[9px] shrink-0">
                2
              </span>
              <div>
                <strong className="text-slate-100">Tentukan Garis Pembatas:</strong> Garis Utuh (≤/≥) atau Garis Putus-putus (&lt;/&gt;).
              </div>
            </div>

            <div className="rounded bg-slate-800/70 p-1.5 border border-slate-700/60 flex items-start gap-2">
              <span className="rounded bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.5 text-[9px] shrink-0">
                3
              </span>
              <div>
                <strong className="text-slate-100">Uji Titik Asal (0,0):</strong> Menentukan belahan bidang mana yang harus diarsir.
              </div>
            </div>
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
          Perbandingan Gaya Garis Pembatas PtLDV
        </div>

        {/* Garis Utuh (Solid) */}
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-3 shadow">
          <div className="flex items-center justify-between font-bold text-emerald-400 mb-1 border-b border-emerald-900/40 pb-1">
            <span className="text-xs">Garis Utuh (Solid)</span>
            <MathFormula math="\le, \ge" fontSize={12} color="#10b981" />
          </div>
          <div className="h-2 w-full rounded bg-emerald-500 my-1.5 shadow" />
          <p className="text-[10px] text-slate-200 leading-relaxed">
            Dipakai saat tanda pertidaksamaan memiliki komponen sama dengan (≤ atau ≥). Titik-titik di sepanjang garis <strong>IKUT SERTA</strong> sebagai solusi.
          </p>
        </div>

        {/* Garis Putus-putus (Dashed) */}
        <div className="rounded-xl border border-rose-500/40 bg-rose-950/20 p-3 shadow">
          <div className="flex items-center justify-between font-bold text-rose-400 mb-1 border-b border-rose-900/40 pb-1">
            <span className="text-xs">Garis Putus-putus (Dashed)</span>
            <MathFormula math="<, >" fontSize={12} color="#f43f5e" />
          </div>
          <div className="h-2 w-full rounded border-b-2 border-dashed border-rose-500 my-1.5" />
          <p className="text-[10px] text-slate-200 leading-relaxed">
            Dipakai saat tanda ketidaksamaan murni (&lt; atau &gt;). Titik-titik di sepanjang garis <strong>TIDAK IKUT</strong> sebagai solusi.
          </p>
        </div>
      </div>
    );

    return (
      <SmartboardShell
        title="Konsep PtLDV & 3 Langkah Emas"
        subtitle="Fase 1: Memahami DHP Dua Variabel & Kaidah Gaya Garis"
        badge="PtLDV • FASE 1/2"
        stepBadge="Fase 1: 3 Langkah Emas"
        leftColumn={leftContent}
        rightColumn={rightContent}
        footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
      />
    );
  }

  // ── FASE 2: Simulasi Uji Titik (0,0) pada Bidang Kartesius ──
  const leftContent = (
    <div
      className="flex flex-col gap-2.5"
      style={{
        opacity: phaseSpring,
        transform: `translateY(${(1 - phaseSpring) * 10}px)`,
      }}
    >
      <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-3 shadow-md">
        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
          Kaidah Uji Titik Asal (0,0)
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
          Substitusikan x = 0 dan y = 0 ke pertidaksamaan awal:
        </p>
        <div className="space-y-1.5 text-[10px]">
          <div className="rounded bg-emerald-950/30 border border-emerald-500/40 p-1.5 text-emerald-300">
            <strong>Jika Hasil BENAR:</strong> Arsir daerah belahan bidang yang <em>memuat</em> titik (0,0).
          </div>
          <div className="rounded bg-rose-950/30 border border-rose-500/40 p-1.5 text-rose-300">
            <strong>Jika Hasil SALAH:</strong> Arsir daerah belahan seberang yang <em>menjauhi</em> titik (0,0).
          </div>
        </div>
      </div>

      {/* Catatan Kaki Titik Uji Alternatif */}
      <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-2.5 shadow-md">
        <div className="text-[10px] font-bold text-amber-400 mb-1 flex items-center gap-1.5">
          <span>💡</span>
          <span>Catatan Kaki Penting:</span>
        </div>
        <p className="text-[9.5px] text-slate-300 leading-relaxed">
          Jika garis pembatas <strong>tepat melewati titik (0,0)</strong> (misal y = 2x), maka titik asal tidak boleh dipakai sebagai titik uji. Gunakan titik alternatif di luar garis seperti <span className="font-mono text-amber-300 font-bold">(1,0)</span> atau <span className="font-mono text-amber-300 font-bold">(0,1)</span>.
        </p>
      </div>
    </div>
  );

  // Koordinat SVG Kartesius Simulasi:
  // Titik asal (0,0) diletakkan di (105, 125).
  // Garis memotong (0,3) di (105, 65) dan (4,0) di (185, 125).
  // Garis TIDAK melalui (0,0). Titik (0,0) berada di bawah-kiri garis.
  const originX = 105;
  const originY = 125;

  const rightContent = (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        opacity: phaseSpring,
        transform: `scale(${0.96 + phaseSpring * 0.04})`,
      }}
    >
      <div className="mb-1 text-center">
        <div className="text-xs font-bold text-slate-200">
          Simulasi Uji Titik: Contoh <MathFormula math="3x + 4y \le 12" fontSize={12} color="#38bdf8" />
        </div>
        <div className="text-[9.5px] text-slate-400">
          Garis memotong (0,3) &amp; (4,0). Uji (0,0) ➔ 0 ≤ 12 (BENAR) ➔ Arsir ke arah (0,0)
        </div>
      </div>

      <div className="relative rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-xl w-full max-w-[325px] flex justify-center">
        <svg width={315} height={185} viewBox="0 0 315 185" style={{ overflow: 'hidden' }}>
          <defs>
            <clipPath id="sim-clip">
              <rect x={15} y={10} width={285} height={165} rx={6} />
            </clipPath>
          </defs>

          {/* Grid Halus */}
          <g opacity={0.25}>
            {[-60, -40, -20, 20, 40, 60, 80, 100, 120].map((dx) => (
              <line key={dx} x1={originX + dx} y1={15} x2={originX + dx} y2={175} stroke="#475569" strokeDasharray="2 3" />
            ))}
            {[-80, -60, -40, -20, 20, 40].map((dy) => (
              <line key={dy} x1={15} y1={originY + dy} x2={295} y2={originY + dy} stroke="#475569" strokeDasharray="2 3" />
            ))}
          </g>

          {/* Area Terpotong untuk Arsiran DHP */}
          <g clipPath="url(#sim-clip)">
            {/* Shading Arsiran DHP Memuat (0,0) di bawah garis */}
            <polygon
              points="15,175 15,35 45,20 295,207 295,175"
              fill="rgba(56, 189, 248, 0.22)"
            />

            {/* Garis Pembatas Solid: melalui (0,3) di (105, 65) dan (4,0) di (185, 125) */}
            <line
              x1={45}
              y1={20}
              x2={265}
              y2={185}
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
          </g>

          {/* Sumbu X dan Y dengan Margin Ekstra Bebas Potong */}
          <line x1={15} y1={originY} x2={290} y2={originY} stroke="#94a3b8" strokeWidth="2" />
          <line x1={originX} y1={175} x2={originX} y2={15} stroke="#94a3b8" strokeWidth="2" />
          <text x={295} y={originY + 4} fill="#94a3b8" fontSize="10" fontWeight="bold">X</text>
          <text x={originX - 4} y={12} fill="#94a3b8" fontSize="10" fontWeight="bold">Y</text>

          {/* Titik Potong (0,3) */}
          <circle cx={originX} cy={65} r={4} fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
          <text x={originX - 6} y={68} textAnchor="end" fill="#fbbf24" fontSize="8.5" fontWeight="bold">(0,3)</text>

          {/* Titik Potong (4,0) */}
          <circle cx={185} cy={originY} r={4} fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
          <text x={185} y={originY + 14} textAnchor="middle" fill="#fbbf24" fontSize="8.5" fontWeight="bold">(4,0)</text>

          {/* Titik Uji (0,0) — Terpisah Jelas dari Garis & Memiliki Efek Ping */}
          <circle
            cx={originX}
            cy={originY}
            r={6 * rippleScale}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            opacity={rippleOpacity}
          />
          <circle cx={originX} cy={originY} r={4} fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          <text x={originX - 8} y={originY + 14} textAnchor="end" fill="#10b981" fontSize="9" fontWeight="bold">
            Uji (0,0)
          </text>

          {/* Lencana Evaluasi BENAR */}
          <g transform="translate(25, 90)">
            <rect x={0} y={0} width={105} height={18} rx={3} fill="#1e293b" stroke="#10b981" strokeWidth="1" />
            <text x={52} y={13} textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
              0 ≤ 12 (BENAR ✓)
            </text>
          </g>
        </svg>
      </div>
    </div>
  );

  return (
    <SmartboardShell
      title="Metode Uji Titik Asal (0,0)"
      subtitle="Fase 2: Menentukan Belahan Bidang DHP via Titik Uji"
      badge="PtLDV • FASE 2/2"
      stepBadge="Fase 2: Uji (0,0)"
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

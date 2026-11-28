import React, { useId } from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { SmartboardShell } from '../../components/math-v4/SmartboardShell';
import { MathFormula } from '../../components/math-v4/MathFormula';

export interface LinearSceneProps {
  durationInFrames?: number;
}

const Phase1KonsepPtLDV: React.FC<{ phaseDuration: number }> = ({ phaseDuration }) => {
  const relFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phaseSpring = spring({ frame: relFrame, fps, config: { damping: 15, stiffness: 85 } });

  const pRatio = relFrame / Math.max(1, phaseDuration);
  const hlDef = pRatio < 0.2;
  const hlS1 = pRatio >= 0.2 && pRatio < 0.38;
  const hlS2 = pRatio >= 0.38 && pRatio < 0.56;
  const hlS3 = pRatio >= 0.56 && pRatio < 0.72;
  const hlSolid = pRatio >= 0.72 && pRatio < 0.86;
  const hlDashed = pRatio >= 0.86;

  const leftContent = (
    <div
      className="flex flex-col gap-2"
      style={{
        opacity: Math.max(0.25, phaseSpring),
        transform: `translateY(${(1 - phaseSpring) * 8}px)`,
      }}
    >
      <div
        className="rounded-xl border bg-slate-800/80 p-2.5 shadow-md"
        style={{
          borderColor: hlDef ? '#10b981' : '#334155',
          opacity: hlDef ? 1 : 0.78,
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
            DEFINISI PtLDV
          </span>
          <span className="text-xs font-bold text-slate-200">
            Daerah Himpunan Penyelesaian (DHP)
          </span>
        </div>
        <p className="text-[10.5px] text-slate-300 leading-relaxed">
          Melibatkan dua variabel (umumnya <span className="text-sky-400 font-bold">x</span> dan <span className="text-emerald-400 font-bold">y</span>). Himpunan penyelesaiannya berupa <strong>luasan bidang datar (DHP)</strong> pada bidang Kartesius 2D.
        </p>
      </div>

      <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-2.5 shadow-md">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
          3 Langkah Emas Menentukan DHP:
        </div>
        <div className="space-y-1.5 text-[10px] text-slate-300">
          <div
            className="rounded bg-slate-800/75 p-1.5 border flex items-start gap-2"
            style={{
              borderColor: hlS1 ? '#38bdf8' : 'rgba(51, 65, 85, 0.6)',
              opacity: pRatio >= 0.16 ? (hlS1 ? 1 : 0.75) : 0.25,
            }}
          >
            <span className="rounded bg-sky-500/20 text-sky-400 font-bold px-1.5 py-0.5 text-[9px] shrink-0">
              1
            </span>
            <div>
              <strong className="text-slate-100">Cari Titik Potong Sumbu:</strong> Substitusi x = 0 (sumbu Y) dan y = 0 (sumbu X).
            </div>
          </div>

          <div
            className="rounded bg-slate-800/75 p-1.5 border flex items-start gap-2"
            style={{
              borderColor: hlS2 ? '#10b981' : 'rgba(51, 65, 85, 0.6)',
              opacity: pRatio >= 0.34 ? (hlS2 ? 1 : 0.75) : 0.25,
            }}
          >
            <span className="rounded bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 text-[9px] shrink-0">
              2
            </span>
            <div>
              <strong className="text-slate-100">Tentukan Garis Pembatas:</strong> Garis Utuh (≤/≥) atau Garis Putus-putus (&lt;/&gt;).
            </div>
          </div>

          <div
            className="rounded bg-slate-800/75 p-1.5 border flex items-start gap-2"
            style={{
              borderColor: hlS3 ? '#fbbf24' : 'rgba(51, 65, 85, 0.6)',
              opacity: pRatio >= 0.52 ? (hlS3 ? 1 : 0.75) : 0.25,
            }}
          >
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
        opacity: Math.max(0.25, phaseSpring),
        transform: `scale(${0.97 + phaseSpring * 0.03})`,
      }}
    >
      <div className="text-center text-xs font-bold text-slate-200 mb-0.5">
        Perbandingan Gaya Garis Pembatas PtLDV
      </div>

      {/* Garis Utuh (Solid) */}
      <div
        className="rounded-xl border bg-emerald-950/20 p-3 shadow"
        style={{
          borderColor: hlSolid ? '#10b981' : 'rgba(16, 185, 129, 0.35)',
          opacity: pRatio >= 0.68 ? (hlSolid ? 1 : 0.75) : 0.25,
        }}
      >
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
      <div
        className="rounded-xl border bg-rose-950/20 p-3 shadow"
        style={{
          borderColor: hlDashed ? '#f43f5e' : 'rgba(244, 63, 94, 0.35)',
          opacity: pRatio >= 0.82 ? (hlDashed ? 1 : 0.75) : 0.25,
        }}
      >
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
};

const Phase2SimulasiUjiTitik: React.FC<{ phaseDuration: number }> = ({ phaseDuration }) => {
  const relFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const uid = useId().replace(/:/g, '');
  const simClipId = `${uid}-sim-clip`;

  const phaseSpring = spring({ frame: relFrame, fps, config: { damping: 15, stiffness: 85 } });

  // 4 tahap berurutan pada ~1350f:
  // Tahap 1 (0 - 25%): Garis potong (0,3) & (4,0) ditarik
  // Tahap 2 (25 - 55%): Ripple (0,0) + substitusi 3(0)+4(0) <= 12 -> 0 <= 12 (BENAR ✓)
  // Tahap 3 (55 - 80%): Sapuan arsiran hijau memuat (0,0)
  // Tahap 4 (80 - 100%): Munculkan catatan kaki titik uji alternatif (1,0) / (0,1)
  const t1End = Math.floor(phaseDuration * 0.25);
  const t2End = Math.floor(phaseDuration * 0.55);
  const t3End = Math.floor(phaseDuration * 0.8);

  const stage = relFrame < t1End ? 1 : relFrame < t2End ? 2 : relFrame < t3End ? 3 : 4;

  const lineSpring = spring({
    frame: Math.max(0, relFrame - 10),
    fps,
    config: { damping: 18, stiffness: 60 },
  });
  const testSpring = spring({
    frame: Math.max(0, relFrame - t1End),
    fps,
    config: { damping: 15, stiffness: 90 },
  });
  const shadeSpring = spring({
    frame: Math.max(0, relFrame - t2End),
    fps,
    config: { damping: 16, stiffness: 65 },
  });
  const footnoteSpring = spring({
    frame: Math.max(0, relFrame - t3End),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Animasi ripple ping pada titik asal (0,0)
  const pingLoop = (relFrame % 30) / 30;
  const rippleScale = interpolate(pingLoop, [0, 1], [1, 2.6]);
  const rippleOpacity = interpolate(pingLoop, [0, 0.7, 1], [0.8, 0.3, 0]);

  // Koordinat garis simulasi 3x + 4y = 12 pada SVG 315x185 (tepat menyentuh clip y=10 dan y=175)
  const p1X = 31.7;
  const p1Y = 10;
  const p2X = 251.7;
  const p2Y = 175;
  const lineLen = Math.hypot(p2X - p1X, p2Y - p1Y);
  const originX = 105;
  const originY = 125;

  const leftContent = (
    <div
      className="flex flex-col gap-2"
      style={{
        opacity: Math.max(0.25, phaseSpring),
        transform: `translateY(${(1 - phaseSpring) * 8}px)`,
      }}
    >
      <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 shadow-md">
        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
          Kaidah Uji Titik Asal (0,0)
        </div>
        <div className="rounded bg-slate-900/90 px-2 py-1 border border-slate-700/60 mb-1.5 flex items-center justify-between">
          <span className="text-[9.5px] text-slate-400">Substitusi (0,0):</span>
          <MathFormula
            math={stage >= 2 ? '3(0) + 4(0) \\le 12 \\implies 0 \\le 12' : '3x + 4y \\le 12'}
            fontSize={10.5}
            color={stage >= 2 ? '#34d399' : '#38bdf8'}
          />
        </div>
        <div className="space-y-1.5 text-[9.5px]">
          <div
            className="rounded border p-1.5"
            style={{
              backgroundColor: stage >= 2 ? 'rgba(6, 78, 59, 0.35)' : 'rgba(6, 78, 59, 0.15)',
              borderColor: stage === 2 || stage === 3 ? '#10b981' : 'rgba(16, 185, 129, 0.35)',
              color: '#6ee7b7',
              opacity: stage >= 2 ? 1 : 0.45,
            }}
          >
            <strong>Jika Hasil BENAR:</strong> Arsir daerah belahan bidang yang <em>memuat</em> titik (0,0).
          </div>
          <div className="rounded bg-rose-950/20 border border-rose-500/30 p-1.5 text-rose-300 opacity-70">
            <strong>Jika Hasil SALAH:</strong> Arsir daerah belahan seberang yang <em>menjauhi</em> titik (0,0).
          </div>
        </div>
      </div>

      {/* Catatan Kaki Titik Uji Alternatif — Baru muncul pada Tahap 4 */}
      <div
        className="rounded-xl border border-amber-500/50 bg-amber-950/25 p-2.5 shadow-md"
        style={{
          opacity: stage >= 4 ? footnoteSpring : 0,
          transform: `translateY(${(1 - (stage >= 4 ? footnoteSpring : 0)) * 8}px)`,
        }}
      >
        <div className="text-[10px] font-bold text-amber-400 mb-1 flex items-center gap-1.5">
          <span>💡</span>
          <span>Catatan Kaki (Titik Uji Alternatif):</span>
        </div>
        <p className="text-[9.5px] text-slate-200 leading-relaxed">
          Jika garis pembatas <strong>tepat melewati (0,0)</strong> (misal y = 2x), jangan gunakan (0,0). Pilih titik alternatif di luar garis seperti <span className="font-mono text-amber-300 font-bold">(1,0)</span> atau <span className="font-mono text-amber-300 font-bold">(0,1)</span>.
        </p>
      </div>
    </div>
  );

  const rightContent = (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        opacity: Math.max(0.35, phaseSpring),
        transform: `scale(${0.97 + phaseSpring * 0.03})`,
      }}
    >
      <div className="mb-1 text-center">
        <div className="text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5">
          <span>Simulasi Uji Titik:</span>
          <MathFormula math="3x + 4y \le 12" fontSize={12} color="#38bdf8" />
        </div>
        <div className="text-[9.5px] text-slate-400">
          {stage === 1 && 'Tahap 1: Gambar garis batas lewat (0,3) dan (4,0)'}
          {stage === 2 && 'Tahap 2: Uji titik (0,0) ⇒ 0 ≤ 12 (BENAR ✓)'}
          {stage >= 3 && 'Tahap 3: Arsir hijau ke daerah yang memuat (0,0)'}
        </div>
      </div>

      <div className="relative rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-xl w-full max-w-[325px] flex justify-center">
        <svg width={315} height={185} viewBox="0 0 315 185" style={{ overflow: 'hidden' }}>
          <defs>
            <clipPath id={simClipId}>
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

          {/* Area Terpotong untuk Garis & Arsiran DHP */}
          <g clipPath={`url(#${simClipId})`}>
            {/* Tahap 3+: Sapuan Arsiran Hijau DHP Memuat (0,0) */}
            {stage >= 3 && (
              <polygon
                points="15,175 15,10 31.7,10 251.7,175"
                fill="rgba(16, 185, 129, 0.28)"
                opacity={shadeSpring}
              />
            )}

            {/* Tahap 1+: Garis Pembatas Solid ditarik lewat (0,3) & (4,0) */}
            <line
              x1={p1X}
              y1={p1Y}
              x2={p2X}
              y2={p2Y}
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray={lineLen}
              strokeDashoffset={lineLen * (1 - lineSpring)}
            />
          </g>

          {/* Sumbu X dan Y */}
          <line x1={15} y1={originY} x2={290} y2={originY} stroke="#94a3b8" strokeWidth="2" />
          <line x1={originX} y1={175} x2={originX} y2={15} stroke="#94a3b8" strokeWidth="2" />
          <text x={295} y={originY + 4} fill="#94a3b8" fontSize="10" fontWeight="bold">X</text>
          <text x={originX - 4} y={12} fill="#94a3b8" fontSize="10" fontWeight="bold">Y</text>

          {/* Titik Potong (0,3) dan (4,0) */}
          <circle cx={originX} cy={65} r={4} fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
          <text x={originX - 6} y={68} textAnchor="end" fill="#fbbf24" fontSize="8.5" fontWeight="bold">(0,3)</text>

          <circle cx={185} cy={originY} r={4} fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
          <text x={185} y={originY + 14} textAnchor="middle" fill="#fbbf24" fontSize="8.5" fontWeight="bold">(4,0)</text>

          {/* Tahap 2+: Titik Uji (0,0) + Efek Ping + Lencana BENAR */}
          {stage >= 2 && (
            <g opacity={testSpring}>
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

              <g transform="translate(22, 86)">
                <rect x={0} y={0} width={108} height={18} rx={3} fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                <text x={54} y={12.5} textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">
                  0 ≤ 12 (BENAR ✓)
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>
    </div>
  );

  return (
    <SmartboardShell
      title="Metode Uji Titik Asal (0,0)"
      subtitle="Fase 2: Menentukan Belahan Bidang DHP Secara Bertahap"
      badge="PtLDV • FASE 2/2"
      stepBadge={`Tahap ${stage} / 4`}
      leftColumn={leftContent}
      rightColumn={rightContent}
      footerNote="Segmen 1: Pertidaksamaan Linear • Pemateri: Rafie Armansyah"
    />
  );
};

/**
 * LinearScene4_KonsepPtLDV (Scene04-KonsepPtLDV — 2700f / 90 detik)
 * V4.2 Upgrade: 2 fase <Sequence> (45 dtk konsep + 45 dtk simulasi uji titik bertahap).
 */
export const LinearScene4_KonsepPtLDV: React.FC<LinearSceneProps> = () => {
  const { durationInFrames } = useVideoConfig();
  const phase1Dur = Math.floor(durationInFrames * 0.5);
  const phase2Dur = durationInFrames - phase1Dur;

  return (
    <>
      <Sequence durationInFrames={phase1Dur} name="Fase 1: Konsep PtLDV & 3 Langkah Emas">
        <Phase1KonsepPtLDV phaseDuration={phase1Dur} />
      </Sequence>
      <Sequence from={phase1Dur} durationInFrames={phase2Dur} name="Fase 2: Simulasi Uji Titik (0,0)">
        <Phase2SimulasiUjiTitik phaseDuration={phase2Dur} />
      </Sequence>
    </>
  );
};

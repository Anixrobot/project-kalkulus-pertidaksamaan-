import React, { useId } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IrasionalIntersection, IrasionalLayer } from '../../data/irasionalData';
import { MathFormula } from './MathFormula';

export interface IntersectionLine1DProps {
  layers: IrasionalLayer[];
  intersection: IrasionalIntersection;
  axisRange: [number, number];
  hpInterval?: string;
  hpSet?: string;
  activeLayerIndex?: number;
  isFinalIntersection?: boolean;
  finalRevealFrame?: number;
  accentColor?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Komponen IntersectionLine1D V4.1 (Pertidaksamaan Irasional — Pras)
 * Menggambar garis bilangan bertingkat (stacked horizontal tracks) untuk layer syarat numerus
 * dan pengkuadratan, lalu menyorot irisan persekutuan (intersection) secara tajam.
 * Frame-deterministic via Remotion hooks.
 */
export const IntersectionLine1D: React.FC<IntersectionLine1DProps> = React.memo(({
  layers,
  intersection,
  axisRange,
  hpInterval,
  hpSet,
  activeLayerIndex = 99,
  isFinalIntersection = false,
  finalRevealFrame = 0,
  accentColor = '#10b981',
  width = 315,
  height = 140,
  className = '',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const uid = useId().replace(/:/g, '');

  const [minVal, maxVal] = axisRange;
  const pad = 40; // Margin aman di dalam viewBox SVG >= 40px sesuai PRD V4.1
  const plotWidth = width - pad * 2;
  const axisY = height - 22; // Sumbu utama di bagian bawah

  // Helper konversi nilai matematika 1D ke koordinat X SVG
  const toSvgX = (val: number): number => {
    return pad + ((val - minVal) / (maxVal - minVal)) * plotWidth;
  };

  // Animasi entrance sumbu utama
  const axisSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Animasi sorotan irisan final tepat saat fase irisan dimulai
  const intersectSpring = spring({
    frame: Math.max(0, frame - finalRevealFrame),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Ticks bilangan bulat
  const ticks: number[] = [];
  const step = Math.ceil((maxVal - minVal) / 10) || 1;
  for (let v = minVal; v <= maxVal; v += step) {
    ticks.push(v);
  }

  // Hitung koordinat X irisan final
  const interX1 = toSvgX(intersection.from);
  const interX2 = intersection.toInfinity ? width - pad + 14 : toSvgX(intersection.to);

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-slate-700/70 bg-slate-900/95 p-2 shadow-xl w-full max-w-[325px] ${className}`}
      style={{
        width,
        boxSizing: 'border-box',
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        ...style,
      }}
    >
      {/* Header Notasi Interval & Himpunan Irisan */}
      {(hpInterval || hpSet) && (
        <div className="mb-1 flex w-full flex-col gap-1 px-0.5">
          {hpInterval && (
            <div className="flex flex-wrap items-center justify-between gap-1 rounded bg-slate-800/80 px-2 py-0.5 border border-slate-700/80 text-[10px]">
              <span className="font-semibold text-slate-300 shrink-0">Irisan HP:</span>
              <span className="font-mono text-emerald-400">
                <MathFormula math={hpInterval} fontSize={10.5} color={accentColor} />
              </span>
            </div>
          )}
          {hpSet && (
            <div className="flex flex-col items-start gap-0.5 rounded bg-slate-800/80 px-2 py-0.5 border border-slate-700/80 text-[9.5px] text-slate-300 font-mono">
              <span className="font-sans font-semibold text-slate-400 text-[8.5px]">Himpunan Penyelesaian:</span>
              <div className="w-full text-center">
                <MathFormula math={hpSet} fontSize={9} color="#cbd5e1" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Kanvas SVG Garis Bilangan Bertingkat (Stacked Tracks) */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: 'hidden' }}
      >
        <defs>
          <marker
            id={`${uid}-inter-left`}
            viewBox="0 0 10 10"
            refX="2"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 8 1 L 2 5 L 8 9 z" fill="#64748b" />
          </marker>
          <marker
            id={`${uid}-inter-right`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 2 1 L 8 5 L 2 9 z" fill="#64748b" />
          </marker>
          {layers.map((layer, i) => (
            <React.Fragment key={`m-${i}`}>
              <marker
                id={`${uid}-layer-left-${i}`}
                viewBox="0 0 10 10"
                refX="3"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path d="M 8 1 L 2 5 L 8 9 z" fill={layer.color} />
              </marker>
              <marker
                id={`${uid}-layer-right-${i}`}
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path d="M 2 1 L 8 5 L 2 9 z" fill={layer.color} />
              </marker>
            </React.Fragment>
          ))}
        </defs>

        {/* 1. Sorotan Arsiran Irisan Final (Jika Fase Irisan Aktif) */}
        {isFinalIntersection && intersectSpring > 0.05 && (
          <g opacity={intersectSpring}>
            <rect
              x={interX1}
              y={5}
              width={Math.max(0, (interX2 - interX1) * intersectSpring)}
              height={axisY - 5}
              fill="rgba(16, 185, 129, 0.22)"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              rx={3}
            />
            {/* Garis Batas Vertikal Pembatas Irisan */}
            <line
              x1={interX1}
              y1={5}
              x2={interX1}
              y2={axisY}
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="2 2"
            />
            {!intersection.toInfinity && (
              <line
                x1={interX2}
                y1={5}
                x2={interX2}
                y2={axisY}
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="2 2"
              />
            )}
          </g>
        )}

        {/* 2. Layer-Layer Daerah Syarat Bertingkat (Stacked Tracks) */}
        {layers.map((layer, idx) => {
          const revealStep = layer.revealAtStep ?? idx;
          const isVisible = activeLayerIndex >= revealStep || isFinalIntersection;
          if (!isVisible) return null;

          const trackSpacing = layers.length <= 2 ? 32 : 26;
          const trackY = 27 + idx * trackSpacing;
          const x1 = layer.fromNegativeInfinity ? pad - 12 : toSvgX(layer.from);
          const x2 = layer.toInfinity ? width - pad + 12 : toSvgX(layer.to);
          const layerSpring = spring({
            frame: Math.max(0, frame - idx * 8),
            fps,
            config: { damping: 14, stiffness: 85 },
          });

          const animX2 = layer.fromNegativeInfinity ? x2 : interpolate(layerSpring, [0, 1], [x1, x2]);
          const animX1 = layer.fromNegativeInfinity ? interpolate(layerSpring, [0, 1], [x2, x1]) : x1;
          const isDimmed = isFinalIntersection;
          const labelX = layer.fromNegativeInfinity ? Math.max(pad - 4, x2 - 115) : x1 + 6;
          const labelPillW = Math.min(135, layer.label.length * 4.8 + 8);

          return (
            <g
              key={idx}
              opacity={isDimmed ? 0.35 : layerSpring}
            >
              {/* Garis lintasan layer */}
              <line
                x1={layer.fromNegativeInfinity ? x2 : animX1}
                y1={trackY}
                x2={layer.fromNegativeInfinity ? animX1 : animX2}
                y2={trackY}
                stroke={layer.color}
                strokeWidth="3.5"
                strokeLinecap="butt"
                markerEnd={
                  layer.fromNegativeInfinity
                    ? `url(#${uid}-layer-left-${idx})`
                    : layer.toInfinity
                    ? `url(#${uid}-layer-right-${idx})`
                    : undefined
                }
              />

              {/* Titik Batas Awal hanya jika tidak berasal dari -infinity */}
              {!layer.fromNegativeInfinity && (
                layer.includeStart ? (
                  <circle cx={x1} cy={trackY} r={5} fill={layer.color} stroke="#0f172a" strokeWidth="2" />
                ) : (
                  <circle cx={x1} cy={trackY} r={4.5} fill="#0f172a" stroke={layer.color} strokeWidth="2" />
                )
              )}

              {/* Titik Batas Akhir hanya jika tidak menuju +infinity */}
              {!layer.toInfinity && (
                layer.includeEnd ? (
                  <circle cx={x2} cy={trackY} r={5} fill={layer.color} stroke="#0f172a" strokeWidth="2" />
                ) : (
                  <circle cx={x2} cy={trackY} r={4.5} fill="#0f172a" stroke={layer.color} strokeWidth="2" />
                )
              )}

              {/* Latar gelap tipis + Label Singkat Nama Daerah di Atas Lintasan */}
              <rect
                x={labelX - 3}
                y={trackY - 15}
                width={labelPillW}
                height={11}
                rx={2}
                fill="#0f172a"
                fillOpacity={0.78}
              />
              <text
                x={labelX}
                y={trackY - 7}
                fontSize="8.5"
                fontWeight="bold"
                fill={layer.color}
                fontFamily="Inter, sans-serif"
              >
                {layer.label}
              </text>
            </g>
          );
        })}

        {/* 3. Sumbu Horizontal Netral di Bawah */}
        <line
          x1={pad - 14}
          y1={axisY}
          x2={width - pad + 14}
          y2={axisY}
          stroke="#64748b"
          strokeWidth="2"
          markerStart={`url(#${uid}-inter-left)`}
          markerEnd={`url(#${uid}-inter-right)`}
          style={{ opacity: Math.max(0.35, axisSpring) }}
        />

        {/* 4. Ticks dan Label Nilai pada Sumbu */}
        {ticks.map((val) => {
          const x = toSvgX(val);
          const isInterBoundary = val === intersection.from || (!intersection.toInfinity && val === intersection.to);
          return (
            <g key={val} style={{ opacity: axisSpring * 0.85 }}>
              <line
                x1={x}
                y1={axisY - (isInterBoundary ? 6 : 4)}
                x2={x}
                y2={axisY + (isInterBoundary ? 6 : 4)}
                stroke={isInterBoundary && isFinalIntersection ? '#10b981' : '#64748b'}
                strokeWidth={isInterBoundary && isFinalIntersection ? '2' : '1'}
              />
              <text
                x={x}
                y={axisY + 15}
                textAnchor="middle"
                fontSize={isInterBoundary && isFinalIntersection ? '10' : '8.5'}
                fontWeight={isInterBoundary && isFinalIntersection ? 'bold' : 'normal'}
                fill={isInterBoundary && isFinalIntersection ? '#10b981' : '#94a3b8'}
                fontFamily="Inter, sans-serif"
              >
                {val}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
});

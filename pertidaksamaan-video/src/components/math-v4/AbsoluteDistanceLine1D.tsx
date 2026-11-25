import React, { useId } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { MutlakBound } from '../../data/mutlakData';
import { MathFormula } from './MathFormula';

export interface AbsoluteDistanceLine1DProps {
  mode?: 'concept_distance' | 'solution';
  pattern?: 'inside_between' | 'outside_split';
  bounds?: MutlakBound[];
  axisRange?: [number, number];
  conceptDistanceA?: number;
  hpInterval?: string;
  hpSet?: string;
  accentColor?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Komponen AbsoluteDistanceLine1D V4.1 (Pertidaksamaan Nilai Mutlak — Dimas)
 * Mendukung 2 mode:
 * 1. 'concept_distance': Menampilkan jarak simetris |x| <= a vs |x| >= a dari titik pusat 0.
 * 2. 'solution': Merender pola solusi 'inside_between' (mengumpul tengah) atau 'outside_split' (memencar keluar).
 * Frame-deterministic via Remotion hooks.
 */
export const AbsoluteDistanceLine1D: React.FC<AbsoluteDistanceLine1DProps> = React.memo(({
  mode = 'solution',
  pattern = 'inside_between',
  bounds = [],
  axisRange = [-5, 5],
  conceptDistanceA = 3,
  hpInterval,
  hpSet,
  accentColor = '#10b981',
  width = 315,
  height = 120,
  className = '',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const uid = useId().replace(/:/g, '');

  const [minVal, maxVal] = axisRange;
  const pad = 40; // Margin aman di dalam viewBox SVG >= 40px sesuai PRD V4.1
  const plotWidth = width - pad * 2;
  const axisY = height <= 95 ? 48 : 56;

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

  // Animasi sinar/segmen solusi
  const raySpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Animasi titik batas pop-in
  const dotSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 110 },
  });

  // Ticks bilangan bulat
  const ticks: number[] = [];
  const step = Math.ceil((maxVal - minVal) / 12) || 1;
  for (let v = minVal; v <= maxVal; v += step) {
    ticks.push(v);
  }
  for (const b of bounds) {
    if (Number.isInteger(b.value) && b.value >= minVal && b.value <= maxVal && !ticks.includes(b.value)) {
      ticks.push(b.value);
    }
  }
  ticks.sort((a, b) => a - b);

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
      {/* Header Notasi Interval & Himpunan */}
      {(hpInterval || hpSet) && (
        <div className="mb-1 flex w-full flex-col gap-1 px-0.5">
          {hpInterval && (
            <div className="flex flex-wrap items-center justify-between gap-1 rounded bg-slate-800/80 px-2 py-0.5 border border-slate-700/80 text-[10px]">
              <span className="font-semibold text-slate-300 shrink-0">Interval Solusi:</span>
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

      {/* Kanvas SVG Garis Bilangan Jarak Mutlak */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: 'hidden' }}
      >
        <defs>
          <marker
            id={`${uid}-arrow-left`}
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
            id={`${uid}-arrow-right`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 2 1 L 8 5 L 2 9 z" fill="#64748b" />
          </marker>
          <marker
            id={`${uid}-sol-left`}
            viewBox="0 0 10 10"
            refX="4"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 8 1 L 2 5 L 8 9 z" fill={accentColor} />
          </marker>
          <marker
            id={`${uid}-sol-right`}
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 2 1 L 8 5 L 2 9 z" fill={accentColor} />
          </marker>
        </defs>

        {/* 1. Sumbu Horizontal Netral */}
        <line
          x1={pad - 12}
          y1={axisY}
          x2={width - pad + 12}
          y2={axisY}
          stroke="#64748b"
          strokeWidth="2"
          markerStart={`url(#${uid}-arrow-left)`}
          markerEnd={`url(#${uid}-arrow-right)`}
          style={{ opacity: Math.max(0.35, axisSpring) }}
        />

        {/* 2. Ticks Sumbu */}
        {ticks.map((val) => {
          const x = toSvgX(val);
          const isZero = val === 0;
          return (
            <g key={val} style={{ opacity: Math.max(0.35, axisSpring) * 0.75 }}>
              <line
                x1={x}
                y1={axisY - (isZero ? 6 : 4)}
                x2={x}
                y2={axisY + (isZero ? 6 : 4)}
                stroke={isZero ? '#fbbf24' : '#475569'}
                strokeWidth={isZero ? '2' : '1'}
              />
              <text
                x={x}
                y={axisY + 16}
                textAnchor="middle"
                fontSize={isZero ? '11' : '9'}
                fontWeight={isZero ? 'bold' : 'normal'}
                fill={isZero ? '#fbbf24' : '#64748b'}
                fontFamily="Inter, sans-serif"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* MODE A: KONSEP JARAK DARI 0 (concept_distance) */}
        {mode === 'concept_distance' && (
          <g opacity={Math.max(0.4, raySpring)}>
            {/* Busur Panah Jarak Simetris ke -a dan +a */}
            {(() => {
              const x0 = toSvgX(0);
              const xPos = toSvgX(conceptDistanceA);
              const xNeg = toSvgX(-conceptDistanceA);

              return (
                <>
                  {/* Panah Jarak Kanan */}
                  <path
                    d={`M ${x0} ${axisY - 8} Q ${(x0 + xPos) / 2} ${axisY - 26} ${xPos} ${axisY - 8}`}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    markerEnd={`url(#${uid}-arrow-right)`}
                  />
                  <text
                    x={(x0 + xPos) / 2}
                    y={axisY - 28}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="bold"
                    fill="#38bdf8"
                  >
                    jarak a
                  </text>

                  {/* Panah Jarak Kiri */}
                  <path
                    d={`M ${x0} ${axisY - 8} Q ${(x0 + xNeg) / 2} ${axisY - 26} ${xNeg} ${axisY - 8}`}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    markerEnd={`url(#${uid}-arrow-left)`}
                  />
                  <text
                    x={(x0 + xNeg) / 2}
                    y={axisY - 28}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="bold"
                    fill="#38bdf8"
                  >
                    jarak a
                  </text>

                  {/* Batas -a dan +a */}
                  <circle cx={xPos} cy={axisY} r={4.5} fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                  <circle cx={xNeg} cy={axisY} r={4.5} fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                  <circle cx={x0} cy={axisY} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
                </>
              );
            })()}
          </g>
        )}

        {/* MODE B: POLA SOLUSI (solution) */}
        {mode === 'solution' && bounds.length >= 2 && (
          <g>
            {/* Pola 1: Mengumpul di Tengah (inside_between) */}
            {pattern === 'inside_between' && (() => {
              const b1 = bounds[0];
              const b2 = bounds[1];
              const x1 = toSvgX(b1.value);
              const x2 = toSvgX(b2.value);
              const animX2 = interpolate(raySpring, [0, 1], [x1, x2]);

              return (
                <g>
                  {/* Shading Batang Solusi di Tengah */}
                  {raySpring > 0.05 && (
                    <rect
                      x={x1}
                      y={axisY - 8}
                      width={Math.max(0, animX2 - x1)}
                      height={16}
                      fill="rgba(16, 185, 129, 0.22)"
                      rx={3}
                    />
                  )}
                  {/* Garis Solusi Tebal */}
                  <line
                    x1={x1}
                    y1={axisY}
                    x2={animX2}
                    y2={axisY}
                    stroke={accentColor}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Titik Batas 1 & 2 */}
                  <g transform={`translate(${x1}, ${axisY}) scale(${dotSpring})`}>
                    <circle
                      cx={0}
                      cy={0}
                      r={b1.included ? 6 : 5}
                      fill={b1.included ? accentColor : '#0f172a'}
                      stroke={accentColor}
                      strokeWidth={b1.included ? 2 : 2.5}
                    />
                    <text x={0} y={-10} textAnchor="middle" fontSize="9" fontWeight="bold" fill={accentColor}>
                      {b1.label || b1.value}
                    </text>
                  </g>
                  <g transform={`translate(${x2}, ${axisY}) scale(${dotSpring})`}>
                    <circle
                      cx={0}
                      cy={0}
                      r={b2.included ? 6 : 5}
                      fill={b2.included ? accentColor : '#0f172a'}
                      stroke={accentColor}
                      strokeWidth={b2.included ? 2 : 2.5}
                    />
                    <text x={0} y={-10} textAnchor="middle" fontSize="9" fontWeight="bold" fill={accentColor}>
                      {b2.label || b2.value}
                    </text>
                  </g>
                </g>
              );
            })()}

            {/* Pola 2: Memencar Keluar (outside_split) */}
            {pattern === 'outside_split' && (() => {
              const leftBound = bounds.find((b) => b.direction === 'left') || bounds[0];
              const rightBound = bounds.find((b) => b.direction === 'right') || bounds[1];
              const xLeft = toSvgX(leftBound.value);
              const xRight = toSvgX(rightBound.value);
              const targetLeft = pad - 10;
              const targetRight = width - pad + 10;
              const animLeft = interpolate(raySpring, [0, 1], [xLeft, targetLeft]);
              const animRight = interpolate(raySpring, [0, 1], [xRight, targetRight]);

              return (
                <g>
                  {/* Sinar ke Kiri */}
                  {raySpring > 0.05 && (
                    <line
                      x1={xLeft}
                      y1={axisY}
                      x2={animLeft}
                      y2={axisY}
                      stroke={accentColor}
                      strokeWidth="4"
                      strokeLinecap="butt"
                      markerEnd={`url(#${uid}-sol-left)`}
                    />
                  )}
                  {/* Sinar ke Kanan */}
                  {raySpring > 0.05 && (
                    <line
                      x1={xRight}
                      y1={axisY}
                      x2={animRight}
                      y2={axisY}
                      stroke={accentColor}
                      strokeWidth="4"
                      strokeLinecap="butt"
                      markerEnd={`url(#${uid}-sol-right)`}
                    />
                  )}
                  {/* Titik Batas Kiri */}
                  <g transform={`translate(${xLeft}, ${axisY}) scale(${dotSpring})`}>
                    <circle
                      cx={0}
                      cy={0}
                      r={leftBound.included ? 6 : 5}
                      fill={leftBound.included ? accentColor : '#0f172a'}
                      stroke={accentColor}
                      strokeWidth={leftBound.included ? 2 : 2.5}
                    />
                    <text x={0} y={-10} textAnchor="middle" fontSize="9" fontWeight="bold" fill={accentColor}>
                      {leftBound.label || leftBound.value}
                    </text>
                  </g>
                  {/* Titik Batas Kanan */}
                  <g transform={`translate(${xRight}, ${axisY}) scale(${dotSpring})`}>
                    <circle
                      cx={0}
                      cy={0}
                      r={rightBound.included ? 6 : 5}
                      fill={rightBound.included ? accentColor : '#0f172a'}
                      stroke={accentColor}
                      strokeWidth={rightBound.included ? 2 : 2.5}
                    />
                    <text x={0} y={-10} textAnchor="middle" fontSize="9" fontWeight="bold" fill={accentColor}>
                      {rightBound.label || rightBound.value}
                    </text>
                  </g>
                </g>
              );
            })()}
          </g>
        )}
      </svg>
    </div>
  );
});


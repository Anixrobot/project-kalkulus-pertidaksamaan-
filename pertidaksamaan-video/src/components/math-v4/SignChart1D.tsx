import React, { useId } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CriticalPoint } from '../../data/rasionalData';
import { MathFormula } from './MathFormula';

export interface SignChart1DProps {
  criticalPoints: CriticalPoint[];
  intervalSigns: ('+' | '-')[];
  axisRange: [number, number];
  hpSign?: '+' | '-';
  hpInterval?: string;
  hpSet?: string;
  accentColor?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Komponen SignChart1D V4.1 (Pertidaksamaan Rasional — Ikhsan)
 * Menggambar garis bilangan 1D uji tanda (+ / -), arsiran & sinar HP hijau,
 * titik kritis pembilang vs penyebut, serta indikator lubang faktor tercoret (x != -2).
 * Frame-deterministic via Remotion hooks (useCurrentFrame, spring, interpolate).
 */
export const SignChart1D: React.FC<SignChart1DProps> = React.memo(({
  criticalPoints,
  intervalSigns,
  axisRange,
  hpSign = '+',
  hpInterval,
  hpSet,
  accentColor = '#10b981',
  width = 315,
  height = 122,
  className = '',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const uid = useId().replace(/:/g, '');

  const [minVal, maxVal] = axisRange;
  const pad = 40; // Margin aman di dalam viewBox SVG >= 40px sesuai PRD V4.1
  const plotWidth = width - pad * 2;
  const axisY = 58;

  // Helper konversi nilai matematika 1D ke koordinat X SVG
  const toSvgX = (val: number): number => {
    return pad + ((val - minVal) / (maxVal - minVal)) * plotWidth;
  };

  // Urutkan titik kritis dari kecil ke besar untuk partisi interval
  const sortedPoints = [...criticalPoints].sort((a, b) => a.value - b.value);

  // Animasi entrance sumbu
  const axisSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Animasi titik kritis pop-in
  const pointsSpring = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Animasi tanda interval masuk bertahap
  const signsSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Animasi arsiran & sinar HP
  const shadeSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 15, stiffness: 75 },
  });

  // Berkedip halus untuk lubang faktor tercoret (isCanceledHole)
  const holePulse = 0.7 + 0.3 * Math.sin(frame / 6);

  // Hitung interval & koordinat SVG untuk arsiran HP dan label tanda (+ / -)
  const boundaries = [minVal, ...sortedPoints.map((p) => p.value), maxVal];
  const intervals: {
    leftX: number;
    rightX: number;
    midX: number;
    sign: '+' | '-';
    isHpRegion: boolean;
    extendsLeft: boolean;
    extendsRight: boolean;
  }[] = [];

  for (let i = 0; i < boundaries.length - 1; i++) {
    const leftVal = boundaries[i];
    const rightVal = boundaries[i + 1];
    const midVal = (leftVal + rightVal) / 2;
    const sign = intervalSigns[i] || '+';
    const extendsLeft = i === 0;
    const extendsRight = i === boundaries.length - 2;
    intervals.push({
      leftX: extendsLeft ? pad - 14 : toSvgX(leftVal),
      rightX: extendsRight ? width - pad + 14 : toSvgX(rightVal),
      midX: toSvgX(midVal),
      sign,
      isHpRegion: sign === hpSign,
      extendsLeft,
      extendsRight,
    });
  }

  // Ticks bilangan bulat (sembunyikan label tick jika bertumpuk dekat titik kritis)
  const ticks: number[] = [];
  const step = Math.ceil((maxVal - minVal) / 10) || 1;
  for (let v = minVal; v <= maxVal; v += step) {
    ticks.push(v);
  }

  // Hitung posisi badge titik kritis agar tidak pernah saling menumpuk (Soal 2, 4, 5)
  let prevBadgeX = -999;
  let prevStaggered = false;
  const pointMeta = sortedPoints.map((cp) => {
    const x = toSvgX(cp.value);
    const labelStr = String(cp.label ?? cp.value);
    const badgeW = labelStr.length >= 4 ? 30 : 21;
    const isTooClose = x - prevBadgeX < 27;
    const isStaggered = isTooClose && !prevStaggered;
    prevBadgeX = x;
    prevStaggered = isStaggered;
    return { cp, x, labelStr, badgeW, badgeY: isStaggered ? 39 : 24 };
  });

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
      {/* Header Notasi HP & Interval (Tumpuk Rapi Anti-Clipping) */}
      {(hpInterval || hpSet) && (
        <div className="mb-1 flex w-full flex-col gap-1 px-0.5">
          {hpInterval && (
            <div className="flex flex-wrap items-center justify-between gap-1 rounded bg-slate-800/80 px-2 py-0.5 border border-slate-700/80 text-[10px]">
              <span className="font-semibold text-slate-300 shrink-0">Interval HP:</span>
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

      {/* Kanvas SVG Garis Bilangan Uji Tanda 1D */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: 'hidden' }}
      >
        <defs>
          <marker
            id={`${uid}-sign-left`}
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
            id={`${uid}-sign-right`}
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
            id={`${uid}-hp-left`}
            viewBox="0 0 10 10"
            refX="4"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 8 1 L 2 5 L 8 9 z" fill={accentColor} />
          </marker>
          <marker
            id={`${uid}-hp-right`}
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 2 1 L 8 5 L 2 9 z" fill={accentColor} />
          </marker>
        </defs>

        {/* 1. Sumbu Horizontal Netral */}
        <line
          x1={pad - 14}
          y1={axisY}
          x2={width - pad + 14}
          y2={axisY}
          stroke="#64748b"
          strokeWidth="2"
          markerStart={`url(#${uid}-sign-left)`}
          markerEnd={`url(#${uid}-sign-right)`}
          style={{ opacity: Math.max(0.35, axisSpring) }}
        />

        {/* 2. Sorotan Arsiran & Sinar Hijau untuk Interval HP */}
        {shadeSpring > 0.05 &&
          intervals.map((iv, idx) => {
            if (!iv.isHpRegion) return null;
            const segW = Math.max(0, iv.rightX - iv.leftX);
            const animRight = interpolate(shadeSpring, [0, 1], [iv.leftX, iv.rightX]);
            const animLeft = interpolate(shadeSpring, [0, 1], [iv.rightX, iv.leftX]);
            const xStart = iv.extendsLeft ? animLeft : iv.leftX;
            const xEnd = iv.extendsLeft ? iv.rightX : animRight;
            const rectX = iv.extendsLeft ? iv.leftX : iv.leftX;
            const rectW = Math.max(0, segW * shadeSpring);

            return (
              <g key={`hp-${idx}`}>
                <rect
                  x={iv.extendsLeft ? iv.rightX - rectW : rectX}
                  y={axisY - 9}
                  width={rectW}
                  height={18}
                  rx={3}
                  fill={accentColor}
                  fillOpacity={0.22 * shadeSpring}
                />
                <line
                  x1={iv.extendsLeft ? xEnd : xStart}
                  y1={axisY}
                  x2={iv.extendsLeft ? xStart : xEnd}
                  y2={axisY}
                  stroke={accentColor}
                  strokeWidth="4"
                  strokeLinecap="butt"
                  markerEnd={
                    iv.extendsLeft
                      ? `url(#${uid}-hp-left)`
                      : iv.extendsRight
                      ? `url(#${uid}-hp-right)`
                      : undefined
                  }
                />
              </g>
            );
          })}

        {/* 3. Ticks Sumbu */}
        {ticks.map((val) => {
          const x = toSvgX(val);
          const nearCritical = sortedPoints.some((p) => Math.abs(p.value - val) < 0.75);
          return (
            <g key={val} style={{ opacity: axisSpring * 0.65 }}>
              <line
                x1={x}
                y1={axisY - 3}
                x2={x}
                y2={axisY + 3}
                stroke="#475569"
                strokeWidth="1"
              />
              {!nearCritical && (
                <text
                  x={x}
                  y={axisY + 13}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#64748b"
                  fontFamily="Inter, sans-serif"
                >
                  {val}
                </text>
              )}
            </g>
          );
        })}

        {/* 4. Sorotan Tanda Interval (+ / -) di Atas Sumbu */}
        {signsSpring > 0.05 &&
          intervals.map((ic, idx) => {
            const isPositive = ic.sign === '+';
            return (
              <g
                key={idx}
                transform={`translate(${ic.midX}, ${axisY - 19})`}
                style={{ opacity: signsSpring }}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={7}
                  fill={isPositive ? 'rgba(16, 185, 129, 0.22)' : 'rgba(244, 63, 94, 0.22)'}
                  stroke={isPositive ? '#10b981' : '#f43f5e'}
                  strokeWidth="1.2"
                />
                <text
                  x={0}
                  y={3.2}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill={isPositive ? '#10b981' : '#f43f5e'}
                  fontFamily="monospace"
                >
                  {ic.sign}
                </text>
              </g>
            );
          })}

        {/* 5. Titik-Titik Kritis (Pembilang vs Penyebut vs Lubang Coret) */}
        {pointsSpring > 0.05 &&
          pointMeta.map(({ cp, x, labelStr, badgeW, badgeY }, idx) => {
            const isDenominator = cp.source === 'denominator' || cp.source === 'denominator_hole';
            const isHole = cp.isCanceledHole;
            // Jaga tag lubang tidak terpotong tepi kiri SVG
            const holeTagCenterX = Math.max(41 - x, Math.min(width - 41 - x, 0));

            return (
              <g
                key={idx}
                transform={`translate(${x}, ${axisY}) scale(${pointsSpring})`}
                style={{ transformOrigin: `${x}px ${axisY}px` }}
              >
                {/* Garis batas vertikal pembagi interval */}
                <line
                  x1={0}
                  y1={-28}
                  x2={0}
                  y2={badgeY - 8}
                  stroke={isHole ? '#f43f5e' : isDenominator ? '#f59e0b' : '#38bdf8'}
                  strokeWidth="1.4"
                  strokeDasharray="2 2"
                  opacity={0.7}
                />

                {/* Bulatan: Solid jika included, Kosong jika !included atau denominator */}
                {cp.included && !isDenominator ? (
                  <circle
                    cx={0}
                    cy={0}
                    r={6}
                    fill="#10b981"
                    stroke="#0f172a"
                    strokeWidth="2"
                  />
                ) : (
                  <circle
                    cx={0}
                    cy={0}
                    r={5.5}
                    fill="#0f172a"
                    stroke={isHole ? '#f43f5e' : '#f59e0b'}
                    strokeWidth={isHole ? 2.5 : 2}
                    opacity={isHole ? holePulse : 1}
                  />
                )}

                {/* Badge Nilai Titik Kritis di Bawah (Anti-Tumpuk) */}
                <g transform={`translate(0, ${badgeY})`}>
                  <rect
                    x={-badgeW / 2}
                    y={-8}
                    width={badgeW}
                    height={14}
                    rx={3}
                    fill="#1e293b"
                    stroke={isHole ? '#f43f5e' : cp.included ? '#10b981' : '#f59e0b'}
                    strokeWidth="1"
                  />
                  <text
                    x={0}
                    y={2}
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="bold"
                    fill={isHole ? '#f43f5e' : cp.included ? '#10b981' : '#f59e0b'}
                    fontFamily="Inter, sans-serif"
                  >
                    {labelStr}
                  </text>
                </g>

                {/* Tag Khusus jika Lubang Faktor Dicoret */}
                {isHole && (
                  <g transform={`translate(${holeTagCenterX}, -38)`}>
                    <rect
                      x={-39}
                      y={-8}
                      width={78}
                      height={14}
                      rx={3}
                      fill="#881337"
                      stroke="#f43f5e"
                      strokeWidth="1"
                      opacity={holePulse}
                    />
                    <text
                      x={0}
                      y={1.8}
                      textAnchor="middle"
                      fontSize="7.5"
                      fontWeight="bold"
                      fill="#fecdd3"
                      fontFamily="Inter, sans-serif"
                    >
                      x ≠ {cp.value} (Lubang)
                    </text>
                  </g>
                )}
              </g>
            );
          })}
      </svg>
    </div>
  );
});

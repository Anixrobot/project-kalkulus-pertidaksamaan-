import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { MathFormula } from './MathFormula';

export interface NumberLine1DProps {
  boundaryValue: number;
  isInclusive: boolean; // true = bulatan penuh (closed), false = bulatan kosong (open)
  direction: 'right' | 'left';
  axisRange: [number, number];
  intervalLatex?: string;
  setBuilderLatex?: string;
  accentColor?: string; // e.g. #38bdf8 (PtLSV) atau #10b981
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Komponen NumberLine1D V4.1 (PtLSV)
 * Grafik garis bilangan SVG murni dengan animasi sinar (ray) deterministik.
 * Titik batas (bulatan penuh/kosong) diletakkan TEPAT di boundaryValue.
 * Header notasi himpunan dan interval ditata rapi (stacked) anti-clipping.
 */
export const NumberLine1D: React.FC<NumberLine1DProps> = React.memo(({
  boundaryValue,
  isInclusive,
  direction,
  axisRange,
  intervalLatex,
  setBuilderLatex,
  accentColor = '#38bdf8',
  width = 315,
  height = 100,
  className = '',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [minVal, maxVal] = axisRange;
  const pad = 34; // Margin aman presisi agar panah & angka tidak terpotong
  const plotWidth = width - pad * 2;
  const axisY = 46;

  // Helper konversi nilai matematika 1D ke koordinat X SVG
  const toSvgX = (val: number): number => {
    return pad + ((val - minVal) / (maxVal - minVal)) * plotWidth;
  };

  const boundarySvgX = toSvgX(boundaryValue);

  // Animasi entrance sumbu
  const axisSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Animasi peluncuran sinar (ray) dari boundaryValue ke arah solusi
  const raySpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 16, stiffness: 70 },
  });

  // Animasi pop-in bulatan batas tepat di boundaryValue
  const dotSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Hitung rentang sinar yang meluncur
  const targetEndX = direction === 'right' ? width - pad + 12 : pad - 12;
  const animatedRayX = interpolate(raySpring, [0, 1], [boundarySvgX, targetEndX]);

  // Daftar tick bilangan bulat
  const ticks: number[] = [];
  const step = Math.ceil((maxVal - minVal) / 10) || 1;
  for (let v = minVal; v <= maxVal; v += step) {
    ticks.push(v);
  }
  // Pastikan boundaryValue tercantum di ticks jika pas bilangan bulat
  if (!ticks.includes(boundaryValue) && boundaryValue >= minVal && boundaryValue <= maxVal) {
    ticks.push(boundaryValue);
    ticks.sort((a, b) => a - b);
  }

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-slate-700/70 bg-slate-900/95 p-2 shadow-xl backdrop-blur-sm w-full max-w-[325px] ${className}`}
      style={{
        width,
        boxSizing: 'border-box',
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        ...style,
      }}
    >
      {/* Header Label Interval & Notasi Pembentuk Himpunan (Tumpuk Rapi Bebas Clipping) */}
      {(intervalLatex || setBuilderLatex) && (
        <div className="mb-1.5 flex w-full flex-col gap-1 px-0.5">
          {intervalLatex && (
            <div className="flex items-center justify-between rounded bg-slate-800/80 px-2 py-0.5 border border-slate-700/80 text-[10px]">
              <span className="font-semibold text-slate-300">Notasi Interval:</span>
              <span className="font-mono text-sky-400">
                <MathFormula math={intervalLatex} fontSize={11} color={accentColor} />
              </span>
            </div>
          )}
          {setBuilderLatex && (
            <div className="flex items-center justify-between rounded bg-slate-800/80 px-2 py-0.5 border border-slate-700/80 text-[10px] text-slate-300 font-mono">
              <span className="font-sans font-semibold text-slate-400">Himpunan:</span>
              <div className="overflow-x-auto no-scrollbar">
                <MathFormula math={setBuilderLatex} fontSize={10} color="#cbd5e1" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Kanvas SVG Garis Bilangan 1D */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: 'hidden' }}
      >
        <defs>
          {/* Marker Panah Sumbu Abu-abu */}
          <marker
            id="axis-arrow-left"
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
            id="axis-arrow-right"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 2 1 L 8 5 L 2 9 z" fill="#64748b" />
          </marker>

          {/* Marker Panah Solusi Aksen */}
          <marker
            id={`ray-arrow-${direction}`}
            viewBox="0 0 10 10"
            refX={direction === 'right' ? 8 : 2}
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 2 1 L 8 5 L 2 9 z" fill={accentColor} />
          </marker>
        </defs>

        {/* 1. Sumbu Horizontal Netral Abu-abu */}
        <line
          x1={pad - 12}
          y1={axisY}
          x2={width - pad + 12}
          y2={axisY}
          stroke="#64748b"
          strokeWidth="2"
          markerStart="url(#axis-arrow-left)"
          markerEnd="url(#axis-arrow-right)"
          style={{ opacity: axisSpring }}
        />

        {/* 2. Ticks dan Label Nilai pada Sumbu */}
        {ticks.map((val) => {
          const x = toSvgX(val);
          const isBoundary = val === boundaryValue;
          return (
            <g key={val} style={{ opacity: axisSpring }}>
              <line
                x1={x}
                y1={axisY - (isBoundary ? 7 : 4)}
                x2={x}
                y2={axisY + (isBoundary ? 7 : 4)}
                stroke={isBoundary ? accentColor : '#64748b'}
                strokeWidth={isBoundary ? '2.5' : '1.5'}
              />
              <text
                x={x}
                y={axisY + 16}
                textAnchor="middle"
                fontSize={isBoundary ? '11' : '9.5'}
                fontWeight={isBoundary ? 'bold' : 'normal'}
                fill={isBoundary ? accentColor : '#94a3b8'}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* 3. Area Sorotan Sinar (Shading) di Atas Sumbu */}
        {raySpring > 0.05 && (
          <rect
            x={direction === 'right' ? boundarySvgX : animatedRayX}
            y={axisY - 11}
            width={Math.max(0, Math.abs(animatedRayX - boundarySvgX))}
            height={22}
            fill={accentColor}
            fillOpacity={0.18}
            rx={3}
          />
        )}

        {/* 4. Sinar (Ray) Tebal Meluncur dari boundaryValue ke Target */}
        {raySpring > 0.02 && (
          <line
            x1={boundarySvgX}
            y1={axisY}
            x2={animatedRayX}
            y2={axisY}
            stroke={accentColor}
            strokeWidth="4"
            strokeLinecap="round"
            markerEnd={`url(#ray-arrow-${direction})`}
          />
        )}

        {/* 5. Titik Batas Tepat di boundaryValue (Bulatan Penuh / Kosong) */}
        <g
          transform={`translate(${boundarySvgX}, ${axisY}) scale(${dotSpring})`}
          style={{ transformOrigin: `${boundarySvgX}px ${axisY}px` }}
        >
          {isInclusive ? (
            // Bulatan Penuh (Solid Dot) untuk <= atau >=
            <circle
              cx={0}
              cy={0}
              r={6.5}
              fill={accentColor}
              stroke="#0f172a"
              strokeWidth="2"
            />
          ) : (
            // Bulatan Kosong (Hollow Dot) untuk < atau >
            <circle
              cx={0}
              cy={0}
              r={6}
              fill="#0f172a"
              stroke={accentColor}
              strokeWidth="3"
            />
          )}

          {/* Indikator Label Tepat di Atas Bulatan Batas */}
          <g transform="translate(0, -17)">
            <rect
              x={-17}
              y={-10}
              width={34}
              height={15}
              rx={3}
              fill="#1e293b"
              stroke={accentColor}
              strokeWidth="1"
            />
            <text
              x={0}
              y={1}
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="bold"
              fill={accentColor}
              fontFamily="Inter, sans-serif"
            >
              x = {boundaryValue}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
});

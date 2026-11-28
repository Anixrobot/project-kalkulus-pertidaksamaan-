import React, { useId } from 'react';
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
  showSolution?: boolean; // false = hanya tampilkan sumbu netral (anti-spoiler)
  solutionStartFrame?: number; // frame mulai animasi solusi (dot + ray + label)
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Komponen NumberLine1D V4.2 (PtLSV)
 * Grafik garis bilangan SVG murni dengan animasi sinar (ray) deterministik.
 * Mendukung mode anti-spoiler (showSolution = false -> sumbu netral saja),
 * ID SVG unik per instance via useId(), dan header bertumpuk anti-clipping.
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
  showSolution = true,
  solutionStartFrame = 0,
  className = '',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const uid = useId().replace(/:/g, '');
  const axisLeftId = `${uid}-axis-left`;
  const axisRightId = `${uid}-axis-right`;
  const rayArrowId = `${uid}-ray-${direction}`;

  const [minVal, maxVal] = axisRange;
  // Padding kartu p-2 (16px) + border (2px) = 18px agar SVG tidak melampaui kartu
  const svgWidth = Math.max(200, width - 18);
  const pad = 34; // Margin aman kiri-kanan agar angka ujung & kepala panah utuh
  const plotWidth = svgWidth - pad * 2;
  const axisY = 46;

  // Helper konversi nilai matematika 1D ke koordinat X SVG
  const toSvgX = (val: number): number => {
    return pad + ((val - minVal) / (maxVal - minVal)) * plotWidth;
  };

  const boundarySvgX = toSvgX(boundaryValue);

  // Notasi interval kanonik selaras dengan boundaryValue, isInclusive, dan direction
  const canonicalIntervalLatex =
    direction === 'right'
      ? `${isInclusive ? '[' : '('}${boundaryValue}, \\infty)`
      : `(-\\infty, ${boundaryValue}${isInclusive ? ']' : ')'}`;

  // Animasi entrance sumbu netral
  const axisSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const activeFrame = showSolution ? Math.max(0, frame - solutionStartFrame) : 0;

  const headerSpring = showSolution
    ? spring({
        frame: activeFrame,
        fps,
        config: { damping: 16, stiffness: 90 },
      })
    : 0;

  // Animasi pop-in bulatan batas tepat di boundaryValue
  const dotSpring = showSolution
    ? spring({
        frame: Math.max(0, activeFrame - 6),
        fps,
        config: { damping: 12, stiffness: 120 },
      })
    : 0;

  // Animasi peluncuran sinar (ray) dari boundaryValue ke arah solusi
  const raySpring = showSolution
    ? spring({
        frame: Math.max(0, activeFrame - 12),
        fps,
        config: { damping: 16, stiffness: 70 },
      })
    : 0;

  // Hitung rentang sinar yang meluncur
  const targetEndX = direction === 'right' ? svgWidth - pad + 10 : pad - 10;
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

  const labelWidth = String(boundaryValue).length >= 2 ? 40 : 34;

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-slate-700/70 bg-slate-900/95 p-2 shadow-xl backdrop-blur-sm ${className}`}
      style={{
        width,
        maxWidth: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        ...style,
      }}
    >
      {/* Header Interval & Himpunan (Ditumpuk rapi anti-clipping, tersembunyi sebelum showSolution) */}
      {(intervalLatex || setBuilderLatex) && (
        <div
          className="mb-1.5 flex w-full flex-col gap-1 px-0.5"
          style={{
            opacity: showSolution ? headerSpring : 0,
            transform: `translateY(${(1 - headerSpring) * 4}px)`,
          }}
        >
          {intervalLatex && (
            <div className="flex items-center justify-between rounded bg-slate-800/80 px-2 py-0.5 border border-slate-700/80 text-[10px]">
              <span className="font-semibold text-slate-300 shrink-0">Notasi Interval:</span>
              <span className="font-mono">
                <MathFormula math={canonicalIntervalLatex} fontSize={11} color={accentColor} />
              </span>
            </div>
          )}
          {setBuilderLatex && (
            <div className="flex flex-col items-start gap-0.5 rounded bg-slate-800/80 px-2 py-1 border border-slate-700/80 text-slate-300 w-full">
              <span className="font-sans font-semibold text-[9px] text-slate-400">
                Notasi Himpunan:
              </span>
              <div className="w-full flex items-center justify-center overflow-hidden">
                <MathFormula math={setBuilderLatex} fontSize={9.5} color="#e2e8f0" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Kanvas SVG Garis Bilangan 1D */}
      <svg
        width={svgWidth}
        height={height}
        viewBox={`0 0 ${svgWidth} ${height}`}
        style={{ overflow: 'hidden', display: 'block' }}
      >
        <defs>
          {/* Marker Panah Sumbu Abu-abu */}
          <marker
            id={axisLeftId}
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
            id={axisRightId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 2 1 L 8 5 L 2 9 z" fill="#64748b" />
          </marker>

          {/* Marker Panah Solusi Aksen (orient="auto" mengikuti arah x1 -> x2) */}
          <marker
            id={rayArrowId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5.5"
            markerHeight="5.5"
            orient="auto"
          >
            <path d="M 1 1 L 9 5 L 1 9 z" fill={accentColor} />
          </marker>
        </defs>

        {/* 1. Sumbu Horizontal Netral Abu-abu */}
        <line
          x1={pad - 12}
          y1={axisY}
          x2={svgWidth - pad + 12}
          y2={axisY}
          stroke="#64748b"
          strokeWidth="2"
          markerStart={`url(#${axisLeftId})`}
          markerEnd={`url(#${axisRightId})`}
          style={{ opacity: axisSpring }}
        />

        {/* 2. Ticks dan Label Nilai pada Sumbu */}
        {ticks.map((val) => {
          const x = toSvgX(val);
          const isBoundary = showSolution && val === boundaryValue;
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
        {showSolution && raySpring > 0.05 && (
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
        {showSolution && raySpring > 0.02 && (
          <line
            x1={boundarySvgX}
            y1={axisY}
            x2={animatedRayX}
            y2={axisY}
            stroke={accentColor}
            strokeWidth="4"
            strokeLinecap="butt"
            markerEnd={`url(#${rayArrowId})`}
          />
        )}

        {/* 5. Titik Batas Tepat di boundaryValue (Bulatan Penuh / Kosong) */}
        {showSolution && dotSpring > 0.01 && (
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
                x={-labelWidth / 2}
                y={-10}
                width={labelWidth}
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
        )}
      </svg>
    </div>
  );
});

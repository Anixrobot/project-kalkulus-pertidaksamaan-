import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Point, PtLDVLayer, mapMathToSvg } from '../../data/mathData';
import { MathFormula } from './MathFormula';

export interface CartesianPlane2DProps {
  viewport: { x: [number, number]; y: [number, number] };
  intercepts?: { yAxis: Point; xAxis: Point };
  lineEquationLatex?: string;
  lineStyle?: 'solid' | 'dashed';
  lineSegmentInViewport: [Point, Point];
  testOrigin?: {
    point: Point;
    substitutionLatex: string;
    isTrue: boolean;
    badgeLabel: string;
    conclusion?: string;
  };
  dhpColor?: string;
  lineColor?: string;
  dhpPolygon: Point[];
  layerPolygons?: PtLDVLayer[];
  width?: number;
  height?: number;
  startFrame?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Komponen CartesianPlane2D V4.0 (PtLDV)
 * Grafik bidang Kartesius 2D SVG murni, frame-deterministic, dan presisi.
 * Mendukung 5 urutan tahap animasi wajib, mapping mapMathToSvg, lineSegmentInViewport,
 * dhpPolygon, dan layerPolygons.
 */
export const CartesianPlane2D: React.FC<CartesianPlane2DProps> = React.memo(({
  viewport,
  intercepts,
  lineEquationLatex,
  lineStyle = 'solid',
  lineSegmentInViewport,
  testOrigin,
  dhpColor = 'rgba(16, 185, 129, 0.28)',
  lineColor = '#10b981',
  dhpPolygon,
  layerPolygons,
  width = 460,
  height = 360,
  startFrame = 0,
  className = '',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  const pad = width <= 350 ? 32 : 42;
  const svgSize = { width, height, padding: pad };

  // ── Tahap 1: Kemunculan Grid & Sumbu (Frame 0+) ──
  const gridSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // ── Tahap 2: Kemunculan Titik Potong Sumbu (Frame 18+) ──
  const interceptsSpring = spring({
    frame: relFrame - 18,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // ── Tahap 3: Penarikan Garis Pembatas (Frame 35+) ──
  const lineSpring = spring({
    frame: relFrame - 35,
    fps,
    config: { damping: 18, stiffness: 60 },
  });

  // ── Tahap 4: Uji Titik (0,0) & Lencana (Frame 60+) ──
  const testSpring = spring({
    frame: relFrame - 60,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  // ── Tahap 5: Arsiran Poligon DHP (Frame 85+) ──
  const dhpSpring = spring({
    frame: relFrame - 85,
    fps,
    config: { damping: 16, stiffness: 60 },
  });

  // Pemetaan Garis Pembatas dalam Viewport
  const p1Svg = mapMathToSvg(lineSegmentInViewport[0], viewport, svgSize);
  const p2Svg = mapMathToSvg(lineSegmentInViewport[1], viewport, svgSize);
  const lineLength = Math.hypot(p2Svg[0] - p1Svg[0], p2Svg[1] - p1Svg[1]);

  const animatedLineP2X = interpolate(lineSpring, [0, 1], [p1Svg[0], p2Svg[0]]);
  const animatedLineP2Y = interpolate(lineSpring, [0, 1], [p1Svg[1], p2Svg[1]]);
  const strokeDashoffset = lineLength * (1 - lineSpring);

  // Pemetaan Titik Potong
  const yInterceptSvg = intercepts ? mapMathToSvg(intercepts.yAxis, viewport, svgSize) : null;
  const xInterceptSvg = intercepts ? mapMathToSvg(intercepts.xAxis, viewport, svgSize) : null;

  // Pemetaan Titik Uji (0,0)
  const originSvg = mapMathToSvg([0, 0], viewport, svgSize);

  // Animasi Ping / Ripple pada Titik Uji
  const pingLoop = ((relFrame % 30) / 30);
  const rippleScale = interpolate(pingLoop, [0, 1], [1, 2.8]);
  const rippleOpacity = interpolate(pingLoop, [0, 0.7, 1], [0.8, 0.3, 0]);

  // Pemetaan Poligon DHP
  const dhpSvgPoints = dhpPolygon
    .map((pt) => mapMathToSvg(pt, viewport, svgSize).join(','))
    .join(' ');

  // Ticks Sumbu X dan Y
  const [xMin, xMax] = viewport.x;
  const [yMin, yMax] = viewport.y;
  const xTicks: number[] = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += 1) {
    if (x !== 0) xTicks.push(x);
  }
  const yTicks: number[] = [];
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += 1) {
    if (y !== 0) yTicks.push(y);
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-md ${className}`}
      style={{
        width,
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        ...style,
      }}
    >
      {/* Header Info Persamaan Garis & Uji Titik */}
      <div className="mb-2 flex w-full items-center justify-between px-2 text-xs">
        {lineEquationLatex && (
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400">Garis:</span>
            <span
              className="rounded px-2 py-0.5 text-xs font-mono font-bold"
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                color: lineColor,
                border: `1px solid ${lineColor}40`,
              }}
            >
              <MathFormula math={lineEquationLatex} fontSize={12} color={lineColor} />
            </span>
            <span className="text-[10px] text-slate-500">
              ({lineStyle === 'solid' ? 'Garis Utuh ≤/≥' : 'Putus-putus </>'})
            </span>
          </div>
        )}

        {testOrigin && testSpring > 0.1 && (
          <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide"
            style={{
              opacity: testSpring,
              transform: `scale(${testSpring})`,
              backgroundColor: testOrigin.isTrue ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
              color: testOrigin.isTrue ? '#34d399' : '#fca5a5',
              border: `1px solid ${testOrigin.isTrue ? '#10b981' : '#f43f5e'}`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: testOrigin.isTrue ? '#10b981' : '#f43f5e' }} />
            {testOrigin.badgeLabel}
          </div>
        )}
      </div>

      {/* Kanvas SVG Kartesius 2D */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: 'hidden', borderRadius: 8, backgroundColor: '#0b1329' }}
      >
        <defs>
          <clipPath id={`viewport-clip-${width}-${height}`}>
            <rect x={pad} y={pad} width={width - pad * 2} height={height - pad * 2} rx={4} />
          </clipPath>
        </defs>

        {/* 1. Grid Koordinat Halus */}
        <g opacity={gridSpring * 0.45}>
          {xTicks.map((x) => {
            const sx = mapMathToSvg([x, 0], viewport, svgSize)[0];
            return (
              <line
                key={`gx-${x}`}
                x1={sx}
                y1={pad}
                x2={sx}
                y2={height - pad}
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
            );
          })}
          {yTicks.map((y) => {
            const sy = mapMathToSvg([0, y], viewport, svgSize)[1];
            return (
              <line
                key={`gy-${y}`}
                x1={pad}
                y1={sy}
                x2={width - pad}
                y2={sy}
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
            );
          })}
        </g>

        {/* Area Terpotong Dalam Viewport */}
        <g clipPath={`url(#viewport-clip-${width}-${height})`}>
          {/* Layer Polygons Bertahap (Khusus Sistem PtLDV) */}
          {layerPolygons &&
            layerPolygons.map((layer, idx) => {
              const layerSpring = spring({
                frame: relFrame - (40 + idx * 12),
                fps,
                config: { damping: 16, stiffness: 70 },
              });
              const pts = layer.polygon
                .map((pt) => mapMathToSvg(pt, viewport, svgSize).join(','))
                .join(' ');
              return (
                <polygon
                  key={layer.label || idx}
                  points={pts}
                  fill={layer.color}
                  opacity={layerSpring * 0.18}
                />
              );
            })}

          {/* 5. Arsiran Daerah Himpunan Penyelesaian (DHP) Penuh */}
          {dhpSpring > 0.01 && (
            <polygon
              points={dhpSvgPoints}
              fill={dhpColor}
              opacity={dhpSpring}
            />
          )}

          {/* 3. Garis Pembatas (Solid / Dashed) Direntangkan Sesuai lineSegmentInViewport */}
          {lineSpring > 0.02 && (
            <line
              x1={p1Svg[0]}
              y1={p1Svg[1]}
              x2={animatedLineP2X}
              y2={animatedLineP2Y}
              stroke={lineColor}
              strokeWidth="3.5"
              strokeDasharray={lineStyle === 'dashed' ? '8 6' : undefined}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          )}
        </g>

        {/* Sumbu X & Sumbu Y Utama */}
        <g opacity={gridSpring}>
          {/* Sumbu X */}
          <line
            x1={pad - 12}
            y1={originSvg[1]}
            x2={width - pad + 12}
            y2={originSvg[1]}
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <text
            x={width - pad + 16}
            y={originSvg[1] + 4}
            fontSize="12"
            fontWeight="bold"
            fill="#94a3b8"
            fontFamily="Inter, sans-serif"
          >
            X
          </text>

          {/* Sumbu Y */}
          <line
            x1={originSvg[0]}
            y1={height - pad + 12}
            x2={originSvg[0]}
            y2={pad - 12}
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <text
            x={originSvg[0] - 4}
            y={pad - 16}
            fontSize="12"
            fontWeight="bold"
            fill="#94a3b8"
            fontFamily="Inter, sans-serif"
          >
            Y
          </text>

          {/* Label Titik Nol (0,0) */}
          <text
            x={originSvg[0] - 12}
            y={originSvg[1] + 14}
            fontSize="10"
            fill="#64748b"
            fontFamily="Inter, sans-serif"
          >
            0
          </text>

          {/* Label Ticks Angka */}
          {xTicks.map((x) => {
            const sx = mapMathToSvg([x, 0], viewport, svgSize)[0];
            return (
              <text
                key={`tx-${x}`}
                x={sx}
                y={originSvg[1] + 14}
                textAnchor="middle"
                fontSize="9"
                fill="#64748b"
                fontFamily="Inter, sans-serif"
              >
                {x}
              </text>
            );
          })}
          {yTicks.map((y) => {
            const sy = mapMathToSvg([0, y], viewport, svgSize)[1];
            return (
              <text
                key={`ty-${y}`}
                x={originSvg[0] - 8}
                y={sy + 3}
                textAnchor="end"
                fontSize="9"
                fill="#64748b"
                fontFamily="Inter, sans-serif"
              >
                {y}
              </text>
            );
          })}
        </g>

        {/* 2. Titik Potong Sumbu X & Y Berlabel */}
        {intercepts && interceptsSpring > 0.05 && (
          <g opacity={interceptsSpring}>
            {/* Titik Potong Sumbu Y */}
            {yInterceptSvg && (
              <g transform={`translate(${yInterceptSvg[0]}, ${yInterceptSvg[1]})`}>
                <circle cx={0} cy={0} r={5.5} fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
                <rect x={8} y={-16} width={42} height={16} rx={3} fill="#1e293b" stroke="#fbbf24" strokeWidth="1" />
                <text x={29} y={-4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fbbf24" fontFamily="Inter, sans-serif">
                  ({intercepts.yAxis[0]},{intercepts.yAxis[1]})
                </text>
              </g>
            )}

            {/* Titik Potong Sumbu X */}
            {xInterceptSvg && (
              <g transform={`translate(${xInterceptSvg[0]}, ${xInterceptSvg[1]})`}>
                <circle cx={0} cy={0} r={5.5} fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
                <rect x={-21} y={10} width={42} height={16} rx={3} fill="#1e293b" stroke="#fbbf24" strokeWidth="1" />
                <text x={0} y={22} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fbbf24" fontFamily="Inter, sans-serif">
                  ({intercepts.xAxis[0]},{intercepts.xAxis[1]})
                </text>
              </g>
            )}
          </g>
        )}

        {/* 4. Efek Ping/Ripple pada Titik Asal (0,0) */}
        {testOrigin && testSpring > 0.05 && (
          <g opacity={testSpring}>
            <circle
              cx={originSvg[0]}
              cy={originSvg[1]}
              r={7 * rippleScale}
              fill="none"
              stroke={testOrigin.isTrue ? '#10b981' : '#f43f5e'}
              strokeWidth="2"
              opacity={rippleOpacity}
            />
            <circle
              cx={originSvg[0]}
              cy={originSvg[1]}
              r={4.5}
              fill={testOrigin.isTrue ? '#10b981' : '#f43f5e'}
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </g>
        )}
      </svg>
    </div>
  );
});

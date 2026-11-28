import React, { useId } from 'react';
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
  activeStep?: number; // 1..5 untuk sinkronisasi ketat 1:1 dengan step kiri; undefined = mode otonom
  stepStartFrame?: number; // Frame awal ketika activeStep aktif
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Komponen CartesianPlane2D V4.2 (PtLDV)
 * Grafik bidang Kartesius 2D SVG murni, frame-deterministic, dan sinkron 1:1 dengan langkah aljabar.
 * Mendukung mode terkontrol (activeStep 1..5) serta kompatibel mundur untuk mode otonom.
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
  activeStep,
  stepStartFrame = 0,
  className = '',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const uid = useId().replace(/:/g, '');
  const clipId = `${uid}-viewport-clip`;

  const relFrame = Math.max(0, frame - startFrame);
  const stepLocalFrame = Math.max(0, frame - stepStartFrame);
  const isControlled = activeStep !== undefined;
  const isSystemMode = Boolean(layerPolygons && layerPolygons.length >= 3);

  // Sesuaikan lebar SVG di dalam kartu berpading p-2 (16px + 2px border = 18px) agar tidak terpotong
  const svgWidth = Math.max(220, width - 18);
  const pad = width <= 350 ? 30 : 42;
  const svgSize = { width: svgWidth, height, padding: pad };

  // ── Tahap 1..5: Mode Terkontrol (Sinkron 1:1) vs Mode Otonom (Legacy) ──
  const gridSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const interceptsSpring = isControlled
    ? activeStep === 2
      ? spring({ frame: stepLocalFrame, fps, config: { damping: 14, stiffness: 100 } })
      : activeStep > 2
      ? 1
      : 0
    : spring({
        frame: Math.max(0, relFrame - 18),
        fps,
        config: { damping: 14, stiffness: 100 },
      });

  const lineSpring = isControlled
    ? activeStep === 3
      ? spring({ frame: stepLocalFrame, fps, config: { damping: 18, stiffness: 55 } })
      : activeStep > 3
      ? 1
      : 0
    : spring({
        frame: Math.max(0, relFrame - 35),
        fps,
        config: { damping: 18, stiffness: 60 },
      });

  const testSpring = isControlled
    ? activeStep === 4
      ? spring({ frame: stepLocalFrame, fps, config: { damping: 15, stiffness: 90 } })
      : activeStep > 4
      ? 1
      : 0
    : spring({
        frame: Math.max(0, relFrame - 60),
        fps,
        config: { damping: 15, stiffness: 90 },
      });

  const dhpSpring = isControlled
    ? activeStep >= 5
      ? spring({ frame: stepLocalFrame, fps, config: { damping: 16, stiffness: 60 } })
      : 0
    : spring({
        frame: Math.max(0, relFrame - 85),
        fps,
        config: { damping: 16, stiffness: 60 },
      });

  // Pemetaan Garis Pembatas dalam Viewport
  const p1Svg = mapMathToSvg(lineSegmentInViewport[0], viewport, svgSize);
  const p2Svg = mapMathToSvg(lineSegmentInViewport[1], viewport, svgSize);
  const lineLength = Math.hypot(p2Svg[0] - p1Svg[0], p2Svg[1] - p1Svg[1]);

  const animatedLineP2X = interpolate(lineSpring, [0, 1], [p1Svg[0], p2Svg[0]]);
  const animatedLineP2Y = interpolate(lineSpring, [0, 1], [p1Svg[1], p2Svg[1]]);
  const solidDashoffset = lineLength * (1 - lineSpring);

  // Pemetaan Titik Potong
  const yInterceptSvg = intercepts ? mapMathToSvg(intercepts.yAxis, viewport, svgSize) : null;
  const xInterceptSvg = intercepts ? mapMathToSvg(intercepts.xAxis, viewport, svgSize) : null;

  // Pemetaan Titik Uji (0,0)
  const originSvg = mapMathToSvg([0, 0], viewport, svgSize);

  // Animasi Ping / Ripple pada Titik Uji
  const pingLoop = (relFrame % 30) / 30;
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

  const showTestBadge = Boolean(
    testOrigin && (isControlled ? activeStep >= 4 : testSpring > 0.1)
  );

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-md ${className}`}
      style={{
        width,
        maxWidth: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        ...style,
      }}
    >
      {/* Header 2-Baris Rapi Anti-Break & Badge Uji Titik Anti-Spoiler */}
      <div className="mb-1.5 flex w-full items-center justify-between gap-2 px-1 min-h-[34px]">
        {lineEquationLatex && (
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-1.5" style={{ whiteSpace: 'nowrap' }}>
              <span className="text-[10px] font-semibold text-slate-400">Garis:</span>
              <span
                className="rounded px-1.5 py-0.5 text-[11px] font-mono font-bold"
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  color: lineColor,
                  border: `1px solid ${lineColor}40`,
                }}
              >
                <MathFormula math={lineEquationLatex} fontSize={11} color={lineColor} />
              </span>
            </div>
            <span className="text-[9px] text-slate-400" style={{ whiteSpace: 'nowrap' }}>
              {lineStyle === 'solid'
                ? 'Garis Utuh / Solid (≤ atau ≥)'
                : 'Garis Putus-putus / Dashed (< atau >)'}
            </span>
          </div>
        )}

        <div className="shrink-0 flex items-center justify-end">
          {testOrigin && (
            <div
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-wide"
              style={{
                whiteSpace: 'nowrap',
                opacity: showTestBadge ? testSpring : 0,
                transform: `scale(${showTestBadge ? testSpring : 0.85})`,
                backgroundColor: testOrigin.isTrue
                  ? 'rgba(16, 185, 129, 0.2)'
                  : 'rgba(244, 63, 94, 0.2)',
                color: testOrigin.isTrue ? '#34d399' : '#fecdd3',
                border: `1px solid ${testOrigin.isTrue ? '#10b981' : '#f43f5e'}`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: testOrigin.isTrue ? '#10b981' : '#f43f5e' }}
              />
              {testOrigin.badgeLabel}
            </div>
          )}
        </div>
      </div>

      {/* Kanvas SVG Kartesius 2D */}
      <svg
        width={svgWidth}
        height={height}
        viewBox={`0 0 ${svgWidth} ${height}`}
        style={{ overflow: 'hidden', borderRadius: 8, backgroundColor: '#0b1329', display: 'block' }}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={pad} y={pad} width={svgWidth - pad * 2} height={height - pad * 2} rx={4} />
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
                x2={svgWidth - pad}
                y2={sy}
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
            );
          })}
        </g>

        {/* Area Terpotong Dalam Viewport */}
        <g clipPath={`url(#${clipId})`}>
          {/* Layer Polygons Bertahap (Khusus Sistem PtLDV Soal 5) */}
          {layerPolygons &&
            layerPolygons.map((layer, idx) => {
              let layerOpacity = 0;
              if (isControlled && isSystemMode) {
                if (idx < 2) {
                  // Lapisan x >= 0 & y >= 0 tampil ringan sejak Step 1, meredup saat Step 5
                  const step1Spring =
                    activeStep === 1
                      ? spring({ frame: stepLocalFrame, fps, config: { damping: 16, stiffness: 75 } })
                      : 1;
                  layerOpacity = activeStep >= 5 ? 0.35 : step1Spring * 0.85;
                } else {
                  // Lapisan ke-3 (x + y >= 4) muncul saat Step 5 sebelum irisan tajam DHP
                  layerOpacity = activeStep >= 5 ? dhpSpring * 0.9 : 0;
                }
              } else {
                const legacyLayerSpring = spring({
                  frame: Math.max(0, relFrame - (40 + idx * 12)),
                  fps,
                  config: { damping: 16, stiffness: 70 },
                });
                layerOpacity = legacyLayerSpring * 0.45;
              }

              if (layerOpacity <= 0.01) return null;

              const pts = layer.polygon
                .map((pt) => mapMathToSvg(pt, viewport, svgSize).join(','))
                .join(' ');
              return (
                <polygon
                  key={layer.label || idx}
                  points={pts}
                  fill={layer.color}
                  opacity={layerOpacity}
                />
              );
            })}

          {/* 5. Arsiran Daerah Himpunan Penyelesaian (DHP) Penuh */}
          {dhpSpring > 0.01 && (
            <polygon points={dhpSvgPoints} fill={dhpColor} opacity={dhpSpring} />
          )}

          {/* 3. Garis Pembatas (Solid / Dashed) Direntangkan Sesuai lineSegmentInViewport */}
          {lineSpring > 0.02 &&
            (lineStyle === 'dashed' ? (
              <line
                x1={p1Svg[0]}
                y1={p1Svg[1]}
                x2={animatedLineP2X}
                y2={animatedLineP2Y}
                stroke={lineColor}
                strokeWidth="3.5"
                strokeDasharray="8 6"
                strokeLinecap="butt"
              />
            ) : (
              <line
                x1={p1Svg[0]}
                y1={p1Svg[1]}
                x2={p2Svg[0]}
                y2={p2Svg[1]}
                stroke={lineColor}
                strokeWidth="3.5"
                strokeDasharray={lineLength}
                strokeDashoffset={solidDashoffset}
                strokeLinecap="round"
              />
            ))}
        </g>

        {/* Sumbu X & Sumbu Y Utama */}
        <g opacity={gridSpring}>
          {/* Sumbu X */}
          <line
            x1={pad - 12}
            y1={originSvg[1]}
            x2={svgWidth - pad + 12}
            y2={originSvg[1]}
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <text
            x={svgWidth - pad + 16}
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
                <rect x={8} y={-16} width={44} height={16} rx={3} fill="#1e293b" stroke="#fbbf24" strokeWidth="1" />
                <text x={30} y={-4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fbbf24" fontFamily="Inter, sans-serif">
                  ({intercepts.yAxis[0]},{intercepts.yAxis[1]})
                </text>
              </g>
            )}

            {/* Titik Potong Sumbu X */}
            {xInterceptSvg && (
              <g transform={`translate(${xInterceptSvg[0]}, ${xInterceptSvg[1]})`}>
                <circle cx={0} cy={0} r={5.5} fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
                <rect x={-22} y={10} width={44} height={16} rx={3} fill="#1e293b" stroke="#fbbf24" strokeWidth="1" />
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

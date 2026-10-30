import React, { memo } from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface NumberLineProps {
  min: number;
  max: number;
  points: {
    value: number;
    label?: string;
    isClosed?: boolean;
  }[];
  intervals?: {
    start?: number;
    end?: number;
    sign: "+" | "-";
    isSolution?: boolean;
  }[];
  testPoint?: {
    value: number;
    result: string;
  };
}

export const NumberLine: React.FC<NumberLineProps> = memo(({
  min = -3,
  max = 3,
  points,
  intervals = [],
  testPoint,
}) => {
  const frame = useCurrentFrame();

  const width = 800;
  const height = 130;
  const paddingX = 70;
  const lineY = 80;

  const getX = (val: number) => {
    return paddingX + ((val - min) / (max - min)) * (width - 2 * paddingX);
  };

  // Animasi garis muncul dari tengah melebar secara smooth
  const lineProgress = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ticks: number[] = [];
  for (let i = min; i <= max; i++) {
    ticks.push(i);
  }

  return (
    <div className="flex flex-col items-center bg-black/30 p-3 rounded-2xl border border-emerald-500/30 will-change-transform">
      <svg width={width} height={height} className="overflow-visible font-mono" style={{ shapeRendering: "geometricPrecision" }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#86efac" />
          </marker>
        </defs>

        {/* Daerah Arsiran Solusi */}
        {intervals.map((inv, idx) => {
          if (!inv.isSolution) return null;
          const startX = inv.start !== undefined ? getX(inv.start) : paddingX - 20;
          const endX = inv.end !== undefined ? getX(inv.end) : width - paddingX + 20;
          const rectW = Math.max(0, endX - startX);

          return (
            <rect
              key={`sol-${idx}`}
              x={startX}
              y={lineY - 32}
              width={rectW * lineProgress}
              height={32}
              fill="rgba(52, 211, 153, 0.25)"
              stroke="rgba(52, 211, 153, 0.6)"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Garis Bilangan Utama */}
        <line
          x1={width / 2 - (width / 2 - paddingX + 20) * lineProgress}
          y1={lineY}
          x2={width / 2 + (width / 2 - paddingX + 20) * lineProgress}
          y2={lineY}
          stroke="#86efac"
          strokeWidth="3"
          markerStart="url(#arrow)"
          markerEnd="url(#arrow)"
        />

        {/* Tick Mark & Angka */}
        {ticks.map((t) => {
          const x = getX(t);
          return (
            <g key={t} opacity={lineProgress}>
              <line x1={x} y1={lineY - 6} x2={x} y2={lineY + 6} stroke="#86efac" strokeWidth="2" />
              <text x={x} y={lineY + 24} fill="#d1fae5" fontSize="13" textAnchor="middle" fontWeight="bold">
                {t}
              </text>
            </g>
          );
        })}

        {/* Tanda Interval (+ atau -) */}
        {intervals.map((inv, idx) => {
          const leftX = inv.start !== undefined ? getX(inv.start) : paddingX;
          const rightX = inv.end !== undefined ? getX(inv.end) : width - paddingX;
          const midX = (leftX + rightX) / 2;

          return (
            <g key={`sign-${idx}`} opacity={lineProgress}>
              <circle
                cx={midX}
                cy={lineY - 18}
                r="12"
                fill={inv.sign === "+" ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)"}
                stroke={inv.sign === "+" ? "#4ade80" : "#f87171"}
                strokeWidth="2"
              />
              <text
                x={midX}
                y={lineY - 13}
                fill="#ffffff"
                fontSize="16"
                fontWeight="black"
                textAnchor="middle"
              >
                {inv.sign}
              </text>
            </g>
          );
        })}

        {/* Titik Pembuat Nol (Points) */}
        {points.map((pt, idx) => {
          const x = getX(pt.value);
          return (
            <g key={`pt-${idx}`} opacity={lineProgress}>
              <circle
                cx={x}
                cy={lineY}
                r="7"
                fill={pt.isClosed ? "#fef08a" : "#133526"}
                stroke="#fef08a"
                strokeWidth="3"
              />
              {pt.label && (
                <text x={x} y={lineY - 40} fill="#fef08a" fontSize="14" fontWeight="bold" textAnchor="middle">
                  {pt.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Titik Uji Info */}
      {testPoint && (
        <div className="mt-1 text-xs font-mono bg-yellow-950/50 border border-yellow-500/40 text-yellow-200 px-3.5 py-1 rounded-lg flex items-center gap-2">
          <span>🔍 Titik Uji x = {testPoint.value}:</span>
          <span className="font-bold underline">{testPoint.result}</span>
        </div>
      )}
    </div>
  );
});

import React, { memo } from "react";

export interface NumberLinePoint {
  value: number;
  label: string;
  isClosed: boolean;
}

export interface NumberLineShade {
  from: number;
  to: number;
  label?: string;
}

export interface NumberLineSign {
  at: number;
  sign: "+" | "-";
}

export interface NumberLineConfig {
  min: number;
  max: number;
  points: NumberLinePoint[];
  shades?: NumberLineShade[];
  signs?: NumberLineSign[];
  caption?: string;
}

export interface NumberLineProps {
  config?: NumberLineConfig;
  min?: number;
  max?: number;
  points?: NumberLinePoint[];
  shades?: NumberLineShade[];
  signs?: NumberLineSign[];
  intervals?: any;
  caption?: string;
  className?: string;
}

export const NumberLine: React.FC<NumberLineProps> = memo((props) => {
  // Dukung format config terbungkus maupun props datar langsung
  const min = props.config?.min ?? props.min ?? -5;
  const max = props.config?.max ?? props.max ?? 5;
  const points = props.config?.points ?? props.points ?? [];
  const shades = props.config?.shades ?? props.shades ?? [];
  const signs = props.config?.signs ?? props.signs ?? [];
  const caption = props.config?.caption ?? props.caption;
  const className = props.className ?? "";

  const range = max - min || 1;

  // Dimensi SVG
  const svgWidth = 840;
  const svgHeight = 150;
  const paddingX = 70;
  const axisY = 75;
  const effectiveWidth = svgWidth - 2 * paddingX;

  const getX = (val: number): number => {
    const clamped = Math.max(min, Math.min(max, val));
    return paddingX + ((clamped - min) / range) * effectiveWidth;
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center p-3 ${className}`}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto max-w-3xl overflow-visible select-none drop-shadow-lg"
      >
        <defs>
          {/* Panah Sumbu Kiri */}
          <marker
            id="arrow-left"
            viewBox="0 0 10 10"
            refX="0"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 10 0 L 0 5 L 10 10 z" fill="#fef08a" />
          </marker>
          {/* Panah Sumbu Kanan */}
          <marker
            id="arrow-right"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#fef08a" />
          </marker>
          {/* Pola Arsiran Hijau */}
          <pattern
            id="hatch-green"
            patternUnits="userSpaceOnUse"
            width="8"
            height="8"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="8" stroke="#34d399" strokeWidth="2.5" opacity="0.6" />
          </pattern>
        </defs>

        {/* ── 1. Daerah Arsiran Interval HP (Shades) ── */}
        {shades.map((shade, i) => {
          const x1 = getX(shade.from);
          const x2 = getX(shade.to);
          const width = Math.max(8, x2 - x1);
          return (
            <g key={`shade-${i}`}>
              <rect
                x={x1}
                y={axisY - 22}
                width={width}
                height={44}
                rx={6}
                fill="url(#hatch-green)"
              />
              <rect
                x={x1}
                y={axisY - 22}
                width={width}
                height={44}
                rx={6}
                fill="#10b981"
                opacity="0.25"
              />
              {shade.label && (
                <text
                  x={x1 + width / 2}
                  y={axisY - 30}
                  textAnchor="middle"
                  fill="#6ee7b7"
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {shade.label}
                </text>
              )}
            </g>
          );
        })}

        {/* ── 2. Garis Utama Sumbu Bilangan ── */}
        <line
          x1={paddingX - 25}
          y1={axisY}
          x2={svgWidth - paddingX + 25}
          y2={axisY}
          stroke="#fef08a"
          strokeWidth="3.5"
          markerStart="url(#arrow-left)"
          markerEnd="url(#arrow-right)"
        />

        {/* ── 3. Tanda Positif (+) & Negatif (-) di Setiap Daerah Interval ── */}
        {signs.map((s, idx) => {
          const sx = getX(s.at);
          const isPos = s.sign === "+";
          return (
            <g key={`sign-${idx}`}>
              <circle
                cx={sx}
                cy={axisY + 45}
                r={13}
                fill={isPos ? "#065f46" : "#7f1d1d"}
                stroke={isPos ? "#34d399" : "#f87171"}
                strokeWidth="2"
              />
              <text
                x={sx}
                y={axisY + 50}
                textAnchor="middle"
                fill={isPos ? "#a7f3d0" : "#fca5a5"}
                fontSize="16"
                fontWeight="bold"
                fontFamily="monospace"
              >
                {s.sign}
              </text>
            </g>
          );
        })}

        {/* ── 4. Titik-Titik Kritis (Bulatan Kosong vs Penuh) ── */}
        {points.map((pt, i) => {
          const px = getX(pt.value);
          return (
            <g key={`pt-${i}`}>
              {/* Garis Tik Vertikal Sumbu */}
              <line
                x1={px}
                y1={axisY - 10}
                x2={px}
                y2={axisY + 10}
                stroke="#fef08a"
                strokeWidth="2"
              />

              {/* Bulatan: Penuh jika isClosed, Kosong jika !isClosed */}
              {pt.isClosed ? (
                // Bulatan Penuh (<= atau >=)
                <circle
                  cx={px}
                  cy={axisY}
                  r="9"
                  fill="#22c55e"
                  stroke="#ffffff"
                  strokeWidth="3"
                  className="filter drop-shadow"
                />
              ) : (
                // Bulatan Kosong (< atau > atau penyebut ≠ 0)
                <circle
                  cx={px}
                  cy={axisY}
                  r="9"
                  fill="#0b291a"
                  stroke="#ef4444"
                  strokeWidth="3.5"
                  className="filter drop-shadow"
                />
              )}

              {/* Teks Label Angka di Bawah Bulatan */}
              <text
                x={px}
                y={axisY + 28}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="14"
                fontWeight="bold"
                fontFamily="monospace"
              >
                {pt.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ── Caption Keterangan ── */}
      {caption && (
        <div className="mt-2 text-center text-xs text-emerald-200 font-mono bg-black/40 px-4 py-1 rounded-full border border-emerald-500/30">
          {caption}
        </div>
      )}
    </div>
  );
});

import React, { memo } from "react";

export interface CartesianLine {
  equation: string;
  slope?: number;
  intercept?: number;
  isDashed: boolean;
  color?: string;
  label: string;
}

export interface CartesianConfig {
  lines: CartesianLine[];
  points: Array<{ x: number; y: number; label: string }>;
  testPoint?: { x: number; y: number; satisfies: boolean; label: string };
  shadeRegion?: "above" | "below" | "polygon";
  polygonPoints?: Array<[number, number]>;
  caption?: string;
}

export interface CartesianPlotProps {
  config?: CartesianConfig;
  className?: string;
}

export const CartesianPlot: React.FC<CartesianPlotProps> = memo(({ config, className = "" }) => {
  // Default fallback config jika tidak disediakan
  const currentConfig: CartesianConfig = config || {
    lines: [
      {
        equation: "2x + 5y <= 10",
        slope: -0.4,
        intercept: 2,
        isDashed: false,
        color: "#38bdf8",
        label: "2x + 5y <= 10",
      },
    ],
    points: [
      { x: 0, y: 2, label: "A(0, 2)" },
      { x: 5, y: 0, label: "B(5, 0)" },
    ],
    testPoint: { x: 0, y: 0, satisfies: true, label: "Uji (0,0) -> 0 <= 10 (BENAR)" },
    shadeRegion: "below",
    caption: "Daerah Himpunan Penyelesaian (DHP) PLDV di Bawah Garis Batas",
  };

  const { lines, points, testPoint, shadeRegion, caption } = currentConfig;

  // Ukuran Canvas Kartesius
  const width = 520;
  const height = 380;
  const originX = 140;
  const originY = 270;
  const scale = 40; // 40px per 1 unit

  const toSvgX = (x: number) => originX + x * scale;
  const toSvgY = (y: number) => originY - y * scale;

  return (
    <div className={`flex flex-col items-center justify-center p-2 select-none ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-lg h-auto overflow-visible rounded-xl bg-[#092215]/80 border border-emerald-500/40 p-2 shadow-2xl"
      >
        <defs>
          {/* Panah Sumbu Kartesius */}
          <marker id="cart-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#a7f3d0" />
          </marker>
          {/* Pola Arsiran Hijau DHP */}
          <pattern id="cart-dhp-hatch" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#34d399" strokeWidth="2.5" opacity="0.65" />
          </pattern>
        </defs>

        {/* ── 1. Grid Garis Halus ── */}
        <g stroke="#1e4631" strokeWidth="1" strokeDasharray="3 3">
          {[-2, -1, 1, 2, 3, 4, 5, 6, 7].map((x) => (
            <line key={`gx-${x}`} x1={toSvgX(x)} y1={20} x2={toSvgX(x)} y2={height - 20} />
          ))}
          {[-2, -1, 1, 2, 3, 4, 5].map((y) => (
            <line key={`gy-${y}`} x1={20} y1={toSvgY(y)} x2={width - 20} y2={toSvgY(y)} />
          ))}
        </g>

        {/* ── 2. Daerah Arsiran DHP ── */}
        {shadeRegion && (
          <polygon
            points={`
              ${toSvgX(-1.5)},${toSvgY(-1.5)}
              ${toSvgX(6.5)},${toSvgY(-1.5)}
              ${toSvgX(6.5)},${toSvgY(-0.6)}
              ${toSvgX(-1.5)},${toSvgY(2.6)}
            `}
            fill="url(#cart-dhp-hatch)"
            opacity="0.85"
          />
        )}

        {/* Label DHP di Tengah Arsiran */}
        <g transform={`translate(${toSvgX(1.8)}, ${toSvgY(0.7)})`}>
          <rect x="-35" y="-14" width="70" height="26" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
          <text textAnchor="middle" y="4" fill="#fef08a" fontSize="12" fontWeight="bold" fontFamily="monospace">
            DHP
          </text>
        </g>

        {/* ── 3. Sumbu Koordinat X & Y ── */}
        {/* Sumbu X */}
        <line
          x1={20}
          y1={originY}
          x2={width - 20}
          y2={originY}
          stroke="#a7f3d0"
          strokeWidth="2.5"
          markerEnd="url(#cart-arrow)"
        />
        <text x={width - 15} y={originY + 16} fill="#a7f3d0" fontSize="13" fontWeight="bold" fontFamily="monospace">
          X
        </text>

        {/* Sumbu Y */}
        <line
          x1={originX}
          y1={height - 20}
          x2={originX}
          y2={20}
          stroke="#a7f3d0"
          strokeWidth="2.5"
          markerEnd="url(#cart-arrow)"
        />
        <text x={originX + 10} y={26} fill="#a7f3d0" fontSize="13" fontWeight="bold" fontFamily="monospace">
          Y
        </text>

        {/* Titik Asal O(0,0) */}
        <text x={originX - 14} y={originY + 16} fill="#6ee7b7" fontSize="11" fontFamily="monospace">
          0
        </text>

        {/* Angka Label pada Sumbu X */}
        {[1, 2, 3, 4, 5, 6].map((x) => (
          <text key={`tx-${x}`} x={toSvgX(x)} y={originY + 16} textAnchor="middle" fill="#94a3b8" fontSize="10">
            {x}
          </text>
        ))}
        {/* Angka Label pada Sumbu Y */}
        {[1, 2, 3, 4].map((y) => (
          <text key={`ty-${y}`} x={originX - 10} y={toSvgY(y) + 4} textAnchor="end" fill="#94a3b8" fontSize="10">
            {y}
          </text>
        ))}

        {/* ── 4. Garis-Garis Batas Pembatas PLDV ── */}
        {lines.map((ln, idx) => {
          const x1 = -1.5;
          const y1 = (ln.slope ?? -0.4) * x1 + (ln.intercept ?? 2);
          const x2 = 7;
          const y2 = (ln.slope ?? -0.4) * x2 + (ln.intercept ?? 2);

          return (
            <g key={`line-${idx}`}>
              <line
                x1={toSvgX(x1)}
                y1={toSvgY(y1)}
                x2={toSvgX(x2)}
                y2={toSvgY(y2)}
                stroke={ln.color || "#38bdf8"}
                strokeWidth="3.5"
                strokeDasharray={ln.isDashed ? "7 5" : "none"}
                className="drop-shadow"
              />
              <text
                x={toSvgX(4.2)}
                y={toSvgY(ln.slope ? ln.slope * 4.2 + (ln.intercept ?? 2) : 0.5) - 10}
                fill={ln.color || "#38bdf8"}
                fontSize="11"
                fontWeight="bold"
                fontFamily="monospace"
              >
                {ln.label}
              </text>
            </g>
          );
        })}

        {/* ── 5. Titik-Titik Koordinat Potong ── */}
        {points.map((pt, i) => (
          <g key={`pt-${i}`}>
            <circle cx={toSvgX(pt.x)} cy={toSvgY(pt.y)} r="6" fill="#facc15" stroke="#0f172a" strokeWidth="2" />
            <text
              x={toSvgX(pt.x) + 8}
              y={toSvgY(pt.y) - 8}
              fill="#fef08a"
              fontSize="11"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {pt.label}
            </text>
          </g>
        ))}

        {/* ── 6. Titik Uji (0,0) ── */}
        {testPoint && (
          <g>
            <circle
              cx={toSvgX(testPoint.x)}
              cy={toSvgY(testPoint.y)}
              r="7"
              fill={testPoint.satisfies ? "#22c55e" : "#ef4444"}
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            <rect
              x={toSvgX(testPoint.x) + 12}
              y={toSvgY(testPoint.y) - 22}
              width="170"
              height="24"
              rx="5"
              fill="#064e3b"
              stroke={testPoint.satisfies ? "#34d399" : "#f87171"}
              strokeWidth="1.5"
            />
            <text
              x={toSvgX(testPoint.x) + 18}
              y={toSvgY(testPoint.y) - 6}
              fill={testPoint.satisfies ? "#a7f3d0" : "#fca5a5"}
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {testPoint.label}
            </text>
          </g>
        )}
      </svg>

      {caption && (
        <div className="mt-2 text-center text-xs text-sky-200 font-mono bg-black/40 px-3 py-1 rounded-full border border-sky-500/30">
          {caption}
        </div>
      )}
    </div>
  );
});

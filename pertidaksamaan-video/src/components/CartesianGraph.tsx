import React, { memo } from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const CartesianGraph: React.FC = memo(() => {
  const frame = useCurrentFrame();

  const width = 480;
  const height = 350;
  const originX = 70;
  const originY = 280;
  const scale = 50;

  const toSvgX = (x: number) => originX + x * scale;
  const toSvgY = (y: number) => originY - y * scale;

  // Animasi progress gambar
  const drawProgress = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shadeProgress = interpolate(frame, [35, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className="relative bg-black/40 rounded-2xl p-3.5 border border-emerald-500/30 flex flex-col items-center will-change-transform">
      <svg width={width} height={height} className="overflow-visible font-mono" style={{ shapeRendering: "geometricPrecision" }}>
        <defs>
          <marker id="axisArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#a7f3d0" />
          </marker>
        </defs>

        {/* Grid Latar Belakang */}
        {[1, 2, 3, 4, 5, 6, 7].map((x) => (
          <line
            key={`grid-x-${x}`}
            x1={toSvgX(x)}
            y1={20}
            x2={toSvgX(x)}
            y2={originY + 20}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeDasharray="2 2"
          />
        ))}
        {[1, 2, 3, 4, 5].map((y) => (
          <line
            key={`grid-y-${y}`}
            x1={originX - 20}
            y1={toSvgY(y)}
            x2={width - 20}
            y2={toSvgY(y)}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeDasharray="2 2"
          />
        ))}

        {/* Daerah Arsiran Himpunan Penyelesaian (4x + 8y >= 16) */}
        <polygon
          points={`
            ${toSvgX(0)},${toSvgY(2)} 
            ${toSvgX(4)},${toSvgY(0)} 
            ${toSvgX(7)},${toSvgY(0)} 
            ${toSvgX(7)},${toSvgY(5)} 
            ${toSvgX(0)},${toSvgY(5)}
          `}
          fill="rgba(52, 211, 153, 0.28)"
          stroke="rgba(52, 211, 153, 0.5)"
          strokeDasharray="5 5"
          opacity={shadeProgress}
        />

        {/* Label Daerah HP */}
        {shadeProgress > 0.5 && (
          <g opacity={shadeProgress}>
            <rect x={toSvgX(2.5) - 35} y={toSvgY(3.5) - 15} width="70" height="28" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="1" />
            <text x={toSvgX(2.5)} y={toSvgY(3.5) + 4} fill="#ecfdf5" fontSize="13" fontWeight="bold" textAnchor="middle">
              Daerah HP
            </text>
          </g>
        )}

        {/* Sumbu X */}
        <line
          x1={originX - 20}
          y1={originY}
          x2={width - 20}
          y2={originY}
          stroke="#a7f3d0"
          strokeWidth="2.5"
          markerEnd="url(#axisArrow)"
        />
        <text x={width - 15} y={originY + 18} fill="#a7f3d0" fontSize="14" fontWeight="bold">X</text>

        {/* Sumbu Y */}
        <line
          x1={originX}
          y1={originY + 20}
          x2={originX}
          y2={20}
          stroke="#a7f3d0"
          strokeWidth="2.5"
          markerEnd="url(#axisArrow)"
        />
        <text x={originX - 18} y={18} fill="#a7f3d0" fontSize="14" fontWeight="bold">Y</text>

        {/* Angka Sumbu X */}
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <g key={`x-${num}`}>
            <line x1={toSvgX(num)} y1={originY - 4} x2={toSvgX(num)} y2={originY + 4} stroke="#a7f3d0" strokeWidth="2" />
            <text x={toSvgX(num)} y={originY + 20} fill="#d1fae5" fontSize="12" textAnchor="middle">
              {num}
            </text>
          </g>
        ))}

        {/* Angka Sumbu Y */}
        {[1, 2, 3, 4].map((num) => (
          <g key={`y-${num}`}>
            <line x1={originX - 4} y1={toSvgY(num)} x2={originX + 4} y2={toSvgY(num)} stroke="#a7f3d0" strokeWidth="2" />
            <text x={originX - 16} y={toSvgY(num) + 4} fill="#d1fae5" fontSize="12" textAnchor="middle">
              {num}
            </text>
          </g>
        ))}
        <text x={originX - 12} y={originY + 16} fill="#a7f3d0" fontSize="12">0</text>

        {/* Garis 4x + 8y = 16 */}
        <line
          x1={toSvgX(0)}
          y1={toSvgY(2)}
          x2={toSvgX(0 + 5.5 * drawProgress)}
          y2={toSvgY(2 - 2.75 * drawProgress)}
          stroke="#fef08a"
          strokeWidth="3.5"
        />

        {/* Titik Potong (0,2) */}
        {drawProgress > 0.3 && (
          <g>
            <circle cx={toSvgX(0)} cy={toSvgY(2)} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x={toSvgX(0) + 14} y={toSvgY(2) - 8} fill="#fef08a" fontSize="12" fontWeight="bold">
              (0, 2)
            </text>
          </g>
        )}

        {/* Titik Potong (4,0) */}
        {drawProgress > 0.8 && (
          <g>
            <circle cx={toSvgX(4)} cy={toSvgY(0)} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x={toSvgX(4) - 10} y={toSvgY(0) - 12} fill="#fef08a" fontSize="12" fontWeight="bold">
              (4, 0)
            </text>
          </g>
        )}

        {/* Titik Uji (0,0) */}
        {shadeProgress > 0.3 && (
          <g>
            <circle cx={originX} cy={originY} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <text x={originX + 10} y={originY - 8} fill="#fca5a5" fontSize="11" fontWeight="bold">
              (0,0) ❌ Salah!
            </text>
          </g>
        )}
      </svg>
      
      <div className="text-xs text-emerald-200 mt-2 font-mono flex gap-4">
        <span>Garis: <b className="text-yellow-300">4x + 8y = 16</b></span>
        <span>Uji (0,0): <b className="text-red-300">0 ≥ 16 (FALSE)</b></span>
      </div>
    </div>
  );
});

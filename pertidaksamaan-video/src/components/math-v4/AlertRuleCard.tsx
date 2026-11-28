import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export interface AlertRuleCardProps {
  title?: string;
  message?: string;
  operationLabel?: string; // e.g. "Bagi dengan -2" atau "×(-)" / "÷(-)"
  startRotateFrame?: number; // frame saat simbol mulai berputar
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Komponen AlertRuleCard V4.2
 * Kartu peringatan berbingkai merah (#f43f5e) di atas latar #3b1120 berkontras tinggi.
 * Simbol '<' SVG murni berukuran besar berputar mulus 0deg -> 180deg menjadi '>'
 * sinkron dengan kemunculan label ×(-) atau ÷(-), lengkap dengan caption "Arah tanda berbalik!".
 */
export const AlertRuleCard: React.FC<AlertRuleCardProps> = React.memo(({
  title = 'ATURAN MUTLAK PERTIDAKSAMAAN',
  message = 'Jika mengali atau membagi kedua ruas dengan BILANGAN NEGATIF, arah tanda pertidaksamaan WAJIB DIBALIK!',
  operationLabel = '×(-) atau ÷(-)',
  startRotateFrame = 30,
  className = '',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring untuk seluruh kartu
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  // Animasi rotasi simbol 0 -> 180 derajat
  const rotateSpring = spring({
    frame: Math.max(0, frame - startRotateFrame),
    fps,
    config: { damping: 16, stiffness: 65 },
  });

  const rotation = interpolate(rotateSpring, [0, 1], [0, 180]);
  const badgeOpacity = interpolate(rotateSpring, [0, 0.35, 1], [0, 0.85, 1]);
  const captionOpacity = interpolate(rotateSpring, [0.45, 0.9, 1], [0, 0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulseScale = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1],
    [0.97, 1.03]
  );

  const symbolColor = rotateSpring > 0.5 ? '#ffffff' : '#fbbf24';

  return (
    <div
      className={`rounded-xl border-2 p-3.5 shadow-2xl ${className}`}
      style={{
        borderColor: '#f43f5e',
        backgroundColor: '#3b1120',
        boxShadow: '0 10px 30px rgba(244, 63, 94, 0.28)',
        opacity: Math.max(0.2, cardSpring),
        transform: `translateY(${(1 - cardSpring) * 12}px)`,
        ...style,
      }}
    >
      {/* Header Kartu Alert */}
      <div className="flex items-center justify-between pb-2 border-b border-rose-500/40 gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[11px] font-black text-white shadow-md shrink-0">
            !
          </span>
          <span
            className="text-[11px] font-black tracking-wider uppercase"
            style={{ color: '#fecdd3' }}
          >
            {title}
          </span>
        </div>
        <div
          className="rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide shrink-0"
          style={{
            backgroundColor: '#f43f5e',
            color: '#ffffff',
            opacity: badgeOpacity,
          }}
        >
          {operationLabel}
        </div>
      </div>

      {/* Bagian Animasi Visual Rotasi Simbol '<' -> '>' 180° */}
      <div className="mt-2.5 flex items-center gap-3.5">
        <div className="flex flex-col items-center gap-1 shrink-0">
          {/* Kotak Simbol Berotasi Murni */}
          <div
            className="flex h-16 w-16 items-center justify-center rounded-xl border-2"
            style={{
              backgroundColor: '#1e0911',
              borderColor: '#f43f5e',
              transform: `scale(${pulseScale})`,
              boxShadow: 'inset 0 0 14px rgba(244, 63, 94, 0.3)',
            }}
          >
            <div
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
              }}
            >
              <svg width={36} height={36} viewBox="0 0 36 36" aria-hidden="true">
                <path
                  d="M 25 7 L 9 18 L 25 29"
                  fill="none"
                  stroke={symbolColor}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <span
            className="text-[9.5px] font-bold text-center whitespace-nowrap"
            style={{ color: '#fecdd3', opacity: captionOpacity }}
          >
            Arah tanda berbalik!
          </span>
        </div>

        {/* Penjelasan Kritis Berkualitas Kontras Tinggi */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="text-[11px] font-bold text-white leading-snug">
            Operasi ×(&minus;) atau ÷(&minus;) membalik ketidaksamaan
          </div>
          <p className="text-[10.5px] leading-relaxed" style={{ color: '#fecdd3' }}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
});

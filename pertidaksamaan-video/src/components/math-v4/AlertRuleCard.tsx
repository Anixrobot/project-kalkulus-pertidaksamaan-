import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { MathFormula } from './MathFormula';

export interface AlertRuleCardProps {
  title?: string;
  message?: string;
  operationLabel?: string; // e.g. "Bagi dengan -2" atau "×(-)" / "÷(-)"
  startRotateFrame?: number; // frame saat simbol mulai berputar
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Komponen AlertRuleCard V4.0
 * Kartu peringatan berbingkai merah (#f43f5e) dengan animasi rotasi simbol < menjadi >
 * yang sinkron dengan munculnya label operasi bilangan negatif.
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

  // Animasi rotasi simbol 180 derajat
  const rotateSpring = spring({
    frame: frame - startRotateFrame,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const rotation = interpolate(rotateSpring, [0, 1], [0, 180]);
  const badgeOpacity = interpolate(rotateSpring, [0, 0.4, 1], [0, 0.8, 1]);
  const pulseScale = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1],
    [0.98, 1.02]
  );

  return (
    <div
      className={`rounded-xl border-2 border-rose-500 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md ${className}`}
      style={{
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        boxShadow: '0 10px 30px rgba(244, 63, 94, 0.25)',
        opacity: cardSpring,
        transform: `translateY(${(1 - cardSpring) * 16}px)`,
        ...style,
      }}
    >
      {/* Header Kartu Alert */}
      <div className="flex items-center justify-between pb-2 border-b border-rose-500/30">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-xs font-black text-white shadow-md">
            !
          </span>
          <span
            className="text-xs font-black tracking-wider uppercase"
            style={{ color: '#f43f5e' }}
          >
            {title}
          </span>
        </div>
        <div
          className="rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide"
          style={{
            backgroundColor: 'rgba(244, 63, 94, 0.2)',
            color: '#fca5a5',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            opacity: badgeOpacity,
          }}
        >
          {operationLabel}
        </div>
      </div>

      {/* Bagian Animasi Rotasi Simbol & Penjelasan */}
      <div className="mt-3 flex items-center gap-4">
        {/* Kotak Simbol Berotasi */}
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-rose-500/50"
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            transform: `scale(${pulseScale})`,
            boxShadow: 'inset 0 0 12px rgba(244, 63, 94, 0.2)',
          }}
        >
          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MathFormula
              math="\lt"
              fontSize={28}
              color={rotateSpring > 0.5 ? '#f43f5e' : '#fbbf24'}
            />
          </div>
        </div>

        {/* Transformasi Visual Tanda */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <span className="font-mono text-amber-400">&lt;</span>
            <span className="text-xs text-slate-400">berputar 180° menjadi</span>
            <span className="font-mono text-rose-400">&gt;</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
});

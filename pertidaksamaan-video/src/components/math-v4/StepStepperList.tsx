import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { MathFormula } from './MathFormula';

export interface StepItem {
  latex: string;
  note?: string;
  isAlert?: boolean;
}

export interface StepStepperListProps {
  steps: StepItem[];
  activeStepIndex: number;
  accentColor?: string;
  className?: string;
}

/**
 * Komponen StepStepperList V4.1
 * Menampilkan alur langkah aljabar ber-step secara bertahap (Active Step Window).
 * - Format kartu: 1 baris rumus penuh di atas (white-space: nowrap) + caption penjelasan di bawah.
 * - Sliding window otomatis: Jika langkah > 3, jendela menggeser ke atas sehingga maksimal 3 kartu tampil bersamaan.
 * - Langkah aktif disorot terang (opacity: 1), langkah sebelumnya meredup (opacity: 0.55).
 */
export const StepStepperList: React.FC<StepStepperListProps> = React.memo(({
  steps,
  activeStepIndex,
  accentColor = '#38bdf8',
  className = '',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sliding window offset presisi: maksimal 3 kartu dalam viewport (54*3 + 6*2 = 174px pas di dalam container 218px)
  const CARD_HEIGHT = 54; // Tinggi pasti per kartu langkah aljabar
  const CARD_GAP = 6;     // Gap antar kartu
  const STEP_UNIT = CARD_HEIGHT + CARD_GAP; // 60px per langkah
  const targetScrollIndex = Math.max(0, activeStepIndex - 2);
  const translateY = -(targetScrollIndex * STEP_UNIT);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900/90 p-2 shadow-md ${className}`}
      style={{ height: 218, boxSizing: 'border-box' }}
    >
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex justify-between items-center border-b border-slate-800 pb-1">
        <span>Alur Pengerjaan Aljabar</span>
        <span className="font-mono text-sky-400 text-[10px]">
          Langkah {Math.min(activeStepIndex + 1, steps.length)} dari {steps.length}
        </span>
      </div>

      {/* Viewport kartu khusus di bawah header agar kartu ter-scroll tidak menimpa judul */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: CARD_HEIGHT * 3 + CARD_GAP * 2 }}
      >
        <div
          className="relative flex flex-col"
          style={{
            gap: CARD_GAP,
            transform: `translateY(${translateY}px)`,
          }}
        >
        {steps.map((st, i) => {
          const isRevealed = i <= activeStepIndex;
          const isActive = i === activeStepIndex;
          const isPast = i < activeStepIndex;

          if (!isRevealed) {
            return (
              <div
                key={i}
                style={{ height: CARD_HEIGHT, opacity: 0 }}
                className="invisible"
              />
            );
          }

          const cardSpring = spring({
            frame: frame - i * 15,
            fps,
            config: { damping: 14, stiffness: 100 },
          });

          const isLongFormula = st.latex.length > 52;
          const formulaFontSize = st.isAlert
            ? isLongFormula
              ? 10.5
              : 11.5
            : isLongFormula
            ? 10
            : 11;

          return (
            <div
              key={i}
              className={`rounded-lg px-2 py-1 flex flex-col justify-between ${
                st.isAlert
                  ? 'border-2 border-rose-500'
                  : isActive
                  ? 'border-2 bg-slate-800/90'
                  : 'border border-slate-700/50 bg-slate-900/70'
              }`}
              style={{
                height: CARD_HEIGHT,
                boxSizing: 'border-box',
                backgroundColor: st.isAlert ? '#3b1120' : undefined,
                borderColor: st.isAlert
                  ? '#f43f5e'
                  : isActive
                  ? accentColor
                  : 'rgba(51, 65, 85, 0.6)',
                opacity: isPast ? 0.55 : 1,
                transform: `scale(${cardSpring})`,
                boxShadow: st.isAlert && isActive
                  ? '0 0 12px rgba(244, 63, 94, 0.32)'
                  : isActive
                  ? `0 0 12px ${accentColor}25`
                  : undefined,
              }}
            >
              {/* Baris Rumus Penuh di Atas (white-space: nowrap) */}
              <div className="flex items-center justify-between overflow-hidden">
                <div style={{ whiteSpace: 'nowrap' }}>
                  <MathFormula
                    math={st.latex}
                    fontSize={formulaFontSize}
                    color={st.isAlert ? '#ffffff' : '#f8fafc'}
                  />
                </div>
                {st.isAlert && (
                  <span
                    className="rounded px-1.5 py-0.5 text-[8.5px] font-bold shrink-0 ml-1.5"
                    style={{
                      backgroundColor: '#f43f5e',
                      color: '#ffffff',
                      border: '1px solid #fda4af',
                    }}
                  >
                    KRITIS!
                  </span>
                )}
              </div>

              {/* Caption Penjelasan Singkat di Bawah */}
              {st.note && (
                <div
                  className="text-[9px] truncate"
                  style={{
                    color: st.isAlert ? '#fecdd3' : '#94a3b8',
                  }}
                >
                  {st.note}
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
});

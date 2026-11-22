import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { TeacherCharacter } from '../TeacherCharacter';

export interface SmartboardShellProps {
  title: string;
  subtitle?: string;
  badge?: string; // e.g. "PtLSV • SATU VARIABEL" atau "PtLDV • DUA VARIABEL"
  stepBadge?: string; // e.g. "Langkah 1 / 2"
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  footerNote?: string;
  presenter?: 'rafie' | 'ikhsan' | 'pras' | 'dimas';
  isSpeaking?: boolean;
  className?: string;
}

/**
 * Komponen SmartboardShell V4.0
 * Wadah papan tulis Dark Mode Slate 2-kolom (Kiri: Aljabar KaTeX & Alert; Kanan: Kanvas SVG Presisi)
 * Terintegrasi penuh dengan ruang kelas Nature Green V3.0 & Karakter Rafie beralmamater biru menapak lantai.
 * Menggunakan kanvas logis 960x540 di-scale 2x tepat menjadi 1920x1080 Full HD.
 */
export const SmartboardShell: React.FC<SmartboardShellProps> = React.memo(({
  title,
  subtitle,
  badge = 'MATERI PtLSV & PtLDV',
  stepBadge,
  leftColumn,
  rightColumn,
  footerNote = 'Materi Pertidaksamaan Linear • Pemateri: Rafie Armansyah',
  presenter = 'rafie',
  isSpeaking = true,
  className = '',
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#020617', overflow: 'hidden' }}>
      {/* Kanvas Logis 960x540 di-scale 2X menjadi 1920x1080 Full HD */}
      <div
        className={`relative flex flex-col justify-between select-none ${className}`}
        style={{
          width: 960,
          height: 540,
          transform: 'scale(2)',
          transformOrigin: 'top left',
          backgroundColor: '#84b582',
          fontFamily: 'Inter, system-ui, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* 1. Langit-langit Kelas & 3 Lampu Panel */}
        <div
          style={{
            height: 32,
            backgroundColor: '#d8caa8',
            borderBottom: '4px solid #8c6239',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 48px',
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 140,
                height: 10,
                backgroundColor: '#fef9c3',
                border: '1.5px solid #78716c',
                borderRadius: 2,
                boxShadow: '0 0 14px rgba(254,249,195,0.85)',
              }}
            />
          ))}
        </div>

        {/* 2. Dinding Ruang Kelas Nature Green */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            background: 'linear-gradient(180deg, #7cb07a 0%, #689f66 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '6px 20px',
            overflow: 'hidden',
          }}
        >
          {/* Jendela Kiri & Cahaya Pagi */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 8,
              bottom: 24,
              width: 44,
              backgroundColor: '#fef3c7',
              borderRight: '4px solid #8c6239',
              borderTop: '4px solid #8c6239',
              borderBottom: '4px solid #8c6239',
              zIndex: 5,
            }}
          >
            <div style={{ width: '100%', height: '50%', borderBottom: '4px solid #8c6239' }} />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 180,
              pointerEvents: 'none',
              opacity: 0.22,
              background: 'linear-gradient(115deg, rgba(254,249,195,0.85) 0%, transparent 70%)',
              zIndex: 6,
            }}
          />

          {/* Tanaman Hias Sudut Kiri */}
          <div
            style={{
              position: 'absolute',
              left: 8,
              bottom: 4,
              zIndex: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: 40,
                height: 50,
                borderRadius: 999,
                backgroundColor: '#047857',
                border: '2px solid #064e3b',
                marginBottom: -10,
              }}
            />
            <div
              style={{
                width: 32,
                height: 30,
                backgroundColor: '#b45309',
                border: '2px solid #78350f',
                borderRadius: '0 0 8px 8px',
              }}
            />
          </div>

          {/* Pintu Kayu Kanan */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 10,
              bottom: 0,
              width: 44,
              backgroundColor: '#9a5b25',
              borderLeft: '4px solid #5c3412',
              borderTop: '4px solid #5c3412',
              zIndex: 5,
            }}
          />

          {/* ============================================================== */}
          {/* SMARTBOARD MATEMATIKA V4.0 (DARK MODE SLATE 2-KOLOM)           */}
          {/* ============================================================== */}
          <div
            style={{
              position: 'relative',
              height: '98%',
              width: '78%',
              marginLeft: 16,
              borderRadius: 14,
              backgroundColor: '#0f172a',
              border: '8px solid #334155',
              boxShadow: '0 20px 45px rgba(0,0,0,0.6), inset 0 0 20px rgba(15,23,42,0.8)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 10,
            }}
          >
            {/* Header Smartboard */}
            <div
              style={{
                backgroundColor: '#1e293b',
                borderBottom: '2px solid #334155',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {badge && (
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#38bdf8',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      padding: '2px 8px',
                      borderRadius: 999,
                    }}
                  >
                    {badge}
                  </span>
                )}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', lineHeight: 1.2 }}>
                    {title}
                  </div>
                  {subtitle && (
                    <div style={{ fontSize: 9.5, color: '#94a3b8', marginTop: 1 }}>
                      {subtitle}
                    </div>
                  )}
                </div>
              </div>

              {stepBadge && (
                <div
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: '#fbbf24',
                    backgroundColor: 'rgba(251, 191, 36, 0.15)',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    padding: '2px 10px',
                    borderRadius: 6,
                  }}
                >
                  {stepBadge}
                </div>
              )}
            </div>

            {/* Konten 2-Kolom Smartboard */}
            <div
              style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '1.02fr 1fr',
                gap: 10,
                padding: '8px 12px',
                overflow: 'hidden',
                alignItems: 'stretch',
              }}
            >
              {/* Kolom Kiri: Aljabar KaTeX & Alert Cards */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  overflow: 'hidden',
                  justifyContent: 'flex-start',
                  width: '100%',
                }}
              >
                {leftColumn}
              </div>

              {/* Kolom Kanan: Kanvas Grafik SVG Presisi */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  width: '100%',
                }}
              >
                {rightColumn}
              </div>
            </div>

            {/* Footer Smartboard Keren */}
            <div
              style={{
                height: 18,
                backgroundColor: '#111827',
                borderTop: '1px solid #1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 14px',
                fontSize: 8.5,
                color: '#64748b',
                flexShrink: 0,
              }}
            >
              <span>{footerNote}</span>
              <span style={{ color: '#38bdf8' }}>Remotion Engine V4.0 • 30 FPS Presisi</span>
            </div>
          </div>

          {/* Karakter Pemateri Rafie Berdiri di Kanan Menapak Lantai */}
          <div
            style={{
              position: 'absolute',
              right: 14,
              bottom: 0,
              height: '95%',
              width: 175,
              zIndex: 20,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            <TeacherCharacter
              type={presenter}
              isSpeaking={isSpeaking}
              isActive={true}
              frame={frame}
            />
          </div>
        </div>

        {/* 3. Lantai Kelas Nature Green */}
        <div
          style={{
            height: 44,
            backgroundColor: '#8ba68f',
            borderTop: '6px solid #7c4d2b',
            position: 'relative',
            boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.22)',
            display: 'flex',
            justifyContent: 'space-around',
            overflow: 'hidden',
            flexShrink: 0,
            zIndex: 15,
          }}
        >
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              style={{ width: 1, height: '100%', backgroundColor: 'rgba(30, 70, 49, 0.22)' }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              left: 70,
              top: 4,
              width: 130,
              height: 24,
              backgroundColor: 'rgba(254, 240, 138, 0.32)',
              transform: 'skewX(-35deg)',
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
});

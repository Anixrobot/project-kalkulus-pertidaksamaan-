import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneItem } from '../data/scenesData';
import { ChalkboardVisualizer } from './ChalkboardVisualizer';
import { TeacherCharacter } from './TeacherCharacter';
import { Scene01_Intro } from './Scene01_Intro';

export const ClassroomStage: React.FC<{ scene: SceneItem }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Khusus Scene 01 Intro: Tampilkan langsung komponen visual animasi 3 sub-sekuens
  if (scene.id === 'scene-01' || scene.compId === 'Scene01-Intro') {
    return <Scene01_Intro />;
  }

  // ── Auto-Switch & Timing Langkah Berbasis useCurrentFrame ──
  const totalSteps = scene.steps.length || 1;
  const framesPerStep = Math.max(1, Math.floor(durationInFrames / totalSteps));
  const activeStepIndex = Math.min(totalSteps - 1, Math.floor(frame / framesPerStep));
  const frameInStep = frame - activeStepIndex * framesPerStep;
  const stepProgress = frameInStep / framesPerStep;

  return (
    <AbsoluteFill style={{ backgroundColor: '#020617', overflow: 'hidden' }}>
      {/* KANVAS LOGIS 960x540 DI-SCALE 2X PERSIS MENJADI 1920x1080 FULL HD */}
      <div
        style={{
          width: 960,
          height: 540,
          transform: 'scale(2)',
          transformOrigin: 'top left',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#7cb07a',
          fontFamily: 'Inter, system-ui, sans-serif',
          overflow: 'hidden'
        }}
      >
        {/* 1. LANGIT-LANGIT KELAS & 3 LAMPU PANEL */}
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
            flexShrink: 0
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
                boxShadow: '0 0 14px rgba(254,249,195,0.85)'
              }}
            />
          ))}
        </div>

        {/* 2. AREA DINDING NATURE GREEN & PAPAN TULIS BESAR (DIPERLUAS PENUH) */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            background: 'linear-gradient(180deg, #7cb07a 0%, #689f66 100%)',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 20px',
            overflow: 'hidden'
          }}
        >
          {/* Jendela Kiri & Sinar Matahari Pagi */}
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
              zIndex: 5
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
              zIndex: 6
            }}
          />

          {/* Tanaman Monstera Pot Terakota di Sudut Kiri Bawah */}
          <div
            style={{
              position: 'absolute',
              left: 10,
              bottom: 4,
              zIndex: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            <div
              style={{
                width: 42,
                height: 52,
                borderRadius: 999,
                backgroundColor: '#047857',
                border: '2px solid #064e3b',
                marginBottom: -10
              }}
            />
            <div
              style={{
                width: 34,
                height: 32,
                backgroundColor: '#b45309',
                border: '2px solid #78350f',
                borderRadius: '0 0 8px 8px'
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
              zIndex: 5
            }}
          />

          {/* PAPAN TULIS KAYU COKELAT TUA (LEBIH TINGGI & PROPORSIONAL KARENA BAR VO DIHAPUS) */}
          <div
            style={{
              position: 'relative',
              height: '98%',
              width: scene.presenter === 'all' ? '88%' : '75%',
              marginLeft: 24,
              borderRadius: 14,
              backgroundColor: '#1e4631',
              border: '9px solid #7c4d2b',
              boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 10
            }}
          >
            <ChalkboardVisualizer
              scene={scene}
              activeStepIndex={activeStepIndex}
              stepProgress={stepProgress}
              frameInStep={frameInStep}
              framesPerStep={framesPerStep}
            />

            {/* Tatakan Kapur di Bawah Papan Tulis */}
            <div
              style={{
                height: 10,
                backgroundColor: '#5c371c',
                borderTop: '1px solid #9a653c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 28,
                flexShrink: 0
              }}
            >
              <div style={{ width: 32, height: 4, backgroundColor: '#ffffff', borderRadius: 999 }} />
              <div style={{ width: 24, height: 5, backgroundColor: '#fde68a', borderRadius: 2 }} />
              <div style={{ width: 38, height: 6, backgroundColor: '#1e293b', borderRadius: 2 }} />
            </div>
          </div>

          {/* KARAKTER PEMATERI MENAPAK DI LANTAI & BERADA 100% DI DALAM LAYAR (TIDAK TERPOTONG) */}
          {scene.presenter === 'all' ? (
            <div
              style={{
                position: 'absolute',
                left: 20,
                right: 20,
                top: 24,
                bottom: 0,
                zIndex: 20,
                backgroundColor: 'rgba(2, 6, 23, 0.55)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                padding: '0 20px 4px 20px'
              }}
            >
              {(['ikhsan', 'rafie', 'pras', 'dimas'] as const).map((charId) => (
                <div
                  key={charId}
                  style={{
                    height: '90%',
                    width: 165,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}
                >
                  <TeacherCharacter type={charId} isSpeaking={true} isActive={true} frame={frame} />
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                position: 'absolute',
                right: 24, // Diberi jarak 24px agar karakter tidak terpotong tepi layar
                bottom: 0,
                height: '95%',
                width: 175,
                zIndex: 20,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                overflow: 'visible'
              }}
            >
              <TeacherCharacter
                type={scene.presenter}
                isSpeaking={true}
                isActive={true}
                frame={frame}
              />
            </div>
          )}
        </div>

        {/* 3. LANTAI KELAS NATURE GREEN (PROPORSI MENAWAN, TANPA BAR VO) */}
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
            zIndex: 15
          }}
        >
          {/* Garis Ubin Lantai Perspektif */}
          {[...Array(14)].map((_, i) => (
            <div key={i} style={{ width: 1, height: '100%', backgroundColor: 'rgba(30, 70, 49, 0.22)' }} />
          ))}
          {/* Pantulan Sinar Matahari di Lantai */}
          <div
            style={{
              position: 'absolute',
              left: 70,
              top: 4,
              width: 130,
              height: 24,
              backgroundColor: 'rgba(254, 240, 138, 0.32)',
              transform: 'skewX(-35deg)',
              borderRadius: 4
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

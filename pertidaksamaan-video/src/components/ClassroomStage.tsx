import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneItem, CHARACTERS_INFO } from '../data/scenesData';
import { ChalkboardVisualizer } from './ChalkboardVisualizer';
import { TeacherCharacter } from './TeacherCharacter';

export const ClassroomStage: React.FC<{ scene: SceneItem }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const sceneProgress = Math.min(0.999, frame / Math.max(1, durationInFrames));
  const activeStepIndex = Math.min(
    scene.steps.length - 1,
    Math.floor(sceneProgress * scene.steps.length)
  );
  const stepSpan = 1 / scene.steps.length;
  const stepProgress = (sceneProgress - activeStepIndex * stepSpan) / stepSpan;

  return (
    <AbsoluteFill style={{ backgroundColor: '#020617', overflow: 'hidden' }}>
      {/* KANVAS LOGIS 960x540 DI-SCALE TEPAT 2X MENJADI 1920x1080 FULL HD */}
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
          backgroundColor: '#84b582',
          fontFamily: 'Inter, system-ui, sans-serif',
          overflow: 'hidden'
        }}
      >
        {/* 1. LANGIT-LANGIT KELAS & 3 LAMPU PANEL */}
        <div
          style={{
            height: 36,
            backgroundColor: '#d5c7a3',
            borderBottom: '4px solid #8c6239',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 48px',
            zIndex: 10
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 140,
                height: 12,
                backgroundColor: '#fef9c3',
                border: '2px solid #78716c',
                borderRadius: 2,
                boxShadow: '0 0 15px rgba(254,249,195,0.85)'
              }}
            />
          ))}
        </div>

        {/* 2. DINDING RUANG KELAS HIJAU ALAM (NATURE GREEN) */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            background: 'linear-gradient(180deg, #7cb07a 0%, #6ea36c 100%)',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 24px',
            overflow: 'hidden'
          }}
        >
          {/* Jendela Kiri & Cahaya Matahari Pagi */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 10,
              bottom: 36,
              width: 48,
              backgroundColor: '#fef3c7',
              borderRight: '4px solid #8c6239',
              borderTop: '4px solid #8c6239',
              borderBottom: '4px solid #8c6239'
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
              background: 'linear-gradient(115deg, rgba(254,249,195,0.85) 0%, transparent 70%)'
            }}
          />

          {/* Tanaman Hias di Sudut Kiri Bawah */}
          <div
            style={{
              position: 'absolute',
              left: 10,
              bottom: 6,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: 44,
                height: 58,
                borderRadius: 999,
                backgroundColor: '#047857',
                border: '2px solid #0f172a',
                marginBottom: -10
              }}
            />
            <div
              style={{
                width: 36,
                height: 36,
                backgroundColor: '#b45309',
                border: '2px solid #0f172a',
                borderRadius: '0 0 8px 8px'
              }}
            />
          </div>

          {/* Pintu Kayu Kanan */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 14,
              bottom: 0,
              width: 48,
              backgroundColor: '#9a5b25',
              borderLeft: '4px solid #5c3412',
              borderTop: '4px solid #5c3412'
            }}
          />

          {/* PAPAN TULIS KAYU COKELAT TUA (82% LEBAR PANGGUNG) */}
          <div
            style={{
              position: 'relative',
              height: '100%',
              width: scene.presenter === 'all' ? '88%' : '81%',
              marginLeft: 18,
              borderRadius: 12,
              backgroundColor: '#1e4631',
              border: '9px solid #7c4d2b',
              boxShadow: '0 20px 40px rgba(0,0,0,0.45)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <ChalkboardVisualizer
              scene={scene}
              activeStepIndex={activeStepIndex}
              stepProgress={stepProgress}
            />

            <div
              style={{
                height: 9,
                backgroundColor: '#5c371c',
                borderTop: '1px solid #9a653c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 32
              }}
            >
              <div style={{ width: 32, height: 4, backgroundColor: '#ffffff', borderRadius: 999 }} />
              <div style={{ width: 24, height: 5, backgroundColor: '#fde68a', borderRadius: 2 }} />
              <div style={{ width: 40, height: 6, backgroundColor: '#1e293b', borderRadius: 2 }} />
            </div>
          </div>

          {/* KARAKTER PEMATERI MENAPAK DI LANTAI (TIDAK MENGAMBANG) */}
          {scene.presenter === 'all' ? (
            <div
              style={{
                position: 'absolute',
                left: 16,
                right: 16,
                top: 24,
                bottom: 0,
                zIndex: 20,
                backgroundColor: 'rgba(2, 6, 23, 0.55)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                padding: '0 24px 4px 24px'
              }}
            >
              {(['ikhsan', 'rafie', 'pras', 'dimas'] as const).map((charId) => (
                <div
                  key={charId}
                  style={{
                    height: '90%',
                    width: 170,
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
                right: 10,
                bottom: 0,
                height: '88%',
                width: 175,
                zIndex: 20,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center'
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

        {/* 3. LANTAI KELAS & SUBTITLE VOICE OVER BAR */}
        <div
          style={{
            position: 'relative',
            zIndex: 30,
            backgroundColor: 'rgba(2, 6, 23, 0.96)',
            borderTop: '3px solid #7c4d2b',
            padding: '8px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 900,
                textTransform: 'uppercase',
                backgroundColor: '#10b981',
                color: '#020617',
                flexShrink: 0
              }}
            >
              VO • {scene.presenter === 'all' ? 'TIM KELOMPOK' : CHARACTERS_INFO[scene.presenter]?.name}
            </span>
            <p
              style={{
                fontSize: 12.5,
                color: '#d1fae5',
                fontWeight: 600,
                margin: 0,
                lineHeight: 1.35
              }}
            >
              “{scene.voScript}”
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            {scene.steps.map((_, idx) => (
              <span
                key={idx}
                style={{
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontSize: 10.5,
                  fontWeight: 800,
                  backgroundColor: idx === activeStepIndex ? '#fbbf24' : '#1e293b',
                  color: idx === activeStepIndex ? '#020617' : '#cbd5e1'
                }}
              >
                Step {idx + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

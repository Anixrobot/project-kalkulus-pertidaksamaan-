import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { SceneItem, CHARACTERS_INFO } from '../data/scenesData';
import { ChalkboardVisualizer } from './ChalkboardVisualizer';
import { TeacherCharacter } from './TeacherCharacter';
import { Scene01_Intro } from './Scene01_Intro';
import {
  LinearScene1_IntroAturanMutlak,
  LinearScene2_KonsepPtLSV,
  LinearScene4_KonsepPtLDV,
  Scene05A_Soal1_PtLSV,
  Scene05B_Soal2_PtLSV,
  Scene05C_Soal3_PtLDV,
  Scene05D_Soal4_PtLDV,
  Scene05E_Soal5_SistemPtLDV,
} from '../scenes/linear';

export const ClassroomStage: React.FC<{ scene: SceneItem }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Khusus Scene 01 Intro: Tampilkan langsung komponen visual animasi 3 sub-sekuens
  if (scene.id === 'scene-01' || scene.compId === 'Scene01-Intro') {
    return <Scene01_Intro />;
  }

  // ── INTEGRASI V4.1: PERBARUI SCENE PERTIDAKSAMAAN LINEAR (RAFIE) BER-STEP ──
  // Scene 02: Hukum Fundamental & Aturan Balik Tanda (3 Fase)
  if (scene.id === 'scene-02' || scene.compId === 'Scene02-HukumFundamental') {
    return <LinearScene1_IntroAturanMutlak />;
  }
  // Scene 03: Konsep PtLSV & Garis Bilangan 1D (2 Fase)
  if (scene.id === 'scene-03' || scene.compId === 'Scene03-KonsepPtLSV' || scene.compId === 'Scene03-KonsepPLSV') {
    return <LinearScene2_KonsepPtLSV />;
  }
  // Scene 04: Konsep PtLDV, Garis Pembatas & Uji Titik (0,0) (2 Fase)
  if (scene.id === 'scene-04' || scene.compId === 'Scene04-KonsepPtLDV' || scene.compId === 'Scene04-KonsepPLDV') {
    return <LinearScene4_KonsepPtLDV />;
  }
  // Scene 05A: Soal 1 PtLSV (Jebakan Balik Tanda)
  if (
    scene.id === 'scene-05a' ||
    scene.compId === 'Scene05A-Soal1-PtLSV' ||
    scene.compId === 'Scene05A-SoalPtLSV' ||
    scene.compId === 'Scene05A-SoalPLSV'
  ) {
    return <Scene05A_Soal1_PtLSV />;
  }
  // Scene 05B: Soal 2 PtLSV (Pecahan & Distribusi Negatif)
  if (scene.id === 'scene-05b' || scene.compId === 'Scene05B-Soal2-PtLSV') {
    return <Scene05B_Soal2_PtLSV />;
  }
  // Scene 05C: Soal 3 PtLDV (Garis Utuh Solid)
  if (
    scene.id === 'scene-05c' ||
    scene.compId === 'Scene05C-Soal3-PtLDV' ||
    scene.compId === 'Scene05B-SoalPtLDV' ||
    scene.compId === 'Scene05B-SoalPLDV'
  ) {
    return <Scene05C_Soal3_PtLDV />;
  }
  // Scene 05D: Soal 4 PtLDV (Garis Putus-putus Dashed)
  if (scene.id === 'scene-05d' || scene.compId === 'Scene05D-Soal4-PtLDV') {
    return <Scene05D_Soal4_PtLDV />;
  }
  // Scene 05E: Soal 5 Sistem PtLDV (Kuadran I via layerPolygons)
  if (scene.id === 'scene-05e' || scene.compId === 'Scene05E-Soal5-SistemPtLDV') {
    return <Scene05E_Soal5_SistemPtLDV />;
  }

  // ── Auto-Switch & Timing Langkah Berbasis useCurrentFrame ──
  const totalSteps = scene.steps.length || 1;
  const framesPerStep = Math.max(1, Math.floor(durationInFrames / totalSteps));
  const activeStepIndex = Math.min(totalSteps - 1, Math.floor(frame / framesPerStep));
  const frameInStep = frame - activeStepIndex * framesPerStep;
  const stepProgress = frameInStep / framesPerStep;

  const isPresenterIntro = scene.visualType === 'presenter-intro';
  const presenterInfo =
    scene.presenter !== 'all' ? CHARACTERS_INFO[scene.presenter] : CHARACTERS_INFO.rafie;

  // Animasi Kamera Zoom-In Khusus Scene Intro Pemateri (Tanpa Papan Tulis, Fokus ke Pemateri di Tengah)
  const introSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60 }
  });
  const cameraZoom = isPresenterIntro
    ? interpolate(frame, [0, durationInFrames], [1.08, 1.38], {
        extrapolateRight: 'clamp'
      })
    : 1;

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
          backgroundColor: '#84b582',
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

        {/* 2. AREA DINDING RUANG KELAS HIJAU ALAM (NATURE GREEN) */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            background: isPresenterIntro
              ? 'radial-gradient(circle at 50% 45%, #8ec38c 0%, #6ea36c 65%, #568754 100%)'
              : 'linear-gradient(180deg, #7cb07a 0%, #689f66 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isPresenterIntro ? 'center' : 'flex-start',
            padding: '8px 20px',
            overflow: 'hidden'
          }}
        >
          {/* Jendela Kiri & Cahaya Matahari Pagi */}
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

          {/* Tanaman Hias di Sudut Kiri Bawah */}
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

          {/* ============================================================== */}
          {/* CABANG TAMPILAN 1: SCENE INTRO PEMATERI (TANPA PAPAN TULIS!)   */}
          {/* Pemateri Berdiri Sendirian di Tengah + Kamera Zoom-In Halus    */}
          {/* ============================================================== */}
          {isPresenterIntro ? (
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                zIndex: 20
              }}
            >
              {/* Lingkaran Spotlight Lembut di Belakang Pemateri */}
              <div
                style={{
                  position: 'absolute',
                  top: '8%',
                  width: 320,
                  height: 320,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(254,249,195,0.45) 0%, rgba(16,185,129,0.15) 55%, transparent 75%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Banner Atas Topik Materi Pemateri (Bukan Papan Tulis) */}
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  opacity: introSpring,
                  transform: `translateY(${(1 - introSpring) * -14}px)`,
                  zIndex: 25
                }}
              >
                <span
                  style={{
                    padding: '4px 16px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(2, 6, 23, 0.92)',
                    border: '2px solid #fbbf24',
                    color: '#fde68a',
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.4)'
                  }}
                >
                  🎬 SCENE INTRO PEMATERI • {presenterInfo.topicBadge}
                </span>
              </div>

              {/* Kontainer Karakter di Tengah dengan Efek Kamera Zoom-In */}
              <div
                style={{
                  height: '88%',
                  width: 250,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  transform: `scale(${cameraZoom})`,
                  transformOrigin: 'center 62%',
                  filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.4))'
                }}
              >
                <TeacherCharacter
                  type={scene.presenter === 'all' ? 'rafie' : scene.presenter}
                  isSpeaking={true}
                  isActive={true}
                  frame={frame}
                />
              </div>

              {/* Lower-Third Nameplate Keren di Depan Pemateri */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 12,
                  backgroundColor: 'rgba(2, 6, 23, 0.94)',
                  border: '2px solid rgba(52, 211, 153, 0.8)',
                  borderRadius: 14,
                  padding: '8px 24px',
                  textAlign: 'center',
                  boxShadow: '0 14px 30px rgba(0,0,0,0.55)',
                  zIndex: 30,
                  minWidth: 420
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: '0.04em'
                  }}
                >
                  {presenterInfo.fullName.toUpperCase()}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: '#6ee7b7',
                    marginTop: 2
                  }}
                >
                  {presenterInfo.role}
                </div>
              </div>
            </div>
          ) : (
            /* ============================================================== */
            /* CABANG TAMPILAN 2: SCENE MATERI NORMAL (DENGAN PAPAN TULIS)    */
            /* ============================================================== */
            <>
              {/* PAPAN TULIS KAYU COKELAT TUA (LEBIH TINGGI & PROPORSIONAL) */}
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

              {/* KARAKTER PEMATERI MENAPAK DI LANTAI & BERADA 100% DI DALAM LAYAR */}
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
                    right: 24,
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
            </>
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

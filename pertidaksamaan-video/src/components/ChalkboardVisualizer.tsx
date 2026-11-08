import React from 'react';
import { SceneItem, CHARACTERS_INFO } from '../data/scenesData';

export const ChalkboardVisualizer: React.FC<{
  scene: SceneItem;
  activeStepIndex: number;
  stepProgress: number;
}> = ({ scene, activeStepIndex, stepProgress }) => {
  const currentStep = scene.steps[activeStepIndex] || scene.steps[0];
  const isTransitioning = stepProgress < 0.15;

  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '14px 20px',
        color: '#f1f5f9',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Efek Kapur Halus */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.12,
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 55%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 50%)'
        }}
      />

      {/* HEADER PAPAN TULIS */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          borderBottom: '1px solid rgba(167, 243, 208, 0.25)',
          paddingBottom: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                padding: '2px 8px',
                fontSize: 10,
                fontWeight: 800,
                textTransform: 'uppercase',
                borderRadius: 4,
                backgroundColor: 'rgba(251, 191, 36, 0.2)',
                color: '#fcd34d',
                border: '1px solid rgba(252, 211, 77, 0.4)'
              }}
            >
              {scene.code} • {scene.partName}
            </span>
            <span
              style={{
                padding: '2px 8px',
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 4,
                backgroundColor: 'rgba(2, 44, 34, 0.85)',
                color: '#6ee7b7',
                border: '1px solid rgba(16, 185, 129, 0.35)'
              }}
            >
              Langkah {activeStepIndex + 1} / {scene.steps.length}
            </span>
          </div>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: '0.02em',
              color: '#ffffff',
              margin: '4px 0 2px 0'
            }}
          >
            {scene.boardTitle}
          </h2>
          <p style={{ fontSize: 11, color: 'rgba(167, 243, 208, 0.85)', margin: 0 }}>
            {scene.boardSubtitle}
          </p>
        </div>

        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 800,
              backgroundColor: isTransitioning ? 'rgba(251, 191, 36, 0.25)' : 'rgba(2, 44, 34, 0.9)',
              color: isTransitioning ? '#fde68a' : '#a7f3d0',
              border: isTransitioning
                ? '1px solid rgba(252, 211, 77, 0.5)'
                : '1px solid rgba(52, 211, 153, 0.4)'
            }}
          >
            {isTransitioning ? '✨ ANIMASI TRANSISI RUMUS' : '🔒 HOLD FRAME (STATIC VO SYNC)'}
          </span>
        </div>
      </div>

      {/* ISI TENGAH PAPAN TULIS: 2 KOLOM (KIRI RUMUS & LANGKAH, KANAN DIAGRAM) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '5fr 5fr',
          gap: 14,
          margin: '10px 0',
          alignItems: 'center'
        }}
      >
        {/* KOLOM KIRI: KOTAK RUMUS KAPUR + 3 DAFTAR LANGKAH */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              backgroundColor: 'rgba(2, 44, 34, 0.68)',
              border: '2px solid rgba(110, 231, 183, 0.3)',
              opacity: Math.min(1, stepProgress * 8 + 0.25),
              transform: `translateY(${Math.max(0, (1 - stepProgress * 6) * 8)}px)`
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 6
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#fcd34d'
                }}
              >
                {currentStep.label}
              </span>
              <span
                style={{
                  padding: '2px 6px',
                  fontSize: 9,
                  fontWeight: 700,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  color: '#d1fae5'
                }}
              >
                {currentStep.badge}
              </span>
            </div>

            <div
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                backgroundColor: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.18)',
                fontFamily: 'Fira Code, Consolas, monospace',
                fontSize: 13.5,
                fontWeight: 800,
                color: '#fde68a',
                lineHeight: 1.45
              }}
            >
              {currentStep.eq}
            </div>

            <p
              style={{
                marginTop: 8,
                marginBottom: 0,
                fontSize: 11.5,
                color: '#ecfdf5',
                lineHeight: 1.45
              }}
            >
              {currentStep.desc}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {scene.steps.map((st, idx) => {
              const isCurrent = idx === activeStepIndex;
              const isDone = idx < activeStepIndex;
              return (
                <div
                  key={idx}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 8,
                    fontSize: 11,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: isCurrent
                      ? 'rgba(251, 191, 36, 0.22)'
                      : isDone
                      ? 'rgba(6, 78, 59, 0.45)'
                      : 'rgba(0,0,0,0.22)',
                    border: isCurrent
                      ? '1px solid rgba(252, 211, 77, 0.65)'
                      : isDone
                      ? '1px solid rgba(16, 185, 129, 0.35)'
                      : '1px solid rgba(255,255,255,0.1)',
                    color: isCurrent ? '#ffffff' : isDone ? '#a7f3d0' : 'rgba(203,213,225,0.65)',
                    fontWeight: isCurrent ? 800 : 500
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 999,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 9,
                        fontWeight: 900,
                        backgroundColor: isCurrent
                          ? '#fbbf24'
                          : isDone
                          ? '#10b981'
                          : 'rgba(255,255,255,0.12)',
                        color: isCurrent || isDone ? '#020617' : '#ffffff'
                      }}
                    >
                      {isDone ? '✓' : idx + 1}
                    </span>
                    <span>{st.label}</span>
                  </div>
                  <span style={{ fontSize: 9.5, opacity: 0.8 }}>{st.badge}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* KOLOM KANAN: GARIS BILANGAN / KARTESIUS / TABEL UJI TANDA */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {scene.visualType === 'number-line' && scene.numberLineConfig && (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(2, 6, 23, 0.72)',
                border: '1px solid rgba(52, 211, 153, 0.35)'
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#6ee7b7',
                  marginBottom: 6,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>VISUALISASI GARIS BILANGAN & UJI TANDA</span>
                <span style={{ fontSize: 10, color: '#fcd34d' }}>○ Terbuka | ● Tertutup</span>
              </div>
              <svg viewBox="0 0 420 120" style={{ width: '100%', height: 112, overflow: 'visible' }}>
                {scene.numberLineConfig.shades.map((sh, i) => {
                  const mapX = (val: number) => 210 + val * 28;
                  const x1 = Math.max(25, Math.min(395, mapX(sh.from)));
                  const x2 = Math.max(25, Math.min(395, mapX(sh.to)));
                  const width = Math.max(10, x2 - x1);
                  return (
                    <g key={i}>
                      <rect
                        x={x1}
                        y="32"
                        width={width}
                        height="34"
                        rx="4"
                        fill="rgba(16, 185, 129, 0.28)"
                        stroke="#34d399"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <text
                        x={x1 + width / 2}
                        y="24"
                        textAnchor="middle"
                        fill="#6ee7b7"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {sh.label}
                      </text>
                    </g>
                  );
                })}

                <line x1="20" y1="66" x2="400" y2="66" stroke="#f8fafc" strokeWidth="3" />
                <polygon points="15,66 26,60 26,72" fill="#f8fafc" />
                <polygon points="405,66 394,60 394,72" fill="#f8fafc" />

                {scene.numberLineConfig.signs.map((sg, idx) => {
                  const cx = 210 + sg.x * 28;
                  const isPos = sg.sign === '+';
                  return (
                    <g key={idx} transform={`translate(${cx}, 46)`}>
                      <circle
                        cx="0"
                        cy="0"
                        r="11"
                        fill={isPos ? 'rgba(16,185,129,0.25)' : 'rgba(244,63,94,0.25)'}
                        stroke={isPos ? '#34d399' : '#fb7185'}
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill={isPos ? '#6ee7b7' : '#fda4af'}
                        fontSize="13"
                        fontWeight="900"
                      >
                        {sg.sign}
                      </text>
                    </g>
                  );
                })}

                {scene.numberLineConfig.points.map((pt, idx) => {
                  const cx = 210 + pt.val * 28;
                  return (
                    <g key={idx} transform={`translate(${cx}, 66)`}>
                      <circle
                        cx="0"
                        cy="0"
                        r="7"
                        fill={pt.filled ? '#fbbf24' : '#064e3b'}
                        stroke="#fbbf24"
                        strokeWidth="3"
                      />
                      <text
                        x="0"
                        y="25"
                        textAnchor="middle"
                        fill="#fde68a"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        {pt.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 10.5,
                  textAlign: 'center',
                  color: '#a7f3d0',
                  fontWeight: 700,
                  backgroundColor: 'rgba(2, 44, 34, 0.85)',
                  padding: '4px 8px',
                  borderRadius: 6,
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                {scene.numberLineConfig.caption}
              </div>
            </div>
          )}

          {scene.visualType === 'cartesian-pldv' && scene.cartesianConfig && (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(2, 6, 23, 0.72)',
                border: '1px solid rgba(52, 211, 153, 0.35)'
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#6ee7b7',
                  marginBottom: 6,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>BIDANG KARTESIUS 2D (DAERAH HIMPUNAN PENYELESAIAN)</span>
                <span style={{ color: '#fcd34d', fontSize: 10 }}>{scene.cartesianConfig.equation}</span>
              </div>
              <svg
                viewBox="0 0 360 175"
                style={{
                  width: '100%',
                  height: 140,
                  backgroundColor: 'rgba(15, 23, 42, 0.92)',
                  borderRadius: 8,
                  border: '1px solid #334155'
                }}
              >
                <g stroke="#1e293b" strokeWidth="1">
                  <line x1="0" y1="35" x2="360" y2="35" />
                  <line x1="0" y1="70" x2="360" y2="70" />
                  <line x1="0" y1="105" x2="360" y2="105" />
                  <line x1="0" y1="140" x2="360" y2="140" />
                  <line x1="70" y1="0" x2="70" y2="175" />
                  <line x1="140" y1="0" x2="140" y2="175" />
                  <line x1="210" y1="0" x2="210" y2="175" />
                  <line x1="280" y1="0" x2="280" y2="175" />
                </g>
                <line x1="20" y1="105" x2="340" y2="105" stroke="#94a3b8" strokeWidth="2" />
                <line x1="140" y1="12" x2="140" y2="165" stroke="#94a3b8" strokeWidth="2" />
                <text x="332" y="98" fill="#cbd5e1" fontSize="10" fontWeight="bold">X</text>
                <text x="146" y="22" fill="#cbd5e1" fontSize="10" fontWeight="bold">Y</text>

                {scene.cartesianConfig.mode === 'case1' ? (
                  <>
                    <polygon points="90,35 280,122 90,155" fill="rgba(56, 189, 248, 0.25)" />
                    <line x1="90" y1="35" x2="280" y2="122" stroke="#38bdf8" strokeWidth="3.5" />
                    <circle cx="140" cy="58" r="4.5" fill="#fbbf24" />
                    <text x="148" y="56" fill="#fde68a" fontSize="10" fontWeight="bold">(0,2)</text>
                    <circle cx="245" cy="105" r="4.5" fill="#fbbf24" />
                    <text x="235" y="122" fill="#fde68a" fontSize="10" fontWeight="bold">(5,0)</text>
                    <circle cx="140" cy="105" r="5" fill="#10b981" />
                    <text x="82" y="120" fill="#6ee7b7" fontSize="10" fontWeight="bold">Uji (0,0) ✅ DHP</text>
                  </>
                ) : (
                  <>
                    <polygon points="140,152 245,45 330,45 330,152" fill="rgba(244, 63, 94, 0.25)" />
                    <line x1="140" y1="152" x2="245" y2="45" stroke="#fb7185" strokeWidth="3.5" strokeDasharray="7 5" />
                    <circle cx="140" cy="152" r="4.5" fill="#fbbf24" />
                    <text x="102" y="156" fill="#fde68a" fontSize="10" fontWeight="bold">(0,−4)</text>
                    <circle cx="205" cy="105" r="4.5" fill="#fbbf24" />
                    <text x="195" y="96" fill="#fde68a" fontSize="10" fontWeight="bold">(3,0)</text>
                    <circle cx="140" cy="105" r="4.5" fill="#f43f5e" />
                    <text x="75" y="96" fill="#fda4af" fontSize="10" fontWeight="bold">Uji (0,0) ❌</text>
                    <text x="245" y="132" fill="#fda4af" fontSize="11" fontWeight="bold">DHP (Arsir)</text>
                  </>
                )}
              </svg>
              <div style={{ marginTop: 6, fontSize: 10.5, textAlign: 'center', color: '#fde68a', fontWeight: 700 }}>
                {scene.cartesianConfig.testText}
              </div>
            </div>
          )}

          {scene.visualType === 'sign-table' && (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(2, 6, 23, 0.72)',
                border: '1px solid rgba(52, 211, 153, 0.35)'
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#6ee7b7',
                  marginBottom: 8,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>TABEL UJI TANDA PECAHAN RASIONAL f(x)/g(x)</span>
                <span style={{ fontSize: 10, color: '#fda4af', fontWeight: 900 }}>Syarat Mutlak: g(x) ≠ 0</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(6, 78, 59, 0.85)', color: '#d1fae5', textAlign: 'left' }}>
                    <th style={{ padding: 7 }}>Pembilang f(x)</th>
                    <th style={{ padding: 7 }}>Penyebut g(x)</th>
                    <th style={{ padding: 7 }}>Hasil f(x)/g(x)</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'rgba(0,0,0,0.35)', fontWeight: 700 }}>
                  <tr>
                    <td style={{ padding: 6, color: '#6ee7b7' }}>Positif (+)</td>
                    <td style={{ padding: 6, color: '#6ee7b7' }}>Positif (+)</td>
                    <td style={{ padding: 6, color: '#34d399', fontWeight: 900 }}>Positif (+)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 6, color: '#fda4af' }}>Negatif (−)</td>
                    <td style={{ padding: 6, color: '#fda4af' }}>Negatif (−)</td>
                    <td style={{ padding: 6, color: '#34d399', fontWeight: 900 }}>Positif (+)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 6, color: '#6ee7b7' }}>Positif (+)</td>
                    <td style={{ padding: 6, color: '#fda4af' }}>Negatif (−)</td>
                    <td style={{ padding: 6, color: '#fb7185', fontWeight: 900 }}>Negatif (−)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 6, color: '#fda4af' }}>Negatif (−)</td>
                    <td style={{ padding: 6, color: '#6ee7b7' }}>Positif (+)</td>
                    <td style={{ padding: 6, color: '#fb7185', fontWeight: 900 }}>Negatif (−)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {scene.visualType === 'mutlak-table' && (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(2, 6, 23, 0.72)',
                border: '1px solid rgba(52, 211, 153, 0.35)'
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#fcd34d',
                  marginBottom: 8,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>TABEL RUMUS ACUAN CEPAT NILAI MUTLAK (Syarat: a ≥ 0)</span>
                <span style={{ fontSize: 10, color: '#6ee7b7' }}>Prinsip Jarak ≥ 0</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(6, 78, 59, 0.85)', color: '#ffffff', textAlign: 'left' }}>
                    <th style={{ padding: 6 }}>Bentuk Soal</th>
                    <th style={{ padding: 6 }}>Sifat Aljabar</th>
                    <th style={{ padding: 6 }}>Visualisasi Grafik</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'rgba(0,0,0,0.35)', fontWeight: 600 }}>
                  <tr>
                    <td style={{ padding: 6, color: '#fcd34d', fontFamily: 'monospace' }}>|f(x)| &lt; a</td>
                    <td style={{ padding: 6, color: '#a7f3d0', fontFamily: 'monospace' }}>−a &lt; f(x) &lt; a</td>
                    <td style={{ padding: 6, color: '#e2e8f0' }}>Mengumpul di tengah (Terbuka)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 6, color: '#fcd34d', fontFamily: 'monospace' }}>|f(x)| ≤ a</td>
                    <td style={{ padding: 6, color: '#a7f3d0', fontFamily: 'monospace' }}>−a ≤ f(x) ≤ a</td>
                    <td style={{ padding: 6, color: '#e2e8f0' }}>Mengumpul di tengah (Tertutup)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 6, color: '#fcd34d', fontFamily: 'monospace' }}>|f(x)| &gt; a</td>
                    <td style={{ padding: 6, color: '#a7f3d0', fontFamily: 'monospace' }}>f(x) &lt; −a ∪ f(x) &gt; a</td>
                    <td style={{ padding: 6, color: '#e2e8f0' }}>Memencar kiri & kanan (Terbuka)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 6, color: '#fcd34d', fontFamily: 'monospace' }}>|f(x)| ≥ a</td>
                    <td style={{ padding: 6, color: '#a7f3d0', fontFamily: 'monospace' }}>f(x) ≤ −a ∪ f(x) ≥ a</td>
                    <td style={{ padding: 6, color: '#e2e8f0' }}>Memencar kiri & kanan (Tertutup)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {(scene.visualType === 'intro-school' ||
            scene.visualType === 'concept-box' ||
            scene.visualType === 'summary-master') && (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(2, 6, 23, 0.72)',
                border: '1px solid rgba(52, 211, 153, 0.35)'
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 900, color: '#fcd34d', marginBottom: 8 }}>
                MATRIKS 4 CABANG UTAMA PERTIDAKSAMAAN (60 MENIT)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11 }}>
                <div style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(2,44,34,0.75)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <div style={{ fontWeight: 900, color: '#93c5fd' }}>1. Linear (Rafie)</div>
                  <div style={{ fontSize: 10.5, color: '#e2e8f0', marginTop: 2 }}>
                    PLSV Garis Bilangan & PLDV Uji Titik (0,0). Kali/bagi negatif balik tanda!
                  </div>
                </div>
                <div style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(2,44,34,0.75)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <div style={{ fontWeight: 900, color: '#6ee7b7' }}>2. Rasional (Ikhsan)</div>
                  <div style={{ fontSize: 10.5, color: '#e2e8f0', marginTop: 2 }}>
                    Pecahan f(x)/g(x) dengan syarat mutlak penyebut g(x) ≠ 0 & dilarang kali silang.
                  </div>
                </div>
                <div style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(2,44,34,0.75)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <div style={{ fontWeight: 900, color: '#fcd34d' }}>3. Irasional (Pras)</div>
                  <div style={{ fontSize: 10.5, color: '#e2e8f0', marginTop: 2 }}>
                    Bentuk akar √f(x) wajib memenuhi Syarat Numerus f(x) ≥ 0 & irisan (∩) solusi.
                  </div>
                </div>
                <div style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(2,44,34,0.75)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <div style={{ fontWeight: 900, color: '#f9a8d4' }}>4. Nilai Mutlak (Dimas)</div>
                  <div style={{ fontSize: 10.5, color: '#e2e8f0', marginTop: 2 }}>
                    Konsep jarak |x| ≥ 0: tanda &lt; mengumpul di tengah, tanda &gt; memencar kiri-kanan.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER PAPAN TULIS */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: 6,
          borderTop: '1px solid rgba(167, 243, 208, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 10.5,
          color: 'rgba(167, 243, 208, 0.9)'
        }}
      >
        <span>
          Rentang Waktu Segmen: <strong>Menit {scene.startMin.toFixed(1)} – {scene.endMin.toFixed(1)}</strong>
        </span>
        <span style={{ fontFamily: 'monospace' }}>
          Pemateri Aktif:{' '}
          <strong style={{ color: '#fcd34d', textTransform: 'uppercase' }}>
            {scene.presenter === 'all'
              ? 'SELURUH TIM (4 PEMATERI)'
              : CHARACTERS_INFO[scene.presenter]?.fullName}
          </strong>
        </span>
      </div>
    </div>
  );
};

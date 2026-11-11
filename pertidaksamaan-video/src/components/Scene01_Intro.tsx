import React, { memo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { SchoolExterior } from "./SchoolExterior";
import { ClassroomAudience } from "./ClassroomAudience";
import { TeacherCharacter } from "./TeacherCharacter";
import { MathText } from "./MathText";

export const Scene01_Intro: React.FC = memo(() => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Pembagian durasi menjadi 3 segmen proporsional:
  // Sub-Sequence A: 30% awal (Eksterior Gedung Sekolah)
  // Sub-Sequence B: 30% tengah (Suasana Ruang Kelas & Murid)
  // Sub-Sequence C: 40% akhir (Perkenalan 4 Pemateri & 4 Cabang Materi)
  const seg1Duration = Math.floor(durationInFrames * 0.3);
  const seg2Duration = Math.floor(durationInFrames * 0.3);
  const seg3Duration = durationInFrames - seg1Duration - seg2Duration;

  // Animasi Masuk Segmen 3
  const introFrame = Math.max(0, frame - (seg1Duration + seg2Duration));
  const boardEntrance = spring({
    frame: introFrame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const boardScale = interpolate(boardEntrance, [0, 1], [0.93, 1], {
    extrapolateRight: "clamp",
  });
  const boardOpacity = interpolate(boardEntrance, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        overflow: "hidden",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* =========================================================
          SUB-SEQUENCE A: EKSTERIOR GEDUNG SEKOLAH & KAMERA ZOOM-IN
      ========================================================= */}
      <Sequence from={0} durationInFrames={seg1Duration}>
        <SchoolExterior durationInFrames={seg1Duration} />
      </Sequence>

      {/* =========================================================
          SUB-SEQUENCE B: SUASANA RUANG KELAS & DERETAN MURID
      ========================================================= */}
      <Sequence from={seg1Duration} durationInFrames={seg2Duration}>
        <ClassroomAudience durationInFrames={seg2Duration} />
      </Sequence>

      {/* =========================================================
          SUB-SEQUENCE C: PERKENALAN 4 PEMATERI & 4 CABANG MATERI
      ========================================================= */}
      <Sequence
        from={seg1Duration + seg2Duration}
        durationInFrames={seg3Duration}
      >
        <AbsoluteFill
          style={{
            backgroundColor: "#5b7d5f",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          {/* Latar Dinding Hijau Sage Kelas Nature Green */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #4d6d51 0%, #5b7d5f 50%, #456349 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Lampu Langit-langit Kelas Atas */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              height: 32,
              backgroundColor: "#d8caa8",
              borderBottom: "4px solid #8c6239",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "0 64px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 190,
                  height: 10,
                  backgroundColor: "#fef9c3",
                  border: "1px solid #78716c",
                  borderRadius: 2,
                  boxShadow: "0 0 12px rgba(254,249,195,0.8)",
                }}
              />
            ))}
          </div>

          {/* Sinar Matahari Masuk dari Sudut Kiri */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 380,
              height: "100%",
              pointerEvents: "none",
              opacity: 0.2,
              background: "linear-gradient(120deg, rgba(254,249,195,0.7) 0%, transparent 65%)",
            }}
          />

          {/* ── BAGIAN ATAS: PAPAN TULIS BESAR BERISI 4 CABANG MATERI ── */}
          <div
            style={{
              position: "relative",
              zIndex: 20,
              padding: "12px 48px 0 48px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              maxHeight: 530,
            }}
          >
            <div
              style={{
                transform: `scale(${boardScale})`,
                opacity: boardOpacity,
                width: "100%",
                height: "100%",
                backgroundColor: "#133526",
                border: "10px solid #7c4d2b",
                borderRadius: 16,
                boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
                padding: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Efek Tekstur Halus Debu Kapur */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  opacity: 0.1,
                  backgroundImage:
                    "radial-gradient(circle at 25% 30%, rgba(255,255,255,0.4), transparent 50%), radial-gradient(circle at 75% 70%, rgba(255,255,255,0.3), transparent 50%)",
                }}
              />

              {/* Header Papan Tulis */}
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "2px solid rgba(16, 185, 129, 0.4)",
                  paddingBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    style={{
                      backgroundColor: "#fbbf24",
                      color: "#020617",
                      fontWeight: 900,
                      fontSize: 12,
                      padding: "4px 14px",
                      borderRadius: 999,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    MATERI KELOMPOK
                  </span>
                  <h1 style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", letterSpacing: "0.02em", margin: 0 }}>
                    4 Cabang Utama Pertidaksamaan Matematika
                  </h1>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      color: "#6ee7b7",
                      fontFamily: "monospace",
                      fontSize: 12,
                      fontWeight: "bold",
                      backgroundColor: "rgba(2, 44, 34, 0.85)",
                      padding: "4px 12px",
                      borderRadius: 6,
                      border: "1px solid rgba(16, 185, 129, 0.4)",
                    }}
                  >
                    Durasi: ~60 Menit • 20 Contoh Soal
                  </span>
                  <span
                    style={{
                      color: "#fde047",
                      fontFamily: "monospace",
                      fontSize: 12,
                      fontWeight: "bold",
                      backgroundColor: "rgba(69, 26, 3, 0.85)",
                      padding: "4px 12px",
                      borderRadius: 6,
                      border: "1px solid rgba(245, 158, 11, 0.4)",
                    }}
                  >
                    Universitas Nusa Mandiri
                  </span>
                </div>
              </div>

              {/* Grid 4 Cabang Materi dengan KaTeX Math */}
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 16,
                  margin: "8px 0",
                  flex: 1,
                }}
              >
                {/* 1. RAFIE - Linear */}
                <div
                  style={{
                    backgroundColor: "rgba(13, 42, 27, 0.9)",
                    border: "2px solid rgba(52, 211, 153, 0.5)",
                    borderRadius: 12,
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: "#fde047", fontFamily: "monospace", fontWeight: "bold", fontSize: 12, textTransform: "uppercase" }}>
                        Bagian 1 • Rafie
                      </span>
                      <span style={{ fontSize: 10, backgroundColor: "#065f46", color: "#a7f3d0", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace" }}>
                        PLSV & PLDV
                      </span>
                    </div>
                    <h3 style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold", margin: "4px 0" }}>
                      Pertidaksamaan Linear
                    </h3>
                    <div
                      style={{
                        color: "#fde047",
                        fontFamily: "monospace",
                        textAlign: "center",
                        margin: "4px 0",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        padding: "6px 4px",
                        borderRadius: 4,
                        border: "1px solid rgba(52, 211, 153, 0.3)",
                        fontSize: 14,
                      }}
                    >
                      <MathText math="ax + b < c \;\lor\; ax + by \le c" />
                    </div>
                    <p style={{ color: "#ecfdf5", fontSize: 12, lineHeight: 1.45, margin: "4px 0 0 0" }}>
                      Pangkat satu, aturan balik tanda saat dikali/dibagi negatif, garis bilangan 1D, & bidang Kartesius 2D.
                    </p>
                  </div>
                  <div style={{ fontSize: 10.5, color: "rgba(167, 243, 208, 0.8)", fontFamily: "monospace", paddingTop: 4, borderTop: "1px solid rgba(16, 185, 129, 0.25)" }}>
                    Contoh: 3x - 5 &gt; 7 • 2x + 3y &le; 12
                  </div>
                </div>

                {/* 2. IKHSAN - Rasional */}
                <div
                  style={{
                    backgroundColor: "rgba(13, 42, 27, 0.9)",
                    border: "2px solid rgba(52, 211, 153, 0.5)",
                    borderRadius: 12,
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: "#fde047", fontFamily: "monospace", fontWeight: "bold", fontSize: 12, textTransform: "uppercase" }}>
                        Bagian 2 • Ikhsan
                      </span>
                      <span style={{ fontSize: 10, backgroundColor: "#065f46", color: "#a7f3d0", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace" }}>
                        Pecahan
                      </span>
                    </div>
                    <h3 style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold", margin: "4px 0" }}>
                      Pertidaksamaan Rasional
                    </h3>
                    <div
                      style={{
                        color: "#fde047",
                        fontFamily: "monospace",
                        textAlign: "center",
                        margin: "4px 0",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        padding: "6px 4px",
                        borderRadius: 4,
                        border: "1px solid rgba(52, 211, 153, 0.3)",
                        fontSize: 14,
                      }}
                    >
                      <MathText math="\frac{f(x)}{g(x)} \le 0,\; g(x) \neq 0" />
                    </div>
                    <p style={{ color: "#ecfdf5", fontSize: 12, lineHeight: 1.45, margin: "4px 0 0 0" }}>
                      Syarat mutlak penyebut g(x) ≠ 0, dilarang kali silang variabel, pembuat nol & tabel tanda.
                    </p>
                  </div>
                  <div style={{ fontSize: 10.5, color: "rgba(167, 243, 208, 0.8)", fontFamily: "monospace", paddingTop: 4, borderTop: "1px solid rgba(16, 185, 129, 0.25)" }}>
                    5 Soal: Linear s/d Kuadrat Pecahan
                  </div>
                </div>

                {/* 3. PRAS - Irasional */}
                <div
                  style={{
                    backgroundColor: "rgba(13, 42, 27, 0.9)",
                    border: "2px solid rgba(52, 211, 153, 0.5)",
                    borderRadius: 12,
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: "#fde047", fontFamily: "monospace", fontWeight: "bold", fontSize: 12, textTransform: "uppercase" }}>
                        Bagian 3 • Pras
                      </span>
                      <span style={{ fontSize: 10, backgroundColor: "#065f46", color: "#a7f3d0", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace" }}>
                        Bentuk Akar
                      </span>
                    </div>
                    <h3 style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold", margin: "4px 0" }}>
                      Pertidaksamaan Irasional
                    </h3>
                    <div
                      style={{
                        color: "#fde047",
                        fontFamily: "monospace",
                        textAlign: "center",
                        margin: "4px 0",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        padding: "6px 4px",
                        borderRadius: 4,
                        border: "1px solid rgba(52, 211, 153, 0.3)",
                        fontSize: 14,
                      }}
                    >
                      <MathText math="\sqrt{f(x)} < g(x),\; f(x) \ge 0" />
                    </div>
                    <p style={{ color: "#ecfdf5", fontSize: 12, lineHeight: 1.45, margin: "4px 0 0 0" }}>
                      Syarat numerus akar wajib non-negatif, kuadratkan kedua ruas, dan himpunan irisan (∩).
                    </p>
                  </div>
                  <div style={{ fontSize: 10.5, color: "rgba(167, 243, 208, 0.8)", fontFamily: "monospace", paddingTop: 4, borderTop: "1px solid rgba(16, 185, 129, 0.25)" }}>
                    5 Soal: Akar Linear s/d Dua Sisi
                  </div>
                </div>

                {/* 4. DIMAS - Nilai Mutlak */}
                <div
                  style={{
                    backgroundColor: "rgba(13, 42, 27, 0.9)",
                    border: "2px solid rgba(52, 211, 153, 0.5)",
                    borderRadius: 12,
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: "#fde047", fontFamily: "monospace", fontWeight: "bold", fontSize: 12, textTransform: "uppercase" }}>
                        Bagian 4 • Dimas
                      </span>
                      <span style={{ fontSize: 10, backgroundColor: "#065f46", color: "#a7f3d0", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace" }}>
                        |x| Mutlak
                      </span>
                    </div>
                    <h3 style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold", margin: "4px 0" }}>
                      Pertidaksamaan Mutlak
                    </h3>
                    <div
                      style={{
                        color: "#fde047",
                        fontFamily: "monospace",
                        textAlign: "center",
                        margin: "4px 0",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        padding: "6px 4px",
                        borderRadius: 4,
                        border: "1px solid rgba(52, 211, 153, 0.3)",
                        fontSize: 14,
                      }}
                    >
                      <MathText math="|x| < a \iff -a < x < a" />
                    </div>
                    <p style={{ color: "#ecfdf5", fontSize: 12, lineHeight: 1.45, margin: "4px 0 0 0" }}>
                      Konsep jarak dari nol, sifat rentang tanda &lt; (apit) vs &gt; (atau), & metode kuadrat ruas.
                    </p>
                  </div>
                  <div style={{ fontSize: 10.5, color: "rgba(167, 243, 208, 0.8)", fontFamily: "monospace", paddingTop: 4, borderTop: "1px solid rgba(16, 185, 129, 0.25)" }}>
                    5 Soal Bertahap + Kesimpulan Master
                  </div>
                </div>
              </div>

              {/* Tatakan Kapur di Bawah Papan Tulis */}
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  height: 8,
                  backgroundColor: "#5c371c",
                  borderTop: "1px solid #9a653c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 24,
                  marginTop: 4,
                }}
              >
                <div style={{ width: 32, height: 4, backgroundColor: "#ffffff", borderRadius: 999 }} />
                <div style={{ width: 24, height: 5, backgroundColor: "#fde68a", borderRadius: 2 }} />
                <div style={{ width: 38, height: 6, backgroundColor: "#1e293b", borderRadius: 2 }} />
              </div>
            </div>
          </div>

          {/* ── BAGIAN BAWAH: 4 KARAKTER PEMATERI MENAPAK DI LANTAI KELAS ── */}
          {/* Posisi rapi di depan kelas tanpa menutupi materi papan tulis */}
          <div
            style={{
              position: "relative",
              zIndex: 30,
              width: "100%",
              height: 470,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {/* Lantai Ruang Kelas Nature Green dengan Garis Ubin & Bayangan */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                bottom: 0,
                height: 96,
                backgroundColor: "#7e9982",
                borderTop: "6px solid #7a4927",
                boxShadow: "inset 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              {/* Garis Ubin Lantai Perspektif */}
              <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "space-around", opacity: 0.3 }}>
                {[...Array(16)].map((_, i) => (
                  <div key={i} style={{ width: 1, height: "100%", backgroundColor: "#1e4631" }} />
                ))}
              </div>
              {/* Pantulan Cahaya Matahari di Lantai */}
              <div
                style={{
                  position: "absolute",
                  left: 130,
                  top: 8,
                  width: 290,
                  height: 64,
                  backgroundColor: "rgba(254, 240, 138, 0.25)",
                  borderRadius: 4,
                  transform: "skewX(-35deg)",
                }}
              />
            </div>

            {/* Barisan 4 Pemateri Berdiri Berjajar Proporsional */}
            <div
              style={{
                position: "relative",
                zIndex: 40,
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-around",
                padding: "0 80px 8px 80px",
              }}
            >
              {/* 1. IKHSAN */}
              <div style={{ width: 250, height: 440, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                <div
                  style={{
                    marginBottom: 8,
                    backgroundColor: "rgba(2, 6, 23, 0.95)",
                    border: "2px solid #34d399",
                    padding: "4px 16px",
                    borderRadius: 999,
                    boxShadow: "0 6px 14px rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "#ffffff", fontWeight: 900, fontSize: 13 }}>IKHSAN</span>
                  <span style={{ color: "#6ee7b7", fontSize: 11, fontWeight: 600 }}>• Rasional</span>
                </div>
                <div style={{ width: "100%", height: 390 }}>
                  <TeacherCharacter
                    type="ikhsan"
                    isSpeaking={true}
                    isActive={true}
                    frame={introFrame}
                  />
                </div>
              </div>

              {/* 2. RAFIE */}
              <div style={{ width: 250, height: 440, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                <div
                  style={{
                    marginBottom: 8,
                    backgroundColor: "rgba(2, 6, 23, 0.95)",
                    border: "2px solid #facc15",
                    padding: "4px 16px",
                    borderRadius: 999,
                    boxShadow: "0 6px 14px rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "#ffffff", fontWeight: 900, fontSize: 13 }}>RAFIE</span>
                  <span style={{ color: "#fde047", fontSize: 11, fontWeight: 600 }}>• Linear & Mod</span>
                </div>
                <div style={{ width: "100%", height: 390 }}>
                  <TeacherCharacter
                    type="rafie"
                    isSpeaking={true}
                    isActive={true}
                    frame={introFrame + 10}
                  />
                </div>
              </div>

              {/* 3. PRAS */}
              <div style={{ width: 250, height: 440, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                <div
                  style={{
                    marginBottom: 8,
                    backgroundColor: "rgba(2, 6, 23, 0.95)",
                    border: "2px solid #34d399",
                    padding: "4px 16px",
                    borderRadius: 999,
                    boxShadow: "0 6px 14px rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "#ffffff", fontWeight: 900, fontSize: 13 }}>PRAS</span>
                  <span style={{ color: "#6ee7b7", fontSize: 11, fontWeight: 600 }}>• Irasional</span>
                </div>
                <div style={{ width: "100%", height: 390 }}>
                  <TeacherCharacter
                    type="pras"
                    isSpeaking={true}
                    isActive={true}
                    frame={introFrame + 20}
                  />
                </div>
              </div>

              {/* 4. DIMAS */}
              <div style={{ width: 250, height: 440, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                <div
                  style={{
                    marginBottom: 8,
                    backgroundColor: "rgba(2, 6, 23, 0.95)",
                    border: "2px solid #34d399",
                    padding: "4px 16px",
                    borderRadius: 999,
                    boxShadow: "0 6px 14px rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "#ffffff", fontWeight: 900, fontSize: 13 }}>DIMAS</span>
                  <span style={{ color: "#6ee7b7", fontSize: 11, fontWeight: 600 }}>• Nilai Mutlak</span>
                </div>
                <div style={{ width: "100%", height: 390 }}>
                  <TeacherCharacter
                    type="dimas"
                    isSpeaking={true}
                    isActive={true}
                    frame={introFrame + 30}
                  />
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
});

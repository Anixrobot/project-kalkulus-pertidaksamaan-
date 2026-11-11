import React, { memo } from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

export const ClassroomAudience: React.FC<{ durationInFrames?: number }> = memo(({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames: videoDuration } = useVideoConfig();
  const totalDuration = durationInFrames || videoDuration;

  // Animasi nafas halus murid & gerakan menulis catatan
  const breathe1 = Math.sin((frame / fps) * Math.PI * 1.8) * 1.8;
  const breathe2 = Math.sin(((frame + 15) / fps) * Math.PI * 1.6) * 1.6;
  const breathe3 = Math.sin(((frame + 30) / fps) * Math.PI * 2.0) * 1.5;
  const writingMotion = Math.sin((frame / fps) * Math.PI * 4) * 1.2;

  // Kamera bergerak maju perlahan ke arah papan tulis depan (cinematic dolly-in)
  const cameraZoom = interpolate(frame, [0, Math.max(1, totalDuration - 20)], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });
  const cameraY = interpolate(frame, [0, Math.max(1, totalDuration - 20)], [0, -18], {
    extrapolateRight: "clamp",
  });

  // Fade in halus saat transisi dari gedung sekolah & fade out sebelum perkenalan pemateri
  const audienceOpacity = interpolate(
    frame,
    [0, 20, Math.max(21, totalDuration - 20), totalDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: 1920,
        height: 1080,
        overflow: "hidden",
        userSelect: "none",
        backgroundColor: "#4d6d51",
        fontFamily: "Inter, system-ui, sans-serif",
        opacity: audienceOpacity,
      }}
    >
      {/* ── KONTAINER ZOOM KAMERA CINEMATIC DOLLY ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraZoom}) translateY(${cameraY}px)`,
          transformOrigin: "50% 35%",
          willChange: "transform",
        }}
      >
        {/* =========================================================
            1. DINDING DEPAN KELAS (WALL: y: 0 s/d y: 510)
        ========================================================= */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 510,
            background: "linear-gradient(180deg, #446147 0%, #537557 50%, #5d8161 100%)",
            overflow: "hidden",
          }}
        >
          {/* Lis Kayu Langit-langit Atas & Lampu Panel */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 28,
              backgroundColor: "#d5c7a3",
              borderBottom: "4px solid #8c6239",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "0 80px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              zIndex: 5,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 240,
                  height: 10,
                  backgroundColor: "#fef9c3",
                  border: "1px solid #78716c",
                  borderRadius: 2,
                  boxShadow: "0 0 10px rgba(254,249,195,0.75)",
                }}
              />
            ))}
          </div>

          {/* Jendela Kiri dengan Efek Kaca & Sinar Matahari */}
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 0,
              width: 140,
              height: 380,
              background: "linear-gradient(135deg, #e0f2fe 0%, #fef08a 100%)",
              borderRight: "8px solid #c4d4c0",
              borderTop: "8px solid #c4d4c0",
              borderBottom: "8px solid #c4d4c0",
              opacity: 0.9,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              padding: "8px 0",
            }}
          >
            <div style={{ width: "100%", height: 4, backgroundColor: "#c4d4c0" }} />
            <div style={{ width: "100%", height: 4, backgroundColor: "#c4d4c0" }} />
          </div>

          {/* Sorot Sinar Matahari Menembus Masuk ke Ruang Kelas */}
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 140,
              width: 750,
              height: 600,
              pointerEvents: "none",
              opacity: 0.22,
              background: "linear-gradient(130deg, rgba(254, 240, 138, 0.6) 0%, transparent 65%)",
              transform: "skewX(-32deg)",
            }}
          />

          {/* Jam Dinding di Kiri Atas */}
          <div
            style={{
              position: "absolute",
              top: 45,
              left: 180,
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "4px solid #6d411e",
              boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 2.5, height: 20, backgroundColor: "#0f172a", transformOrigin: "bottom center", borderRadius: 2 }} />
            <div style={{ width: 1.5, height: 24, backgroundColor: "#dc2626", transformOrigin: "bottom center", borderRadius: 2 }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#dc2626", position: "absolute" }} />
          </div>

          {/* ── PAPAN TULIS UTAMA KELAS (DI TENGAH ATAS, BERSIH & TIDAK TERTUTUP APAPUN) ── */}
          <div
            style={{
              position: "absolute",
              top: 48,
              left: "50%",
              transform: "translateX(-50%)",
              width: 1040,
              height: 380,
              backgroundColor: "#133526",
              border: "12px solid #6d411e",
              borderRadius: 18,
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "20px 28px",
              boxSizing: "border-box",
            }}
          >
            {/* Tekstur Kapur Halus */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                opacity: 0.1,
                backgroundImage:
                  "radial-gradient(circle at 30% 35%, rgba(255,255,255,0.4), transparent 50%), radial-gradient(circle at 70% 65%, rgba(255,255,255,0.3), transparent 50%)",
              }}
            />

            {/* Header Papan Tulis */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1.5px solid rgba(167, 243, 208, 0.3)", paddingBottom: 8 }}>
              <span
                style={{
                  color: "#fde047",
                  fontFamily: "monospace",
                  fontWeight: 900,
                  fontSize: 13,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  backgroundColor: "rgba(2, 44, 34, 0.85)",
                  padding: "4px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(52, 211, 153, 0.5)",
                }}
              >
                Pertemuan Matematika Kalkulus
              </span>
              <span style={{ color: "#a7f3d0", fontFamily: "monospace", fontSize: 13, fontWeight: "bold" }}>
                Target Durasi 60 Menit
              </span>
            </div>

            {/* Judul Besar Tengah Papan Tulis */}
            <div style={{ textAlign: "center", margin: "10px 0" }}>
              <h2
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: "#ffffff",
                  fontFamily: "monospace",
                  letterSpacing: "0.08em",
                  margin: 0,
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                BAB: PERTIDAKSAMAAN
              </h2>
              <p
                style={{
                  color: "#6ee7b7",
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  margin: "8px 0 0 0",
                }}
              >
                Linear • Rasional • Irasional • Nilai Mutlak
              </p>
            </div>

            {/* Catatan Kapur di Sisi Bawah Papan */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(167, 243, 208, 0.2)", paddingTop: 8 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontFamily: "monospace" }}>
                ax + b &lt; c &nbsp;&nbsp;|&nbsp;&nbsp; f(x)/g(x) &le; 0
              </span>
              <span style={{ fontSize: 12, color: "#fde047", fontFamily: "monospace", fontWeight: "bold" }}>
                Universitas Nusa Mandiri
              </span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontFamily: "monospace" }}>
                &radic;f(x) &lt; g(x) &nbsp;&nbsp;|&nbsp;&nbsp; |x| &le; a
              </span>
            </div>

            {/* Tatakan Kapur & Penghapus di Bawah Frame Papan Tulis */}
            <div
              style={{
                position: "absolute",
                bottom: -11,
                left: "25%",
                right: "25%",
                height: 8,
                backgroundColor: "#522e13",
                borderTop: "1px solid #8b572a",
                borderRadius: "0 0 4px 4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <div style={{ width: 28, height: 4, backgroundColor: "#ffffff", borderRadius: 999 }} />
              <div style={{ width: 22, height: 4.5, backgroundColor: "#fef08a", borderRadius: 2 }} />
              <div style={{ width: 34, height: 5, backgroundColor: "#1e293b", borderRadius: 2 }} />
            </div>
          </div>
        </div>

        {/* =========================================================
            2. LANTAI KELAS DENGAN PERSPEKTIF UBIN (y: 500 s/d 1080)
        ========================================================= */}
        <div
          style={{
            position: "absolute",
            top: 500,
            left: 0,
            width: "100%",
            height: 580,
            backgroundColor: "#728c75",
            borderTop: "10px solid #5c371d",
            overflow: "hidden",
          }}
        >
          {/* Garis-Garis Ubin Perspektif Mengarah ke Titik Hilang */}
          <svg
            viewBox="0 0 1920 580"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.28 }}
          >
            {/* Garis lantai horizontal bertingkat */}
            <line x1="0" y1="90" x2="1920" y2="90" stroke="#1e4631" strokeWidth="1.5" />
            <line x1="0" y1="200" x2="1920" y2="200" stroke="#1e4631" strokeWidth="2" />
            <line x1="0" y1="340" x2="1920" y2="340" stroke="#1e4631" strokeWidth="2.5" />
            <line x1="0" y1="490" x2="1920" y2="490" stroke="#1e4631" strokeWidth="3" />

            {/* Garis lantai perspektif diagonal memancar dari titik tengah dinding */}
            <line x1="960" y1="0" x2="100" y2="580" stroke="#1e4631" strokeWidth="2" />
            <line x1="960" y1="0" x2="380" y2="580" stroke="#1e4631" strokeWidth="2" />
            <line x1="960" y1="0" x2="680" y2="580" stroke="#1e4631" strokeWidth="1.5" />
            <line x1="960" y1="0" x2="1240" y2="580" stroke="#1e4631" strokeWidth="1.5" />
            <line x1="960" y1="0" x2="1540" y2="580" stroke="#1e4631" strokeWidth="2" />
            <line x1="960" y1="0" x2="1820" y2="580" stroke="#1e4631" strokeWidth="2" />
          </svg>

          {/* Pantulan Sinar Matahari di Lantai */}
          <div
            style={{
              position: "absolute",
              left: 180,
              top: 10,
              width: 380,
              height: 220,
              backgroundColor: "rgba(254, 240, 138, 0.2)",
              transform: "skewX(-36deg)",
              borderRadius: 6,
              filter: "blur(4px)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* =========================================================
            3. BARIS BELAKANG (MIDGROUND ROW: y: 490 s/d 730)
            4 Siswa duduk di meja kayu dengan kaki meja menapak di lantai.
            Kepala berada di y ~ 490-520, TIDAK MENUTUPI PAPAN TULIS!
        ========================================================= */}
        <div
          style={{
            position: "absolute",
            top: 490,
            left: 0,
            width: "100%",
            height: 250,
            display: "flex",
            justifyContent: "space-around",
            padding: "0 100px",
            boxSizing: "border-box",
            zIndex: 20,
          }}
        >
          {/* Siswa 1 (Kiri Luar) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 240 }}>
            {/* Sosok Siswa */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `translateY(${breathe1}px)`,
                willChange: "transform",
                marginBottom: -12,
                zIndex: 2,
              }}
            >
              <div style={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#0f172a", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }} />
              <div style={{ width: 88, height: 58, backgroundColor: "#f8fafc", border: "2px solid #cbd5e1", borderRadius: "14px 14px 0 0", boxShadow: "0 4px 6px rgba(0,0,0,0.15)" }} />
            </div>
            {/* Meja Belajar Kayu dengan Kaki Meja Menapak */}
            <div
              style={{
                width: 220,
                height: 48,
                backgroundColor: "#a16207",
                border: "3px solid #78350f",
                borderRadius: "6px 6px 0 0",
                boxShadow: "0 8px 18px rgba(0,0,0,0.3)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0 16px",
                zIndex: 3,
              }}
            >
              <div style={{ width: 44, height: 28, backgroundColor: "#dbeafe", border: "1px solid #93c5fd", borderRadius: 3, marginTop: -10 }} />
              <div style={{ width: 28, height: 8, backgroundColor: "#f87171", borderRadius: 999, marginTop: -6 }} />
              {/* 2 Kaki Meja Menapak ke Lantai */}
              <div style={{ position: "absolute", bottom: -65, left: 18, width: 7, height: 65, backgroundColor: "#334155", borderRadius: 2 }} />
              <div style={{ position: "absolute", bottom: -65, right: 18, width: 7, height: 65, backgroundColor: "#334155", borderRadius: 2 }} />
            </div>
          </div>

          {/* Siswa 2 (Kiri Tengah - Rambut Ponytail Cokelat) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 240 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `translateY(${breathe2}px)`,
                willChange: "transform",
                marginBottom: -12,
                zIndex: 2,
              }}
            >
              <div style={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#451a03", boxShadow: "0 4px 8px rgba(0,0,0,0.3)", position: "relative" }}>
                <div style={{ position: "absolute", bottom: -12, left: "50%", transform: "translateX(-50%)", width: 16, height: 28, backgroundColor: "#451a03", borderRadius: 999 }} />
              </div>
              <div style={{ width: 88, height: 58, backgroundColor: "#f8fafc", border: "2px solid #cbd5e1", borderRadius: "14px 14px 0 0", boxShadow: "0 4px 6px rgba(0,0,0,0.15)" }} />
            </div>
            <div
              style={{
                width: 220,
                height: 48,
                backgroundColor: "#a16207",
                border: "3px solid #78350f",
                borderRadius: "6px 6px 0 0",
                boxShadow: "0 8px 18px rgba(0,0,0,0.3)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0 16px",
                zIndex: 3,
              }}
            >
              <div style={{ width: 50, height: 28, backgroundColor: "#fef08a", border: "1px solid #fde047", borderRadius: 3, marginTop: -10 }} />
              <div style={{ width: 36, height: 10, backgroundColor: "#059669", borderRadius: 3, marginTop: -6 }} />
              <div style={{ position: "absolute", bottom: -65, left: 18, width: 7, height: 65, backgroundColor: "#334155", borderRadius: 2 }} />
              <div style={{ position: "absolute", bottom: -65, right: 18, width: 7, height: 65, backgroundColor: "#334155", borderRadius: 2 }} />
            </div>
          </div>

          {/* Siswa 3 (Kanan Tengah - Seragam Almet Biru Muda) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 240 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `translateY(${breathe3}px)`,
                willChange: "transform",
                marginBottom: -12,
                zIndex: 2,
              }}
            >
              <div style={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#1e293b", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }} />
              <div style={{ width: 88, height: 58, backgroundColor: "#7ec8f8", border: "2px solid #38bdf8", borderRadius: "14px 14px 0 0", boxShadow: "0 4px 6px rgba(0,0,0,0.15)" }} />
            </div>
            <div
              style={{
                width: 220,
                height: 48,
                backgroundColor: "#a16207",
                border: "3px solid #78350f",
                borderRadius: "6px 6px 0 0",
                boxShadow: "0 8px 18px rgba(0,0,0,0.3)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0 16px",
                zIndex: 3,
              }}
            >
              <div style={{ width: 44, height: 28, backgroundColor: "#d1fae5", border: "1px solid #a7f3d0", borderRadius: 3, marginTop: -10 }} />
              <div style={{ position: "absolute", bottom: -65, left: 18, width: 7, height: 65, backgroundColor: "#334155", borderRadius: 2 }} />
              <div style={{ position: "absolute", bottom: -65, right: 18, width: 7, height: 65, backgroundColor: "#334155", borderRadius: 2 }} />
            </div>
          </div>

          {/* Siswa 4 (Kanan Luar) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 240 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `translateY(${breathe1}px)`,
                willChange: "transform",
                marginBottom: -12,
                zIndex: 2,
              }}
            >
              <div style={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#18181b", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }} />
              <div style={{ width: 88, height: 58, backgroundColor: "#f8fafc", border: "2px solid #cbd5e1", borderRadius: "14px 14px 0 0", boxShadow: "0 4px 6px rgba(0,0,0,0.15)" }} />
            </div>
            <div
              style={{
                width: 220,
                height: 48,
                backgroundColor: "#a16207",
                border: "3px solid #78350f",
                borderRadius: "6px 6px 0 0",
                boxShadow: "0 8px 18px rgba(0,0,0,0.3)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0 16px",
                zIndex: 3,
              }}
            >
              <div style={{ width: 44, height: 28, backgroundColor: "#e2e8f0", border: "1px solid #cbd5e1", borderRadius: 3, marginTop: -10 }} />
              <div style={{ position: "absolute", bottom: -65, left: 18, width: 7, height: 65, backgroundColor: "#334155", borderRadius: 2 }} />
              <div style={{ position: "absolute", bottom: -65, right: 18, width: 7, height: 65, backgroundColor: "#334155", borderRadius: 2 }} />
            </div>
          </div>
        </div>

        {/* =========================================================
            4. BARIS DEPAN (FOREGROUND ROW: y: 720 s/d 1080)
            Ukuran lebih besar (Depth-of-field), lorong tengah kelas terbuka.
        ========================================================= */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 360,
            display: "flex",
            justifyContent: "space-between",
            padding: "0 120px",
            boxSizing: "border-box",
            zIndex: 30,
            pointerEvents: "none",
          }}
        >
          {/* Siswa Kiri Depan (Menulis Catatan Rumus) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 500, justifyContent: "flex-end" }}>
            {/* Kepala & Punggung Siswa Lebih Detail */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `translateY(${breathe1 * 1.2}px)`,
                willChange: "transform",
                marginBottom: -32,
                zIndex: 2,
              }}
            >
              <div style={{ width: 96, height: 96, borderRadius: "50%", backgroundColor: "#09090b", boxShadow: "0 6px 14px rgba(0,0,0,0.4)" }} />
              <div
                style={{
                  width: 180,
                  height: 120,
                  backgroundColor: "#f8fafc",
                  border: "3px solid #cbd5e1",
                  borderRadius: "26px 26px 0 0",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 8,
                }}
              >
                <div style={{ width: 44, height: 26, borderBottom: "3px solid #94a3b8" }} />
              </div>
            </div>

            {/* Meja Besar Depan Kiri */}
            <div
              style={{
                width: 480,
                height: 100,
                backgroundColor: "#854d0e",
                border: "5px solid #713f12",
                borderRadius: "12px 12px 0 0",
                boxShadow: "0 15px 35px rgba(0,0,0,0.45)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 40px",
                zIndex: 3,
              }}
            >
              {/* Buku Catatan Terbuka dengan Animasi Menulis */}
              <div
                style={{
                  width: 140,
                  height: 80,
                  backgroundColor: "#ffffff",
                  border: "2px solid #cbd5e1",
                  borderRadius: 6,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  marginTop: -38,
                  display: "flex",
                  padding: 10,
                  gap: 6,
                  transform: `rotate(-2deg) translateY(${writingMotion}px)`,
                  willChange: "transform",
                }}
              >
                <div style={{ width: "50%", height: "100%", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: 5 }}>
                  <div style={{ width: "100%", height: 5, backgroundColor: "#93c5fd", borderRadius: 2 }} />
                  <div style={{ width: "80%", height: 5, backgroundColor: "#cbd5e1", borderRadius: 2 }} />
                  <div style={{ width: "100%", height: 5, backgroundColor: "#cbd5e1", borderRadius: 2 }} />
                  <div style={{ width: "60%", height: 5, backgroundColor: "#cbd5e1", borderRadius: 2 }} />
                </div>
                <div style={{ width: "50%", height: "100%", paddingLeft: 6, display: "flex", flexDirection: "column", gap: 5 }}>
                  <div style={{ width: "100%", height: 5, backgroundColor: "#cbd5e1", borderRadius: 2 }} />
                  <div style={{ width: "70%", height: 5, backgroundColor: "#fca5a5", borderRadius: 2 }} />
                  <div style={{ width: "90%", height: 5, backgroundColor: "#cbd5e1", borderRadius: 2 }} />
                </div>
              </div>

              {/* Kotak Pensil & Penggaris Kuning */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: -24 }}>
                <div style={{ width: 80, height: 24, backgroundColor: "#0284c7", borderRadius: 999, border: "1.5px solid #0369a1", boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }} />
                <div style={{ width: 60, height: 10, backgroundColor: "#facc15", borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
              </div>

              {/* 2 Kaki Meja Baja Kokoh Menapak ke Dasar Lantai */}
              <div style={{ position: "absolute", bottom: -110, left: 32, width: 12, height: 110, backgroundColor: "#1e293b", borderRadius: 3 }} />
              <div style={{ position: "absolute", bottom: -110, right: 32, width: 12, height: 110, backgroundColor: "#1e293b", borderRadius: 3 }} />
            </div>
          </div>

          {/* Siswa Kanan Depan (Menyimak Paparan Materi) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 500, justifyContent: "flex-end" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `translateY(${breathe2 * 1.2}px)`,
                willChange: "transform",
                marginBottom: -32,
                zIndex: 2,
              }}
            >
              <div style={{ width: 96, height: 96, borderRadius: "50%", backgroundColor: "#1f2937", boxShadow: "0 6px 14px rgba(0,0,0,0.4)" }} />
              <div
                style={{
                  width: 180,
                  height: 120,
                  backgroundColor: "#f8fafc",
                  border: "3px solid #cbd5e1",
                  borderRadius: "26px 26px 0 0",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                }}
              />
            </div>

            {/* Meja Besar Depan Kanan */}
            <div
              style={{
                width: 480,
                height: 100,
                backgroundColor: "#854d0e",
                border: "5px solid #713f12",
                borderRadius: "12px 12px 0 0",
                boxShadow: "0 15px 35px rgba(0,0,0,0.45)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0 40px",
                zIndex: 3,
              }}
            >
              {/* Buku Teks Kalkulus Hijau & Smartphone/Notepad */}
              <div style={{ width: 110, height: 70, backgroundColor: "#065f46", border: "2px solid #10b981", borderRadius: 5, marginTop: -30, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.2)" }}>
                <span style={{ color: "#a7f3d0", fontFamily: "monospace", fontSize: 11, fontWeight: "bold" }}>KALKULUS</span>
              </div>
              <div style={{ width: 54, height: 32, backgroundColor: "#334155", borderRadius: 4, marginTop: -20, border: "1px solid #64748b" }} />

              {/* 2 Kaki Meja Baja Kokoh */}
              <div style={{ position: "absolute", bottom: -110, left: 32, width: 12, height: 110, backgroundColor: "#1e293b", borderRadius: 3 }} />
              <div style={{ position: "absolute", bottom: -110, right: 32, width: 12, height: 110, backgroundColor: "#1e293b", borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. OVERLAY BADGE INFORMASI SUASANA KELAS ── */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 48,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "rgba(6, 78, 59, 0.95)",
          border: "1.5px solid #34d399",
          padding: "8px 22px",
          borderRadius: 999,
          boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
        }}
      >
        <span style={{ fontSize: 22 }}>🎒</span>
        <div>
          <p style={{ color: "#fde047", fontFamily: "monospace", fontWeight: "bold", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
            Suasana Kelas Pagi Hari • 30 Mahasiswa Siap Belajar
          </p>
          <p style={{ color: "#ecfdf5", fontSize: 11.5, margin: "2px 0 0 0" }}>
            Fokus menyimak pembahasan 4 cabang utama pertidaksamaan
          </p>
        </div>
      </div>
    </div>
  );
});

import React, { memo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const SchoolExterior: React.FC<{ durationInFrames?: number }> = memo(({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames: videoDuration } = useVideoConfig();
  const totalDuration = durationInFrames || videoDuration;

  // Kamera Zoom-In Halus ke Gedung Sekolah (Sesuai PRD §5 [Scene 01]: scale dari 1 ke 2.5 mengarah ke jendela kelas)
  const zoomScale = interpolate(frame, [0, Math.max(1, totalDuration - 20)], [1.0, 2.5], {
    extrapolateRight: "clamp",
  });
  const cameraY = interpolate(frame, [0, Math.max(1, totalDuration - 20)], [0, -110], {
    extrapolateRight: "clamp",
  });

  // Animasi Awan Mengambang Pagi Hari
  const cloud1X = (frame * 0.4) % 1920;
  const cloud2X = ((frame * 0.25) + 600) % 1920;

  // Animasi Getaran Lonceng Sekolah (Bel Masuk Kelas)
  const bellSwing = Math.sin((frame / fps) * Math.PI * 8) * 12;
  const bellPulse = 1 + Math.sin((frame / fps) * Math.PI * 6) * 0.08;

  // Fade out di akhir scene menuju transisi kelas
  const fadeOut = interpolate(frame, [Math.max(1, totalDuration - 25), totalDuration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: 1920,
        height: 1080,
        overflow: "hidden",
        userSelect: "none",
        backgroundColor: "#7dd3fc",
        fontFamily: "Inter, system-ui, sans-serif",
        opacity: fadeOut,
      }}
    >
      {/* ── 1. Langit Pagi Cerah (Morning Sky Gradient) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #38bdf8 0%, #7dd3fc 45%, #fef08a 100%)",
        }}
      />

      {/* Matahari Pagi Bersinar Lembut */}
      <div
        style={{
          position: "absolute",
          top: 48,
          right: 140,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "radial-gradient(circle, #fffbeb 20%, #fef08a 65%, transparent 100%)",
          boxShadow: "0 0 60px rgba(253, 224, 71, 0.75)",
        }}
      />

      {/* Awan-Awan Pagi Mengambang */}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 0,
          width: 320,
          height: 84,
          borderRadius: 999,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          transform: `translateX(${cloud1X}px)`,
          filter: "blur(1px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          width: 400,
          height: 96,
          borderRadius: 999,
          backgroundColor: "rgba(255, 255, 255, 0.65)",
          transform: `translateX(${cloud2X}px)`,
          filter: "blur(1px)",
          pointerEvents: "none",
        }}
      />

      {/* ── 2. Kontainer Gedung Sekolah dengan Efek Kamera Zoom-In ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          transform: `scale(${zoomScale}) translateY(${cameraY}px)`,
          transformOrigin: "50% 55%",
          willChange: "transform",
        }}
      >
        {/* Pegunungan Hijau & Pepohonan Latar Belakang */}
        <div
          style={{
            width: "100%",
            height: 180,
            marginBottom: -60,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0 40px",
            opacity: 0.65,
            pointerEvents: "none",
          }}
        >
          <div style={{ width: 620, height: 150, borderRadius: "150px 150px 0 0", backgroundColor: "#4ade80" }} />
          <div style={{ width: 850, height: 200, borderRadius: "200px 200px 0 0", backgroundColor: "#22c55e", margin: "0 -110px" }} />
          <div style={{ width: 680, height: 170, borderRadius: "170px 170px 0 0", backgroundColor: "#16a34a" }} />
        </div>

        {/* ── Visual Gedung Sekolah (Modern Campus Facade) ── */}
        <div
          style={{
            position: "relative",
            width: 1380,
            height: 620,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Menara Jam Sekolah di Tengah Atas (Tower Clock) */}
          <div
            style={{
              width: 190,
              height: 140,
              backgroundColor: "#e2e8f0",
              border: "4px solid #334155",
              borderRadius: "16px 16px 0 0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 20,
            }}
          >
            {/* Atap Menara Piramida Hijau */}
            <div
              style={{
                position: "absolute",
                top: -64,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "80px solid transparent",
                borderRight: "80px solid transparent",
                borderBottom: "64px solid #15803d",
              }}
            />
            {/* Jam Dinding Menara (Menunjukkan Pukul 07.00 WIB) */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                border: "4px solid #1e293b",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              <div style={{ position: "absolute", top: 2, fontSize: 8, fontWeight: "bold", color: "#1e293b" }}>12</div>
              <div style={{ position: "absolute", right: 4, fontSize: 8, fontWeight: "bold", color: "#1e293b" }}>3</div>
              <div style={{ position: "absolute", bottom: 2, fontSize: 8, fontWeight: "bold", color: "#1e293b" }}>6</div>
              <div style={{ position: "absolute", left: 4, fontSize: 8, fontWeight: "bold", color: "#1e293b" }}>9</div>
              {/* Jarum Pendek di 7 */}
              <div
                style={{
                  position: "absolute",
                  width: 3,
                  height: 24,
                  backgroundColor: "#dc2626",
                  borderRadius: 2,
                  transformOrigin: "bottom center",
                  transform: "rotate(210deg) translateY(-50%)",
                }}
              />
              {/* Jarum Panjang di 12 */}
              <div
                style={{
                  position: "absolute",
                  width: 2,
                  height: 32,
                  backgroundColor: "#0f172a",
                  borderRadius: 2,
                  transformOrigin: "bottom center",
                  transform: "rotate(0deg) translateY(-50%)",
                }}
              />
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#dc2626", zIndex: 10 }} />
            </div>
          </div>

          {/* Badan Utama Gedung 3 Lantai */}
          <div
            style={{
              width: "100%",
              flex: 1,
              background: "linear-gradient(180deg, #f8fafc 0%, #cbd5e1 100%)",
              border: "5px solid #1e293b",
              borderRadius: "12px 12px 0 0",
              boxShadow: "0 25px 50px rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 24,
              position: "relative",
              zIndex: 10,
            }}
          >
            {/* Atap Lis Kayu/Genteng Hijau */}
            <div
              style={{
                position: "absolute",
                top: -24,
                left: 0,
                right: 0,
                height: 24,
                backgroundColor: "#166534",
                borderTop: "4px solid #14532d",
                borderBottom: "2px solid #14532d",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {[...Array(40)].map((_, i) => (
                <div key={i} style={{ width: 16, height: "100%", backgroundColor: "#15803d", borderRight: "1px solid #14532d" }} />
              ))}
            </div>

            {/* Plang Nama Sekolah */}
            <div
              style={{
                alignSelf: "center",
                backgroundColor: "#064e3b",
                color: "#fde047",
                border: "2.5px solid #facc15",
                padding: "8px 36px",
                borderRadius: 8,
                boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
                marginTop: -12,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 22 }}>🏫</span>
              <span style={{ fontFamily: "monospace", fontWeight: 900, fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                UNIVERSITAS NUSA MANDIRI • KELAS KALKULUS
              </span>
            </div>

            {/* Lantai 3: Deretan Jendela Kaca Kelas */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 16, padding: "0 16px", margin: "8px 0" }}>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 76,
                    background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
                    border: "2px solid #475569",
                    borderRadius: 6,
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 4,
                  }}
                >
                  <div style={{ width: "100%", height: "50%", borderBottom: "1px solid #94a3b8", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "50%", borderRight: "1px solid #94a3b8" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Lantai 2: Jendela Kelas & Ruang Pertidaksamaan (Kamera Fokus di sini) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 16, padding: "0 16px", margin: "8px 0" }}>
              {[...Array(8)].map((_, i) => {
                const isTarget = i === 3 || i === 4;
                return (
                  <div
                    key={i}
                    style={{
                      height: 84,
                      background: isTarget
                        ? "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)"
                        : "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
                      border: isTarget ? "4px solid #facc15" : "2px solid #475569",
                      borderRadius: 6,
                      boxShadow: isTarget ? "0 0 16px rgba(250, 204, 21, 0.85)" : "inset 0 2px 4px rgba(0,0,0,0.1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: 4,
                      position: "relative",
                    }}
                  >
                    <div style={{ width: "100%", height: "50%", borderBottom: "1px solid #94a3b8", display: "flex", justifyContent: "space-between" }}>
                      <div style={{ width: "50%", borderRight: "1px solid #94a3b8" }} />
                    </div>
                    {i === 3 && (
                      <span style={{ fontSize: 9.5, fontFamily: "monospace", fontWeight: 800, color: "#166534", textAlign: "center" }}>
                        Ruang 3A
                      </span>
                    )}
                    {i === 4 && (
                      <span style={{ fontSize: 9.5, fontFamily: "monospace", fontWeight: 800, color: "#166534", textAlign: "center" }}>
                        Pertidaksamaan
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Lantai 1: Pintu Masuk Utama Sekolah & Tangga */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "8px 40px 0 40px", borderTop: "4px solid #94a3b8" }}>
              {/* Jendela Lantai Bawah Kiri */}
              <div style={{ display: "flex", gap: 14 }}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} style={{ width: 90, height: 90, backgroundColor: "#bae6fd", border: "2px solid #475569", borderRadius: 4 }} />
                ))}
              </div>

              {/* Gerbang / Pintu Masuk Utama dengan Tiang Pilar */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: -24 }}>
                <div style={{ display: "flex", gap: 28 }}>
                  <div style={{ width: 22, height: 105, backgroundColor: "#f1f5f9", border: "2px solid #64748b", boxShadow: "0 4px 6px rgba(0,0,0,0.15)" }} />
                  <div style={{ width: 140, height: 105, backgroundColor: "#1e293b", borderTop: "4px solid #334155", borderRadius: "8px 8px 0 0", display: "flex", justifyContent: "space-around", padding: 8 }}>
                    <div style={{ width: 55, height: "100%", backgroundColor: "rgba(56, 189, 248, 0.4)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 3 }} />
                    <div style={{ width: 55, height: "100%", backgroundColor: "rgba(56, 189, 248, 0.4)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 3 }} />
                  </div>
                  <div style={{ width: 22, height: 105, backgroundColor: "#f1f5f9", border: "2px solid #64748b", boxShadow: "0 4px 6px rgba(0,0,0,0.15)" }} />
                </div>
                {/* Tangga Masuk */}
                <div style={{ width: 250, height: 12, backgroundColor: "#cbd5e1", border: "1px solid #64748b" }} />
                <div style={{ width: 280, height: 12, backgroundColor: "#94a3b8", border: "1px solid #64748b" }} />
              </div>

              {/* Jendela Lantai Bawah Kanan */}
              <div style={{ display: "flex", gap: 14 }}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} style={{ width: 90, height: 90, backgroundColor: "#bae6fd", border: "2px solid #475569", borderRadius: 4 }} />
                ))}
              </div>
            </div>
          </div>

          {/* Halaman Depan & Rumput Hijau */}
          <div
            style={{
              width: "125vw",
              height: 110,
              background: "linear-gradient(0deg, #15803d 0%, #22c55e 100%)",
              borderTop: "8px solid #166534",
              marginTop: -8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "0 80px",
            }}
          >
            {/* Tiang Bendera */}
            <div style={{ position: "relative", top: -90, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 6, height: 140, backgroundColor: "#e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }} />
              {/* Bendera Merah Putih */}
              <div style={{ position: "absolute", top: 8, left: 6, width: 56, height: 36, boxShadow: "0 4px 8px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column" }}>
                <div style={{ width: "100%", height: "50%", backgroundColor: "#dc2626" }} />
                <div style={{ width: "100%", height: "50%", backgroundColor: "#ffffff" }} />
              </div>
            </div>

            {/* Deretan Semak Bunga */}
            <div style={{ display: "flex", gap: 32 }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} style={{ width: 64, height: 48, backgroundColor: "#166534", borderRadius: "32px 32px 0 0", boxShadow: "0 4px 6px rgba(0,0,0,0.2)" }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Overlay Bel Sekolah & Audio SFX Badge (Sesuai PRD §5 [Scene 01]) ── */}
      <div style={{ position: "absolute", top: 32, left: 40, zIndex: 40, display: "flex", alignItems: "center", gap: 16 }}>
        {/* Lonceng Emas Berdering */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            backgroundColor: "#064e3b",
            border: "2px solid #34d399",
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            transform: `scale(${bellPulse}) rotate(${bellSwing}deg)`,
            willChange: "transform",
          }}
        >
          🔔
        </div>

        {/* Notifikasi Suara Bel & Pagi Hari */}
        <div
          style={{
            backgroundColor: "rgba(15, 36, 26, 0.92)",
            border: "1px solid rgba(52, 211, 153, 0.6)",
            padding: "10px 24px",
            borderRadius: 16,
            boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#34d399" }} />
            <span style={{ color: "#fde047", fontFamily: "monospace", fontWeight: "bold", fontSize: 14, letterSpacing: "0.05em" }}>
              KRIIINNNGGG! • Bel Masuk Kelas Berbunyi
            </span>
          </div>
          <span style={{ color: "#ecfdf5", fontSize: 12, marginTop: 2 }}>
            Pukul 07.00 WIB • Suasana Ambient Pagi Hari Dimulai
          </span>
        </div>
      </div>

      {/* ── 4. Judul Besar Presentasi di Tengah Bawah ── */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 40,
          backgroundColor: "rgba(6, 78, 59, 0.95)",
          border: "2px solid #facc15",
          padding: "12px 36px",
          borderRadius: 16,
          boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#fde047", fontFamily: "monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: "bold", margin: 0 }}>
          PROYEK KALKULUS • VIDEO PEMBELAJARAN PANJANG (~60 MENIT)
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", letterSpacing: "0.05em", fontFamily: "monospace", margin: "4px 0 0 0" }}>
          MATERI LENGKAP & PEMBAHASAN PERTIDAKSAMAAN
        </h1>
      </div>
    </div>
  );
});

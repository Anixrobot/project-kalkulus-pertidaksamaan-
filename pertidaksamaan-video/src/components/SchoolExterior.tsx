import React, { memo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const SchoolExterior: React.FC = memo(() => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Kamera Zoom-In Halus ke Gedung Sekolah (Sesuai PRD §5 [Scene 01])
  const zoomScale = interpolate(frame, [0, 150], [1.0, 1.26], {
    extrapolateRight: "clamp",
  });
  const cameraY = interpolate(frame, [0, 150], [0, -40], {
    extrapolateRight: "clamp",
  });

  // Animasi Awan Mengambang Pagi Hari
  const cloud1X = (frame * 0.4) % 1920;
  const cloud2X = ((frame * 0.25) + 600) % 1920;

  // Animasi Getaran Lonceng Sekolah (Bel Masuk Kelas)
  const bellSwing = Math.sin((frame / fps) * Math.PI * 8) * 12;
  const bellPulse = 1 + Math.sin((frame / fps) * Math.PI * 6) * 0.08;

  // Fade out di akhir scene menuju transisi kelas
  const fadeOut = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div 
      className="relative w-full h-full overflow-hidden select-none"
      style={{ opacity: fadeOut }}
    >
      {/* ── 1. Langit Pagi Cerah (Morning Sky Gradient) ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#38bdf8] via-[#7dd3fc] to-[#fef08a]" />

      {/* Matahari Pagi Bersinar Lembut */}
      <div className="absolute top-12 right-28 w-36 h-36 rounded-full bg-yellow-100 blur-2xl opacity-70" />
      <div className="absolute top-16 right-32 w-28 h-28 rounded-full bg-yellow-200/90 shadow-2xl" />

      {/* Awan-Awan Pagi Mengambang */}
      <div 
        className="absolute top-14 left-0 w-80 h-24 bg-white/75 rounded-full blur-xs pointer-events-none"
        style={{ transform: `translateX(${cloud1X}px)` }}
      />
      <div 
        className="absolute top-28 left-0 w-96 h-28 bg-white/60 rounded-full blur-xs pointer-events-none"
        style={{ transform: `translateX(${cloud2X}px)` }}
      />

      {/* ── 2. Kontainer Gedung Sekolah dengan Efek Kamera Zoom-In ── */}
      <div 
        className="absolute inset-0 flex flex-col justify-end items-center will-change-transform"
        style={{
          transform: `scale(${zoomScale}) translateY(${cameraY}px)`,
          transformOrigin: "50% 65%",
        }}
      >
        {/* Pegunungan Hijau & Pepohonan Latar Belakang */}
        <div className="w-full h-44 -mb-16 flex items-end justify-between px-10 pointer-events-none opacity-60">
          <div className="w-[600px] h-36 bg-[#4ade80] rounded-t-full blur-sm" />
          <div className="w-[800px] h-48 bg-[#22c55e] rounded-t-full blur-sm -mx-28" />
          <div className="w-[650px] h-40 bg-[#16a34a] rounded-t-full blur-sm" />
        </div>

        {/* ── Visual Gedung Sekolah (Modern Campus Facade) ── */}
        <div className="relative w-[1380px] h-[620px] flex flex-col items-center">
          
          {/* Menara Jam Sekolah di Tengah Atas (Tower Clock) */}
          <div className="w-48 h-36 bg-[#e2e8f0] border-4 border-[#334155] rounded-t-2xl shadow-xl flex flex-col items-center justify-center relative z-20">
            {/* Atap Menara Piramida Hijau */}
            <div 
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: "80px solid transparent",
                borderRight: "80px solid transparent",
                borderBottom: "64px solid #15803d",
              }}
            />
            {/* Jam Dinding Menara (Menunjukkan Pukul 07.00 WIB) */}
            <div className="w-20 h-20 rounded-full bg-white border-4 border-[#1e293b] shadow-inner relative flex items-center justify-center">
              <div className="absolute top-1 text-[8px] font-bold text-gray-800">12</div>
              <div className="absolute right-1 text-[8px] font-bold text-gray-800">3</div>
              <div className="absolute bottom-1 text-[8px] font-bold text-gray-800">6</div>
              <div className="absolute left-1 text-[8px] font-bold text-gray-800">9</div>
              {/* Jarum Pendek di 7, Jarum Panjang di 12 */}
              <div className="absolute w-1 h-6 bg-red-600 rounded-full origin-bottom" style={{ transform: "rotate(210deg) translateY(-50%)" }} />
              <div className="absolute w-1 h-8 bg-gray-900 rounded-full origin-bottom" style={{ transform: "rotate(0deg) translateY(-50%)" }} />
              <div className="w-2 h-2 rounded-full bg-red-600 z-10" />
            </div>
          </div>

          {/* Badan Utama Gedung 3 Lantai */}
          <div className="w-full flex-1 bg-gradient-to-b from-[#f8fafc] to-[#cbd5e1] border-4 border-[#1e293b] shadow-2xl rounded-t-xl flex flex-col justify-between p-6 relative z-10">
            {/* Atap Lis Kayu/Genteng Hijau */}
            <div className="absolute -top-6 left-0 right-0 h-6 bg-[#166534] border-t-4 border-b-2 border-[#14532d] shadow-md flex justify-around">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="w-4 h-full bg-[#15803d] border-r border-[#14532d]" />
              ))}
            </div>

            {/* Plang Nama Sekolah */}
            <div className="self-center bg-[#064e3b] text-yellow-300 border-2 border-yellow-400 px-10 py-2 rounded-lg shadow-lg -mt-3 flex items-center gap-3">
              <span className="text-xl">🏫</span>
              <span className="font-mono font-black text-lg tracking-widest uppercase">
                SMA KALKULUS INDONESIA • KELAS MATEMATIKA
              </span>
            </div>

            {/* Lantai 3: Deretan Jendela Kaca Kelas */}
            <div className="grid grid-cols-8 gap-4 px-4 my-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-20 bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd] border-2 border-[#475569] rounded shadow-inner flex flex-col justify-between p-1">
                  <div className="w-full h-1/2 border-b border-[#94a3b8] flex justify-between">
                    <div className="w-1/2 border-r border-[#94a3b8]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Lantai 2: Jendela Kelas & Ruang Pertidaksamaan (Kamera Fokus di sini) */}
            <div className="grid grid-cols-8 gap-4 px-4 my-2">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-22 bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd] border-2 border-[#475569] rounded shadow-inner flex flex-col justify-between p-1 ${
                    i === 3 || i === 4 ? "ring-4 ring-yellow-400/80 bg-emerald-100" : ""
                  }`}
                >
                  <div className="w-full h-1/2 border-b border-[#94a3b8] flex justify-between">
                    <div className="w-1/2 border-r border-[#94a3b8]" />
                  </div>
                  {i === 3 && (
                    <span className="text-[9px] font-mono font-bold text-emerald-800 text-center">
                      Ruang 3A
                    </span>
                  )}
                  {i === 4 && (
                    <span className="text-[9px] font-mono font-bold text-emerald-800 text-center">
                      Pertidaksamaan
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Lantai 1: Pintu Masuk Utama Sekolah & Tangga */}
            <div className="flex items-end justify-between px-10 pt-2 border-t-4 border-[#94a3b8]">
              {/* Jendela Lantai Bawah Kiri */}
              <div className="flex gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-24 h-24 bg-[#bae6fd] border-2 border-[#475569] rounded" />
                ))}
              </div>

              {/* Gerbang / Pintu Masuk Utama dengan Tiang Pilar */}
              <div className="flex flex-col items-center -mb-6">
                <div className="flex gap-8">
                  <div className="w-6 h-28 bg-[#f1f5f9] border-x-2 border-[#64748b] shadow" />
                  <div className="w-36 h-28 bg-[#1e293b] border-t-4 border-[#334155] rounded-t-lg flex justify-around p-2">
                    <div className="w-14 h-full bg-[#38bdf8]/40 border border-white/40 rounded" />
                    <div className="w-14 h-full bg-[#38bdf8]/40 border border-white/40 rounded" />
                  </div>
                  <div className="w-6 h-28 bg-[#f1f5f9] border-x-2 border-[#64748b] shadow" />
                </div>
                {/* Tangga Masuk */}
                <div className="w-64 h-3 bg-[#cbd5e1] border border-[#64748b]" />
                <div className="w-72 h-3 bg-[#94a3b8] border border-[#64748b]" />
              </div>

              {/* Jendela Lantai Bawah Kanan */}
              <div className="flex gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-24 h-24 bg-[#bae6fd] border-2 border-[#475569] rounded" />
                ))}
              </div>
            </div>

          </div>

          {/* Halaman Depan & Rumput Hijau */}
          <div className="w-[125vw] h-28 bg-gradient-to-t from-[#15803d] to-[#22c55e] border-t-8 border-[#166534] -mt-2 flex items-center justify-around px-20">
            {/* Tiang Bendera */}
            <div className="relative -top-24 flex flex-col items-center">
              <div className="w-1.5 h-36 bg-gray-200 shadow" />
              {/* Bendera Merah Putih */}
              <div className="absolute top-2 left-1.5 w-14 h-9 shadow-md flex flex-col">
                <div className="w-full h-1/2 bg-red-600" />
                <div className="w-full h-1/2 bg-white" />
              </div>
            </div>

            {/* Deretan Semak Bunga */}
            <div className="flex gap-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-16 h-12 bg-[#166534] rounded-t-full shadow-md" />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. Overlay Bel Sekolah & Audio SFX Badge (Sesuai PRD §5 [Scene 01]) ── */}
      <div className="absolute top-8 left-10 z-40 flex items-center gap-4">
        {/* Lonceng Emas Berdering */}
        <div 
          className="w-16 h-16 rounded-2xl bg-[#064e3b] border-2 border-emerald-400 shadow-2xl flex items-center justify-center text-3xl will-change-transform"
          style={{
            transform: `scale(${bellPulse}) rotate(${bellSwing}deg)`,
          }}
        >
          🔔
        </div>

        {/* Notifikasi Suara Bel & Pagi Hari */}
        <div className="bg-[#0f241a]/90 backdrop-blur-md border border-emerald-400/60 px-6 py-2.5 rounded-2xl shadow-xl flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-yellow-300 font-mono font-bold text-sm tracking-wide">
              KRIIINNNGGG! • Bel Masuk Kelas Berbunyi
            </span>
          </div>
          <span className="text-emerald-100 font-sans text-xs mt-0.5">
            Pukul 07.00 WIB • Suasana Ambient Pagi Hari Dimulai
          </span>
        </div>
      </div>

      {/* ── 4. Judul Besar Presentasi di Tengah Bawah ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 bg-[#064e3b]/95 border-2 border-yellow-400 px-8 py-3 rounded-2xl shadow-2xl text-center">
        <p className="text-yellow-300 font-mono text-xs uppercase tracking-widest font-bold">
          Proyek Kalkulus • Video Pembelajaran Panjang (~60 Menit)
        </p>
        <h1 className="text-3xl font-black text-white tracking-wider font-mono mt-0.5">
          MATERI LENGKAP & PEMBAHASAN PERTIDAKSAMAAN
        </h1>
      </div>
    </div>
  );
});

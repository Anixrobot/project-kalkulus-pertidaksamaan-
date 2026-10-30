import React, { memo } from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface ChalkboardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Chalkboard: React.FC<ChalkboardProps> = memo(({
  title,
  subtitle,
  children,
}) => {
  const frame = useCurrentFrame();

  // Entrance cepat & smooth (hanya aktif 12 frame pertama)
  const boardScale = frame < 15 ? interpolate(frame, [0, 15], [0.97, 1], { extrapolateRight: "clamp" }) : 1;
  const boardOpacity = frame < 15 ? interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 1;

  return (
    <div 
      className="relative w-310 h-195 rounded-3xl p-5 shadow-2xl flex flex-col justify-between will-change-transform"
      style={{
        transform: `scale(${boardScale})`,
        opacity: boardOpacity,
        background: "linear-gradient(135deg, #422511 0%, #291508 100%)",
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Sekrup Sudut Bingkai Kayu */}
      <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#1c0f06] border border-[#78431e]" />
      <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#1c0f06] border border-[#78431e]" />
      <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-[#1c0f06] border border-[#78431e]" />
      <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[#1c0f06] border border-[#78431e]" />

      {/* Permukaan Papan Tulis Hijau Tua */}
      <div 
        className="relative w-full flex-1 rounded-2xl p-7 overflow-hidden flex flex-col"
        style={{
          backgroundColor: "#133526",
          backgroundImage: `
            radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02), rgba(0, 0, 0, 0.15))
          `,
          backgroundSize: "32px 32px, 100% 100%",
          boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Header Papan Tulis */}
        <div className="border-b-2 border-emerald-600/40 pb-3 mb-5 flex justify-between items-end">
          <div>
            {subtitle && (
              <span className="text-emerald-300 tracking-wider text-xs font-bold uppercase bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-600/50">
                {subtitle}
              </span>
            )}
            <h1 
              className="text-4xl font-black mt-1.5 tracking-wide"
              style={{
                color: "#fef08a",
                textShadow: "0 0 4px rgba(254, 240, 138, 0.4)",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              {title}
            </h1>
          </div>

          <div className="text-right">
            <span className="text-emerald-400/80 font-mono text-sm">
              Pertemuan 03 • Kalkulus
            </span>
          </div>
        </div>

        {/* Konten Materi di Atas Papan Tulis */}
        <div className="flex-1 text-white overflow-hidden relative">
          {children}
        </div>
      </div>

      {/* Tatakan Kapur (Chalk Tray) di Bagian Bawah */}
      <div className="relative h-7 bg-[#231106] rounded-md border-t-2 border-[#542d12] flex items-center justify-between px-12 mt-2 shadow-inner">
        {/* Kapur Putih, Kuning, Biru Muda */}
        <div className="flex gap-3 items-center">
          <div className="w-9 h-2.5 bg-white rounded-sm shadow-sm transform -rotate-2" />
          <div className="w-11 h-2.5 bg-yellow-200 rounded-sm shadow-sm transform rotate-1" />
          <div className="w-8 h-2.5 bg-cyan-200 rounded-sm shadow-sm" />
          <div className="w-7 h-2.5 bg-pink-200 rounded-sm shadow-sm transform -rotate-1" />
        </div>

        {/* Penghapus Kayu Berbulu (Felt Eraser) */}
        <div className="w-20 h-4 bg-[#78431e] rounded flex flex-col justify-end overflow-hidden shadow">
          <div className="h-1.5 bg-[#42210b]" />
        </div>
      </div>
    </div>
  );
});

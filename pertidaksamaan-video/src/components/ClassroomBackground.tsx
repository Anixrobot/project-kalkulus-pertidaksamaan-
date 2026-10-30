import React, { memo } from "react";
import { useCurrentFrame } from "remotion";

export const ClassroomBackground: React.FC<{ children?: React.ReactNode }> = memo(({ children }) => {
  const frame = useCurrentFrame();

  // Animasi jarum jam dinding ultra halus (60 FPS)
  const secondAngle = (frame * 3) % 360;
  const minuteAngle = ((frame * 0.1) % 360) + 70;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#e8efe6] via-[#dbe6d7] to-[#ccd9c7]">
      {/* Pola Dinding Kelas Halus */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(#2d4a3e 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }}
      />

      {/* List Kayu Dinding Atas */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#784f33] shadow-md border-b-2 border-[#54331d]" />

      {/* Jam Dinding Sekolah di Kiri Atas */}
      <div className="absolute top-6 left-10 w-20 h-20 rounded-full bg-white border-4 border-[#8c532b] shadow-lg flex items-center justify-center z-10">
        <div className="absolute top-1 text-[10px] font-bold text-gray-700">12</div>
        <div className="absolute right-1.5 text-[10px] font-bold text-gray-700">3</div>
        <div className="absolute bottom-1 text-[10px] font-bold text-gray-700">6</div>
        <div className="absolute left-1.5 text-[10px] font-bold text-gray-700">9</div>
        
        {/* Jarum Jam */}
        <div 
          className="absolute w-1 h-6 bg-gray-800 origin-bottom rounded-full will-change-transform"
          style={{ transform: `rotate(${minuteAngle}deg) translateY(-50%)` }}
        />
        {/* Jarum Detik */}
        <div 
          className="absolute w-0.5 h-8 bg-red-600 origin-bottom rounded-full will-change-transform"
          style={{ transform: `rotate(${secondAngle}deg) translateY(-50%)` }}
        />
        <div className="w-2 h-2 rounded-full bg-red-700 z-10" />
      </div>

      {/* Spanduk / Banner Kelas di Kanan Atas */}
      <div className="absolute top-6 right-12 z-10 bg-white/90 backdrop-blur-sm border-2 border-emerald-600 px-6 py-2 rounded-xl shadow-lg flex items-center gap-3">
        <span className="text-2xl">📐</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Ruang Belajar Kalkulus</p>
          <p className="text-sm font-semibold text-gray-700">Materi Pertidaksamaan</p>
        </div>
      </div>

      {/* Lantai Kayu Parket di Bagian Bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#5c3a21] via-[#7a4e2d] to-[#915d36] border-t-8 border-[#3d2413] shadow-inner">
        <div className="w-full h-full opacity-20 flex justify-around">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-px h-full bg-black/40" />
          ))}
        </div>
      </div>

      {/* Konten Utama (Papan Tulis & Karakter) */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
});

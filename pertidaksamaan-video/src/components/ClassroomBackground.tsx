import React, { memo } from "react";
import { useCurrentFrame } from "remotion";

export const ClassroomBackground: React.FC<{ children?: React.ReactNode }> = memo(({ children }) => {
  const frame = useCurrentFrame();

  // Animasi halus pergerakan cahaya & partikel debu pagi
  const lightShift = Math.sin(frame * 0.02) * 5;

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#557659]">
      {/* ── 1. Dinding Atas: Nature Green / Olive Sage Green Sesuai Ref Art ── */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#4d6d51] via-[#5b7d5f] to-[#557559]"
        style={{ height: "68%" }}
      >
        {/* Tekstur Dinding Halus */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#1c3320 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
        {/* List Plafon / Balok Atas */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-[#dbe6d9] border-b-2 border-[#b5c7b3] shadow-sm flex items-center justify-between px-16">
          <div className="w-48 h-2 bg-white/60 rounded-full" />
          <div className="w-96 h-2 bg-white/60 rounded-full" />
          <div className="w-48 h-2 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* ── 2. Jendela Kelas di Sisi Kiri & Sinar Matahari Pagi ── */}
      <div className="absolute top-10 left-0 w-36 h-[60%] flex flex-col pointer-events-none z-10">
        <div className="w-full h-full bg-[#f4f7f2] border-r-8 border-y-8 border-[#d7e2d3] shadow-lg flex flex-col justify-between p-2">
          {/* Kaca Jendela & Langit Pagi */}
          <div className="w-full h-[47%] bg-gradient-to-br from-[#dff1fd] to-[#fef9c3] rounded border-2 border-[#cad8c5] shadow-inner relative overflow-hidden">
            <div className="absolute top-2 right-2 w-12 h-12 rounded-full bg-yellow-200/40 blur-md" />
          </div>
          <div className="w-full h-[47%] bg-gradient-to-br from-[#eaf4fb] to-[#fefce8] rounded border-2 border-[#cad8c5] shadow-inner relative overflow-hidden" />
        </div>
      </div>

      {/* Sinar Matahari Menembus Lantai (Diagonal Sunbeams) */}
      <div 
        className="absolute top-10 left-32 w-[650px] h-full pointer-events-none z-10 opacity-30 mix-blend-screen"
        style={{
          background: "linear-gradient(135deg, rgba(254, 240, 138, 0.45) 0%, rgba(254, 240, 138, 0.15) 45%, transparent 75%)",
          transform: `skewX(-28deg) translateX(${lightShift}px)`,
          transformOrigin: "top left",
        }}
      />

      {/* Bingkai Lukisan / Papan Kecil di Dinding Kiri */}
      <div className="absolute top-24 left-44 w-28 h-36 bg-[#23422d] border-4 border-[#784928] rounded-md shadow-md z-10 flex flex-col items-center justify-center p-2 opacity-80">
        <div className="w-full h-px bg-white/30 my-1" />
        <span className="text-[9px] font-mono text-emerald-200 text-center leading-tight">
          f(x) &gt; 0<br />
          x &isin; &reals;
        </span>
        <div className="w-full h-px bg-white/30 my-1" />
      </div>

      {/* Tanaman Pot Hias Daun Lebar di Lantai Kiri Bawah (Sesuai Gambar Referensi) */}
      <div className="absolute bottom-28 left-6 z-25 pointer-events-none flex flex-col items-center">
        {/* Daun-daun Monstera / Philodendron */}
        <svg viewBox="0 0 160 200" className="w-36 h-48 overflow-visible">
          {/* Batang & Daun */}
          <path d="M 80,180 Q 50,110 20,95 Q 50,75 75,130" fill="#2d5a34" stroke="#1b3d20" strokeWidth="2" />
          <path d="M 80,180 Q 95,90 70,50 Q 110,60 85,120" fill="#3b7344" stroke="#234a2a" strokeWidth="2" />
          <path d="M 80,180 Q 120,110 145,100 Q 115,80 85,140" fill="#2e5e36" stroke="#1d4023" strokeWidth="2" />
          <path d="M 80,180 Q 40,150 15,160 Q 30,130 75,160" fill="#386d41" stroke="#224728" strokeWidth="2" />
          <path d="M 80,180 Q 130,150 155,155 Q 125,135 85,165" fill="#44814e" stroke="#26512c" strokeWidth="2" />
          {/* Pot Terakota Oranye/Cokelat */}
          <polygon points="50,150 110,150 100,195 60,195" fill="#c26338" stroke="#8c4220" strokeWidth="3" />
          <ellipse cx="80" cy="150" rx="30" ry="7" fill="#dc774b" stroke="#8c4220" strokeWidth="2" />
        </svg>
      </div>

      {/* ── 3. Rak Gantung Tanaman di Kanan Atas & Pintu Kayu di Kanan ── */}
      {/* Rak Dinding Kayu dengan Tanaman Gantung */}
      <div className="absolute top-24 right-48 z-15 pointer-events-none flex flex-col items-center">
        <div className="w-24 h-3 bg-[#693d1f] rounded shadow-md border-b-2 border-[#42220d]" />
        {/* Pot Gantung & Sulur Daun Menjuntai */}
        <div className="relative -top-2 flex flex-col items-center">
          <div className="w-10 h-6 bg-[#b85b2e] rounded-b-lg border border-[#783615] shadow-inner" />
          <svg viewBox="0 0 60 70" className="w-14 h-16 -mt-2 overflow-visible">
            <path d="M 25,5 Q 10,25 15,50 Q 25,35 30,5" fill="#3f7547" />
            <path d="M 35,5 Q 48,28 42,55 Q 32,38 28,5" fill="#4f8f58" />
            <path d="M 30,5 Q 28,35 30,65 Q 36,40 32,5" fill="#326138" />
          </svg>
        </div>
      </div>

      {/* Pintu Kayu Kelas di Sudut Kanan (Sesuai Gambar Referensi) */}
      <div className="absolute top-14 right-0 w-32 h-[80%] bg-[#7a4825] border-l-8 border-t-8 border-[#522e15] shadow-2xl z-10 flex flex-col items-center p-3">
        {/* Kaca Pintu Atas */}
        <div className="w-full h-44 bg-[#e6f1f8] border-4 border-[#522e15] rounded shadow-inner flex flex-col justify-around p-2">
          <div className="w-full h-px bg-white/70" />
          <div className="w-full h-px bg-white/70" />
        </div>
        {/* Panel Bawah Pintu */}
        <div className="w-full flex-1 bg-[#693d1e] border-4 border-[#522e15] rounded mt-4 p-2 flex flex-col justify-around">
          <div className="w-full h-1/2 border-2 border-[#522e15] rounded bg-[#5f3619]" />
          <div className="w-full h-1/3 border-2 border-[#522e15] rounded bg-[#5f3619]" />
        </div>
        {/* Gagang Pintu Kuningan */}
        <div className="absolute top-64 left-4 w-3 h-8 bg-yellow-500 rounded-sm border border-yellow-700 shadow-md flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-800" />
        </div>
      </div>

      {/* ── 4. Wainscoting Kayu di Bawah Dinding (Wood Panel Slat) ── */}
      <div 
        className="absolute left-0 right-0 z-10 bg-[#7a4927] border-t-8 border-[#995c32] shadow-md"
        style={{
          top: "62%",
          height: "12%",
          backgroundImage: "repeating-linear-gradient(90deg, #744322, #744322 36px, #613619 36px, #613619 40px)",
        }}
      >
        {/* List Profil Kayu Bawah */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#522d14]" />
      </div>

      {/* ── 5. Lantai Kelas Sage Green dengan Pantulan Cahaya Matahari ── */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-10 bg-[#8da891] border-t-4 border-[#47634a] shadow-inner"
        style={{ height: "26%" }}
      >
        {/* Garis Ubin Lantai Perspektif */}
        <div className="w-full h-full opacity-15 flex justify-between pointer-events-none">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="w-px h-full bg-[#27422a]" />
          ))}
        </div>
        {/* Kotak Pantulan Cahaya Matahari di Lantai (Sesuai Gambar Referensi) */}
        <div 
          className="absolute top-3 left-64 w-60 h-16 bg-[#fffbeb] rounded opacity-35 blur-xs pointer-events-none"
          style={{ transform: "skewX(-35deg)" }}
        />
        <div 
          className="absolute top-12 left-[380px] w-48 h-14 bg-[#fffbeb] rounded opacity-30 blur-xs pointer-events-none"
          style={{ transform: "skewX(-35deg)" }}
        />
      </div>

      {/* ── 6. Konten Utama (Papan Tulis & Karakter Pemateri) ── */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
});

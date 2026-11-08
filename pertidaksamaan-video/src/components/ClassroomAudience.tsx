import React, { useState, useEffect, memo } from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  delayRender,
  continueRender,
  interpolate,
} from "remotion";
import { Lottie, LottieAnimationData } from "@remotion/lottie";

export const ClassroomAudience: React.FC = memo(() => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Handle Lottie students.json jika disediakan per PRD §5 [Scene 01]
  const [lottieData, setLottieData] = useState<LottieAnimationData | null>(null);

  useEffect(() => {
    const fileName = "students.json";
    const handle = delayRender("Loading students.json Lottie");
    fetch(staticFile(fileName))
      .then((res: Response) => {
        if (!res.ok) throw new Error("No students.json");
        return res.json() as Promise<LottieAnimationData>;
      })
      .then((data: LottieAnimationData) => {
        setLottieData(data);
        continueRender(handle);
      })
      .catch(() => {
        // Fallback anggun ke komponen audience teranimasi
        continueRender(handle);
      });
  }, []);

  // Animasi nafas & pergerakan murid yang duduk
  const studentBreathe = Math.sin((frame / fps) * Math.PI * 1.8) * 2;
  const writingMotion = Math.sin((frame / fps) * Math.PI * 4) * 1.5;

  // Kamera bergerak maju perlahan ke arah papan tulis depan
  const cameraZoom = interpolate(frame, [0, 150], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#5b7d5f]">
      {/* ── 1. Dinding Depan Kelas & Papan Tulis di Kejauhan ── */}
      <div 
        className="absolute inset-0 flex flex-col justify-between will-change-transform"
        style={{
          transform: `scale(${cameraZoom})`,
          transformOrigin: "50% 40%",
        }}
      >
        {/* Dinding Atas Hijau Sage */}
        <div className="w-full h-[65%] bg-gradient-to-b from-[#4d6d51] via-[#5b7d5f] to-[#557559] relative flex items-center justify-center">
          {/* Papan Tulis Hijau Tua di Dinding Depan */}
          <div className="w-[880px] h-[360px] bg-[#133526] border-8 border-[#5c371d] rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 relative">
            <span className="text-yellow-300 font-mono font-bold text-sm tracking-widest uppercase bg-emerald-950/80 px-4 py-1 rounded-full border border-emerald-500">
              Pertemuan Matematika Kalkulus
            </span>
            <h2 className="text-5xl font-black text-white font-mono mt-3 tracking-wider">
              BAB: PERTIDAKSAMAAN
            </h2>
            <p className="text-emerald-200 font-sans text-lg mt-2">
              Linear • Rasional • Irasional • Nilai Mutlak
            </p>

            {/* Tulisan Kapur Halus di Papan */}
            <div className="absolute bottom-4 left-6 text-xs text-white/40 font-mono">
              ax + b &lt; c &nbsp;&nbsp;|&nbsp;&nbsp; P(x)/Q(x) &le; 0
            </div>
            <div className="absolute bottom-4 right-6 text-xs text-white/40 font-mono">
              &radic;f(x) &lt; g(x) &nbsp;&nbsp;|&nbsp;&nbsp; |x| &le; a
            </div>
          </div>

          {/* Jam Dinding di Kiri Depan */}
          <div className="absolute top-8 left-16 w-16 h-16 rounded-full bg-white border-4 border-[#784928] shadow-md flex items-center justify-center">
            <div className="w-1 h-5 bg-black origin-bottom rounded-full" />
            <div className="w-0.5 h-6 bg-red-600 origin-bottom rounded-full" />
          </div>

          {/* Jendela Kiri dengan Sinar Matahari Masuk */}
          <div className="absolute top-6 left-0 w-28 h-72 bg-gradient-to-br from-[#e0f2fe] to-[#fef08a] border-r-8 border-y-8 border-[#cad8c5] opacity-80" />
          {/* Sinar Menyinari Lantai */}
          <div 
            className="absolute top-10 left-28 w-[500px] h-full pointer-events-none opacity-25 mix-blend-screen"
            style={{
              background: "linear-gradient(135deg, rgba(254, 240, 138, 0.5) 0%, transparent 70%)",
              transform: "skewX(-30deg)",
            }}
          />
        </div>

        {/* Lantai Ruang Kelas */}
        <div className="w-full h-[35%] bg-[#7e9982] border-t-8 border-[#7a4927] relative" />
      </div>

      {/* ── 2. Render Murid-Murid Duduk Menghadap Depan ── */}
      {lottieData ? (
        <div className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none">
          <Lottie animationData={lottieData} loop style={{ width: "100%", height: "85%" }} />
        </div>
      ) : (
        /* Vektor Penonton / Murid-Murid Duduk di Bangku (Sudut Pandang Belakang) */
        <div className="absolute inset-x-0 bottom-0 z-20 h-[520px] pointer-events-none flex flex-col justify-end">
          
          {/* Deretan Meja & Murid Baris Depan (Agak Kecil di Tengah) */}
          <div className="w-full flex justify-around px-24 -mb-16 opacity-90 scale-90">
            {/* Meja Murid 1 */}
            <div className="flex flex-col items-center">
              {/* Kepala & Punggung Murid */}
              <div 
                className="w-24 h-32 flex flex-col items-center will-change-transform"
                style={{ transform: `translateY(${studentBreathe}px)` }}
              >
                {/* Rambut Belakang */}
                <div className="w-16 h-16 rounded-full bg-[#1e293b] shadow-md -mb-2" />
                {/* Punggung Baju Putih Seragam */}
                <div className="w-28 h-20 bg-white border-2 border-gray-300 rounded-t-2xl shadow" />
              </div>
              {/* Meja Kayu Murid */}
              <div className="w-64 h-16 bg-[#a16207] border-4 border-[#78350f] rounded-t-lg shadow-2xl relative flex items-center justify-around px-6">
                <div className="w-14 h-10 bg-blue-100 border border-blue-300 rounded shadow-sm -mt-4" />
                <div className="w-8 h-3 bg-red-400 rounded-full -mt-2" />
              </div>
            </div>

            {/* Meja Murid 2 (Kuncir Kuda / Rambut Panjang) */}
            <div className="flex flex-col items-center">
              <div 
                className="w-24 h-32 flex flex-col items-center will-change-transform"
                style={{ transform: `translateY(${-studentBreathe}px)` }}
              >
                <div className="w-16 h-16 rounded-full bg-[#451a03] shadow-md -mb-2 relative">
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-10 bg-[#451a03] rounded-full" />
                </div>
                <div className="w-28 h-20 bg-white border-2 border-gray-300 rounded-t-2xl shadow" />
              </div>
              <div className="w-64 h-16 bg-[#a16207] border-4 border-[#78350f] rounded-t-lg shadow-2xl relative flex items-center justify-around px-6">
                <div className="w-16 h-10 bg-yellow-100 border border-yellow-300 rounded shadow-sm -mt-4" />
                <div className="w-12 h-4 bg-emerald-600 rounded -mt-2" />
              </div>
            </div>

            {/* Meja Murid 3 */}
            <div className="flex flex-col items-center">
              <div 
                className="w-24 h-32 flex flex-col items-center will-change-transform"
                style={{ transform: `translateY(${studentBreathe * 0.8}px)` }}
              >
                <div className="w-16 h-16 rounded-full bg-[#18181b] shadow-md -mb-2" />
                <div className="w-28 h-20 bg-white border-2 border-gray-300 rounded-t-2xl shadow" />
              </div>
              <div className="w-64 h-16 bg-[#a16207] border-4 border-[#78350f] rounded-t-lg shadow-2xl relative flex items-center justify-around px-6">
                <div className="w-14 h-10 bg-emerald-100 border border-emerald-300 rounded shadow-sm -mt-4" />
              </div>
            </div>
          </div>

          {/* Deretan Meja & Murid Baris Belakang (Lebih Besar di Foreground) */}
          <div className="w-full flex justify-between px-12 -mb-4">
            
            {/* Murid Kiri Bawah (Menulis Catatan) */}
            <div className="flex flex-col items-center">
              <div 
                className="w-36 h-44 flex flex-col items-center will-change-transform"
                style={{ transform: `translateY(${studentBreathe}px)` }}
              >
                <div className="w-22 h-22 rounded-full bg-[#09090b] shadow-xl -mb-4" />
                <div className="w-40 h-28 bg-[#f8fafc] border-2 border-gray-300 rounded-t-3xl shadow-xl flex justify-center pt-2">
                  {/* Kerah Baju */}
                  <div className="w-10 h-6 border-b-2 border-gray-400" />
                </div>
              </div>
              {/* Meja Belakang Kiri */}
              <div className="w-96 h-24 bg-[#854d0e] border-4 border-[#713f12] rounded-t-xl shadow-2xl relative flex items-center justify-between px-10">
                {/* Buku Catatan Terbuka */}
                <div 
                  className="w-28 h-16 bg-white border-2 border-gray-300 rounded shadow-md -mt-8 flex p-2 gap-1 will-change-transform"
                  style={{ transform: `rotate(-3deg) translateY(${writingMotion}px)` }}
                >
                  <div className="w-1/2 h-full border-r border-gray-200 space-y-1">
                    <div className="w-full h-1 bg-blue-300 rounded" />
                    <div className="w-3/4 h-1 bg-gray-300 rounded" />
                    <div className="w-full h-1 bg-gray-300 rounded" />
                  </div>
                  <div className="w-1/2 h-full space-y-1 pl-1">
                    <div className="w-full h-1 bg-gray-300 rounded" />
                    <div className="w-2/3 h-1 bg-red-300 rounded" />
                  </div>
                </div>

                {/* Kotak Pensil & Penggaris */}
                <div className="flex items-center gap-2 -mt-4">
                  <div className="w-16 h-5 bg-sky-500 rounded-full shadow border border-sky-600" />
                  <div className="w-12 h-2 bg-yellow-400 rounded shadow" />
                </div>
              </div>
            </div>

            {/* Murid Kanan Bawah (Menyimak Khidmat) */}
            <div className="flex flex-col items-center">
              <div 
                className="w-36 h-44 flex flex-col items-center will-change-transform"
                style={{ transform: `translateY(${-studentBreathe * 1.1}px)` }}
              >
                {/* Rambut Bergelombang / Cokelat Tua */}
                <div className="w-24 h-24 rounded-full bg-[#3f200c] shadow-xl -mb-4 relative">
                  <div className="absolute -bottom-2 right-0 w-8 h-12 bg-[#3f200c] rounded-full" />
                </div>
                <div className="w-40 h-28 bg-[#f8fafc] border-2 border-gray-300 rounded-t-3xl shadow-xl flex justify-center pt-2">
                  <div className="w-10 h-6 border-b-2 border-gray-400" />
                </div>
              </div>
              {/* Meja Belakang Kanan */}
              <div className="w-96 h-24 bg-[#854d0e] border-4 border-[#713f12] rounded-t-xl shadow-2xl relative flex items-center justify-between px-10">
                {/* Buku Pelajaran Matematika Tebal */}
                <div className="w-28 h-16 bg-[#15803d] border-2 border-[#166534] rounded shadow-md -mt-8 p-2 flex flex-col justify-between">
                  <span className="text-[9px] text-yellow-300 font-bold font-mono">KALKULUS 1</span>
                  <div className="w-full h-1 bg-white/60" />
                  <span className="text-[8px] text-white font-mono">Edisi Siswa</span>
                </div>

                {/* Pulpen dan Pensil */}
                <div className="w-14 h-2 bg-black rounded-full -mt-4 shadow" />
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ── 3. Overlay Informasi Suasana Kelas ── */}
      <div className="absolute top-8 left-10 z-30 flex items-center gap-3 bg-[#064e3b]/95 border border-emerald-400 px-6 py-2.5 rounded-full shadow-2xl">
        <span className="text-xl">🎒</span>
        <div>
          <p className="text-yellow-300 font-mono font-bold text-xs uppercase tracking-wide">
            Suasana Kelas Pagi Hari • 30 Siswa Siap Belajar
          </p>
          <p className="text-emerald-100 font-sans text-xs">
            Murid-murid duduk tertib memperhatikan presentasi di papan tulis
          </p>
        </div>
      </div>
    </div>
  );
});

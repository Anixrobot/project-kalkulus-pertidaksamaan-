import React, { useState, useEffect, memo } from "react";
import { useCurrentFrame, useVideoConfig, spring, staticFile, delayRender, continueRender } from "remotion";
import { Lottie, LottieAnimationData } from "@remotion/lottie";

interface TeacherCharacterProps {
  speech?: string;
  pose?: "explaining" | "pointing" | "welcoming";
  useLottieIfAvailable?: boolean;
}

export const TeacherCharacter: React.FC<TeacherCharacterProps> = memo(({
  speech,
  pose = "pointing",
  useLottieIfAvailable = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Handle Lottie loading if requested
  const [lottieData, setLottieData] = useState<LottieAnimationData | null>(null);

  useEffect(() => {
    if (!useLottieIfAvailable) return;
    const handle = delayRender();
    fetch(staticFile("teacher.json"))
      .then((res: Response) => {
        if (!res.ok) throw new Error("No teacher.json");
        return res.json() as Promise<LottieAnimationData>;
      })
      .then((data: LottieAnimationData) => {
        setLottieData(data);
        continueRender(handle);
      })
      .catch(() => {
        continueRender(handle);
      });
  }, [useLottieIfAvailable]);

  // Animasi halus 60 FPS
  const breatheSpring = Math.sin((frame / fps) * Math.PI * 2) * 3;
  const headTilt = Math.sin((frame / fps) * Math.PI * 1.5) * 2;
  const isBlinking = frame % Math.round(fps * 2.5) < Math.round(fps * 0.12);
  const isMouthTalking = speech ? (frame % Math.round(fps * 0.25) < Math.round(fps * 0.12)) : false;
  const pointerBounce = Math.sin((frame / fps) * Math.PI * 2.5) * 3;

  // Spring animation untuk balon dialog
  const bubbleScale = spring({
    frame: frame % (fps * 10),
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  return (
    <div className="relative flex flex-col items-center select-none w-85 will-change-transform">
      
      {/* Balon Ucapan Guru (Speech Bubble) */}
      {speech && (
        <div 
          className="absolute -top-24 left-1/2 -translate-x-1/2 z-40 w-76 bg-white text-gray-800 px-4 py-2.5 rounded-2xl shadow-xl border-2 border-emerald-500 font-sans text-xs font-semibold leading-relaxed will-change-transform"
          style={{ transform: `translateX(-50%) scale(${bubbleScale})` }}
        >
          <div className="flex items-start gap-2">
            <span className="text-sm">💬</span>
            <p className="flex-1 text-gray-800">{speech}</p>
          </div>
          {/* Ekor Balon Ucapan */}
          <svg className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-3 overflow-visible" viewBox="0 0 16 12">
            <polygon points="0,0 8,12 16,0" fill="#ffffff" />
            <path d="M 0,0 L 8,12 L 16,0" stroke="#10b981" strokeWidth="2" fill="none" />
          </svg>
        </div>
      )}

      {/* Render Lottie jika ada, atau Karakter Guru Vektor Solid HD */}
      {useLottieIfAvailable && lottieData ? (
        <div className="w-90 h-125">
          <Lottie animationData={lottieData} />
        </div>
      ) : (
        <div 
          className="relative w-85 h-120 flex items-end justify-center will-change-transform"
          style={{ transform: `translate3d(0, ${breatheSpring}px, 0)` }}
        >
          <svg 
            viewBox="0 0 340 480" 
            className="w-full h-full overflow-visible"
            style={{ shapeRendering: "geometricPrecision" }}
          >
            {/* Bayangan di lantai */}
            <ellipse cx="170" cy="455" rx="90" ry="12" fill="rgba(0,0,0,0.22)" />

            {/* Celana Panjang Hitam */}
            <rect x="130" y="395" width="36" height="55" rx="5" fill="#0f172a" />
            <rect x="174" y="395" width="36" height="55" rx="5" fill="#0f172a" />

            {/* ===== BADAN / JAS GURU (NAVY BLUE SOLID - 100% VISIBLE) ===== */}
            <g id="body-layer">
              {/* Badan Jas Utama */}
              <path 
                d="M 95,240 C 95,220 135,215 170,215 C 205,215 245,220 245,240 L 250,405 L 90,405 Z" 
                fill="#1e3a8a" 
              />

              {/* Kemeja Putih Tengah */}
              <polygon points="146,215 194,215 184,335 156,335" fill="#ffffff" />

              {/* Dasi Merah */}
              <polygon points="164,226 176,226 179,305 170,325 161,305" fill="#dc2626" />
              <polygon points="163,220 177,220 174,228 166,228" fill="#991b1b" />

              {/* Kerah Kemeja Putih */}
              <polygon points="140,215 166,238 170,225" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
              <polygon points="200,215 174,238 170,225" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Kerah Jas (Lapels) Biru Gelap */}
              <polygon points="118,225 152,295 138,295 110,235" fill="#172554" />
              <polygon points="222,225 188,295 202,295 230,235" fill="#172554" />

              {/* Kancing Emas */}
              <circle cx="170" cy="355" r="4.5" fill="#f59e0b" />
              <circle cx="170" cy="380" r="4.5" fill="#f59e0b" />
            </g>

            {/* ===== LENGAN KIRI (MEMEGANG BUKU) ===== */}
            <g id="left-arm">
              {/* Lengan Baju */}
              <path d="M 105,240 C 70,280 70,335 98,365" stroke="#1e3a8a" strokeWidth="30" strokeLinecap="round" fill="none" />
              {/* Tangan Kiri */}
              <circle cx="106" cy="368" r="14" fill="#fed7aa" />
              {/* Buku Kalkulus Hijau */}
              <g transform="translate(72, 340) rotate(-14)">
                <rect x="0" y="0" width="50" height="66" rx="5" fill="#047857" stroke="#065f46" strokeWidth="2" />
                <rect x="5" y="5" width="40" height="56" rx="3" fill="#10b981" />
                <rect x="10" y="15" width="30" height="4" rx="2" fill="#ffffff" />
                <rect x="10" y="24" width="20" height="3" rx="1.5" fill="#fef08a" />
                <circle cx="25" cy="44" r="9" fill="#065f46" />
                <text x="25" y="48" fill="#fef08a" fontSize="12" fontWeight="bold" textAnchor="middle">∫dx</text>
              </g>
            </g>

            {/* ===== LENGAN KANAN & TONGKAT PENUNJUK (POINTER) ===== */}
            <g id="right-arm" transform={`translate(0, ${pointerBounce})`}>
              {pose === "pointing" ? (
                <>
                  {/* Lengan Terangkat Mengarah ke Papan Tulis */}
                  <path d="M 235,240 C 265,268 280,280 298,295" stroke="#1e3a8a" strokeWidth="30" strokeLinecap="round" fill="none" />
                  {/* Tangan Kanan */}
                  <circle cx="302" cy="298" r="14" fill="#fed7aa" />
                  {/* Tongkat Penunjuk Kayu Emas Menunjuk Papan Tulis */}
                  <g transform="translate(302, 298) rotate(-40)">
                    <rect x="-4" y="-195" width="8" height="205" rx="4" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
                    <circle cx="0" cy="-200" r="10" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                    <circle cx="0" cy="-200" r="4" fill="#ffffff" />
                  </g>
                </>
              ) : (
                <>
                  <path d="M 235,240 C 265,275 255,335 245,365" stroke="#1e3a8a" strokeWidth="30" strokeLinecap="round" fill="none" />
                  <circle cx="245" cy="370" r="14" fill="#fed7aa" />
                  <g transform="translate(245, 370) rotate(-15)">
                    <rect x="-3" y="-120" width="6" height="130" rx="3" fill="#d97706" />
                    <circle cx="0" cy="-125" r="7" fill="#f59e0b" />
                  </g>
                </>
              )}
            </g>

            {/* ===== LEHER GURU (SOLID & TERSAMBUNG KE KEMEJA) ===== */}
            <rect x="153" y="185" width="34" height="38" rx="6" fill="#fed7aa" stroke="#fba874" strokeWidth="1" />

            {/* ===== KEPALA DAN WAJAH GURU ===== */}
            <g id="head-layer" transform={`translate(170, 140) rotate(${headTilt})`}>
              {/* Telinga Kiri & Kanan */}
              <circle cx="-52" cy="5" r="13" fill="#fed7aa" stroke="#fba874" strokeWidth="1" />
              <circle cx="52" cy="5" r="13" fill="#fed7aa" stroke="#fba874" strokeWidth="1" />

              {/* Bentuk Wajah Utama */}
              <ellipse cx="0" cy="5" rx="50" ry="56" fill="#fed7aa" />

              {/* Rambut Guru Cokelat Rapi */}
              <path 
                d="M -54,0 C -50,-60 50,-60 54,0 C 44,-25 20,-20 0,-30 C -20,-20 -44,-25 -54,0 Z" 
                fill="#3b2314" 
              />
              <path d="M -40,-35 Q -10,-45 20,-38" stroke="#5c3826" strokeWidth="3.5" strokeLinecap="round" fill="none" />

              {/* Alis Mata */}
              <path d="M -34,-10 Q -22,-18 -10,-10" stroke="#2c1810" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 10,-10 Q 22,-18 34,-10" stroke="#2c1810" strokeWidth="3.5" strokeLinecap="round" fill="none" />

              {/* Mata & Kedipan Alami */}
              {isBlinking ? (
                <>
                  <path d="M -30,6 Q -22,12 -14,6" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M 14,6 Q 22,12 30,6" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <circle cx="-22" cy="6" r="7.5" fill="#0f172a" />
                  <circle cx="-20" cy="3" r="2.5" fill="#ffffff" />
                  <circle cx="22" cy="6" r="7.5" fill="#0f172a" />
                  <circle cx="24" cy="3" r="2.5" fill="#ffffff" />
                </>
              )}

              {/* Kacamata Guru */}
              <rect x="-38" y="-7" width="32" height="28" rx="8" fill="rgba(255,255,255,0.22)" stroke="#78350f" strokeWidth="3.5" />
              <rect x="6" y="-7" width="32" height="28" rx="8" fill="rgba(255,255,255,0.22)" stroke="#78350f" strokeWidth="3.5" />
              <line x1="-6" y1="6" x2="6" y2="6" stroke="#78350f" strokeWidth="3.5" />
              <line x1="-38" y1="4" x2="-48" y2="6" stroke="#78350f" strokeWidth="3" />
              <line x1="38" y1="4" x2="48" y2="6" stroke="#78350f" strokeWidth="3" />

              {/* Hidung */}
              <path d="M -2,12 Q 0,20 6,18" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Pipi Hangat */}
              <ellipse cx="-34" cy="22" rx="7" ry="4" fill="#f87171" opacity="0.4" />
              <ellipse cx="34" cy="22" rx="7" ry="4" fill="#f87171" opacity="0.4" />

              {/* Mulut Berbicara */}
              {isMouthTalking ? (
                <ellipse cx="0" cy="34" rx="9" ry="7" fill="#991b1b" />
              ) : (
                <path d="M -10,33 Q 0,42 10,33" stroke="#991b1b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              )}
            </g>
          </svg>
        </div>
      )}

      {/* Label Badge Dosen */}
      <div className="mt-1 bg-emerald-950 text-emerald-100 text-xs font-bold px-3.5 py-1 rounded-full border border-emerald-400 shadow-md flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Dosen Kalkulus</span>
      </div>
    </div>
  );
});

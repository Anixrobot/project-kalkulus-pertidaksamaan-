import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ClassroomBackground } from "../components/ClassroomBackground";
import { TeacherCharacter } from "../components/TeacherCharacter";
import { Chalkboard } from "../components/Chalkboard";

export const Scene01_Opening: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const badgesY = interpolate(frame, [25, 45], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <ClassroomBackground>
        <div className="flex h-full w-full items-center justify-between px-16 py-8">
          {/* Karakter Guru di Kiri */}
          <div className="w-85 flex justify-center z-30">
            <TeacherCharacter
              pose="welcoming"
              speech="Halo semuanya! Selamat datang di kelas Kalkulus. Hari ini kita bedah tuntas Pertidaksamaan!"
            />
          </div>

          {/* Papan Tulis di Kanan */}
          <div className="flex-1 flex justify-center pl-8">
            <Chalkboard title="PERTIDAKSAMAAN" subtitle="Kalkulus • Pertemuan 03">
              <div 
                className="h-full flex flex-col justify-center items-center text-center px-8"
                style={{ opacity: titleOpacity }}
              >
                {/* Ikon Sambutan Kelas */}
                <div className="inline-flex items-center gap-2 bg-emerald-950/70 border border-emerald-500/40 px-5 py-2 rounded-full mb-6 text-emerald-300 font-mono text-sm shadow-md">
                  <span>🔔</span>
                  <span>Bel Kelas Berbunyi • Selamat Belajar!</span>
                </div>

                <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight leading-snug">
                  Materi Lengkap & Pembahasan Soal
                </h2>
                
                <p className="text-lg text-emerald-100 max-w-2xl mb-8 leading-relaxed font-sans">
                  Pelajari konsep dasar, sifat-sifat penting, grafik himpunan penyelesaian, hingga pertidaksamaan irasional secara visual dan mudah dipahami.
                </p>

                {/* 4 Kartu Topik Utama */}
                <div 
                  className="grid grid-cols-2 gap-4 w-full max-w-2xl font-mono text-left"
                  style={{ transform: `translateY(${badgesY}px)` }}
                >
                  <div className="bg-emerald-900/60 border border-emerald-500/40 p-4 rounded-xl flex items-center gap-3 shadow">
                    <span className="text-2xl">1️⃣</span>
                    <div>
                      <p className="text-xs text-emerald-300 uppercase font-bold">Topik 1</p>
                      <p className="text-white font-bold text-sm">Linier Satu Variabel</p>
                    </div>
                  </div>

                  <div className="bg-emerald-900/60 border border-emerald-500/40 p-4 rounded-xl flex items-center gap-3 shadow">
                    <span className="text-2xl">2️⃣</span>
                    <div>
                      <p className="text-xs text-emerald-300 uppercase font-bold">Topik 2</p>
                      <p className="text-white font-bold text-sm">Linier Dua Variabel</p>
                    </div>
                  </div>

                  <div className="bg-emerald-900/60 border border-emerald-500/40 p-4 rounded-xl flex items-center gap-3 shadow">
                    <span className="text-2xl">3️⃣</span>
                    <div>
                      <p className="text-xs text-emerald-300 uppercase font-bold">Topik 3</p>
                      <p className="text-white font-bold text-sm">Pertidaksamaan Kuadrat</p>
                    </div>
                  </div>

                  <div className="bg-emerald-900/60 border border-emerald-500/40 p-4 rounded-xl flex items-center gap-3 shadow">
                    <span className="text-2xl">4️⃣</span>
                    <div>
                      <p className="text-xs text-emerald-300 uppercase font-bold">Topik 4</p>
                      <p className="text-white font-bold text-sm">Pertidaksamaan Irasional</p>
                    </div>
                  </div>
                </div>

              </div>
            </Chalkboard>
          </div>
        </div>
      </ClassroomBackground>
    </AbsoluteFill>
  );
};


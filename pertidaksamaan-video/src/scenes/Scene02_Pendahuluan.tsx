import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ClassroomBackground } from "../components/ClassroomBackground";
import { TeacherCharacter } from "../components/TeacherCharacter";
import { Chalkboard } from "../components/Chalkboard";
import { MathText } from "../components/MathText";

export const Scene02_Pendahuluan: React.FC = () => {
  const frame = useCurrentFrame();

  const defOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });
  const symbolsScale = interpolate(frame, [20, 35], [0.9, 1], { extrapolateRight: "clamp" });
  const listOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <ClassroomBackground>
        <div className="flex h-full w-full items-center justify-between px-16 py-8">
          <div className="w-85 flex justify-center z-30">
            <TeacherCharacter
              pose="pointing"
              speech="Pertidaksamaan membandingkan 2 nilai. Ingat 5 simbol notasi dasarnya ya!"
            />
          </div>

          <div className="flex-1 flex justify-center pl-8">
            <Chalkboard title="APA ITU PERTIDAKSAMAAN?" subtitle="Konsep Dasar & Simbol">
              <div className="h-full flex flex-col justify-between py-2">
                
                {/* Kotak Definisi */}
                <div 
                  className="bg-emerald-950/70 border-l-4 border-yellow-400 p-5 rounded-xl shadow-md will-change-transform"
                  style={{ opacity: defOpacity }}
                >
                  <p className="text-xl text-emerald-100 font-sans leading-relaxed">
                    <span className="text-yellow-300 font-bold">Pertidaksamaan</span> adalah kalimat/pernyataan matematika yang menunjukkan <span className="underline decoration-emerald-400">perbandingan ukuran dua objek atau lebih</span>.
                  </p>
                </div>

                {/* Notasi Dasar Simbol Matematika */}
                <div 
                  className="bg-black/30 border border-emerald-500/40 p-5 rounded-2xl flex flex-col items-center will-change-transform"
                  style={{ transform: `scale(${symbolsScale})` }}
                >
                  <p className="text-xs uppercase tracking-widest text-emerald-300 font-mono mb-3 font-bold">
                    5 Notasi Dasar Pertidaksamaan
                  </p>
                  
                  <div className="flex justify-around items-center w-full gap-4 text-3xl font-bold">
                    <div className="bg-emerald-900/80 px-6 py-3 rounded-xl border border-emerald-400 text-yellow-300 flex flex-col items-center shadow-md">
                      <MathText math="<" />
                      <span className="text-xs font-sans text-gray-300 mt-1 font-normal">Kurang dari</span>
                    </div>

                    <div className="bg-emerald-900/80 px-6 py-3 rounded-xl border border-emerald-400 text-yellow-300 flex flex-col items-center shadow-md">
                      <MathText math="\le" />
                      <span className="text-xs font-sans text-gray-300 mt-1 font-normal">Kurang dari / sama</span>
                    </div>

                    <div className="bg-emerald-900/80 px-6 py-3 rounded-xl border border-emerald-400 text-yellow-300 flex flex-col items-center shadow-md">
                      <MathText math=">" />
                      <span className="text-xs font-sans text-gray-300 mt-1 font-normal">Lebih dari</span>
                    </div>

                    <div className="bg-emerald-900/80 px-6 py-3 rounded-xl border border-emerald-400 text-yellow-300 flex flex-col items-center shadow-md">
                      <MathText math="\ge" />
                      <span className="text-xs font-sans text-gray-300 mt-1 font-normal">Lebih dari / sama</span>
                    </div>

                    <div className="bg-emerald-900/80 px-6 py-3 rounded-xl border border-emerald-400 text-yellow-300 flex flex-col items-center shadow-md">
                      <MathText math="\ne" />
                      <span className="text-xs font-sans text-gray-300 mt-1 font-normal">Tidak sama</span>
                    </div>
                  </div>
                </div>

                {/* Jenis-jenis Pertidaksamaan */}
                <div 
                  className="bg-emerald-900/40 p-4 rounded-xl border border-emerald-500/30 will-change-transform"
                  style={{ opacity: listOpacity }}
                >
                  <p className="text-sm font-bold text-emerald-300 mb-2 font-mono">
                    📌 Jenis-Jenis Pertidaksamaan dalam Kalkulus:
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-sm font-mono text-gray-200">
                    <div className="bg-emerald-950/60 p-2 rounded border border-emerald-600/40">1. Linier 1 & 2 Variabel</div>
                    <div className="bg-emerald-950/60 p-2 rounded border border-emerald-600/40">2. Kuadrat</div>
                    <div className="bg-emerald-950/60 p-2 rounded border border-emerald-600/40">3. Irasional (Bentuk Akar)</div>
                    <div className="bg-emerald-950/60 p-2 rounded border border-emerald-600/40">4. Pecahan / Rasional</div>
                    <div className="bg-emerald-950/60 p-2 rounded border border-emerald-600/40 col-span-2">5. Nilai Mutlak (|x|)</div>
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

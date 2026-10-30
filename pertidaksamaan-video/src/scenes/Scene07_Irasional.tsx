import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ClassroomBackground } from "../components/ClassroomBackground";
import { TeacherCharacter } from "../components/TeacherCharacter";
import { Chalkboard } from "../components/Chalkboard";
import { MathText } from "../components/MathText";
import { NumberLine } from "../components/NumberLine";

export const Scene07_Irasional: React.FC = () => {
  const frame = useCurrentFrame();

  const ruleOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });
  const stepsOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });
  const lineOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <ClassroomBackground>
        <div className="flex h-full w-full items-center justify-between px-16 py-8">
          <div className="w-85 flex justify-center z-30">
            <TeacherCharacter
              pose="pointing"
              speech="Ingat syarat penting bentuk akar: angka di dalam akar tidak boleh negatif (f(x) ≥ 0)!"
            />
          </div>

          <div className="flex-1 flex justify-center pl-8">
            <Chalkboard title="PERTIDAKSAMAAN IRASIONAL" subtitle="Bentuk Akar & Contoh Soal 04">
              <div className="h-full flex flex-col justify-between py-1 font-mono">
                
                {/* Aturan Emas Bentuk Akar */}
                <div 
                  className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-500/40 flex justify-between items-center will-change-transform"
                  style={{ opacity: ruleOpacity }}
                >
                  <div>
                    <span className="text-xs text-yellow-300 font-bold uppercase">Aturan Emas Bentuk Akar:</span>
                    <p className="text-lg font-bold text-white mt-0.5">
                      Bentuk: <MathText math="\sqrt{f(x)} < c" /> <span className="text-sm font-normal text-emerald-200">(dengan c &gt; 0)</span>
                    </p>
                  </div>
                  <div className="bg-red-950/70 border border-red-500/50 px-3 py-1.5 rounded-lg text-xs text-red-200">
                    ⚠️ Syarat Terdefinisi: <MathText math="f(x) \ge 0" />
                  </div>
                </div>

                {/* 2 Langkah Penyelesaian: Contoh 04 */}
                <div className="grid grid-cols-2 gap-4 text-xs will-change-transform" style={{ opacity: stepsOpacity }}>
                  
                  {/* Syarat 1: Numerus Akar */}
                  <div className="bg-black/30 p-3.5 rounded-xl border border-emerald-600/30 space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-emerald-300 font-bold uppercase text-xs">
                        Langkah 1: Syarat Numerus
                      </p>
                      <span className="bg-emerald-800 text-xs px-2 py-0.5 rounded text-white font-bold">Syarat (i)</span>
                    </div>
                    <div className="space-y-1 text-gray-200">
                      <p>Soal: <MathText math="\sqrt{x - 4} - 2 < 0 \implies \sqrt{x - 4} < 2" /></p>
                      <p className="text-gray-300">Nilai di dalam akar harus <MathText math="\ge 0" />:</p>
                      <p className="text-yellow-200 font-bold"><MathText math="x - 4 \ge 0" /></p>
                      <p className="bg-emerald-900/60 p-1.5 rounded text-white font-bold">
                        Hasil (i): <MathText math="x \ge 4" />
                      </p>
                    </div>
                  </div>

                  {/* Syarat 2: Kuadratkan Ruas */}
                  <div className="bg-black/30 p-3.5 rounded-xl border border-emerald-600/30 space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-emerald-300 font-bold uppercase text-xs">
                        Langkah 2: Kuadratkan Kedua Ruas
                      </p>
                      <span className="bg-emerald-800 text-xs px-2 py-0.5 rounded text-white font-bold">Syarat (ii)</span>
                    </div>
                    <div className="space-y-1 text-gray-200">
                      <p>Hilangkan akar dengan menguadratkan:</p>
                      <p className="text-yellow-200 font-bold"><MathText math="(\sqrt{x - 4})^2 < 2^2 \implies x - 4 < 4" /></p>
                      <p className="text-gray-300">Tambahkan 4 kedua ruas:</p>
                      <p className="bg-emerald-900/60 p-1.5 rounded text-white font-bold">
                        Hasil (ii): <MathText math="x < 8" />
                      </p>
                    </div>
                  </div>

                </div>

                {/* Irisan Garis Bilangan & Solusi Akhir */}
                <div className="space-y-2 will-change-transform" style={{ opacity: lineOpacity }}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-emerald-300 font-bold uppercase">Irisan Solusi (i) dan (ii):</span>
                    <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded-full text-xs">
                      Himpunan Penyelesaian: <MathText math="\{x \mid 4 \le x < 8\}" />
                    </span>
                  </div>

                  <NumberLine
                    min={2}
                    max={10}
                    points={[
                      { value: 4, label: "x = 4 (≥)", isClosed: true },
                      { value: 8, label: "x = 8 (<)", isClosed: false },
                    ]}
                    intervals={[
                      { start: 4, end: 8, sign: "+", isSolution: true },
                    ]}
                  />
                </div>

              </div>
            </Chalkboard>
          </div>
        </div>
      </ClassroomBackground>
    </AbsoluteFill>
  );
};

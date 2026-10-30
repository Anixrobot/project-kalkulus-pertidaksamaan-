import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ClassroomBackground } from "../components/ClassroomBackground";
import { TeacherCharacter } from "../components/TeacherCharacter";
import { Chalkboard } from "../components/Chalkboard";
import { MathText } from "../components/MathText";
import { NumberLine } from "../components/NumberLine";

export const Scene06_Kuadrat: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });
  const stepsOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });
  const lineOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <ClassroomBackground>
        <div className="flex h-full w-full items-center justify-between px-16 py-8">
          <div className="w-85 flex justify-center z-30">
            <TeacherCharacter
              pose="explaining"
              speech="Faktorkan dulu jadi pembuat nol, lalu uji x = 0 untuk tahu tanda intervalnya!"
            />
          </div>

          <div className="flex-1 flex justify-center pl-8">
            <Chalkboard title="PERTIDAKSAMAAN KUADRAT" subtitle="Faktorisasi, Titik Uji & Garis Bilangan">
              <div className="h-full flex flex-col justify-between py-1 font-mono">
                
                {/* Header Soal Contoh 03 */}
                <div 
                  className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-500/40 flex justify-between items-center will-change-transform"
                  style={{ opacity: titleOpacity }}
                >
                  <div>
                    <span className="text-xs text-yellow-300 font-bold uppercase">Contoh Soal 03:</span>
                    <p className="text-xl font-bold text-white mt-0.5">
                      Tentukan HP dari: <MathText math="3x^2 - 2x \ge 8" />
                    </p>
                  </div>
                  <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-emerald-600/40 text-xs text-emerald-300">
                    Bentuk: <MathText math="ax^2 + bx + c \ge 0" />
                  </div>
                </div>

                {/* Langkah-Langkah Penyelesaian Berjajar */}
                <div className="grid grid-cols-2 gap-4 text-xs will-change-transform" style={{ opacity: stepsOpacity }}>
                  
                  {/* Langkah 1: Pembuat Nol */}
                  <div className="bg-black/30 p-3.5 rounded-xl border border-emerald-600/30 space-y-2">
                    <p className="text-emerald-300 font-bold uppercase text-xs">
                      1. Cari Akar Pembuat Nol
                    </p>
                    <div className="space-y-1 text-gray-200">
                      <p>Ubah ke bentuk standar:</p>
                      <p className="text-yellow-200 font-bold"><MathText math="3x^2 - 2x - 8 = 0" /></p>
                      <p>Faktorkan persamaan kuadrat:</p>
                      <p className="text-emerald-300 font-bold"><MathText math="(3x + 4)(x - 2) = 0" /></p>
                      <p className="bg-emerald-900/60 p-1.5 rounded text-white font-bold">
                        Didapat: <MathText math="x_1 = -\frac{4}{3}" /> atau <MathText math="x_2 = 2" />
                      </p>
                    </div>
                  </div>

                  {/* Langkah 2: Uji Titik */}
                  <div className="bg-black/30 p-3.5 rounded-xl border border-emerald-600/30 space-y-2">
                    <p className="text-emerald-300 font-bold uppercase text-xs">
                      2. Uji Titik Interval (Gunakan x = 0)
                    </p>
                    <div className="space-y-1 text-gray-200">
                      <p>Substitusikan <MathText math="x = 0" /> ke pertidaksamaan:</p>
                      <p className="text-yellow-200 font-bold"><MathText math="3(0)^2 - 2(0) \ge 8 \implies 0 \ge 8" /></p>
                      <p className="bg-red-950/70 border border-red-500/50 p-1.5 rounded text-red-200 font-bold">
                        Hasil: FALSE ❌ (Daerah interval nol bertanda negatif)
                      </p>
                      <p className="text-gray-300 text-xs">
                        Karena tanda soal adalah <MathText math="\ge" /> (positif), maka ambil daerah bertanda positif (+)!
                      </p>
                    </div>
                  </div>

                </div>

                {/* Garis Bilangan & Solusi Akhir */}
                <div className="space-y-2 will-change-transform" style={{ opacity: lineOpacity }}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-emerald-300 font-bold uppercase">Garis Bilangan Tanda Interval (+, -, +):</span>
                    <span className="bg-emerald-600 text-white font-bold px-3 py-0.5 rounded-full text-xs">
                      Solusi: <MathText math="x \le -\frac{4}{3} \quad \text{atau} \quad x \ge 2" />
                    </span>
                  </div>

                  <NumberLine
                    min={-3}
                    max={3}
                    points={[
                      { value: -1.33, label: "-4/3", isClosed: true },
                      { value: 2, label: "2", isClosed: true },
                    ]}
                    intervals={[
                      { end: -1.33, sign: "+", isSolution: true },
                      { start: -1.33, end: 2, sign: "-" },
                      { start: 2, sign: "+", isSolution: true },
                    ]}
                    testPoint={{ value: 0, result: "0 ≥ 8 (FALSE)" }}
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

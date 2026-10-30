import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ClassroomBackground } from "../components/ClassroomBackground";
import { TeacherCharacter } from "../components/TeacherCharacter";
import { Chalkboard } from "../components/Chalkboard";
import { MathText } from "../components/MathText";
import { NumberLine } from "../components/NumberLine";

export const Scene04_LinierSatuVariabel: React.FC = () => {
  const frame = useCurrentFrame();

  const theoryOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });
  const exampleA = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });
  const exampleB = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });
  const exampleC = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <ClassroomBackground>
        <div className="flex h-full w-full items-center justify-between px-16 py-8">
          <div className="w-85 flex justify-center z-30">
            <TeacherCharacter
              pose="pointing"
              speech="Lihat contoh (c)! Koefisien x bernilai negatif (-2), jadi tandanya berbalik dari ≤ menjadi ≥!"
            />
          </div>

          <div className="flex-1 flex justify-center pl-8">
            <Chalkboard title="LINIER SATU VARIABEL" subtitle="Bentuk Umum & Contoh Soal 01">
              <div className="h-full flex flex-col justify-between py-1">
                
                {/* Bentuk Umum */}
                <div 
                  className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-500/40 flex justify-between items-center will-change-transform"
                  style={{ opacity: theoryOpacity }}
                >
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold font-mono">Bentuk Umum:</span>
                    <div className="text-xl text-yellow-300 font-bold mt-0.5">
                      <MathText math="ax + b < c \quad \text{atau} \quad ax + b \ge c \quad (a \ne 0)" />
                    </div>
                  </div>
                  <div className="text-right text-xs font-mono text-gray-300">
                    <p><b className="text-emerald-300">a</b>: koefisien | <b className="text-emerald-300">x</b>: variabel</p>
                    <p><b className="text-emerald-300">b, c</b>: konstanta</p>
                  </div>
                </div>

                {/* 3 Contoh Soal */}
                <div className="grid grid-cols-3 gap-3">
                  
                  {/* Contoh A */}
                  <div 
                    className="bg-black/30 p-3.5 rounded-xl border border-emerald-600/40 font-mono flex flex-col justify-between will-change-transform"
                    style={{ opacity: exampleA }}
                  >
                    <div>
                      <span className="bg-emerald-800 text-emerald-200 text-xs px-2 py-0.5 rounded font-bold">Contoh (a)</span>
                      <p className="text-base text-yellow-200 font-bold mt-2">
                        <MathText math="x + 3 > 4" />
                      </p>
                      <div className="mt-2 text-xs text-gray-200 space-y-1">
                        <p>Kurangkan 3 kedua ruas:</p>
                        <p className="text-emerald-300"><MathText math="x + 3 - 3 > 4 - 3" /></p>
                      </div>
                    </div>
                    <div className="mt-3 bg-emerald-900/80 p-2 rounded text-center border border-emerald-400">
                      <span className="text-xs text-gray-300 block">Solusi:</span>
                      <span className="text-base font-bold text-yellow-300"><MathText math="x > 1" /></span>
                    </div>
                  </div>

                  {/* Contoh B */}
                  <div 
                    className="bg-black/30 p-3.5 rounded-xl border border-emerald-600/40 font-mono flex flex-col justify-between will-change-transform"
                    style={{ opacity: exampleB }}
                  >
                    <div>
                      <span className="bg-emerald-800 text-emerald-200 text-xs px-2 py-0.5 rounded font-bold">Contoh (b)</span>
                      <p className="text-base text-yellow-200 font-bold mt-2">
                        <MathText math="5x < 40" />
                      </p>
                      <div className="mt-2 text-xs text-gray-200 space-y-1">
                        <p>Bagi kedua ruas dengan 5:</p>
                        <p className="text-emerald-300"><MathText math="5x \cdot \frac{1}{5} < 40 \cdot \frac{1}{5}" /></p>
                      </div>
                    </div>
                    <div className="mt-3 bg-emerald-900/80 p-2 rounded text-center border border-emerald-400">
                      <span className="text-xs text-gray-300 block">Solusi:</span>
                      <span className="text-base font-bold text-yellow-300"><MathText math="x < 8" /></span>
                    </div>
                  </div>

                  {/* Contoh C - Negative Flip */}
                  <div 
                    className="bg-black/30 p-3.5 rounded-xl border-2 border-red-500/60 font-mono flex flex-col justify-between will-change-transform"
                    style={{ opacity: exampleC }}
                  >
                    <div>
                      <span className="bg-red-700 text-white text-xs px-2 py-0.5 rounded font-bold">Contoh (c) ⚠️</span>
                      <p className="text-base text-yellow-200 font-bold mt-2">
                        <MathText math="-2x \le 6" />
                      </p>
                      <div className="mt-2 text-xs text-gray-200 space-y-1">
                        <p>Kali dengan <MathText math="-\frac{1}{2}" /> (balik tanda!):</p>
                        <p className="text-red-300 font-bold"><MathText math="-2x(-\frac{1}{2}) \ge 6(-\frac{1}{2})" /></p>
                      </div>
                    </div>
                    <div className="mt-3 bg-red-950/80 p-2 rounded text-center border border-red-400">
                      <span className="text-xs text-gray-300 block">Solusi:</span>
                      <span className="text-base font-bold text-yellow-300"><MathText math="x \ge -3" /></span>
                    </div>
                  </div>

                </div>

                {/* Garis Bilangan untuk Contoh (c) */}
                <div style={{ opacity: exampleC }} className="will-change-transform">
                  <p className="text-xs text-emerald-300 font-mono mb-1">
                    Visual Garis Bilangan untuk Contoh (c) : <MathText math="x \ge -3" />
                  </p>
                  <NumberLine
                    min={-4}
                    max={4}
                    points={[{ value: -3, label: "x = -3", isClosed: true }]}
                    intervals={[{ start: -3, sign: "+", isSolution: true }]}
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

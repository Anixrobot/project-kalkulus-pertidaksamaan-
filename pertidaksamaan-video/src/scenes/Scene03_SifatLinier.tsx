import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ClassroomBackground } from "../components/ClassroomBackground";
import { TeacherCharacter } from "../components/TeacherCharacter";
import { Chalkboard } from "../components/Chalkboard";
import { MathText } from "../components/MathText";

export const Scene03_SifatLinier: React.FC = () => {
  const frame = useCurrentFrame();

  const card1Opacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });
  const card2Opacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });
  const card3Opacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <ClassroomBackground>
        <div className="flex h-full w-full items-center justify-between px-16 py-8">
          <div className="w-85 flex justify-center z-30">
            <TeacherCharacter
              pose="explaining"
              speech="Perhatian khusus nomor 2! Kalau dikali atau dibagi bilangan negatif, tandanya WAJIB dibalik!"
            />
          </div>

          <div className="flex-1 flex justify-center pl-8">
            <Chalkboard title="SIFAT-SIFAT PERTIDAKSAMAAN" subtitle="Aturan Main Operasi Aljabar">
              <div className="h-full flex flex-col justify-around py-1 font-sans">
                
                {/* Sifat 1 */}
                <div 
                  className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-500/40 flex items-start gap-4 shadow will-change-transform"
                  style={{ opacity: card1Opacity }}
                >
                  <div className="text-3xl">✅</div>
                  <div>
                    <h3 className="text-lg font-bold text-yellow-300">1. Penjumlahan & Pengurangan: Tanda Tetap</h3>
                    <p className="text-sm text-gray-200 mt-1">
                      Menambah atau mengurang kedua ruas dengan bilangan yang sama <span className="text-emerald-300 font-semibold">TIDAK mengubah</span> arah tanda pertidaksamaan.
                    </p>
                    <div className="mt-2 text-xs font-mono bg-black/40 px-3 py-1 rounded inline-block text-emerald-200">
                      Contoh: <MathText math="a < b \iff a + c < b + c" />
                    </div>
                  </div>
                </div>

                {/* Sifat 2 - Peringatan Negatif */}
                <div 
                  className="bg-red-950/60 p-4 rounded-xl border-2 border-red-500 flex items-start gap-4 shadow-lg will-change-transform"
                  style={{ opacity: card2Opacity }}
                >
                  <div className="text-3xl">⚠️</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-red-200">2. Perkalian / Pembagian Bilangan NEGATIF:</h3>
                      <span className="bg-red-600 text-white text-xs font-black uppercase px-2 py-0.5 rounded">TANDA DIBALIK!</span>
                    </div>
                    <p className="text-sm text-gray-100 mt-1">
                      Jika kedua ruas dikalikan atau dibagi dengan bilangan negatif, <span className="underline font-bold text-yellow-300">arah tanda pertidaksamaan harus berbalik</span>!
                    </p>
                    <div className="mt-2 flex gap-4 text-xs font-mono">
                      <div className="bg-black/50 px-3 py-1 rounded text-red-200">
                        <MathText math="a < b \xrightarrow{\times (-1)} -a > -b" />
                      </div>
                      <div className="bg-black/50 px-3 py-1 rounded text-yellow-200">
                        <MathText math="-2x \le 6 \implies x \ge -3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sifat Pangkat */}
                <div 
                  className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-500/40 flex items-start gap-4 shadow will-change-transform"
                  style={{ opacity: card3Opacity }}
                >
                  <div className="text-3xl">📐</div>
                  <div>
                    <h3 className="text-lg font-bold text-yellow-300">3. Sifat Perpangkatan</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-xs font-mono text-gray-200">
                      <div className="bg-black/40 p-2.5 rounded border border-emerald-700/50">
                        <p className="text-emerald-300 font-bold mb-1">Jika <MathText math="a > b" /> (positif):</p>
                        <p>• <MathText math="a^n > b^n" /></p>
                        <p>• <MathText math="a^{-n} < b^{-n}" /> (pangkat negatif membalik tanda)</p>
                      </div>
                      <div className="bg-black/40 p-2.5 rounded border border-emerald-700/50">
                        <p className="text-emerald-300 font-bold mb-1">Jika <MathText math="a < b" /> (keduanya negatif):</p>
                        <p>• <MathText math="n" /> genap: <MathText math="a^n > b^n" /> (contoh: <MathText math="(-3)^2 > (-2)^2" />)</p>
                        <p>• <MathText math="n" /> ganjil: <MathText math="a^n < b^n" /></p>
                      </div>
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

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ClassroomBackground } from "../components/ClassroomBackground";
import { TeacherCharacter } from "../components/TeacherCharacter";
import { Chalkboard } from "../components/Chalkboard";
import { MathText } from "../components/MathText";
import { CartesianGraph } from "../components/CartesianGraph";

export const Scene05_LinierDuaVariabel: React.FC = () => {
  const frame = useCurrentFrame();

  const leftOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });
  const graphOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <ClassroomBackground>
        <div className="flex h-full w-full items-center justify-between px-16 py-8">
          <div className="w-85 flex justify-center z-30">
            <TeacherCharacter
              pose="pointing"
              speech="Untuk 2 variabel, cari titik potong sumbu X & Y, lalu uji titik (0,0) untuk menentukan daerah arsiran!"
            />
          </div>

          <div className="flex-1 flex justify-center pl-8">
            <Chalkboard title="LINIER DUA VARIABEL" subtitle="Sistem Koordinat Kartesius & Contoh 02">
              <div className="h-full flex gap-6 items-center py-2">
                
                {/* Kolom Kiri: Penjelasan Langkah & Perhitungan */}
                <div className="w-1/2 flex flex-col justify-between h-full font-mono text-sm will-change-transform" style={{ opacity: leftOpacity }}>
                  
                  {/* Soal */}
                  <div className="bg-emerald-950/70 p-4 rounded-xl border border-emerald-500/40">
                    <span className="text-xs text-yellow-300 uppercase font-bold">Soal Contoh 02:</span>
                    <p className="text-xl font-bold text-white mt-1">
                      Tentukan daerah HP dari: <MathText math="4x + 8y \ge 16" />
                    </p>
                  </div>

                  {/* Langkah 1: Titik Potong */}
                  <div className="bg-black/30 p-3.5 rounded-xl border border-emerald-600/30 space-y-2">
                    <p className="text-emerald-300 font-bold text-xs uppercase">
                      Langkah 1: Cari Titik Potong Sumbu
                    </p>
                    <div className="text-xs space-y-1 text-gray-200">
                      <p>• Jika <MathText math="x = 0 \implies 8y = 16 \implies y = 2" /></p>
                      <p className="text-yellow-300 font-bold ml-3">Titik A = (0, 2)</p>
                      <p>• Jika <MathText math="y = 0 \implies 4x = 16 \implies x = 4" /></p>
                      <p className="text-yellow-300 font-bold ml-3">Titik B = (4, 0)</p>
                    </div>
                  </div>

                  {/* Langkah 2: Uji Titik (0,0) */}
                  <div className="bg-black/30 p-3.5 rounded-xl border border-red-500/40 space-y-2">
                    <p className="text-red-300 font-bold text-xs uppercase">
                      Langkah 2: Uji Titik Uji (0, 0)
                    </p>
                    <div className="text-xs text-gray-200 space-y-1">
                      <p>Substitusikan <MathText math="(0,0)" /> ke pertidaksamaan:</p>
                      <p className="text-yellow-200"><MathText math="4(0) + 8(0) \ge 16 \implies 0 \ge 16" /></p>
                      <p className="text-red-400 font-bold text-xs bg-red-950/50 p-1.5 rounded inline-block">
                        ❌ FALSE (Salah! 0 tidak lebih besar dari 16)
                      </p>
                    </div>
                  </div>

                  {/* Kesimpulan */}
                  <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-400 text-xs">
                    <span className="text-emerald-200 font-bold">🎯 Kesimpulan HP:</span>
                    <p className="text-white mt-0.5">
                      Karena (0,0) salah, maka daerah penyelesaian adalah <b className="text-yellow-300">di atas garis</b> (menjauhi titik 0,0).
                    </p>
                  </div>

                </div>

                {/* Kolom Kanan: Visual Grafik Kartesius */}
                <div className="w-1/2 flex flex-col items-center justify-center will-change-transform" style={{ opacity: graphOpacity }}>
                  <p className="text-xs font-mono text-emerald-300 font-bold uppercase mb-2">
                    Visual Grafik Sistem Koordinat:
                  </p>
                  <CartesianGraph />
                </div>

              </div>
            </Chalkboard>
          </div>
        </div>
      </ClassroomBackground>
    </AbsoluteFill>
  );
};

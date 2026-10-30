import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ClassroomBackground } from "../components/ClassroomBackground";
import { TeacherCharacter } from "../components/TeacherCharacter";
import { Chalkboard } from "../components/Chalkboard";

export const Scene08_Penutup: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });
  const tipsOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });
  const footerScale = interpolate(frame, [35, 50], [0.92, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <ClassroomBackground>
        <div className="flex h-full w-full items-center justify-between px-16 py-8">
          <div className="w-85 flex justify-center z-30">
            <TeacherCharacter
              pose="welcoming"
              speech="Luar biasa! Kalian sudah menguasai seluruh konsep pertidaksamaan. Jangan lupa kerjakan tugas mandirinya ya!"
            />
          </div>

          <div className="flex-1 flex justify-center pl-8">
            <Chalkboard title="RANGKUMAN & KESIMPULAN" subtitle="Kalkulus • Pertemuan 03 Selesai">
              <div className="h-full flex flex-col justify-between py-2 font-sans">
                
                {/* Judul Selamat */}
                <div className="text-center will-change-transform" style={{ opacity: titleOpacity }}>
                  <span className="text-3xl">🎉</span>
                  <h2 className="text-2xl font-black text-white mt-1">
                    4 Kunci Emas Sukses Menghitung Pertidaksamaan
                  </h2>
                </div>

                {/* 4 Poin Rangkuman */}
                <div className="grid grid-cols-2 gap-3.5 text-xs font-mono will-change-transform" style={{ opacity: tipsOpacity }}>
                  
                  <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-500/40 shadow flex gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <p className="text-yellow-300 font-bold">1. Awas Bilangan Negatif</p>
                      <p className="text-gray-200 mt-1">
                        Jika dikali atau dibagi bilangan negatif, arah tanda pertidaksamaan wajib dibalik!
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-500/40 shadow flex gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="text-yellow-300 font-bold">2. Dua Variabel (Kartesius)</p>
                      <p className="text-gray-200 mt-1">
                        Cari titik potong sumbu x & y, gambar garis, dan gunakan titik uji (0,0) untuk menentukan arsiran.
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-500/40 shadow flex gap-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="text-yellow-300 font-bold">3. Kuadrat (Parabola)</p>
                      <p className="text-gray-200 mt-1">
                        Faktorkan menjadi akar pembuat nol, lalu uji satu titik untuk menentukan tanda interval (+ / -).
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-500/40 shadow flex gap-3">
                    <span className="text-2xl">🔍</span>
                    <div>
                      <p className="text-yellow-300 font-bold">4. Bentuk Akar (Irasional)</p>
                      <p className="text-gray-200 mt-1">
                        Jangan pernah lupa syarat numerus: ekspresi di dalam akar selalu harus lebih besar atau sama dengan nol!
                      </p>
                    </div>
                  </div>

                </div>

                {/* Kotak Tugas Mandiri & Closing */}
                <div 
                  className="bg-emerald-900/60 border-2 border-emerald-400 p-4 rounded-2xl flex items-center justify-between shadow-xl will-change-transform"
                  style={{ transform: `scale(${footerScale})` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📝</span>
                    <div>
                      <p className="text-yellow-300 font-bold text-sm">Tugas Mandiri Mahasiswa:</p>
                      <p className="text-xs text-emerald-100 font-mono">
                        • Latihan-5: Penyelesaian Pertidaksamaan Linier<br />
                        • Latihan-6: Penyelesaian Pertidaksamaan Kuadrat
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="bg-yellow-400 text-yellow-950 font-black text-xs px-4 py-2 rounded-xl shadow-md uppercase tracking-wider block">
                      Semangat Belajar! ✨
                    </span>
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

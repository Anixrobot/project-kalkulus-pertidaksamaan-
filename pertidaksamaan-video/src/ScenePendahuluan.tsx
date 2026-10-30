import { AbsoluteFill, interpolate, useCurrentFrame, delayRender, continueRender, staticFile } from "remotion";
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { useEffect, useState } from "react";

export const ScenePendahuluan: React.FC = () => {
  const frame = useCurrentFrame();

  const [handle] = useState(() => delayRender());
  const [animationData, setAnimationData] = useState<LottieAnimationData | null>(null);

  useEffect(() => {
    fetch(staticFile("teacher.json"))
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error(`Failed to load teacher.json: ${res.statusText}`);
        }
        return res.json() as Promise<LottieAnimationData>;
      })
      .then((data: LottieAnimationData) => {
        setAnimationData(data);
        continueRender(handle);
      })
      .catch((err) => {
        console.warn("Could not load teacher.json, using fallback placeholder.", err);
        continueRender(handle);
      });
  }, [handle]);
  
  // Animasi fade in & slide up untuk container
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-emerald-50 flex flex-row items-center justify-center p-10 font-sans">
      
      {/* Karakter Kartun (Lottie) */}
      <div className="w-1/3 flex justify-center transform scale-110">
        {animationData ? (
          <Lottie 
            animationData={animationData} 
            style={{ width: 400, height: 400 }} 
          />
        ) : (
          <div className="w-100 h-100 flex flex-col items-center justify-center border-2 border-dashed border-emerald-400 rounded-3xl bg-white/70 p-6 text-center shadow-lg">
            <span className="text-6xl mb-4">👨‍🏫</span>
            <p className="font-semibold text-lg text-emerald-800">Animasi Guru (Lottie)</p>
            <p className="text-xs text-gray-500 mt-2">
              Taruh file <code className="bg-gray-100 px-1 py-0.5 rounded text-emerald-700">teacher.json</code> di dalam folder <code className="bg-gray-100 px-1 py-0.5 rounded text-emerald-700">public/</code>
            </p>
          </div>
        )}
      </div>

      {/* Papan Materi (Warna Hijau) */}
      <div 
        style={{ opacity, transform: `translateY(${translateY}px)` }}
        className="w-2/3 bg-white p-10 rounded-3xl shadow-xl border-l-8 border-emerald-500"
      >
        <h1 className="text-4xl font-bold text-emerald-800 mb-6">
          Apa itu Pertidaksamaan?
        </h1>
        
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Pertidaksamaan dalam matematika adalah kalimat/pernyataan matematika yang menunjukkan perbandingan ukuran dua objek atau lebih.
        </p>

        <div className="bg-emerald-100 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
            Notasi Dasar:
          </h2>
          <div className="flex gap-6 text-3xl text-emerald-700">
             <InlineMath math="<" />
             <InlineMath math="\le" />
             <InlineMath math=">" />
             <InlineMath math="\ge" />
             <InlineMath math="\ne" />
          </div>
        </div>
      </div>

    </AbsoluteFill>
  );
};


import React, { useEffect, useState } from "react";
import { delayRender, continueRender } from "remotion";
import { Lottie as RemotionLottie, LottieAnimationData } from "@remotion/lottie";

export interface LottieProps {
  src?: string;
  animationData?: LottieAnimationData | null;
  className?: string;
  style?: React.CSSProperties;
  playbackRate?: number;
  loop?: boolean;
  fallback?: React.ReactNode;
}

/**
 * Komponen Lottie yang mendukung pemuatan dinamis via `src={staticFile("nama_file.json")}`
 * dengan integrasi `delayRender` & graceful fallback jika aset belum diunggah.
 */
export const Lottie: React.FC<LottieProps> = ({
  src,
  animationData: directData,
  className,
  style,
  playbackRate = 1,
  loop = true,
  fallback,
}) => {
  const [data, setData] = useState<LottieAnimationData | null>(directData || null);

  useEffect(() => {
    if (directData) {
      setData(directData);
      return;
    }
    if (!src) return;

    const handle = delayRender(`Loading Lottie from ${src}`);
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json() as Promise<LottieAnimationData>;
      })
      .then((json) => {
        setData(json);
        continueRender(handle);
      })
      .catch((err) => {
        // Fallback aman jika file Lottie belum tersedia di folder public
        console.warn(`Lottie ${src} tidak ditemukan atau gagal dimuat, menggunakan fallback visual:`, err);
        continueRender(handle);
      });
  }, [src, directData]);

  if (!data) {
    return fallback ? <div className={className} style={style}>{fallback}</div> : null;
  }

  return (
    <div className={className} style={style}>
      <RemotionLottie
        animationData={data}
        playbackRate={playbackRate}
        loop={loop}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

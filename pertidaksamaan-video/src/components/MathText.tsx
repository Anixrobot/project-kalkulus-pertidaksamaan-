import React, { memo } from "react";
import { InlineMath, BlockMath } from "react-katex";

export interface MathTextProps {
  math: string;
  block?: boolean;
  className?: string;
}

/**
 * Komponen MathText ter-memoize untuk mencegah re-evaluasi KaTeX berlebih.
 */
export const MathText = memo<MathTextProps>(({ math, block = false, className = "" }) => {
  return (
    <span className={`inline-block font-normal ${className}`}>
      {block ? <BlockMath math={math} /> : <InlineMath math={math} />}
    </span>
  );
});

/**
 * Kotak Rumus Kapur Papan Tulis (Chalkboard Formula Box)
 */
export const ChalkBox: React.FC<{
  title?: string;
  math: string;
  badge?: string;
  highlight?: string;
  className?: string;
}> = memo(({ title, math, badge, highlight, className = "" }) => {
  return (
    <div
      className={`bg-[#0d2a1b]/85 border-2 border-[#34d399]/70 rounded-xl p-4 shadow-xl backdrop-blur-sm relative overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        {title && <span className="text-xs uppercase tracking-widest text-[#6ee7b7] font-mono font-bold">{title}</span>}
        {badge && (
          <span className="text-[10px] uppercase font-bold bg-[#065f46] text-[#a7f3d0] px-2.5 py-0.5 rounded-full border border-[#10b981]/50">
            {badge}
          </span>
        )}
      </div>

      <div className="text-xl md:text-2xl text-yellow-300 font-mono text-center my-2 drop-shadow">
        <MathText math={math} block />
      </div>

      {highlight && (
        <div className="text-xs text-center text-emerald-200 font-sans mt-2 border-t border-emerald-700/40 pt-1.5 font-semibold">
          💡 {highlight}
        </div>
      )}
    </div>
  );
});

/**
 * Tabel Uji Tanda Pecahan Rasional
 */
export const SignTableBox: React.FC<{ className?: string }> = memo(({ className = "" }) => {
  return (
    <div className={`w-full bg-[#0a2316]/90 border border-emerald-500/50 rounded-xl p-3 shadow-xl ${className}`}>
      <div className="text-xs font-mono text-emerald-300 font-bold uppercase mb-2 text-center">
        Tabel Uji Tanda Interval Rasional
      </div>
      <table className="w-full text-xs font-mono text-center border-collapse">
        <thead>
          <tr className="border-b border-emerald-600/60 text-yellow-300">
            <th className="p-1.5">Interval</th>
            <th className="p-1.5">Titik Uji (x)</th>
            <th className="p-1.5">Tanda f(x)</th>
            <th className="p-1.5">Status Solusi</th>
          </tr>
        </thead>
        <tbody className="text-gray-200 divide-y divide-emerald-800/40">
          <tr>
            <td className="p-1.5">(-∞, -1)</td>
            <td className="p-1.5 text-sky-300">x = -2</td>
            <td className="p-1.5 font-bold text-emerald-400">(+) Positif</td>
            <td className="p-1.5 text-emerald-300 font-bold">✅ Memenuhi</td>
          </tr>
          <tr>
            <td className="p-1.5">(-1, 2)</td>
            <td className="p-1.5 text-sky-300">x = 0</td>
            <td className="p-1.5 font-bold text-red-400">(-) Negatif</td>
            <td className="p-1.5 text-red-300">❌ Tidak Memenuhi</td>
          </tr>
          <tr>
            <td className="p-1.5">[2, ∞)</td>
            <td className="p-1.5 text-sky-300">x = 3</td>
            <td className="p-1.5 font-bold text-emerald-400">(+) Positif</td>
            <td className="p-1.5 text-emerald-300 font-bold">✅ Memenuhi</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

/**
 * Tabel Rumus Cepat Nilai Mutlak
 */
export const MutlakTableBox: React.FC<{ className?: string }> = memo(({ className = "" }) => {
  return (
    <div className={`w-full bg-[#0a2316]/90 border border-emerald-500/50 rounded-xl p-3 shadow-xl ${className}`}>
      <div className="text-xs font-mono text-yellow-300 font-bold uppercase mb-2 text-center">
        Tabel Rumus Cepat Pertidaksamaan Nilai Mutlak
      </div>
      <table className="w-full text-xs font-mono border-collapse">
        <thead>
          <tr className="border-b border-emerald-600/60 text-emerald-300 text-center">
            <th className="p-1.5 text-left">Bentuk Dasar</th>
            <th className="p-1.5 text-left">Ekuivalen Aljabar</th>
            <th className="p-1.5">Sifat Interval</th>
          </tr>
        </thead>
        <tbody className="text-gray-200 divide-y divide-emerald-800/40">
          <tr>
            <td className="p-1.5 text-yellow-200 font-bold">
              <MathText math="|f(x)| < a" />
            </td>
            <td className="p-1.5 text-white">
              <MathText math="-a < f(x) < a" />
            </td>
            <td className="p-1.5 text-center text-emerald-300 font-bold">Mengumpul (Tengah)</td>
          </tr>
          <tr>
            <td className="p-1.5 text-yellow-200 font-bold">
              <MathText math="|f(x)| > a" />
            </td>
            <td className="p-1.5 text-white">
              <MathText math="f(x) < -a \text{ atau } f(x) > a" />
            </td>
            <td className="p-1.5 text-center text-amber-300 font-bold">Memencar (Sayap)</td>
          </tr>
          <tr>
            <td className="p-1.5 text-yellow-200 font-bold">
              <MathText math="|f(x)| < |g(x)|" />
            </td>
            <td className="p-1.5 text-white">
              <MathText math="(f(x)+g(x))(f(x)-g(x)) < 0" />
            </td>
            <td className="p-1.5 text-center text-sky-300 font-bold">Selisih Kuadrat</td>
          </tr>
          <tr>
            <td className="p-1.5 text-red-300 font-bold">
              <MathText math="|f(x)| < -c \; (c>0)" />
            </td>
            <td className="p-1.5 text-red-200">
              <MathText math="\emptyset \; (\text{Himpunan Kosong})" />
            </td>
            <td className="p-1.5 text-center text-red-400 font-bold">Tidak Ada Solusi</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

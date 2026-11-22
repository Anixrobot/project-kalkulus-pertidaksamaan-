import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export interface MathFormulaProps {
  math: string;
  displayMode?: boolean;
  color?: string;
  fontSize?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Komponen MathFormula V4.0
 * Merender rumus matematika secara sinkron dan instan menggunakan katex.renderToString().
 * Mendukung Dark Mode Slate theme dan ter-memoize untuk mencegah re-evaluasi tak perlu.
 */
export const MathFormula: React.FC<MathFormulaProps> = React.memo(({
  math,
  displayMode = false,
  color = '#f8fafc',
  fontSize,
  className = '',
  style = {},
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode,
        throwOnError: false,
      });
    } catch (err) {
      console.error('KaTeX render error:', err);
      return `<span style="color:#f43f5e;">${math}</span>`;
    }
  }, [math, displayMode]);

  return (
    <span
      className={`inline-block select-none ${className}`}
      style={{
        color,
        fontSize,
        lineHeight: 1.3,
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

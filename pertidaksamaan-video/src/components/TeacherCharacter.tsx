import React from 'react';
import { CHARACTERS_INFO } from '../data/scenesData';

export const TeacherCharacter: React.FC<{
  type: 'ikhsan' | 'rafie' | 'pras' | 'dimas';
  isSpeaking?: boolean;
  isActive?: boolean;
  frame?: number;
}> = ({ type = 'rafie', isSpeaking = true, isActive = true, frame = 0 }) => {
  const safeType = CHARACTERS_INFO[type] ? type : 'rafie';
  const info = CHARACTERS_INFO[safeType];

  const mouthOpen = isSpeaking ? Math.abs(Math.sin(frame * 0.45)) * 5 + 2 : 1.5;
  const armWave = isSpeaking ? Math.sin(frame * 0.2) * 3 : 0;

  const skinColor =
    safeType === 'pras' ? '#c68652' : safeType === 'dimas' ? '#cc8e59' : '#f1b88a';
  const bodyWidth = safeType === 'dimas' ? 88 : 74;
  const bodyX = 100 - bodyWidth / 2;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        userSelect: 'none'
      }}
    >
      <div
        style={{
          marginBottom: 4,
          padding: '2px 10px',
          borderRadius: 6,
          fontWeight: 900,
          fontSize: 13,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          backgroundColor: isActive ? 'rgba(2, 6, 23, 0.92)' : 'rgba(15, 23, 42, 0.75)',
          color: isActive ? '#ffffff' : '#cbd5e1',
          border: isActive ? '2px solid #ffffff' : '1px solid #475569',
          boxShadow: '0 6px 14px rgba(0,0,0,0.35)'
        }}
      >
        {info.name}
      </div>

      <svg
        viewBox="0 0 200 320"
        style={{ width: '100%', height: '100%', maxHeight: 295, overflow: 'visible' }}
      >
        <ellipse cx="100" cy="308" rx="48" ry="8" fill="rgba(0,0,0,0.28)" />

        <rect x={100 - bodyWidth * 0.38} y="205" width="24" height="88" rx="6" fill="#293548" stroke="#0f172a" strokeWidth="3" />
        <rect x={100 + bodyWidth * 0.38 - 24} y="205" width="24" height="88" rx="6" fill="#293548" stroke="#0f172a" strokeWidth="3" />

        <path
          d={`M ${100 - bodyWidth * 0.38 - 6} 292 Q ${100 - bodyWidth * 0.38 + 10} 285 ${100 - bodyWidth * 0.38 + 26} 292 L ${100 - bodyWidth * 0.38 + 28} 305 L ${100 - bodyWidth * 0.38 - 8} 305 Z`}
          fill={safeType === 'rafie' ? '#4a3728' : safeType === 'pras' ? '#854d27' : '#334155'}
          stroke="#0f172a"
          strokeWidth="3"
        />
        <path
          d={`M ${100 + bodyWidth * 0.38 - 26} 292 Q ${100 + bodyWidth * 0.38 - 10} 285 ${100 + bodyWidth * 0.38 + 6} 292 L ${100 + bodyWidth * 0.38 + 8} 305 L ${100 + bodyWidth * 0.38 - 28} 305 Z`}
          fill={safeType === 'rafie' ? '#4a3728' : safeType === 'pras' ? '#854d27' : '#334155'}
          stroke="#0f172a"
          strokeWidth="3"
        />

        <rect
          x={bodyX + 8}
          y="108"
          width={bodyWidth - 16}
          height="102"
          rx="8"
          fill={
            safeType === 'rafie'
              ? '#f8fafc'
              : safeType === 'ikhsan'
              ? '#e5dec9'
              : safeType === 'pras'
              ? '#263238'
              : '#1e293b'
          }
          stroke="#0f172a"
          strokeWidth="3"
        />

        {safeType === 'ikhsan' && (
          <g stroke="#9a3412" strokeWidth="1.5" opacity="0.55">
            <line x1="92" y1="115" x2="108" y2="135" />
            <line x1="108" y1="115" x2="92" y2="135" />
            <line x1="92" y1="145" x2="108" y2="165" />
            <line x1="108" y1="145" x2="92" y2="165" />
            <line x1="92" y1="175" x2="108" y2="195" />
          </g>
        )}

        {(safeType === 'rafie' || safeType === 'pras') && (
          <g>
            <polygon
              points="86,106 100,124 94,130 80,112"
              fill={safeType === 'rafie' ? '#ffffff' : '#1e293b'}
              stroke="#0f172a"
              strokeWidth="2.5"
            />
            <polygon
              points="114,106 100,124 106,130 120,112"
              fill={safeType === 'rafie' ? '#ffffff' : '#1e293b'}
              stroke="#0f172a"
              strokeWidth="2.5"
            />
          </g>
        )}

        <path
          d={`M ${bodyX} 112 Q ${bodyX + 10} 104 ${bodyX + 26} 108 L ${bodyX + 28} 214 L ${bodyX - 2} 214 Z`}
          fill="#7ec8f8"
          stroke="#0f172a"
          strokeWidth="3"
        />
        <path
          d={`M ${bodyX + bodyWidth} 112 Q ${bodyX + bodyWidth - 10} 104 ${bodyX + bodyWidth - 26} 108 L ${bodyX + bodyWidth - 28} 214 L ${bodyX + bodyWidth + 2} 214 Z`}
          fill="#7ec8f8"
          stroke="#0f172a"
          strokeWidth="3"
        />
        <polygon points={`${bodyX + 14},108 ${bodyX + 28},108 ${bodyX + 28},158 ${bodyX + 10},138`} fill="#60b5f2" stroke="#0f172a" strokeWidth="2.5" />
        <polygon points={`${bodyX + bodyWidth - 14},108 ${bodyX + bodyWidth - 28},108 ${bodyX + bodyWidth - 28},158 ${bodyX + bodyWidth - 10},138`} fill="#60b5f2" stroke="#0f172a" strokeWidth="2.5" />

        <g transform={`rotate(${armWave}, ${bodyX}, 125)`}>
          <path
            d={`M ${bodyX + 2} 115 L ${bodyX - 18} 165 L ${bodyX + 14} 172 L ${bodyX + 14} 135`}
            fill="#7ec8f8"
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx={bodyX + 18} cy="170" r="8" fill={skinColor} stroke="#0f172a" strokeWidth="2.5" />
        </g>

        <g transform={`rotate(${-armWave * 1.2}, ${bodyX + bodyWidth}, 125)`}>
          <path
            d={`M ${bodyX + bodyWidth - 2} 115 L ${bodyX + bodyWidth + 26} 152 L ${bodyX + bodyWidth + 16} 168 L ${bodyX + bodyWidth - 10} 140`}
            fill="#7ec8f8"
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx={bodyX + bodyWidth + 24} cy="154" r="8" fill={skinColor} stroke="#0f172a" strokeWidth="2.5" />

          {safeType === 'rafie' && (
            <rect
              x="82"
              y="148"
              width="34"
              height="42"
              rx="4"
              transform="rotate(10 98 168)"
              fill="#64748b"
              stroke="#0f172a"
              strokeWidth="2.5"
            />
          )}

          {safeType === 'ikhsan' && (
            <line
              x1={bodyX + bodyWidth + 24}
              y1="154"
              x2={bodyX + bodyWidth + 46}
              y2="132"
              stroke="#1e293b"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          )}
        </g>

        <rect x="91" y="92" width="18" height="20" rx="4" fill={skinColor} stroke="#0f172a" strokeWidth="2.5" />
        <ellipse
          cx="100"
          cy="64"
          rx={safeType === 'dimas' ? 31 : 28}
          ry="32"
          fill={skinColor}
          stroke="#0f172a"
          strokeWidth="3"
        />

        <circle cx={100 - (safeType === 'dimas' ? 31 : 28)} cy="66" r="6" fill={skinColor} stroke="#0f172a" strokeWidth="2.5" />
        <circle cx={100 + (safeType === 'dimas' ? 31 : 28)} cy="66" r="6" fill={skinColor} stroke="#0f172a" strokeWidth="2.5" />

        <path d="M 82 52 Q 88 49 94 52" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 106 52 Q 112 49 118 52" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="88" cy="60" r="3" fill="#0f172a" />
        <circle cx="112" cy="60" r="3" fill="#0f172a" />

        {(safeType === 'ikhsan' || safeType === 'rafie') && (
          <g stroke="#1e293b" strokeWidth="2.3" fill="rgba(255,255,255,0.18)">
            <circle cx="88" cy="60" r="8.5" />
            <circle cx="112" cy="60" r="8.5" />
            <line x1="96.5" y1="60" x2="103.5" y2="60" />
          </g>
        )}

        <path d="M 100 62 L 98 70 L 102 70" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="100" cy="79" rx="7" ry={mouthOpen} fill="#991b1b" stroke="#0f172a" strokeWidth="2" />

        {safeType === 'ikhsan' && (
          <path
            d="M 68 58 Q 66 26 100 25 Q 134 26 132 58 Q 120 46 112 54 Q 102 44 96 54 Q 84 45 68 58 Z"
            fill="#1e293b"
            stroke="#0f172a"
            strokeWidth="3"
          />
        )}
        {safeType === 'rafie' && (
          <path
            d="M 70 56 Q 68 24 100 26 Q 132 24 130 56 Q 116 38 100 46 Q 84 38 70 56 Z"
            fill="#1c1917"
            stroke="#0f172a"
            strokeWidth="3"
          />
        )}
        {safeType === 'pras' && (
          <path
            d="M 70 56 Q 65 32 82 28 Q 95 18 110 26 Q 128 24 130 56 Q 116 40 98 42 Q 82 40 70 56 Z"
            fill="#18181b"
            stroke="#0f172a"
            strokeWidth="3"
          />
        )}
        {safeType === 'dimas' && (
          <path
            d="M 69 54 Q 70 27 100 27 Q 130 27 131 54 Q 115 38 100 38 Q 85 38 69 54 Z"
            fill="#27272a"
            stroke="#0f172a"
            strokeWidth="3"
          />
        )}
      </svg>
    </div>
  );
};

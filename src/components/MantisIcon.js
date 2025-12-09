import React from 'react';

function MantisIcon({ size = 48, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Praying Mantis - Front/45° view with distinctive features */}
      <defs>
        <linearGradient id="mantisGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-yellow, #FFD93D)" />
          <stop offset="50%" stopColor="var(--primary-gold, #F4B940)" />
          <stop offset="100%" stopColor="var(--accent-orange, #FF9F43)" />
        </linearGradient>
        <linearGradient id="mantisGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-gold, #D4A012)" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        <filter id="mantisGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <g filter="url(#mantisGlow)">
        {/* === TRIANGULAR HEAD - Key mantis feature === */}
        <path
          d="M50 8 L42 20 L50 18 L58 20 Z"
          fill="url(#mantisGradient)"
        />
        {/* Head face detail */}
        <ellipse cx="50" cy="15" rx="6" ry="4" fill="url(#mantisGradient)" />
        
        {/* === LARGE COMPOUND EYES - Bulging out === */}
        <ellipse cx="42" cy="14" rx="5" ry="4" fill="url(#mantisGradient)" />
        <ellipse cx="58" cy="14" rx="5" ry="4" fill="url(#mantisGradient)" />
        {/* Eye pupils */}
        <ellipse cx="40" cy="14" rx="2" ry="2.5" fill="var(--bg-primary, #0A0A0A)" />
        <ellipse cx="56" cy="14" rx="2" ry="2.5" fill="var(--bg-primary, #0A0A0A)" />
        {/* Eye shine */}
        <circle cx="39" cy="13" r="0.8" fill="var(--primary-yellow, #FFD93D)" />
        <circle cx="55" cy="13" r="0.8" fill="var(--primary-yellow, #FFD93D)" />
        
        {/* === ANTENNAE - Long and thin === */}
        <path
          d="M46 10 Q38 4 32 2"
          stroke="url(#mantisGradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M54 10 Q62 4 68 2"
          stroke="url(#mantisGradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* === LONG NECK (PROTHORAX) - Key mantis feature === */}
        <path
          d="M46 20 L44 22 L44 38 L46 40 L54 40 L56 38 L56 22 L54 20"
          fill="url(#mantisGradient)"
        />
        {/* Neck segments */}
        <line x1="44" y1="26" x2="56" y2="26" stroke="#8B6914" strokeWidth="0.5" opacity="0.5" />
        <line x1="44" y1="32" x2="56" y2="32" stroke="#8B6914" strokeWidth="0.5" opacity="0.5" />
        
        {/* === RAPTORIAL FORELEGS (PRAYING ARMS) - Iconic pose === */}
        {/* Left arm - coxa/trochanter (shoulder) */}
        <ellipse cx="40" cy="28" rx="4" ry="3" fill="url(#mantisGradient)" />
        {/* Left arm - femur (upper arm) - reaching up and forward */}
        <path
          d="M38 26 Q28 20 24 12"
          stroke="url(#mantisGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left arm - tibia (forearm with spines) - folded back */}
        <path
          d="M24 12 Q20 18 18 28"
          stroke="url(#mantisGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left arm spines */}
        <path
          d="M23 14 L19 12 M22 18 L17 17 M20 22 L15 22 M19 26 L14 27"
          stroke="url(#mantisGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Right arm - coxa/trochanter (shoulder) */}
        <ellipse cx="60" cy="28" rx="4" ry="3" fill="url(#mantisGradient)" />
        {/* Right arm - femur (upper arm) */}
        <path
          d="M62 26 Q72 20 76 12"
          stroke="url(#mantisGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right arm - tibia (forearm with spines) */}
        <path
          d="M76 12 Q80 18 82 28"
          stroke="url(#mantisGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right arm spines */}
        <path
          d="M77 14 L81 12 M78 18 L83 17 M80 22 L85 22 M81 26 L86 27"
          stroke="url(#mantisGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* === THORAX === */}
        <ellipse cx="50" cy="48" rx="10" ry="8" fill="url(#mantisGradient)" />
        
        {/* === MIDDLE LEGS === */}
        <path
          d="M42 46 Q32 52 26 64 Q24 72 28 80"
          stroke="url(#mantisGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M58 46 Q68 52 74 64 Q76 72 72 80"
          stroke="url(#mantisGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* === ABDOMEN - Long and segmented === */}
        <path
          d="M42 54 Q40 62 42 72 Q44 82 50 88 Q56 82 58 72 Q60 62 58 54"
          fill="url(#mantisGradient)"
        />
        {/* Abdomen segments */}
        <path d="M42 60 Q50 62 58 60" stroke="#8B6914" strokeWidth="0.5" opacity="0.4" fill="none" />
        <path d="M42 66 Q50 68 58 66" stroke="#8B6914" strokeWidth="0.5" opacity="0.4" fill="none" />
        <path d="M43 72 Q50 74 57 72" stroke="#8B6914" strokeWidth="0.5" opacity="0.4" fill="none" />
        <path d="M45 78 Q50 80 55 78" stroke="#8B6914" strokeWidth="0.5" opacity="0.4" fill="none" />
        
        {/* === HIND LEGS === */}
        <path
          d="M44 56 Q34 62 28 76 Q26 86 32 94"
          stroke="url(#mantisGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M56 56 Q66 62 72 76 Q74 86 68 94"
          stroke="url(#mantisGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* === WINGS (folded along back) === */}
        <path
          d="M46 48 Q44 60 46 75"
          stroke="url(#mantisGradientDark)"
          strokeWidth="2"
          opacity="0.3"
          fill="none"
        />
        <path
          d="M54 48 Q56 60 54 75"
          stroke="url(#mantisGradientDark)"
          strokeWidth="2"
          opacity="0.3"
          fill="none"
        />
      </g>
    </svg>
  );
}

export default MantisIcon;

import React from 'react';

interface PorzuuLogoProps {
  className?: string;
  size?: number;
}

export const PorzuuLogo: React.FC<PorzuuLogoProps> = ({ className = '', size = 36 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <filter id="porzuu-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Outer black outline */}
      <path
        d="M 50,8 
           L 61,28 
           L 80,14 
           L 82,50 
           C 86,72 73,92 50,92 
           C 27,92 14,72 18,50 
           L 20,14 
           L 39,28 Z"
        fill="#1c1c1c"
        stroke="#1c1c1c"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Inner white outline border */}
      <path
        d="M 50,13 
           L 59,30 
           L 76,18 
           L 78,50 
           C 82,70 70,87 50,87 
           C 30,87 18,70 22,50 
           L 24,18 
           L 41,30 Z"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Body: Vibrant Magenta Pink (#df356b) */}
      <path
        d="M 50,17 
           L 58,33 
           L 73,22 
           L 75,50 
           C 78,68 68,83 50,83 
           C 32,83 22,68 25,50 
           L 27,22 
           L 42,33 Z"
        fill="#df356b"
      />

      {/* Left Eye: White Oval */}
      <ellipse cx="40" cy="58" rx="4.5" ry="11" fill="#ffffff" />

      {/* Right Eye: White Oval */}
      <ellipse cx="60" cy="58" rx="4.5" ry="11" fill="#ffffff" />
    </svg>
  );
};

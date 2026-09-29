import React from 'react';

interface ArcLogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
}

export const ArcLogo: React.FC<ArcLogoProps> = ({
  className = '',
  size = 40,
  withText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-500 hover:scale-105"
        aria-label="Arc Studio Logo"
      >
        <defs>
          <linearGradient id="brassGradient" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#dec397" />
            <stop offset="45%" stopColor="#c9a36b" />
            <stop offset="75%" stopColor="#b38a4d" />
            <stop offset="100%" stopColor="#dfc295" />
          </linearGradient>
          <linearGradient id="arcGlow" x1="10" y1="36" x2="54" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#dfc295" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#c9a36b" stopOpacity="1" />
            <stop offset="100%" stopColor="#dfc295" stopOpacity="0.4" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer subtle boundary circle */}
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="url(#brassGradient)"
          strokeWidth="1"
          strokeOpacity="0.3"
          className="transition-opacity duration-300"
        />

        {/* The 'A' left leg */}
        <path
          d="M32 12L17 50"
          stroke="url(#brassGradient)"
          strokeWidth="2.75"
          strokeLinecap="round"
        />

        {/* The 'A' right leg */}
        <path
          d="M32 12L47 50"
          stroke="url(#brassGradient)"
          strokeWidth="2.75"
          strokeLinecap="round"
        />

        {/* Apex refined join */}
        <circle cx="32" cy="12.5" r="1.5" fill="#dec397" />

        {/* Architectural sweeping curved ARC crossing the A */}
        <path
          d="M12 39C20 32 30 29 42 33C47 34.5 50 38 52 40"
          stroke="url(#arcGlow)"
          strokeWidth="2.25"
          strokeLinecap="round"
          filter="url(#softGlow)"
        />

        {/* Minimal baseline architectural coordinates dots */}
        <circle cx="17" cy="50" r="1.25" fill="#c9a36b" />
        <circle cx="47" cy="50" r="1.25" fill="#c9a36b" />
      </svg>

      {withText && (
        <div className="flex flex-col">
          <span className="font-display text-xl tracking-[0.2em] uppercase text-bone font-medium leading-none">
            Arc Studio
          </span>
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-smoke mt-1 font-light">
            Lahore • DHA
          </span>
        </div>
      )}
    </div>
  );
};

export default ArcLogo;

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon mark */}
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="lgOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="lgViolet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5b21b6" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="lgShield" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a0d2e" />
            <stop offset="100%" stopColor="#150d20" />
          </linearGradient>
        </defs>
        {/* Shield background */}
        <path
          d="M21 2 L36 8 L36 22 C36 30 29 37 21 40 C13 37 6 30 6 22 L6 8 Z"
          fill="url(#lgShield)"
          stroke="url(#lgOrange)"
          strokeWidth="1.4"
        />
        {/* Lightning bolt — "Instant" motif */}
        <path
          d="M24 5 L14 22 L20 22 L18 37 L28 20 L22 20 Z"
          fill="url(#lgOrange)"
        />
        {/* UK flag micro-cross hint at bottom-right */}
        <rect x="28" y="28" width="10" height="10" rx="2" fill="url(#lgViolet)" />
        <rect x="31.5" y="28" width="3" height="10" rx="0" fill="#fb923c" />
        <rect x="28" y="31.5" width="10" height="3" rx="0" fill="#fb923c" />
      </svg>

      {/* Text block */}
      <div className="flex flex-col leading-none gap-0.5">
        <div className="flex items-baseline gap-0">
          <span
            className="text-[18px] font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, #f97316, #fb923c, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Instant
          </span>
          <span
            className="text-[18px] font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            UK
          </span>
          <span className="text-[18px] font-black tracking-tight text-white">
            Casinos
          </span>
        </div>
        <span className="text-[9.5px] font-semibold tracking-[0.18em] text-violet-400/60 uppercase">
          instantukcasinos.org
        </span>
      </div>
    </div>
  );
}

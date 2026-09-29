import React, { useEffect, useState } from "react";

/**
 * Hand-drawn botanical ivy vine that animates once on load.
 * Gracefully respects prefers-reduced-motion.
 */
export const IvyVineAnimation: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mq.addEventListener("change", handler);

    // Trigger stroke animation after mount
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 150);

    return () => {
      mq.removeEventListener("change", handler);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`relative pointer-events-none select-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 420 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[420px] text-[var(--color-green)]"
      >
        <defs>
          <style>{`
            .vine-stem {
              stroke-dasharray: 450;
              stroke-dashoffset: ${prefersReducedMotion || hasAnimated ? 0 : 450};
              transition: stroke-dashoffset 2.4s cubic-bezier(0.25, 1, 0.5, 1);
            }
            .vine-leaf {
              opacity: ${prefersReducedMotion || hasAnimated ? 1 : 0};
              transform-origin: center;
              transition: opacity 1.2s ease, transform 1.2s ease;
            }
            .leaf-1 { transition-delay: 0.5s; }
            .leaf-2 { transition-delay: 0.9s; }
            .leaf-3 { transition-delay: 1.3s; }
            .leaf-4 { transition-delay: 1.7s; }
            .leaf-5 { transition-delay: 2.1s; }
          `}</style>
        </defs>

        {/* The organic meandering vine stem */}
        <path
          className="vine-stem"
          d="M 10 95 C 70 95, 110 35, 170 50 C 230 65, 270 25, 330 35 C 370 42, 400 20, 415 15"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Small tendrils */}
        <path
          className="vine-leaf leaf-1"
          d="M 90 85 C 95 75, 105 76, 108 82 C 111 88, 100 95, 96 90"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          className="vine-leaf leaf-4"
          d="M 310 32 C 322 22, 332 26, 328 35"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Leaf 1 */}
        <g className="vine-leaf leaf-1">
          <path
            d="M 60 90 C 45 80, 48 60, 68 62 C 88 64, 75 85, 60 90 Z"
            fill="var(--color-soft-green)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M 60 90 C 62 80, 65 72, 68 62" stroke="currentColor" strokeWidth="1" />
        </g>

        {/* Leaf 2 */}
        <g className="vine-leaf leaf-2">
          <path
            d="M 140 45 C 135 25, 155 20, 165 35 C 175 50, 150 55, 140 45 Z"
            fill="var(--color-soft-green)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M 140 45 C 148 40, 158 35, 165 35" stroke="currentColor" strokeWidth="1" />
        </g>

        {/* Leaf 3 */}
        <g className="vine-leaf leaf-3">
          <path
            d="M 215 58 C 220 78, 240 76, 242 60 C 244 44, 222 46, 215 58 Z"
            fill="var(--color-soft-green)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M 215 58 C 225 61, 235 63, 242 60" stroke="currentColor" strokeWidth="1" />
        </g>

        {/* Leaf 4 */}
        <g className="vine-leaf leaf-4">
          <path
            d="M 285 28 C 280 10, 302 8, 310 22 C 318 36, 295 40, 285 28 Z"
            fill="var(--color-soft-green)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M 285 28 C 293 25, 302 22, 310 22" stroke="currentColor" strokeWidth="1" />
        </g>

        {/* Leaf 5 (Tip) */}
        <g className="vine-leaf leaf-5">
          <path
            d="M 390 20 C 395 6, 410 8, 415 15 C 418 22, 402 28, 390 20 Z"
            fill="var(--color-soft-green)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
};

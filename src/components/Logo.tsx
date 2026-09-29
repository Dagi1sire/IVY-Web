import React from "react";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

/**
 * Placeholder leaf mark plus the wordmark "IVY Childcare Services" in one component.
 * Allows easy replacement with an official logo SVG or image file.
 */
export const Logo: React.FC<LogoProps> = ({ className = "", onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-2.5 text-left border-none bg-transparent cursor-pointer p-1 rounded-lg focus-visible:outline-2 focus-visible:outline-[var(--color-green)] ${className}`}
      aria-label="IVY Childcare Services - Go to homepage"
    >
      {/* Hand-crafted botanical leaf mark placeholder */}
      <div className="w-9 h-9 rounded-full bg-[var(--color-soft-green)] flex items-center justify-center shrink-0 border border-[var(--color-line)] group-hover:scale-105 transition-transform duration-200">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-[var(--color-green)]"
          aria-hidden="true"
        >
          <path
            d="M8 24C8 24 10 16 16 12C22 8 26 8 26 8C26 8 26 12 22 18C18 24 10 26 8 24Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 23C13 19 16 16 20 13"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <circle cx="21" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="font-heading font-extrabold text-[1.15rem] leading-none tracking-tight text-[var(--color-text)]">
          IVY
        </span>
        <span className="text-[0.78rem] font-medium text-[var(--color-muted)] leading-tight tracking-normal">
          Childcare Services
        </span>
      </div>
    </button>
  );
};

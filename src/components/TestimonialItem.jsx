// src/components/TestimonialItem.jsx
import React from "react";
import clsx from "clsx";

const BubbleIcon = () => {
  return (
    <div className="relative shrink-0 w-16 h-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          {/* Outer ring gradient */}
          <radialGradient id="outerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#041a3f" />
            <stop offset="100%" stopColor="#00051a" />
          </radialGradient>

          {/* Middle ring gradient */}
          <radialGradient id="midGrad" cx="50%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#032b6b" />
            <stop offset="100%" stopColor="#001f4f" />
          </radialGradient>

          {/* Bubble gradient */}
          <radialGradient id="bubbleGrad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#5cffff" />
            <stop offset="100%" stopColor="#1de6f0" />
          </radialGradient>

          {/* Blur filter (your SVG referenced it but did not define it) */}
          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
          </filter>
        </defs>

        {/* Outer circle */}
        <circle cx="100" cy="100" r="98" fill="url(#outerGrad)" />

        {/* Middle circle */}
        <circle cx="100" cy="100" r="78" fill="url(#midGrad)" />

        {/* Bubble */}
        <g fill="url(#bubbleGrad)" filter="url(#blur)">
          {/* Main pill */}
          <rect x="50" y="60" width="100" height="60" rx="30" ry="30" />
          {/* Tail */}
          <path d="M110,120 L100,140 L120,120 Z" />
        </g>
      </svg>
    </div>
  );
};

const TestimonialItem = ({ item, containerClassName = "" }) => {
  return (
    <article
      className={clsx(
        "relative px-10 py-12 max-md:px-6 max-md:py-10",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-white/5",
        containerClassName
      )}
    >
      <p className="body-2 text-p4/90 leading-relaxed max-md:text-[16px]">
        {item.comment}
      </p>

      <div className="mt-10 flex items-center gap-4">
        <BubbleIcon />

        <div className="min-w-0">
          <div className="text-cyan-300 font-semibold text-[16px] leading-tight">
            {item.name}
          </div>
          <div className="text-white/35 uppercase tracking-wide text-[11px] mt-1 leading-snug">
            {item.role}
          </div>
        </div>
      </div>
    </article>
  );
};

export default TestimonialItem;




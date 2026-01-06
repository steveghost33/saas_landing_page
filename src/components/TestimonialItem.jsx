// src/components/TestimonialItem.jsx
import React, { useId } from "react";
import clsx from "clsx";

const BubbleIcon = () => {
  const uid = useId();

  const outerId = `outerGrad-${uid}`;
  const midId = `midGrad-${uid}`;
  const bubbleId = `bubbleGrad-${uid}`;

  return (
    <div className="relative shrink-0 w-16 h-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={outerId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#041a3f" />
            <stop offset="100%" stopColor="#00051a" />
          </radialGradient>

          <radialGradient id={midId} cx="50%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#032b6b" />
            <stop offset="100%" stopColor="#001f4f" />
          </radialGradient>

          <radialGradient id={bubbleId} cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#5cffff" />
            <stop offset="100%" stopColor="#1de6f0" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="98" fill={`url(#${outerId})`} />
        <circle cx="100" cy="100" r="78" fill={`url(#${midId})`} />

        <g fill={`url(#${bubbleId})`}>
          <rect x="50" y="60" width="100" height="60" rx="30" ry="30" />
          <path d="M110 120 L100 140 L120 120 Z" />
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

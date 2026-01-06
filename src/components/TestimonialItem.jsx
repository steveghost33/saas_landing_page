// src/components/TestimonialItem.jsx
import React from "react";
import clsx from "clsx";

const BubbleIcon = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer soft glow */}
      <div className="absolute inset-0 rounded-full blur-md opacity-60 bg-cyan-400/25" />

      {/* Outer ring */}
      <div className="relative w-[64px] h-[64px] rounded-full bg-s1/40 border border-white/10 flex items-center justify-center">
        {/* Inner ring */}
        <div className="w-[46px] h-[46px] rounded-full bg-s1/60 border border-white/10 flex items-center justify-center">
          {/* Solid bubble */}
          <div className="w-[30px] h-[30px] rounded-full bg-cyan-400/15 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block"
            >
              {/* Bubble body */}
              <path
                d="M7.5 9.6C7.5 7.62 9.1 6 11.08 6H12.92C14.9 6 16.5 7.62 16.5 9.6V10.9C16.5 12.88 14.9 14.5 12.92 14.5H11.05L9.2 16.05C8.75 16.42 8.08 16.09 8.08 15.5V14.38C7.74 14.12 7.5 13.68 7.5 13.15V9.6Z"
                fill="url(#etsBubble)"
              />
              {/* Small highlight dot */}
              <circle cx="10.2" cy="9.4" r="1.05" fill="rgba(255,255,255,0.55)" />
              <defs>
                <linearGradient
                  id="etsBubble"
                  x1="7.5"
                  y1="6"
                  x2="16.5"
                  y2="16"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#22D3EE" />
                  <stop offset="1" stopColor="#0EA5E9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
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
        {/* Icon */}
        <div className="shrink-0">
          <BubbleIcon />
        </div>

        {/* Name and role */}
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



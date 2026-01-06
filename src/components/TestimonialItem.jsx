// src/components/TestimonialItem.jsx
import React from "react";
import clsx from "clsx";

const TestimonialItem = ({ item, containerClassName = "" }) => {
  return (
    <article
      className={clsx(
        // Layout
        "relative flex flex-col justify-between",
        // Spacing
        "px-10 py-12 md:px-12",
        // Divider line between cards
        "after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-s2/35",
        // Mobile spacing tuning
        "max-md:px-6 max-md:py-10",
        containerClassName
      )}
    >
      {/* Comment */}
      <p className="body-1 text-p5 max-w-[46ch]">
        {item.comment}
      </p>

      {/* Footer row */}
      <div className="mt-10 flex items-center gap-5">
        {/* Avatar wrapper */}
        <div className="relative flex-shrink-0">
          {/* Soft ring behind icon */}
          <div
            className="
              absolute inset-0
              rounded-full
              bg-s2/20
              blur-[0.2px]
            "
          />

          {/* Outer circle */}
          <div
            className="
              relative
              flex items-center justify-center
              rounded-full
              border border-s2/40
              bg-s1
              w-16 h-16
              max-md:w-14 max-md:h-14
              z-10
            "
          >
            {/* Inner glow circle */}
            <div
              className="
                absolute
                inset-2
                rounded-full
                bg-s2/15
              "
            />

            {/* The actual icon */}
            <img
              src={item.avatarUrl}
              alt={`${item.name} testimonial icon`}
              className="
                relative z-20
                w-8 h-8
                max-md:w-7 max-md:h-7
                object-contain
                block
              "
              loading="lazy"
              draggable="false"
            />
          </div>
        </div>

        {/* Name and role */}
        <div className="min-w-0">
          <div className="text-p1 font-semibold leading-tight">
            {item.name}
          </div>
          <div className="mt-1 text-xs uppercase tracking-wide text-p5/70">
            {item.role}
          </div>
        </div>
      </div>
    </article>
  );
};

export default TestimonialItem;


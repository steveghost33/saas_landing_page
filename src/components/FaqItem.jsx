import clsx from "clsx";
import { useState } from "react";

function FaqItem({ item, index }) {
  const [activeId, setActiveId] = useState(null);

  const active = activeId === item.id;

  return (
    <div className="relative z-2 mb-16">
      <div
        className="group relative flex cursor-pointer items-center justify-between gap-10 px-7 py-5"
        onClick={() => {
          setActiveId(active ? null : item.id);
        }}
      >
        <div className="flex-1">
          <div className="small-compact mb-1.5 text-p3 max-lg:hidden">
            {index < 10 ? "0" : ""}
            {index}
          </div>
          <h4 className="h4 text-p4">{item.question}</h4>
        </div>

        <div
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300",
            active
              ? "rotate-45 border-p3 text-p3"
              : "border-white/20 text-white"
          )}
        >
          +
        </div>
      </div>

      {/* COLLAPSIBLE CONTENT */}
      <div
        className={clsx(
          "overflow-hidden transition-all duration-300 ease-in-out",
          active ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-7 pt-2 pb-5">
          <p className="body-2 text-p5">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default FaqItem;

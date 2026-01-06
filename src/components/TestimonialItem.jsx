import clsx from "clsx";

const TestimonialItem = ({ item, containerClassName = "" }) => {
  return (
    <article
      className={clsx(
        "relative z-10 px-12 py-14 max-md:px-6 max-md:py-10",
        "text-p5",
        "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:content-['']",
        containerClassName
      )}
    >
      {/* Divider lines that do not cover content */}
      <span
        className="
          pointer-events-none
          absolute inset-x-0 top-0
          h-px bg-white/10
          max-md:hidden
        "
        aria-hidden="true"
      />
      <span
        className="
          pointer-events-none
          absolute inset-y-0 right-0
          w-px bg-white/10
          max-md:hidden
        "
        aria-hidden="true"
      />

      <div className="relative z-10">
        <p className="body-1 leading-relaxed max-md:text-base">
          {item.comment}
        </p>

        <div className="mt-10 flex items-center gap-5">
          {/* This is the fix.
              Mobile was collapsing or covering this block.
              These classes force it to render and stay on top. */}
          <div
            className="
              relative z-20
              flex-shrink-0
              w-16 h-16
              max-md:w-16 max-md:h-16
              rounded-full
              bg-black/20
              border border-white/10
              flex items-center justify-center
              overflow-visible
            "
          >
            <img
              src={item.avatarUrl}
              alt=""
              className="
                block
                w-10 h-10
                max-md:w-10 max-md:h-10
                object-contain
                opacity-100
              "
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-p3">{item.name}</p>
            <p className="text-xs uppercase tracking-[0.16em] text-p5/60 mt-1">
              {item.role}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile divider */}
      <span
        className="
          pointer-events-none
          absolute left-0 right-0 bottom-0
          h-px bg-white/10
          md:hidden
        "
        aria-hidden="true"
      />
    </article>
  );
};

export default TestimonialItem;

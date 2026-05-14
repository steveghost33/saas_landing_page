import { useState } from "react";
import { BOOKING_PATH } from "../data/site.js";

function ContactBanner() {
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem("bannerDismissed") === "1"
  );

  if (dismissed) return null;

  function handleDismiss() {
    sessionStorage.setItem("bannerDismissed", "1");
    setDismissed(true);
  }

  return (
    <div
      role="banner"
      aria-label="Free consultation offer"
      className="relative flex items-center justify-center gap-3 bg-[#00E0FF] text-[#0A2540] px-4 py-2 text-sm font-semibold shadow-sm"
    >
      <span>Get started with a free 30-minute consultation —</span>
      <a
        href={BOOKING_PATH}
        className="underline font-black underline-offset-2 hover:opacity-75 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A2540] rounded-sm whitespace-nowrap"
      >
        Schedule Now
      </a>

      <button
        onClick={handleDismiss}
        aria-label="Dismiss banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full hover:bg-black/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A2540]"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M1 1l8 8M9 1L1 9" stroke="#0A2540" strokeWidth="1.75" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

export default ContactBanner;

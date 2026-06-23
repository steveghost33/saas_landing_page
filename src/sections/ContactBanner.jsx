import { BOOKING_PATH } from "../data/site.js";

function ContactBanner() {
  return (
    <div
      role="banner"
      aria-label="Free consultation offer"
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-5 bg-[#00C8E8] text-[#0A2540] px-4 sm:px-6 py-3 text-center"
    >
      <span className="text-sm sm:text-base font-bold tracking-wide">
        Free 30-minute consultation
      </span>
      <span className="text-[#0A2540]/50 hidden sm:inline">—</span>
      <a
        href={BOOKING_PATH}
        className="inline-flex items-center gap-2 bg-[#0A2540] text-[#00C8E8] px-5 py-2 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A2540] whitespace-nowrap"
      >
        Schedule Now
        <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
}

export default ContactBanner;

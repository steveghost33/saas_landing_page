import { BOOKING_PATH } from "../data/site.js";

function ContactBanner() {
  return (
    <div
      role="banner"
      aria-label="Free consultation offer"
      className="flex items-center justify-center gap-4 bg-[#00C8E8] text-[#0A2540] px-6 py-2"
    >
      <span className="text-sm font-semibold tracking-wide whitespace-nowrap">
        Free 30-minute consultation
      </span>
      <span className="text-[#0A2540]/50 hidden sm:inline">—</span>
      <a
        href={BOOKING_PATH}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 bg-[#0A2540] text-[#00C8E8] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A2540] whitespace-nowrap"
      >
        Schedule Now
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
}

export default ContactBanner;

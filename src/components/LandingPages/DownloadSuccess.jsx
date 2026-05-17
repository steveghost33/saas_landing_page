import { openCalPopup } from "../../utils/cal.js";

const DownloadSuccess = ({ name }) => {
  const firstName = name?.split(" ")[0] || "there";

  return (
    <div className="text-center">
      {/* Checkmark */}
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-black text-slate-900 mb-2">You're in, {firstName}!</h2>
      <p className="text-slate-500 text-[15px] mb-6 max-w-sm mx-auto leading-relaxed">
        Check your email — the Tech Health Check is on its way now.
        I'll send the CRM Setup Checklist in 2 days once you've had time to work through it.
      </p>

      {/* Tech Health Check download */}
      <a
        href="/downloads/Tech-Health-Check.pdf"
        download
        className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition px-5 py-4 text-left group mb-6"
      >
        <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 text-sm">Tech Health Check</p>
          <p className="text-slate-400 text-xs">Download now — takes ~10 minutes</p>
        </div>
        <svg className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>

      {/* Coming up notice */}
      <div className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-left mb-6">
        <svg className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-slate-500 text-xs leading-relaxed">
          <span className="font-semibold text-slate-700">CRM Setup Checklist coming in 2 days.</span>{" "}
          It pairs directly with what you find in the health check — so go through that first.
        </p>
      </div>

      {/* Book CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Optional next step</p>
        <h3 className="font-black text-lg mb-1">Talk through what you find</h3>
        <p className="text-blue-100 text-sm mb-4">
          Free 30-min session — I'll help you figure out what to fix first.
        </p>
        <button
          type="button"
          onClick={openCalPopup}
          className="block w-full rounded-xl bg-white text-blue-700 font-bold py-3 text-sm hover:bg-blue-50 transition cursor-pointer"
        >
          Book my free session →
        </button>
      </div>
    </div>
  );
};

export default DownloadSuccess;

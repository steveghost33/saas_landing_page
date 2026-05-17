// Success state shown after email capture — delivers both PDFs + CTA to book
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

      <h2 className="text-2xl font-black text-slate-900 mb-2">You're all set, {firstName}!</h2>
      <p className="text-slate-500 text-[15px] mb-8 max-w-sm mx-auto">
        Both resources are ready to download. I'll follow up personally within one business day.
      </p>

      {/* Downloads */}
      <div className="space-y-3 mb-8">
        <a
          href="/downloads/Tech-Health-Check.pdf"
          download
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition px-5 py-4 text-left group"
        >
          <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800 text-sm">Tech Health Check</p>
            <p className="text-slate-400 text-xs">See exactly where your systems stand</p>
          </div>
          <svg className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>

        <a
          href="/downloads/CRM-Setup-Checklist.pdf"
          download
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition px-5 py-4 text-left group"
        >
          <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
            <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800 text-sm">CRM Setup Checklist</p>
            <p className="text-slate-400 text-xs">Launch your CRM in 3 weeks</p>
          </div>
          <svg className="h-4 w-4 text-slate-400 group-hover:text-purple-600 transition flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>

      {/* Book CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Next step</p>
        <h3 className="font-black text-lg mb-1">Book a free 30-min session</h3>
        <p className="text-blue-100 text-sm mb-4">
          Go over your Tech Health Check results together and get a clear action plan.
        </p>
        <a
          href="/#contact"
          className="block w-full rounded-xl bg-white text-blue-700 font-bold py-3 text-sm hover:bg-blue-50 transition"
        >
          Book my free session →
        </a>
      </div>
    </div>
  );
};

export default DownloadSuccess;

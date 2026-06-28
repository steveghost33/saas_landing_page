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
        We're analyzing your local search presence right now. You'll get your personalized audit within 2 hours.
      </p>

      {/* Research underway notice */}
      <div className="flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-left mb-6">
        <svg className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <p className="text-slate-600 text-xs leading-relaxed">
          <span className="font-semibold text-slate-700">What we're doing:</span> Researching your Google Business Profile, website SEO, and local competition to give you real, actionable insights.
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3 text-sm text-left">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-200 flex items-center justify-center mt-0.5">
            <svg className="w-3 h-3 text-green-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Today</p>
            <p className="text-slate-500">You signed up</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm text-left">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center mt-0.5">
            <svg className="w-3 h-3 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Within 2 hours</p>
            <p className="text-slate-500">Your personalized audit lands in email</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm text-left">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center mt-0.5">
            <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Tomorrow + following days</p>
            <p className="text-slate-500">Follow-up with specific action items and strategy</p>
          </div>
        </div>
      </div>

      {/* Optional CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Want to move faster?</p>
        <h3 className="font-black text-lg mb-1">Book a strategy call now</h3>
        <p className="text-blue-100 text-sm mb-4">
          Skip the wait. Let's talk about your local search strategy and what's realistic for your business.
        </p>
        <button
          type="button"
          onClick={openCalPopup}
          className="block w-full rounded-xl bg-white text-blue-700 font-bold py-3 text-sm hover:bg-blue-50 transition cursor-pointer"
        >
          Book free 30-min call →
        </button>
      </div>
    </div>
  );
};

export default DownloadSuccess;

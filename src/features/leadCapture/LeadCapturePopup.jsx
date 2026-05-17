import { useState, useEffect, useCallback } from "react";
import DownloadSuccess from "../../components/LandingPages/DownloadSuccess.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const STORAGE_KEY = "ella_lead_popup_dismissed";
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const SOCIAL_SOURCES = new Set([
  "linkedin", "instagram", "facebook", "twitter", "x",
  "tiktok", "social", "ig", "fb", "li",
]);

const isSocialTraffic = () => {
  const params = new URLSearchParams(window.location.search);
  const utmSource = (params.get("utm_source") || "").toLowerCase();
  const utmMedium = (params.get("utm_medium") || "").toLowerCase();
  return SOCIAL_SOURCES.has(utmSource) || utmMedium === "social";
};

const hasDismissed = () => {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (!val) return false;
    // Suppress for 7 days after dismiss, forever after subscribe
    const { reason, at } = JSON.parse(val);
    if (reason === "subscribed") return true;
    if (reason === "dismissed") return Date.now() - at < 7 * 24 * 60 * 60 * 1000;
    return false;
  } catch {
    return false;
  }
};

const markDismissed = (reason = "dismissed") => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ reason, at: Date.now() }));
  } catch {}
};

const LeadCapturePopup = () => {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isSocialTraffic() || hasDismissed()) return;

    // Show after 2.5 seconds so the page has time to paint
    const timer = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => setAnimateIn(true));
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const close = useCallback((reason = "dismissed") => {
    setAnimateIn(false);
    markDismissed(reason);
    setTimeout(() => setVisible(false), 300);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!visible) return;
    const handler = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [visible, close]);

  // Lock body scroll while open
  useEffect(() => {
    if (visible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  if (!visible) return null;

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(email)) e.email = "Please enter a valid email.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setServerError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          source: "social-popup",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSuccess(true);
      markDismissed("subscribed");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => close()}
        className={`fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${animateIn ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        className={`fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-4 sm:p-6 pointer-events-none`}
      >
        <div
          className={`pointer-events-auto w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
            animateIn ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {/* Header bar */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-6 pt-6 pb-5">
            <button
              onClick={() => close()}
              aria-label="Close"
              className="absolute top-4 right-4 text-white/70 hover:text-white transition"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span className="inline-block rounded-full bg-white/15 text-white/90 text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-3">
              Free Resources
            </span>
            <h2 id="popup-title" className="text-xl font-black text-white leading-snug">
              Is your tech holding your team back?
            </h2>
            <p className="text-blue-100 text-sm mt-1.5 leading-relaxed">
              Get the Tech Health Check + CRM Setup Checklist — both free.
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {success ? (
              <DownloadSuccess name={name} />
            ) : (
              <>
                {/* Mini benefit list */}
                <ul className="space-y-2 mb-5">
                  {[
                    "See exactly where your systems are leaking time",
                    "Step-by-step CRM setup guide — launch in 3 weeks",
                    "Real follow-up from a real person — not a bot",
                  ].map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <svg className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>

                <form onSubmit={handleSubmit} noValidate className="space-y-3">
                  <div>
                    <input
                      type="text" autoComplete="given-name"
                      value={name} onChange={(e) => setName(e.target.value)} onInput={(e) => setName(e.target.value)}
                      disabled={loading} placeholder="Your first name"
                      className={`w-full rounded-xl border px-4 py-3 text-slate-800 text-[15px] outline-none transition focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 ${errors.name ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email" autoComplete="email"
                      value={email} onChange={(e) => setEmail(e.target.value)} onInput={(e) => setEmail(e.target.value)}
                      disabled={loading} placeholder="Email address"
                      className={`w-full rounded-xl border px-4 py-3 text-slate-800 text-[15px] outline-none transition focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 ${errors.email ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {serverError && (
                    <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">{serverError}</p>
                  )}

                  <button
                    type="submit" disabled={loading}
                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-[15px] transition disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending…
                      </>
                    ) : "Send me the free resources"}
                  </button>
                </form>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
                  <button
                    onClick={() => close()}
                    className="text-xs text-slate-400 hover:text-slate-600 underline transition"
                  >
                    No thanks
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadCapturePopup;

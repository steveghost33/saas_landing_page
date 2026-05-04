import { useEffect, useRef, useState } from "react";

const CAL_ORIGIN = "https://cal.com";
const CAL_SCRIPT_SRC = "https://app.cal.com/embed/embed.js";
const CAL_LINK = "ella-tech-7ze7wk";

let calLoaderPromise;

const loadCalEmbedScript = () => {
  if (typeof window === "undefined") return Promise.resolve(null);

  if (window.Cal) return Promise.resolve(window.Cal);
  if (calLoaderPromise) return calLoaderPromise;

  calLoaderPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${CAL_SCRIPT_SRC}"]`);

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.Cal), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load Cal.com embed script.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = CAL_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(window.Cal);
    script.onerror = () => reject(new Error("Failed to load Cal.com embed script."));
    document.head.appendChild(script);
  });

  return calLoaderPromise;
};

const CalInlineEmbed = ({ className = "" }) => {
  const containerRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;

    const mountEmbed = async () => {
      const cal = await loadCalEmbedScript();
      if (cancelled || !cal || !container) return;

      container.innerHTML = "";

      cal("init", { origin: CAL_ORIGIN });
      cal("inline", {
        elementOrSelector: container,
        calLink: CAL_LINK,
      });
      cal("ui", {
        hideEventTypeDetails: true,
        showTimezoneWhenEventDetailsHidden: true,
        styles: {
          body: {
            background: "transparent",
          },
        },
      });
    };

    mountEmbed().catch((error) => {
      setHasError(true);
      console.error(error);
    });

    return () => {
      cancelled = true;
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  if (hasError) {
    return (
      <div className={`flex min-h-[960px] items-center justify-center p-8 text-center ${className}`}>
        <div className="max-w-xl space-y-4">
          <h3 className="text-2xl font-bold text-p4">Book Your Consultation</h3>
          <p className="text-lg text-p5">
            The scheduling widget did not load, but your booking page is still available.
          </p>
          <a
            href={`${CAL_ORIGIN}/${CAL_LINK}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-p1 px-6 py-3 font-poppins font-bold uppercase tracking-wide text-s1 transition-colors duration-200 hover:bg-p1/90"
          >
            Open Secure Booking Page
          </a>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className={className} aria-label="Schedule a consultation" />;
};

export default CalInlineEmbed;

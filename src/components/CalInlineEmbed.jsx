import { useEffect, useRef, useState } from "react";

const CAL_ORIGIN = "https://app.cal.com";
const CAL_SCRIPT_SRC = "https://app.cal.com/embed/embed.js";
const CAL_LINK = "ella-tech-7ze7wk";

const ensureCalLoader = () => {
  if (typeof window === "undefined") return null;

  if (!window.Cal) {
    ((C, A, L) => {
      const queue = (api, args) => api.q.push(args);
      const doc = C.document;

      C.Cal = C.Cal || function calProxy() {
        const cal = C.Cal;
        const args = arguments;

        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const script = doc.createElement("script");
          script.src = A;
          script.async = true;
          doc.head.appendChild(script);
          cal.loaded = true;
        }

        if (args[0] === L) {
          const api = function namespaceProxy() {
            queue(api, arguments);
          };
          const namespace = args[1];
          api.q = api.q || [];

          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            queue(cal.ns[namespace], args);
            queue(cal, ["initNamespace", namespace]);
          } else {
            queue(cal, args);
          }

          return;
        }

        queue(cal, args);
      };
    })(window, CAL_SCRIPT_SRC, "init");
  }

  return window.Cal;
};

const CalInlineEmbed = ({ className = "" }) => {
  const containerRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let cancelled = false;

    const initializeEmbed = async () => {
      const cal = ensureCalLoader();
      if (cancelled || !cal) return;

      cal("init", { origin: CAL_ORIGIN });
      cal("inline", {
        elementOrSelector: container,
        calLink: CAL_LINK,
        config: {
          layout: "month_view",
          theme: "dark",
        },
      });
      cal("ui", {
        hideEventTypeDetails: true,
        layout: "month_view",
        theme: "dark",
        styles: {
          body: {
            background: "transparent",
          },
          enabledDateButton: {
            background: "#2EF2FF",
            color: "#080D27",
          },
        },
      });
    };

    initializeEmbed().catch((error) => {
      setHasError(true);
      console.error(error);
    });

    return () => {
      cancelled = true;
      container.innerHTML = "";
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

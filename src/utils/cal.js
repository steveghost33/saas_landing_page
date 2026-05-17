const CAL_ORIGIN = "https://app.cal.com";
const CAL_SCRIPT_SRC = "https://app.cal.com/embed/embed.js";
export const CAL_LINK = "ella-tech-7ze7wk";

export const ensureCalLoader = () => {
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

export const openCalPopup = () => {
  const cal = ensureCalLoader();
  if (!cal) return;
  cal("init", { origin: CAL_ORIGIN });
  cal("modal", {
    calLink: CAL_LINK,
    config: { layout: "month_view", theme: "dark" },
  });
};

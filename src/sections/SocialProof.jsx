import { BOOKING_PATH } from "../data/site.js";

const stats = [
  {
    value: "15+",
    label: "Years of hands-on technology experience",
  },
  {
    value: "Detroit",
    label: "Community-first, Michigan-rooted practice",
  },
  {
    value: "3",
    label: "Service areas: Web, Systems, and Training",
  },
  {
    value: "100%",
    label: "Hands-on implementation, not just advice",
  },
];

const sectors = [
  "Nonprofits",
  "Small Business",
  "Faith Organizations",
  "Community Teams",
  "Healthcare",
  "Education",
];

const SocialProof = () => {
  return (
    <section className="relative pt-20 pb-20 max-md:pt-14 max-md:pb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-s4/20 blur-[160px] -z-10"
      />

      <div className="container">
        <p className="caption text-center mb-4">Built on Real Results</p>

        <h2 className="text-center h3 max-md:text-3xl max-md:leading-tight text-p4 uppercase font-black mb-4 max-w-2xl mx-auto">
          Trusted by Detroit nonprofits and organizations
        </h2>

        <p className="text-center text-p5 body-1 max-w-xl mx-auto mb-14 max-md:mb-10">
          Practical technology implementation with 15 years of experience behind
          every recommendation.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-s3/50 bg-s2/60 px-5 py-8 text-center flex flex-col items-center gap-3"
            >
              <span className="text-4xl max-md:text-3xl font-black text-p1 leading-none">
                {value}
              </span>
              <span className="text-p5 text-sm leading-snug">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mb-14 max-md:mb-10">
          {sectors.map((sector) => (
            <span
              key={sector}
              className="rounded-full border border-s3/50 bg-s2/40 px-4 py-1.5 text-p5 text-sm font-medium"
            >
              {sector}
            </span>
          ))}
        </div>

        <div className="text-center">
          <p className="text-p5/80 text-[15px] mb-4">
            Ready to see what clear, practical tech guidance looks like for your
            organization?
          </p>
          <a
            href={BOOKING_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-p1 font-semibold text-[15px] hover:underline transition-all duration-200 group"
          >
            Book your free 30-minute session
            <svg
              width="14"
              height="14"
              viewBox="0 0 10 10"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                d="M2 5h6M5 2l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

import Button from "../components/Button.jsx";

function AboutFounder() {
  return (
    <section className="py-20 bg-s1">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <p className="caption text-p3 uppercase tracking-wider mb-4 text-center">About the founder</p>
          <h2 className="h3 max-md:h5 text-p4 mb-8 text-center">
            Steven Bowman, Founder
          </h2>

          <div className="rounded-3xl border-2 border-s3 g7 p-10 max-md:p-6">
            <p className="body-1 text-p5 mb-5">
              Steven Bowman founded Ella Tech Solutions after approximately 15 years as an IT leader and program director inside nonprofits and large organizations across Michigan. He has direct, hands-on experience implementing CRM systems, building learning platforms, setting up Microsoft 365 environments, and training staff in organizational settings where budgets are limited and technology decisions have real operational consequences.
            </p>
            <p className="body-1 text-p5 mb-5">
              Steven serves as CTO of Ella Tech Solutions, providing senior-level technology strategy directly to each client. Most clients are nonprofits with annual budgets between $500,000 and $5 million that need a trusted technology partner, not a generic vendor.
            </p>
            <p className="body-1 text-p5 mb-8">
              Steven is based in Detroit, Michigan and works with organizations in metro Detroit, southeast Michigan, and nationwide via remote engagements.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="/#contact" containerClassName="inline-block">
                Book a free consultation
              </Button>
              <a
                href="https://www.linkedin.com/company/ella-tech-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-s3 rounded-2xl px-6 py-3 text-p5 text-sm font-semibold hover:border-p1 transition-colors"
              >
                <img src="/images/socials/linkedin.svg" alt="" aria-hidden="true" className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutFounder;

import { Link } from "react-router-dom";

const audiences = [
  {
    label: "Primary",
    heading: "Nonprofits",
    subheading: "Annual budgets $500K to $5M",
    description:
      "Ella Tech Solutions primarily works with nonprofits that are growing faster than their current technology can support. These organizations need CRMs that staff actually use, websites that communicate their mission clearly, and AI tools that save time without requiring a technical background. Mission-driven pricing is available for verified 501(c)(3) organizations.",
    link: "/services/nonprofits",
    linkLabel: "Nonprofit services",
  },
  {
    label: "Secondary",
    heading: "Small Businesses",
    subheading: "5 to 20 employees",
    description:
      "Ella Tech Solutions works with service-based small businesses nationwide that need practical technology setup and staff training without enterprise contracts or long retainers. Common projects include website redesigns, CRM setup, Microsoft 365 implementation, and AI workflow automation.",
    link: "/services/small-business",
    linkLabel: "Small business services",
  },
];

function WhoWeServe() {
  return (
    <section className="py-16 bg-s1">
      <div className="container">
        <h2 className="h3 max-md:h5 text-p4 mb-3 text-center">Who we work with</h2>
        <p className="body-1 text-p5 text-center max-w-2xl mx-auto mb-12">
          We specialize in two types of organizations. Our work is focused, not general-purpose.
        </p>

        <div className="relative flex md:flex-row flex-col gap-4 border-2 border-s3 rounded-7xl md:overflow-hidden g7 max-md:border-none max-md:rounded-none max-md:g0">
          {audiences.map(({ label, heading, subheading, description, link, linkLabel }, i) => (
            <div
              key={heading}
              className={`flex-1 flex flex-col px-8 py-10 max-md:g7 max-md:border-2 max-md:border-s3 max-md:rounded-3xl ${
                i < audiences.length - 1 ? "md:border-r-2 md:border-r-s3" : ""
              }`}
            >
              <span className="caption text-p3 uppercase tracking-wider mb-2">{label}</span>
              <h3 className="h4 text-p4 mb-1">{heading}</h3>
              <p className="text-sm text-p3/70 font-semibold uppercase tracking-wide mb-5">{subheading}</p>
              <p className="body-1 text-p5 mb-6 flex-1">{description}</p>
              <Link
                to={link}
                className="inline-flex items-center gap-2 text-p1 font-semibold text-sm uppercase tracking-wide hover:underline"
              >
                {linkLabel} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhoWeServe;

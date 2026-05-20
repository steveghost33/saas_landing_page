/*
 * TODO: Testimonials section
 *
 * Testimonial images exist at /public/images/testimonials/:
 *   erica-collins.png, jason-reed.png, lisa-howard.png,
 *   marcus-brooks.png, rachel-dean.png, sarah-bennett.png
 *
 * To activate this section:
 * 1. Replace the TESTIMONIALS array below with real name, title, org, and quote data.
 * 2. Uncomment the <Testimonials /> import and usage in Home.jsx.
 * 3. Remove this comment block.
 *
 * Each entry should follow this shape:
 *   { name: "...", title: "...", org: "...", quote: "...", image: "/images/testimonials/filename.png" }
 */

const TESTIMONIALS = [
  // TODO: paste real testimonial data here
  // {
  //   name: "Erica Collins",
  //   title: "Executive Director",
  //   org: "TODO: Organization name",
  //   quote: "TODO: Real quote from Erica Collins",
  //   image: "/images/testimonials/erica-collins.png",
  // },
  // {
  //   name: "Jason Reed",
  //   title: "TODO: Title",
  //   org: "TODO: Organization name",
  //   quote: "TODO: Real quote from Jason Reed",
  //   image: "/images/testimonials/jason-reed.png",
  // },
  // {
  //   name: "Lisa Howard",
  //   title: "TODO: Title",
  //   org: "TODO: Organization name",
  //   quote: "TODO: Real quote from Lisa Howard",
  //   image: "/images/testimonials/lisa-howard.png",
  // },
  // {
  //   name: "Marcus Brooks",
  //   title: "TODO: Title",
  //   org: "TODO: Organization name",
  //   quote: "TODO: Real quote from Marcus Brooks",
  //   image: "/images/testimonials/marcus-brooks.png",
  // },
  // {
  //   name: "Rachel Dean",
  //   title: "TODO: Title",
  //   org: "TODO: Organization name",
  //   quote: "TODO: Real quote from Rachel Dean",
  //   image: "/images/testimonials/rachel-dean.png",
  // },
  // {
  //   name: "Sarah Bennett",
  //   title: "TODO: Title",
  //   org: "TODO: Organization name",
  //   quote: "TODO: Real quote from Sarah Bennett",
  //   image: "/images/testimonials/sarah-bennett.png",
  // },
];

function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="py-20 bg-s1">
      <div className="container">
        <p className="caption text-p3 uppercase tracking-wider mb-4 text-center">What clients say</p>
        <h2 className="h3 max-md:h5 text-p4 mb-12 text-center">Results from organizations like yours</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, title, org, quote, image }) => (
            <div
              key={name}
              className="rounded-2xl border-2 border-s3 g7 p-8 flex flex-col"
            >
              <p className="body-1 text-p5 italic mb-6 flex-1">&ldquo;{quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <img
                  src={image}
                  alt={name}
                  width="48"
                  height="48"
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-p4 font-semibold text-sm">{name}</p>
                  <p className="text-p5/70 text-xs">{title}, {org}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

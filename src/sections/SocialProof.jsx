/* PLACEHOLDER: Entire social proof section. Swap in real testimonials, client names, and stats when ready. */

const SocialProof = () => {
  return (
    <section className="py-16 bg-s1">
      <div className="container mx-auto px-4">

        {/* Stat bar */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-8 mb-16 text-center">
          <div className="text-p3 font-semibold text-sm md:text-base tracking-wide">
            15+ years in tech and education
          </div>
          <span className="text-p5 opacity-30 hidden md:block">|</span>
          <div className="text-p3 font-semibold text-sm md:text-base tracking-wide">
            Detroit-based
          </div>
          <span className="text-p5 opacity-30 hidden md:block">|</span>
          <div className="text-p3 font-semibold text-sm md:text-base tracking-wide">
            Nonprofits, small businesses, community orgs
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">

          {/* PLACEHOLDER: Replace with real testimonial from a nonprofit executive director */}
          <div className="rounded-3xl border-2 border-s3 p-8 bg-gradient-to-br from-s2 to-s1">
            <p className="body-1 text-p5 mb-6 italic leading-relaxed">
              "Before Ella Tech, we had three different systems that none of our staff knew how to use. Steven came in, figured out exactly what we needed, and had us running in six weeks. Our team actually logs in now."
            </p>
            {/* PLACEHOLDER: Replace with real name, title, and organization */}
            <div>
              <p className="text-p4 font-semibold">Maria T.</p>
              <p className="text-p3 text-sm">Executive Director, Detroit-area nonprofit</p>
            </div>
          </div>

          {/* PLACEHOLDER: Replace with real testimonial from a small business owner */}
          <div className="rounded-3xl border-2 border-s3 p-8 bg-gradient-to-br from-s2 to-s1">
            <p className="body-1 text-p5 mb-6 italic leading-relaxed">
              "We had a website that embarrassed us every time we handed out a business card. Steven rebuilt it, showed us how to update it ourselves, and it looks like we actually know what we are doing now."
            </p>
            {/* PLACEHOLDER: Replace with real name, title, and organization */}
            <div>
              <p className="text-p4 font-semibold">James W.</p>
              <p className="text-p3 text-sm">Owner, Detroit small business</p>
            </div>
          </div>
        </div>

        {/* Client name placeholders */}
        <div className="mb-16">
          <p className="text-center text-p3 text-sm uppercase tracking-widest mb-6 opacity-60">
            Organizations we have worked with
          </p>
          {/* PLACEHOLDER: Replace each name below with a real client name or logo */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              "Detroit Org One",
              "Community Partner Two",
              "Nonprofit Three",
              "Small Business Four",
              "Community Org Five",
            ].map((name) => (
              <div
                key={name}
                className="px-5 py-2 rounded-xl border border-s3/60 text-p5 text-sm font-medium opacity-60"
              >
                {/* PLACEHOLDER: client name */}
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* About / Trust signals */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="body-1 text-p5 mb-4 leading-relaxed">
            Steven Bowman has spent 15+ years at the intersection of education, technology, and social impact. Software engineering training, real-world implementation, and a career built in Detroit means he knows what it takes to get technology working inside organizations that cannot afford to get it wrong.
          </p>
          <p className="text-p3 font-semibold text-base">
            Born and built in Detroit. We work with the organizations that make this city move.
          </p>
        </div>

      </div>
    </section>
  );
};

export default SocialProof;

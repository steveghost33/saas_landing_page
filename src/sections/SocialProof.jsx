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
            Remote-first, nationwide
          </div>
          <span className="text-p5 opacity-30 hidden md:block">|</span>
          <div className="text-p3 font-semibold text-sm md:text-base tracking-wide">
            Nonprofits, small businesses, community orgs
          </div>
        </div>

        {/* About / Trust signals */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="body-1 text-p5 mb-4 leading-relaxed">
            Ella Tech Solutions has spent 15+ years at the intersection of education, technology, and social impact. Software engineering training, real-world implementation, and deep experience inside nonprofits, school districts, and community organizations means we know what it takes to get technology working inside organizations that cannot afford to get it wrong.
          </p>
          <p className="text-p3 font-semibold text-base">
            We work with mission-driven organizations wherever they are.
          </p>
        </div>

      </div>
    </section>
  );
};

export default SocialProof;

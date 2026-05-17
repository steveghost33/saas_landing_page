import Button from "../components/Button.jsx";
import PageSEO from "../components/PageSEO.jsx";
import PageShell from "../components/PageShell.jsx";
import { useScrollToHash } from "../hooks/useScrollToHash.js";
import { SITE_URL } from "../data/site.js";

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Ella Tech Solutions Blog",
  description:
    "Practical technology guides for small businesses, nonprofits, and entrepreneurs. Topics cover CRM setup, AI automation, Microsoft 365, website design, and digital strategy.",
  url: `${SITE_URL}/blog`,
  publisher: {
    "@type": "Organization",
    name: "Ella Tech Solutions",
    url: SITE_URL,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  },
};

const upcomingPosts = [
  {
    slug: "how-to-set-up-a-crm-for-a-small-business",
    title: "How to Set Up a CRM for a Small Business (Without Overcomplicating It)",
    description:
      "Most small business owners either skip a CRM entirely or buy one they never use. This guide walks through how to choose the right CRM, what to set up first, and how to make sure your team actually uses it.",
    audience: "Small Business",
    keyword: "how to set up a CRM for a small business",
  },
  {
    slug: "best-microsoft-365-plan-for-nonprofits",
    title: "The Best Microsoft 365 Plan for Nonprofits — And What Most Organizations Miss",
    description:
      "Nonprofits can get Microsoft 365 at a steep discount through TechSoup. But which plan do you actually need, and what setup steps do most organizations skip? This guide covers it all.",
    audience: "Nonprofit",
    keyword: "best Microsoft 365 plan for nonprofits",
  },
  {
    slug: "how-to-automate-your-business-with-ai",
    title: "How to Automate Your Business with AI (Without Buying New Software)",
    description:
      "Most small business owners and entrepreneurs already have access to AI tools they're not using. This guide identifies the five highest-impact automation wins — using tools you already subscribe to.",
    audience: "Entrepreneurs & Small Business",
    keyword: "how to automate your business with AI",
  },
  {
    slug: "website-design-for-nonprofits",
    title: "What a Good Nonprofit Website Actually Needs (And What Wastes Your Budget)",
    description:
      "Nonprofit websites fail for predictable reasons: unclear messaging, no donation flow, and content organized for staff instead of visitors. Here's what to prioritize when building or redesigning your site.",
    audience: "Nonprofit",
    keyword: "website design for nonprofits Detroit",
  },
  {
    slug: "tech-stack-for-solopreneurs",
    title: "The Lean Tech Stack for Solopreneurs: 7 Tools That Cover Everything",
    description:
      "You don't need 15 subscriptions to run a professional solo business. Here's the exact tech stack — website, CRM, email, scheduling, payments, automation, and storage — that covers everything for under $100/month.",
    audience: "Entrepreneurs",
    keyword: "tech support for entrepreneurs Michigan",
  },
];

function Blog() {
  useScrollToHash({ defaultToTop: true });

  return (
    <>
      <PageSEO
        title="Tech Tips & Guides | Ella Tech Solutions Blog"
        description="Practical technology guides for small businesses, nonprofits, and entrepreneurs. CRM setup, AI automation, Microsoft 365, and digital strategy — in plain language."
        canonical={`${SITE_URL}/blog`}
        schema={schema}
      />

      <PageShell mainClassName="overflow-hidden pt-[160px] md:pt-[180px] min-h-screen bg-s1">
        <section className="relative pt-16 pb-32 bg-s1 font-poppins text-p5">
          <div className="container max-w-4xl mx-auto">

            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-p1 text-sm font-semibold uppercase tracking-[0.18em] mb-4">Resources</p>
              <h1 className="h2 text-p4 mb-4">Plain-language guides for people who aren't IT professionals.</h1>
              <p className="body-1 text-p5 max-w-2xl mx-auto">
                Practical technology guides for small businesses, nonprofits, and entrepreneurs. No jargon, no vendor bias — just clear advice on the tools and systems that actually move the needle.
              </p>
            </div>

            {/* Coming Soon Banner */}
            <div className="rounded-3xl border border-p1/30 bg-s2/60 p-10 mb-16 text-center">
              <p className="text-p1 font-semibold uppercase tracking-wide text-sm mb-3">Coming Soon</p>
              <h2 className="h3 text-p4 mb-4">The blog is on its way.</h2>
              <p className="body-1 text-p5 max-w-xl mx-auto mb-6">
                The first posts are in production. Want to be notified when they go live? Book a consultation and we'll add you to our update list.
              </p>
              <Button href="/#contact" containerClassName="inline-block mx-auto">
                Get Notified
              </Button>
            </div>

            {/* Upcoming Posts Preview */}
            <div>
              <h2 className="h3 text-p4 mb-8">First posts dropping soon:</h2>
              <div className="space-y-6">
                {upcomingPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="rounded-2xl border border-s3/40 bg-s2/50 p-6"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-p1 bg-p1/10 border border-p1/20 rounded-full px-3 py-1">
                        {post.audience}
                      </span>
                    </div>
                    <h3 className="h4 text-p4 mb-2">{post.title}</h3>
                    <p className="body-1 text-p5">{post.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-20">
              <h2 className="h4 mb-4 text-p4">Have a question we haven't covered?</h2>
              <p className="body-1 mb-8 max-w-xl mx-auto text-p5">
                Book a free 30-minute consultation. We'll answer your specific tech questions and give you a clear path forward — no blog post required.
              </p>
              <Button href="/#contact" containerClassName="inline-block mx-auto">
                Book a Free Consultation
              </Button>
            </div>

          </div>
        </section>
      </PageShell>
    </>
  );
}

export default Blog;

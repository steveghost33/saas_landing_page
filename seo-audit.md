# SEO Audit: ellatechsolutions.com
**Date:** 2026-05-20  
**Auditor:** SEO Audit Skill (seo-audit v2.0.0)  
**Framework:** React SPA — Vite 6, React 19, React Router 7, Tailwind CSS 3, Netlify  
**Site type:** Local business / professional services

---

## Executive Summary

**Overall health: 4.5/10 — Moderate, with one critical blocker**

The content quality, schema groundwork, and information architecture are all better than average for a small business site. The blog posts are genuinely authoritative. The service pages are specific and well-structured. The structured data in the codebase is thoughtful.

None of that matters until the critical blocker is resolved.

The site is a pure client-side React SPA deployed on Netlify with `/* /index.html 200` redirects. Every URL on the site serves an HTML file whose entire body is `<div id="root"></div>`. Googlebot can render JavaScript and will eventually index the content — with a delay. But AI crawlers (GPTBot, ClaudeBot, PerplexityBot), Bing's crawlers, and a significant portion of traditional SEO crawlers do not execute JavaScript. They see a blank page.

All title tags, meta descriptions, canonical tags, structured data from React Helmet, and every word of copy are invisible until JavaScript runs. This is an architectural SEO liability that should be addressed before any other optimization.

### Top 5 Priority Issues

1. **[CRITICAL] Pure client-side rendering** — all body content and React Helmet metadata require JavaScript; non-JS crawlers see `<div id="root"></div>` only
2. **[HIGH] Homepage H1 is keyword-free** — "We handle the tech. You run your business." contains no company name, no city, no target audience
3. **[HIGH] Three title tags exceed 60 characters** — TechSolutions (68 chars) and WebProjects (89 chars) will be truncated in SERPs
4. **[HIGH] hero.png is 5.1 MB** — a 5-megabyte PNG on the homepage will fail Core Web Vitals LCP; no lazy loading is implemented anywhere on the site
5. **[MEDIUM] No canonical tag in static HTML** — canonicals are injected by React Helmet (JS-only); crawlers that don't execute JavaScript see no canonical signals at all

### Quick Wins
- Add `<link rel="canonical">` to the static `index.html` pointing to the homepage
- Compress or convert `hero.png` (5.1 MB) and `peak-form.png` (3 MB) to WebP
- Add `loading="lazy"` to all below-fold images
- Fix the two over-length title tags
- Add explicit `width` and `height` attributes to hero images to prevent CLS

---

## Section 1: Crawlability & Indexation

### 1.1 Robots.txt

**Status: PASS (recently updated)**

```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /
...
User-agent: *
Allow: /

Sitemap: https://www.ellatechsolutions.com/sitemap.xml
```

Explicit Allow directives for GPTBot, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, CCBot, Applebot-Extended, Bytespider, and Amazonbot were added. Sitemap reference is present. No unintentional blocks found.

**Remaining gap:** The robots.txt is now correctly configured, but the SPA rendering issue means most of the pages being "allowed" have no readable content for non-JS crawlers.

---

### 1.2 XML Sitemap

**Status: PASS with gaps**

`/public/sitemap.xml` exists, is valid XML, and is referenced in robots.txt. It covers 13 URLs with `lastmod` dates and `changefreq` values.

**Pages included:**
- Homepage, /web-projects, /tech-solutions, /blog, /blog/how-to-set-up-crm-for-nonprofit, /blog/nonprofit-website-mistakes
- /services/small-business, /services/nonprofits, /services/entrepreneurs
- /crm-checklist, /tech-health-check, /terms-of-use, /legal

**Gaps:**
| Missing URL | Priority | Reason |
|-------------|----------|--------|
| No `/faq` page exists yet | High | Planned in AEO roadmap |
| No service-specific pages | Medium | `/services/website-design`, `/services/crm-setup`, etc. are planned |
| `/download-success` not listed | Low | Possibly intentional; confirm noindex is set |

---

### 1.3 Client-Side Rendering (CRITICAL BLOCKER)

**Status: FAIL — Critical**

- **Issue:** The entire site is a React SPA. The Netlify `_redirects` file routes all URLs (`/* /index.html 200`) to the same `index.html`. The body of that file contains only `<div id="root"></div>` before the JavaScript bundle.
- **Impact:** HIGH — All body content is invisible to non-JS crawlers. Googlebot will eventually render the JavaScript, but with a delay of days to weeks. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) and many SEO crawlers do not execute JavaScript at all.
- **What crawlers actually see in the body:** An empty `<div>`. No headings, no paragraphs, no FAQ text, no service descriptions, no navigation links.
- **Evidence:** `grep -c "root" index.html` confirms the body has only the root div.
- **Fix:** One of the following:
  1. **Recommended (minimal scope):** Add a static HTML content block to `index.html` before `<div id="root">` with all key content (company definition, services, FAQ, contact). Use an off-screen CSS technique or JavaScript to hide it from users after React mounts. This is the correct pattern for React SPAs that cannot add SSR.
  2. **Long-term:** Migrate to a framework with static site generation (Next.js, Astro, Remix) that produces pre-rendered HTML per route.
- **Priority:** P1 — Fix before any other optimization has meaningful impact.

---

### 1.4 Canonicalization

**Status: FAIL**

- **Issue:** No canonical tag exists in the static `index.html`. Canonical tags are injected per-page by `react-helmet-async`, which requires JavaScript execution.
- **Impact:** MEDIUM — Without a canonical in the static HTML, crawlers that don't execute JavaScript have no canonical signal for any URL. Googlebot will handle this (it renders JS), but it's a gap for other crawlers.
- **Fix:** Add `<link rel="canonical" href="https://www.ellatechsolutions.com/">` to the static `<head>` in `index.html`. This will be the correct canonical for the homepage; per-page canonicals from React Helmet will override it when JavaScript runs.
- **Priority:** P2

---

### 1.5 www vs. non-www

**Status: UNKNOWN from code**

All internal URLs in the codebase use `https://www.ellatechsolutions.com`. Sitemap entries use `https://www.ellatechsolutions.com`. Structured data uses `https://www.ellatechsolutions.com`. This is consistent, which is correct. Confirm at DNS level that `ellatechsolutions.com` (non-www) redirects to `www.ellatechsolutions.com` with a 301.

---

### 1.6 Internal Linking

**Status: FAIL (same root cause as rendering)**

- All navigation links are rendered by React Router (JavaScript). The static HTML has zero anchor tags in the body.
- Google can follow JavaScript-rendered links but not immediately. AI crawlers and some SEO bots cannot follow them at all.
- Footer contains links to all major sections — but these are only accessible post-JavaScript.
- **Fix:** The static content block added in the CSR fix should include anchor links to all main pages.

---

## Section 2: Technical Foundations

### 2.1 Page Speed & Core Web Vitals

**Status: NEEDS WORK**

#### Image sizes (from filesystem inspection):

| File | Size | Issue |
|------|------|-------|
| `hero.png` | **5.1 MB** | Critical — this PNG is referenced in codebase |
| `projects/peak-form.png` | **3.0 MB** | High — project card image |
| `projects/ellatech.png` | **2.2 MB** | High — project card image |
| `projects/build-by-steven.png` | **1.7 MB** | Medium |
| `main-photo.jpg` | 415 KB | Acceptable |
| `ellalogo.png` | 208 KB | Medium — logo should be SVG or much smaller |

**LCP risk:** `hero.png` at 5.1 MB will almost certainly fail the LCP threshold of 2.5 seconds on any connection slower than fiber. This is the single largest quick-win performance fix available.

**Recommendations:**
- Convert all PNG images to WebP (typically 25-35% smaller)
- Compress `hero.png` — a hero image should be under 200 KB
- Add `fetchpriority="high"` to the LCP image (hero/main-photo)
- Add explicit `width` and `height` attributes to prevent CLS

#### Lazy loading:
- **Issue:** No `loading="lazy"` attribute found on any `<img>` tag in the codebase.
- **Impact:** All images (including project cards and blog thumbnails loaded far below the fold) are fetched eagerly, increasing bandwidth and delaying TTI.
- **Fix:** Add `loading="lazy"` to all below-fold images. Keep the hero/main-photo eager (`loading="eager"` or omit the attribute).

#### JavaScript bundle:
- Vite with React — reasonable setup, code splitting likely in production build
- Cal.com inline embed (`CalInlineEmbed`) is a third-party embed in the Contact section that could introduce layout shift and delay

---

### 2.2 Mobile-Friendliness

**Status: PASS**

- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present in static HTML
- Tailwind CSS is used with mobile-first breakpoints throughout
- Responsive patterns observed in all components
- `MobileBookingBar` component exists for mobile-specific UX
- No horizontal scroll patterns found in code

---

### 2.3 Security & HTTPS

**Status: PASS**

- Site URL consistently uses `https://`
- `public/_headers` configures HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP, and Permissions-Policy
- HTTPS forced via Netlify headers
- No mixed content found in code

---

### 2.4 URL Structure

**Status: PASS**

URLs are clean, readable, and lowercase with hyphens:
- `/services/small-business` ✓
- `/services/nonprofits` ✓
- `/blog/how-to-set-up-crm-for-nonprofit` ✓
- `/tech-solutions` ✓
- `/web-projects` ✓

No issues with parameters, uppercase, or underscores.

---

## Section 3: On-Page SEO

### 3.1 Title Tags

**Status: NEEDS WORK**

| Page | Title | Chars | Issue |
|------|-------|-------|-------|
| Homepage | "Ella Tech Solutions \| Technology Consulting Detroit, MI" | 55 | OK |
| /tech-solutions | "Tech Solutions & Training \| CRM, AI Automation, LMS, HRIS — Detroit" | **69** | Over 60 chars, em dash |
| /web-projects | "Web Projects \| Ella Tech Solutions — Web Design for Nonprofits, Businesses & Entrepreneurs" | **90** | Far over 60 chars, em dash |
| /services/nonprofits | "Nonprofit Tech Consulting Detroit \| Ella Tech Solutions" | 55 | OK |
| /services/small-business | "Tech Consulting for Small Businesses Detroit \| Ella Tech" | 57 | OK |
| /services/entrepreneurs | "Tech Consulting for Entrepreneurs Detroit \| Ella Tech" | 54 | OK |
| /blog | "Tech Strategy Blog \| Ella Tech Solutions" | 41 | Undershooting — could be more specific |
| /blog/:slug | Dynamic — `${post.title} \| Ella Tech Solutions` | Varies | Both blog post titles will likely be fine |

**Issues:**
1. `/tech-solutions` title (69 chars) — truncated in Google; contains em dash (prohibited in task brief)
2. `/web-projects` title (90 chars) — significantly truncated; contains em dash; "Entrepreneurs" should likely not be in the primary title for AEO targeting
3. All titles are JS-injected via React Helmet — invisible to non-JS crawlers
4. Static `index.html` has `<title>Ella Tech Solutions | Technology Consulting Detroit, MI</title>` as the fallback — this is correct

**Fix for /tech-solutions:** "CRM Setup, AI Automation, LMS and Staff Training Detroit | Ella Tech Solutions" (77 chars — still long but meaningful; shorten to "CRM, AI, LMS and Staff Training Detroit | Ella Tech" at 51)

**Fix for /web-projects:** "Website Design for Nonprofits and Small Businesses | Ella Tech Solutions" (72 chars) or "Nonprofit Website Design Detroit | Ella Tech Solutions" (54 chars)

---

### 3.2 Meta Descriptions

**Status: ACCEPTABLE (JS-dependent)**

All meta descriptions are set via React Helmet and are page-specific. Quality is good — they are descriptive, include location and audience signals, and are within reasonable length.

The descriptions are invisible in the static HTML (no meta description in index.html's `<head>`). This is a gap for non-JS crawlers.

**Fix:** Add a static meta description to `index.html` as a fallback: `<meta name="description" content="Ella Tech Solutions is a Detroit-based technology consulting firm helping nonprofits and small businesses with CRM setup, website design, AI workflow integration, staff training, and Microsoft 365 implementation.">`

---

### 3.3 Heading Structure

**Status: NEEDS WORK on homepage**

| Page | H1 | Assessment |
|------|----|------------|
| Homepage | "We handle the tech. You run your business." | Fail — no company name, no keyword, no city, no audience |
| /tech-solutions | "Tech Solutions & Training" | Weak — generic, ampersand instead of "and" |
| /web-projects | "Web Projects" | Very thin — two words, no keyword context |
| /services/nonprofits | "Technology built around your nonprofit's real needs." | Good — audience is clear |
| /services/small-business | "Technology that helps your small business grow." | Good |
| /services/entrepreneurs | "Tech that keeps up when you're building fast." | OK |
| Blog | Not checked — dynamic |

**Homepage H1 fix:** Change to something like:
"Ella Tech Solutions: Technology Consulting for Nonprofits and Small Businesses in Detroit, MI"

This contains: brand name, service type, primary audience, location — all targets for organic search and LLM citation.

**H2 structure on homepage:**
The homepage uses sections but the heading hierarchy is inconsistent. Services section uses `h2` inside the Services component. Plans section also uses `h2`. There's no clear page-level content hierarchy that a crawler can follow.

---

### 3.4 Content Optimization

**Status: GOOD (once rendering is fixed)**

The content quality is high. Specific observations:

**Homepage:**
- Hero paragraph: "From CRM setup to AI automation, we help small businesses, nonprofits, and entrepreneurs get the right tools working — and make sure your team actually uses them." Contains em dash. Good intent but not keyword-dense.
- SocialProof section: "15+ Years in tech & education" — good credibility signal but "education" should be "technology leadership" per the business context; the site is explicitly NOT targeting schools or educational institutions
- Services section: Well-written, specific, includes abbreviation expansion (CRM, LMS) — good for SEO and user comprehension
- Plans section: Detailed service cards with bulleted specifics — excellent

**Service pages:**
- Nonprofits page: Strong, specific copy with realistic client scenarios (quoted anecdotes without names). Includes budget/timeline context.
- SmallBusiness page: Good — specific about problem types and workflow context
- TechSolutions page: Good depth, good section structure

**Blog:**
- Two posts, both ~7 minutes read length, high quality
- "How to Set Up a CRM for a Nonprofit" — covers a high-value organic keyword
- "What a Good Nonprofit Website Actually Needs" — strong diagnostic-style content
- Blog posts include cross-links to each other — good internal linking within blog
- Author is credited (Steven Bowman) — good for E-E-A-T

**Missing content that organic search would benefit from:**
- "Fractional CTO for nonprofits" — this phrase appears zero times in the codebase; it's in the business positioning but not on the site
- Target budget range ("$500K to $5M nonprofits") — nowhere on the site
- Specific CRM names (Salesforce, Bloomerang, HubSpot) — mentioned in nonprofits page but not prominently in meta/titles
- "AI literacy training" as a standalone keyword target — appears in content but not in titles or H1s

---

### 3.5 Keyword Targeting Assessment

**Target queries vs. current coverage:**

| Target Query | Coverage | Gap |
|-------------|----------|-----|
| "Detroit technology consulting nonprofits" | Homepage title partial | H1 doesn't contain it |
| "CRM setup nonprofit Detroit" | Nonprofits page | Not in title or H1 |
| "nonprofit CRM implementation Michigan" | Blog post | Good — post has depth |
| "fractional CTO nonprofit Detroit" | Zero coverage | Entire phrase missing from site |
| "AI workflow training nonprofit Michigan" | TechSolutions partial | Not in title/H1 |
| "Microsoft 365 nonprofit setup" | TechSolutions page | Not targeted directly |
| "nonprofit website design Detroit" | WebProjects partial | Title too long/unfocused |
| "LMS development nonprofit" | Multiple pages | Reasonable coverage |
| "staff technology training nonprofit" | TechSolutions | Good detail |
| "tech consulting small business Detroit" | SmallBusiness page | Good |

**Keyword cannibalization check:**
- "CRM" is targeted by TechSolutions, Nonprofits, SmallBusiness, and WebProjects — could dilute signal. Consider a dedicated `/services/crm-setup` page as the canonical CRM destination.
- "AI" appears across multiple pages without a dedicated service page — same issue

---

### 3.6 Image Optimization (On-Page)

**Status: NEEDS WORK**

- Most images have descriptive alt text (confirmed by reading specific files — the grep for missing alt was a multi-line false positive for most cases)
- Exceptions found: some inline icon images (Button.jsx icons, social icons in Footer) use `alt` values of `""` or icon names — minor
- No `width` or `height` attributes on the primary hero image in `Hero.jsx` — this will cause CLS
- No `loading="lazy"` anywhere
- No WebP conversion for any image
- `hero.png` (5.1 MB) is the most critical issue — check whether it's actually used; `main-photo.jpg` (415 KB) is the rendered hero image

**Note:** `hero.png` exists in `/public/images/` but may not be the image rendered in `Hero.jsx`. The rendered image is `/images/main-photo.jpg` (415 KB — acceptable). Verify `hero.png` is used somewhere and if not, it should be deleted.

---

## Section 4: Content Quality (E-E-A-T)

### 4.1 Experience

**Status: GOOD**

- Blog posts demonstrate first-hand experience with real organizational scenarios ("We paid for Salesforce for two years and used maybe 10% of it")
- Nonprofits service page uses realistic quoted client scenarios without fabricated names — credible and appropriate
- 15+ years of experience cited in SocialProof section

**Gap:** "15+ Years in tech & education" in SocialProof — the word "education" is inconsistent with the business brief (explicitly not targeting K-12 or educational institutions). Should read "tech leadership" or "technology and operations."

---

### 4.2 Expertise

**Status: GOOD**

- Accurate, specific technical content throughout (SCORM compliance, Articulate 360, CRM selection criteria, LMS platform selection, Microsoft 365 configuration)
- Blog posts provide diagnostic frameworks rather than surface-level tips — demonstrates real practitioner knowledge
- Author (Steven Bowman) is credited in blog posts and schemas

---

### 4.3 Authoritativeness

**Status: WEAK**

- **No testimonials rendered on the site.** Testimonial images exist at `/public/images/testimonials/` (6 individuals) but no testimonials component is implemented. This is a significant missed opportunity — social proof is not surfaced anywhere a user or crawler can see it.
- **No case studies.** Service pages use hypothetical client quotes ("Our website looked like it was built in 2009") that read as illustrative scenarios, not real case studies.
- **No author bio page.** Steven Bowman is credited in blog posts but there is no `/about` page or author page with credentials, background, and photo.
- **LinkedIn not linked in navigation or footer.** It exists in the `socials` constant but is only linked via the social icons (which are small icons, not prominent).
- **No third-party recognition** — no press mentions, no partner badges, no Google Business Profile link.

---

### 4.4 Trustworthiness

**Status: GOOD**

- Privacy Policy (`/legal`) and Terms of Use (`/terms-of-use`) exist and are linked in footer
- Phone number and email are visible in the footer
- HTTPS enforced with strong security headers
- Company location (Detroit, MI) is consistent across the site
- No misleading claims found

---

## Section 5: Structured Data

### 5.1 Static HTML (visible to all crawlers)

**Status: GOOD (3 of 8 schemas)**

Present in `index.html` and crawlable:
1. `WebSite` with `SearchAction` ✓
2. `Organization` with logo, telephone, address, sameAs (Instagram, Discord) ✓
3. `LocalBusiness` + `ProfessionalService` with serviceType, areaServed, priceRange ✓
4. `SiteNavigationElement ItemList` ✓

**Gaps in static schemas:**
- Missing `legalName: "Ella Tech Solutions, LLC"` in Organization/LocalBusiness
- Missing LinkedIn in `sameAs` (LinkedIn URL is in the codebase at `https://www.linkedin.com/company/ella-tech-solutions`)
- Missing `contactPoint` on Organization
- Missing `Person` schema for Steven Bowman (only embedded as sub-node of Organization)
- Missing `dateModified` and `datePublished`

---

### 5.2 JavaScript-Injected (React Helmet — requires JS)

**Status: EXISTS but NOT crawler-visible**

The following schemas are in the codebase but inject only after JavaScript runs:
- `FAQPage` on homepage — well-structured, 10 Q&As
- `Service` on /tech-solutions — good with `hasOfferCatalog`
- `Service` on /services/nonprofits — good with breadcrumb
- `Service` on /services/small-business — good with breadcrumb
- `Service` on /services/entrepreneurs — good with breadcrumb
- `Blog` schema on /blog — good with publisher and breadcrumb
- `BlogPosting` on blog post pages — includes `datePublished`, `dateModified`, `author` — best schema on the site
- `BreadcrumbList` on all secondary pages — present in Service schemas

**Fix:** Move `FAQPage` schema and a `Person` schema for Steven Bowman to the static `index.html`. The Service-level schemas can remain in React Helmet since they are page-specific and less critical for AI crawler citation.

---

### 5.3 Schema Validation Notes

Based on code inspection (not a live validator run):
- All schemas use correct `@context: "https://schema.org"`
- `@type` values match schema.org vocabulary
- No obvious structural errors in any schema
- `BlogPosting` schema has the most complete implementation with `datePublished`, `dateModified`, `author`, and `keywords`
- **Recommendation:** Run live schemas through https://validator.schema.org after deployment

---

## Section 6: Authority & Links

### 6.1 Internal Links

**Status: ACCEPTABLE (JS-dependent)**

- Footer links all major pages: Small Business Tech, Nonprofit Tech, Entrepreneur Tech, Web Projects, Tech Solutions, Blog
- Blog posts link to each other using relative links
- Service pages link back to `/#contact`
- No orphan pages (all URLs in sitemap)
- Navigation header covers all main pages

**Gap:** All links are JavaScript-rendered — none exist in static HTML. A crawler that doesn't execute JS sees zero navigable links.

---

### 6.2 External & Social Signals

**Status: WEAK**

- LinkedIn: `https://www.linkedin.com/company/ella-tech-solutions` — exists in socials constant, linked via small social icon in footer. Should be more prominent and added to Organization `sameAs`.
- Instagram: `@ellatechdetroit` — linked in footer icons and in Organization schema
- Discord: `https://discord.gg/4tkGK7YE` — unusual for a B2B consulting firm; consider deprioritizing this vs. LinkedIn
- No Google Business Profile link found in code
- No press mentions, awards, or partner badges

**Note on Discord:** For a firm targeting nonprofit executives and small business owners, Discord is not a primary trust signal. LinkedIn is. Consider featuring LinkedIn more prominently and removing Discord from the primary social links.

---

### 6.3 Testimonials & Social Proof

**Status: FAIL — Existing assets unused**

This is one of the highest-ROI fixes available.

- **6 testimonial images exist:** `/public/images/testimonials/erica-collins.png`, `jason-reed.png`, `lisa-howard.png`, `marcus-brooks.png`, `rachel-dean.png`, `sarah-bennett.png`
- **No testimonials component is rendered anywhere in the app**
- The SocialProof section shows only statistics ("15+ Years", "100% Remote-capable", "Mission Driven") — no names, no quotes, no faces
- A testimonial section is one of the strongest E-E-A-T signals for a local service business

**Fix:** Create a `Testimonials.jsx` section and add it to the homepage between Services/Plans and the FAQ. Include the 6 individuals whose images are in the public directory (content for their quotes should be provided by the business owner). If actual quote content is not available, add a `TODO:` block.

---

## Prioritized Action Plan

### P1 — Critical (blocking organic performance)

1. **Fix CSR rendering:** Add static HTML content block to `index.html` with full page copy, FAQ, and links. This is a prerequisite for all other improvements to have effect on non-JS crawlers. (See AEO audit commits 3-5.)

2. **Add canonical to static HTML:** `<link rel="canonical" href="https://www.ellatechsolutions.com/">` in the static `<head>`.

3. **Compress hero.png / verify images:** `hero.png` is 5.1 MB. Determine whether it's actively used. If so, compress to WebP under 200 KB. Convert `peak-form.png` (3 MB) and `ellatech.png` (2.2 MB) similarly.

---

### P2 — High Impact

4. **Update homepage H1** to include company name, location, and audience: "Ella Tech Solutions: Technology Consulting for Nonprofits and Small Businesses in Detroit, MI"

5. **Fix over-length titles:**
   - /tech-solutions: Shorten to ~55 chars, remove em dash
   - /web-projects: Shorten to ~55 chars, remove em dash, focus on nonprofits/small business

6. **Add lazy loading to all images:** `loading="lazy"` on all `<img>` tags below the fold. Add `fetchpriority="high"` to the hero image.

7. **Add width/height to hero images** to prevent CLS.

8. **Move FAQPage schema to static HTML** so it's crawler-visible without JavaScript.

9. **Add Person schema for Steven Bowman** to static `index.html`.

10. **Add LinkedIn to Organization sameAs** in the static schema.

---

### P3 — Medium Priority

11. **Implement testimonials section.** The images are already in `/public/images/testimonials/`. Build `Testimonials.jsx` and add to homepage. Request quote content from business owner.

12. **Create `/about` page or expand founder bio** with Steven Bowman's background, credentials, and photo. This is the single biggest E-E-A-T gap.

13. **Add "fractional CTO" language** to homepage copy, services pages, and structured data. This is a specific, low-competition query with high commercial intent for the target audience.

14. **Fix "tech & education" in SocialProof** — change to "tech & operations" or "technology leadership." "Education" is inconsistent with the business brief (not targeting schools).

15. **Add static meta description** to `index.html` as JS-fallback.

16. **Create dedicated service pages** for individual services (CRM, AI workflow, website design, Microsoft 365, LMS, staff training) at `/services/{slug}` to target service-specific queries without keyword cannibalization.

17. **Remove or replace Discord** from primary social links for a B2B consulting firm. Use LinkedIn as the primary social signal.

---

### P4 — Long-Term

18. **Evaluate SSR/SSG migration** (Next.js or Astro) for proper pre-rendered HTML per route. This is the complete fix for the CSR problem and will have the largest long-term impact on organic performance.

19. **Add case studies** with real client names and outcomes (with permission). Move from illustrative quotes to named case studies.

20. **Google Business Profile optimization** — ensure the profile is claimed, complete, and the website URL matches the canonical.

21. **Blog expansion** — the two existing posts are excellent. Add 2-3 posts per quarter targeting high-intent queries: "best CRM for small nonprofits," "how much does a CRM implementation cost," "Microsoft 365 vs Google Workspace nonprofit," etc.

22. **Add `dateModified` to all page schemas** and a visible "Last updated" date in the footer to signal content freshness.

---

## Summary Scorecard

| Category | Score | Primary Issue |
|----------|-------|--------------|
| Crawlability & Indexation | 3/10 | Pure CSR SPA, no static body content |
| Technical Performance | 4/10 | 5.1 MB image, no lazy loading, no image dimensions |
| On-Page Optimization | 5/10 | Good content but weak H1, over-length titles, JS-dependent meta |
| Content Quality | 7/10 | Blog posts and service pages are strong; gaps in fractional CTO, testimonials |
| Structured Data | 5/10 | Good schema in codebase but JS-injected; static schemas miss Person and FAQ |
| E-E-A-T / Authority | 4/10 | No testimonials rendered, no author page, weak social proof |
| **Overall** | **4.7/10** | |

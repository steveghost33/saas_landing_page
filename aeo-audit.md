# AEO Audit: ellatechsolutions.com
**Date:** 2026-05-20  
**Auditor:** AEO Engineering  
**Framework:** React SPA (Vite, React 19, React Router 7, Tailwind CSS)

---

## Scoring Summary

| Dimension | Score | Justification |
|-----------|-------|---------------|
| Entity clarity | 2/10 | H1 reads "We handle the tech. You run your business." — company name, city, and target market are absent from the first 200 visible words; LLMs see only `<div id="root"></div>` |
| Structured data coverage | 4/10 | Organization + LocalBusiness JSON-LD live in static index.html and are solid, but FAQPage and all Service schemas are React Helmet injections that require JavaScript — invisible to AI crawlers |
| Question-answer density | 2/10 | A 10-item FAQ section exists and is well-written, but it renders entirely in JavaScript and is inaccessible to non-JS crawlers |
| Citation hooks | 2/10 | High-quality specific content exists in JSX components and blog posts, but none of it appears in static HTML; the only crawlable sentence is the meta description |
| Freshness signals | 3/10 | Sitemap has lastmod dates and blog posts carry publishDate/updatedDate fields, but page schemas lack dateModified, footer has no visible "Last updated" line, and schema timestamps are absent |
| Crawlability | 2/10 | CRITICAL BLOCKER: pure client-side rendering exposes only a bare `<div id="root"></div>` to bots; robots.txt is generic with no AI-bot-specific Allow directives; no llms.txt file exists |
| Authority signals | 3/10 | SocialProof section cites "15+ Years in tech" but renders in JS; testimonial images exist under /public/images/testimonials/ but no testimonials component is implemented; no case studies; founder bio is schema-only |
| Internal linking | 3/10 | Footer navigation and sitemap cover all pages, but all anchor tags render in JavaScript; static HTML contains zero navigational links visible to crawlers |

**Overall score: 2.6/10**

---

## Critical Findings

### 1. BLOCKER: Pure Client-Side Rendering
The entire site is a React SPA. The static HTML body is:
```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```
AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) do not execute JavaScript. When any of these bots fetches any page on ellatechsolutions.com, they receive a blank document with no readable content. Every piece of copy, every FAQ answer, and every React-Helmet-injected JSON-LD block is completely invisible.

**Impact:** This single issue makes the entire site effectively uncrawlable for LLM citation purposes. It must be addressed before any other optimization has value.

**Recommended fix (without full SSR migration):** Add a static HTML content block directly in `index.html` before `<div id="root">`. This block contains the definitional company paragraph, services list, FAQ, and structured data. React mounts into `#root` and visually takes over; the static block is hidden by JS once the app loads. Crawlers that don't run JS see the static block. This is the correct pattern for React SPAs that cannot add SSR.

---

### 2. No llms.txt
The `/llms.txt` file (llmstxt.org convention) does not exist. Several AI systems check for this file as a direct signal about how to understand and represent a site.

---

### 3. robots.txt Has No AI-Bot Directives
Current robots.txt:
```
User-agent: *
Allow: /
Sitemap: https://www.ellatechsolutions.com/sitemap.xml
```
GPTBot, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, CCBot, Applebot-Extended, Bytespider, and Amazonbot are not explicitly addressed. Some of these bots check for explicit permission before full indexing.

---

### 4. Entity Clarity Failure at H1
The homepage H1 is: "We handle the tech. You run your business."

This is strong marketing copy but fails the LLM extractability test. It does not state:
- The company name (Ella Tech Solutions)
- The city (Detroit, Michigan)
- Who is served (nonprofits, small businesses)
- What services are offered

An LLM trying to answer "Who helps Detroit nonprofits with tech?" cannot extract a definitive answer from this copy.

The opening paragraph also never contains the definitional statement an LLM can lift and cite. Required pattern: "Ella Tech Solutions is a Detroit-based technology consulting firm that helps [audience] with [services]."

---

### 5. Fractional CTO Positioning Missing
The task brief positions Ella Tech Solutions as a "fractional CTO and strategic technology partner." This phrase appears nowhere in the codebase. Prospects asking "Fractional CTO for a small nonprofit?" or "Who is a fractional CTO in Detroit?" will not surface this site because the concept is not in any crawlable content.

---

## Additional Findings

### FAQ Content Quality
The existing 10 FAQ items in `src/constants/index.jsx` are well-written and specific. However, they do not cover several high-value AEO queries:
- "What does a fractional CTO cost for a small nonprofit?"
- "What is the difference between an in-house IT person and a consultant?"
- "What CRMs does Ella Tech Solutions support?"
- "Does Ella Tech Solutions offer ongoing support after a project ends?"

These are direct AI-assistant query patterns that should be answered explicitly.

### Structured Data: What Works
The following JSON-LD in `index.html` is crawlable and reasonably complete:
- `WebSite` with SearchAction
- `Organization` with logo, telephone, address, sameAs (Instagram, Discord)
- `LocalBusiness` + `ProfessionalService` with serviceType array, areaServed, priceRange

Missing from crawlable structured data:
- `Person` schema for Steven Bowman (only embedded in Organization as a sub-node, not a standalone entity)
- `FAQPage` schema (exists but is JS-injected via React Helmet)
- `Service` schemas per service (exist in service pages but JS-injected)
- `dateModified` / `datePublished` on all schemas
- LinkedIn in sameAs (LinkedIn URL exists in socials constant but not in index.html schemas)

### Testimonials Blocked
Testimonial images exist at `/public/images/testimonials/` (erica-collins.png, jason-reed.png, lisa-howard.png, marcus-brooks.png, rachel-dean.png, sarah-bennett.png) but no testimonials component is rendered anywhere in the app. These images appear to be placeholders waiting for implementation. The SocialProof section shows statistics only.

### Entrepreneur Page Out of Primary Scope
A `/services/entrepreneurs` page exists and is well-written. Per the brief, the primary target is nonprofits and secondary is small businesses (5-20 employees). The entrepreneur/solopreneur audience is not in the stated target market. The page should not be deleted (it may be useful), but AEO copy investment should prioritize nonprofits and small businesses.

### No School/K-12 Language Found
Confirmed: no K-12, school, or district language appears anywhere in the codebase.

### Blog Posts Are High-Quality AEO Assets
Two blog posts exist with substantial, specific, cite-worthy content:
1. "How to Set Up a CRM for a Nonprofit Without Overcomplicating It" (7 min read)
2. "What a Good Nonprofit Website Actually Needs" (7 min read)

These are excellent for LLM citation once crawlability is fixed. The blog post content renders in JavaScript and is also currently invisible to AI crawlers.

---

## Implementation Plan (Steps 3-8)

### Commit 1: robots.txt — Add AI-bot directives
Add explicit `Allow` rules for GPTBot, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, CCBot, Applebot-Extended, Bytespider, Amazonbot.

### Commit 2: llms.txt — Create at site root
One-sentence description, service links, founder bio link, contact, About section.

### Commit 3: Static AEO content block in index.html
Add a crawlable static HTML section before `<div id="root">` containing: definitional company paragraph, services list, founder bio, contact info, FAQ text. Use a JS snippet to hide it after React mounts.

### Commit 4: Structured data in index.html
Move FAQPage schema to index.html static block. Add Person schema for Steven Bowman. Add LinkedIn to sameAs. Add dateModified. Remove reliance on React Helmet for any crawler-critical JSON-LD.

### Commit 5: FAQ rewrite
Replace FAQ constants with 10 new AEO-optimized Q&As covering all required query patterns.

### Commit 6: Service page schema
Verify Service + FAQPage JSON-LD on all service pages; move critical schema to static HTML.

### Commit 7: Freshness and authority
Add dateModified to all schemas. Add visible "Last updated" to footer. Surface testimonials or add TODO blocks.

### Commit 8: Verification
Validate JSON-LD, robots.txt, sitemap, confirm static HTML visible via curl.

---

## Files Requiring Changes

| File | Type of Change |
|------|---------------|
| `public/robots.txt` | Add AI-bot Allow directives |
| `public/llms.txt` | Create new |
| `index.html` | Add static content block + move JSON-LD out of JS dependency |
| `src/constants/index.jsx` | Rewrite FAQ array with AEO-optimized Q&As |
| `src/sections/Hero.jsx` | Add AEO-compliant H1 and definitional paragraph |
| `src/sections/Footer.jsx` | Add "Last updated" line, remove emoji from location |
| `src/pages/Home.jsx` | Update schema to match new FAQ, add fractional CTO positioning |
| `src/pages/services/Nonprofits.jsx` | Strengthen schema, add FAQ block |
| `src/pages/services/SmallBusiness.jsx` | Strengthen schema, add FAQ block |
| `src/sections/SocialProof.jsx` | Add testimonials or TODO block |
| `src/components/PageSEO.jsx` | Ensure schema injection is consistent |

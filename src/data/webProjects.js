import { BUSINESS_NAME, SITE_URL } from "./site.js";

export const webProjectsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Creation & CRM Strategy",
  serviceType: "Website Design and CRM Implementation",
  description:
    "Custom websites and CRM systems built for nonprofits, small businesses, and mission-driven organizations.",
  provider: {
    "@type": "LocalBusiness",
    name: BUSINESS_NAME,
    url: SITE_URL,
  },
  areaServed: ["Detroit, MI", "United States", "International"],
  url: `${SITE_URL}/web-projects`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Web Projects",
        item: `${SITE_URL}/web-projects`,
      },
    ],
  },
};

export const webProjects = [
  {
    title: "Ella Tech Solutions Website",
    img: "/images/projects/ellatech.png",
    desc:
      "A modern SaaS-style website built for a technology consulting firm. Showcases services, pricing, and client intake - optimized for nonprofit and small business audiences.",
    tags: ["React", "Tailwind CSS", "Vite"],
    link: "/",
    internal: true,
  },
  {
    title: "Build by Steven",
    img: "/images/projects/build-by-steven.png",
    desc:
      "A personal brand and portfolio website focused on clear project presentation, responsive performance, and a polished client-facing experience.",
    tags: ["Portfolio", "Web Design", "Personal Brand"],
    link: "https://www.buildbysteven.com",
    internal: false,
  },
  {
    title: "Team Cabin",
    img: "/images/projects/teamcabin.png",
    desc:
      "A website for an indie music band built with visitor engagement at the center. Features an interactive game so fans can connect with the brand beyond just listening.",
    tags: ["Web Design", "Music", "Interactive"],
    link: "https://weareteamcabin.com",
    internal: false,
    skills: {
      Frontend: [
        "React 18 — component-based UI with custom hooks (useMobile, useFullscreen), responsive layout switching between mobile and desktop views",
        "Vite — modern build tooling and dev server setup",
        "Vanilla CSS — design system using CSS variables, modular per-component stylesheets, responsive design",
        "HTML5 Canvas / Game Development — built a browser game (GameEngine.js, renderer.js, sprites.js) from scratch with a custom game loop, sprite rendering, and pixel art characters",
      ],
      Backend: [
        "Python / Flask — REST API with two endpoints (POST /scores, GET /scores, GET /high-score)",
        "SQLite — relational database schema design, parameterized queries (safe from SQL injection)",
        "Flask-CORS — cross-origin resource sharing for decoupled frontend/backend",
        "Gunicorn — production WSGI server configuration for deployment",
      ],
      "DevOps / Platform": [
        "Vercel — frontend deployment with custom headers (_headers) and routing config (vercel.json)",
        "Render — backend deployment with environment variable configuration",
        "SEO — sitemap.xml, robots.txt, canonical URL, apple-touch-icon for discoverability and PWA readiness",
      ],
      Architecture: [
        "Full-stack separation — decoupled SPA frontend + stateless REST API backend",
        "Mobile-first responsive design — dedicated mobile layout with fullscreen game support",
        "In-game leaderboard — real-time score persistence and retrieval across sessions",
      ],
    },
  },
];

export const webProjectCapabilities = [
  {
    title: "Nonprofit Websites",
    desc: "Designed for lean teams and limited budgets. We build sites your staff can update and your donors can trust. Mission-driven pricing available.",
  },
  {
    title: "Small Business Sites",
    desc: "Clean, fast, mobile-first websites that generate leads and reflect your brand. Book a consultation to discuss scope and pricing.",
  },
  {
    title: "CRM Integration",
    desc: "We connect your website to your CRM (Customer Relationship Management) system so contact forms, intake flows, and donor tracking actually work together.",
  },
  {
    title: "Ongoing Support",
    desc: "Retainer options available so your site stays updated, secure, and working after launch. Book a consultation to discuss support plans.",
  },
];

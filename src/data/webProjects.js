import { BUSINESS_NAME, SITE_URL } from "./site.js";

export const webProjectsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Creation & CRM Strategy",
  serviceType: "Website Design and CRM Implementation",
  description:
    "Custom websites and CRM systems built for nonprofits, small businesses, and mission-driven organizations in Detroit and beyond.",
  provider: {
    "@type": "LocalBusiness",
    name: BUSINESS_NAME,
    url: SITE_URL,
  },
  areaServed: ["Detroit, MI", "Metro Detroit", "Michigan"],
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
      "A modern SaaS-style website built for a Detroit-based technology consulting firm. Showcases services, pricing, and client intake - optimized for nonprofit and small business audiences.",
    tags: ["React", "Tailwind CSS", "Vite"],
    link: "/",
    internal: true,
  },
  {
    title: "Peak Form Fitness",
    img: "/images/projects/peak-form.png",
    desc:
      "A fitness business website featuring service packages, appointment booking, and a branded e-commerce experience. Built for speed and mobile usability.",
    tags: ["Web Design", "E-Commerce", "Booking Integration"],
    link: "https://peak-form-fitness.vercel.app",
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


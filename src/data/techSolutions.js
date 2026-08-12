import { BUSINESS_NAME, SITE_URL } from "./site.js";

export const techSolutionsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tech Solutions & Staff Training",
  serviceType: "Technology Consulting and Staff Training",
  description:
    "CRM, HRIS, AI workflow integration, LMS development, and staff technology training for nonprofits, small businesses, and entrepreneurs.",
  provider: {
    "@type": "LocalBusiness",
    name: BUSINESS_NAME,
    url: SITE_URL,
  },
  areaServed: ["Detroit, MI", "United States", "International"],
  url: `${SITE_URL}/tech-solutions`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technology Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CRM Strategy & Implementation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "HRIS Implementation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Workflow Integration & Literacy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LMS & Micro-Learning Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Staff Technology Training & Professional Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Grant Writing & Grant Readiness" } },
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tech Solutions",
        item: `${SITE_URL}/tech-solutions`,
      },
    ],
  },
};

export const techServices = [
  {
    id: "crm",
    title: "CRM (Customer Relationship Management) Strategy & Implementation",
    description:
      "Most nonprofits buy a CRM - a customer relationship management system - and stop using it within six months. We configure your CRM around how your organization actually operates, migrate your existing data, and train your staff so adoption sticks.",
    details: [
      "CRM selection and vendor evaluation",
      "System configuration for your workflows and reporting needs",
      "Data migration from spreadsheets or legacy systems",
      "Staff training and administrator documentation",
      "Mission-driven pricing available for nonprofits and community organizations",
    ],
    img: "/images/consulting-session.jpg",
    alt: "CRM strategy session",
  },
  {
    id: "hris",
    title: "HRIS (Human Resources Information System) Implementation",
    description:
      "If your HR team is still managing staff records, onboarding, time off, and performance in spreadsheets, an HRIS - a human resources information system - brings all of that into one place. We handle selection, setup, and training end to end.",
    details: [
      "HRIS platform selection and scoping",
      "System configuration and data migration",
      "Onboarding workflows and staff record setup",
      "Administrator training and documentation",
      "Mission-driven pricing available for nonprofits and community organizations",
    ],
    img: "/images/office365-workshop.jpg",
    alt: "HRIS implementation training",
  },
  {
    id: "ai",
    title: "AI Workflow Integration & Literacy",
    description:
      "AI is a tool, not a strategy. We identify the specific places in your operations where AI saves real time, implement the workflows, and run training so your team understands how to use the tools confidently.",
    details: [
      "Workflow audit to identify automation opportunities",
      "AI tool selection and implementation",
      "Automated email management, scheduling, and reporting",
      "Staff AI literacy training and practical playbooks",
      "Mission-driven pricing available for nonprofits and community organizations",
    ],
    img: "/images/email-auto.jpg",
    alt: "AI workflow integration",
  },
  {
    id: "lms",
    title: "LMS (Learning Management System) & Micro-Learning Development",
    description:
      "A learning management system is the platform your staff uses to complete training and track progress. We select and implement your LMS, build course content using Articulate or SCORM-compliant tools, and train your administrators so the system runs without outside help.",
    details: [
      "LMS platform selection, setup, and content migration",
      "Micro-learning module development in Articulate 360 or Rise",
      "SCORM-compliant course packaging and deployment",
      "Administrator training and learner onboarding",
      "Mission-driven pricing available for nonprofits and community organizations",
    ],
    img: "/images/data-auto.jpg",
    alt: "LMS and e-learning development",
  },
  {
    id: "training",
    title: "Staff Technology Training & Professional Development",
    description:
      "Your team adopted the tools but never got real training. We run live workshops and build self-paced content so staff can work confidently in the systems they already have.",
    details: [
      "Half-day and full-day live workshops",
      "Self-paced video content for async teams",
      "Microsoft 365, Google Workspace, and platform-specific training",
      "Participant workbooks and post-training support",
      "Mission-driven pricing available for nonprofits and community organizations",
    ],
    img: "/images/calendar-auto.jpg",
    alt: "Staff technology training workshop",
  },
];


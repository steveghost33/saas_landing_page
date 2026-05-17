// src/constants/index.jsx

export const services = [
  {
    id: "0",
    icon: "/images/feature-1.png",
    caption: "Your online presence, finally working.",
    title: "Website Build and CRM Setup",
    text: "Stop sending people to a site that embarrasses you. We build clean, fast websites and set up a CRM (Customer Relationship Management system) so your team can track donors, clients, and contacts without living in spreadsheets.",
    button: {
      icon: "/images/magictouch.svg",
      title: "View Web Projects",
      path: "/web-projects",
    },
  },
  {
    id: "1",
    icon: "/images/feature-2.png",
    caption: "Tech your staff will actually use.",
    title: "Training, Automation, and Learning Systems",
    text: "We set up Microsoft 365, build staff training platforms using an LMS (Learning Management System), and automate the repetitive tasks eating your team's time. Every implementation includes hands-on training so nothing sits unused.",
    button: {
      icon: "/images/docs.svg",
      title: "See Tech Solutions",
      path: "/tech-solutions",
    },
  },
];

export const details = [
  {
    id: "0",
    icon: "/images/detail-1.png",
    title: "CRM Setup and Training",
  },
  {
    id: "1",
    icon: "/images/detail-2.png",
    title: "Microsoft 365 Onboarding",
  },
  {
    id: "2",
    icon: "/images/detail-3.png",
    title: "LMS Development",
  },
  {
    id: "3",
    icon: "/images/detail-4.png",
    title: "AI Workflow Automation",
  },
];

export const faq = [
  {
    id: "0",
    question: "How long does it take to build and launch a website?",
    answer:
      "Most small business and nonprofit websites take about 4 to 6 weeks. The exact timeline depends on how many pages you need and how quickly we get your content and feedback. Book a consultation and we will map out a clear timeline for your project.",
  },
  {
    id: "1",
    question: "Do you offer nonprofit pricing?",
    answer:
      "Yes. Ella Tech Solutions offers a mission-driven discount for verified 501(c)(3) nonprofits and community-based organizations with demonstrated community impact. This reflects our values alignment with mission-driven work and our commitment to making quality technology consulting accessible to organizations doing work that matters. Book a consultation to discuss what your project would cost.",
  },
  {
    id: "2",
    question: "What does CRM implementation include?",
    answer:
      "CRM stands for Customer Relationship Management. It is the system your organization uses to track donors, clients, volunteers, or contacts. We handle CRM selection, configuration, data migration, and staff training. We configure the system around how your organization actually works, not around how the software assumes you work. Most nonprofits we work with have bought CRMs that sit unused. We make sure that does not happen.",
  },
  {
    id: "3",
    question: "What is HRIS implementation and who needs it?",
    answer:
      "HRIS stands for Human Resources Information System. It is the platform your organization uses to manage staff records, onboarding, time off, performance, and payroll in one place instead of scattered spreadsheets. If your HR team is still managing these things manually, an HRIS centralizes all of it. We handle system selection, setup, data migration, and staff training so your team can use it from day one.",
  },
  {
    id: "4",
    question: "What does LMS and micro-learning development mean?",
    answer:
      "LMS stands for Learning Management System. It is the platform your staff uses to complete training and track progress. Think of tools like Canvas, TalentLMS, or Absorb. Micro-learning is short, focused training content built for busy teams, usually 5 to 10 minutes per module. We select and implement the LMS, build the course content using Articulate or SCORM-compliant tools, and train your administrators so the system runs without outside help.",
  },
  {
    id: "5",
    question: "What does AI workflow integration actually look like?",
    answer:
      "We start by identifying where your team spends time on repetitive tasks: email management, report generation, data entry, scheduling. Then we implement AI tools that handle those tasks automatically. We also run AI literacy training so your staff understands what the tools do and how to use them confidently. No hype. No tools your team will not touch.",
  },
  {
    id: "6",
    question: "Do you train staff on the systems you set up?",
    answer:
      "Yes. Every implementation includes training. We offer live sessions, self-paced video content, and quick reference guides depending on what works for your team. The goal is that your staff feels confident using the tools without needing to call us for every question.",
  },
  {
    id: "7",
    question: "What does a digital strategy consulting session include?",
    answer:
      "A paid discovery session is a focused conversation where we review your current technology, identify gaps, and recommend a prioritized roadmap. There is no long-term commitment required. Book a consultation to learn more about what a session would cover for your organization.",
  },
  {
    id: "8",
    question: "How much do your services cost?",
    answer:
      "Pricing is scoped to your project, your organization type, and what you need. We offer mission-driven pricing for nonprofits and community-based organizations. The best way to get a clear number is to book a discovery session. We will scope the work and give you a straightforward quote.",
  },
  {
    id: "9",
    question: "How do I get started?",
    answer:
      "Book a consultation through the contact section. We will review what you need, recommend the best next steps, and follow up within one business day.",
  },
];

export const plans = [
  {
    id: "website",
    title: "Website Build and Support",
    description:
      "Your website should make people want to work with you. We build clean, fast sites and keep them running so you are never on your own after launch.",
    details: [
      "Responsive design that looks right on phones, tablets, and desktops",
      "Clear calls to action that guide visitors to take the next step",
      "Ongoing support so you are not stuck when something changes",
      "Mission-driven pricing available for nonprofits",
    ],
  },
  {
    id: "crm",
    title: "CRM Setup and Training",
    description:
      "Stop losing track of donors, clients, and contacts in spreadsheets. We set up a CRM (Customer Relationship Management system) that fits how your organization actually works, then train your staff to use it.",
    details: [
      "System selection based on your budget and team size",
      "Data migration from spreadsheets or a previous system",
      "Staff training included, not sold separately",
      "Mission-driven pricing available for nonprofits",
    ],
  },
  {
    id: "lms",
    title: "LMS Development",
    description:
      "Your staff needs training that fits into their day. We build and launch a learning platform using an LMS (Learning Management System) with focused content your team can actually finish.",
    details: [
      "Platform selection and full setup from scratch",
      "Short, focused training modules built for busy staff",
      "Admin training so your team can manage it without us",
      "Mission-driven pricing available for nonprofits",
    ],
  },
  {
    id: "m365",
    title: "Microsoft 365 Onboarding",
    description:
      "If your team is paying for Microsoft 365 but barely using it, that is money left on the table. We set it up right and train your staff so email, Teams, SharePoint, and the rest actually work together.",
    details: [
      "Full setup of email, Teams, SharePoint, and OneDrive",
      "Staff training in plain language, no IT background required",
      "Permissions and policies configured so nothing falls through the cracks",
      "Mission-driven pricing available for nonprofits",
    ],
  },
  {
    id: "training",
    title: "Staff Tech Training",
    description:
      "Technology only works if the people using it feel confident. We train your staff on whatever tools your organization uses, in plain language, at a pace that works for your team.",
    details: [
      "Live group sessions, self-paced content, or both",
      "Quick-reference guides your staff can keep and use",
      "Tailored to the tools your organization already has",
      "Mission-driven pricing available for nonprofits",
    ],
  },
  {
    id: "ai",
    title: "AI Workflow Automation",
    description:
      "If your team spends hours on tasks a computer could handle, we can fix that. We find where automation saves the most time and build it into workflows your staff will actually use.",
    details: [
      "Workflow audit to find where automation helps most",
      "Implementation using tools your team already has access to",
      "AI literacy training so your staff understands and trusts the tools",
      "Mission-driven pricing available for nonprofits",
    ],
  },
];

export const socials = [
  { id: "2", title: "Instagram", icon: "/images/socials/instagram.svg", url: "https://www.instagram.com/ellatechdetroit/" },
  { id: "3", title: "Discord", icon: "/images/socials/discord.svg", url: "https://discord.gg/4tkGK7YE" },
];

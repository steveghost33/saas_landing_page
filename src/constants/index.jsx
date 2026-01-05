// src/constants/index.jsx

export const services = [
  {
    id: "0",
    icon: "/images/feature-1.png",
    caption: "Smart. Stylish. Scalable.",
    title: "Custom Website Development",
    text: "We build clean, responsive websites tailored to your brand. Every site is optimized for mobile, speed, and usability. Perfect for small businesses, nonprofits, and schools.",
    button: {
      icon: "/images/magictouch.svg",
      title: "View Web Projects",
      path: "/web-projects"
    },
  },
  {
    id: "1",
    icon: "/images/feature-2.png",
    caption: "Simplify. Automate. Grow.",
    title: "Technology Consulting & Training",
    text: "We help you choose and use the right tech to save time and reduce hassle. From automation to AI tools, we streamline your systems. Ideal for teams ready to grow without the tech stress.",
    button: {
      icon: "/images/docs.svg",
      title: "See Tech Solutions",
      path: "/tech-solutions"
    },
  },
];

export const details = [
  {
    id: "0",
    icon: "/images/detail-1.png",
    title: "Digital Training & E-Learning Development",
  },
  {
    id: "1",
    icon: "/images/detail-2.png",
    title: "UI/UX Design & User Testing",
  },
  {
    id: "2",
    icon: "/images/detail-3.png",
    title: "AI Integration & Chatbot Deployment",
  },
  {
    id: "3",
    icon: "/images/detail-4.png",
    title: "Website Performance Optimization",
  },
];

export const faq = [
  {
    id: "0",
    question: "How long does it take to build and launch a website?",
    answer:
      "Most small business websites take about 4 to 6 weeks. The exact timeline depends on how many pages you need and how quickly we get your content and feedback. If you want a clear estimate for your project, book a consultation and we will map out a simple timeline.",
  },
  {
    id: "1",
    question: "Can you connect my website to other tools I already use?",
    answer:
      "Yes. We can connect your website to tools like payment systems, email lists, scheduling, customer tracking, and more. The best next step is a consultation so we can confirm what you use now and what you want the website to do.",
  },
  {
    id: "2",
    question: "What does tech consulting help with?",
    answer:
      "Tech consulting helps you save time and reduce stress with better tools and simpler systems. We look at how your work gets done, what is slowing you down, and recommend practical fixes. For details that match your situation, book a consultation and we will build a clear plan.",
  },
  {
    id: "3",
    question: "Do you train people on the tools and systems you set up?",
    answer:
      "Yes. We offer training for individuals and teams so people feel confident using the tools. Training can be live or self paced depending on your needs. Book a consultation and we will recommend the best format for your team.",
  },
  {
    id: "4",
    question: "Will my website be easy for people to use?",
    answer:
      "That is the goal. We design with real users in mind so the site is clear, simple, and works well on phones. If you have a specific audience or goal, book a consultation and we will plan the layout around what your visitors need.",
  },
  {
    id: "5",
    question: "Do you offer chatbots or AI features?",
    answer:
      "Yes, when it makes sense for your business. A chatbot can help answer common questions, route requests, and capture leads. The best way to know what is worth building is a consultation so we can match the tool to your needs and budget.",
  },
  {
    id: "6",
    question: "Do you offer ongoing support after the website goes live?",
    answer:
      "Yes. We offer ongoing support for updates, fixes, and keeping your website secure and running smoothly. If you want a support plan that fits your needs, book a consultation and we will walk you through options.",
  },
  {
    id: "7",
    question: "How much do your services cost?",
    answer:
      "Pricing depends on what you need. Some projects are a flat price and some work is hourly. The easiest way to get a clear number is to book a consultation so we can understand the scope and give you a quote.",
  },
  {
    id: "8",
    question: "What if I need to pause or cancel a project?",
    answer:
      "You can pause or stop a project if your situation changes. Any billing is based on work already completed. If you want to understand how this works for your type of project, book a consultation and we will explain it clearly before you commit.",
  },
  {
    id: "9",
    question: "How do I get started?",
    answer:
      "Start by booking a consultation through the contact section. We will review what you need, recommend the best next steps, and follow up within one business day.",
  },
];

export const pricingServices = [
  {
    id: "website-creation",
    title: "Website Creation",
    price: "Flexible Pricing Tailored to Your Needs",
    description:
      "A streamlined website designed to highlight your services and make customer connection simple.",
    details: [
      "Fully responsive design for all devices",
      "User friendly editing tools for quick updates",
      "Customer contact form included",
    ],
  },
  {
    id: "tech-support",
    title: "Technology Help & Support",
    price: "Flexible Hourly and Monthly Plans",
    description:
      "Personalized tech assistance for your tools, workflow, and daily operations, along with time saving automations.",
    details: [
      "Automations that organize files, send reminders, or route emails automatically",
      "Support and setup for email, calendars, cloud storage, and more",
    ],
  },
  {
    id: "technology-workshops",
    title: "Technology Workshops",
    price: "Customizable Training Sessions",
    description:
      "Hands-on training designed for non-tech teams—no jargon, just clear steps to get confident with your tools.",
    details: [
      "Learn simple ways to let technology handle routine work",
      "Tips for smart scheduling, file management, and basic site edits",
      "Practice with real examples to build your skills",
    ],
  },
  {
    id: "additional-services",
    title: "Additional Services",
    price: "Priced per project",
    description:
      "For work outside the core packages, we scope and quote based on complexity and impact.",
    details: [
      "Design Review & User Testing",
      "AI Chat Assistant Setup",
      "Site Speed & Performance Work",
      "Content/CMS migrations",
      "Custom integrations & automations",
    ],
  },
];


export const hourlyRates = [
  { service: "Web Development", rate: "$65/hr" },
  { service: "UI/UX Design & Usability Testing", rate: "$65/hr" },
  { service: "Technology Consulting & Automation", rate: "$75/hr" },
  { service: "Instructional Design & E-Learning Development", rate: "$60/hr" },
  { service: "AI & Chatbot Integration", rate: "$90/hr" },
  { service: "Website Performance & SEO Optimization", rate: "$50/hr" },
];

export const plans = [
  {
    id: "starter",
    title: "Starter",
    price: 500,
    caption: "1-page mini site or 5 hrs consulting/training",
    features: ["1-page mini site", "5 hrs consulting/training"],
    logo: "/images/plan-starter.png",
  },
  {
    id: "growth",
    title: "Growth",
    price: 1200,
    caption: "3-page site or 15 hrs consulting/training",
    features: ["3-page site", "15 hrs consulting/training"],
    logo: "/images/plan-growth.png",
  },
  {
    id: "business",
    title: "Business",
    price: 2500,
    caption: "5-page site or 35 hrs + support block",
    features: ["5-page site", "35 hrs consulting", "Support block"],
    logo: "/images/plan-business.png",
  },
  {
    id: "enterprise",
    title: "Enterprise",
    price: null,
    caption: "Custom scope: web build, training, automation",
    features: [],
    logo: "/images/plan-enterprise.png",
  },
];

export const projectBased = [
  { title: "Custom Website Dev (3–5 pages)", price: "$1,500+" },
  { title: "E-Learning Course (Articulate/SCORM)", price: "$750/course" },
  {
    title: "Automation Workflow (Zapier, Power Automate)",
    price: "$800/workflow",
  },
  { title: "UI/UX Audit & Wireframes", price: "$500/report" },
  { title: "AI Chatbot (FAQ-style)", price: "$1,200+" },
  { title: "Advanced NLP Chatbot", price: "$3,000+" },
  { title: "SEO Audit + Fixes", price: "$300/audit + 5 fixes" },
];

export const workshops = [
  { title: "Half-Day Workshop (≤4 hrs)", price: "$1,000 flat" },
  { title: "Full-Day Workshop (≤8 hrs)", price: "$1,800 flat" },
  { title: "Multi-Session (3×2-hr)", price: "$1,500 flat" },
  { title: "Custom Series (per day)", price: "$1,600/day" },
];

export const addOns = [
  { title: "Pre-training survey", price: "$150" },
  { title: "Post-training report", price: "$200" },
  { title: "Participant workbooks", price: "$15/person" },
];

export const discounts = [
  { title: "Nonprofit/Education", detail: "10% off all rates" },
  { title: "3-mo Retainer", detail: "15% off hourly rates" },
];

export const terms = {
  deposit: "50% upfront, balance on delivery",
  validity: "Valid for 30 days",
};

export const testimonials = [
  // 0) Keep Kyle from HOMES
  {
    id: "0",
    name: "Kyle T.",
    role: "Musician, Ann Arbor, MI",
    avatarUrl: "/images/testimonials/testimonial-icon.svg",
    comment:
      "Ella Tech Solutions set up our first simple band website. Now friends and local fans can find our music and upcoming shows all in one place.",
  },

  // 1) Detroit local — website + contact section integrated with Google Calendar → increased inquiries
  {
    id: "1",
    name: "Alicia M.",
    role: "Midtown Community Tutors, Detroit, MI",
    avatarUrl: "/images/testimonials/testimonial-icon.svg",
    comment:
      "They rebuilt our site and added a contact section that connects to Google Calendar. Parents can book sessions instantly, and inquiries have climbed steadily since launch.",
  },

  // 2) Michigan (non-Detroit) — technology consulting
  {
    id: "2",
    name: "Evan P.",
    role: "Grand Rapids Retail Co., Grand Rapids, MI",
    avatarUrl: "/images/testimonials/testimonial-icon.svg",
    comment:
      "Ella Tech’s consulting streamlined our tools and workflows: email, files, and automations finally work together. Less tech hassle, more time with customers.",
  },

  // 3) Out-of-state — AI training for staff (productivity/flow/outcomes)
  {
    id: "3",
    name: "Tanya S.",
    role: "HopeCare Network, Columbus, OH",
    avatarUrl: "/images/testimonials/testimonial-icon.svg",
    comment:
      "Their AI training gave our team practical playbooks. We draft content faster, route requests automatically, and our program outcomes are easier to track.",
  },
];

export const logos = [
  {
    id: "0",
    title: "Afterpay",
    url: "/images/logos/afterpay.svg",
    width: 156,
    height: 48,
  },
  {
    id: "1",
    title: "Amplitude",
    url: "/images/logos/amplitude.svg",
    width: 194,
    height: 48,
  },
  {
    id: "2",
    title: "Sonos",
    url: "/images/logos/sonos.svg",
    width: 115,
    height: 48,
  },
  {
    id: "3",
    title: "Maze",
    url: "/images/logos/maze.svg",
    width: 142,
    height: 48,
  },
  {
    id: "4",
    title: "Drips",
    url: "/images/logos/drips.svg",
    width: 77,
    height: 48,
  },
];

export const Ios = () => {
  return (
      <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        {/* ... */}
      </svg>
  );
};

export const Android = () => {
  return (
      <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        {/* ... */}
      </svg>
  );
};

export const Windows = () => {
  return (
      <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        {/* ... */}
      </svg>
  );
};

export const Web = () => {
  return (
      <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        {/* ... */}
      </svg>
  );
};

export const links = [
  {
    id: "0",
    title: "Ios",
    icon: <Ios />,
    url: "#",
  },
  {
    id: "1",
    title: "Android",
    icon: <Android />,
    url: "#",
  },
  {
    id: "2",
    title: "Windows",
    icon: <Windows />,
    url: "#",
  },
  {
    id: "3",
    title: "Web",
    icon: <Web />,
    url: "#",
  },
];

export const socials = [
  {
    id: "0",
    title: "x",
    icon: "/images/socials/x.svg",
    url: "#",
  },
  {
    id: "1",
    title: "Threads",
    icon: "/images/socials/threads.svg",
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    icon: "/images/socials/instagram.svg",
    url: "https://www.instagram.com/ellatechdetroit/",
  },
  {
    id: "3",
    title: "Discord",
    icon: "/images/socials/discord.svg",
    url: "https://discord.gg/4tkGK7YE",
  },
];
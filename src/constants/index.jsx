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
    title: "Technology Consulting & Automation",
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
    question: "How long does it take to build and launch a custom website?",
    answer:
        "Timelines vary by project scope, but most small-to-medium websites take 4–6 weeks from kickoff to launch. We’ll provide a detailed schedule during our discovery phase.",
  },
  {
    id: "1",
    question: "Can Ella Tech integrate our website with existing platforms?",
    answer:
        "Yes—whether it’s a CRM, payment gateway, learning management system, or other tool, we handle API integrations and custom connectors to keep your data in sync.",
  },
  {
    id: "2",
    question:
        "What does your Technology Consulting and Automation service include?",
    answer:
        "We assess your workflows, identify automation opportunities, then design and implement solutions—from simple scripts to full-scale RPA—to save you time and reduce errors.",
  },
  {
    id: "3",
    question: "Do you offer training on the solutions you build?",
    answer:
        "Absolutely. We provide both individual and team training—live or on-demand—to ensure your staff can use new tools confidently and independently.",
  },
  {
    id: "4",
    question: "How do you handle UI/UX design and user testing?",
    answer:
        "Our designers create wireframes and high-fidelity mockups based on user research. We then run usability tests with real users to refine the experience before development.",
  },
  {
    id: "5",
    question: "Can you deploy AI chatbots or advanced AI features?",
    answer:
        "Yes. We design, train, and deploy custom AI chatbots and integrations—using tools like Azure Cognitive Services or open-source frameworks—to automate customer support and internal queries.",
  },
  {
    id: "6",
    question: "What if I need ongoing support after launch?",
    answer:
        "We offer monthly support and maintenance plans for updates, security patches, and performance monitoring—so your site and tools stay reliable and up to date.",
  },
  {
    id: "7",
    question: "How do you price your services?",
    answer:
        "We offer flexible pricing: hourly rates for smaller tasks, fixed-price packages for standard projects, and custom quotes for larger engagements. We’ll tailor the plan to your budget and goals.",
  },
  {
    id: "8",
    question: "What is your refund or cancellation policy?",
    answer:
        "If you cancel within the first 14 days of a fixed-price project, we issue a prorated refund for any unused work. Hourly engagements can be paused or stopped at any time with billing up to the last completed hour.",
  },
  {
    id: "9",
    question: "How do I get started with Ella Tech Solutions?",
    answer:
        "Just reach out via our contact form or email. We’ll schedule a free consultation to understand your needs and propose the best approach and timeline.",
  },
];

export const pricingServices = [
  {
    id: "website-creation",
    title: "Website Creation",
    price: "Starting at $1,500",
    description:
        "A simple, easy-to-update website that helps customers find your business and get in touch.",
    details: [
      "Mobile-friendly layout that looks great on any device",
      "Easy editing tools so you can change text and images yourself",
      "Contact form so customers can reach you directly",
    ],
  },
  {
    id: "tech-support",
    title: "Technology Help & Support",
    price: "Starting at $60/hour or $600/month",
    description:
        "One-on-one help for any tech questions, plus simple automations to save you time on everyday tasks.",
    details: [
      "Automations that organize files, send reminders, or route emails automatically",
      "Setup and guidance for tools like email, calendars, and file sharing",
    ],
  },
  {
    id: "technology-workshops",
    title: "Technology Workshops",
    price: "Half-Day: $500 | Full-Day: $1,000",
    description:
        "Hands-on training designed for non-tech teams—no jargon, just clear steps to get confident with your tools.",
    details: [
      "Learn simple ways to let technology handle routine work",
      "Tips for smart scheduling, file management, and basic site edits",
      "Practice with real examples to build your skills",
    ],
  },
  {
    id: "design-review",
    title: "Design Review & User Testing",
    price: "Starting at $1,500 per review",
    description:
        "We watch real people use your website or app and share easy-to-understand feedback to make it more user-friendly.",
  },
  {
    id: "ai-chat-assistant-setup",
    title: "AI Chat Assistant Setup",
    price: "Starting at $2,000",
    description:
        "Add a friendly chatbot to your site that can answer common questions any time, day or night.",
  },
  {
    id: "performance-check",
    title: "Site Speed & Performance Check",
    price: "$250 audit, then $60/hour for fixes",
    description:
        "We check how quickly your site loads and make easy fixes so visitors don’t get stuck waiting.",
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
  {
    id: "0",
    name: "Kyle",
    role: "HOMES Band",
    avatarUrl: "/images/testimonials/testimonial-icon.svg",
    comment:
      "Ella Tech Solutions set up our first simple band website. Now friends and local fans can find our music and upcoming shows all in one place.",
  },
  {
    id: "1",
    name: "Mia",
    role: "Bright Roots Florist",
    avatarUrl: "/images/testimonials/testimonial-icon.svg",
    comment:
      "They redesigned our flower shop’s website and added a seamless online ordering system. In just weeks, pickup orders climbed 60% and customer retention in Metro Detroit spiked by 35%.",
  },
  {
    id: "2",
    name: "Jamal",
    role: "Riverfront Arts Collective",
    avatarUrl: "/images/testimonials/testimonial-icon.svg",
    comment:
      "As a grassroots nonprofit, we needed a donation portal and volunteer scheduler. Ella Tech delivered both—online gifts rose 50% and volunteer registrations jumped 40% year-over-year.",
  },
  {
    id: "3",
    name: "Sophie",
    role: "Metro Skills Hub",
    avatarUrl: "/images/testimonials/testimonial-icon.svg",
    comment:
      "Their AI-and-Office workshops gave our team hands-on efficiency training. What used to take hours in Excel now takes minutes, boosting our program delivery by 50%.",
  },
  {
    id: "4",
    name: "Carlos",
    role: "GreenCycle Detroit",
    avatarUrl: "/images/testimonials/testimonial-icon.svg",
    comment:
      "We asked for a mobile-friendly web app to manage our bike-share program. Ella Tech built it end-to-end—ridership is up 25% and maintenance requests are now auto-logged.",
  },
  {
    id: "5",
    name: "Avery",
    role: "Solar United Neighbors",
    avatarUrl: "/images/testimonials/testimonial-icon.svg",
    comment:
      "Ella Tech Solutions created our interactive member portal and automated email workflows. Across their national network, volunteer engagement improved by 45%.",
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
    url: "#",
  },
  {
    id: "3",
    title: "Discord",
    icon: "/images/socials/discord.svg",
    url: "#",
  },
];
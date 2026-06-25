export const heroContent = {
  eyebrow: "Divine Creators",
  headline: "We Turn Ideas Into Content That Builds Brands",
  subheadline:
    "Helping businesses, founders, and professionals grow their online presence through strategic content, compelling visuals, and impactful storytelling.",
  primaryCta: { label: "Book a Free Consultation", hash: "contact" },
  secondaryCta: { label: "What We Do", href: `${import.meta.env.BASE_URL}#services` },
};

export const audienceChallenge = {
  heading: "Your Audience Is Online. The Question Is - Are They Noticing You?",
  intro: "Many businesses struggle to:",
  items: [
    "Maintain a consistent online presence",
    "Create engaging content regularly",
    "Build authority in their industry",
    "Generate meaningful engagement on social media",
    "Turn content into business opportunities",
  ],
  closing:
    "Creating content is easy. Creating content that people remember, trust, and engage with is where the real challenge begins.",
  note: "That's where Divine Creators comes in.",
};

export const companyStats = [];

const whyChooseHighlights = [
  {
    icon: "bi-lightbulb",
    title: "Content First Approach",
    text: "We believe strong content is the foundation of every successful digital presence.",
  },
  {
    icon: "bi-chat-square-quote",
    title: "Creative Storytelling",
    text: "We help brands communicate their message in a way that resonates with their audience.",
  },
  {
    icon: "bi-calendar-check",
    title: "Consistency Matters",
    text: "We create systems that help businesses stay visible and relevant online.",
  },
  {
    icon: "bi-people",
    title: "Collaborative Partnership",
    text: "We work closely with our clients to understand their goals and deliver content aligned with their vision.",
  },
];

export const aboutSectionContent = {
  label: "About Divine Creators",
  heading: "Great content has the power to build trust, create influence, and drive business growth.",
  paragraph:
    "Our mission is to help businesses and professionals establish a strong digital presence through creative content, strategic communication, and consistent brand storytelling.",
};

export const aboutWhyPartnerContent = {
  heading: "Why Choose Divine Creators?",
  paragraphs: whyChooseHighlights.map((item) => item.text),
};

export const homeWhyPartnerPreview = {
  heading: "Why Choose Divine Creators?",
  paragraph:
    "We focus on creating meaningful content experiences that help our clients connect with the right audience and strengthen their brand over time.",
  highlights: whyChooseHighlights,
};

export const processSteps = [
  { step: "01", title: "Discover", description: "Understanding your brand, audience, and goals." },
  { step: "02", title: "Strategize", description: "Creating a content roadmap designed around your objectives." },
  { step: "03", title: "Create", description: "Producing engaging content, visuals, and assets." },
  { step: "04", title: "Publish", description: "Managing distribution across relevant platforms." },
  { step: "05", title: "Optimize", description: "Reviewing performance and refining future content." },
];

export const homeProcessSteps = processSteps;

export const aboutMission = {
  title: "About Divine Creators",
  text:
    "Divine Creators was founded with a simple belief: Great content has the power to build trust, create influence, and drive business growth.",
};

export const aboutVision = {
  title: "Our Mission",
  text:
    "Our mission is to help businesses and professionals establish a strong digital presence through creative content, strategic communication, and consistent brand storytelling.",
};

export const aboutValues = whyChooseHighlights.map(({ title, text }) => ({
  title,
  description: text,
}));

const sharedCtaActions = {
  primaryCta: {
    label: "Book Your Free Consultation",
    hash: "contact",
    path: `${import.meta.env.BASE_URL}#contact`,
  },
  phoneCta: { label: "Call +91 6302142813", path: "tel:+916302142813" },
};

export const pageCtas = {
  home: {
    heading: "Let's Build Something Worth Remembering",
    ...sharedCtaActions,
  },
  about: {
    heading: "Let's Build Something Worth Remembering",
    ...sharedCtaActions,
  },
  services: {
    heading: "Let's Build Something Worth Remembering",
    ...sharedCtaActions,
  },
};

export const testimonials = [];

export const aboutStatement = {
  eyebrow: "About Divine Creators",
  statement:
    "We focus on creating meaningful content experiences that help our clients connect with the right audience and strengthen their brand over time.",
  keywords: ["meaningful content experiences", "right audience", "strengthen their brand"],
};

export const whoWeWorkWith = [
  "Founders",
  "Consultants",
  "Coaches",
  "Startups",
  "Small Businesses",
  "Personal Brands",
  "E-Commerce Brands",
  "Service-Based Businesses",
];

export const faqs = [
  {
    question: "Do you create content from scratch?",
    answer: "Yes. We can assist with content strategy, content creation, design, and publishing support.",
  },
  {
    question: "Do you manage LinkedIn accounts?",
    answer:
      "Yes. We help founders, professionals, and businesses strengthen their LinkedIn presence through strategic content and profile optimization.",
  },
  {
    question: "Do you provide video editing services?",
    answer:
      "Absolutely. We edit reels, shorts, podcasts, YouTube videos, and other branded video content.",
  },
  {
    question: "Can you manage our social media accounts?",
    answer: "Yes. We offer social media management and content support across major platforms.",
  },
];

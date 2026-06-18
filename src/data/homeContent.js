export const heroContent = {
  headline: "Your Trusted Partner for Digital Growth",
  subheadline:
    "Helping businesses attract the right audience, generate qualified leads, and achieve sustainable growth through strategic digital marketing solutions.",
  primaryCta: { label: "Get Started", path: "/contact" },
  secondaryCta: { label: "Explore Services", path: "/services" },
};

export const companyStats = [
  { value: "4+", label: "Years of Expertise" },
  { value: "30+", label: "Trusted Clients" },
  { value: "2M+", label: "Audience Reached" },
  { value: "99.9%", label: "Client Retention" },
];

const partnerHighlights = [
  { icon: "bi-compass", title: "Strategic approach", text: "Plans grounded in research, audience insight and clear business goals." },
  { icon: "bi-chat-dots", title: "Transparent communication", text: "Regular updates and honest reporting so you always know where things stand." },
  { icon: "bi-graph-up", title: "Performance-focused execution", text: "Campaigns built to drive measurable outcomes across your marketing channels." },
];

export const aboutWhyPartnerContent = {
  heading: "Why Partner with DIVINECREATORS?",
  paragraphs: [
    "At Divine Creators, we believe effective digital marketing is built on strategy, not guesswork. We partner with businesses to create impactful digital experiences, strengthen brand presence, and drive measurable growth through tailored marketing solutions.",
    "With a focus on innovation, transparency, and performance, we deliver strategies that not only elevate your brand but also contribute to long-term business success.",
  ],
};

export const homeWhyPartnerPreview = {
  heading: "Why Partner with DIVINECREATORS?",
  paragraph:
    "We combine research-led strategy, creative execution and performance marketing to help businesses attract the right audience and grow sustainably online.",
  highlights: partnerHighlights,
};

export const processSteps = [
  { step: "01", title: "Understand", description: "We learn about your business, audience, competitors and current marketing setup." },
  { step: "02", title: "Plan", description: "We clarify goals, select channels and shape a focused marketing roadmap." },
  { step: "03", title: "Create", description: "Content, campaigns and creative assets are built with clear intent." },
  { step: "04", title: "Launch", description: "Campaigns go live with structured timelines and tracking in place." },
  { step: "05", title: "Improve", description: "Insights guide ongoing optimization for stronger long-term results." },
];

export const homeProcessSteps = [
  { step: "01", title: "Understand", description: "We learn about your business, audience, competitors and current marketing setup." },
  { step: "02", title: "Plan", description: "We clarify goals, select channels and shape a focused marketing roadmap." },
  { step: "03", title: "Create", description: "Content, campaigns and creative assets are built with clear intent." },
  { step: "04", title: "Launch", description: "We publish campaigns, content and digital assets across the selected channels." },
  { step: "05", title: "Improve", description: "We review performance, identify opportunities and refine the strategy using real data." },
];

export const aboutMission = {
  title: "Mission",
  text: "To help businesses grow online through strategic digital marketing that combines clarity, creativity and measurable performance.",
};

export const aboutVision = {
  title: "Vision",
  text: "To be a trusted digital marketing partner for businesses that value thoughtful strategy, transparent communication and sustainable growth.",
};

export const aboutValues = [
  { title: "Strategy first", description: "Every recommendation starts with understanding your business and audience." },
  { title: "Transparency", description: "We communicate plans, progress and results in plain language." },
  { title: "Consistency", description: "Steady execution builds momentum across marketing channels." },
  { title: "Adaptability", description: "We refine strategies based on data, feedback and changing goals." },
  { title: "Partnership", description: "We work alongside your team with a shared focus on long-term success." },
  { title: "Performance", description: "Campaigns are measured, reviewed and improved over time." },
];

const sharedCtaActions = {
  primaryCta: { label: "Contact Us", path: "/contact" },
  phoneCta: { label: "Call +91 63021 42813", path: "tel:+916302142813" },
};

export const pageCtas = {
  home: {
    heading: "Ready to Grow Your Business Online?",
    ...sharedCtaActions,
  },
  about: {
    heading: "Looking for a Long-Term Digital Growth Partner?",
    ...sharedCtaActions,
  },
  services: {
    heading: "Not Sure Which Service Fits Your Business?",
    ...sharedCtaActions,
  },
  solutions: {
    heading: "Let's Find the Right Growth Strategy.",
    ...sharedCtaActions,
  },
};

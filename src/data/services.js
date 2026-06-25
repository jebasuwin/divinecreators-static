const IMAGE_BASE = `${import.meta.env.BASE_URL}assets/images/services`;

const divineCreatorServices = [
  {
    id: "social-media-management",
    title: "Social Media Management",
    intro:
      "Build a consistent and professional presence across platforms with content tailored to your audience and business goals.",
    servicesLabel: "Services Include:",
    services: [
      "Content Planning",
      "Content Creation",
      "Social Media Management",
      "Post Scheduling",
      "Performance Reporting",
    ],
    image: `${IMAGE_BASE}/social-media-marketing-new.webp`,
    imageAlt: "Social media content planning and management",
  },
  {
    id: "linkedin-personal-branding",
    title: "LinkedIn Personal Branding",
    intro:
      "Position yourself as a trusted voice in your industry and build meaningful professional visibility.",
    servicesLabel: "Services Include:",
    services: [
      "LinkedIn Profile Optimization",
      "Content Strategy",
      "Thought Leadership Content",
      "Personal Brand Development",
      "LinkedIn Growth Support",
    ],
    image: `${IMAGE_BASE}/personal-branding.webp`,
    imageAlt: "LinkedIn personal branding and professional visibility",
  },
  {
    id: "video-editing-short-form-content",
    title: "Video Editing & Short-Form Content",
    intro:
      "Capture attention and maximize engagement through professionally edited video content.",
    servicesLabel: "Services Include:",
    services: [
      "Reels Editing",
      "Shorts Editing",
      "Podcast Clips",
      "Talking Head Videos",
      "Motion Graphics",
      "YouTube Video Editing",
    ],
    image: `${IMAGE_BASE}/video-marketing-new.webp`,
    imageAlt: "Video editing and short-form content",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    intro:
      "Create visuals that strengthen your brand identity and communicate your message effectively.",
    servicesLabel: "Services Include:",
    services: [
      "Social Media Creatives",
      "Carousel Designs",
      "Marketing Materials",
      "Brand Visual Assets",
      "Presentation Design",
    ],
    image: `${IMAGE_BASE}/content-marketing.webp`,
    imageAlt: "Graphic design and brand visual assets",
  },
  {
    id: "content-writing-script-development",
    title: "Content Writing & Script Development",
    intro:
      "Transform ideas into content that informs, engages, and drives action.",
    servicesLabel: "Services Include:",
    services: [
      "Social Media Content",
      "LinkedIn Posts",
      "Website Copy",
      "Blog Articles",
      "Video Scripts",
      "Content Calendars",
    ],
    image: `${IMAGE_BASE}/lead-generation.webp`,
    imageAlt: "Content writing and script development",
  },
  {
    id: "youtube-growth-support",
    title: "YouTube Growth Support",
    intro:
      "Build a stronger YouTube presence through strategic content planning and channel management.",
    servicesLabel: "Services Include:",
    services: [
      "Content Planning",
      "Video Publishing Support",
      "Thumbnail Design",
      "Channel Optimization",
      "Content Strategy",
    ],
    image: `${IMAGE_BASE}/youtube-growth-management.webp`,
    imageAlt: "YouTube growth support and channel optimization",
  },
  {
    id: "website-app-development",
    title: "Website & App Development",
    servicesLabel: "Services Include:",
    services: [
      "Website Development",
      "Web Application Development",
      "Mobile App Development (Android & iOS)",
      "UI/UX Design",
      "Software Testing & QA",
      "Cloud & DevOps",
      "Maintenance & Support",
      "AI & Automation Solutions",
    ],
    image: `${IMAGE_BASE}/website-design-development.webp`,
    imageAlt: "Website and app development",
  },
];

export const digitalMarketingServices = divineCreatorServices;
export const specializedServices = [];

export const homeServiceGroups = [
  { id: "what-we-do", title: "What We Do", services: divineCreatorServices },
];

export const footerServices = divineCreatorServices.map(({ title, id }) => ({
  label: title,
  hash: id,
}));

export const contactServiceOptions = divineCreatorServices.map(({ title }) => title);

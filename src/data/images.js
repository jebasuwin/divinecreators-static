const IMAGE_BASE = `${import.meta.env.BASE_URL}assets/images`;
const SERVICE_BASE = `${IMAGE_BASE}/services`;

export const serviceImageMap = {
  "social-media-management": `${SERVICE_BASE}/social-media-marketing-new.webp`,
  "linkedin-personal-branding": `${SERVICE_BASE}/personal-branding.webp`,
  "video-editing-short-form-content": `${SERVICE_BASE}/video-marketing-new.webp`,
  "graphic-design": `${SERVICE_BASE}/content-marketing.webp`,
  "content-writing-script-development": `${SERVICE_BASE}/lead-generation.webp`,
  "youtube-growth-support": `${SERVICE_BASE}/youtube-growth-management.webp`,
  "website-app-development": `${SERVICE_BASE}/website-design-development.webp`,
};

export const images = {
  about: {
    hero: `${IMAGE_BASE}/about/hero.webp`,
    story: `${IMAGE_BASE}/about/story.webp`,
  },
  home: {
    whyPartner: `${IMAGE_BASE}/home/home-strategy-session.webp`,
  },
  services: {
    social: serviceImageMap["social-media-management"],
    personalBranding: serviceImageMap["linkedin-personal-branding"],
    video: serviceImageMap["video-editing-short-form-content"],
    content: serviceImageMap["content-writing-script-development"],
    web: serviceImageMap["website-app-development"],
  },
};

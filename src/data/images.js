import heroTeam from "../assets/images/home/hero-team.webp";
import whyPartnerImg from "../assets/images/home/home-marketing-team.webp";
import aboutHero from "../assets/images/about/hero.webp";
import aboutStory from "../assets/images/about/story.webp";
import servicesHero from "../assets/images/services/hero.webp";
import seoImg from "../assets/images/services/seo-analysis.webp";
import socialImg from "../assets/images/services/social.webp";
import paidAdsImg from "../assets/images/services/paid-ads-dashboard.webp";
import contentImg from "../assets/images/services/content-planning.webp";
import webImg from "../assets/images/services/website-design-workspace.webp";
import emailImg from "../assets/images/services/email-campaign.webp";
import leadsImg from "../assets/images/services/leads.webp";
import analyticsImg from "../assets/images/services/marketing-analytics.webp";
import youtubeServiceImg from "../assets/images/services/youtube-growth-service.webp";
import youtubeGrowthImg from "../assets/images/youtube-growth.webp";
import solutionsHero from "../assets/images/solutions/hero.webp";
import localImg from "../assets/images/solutions/local.webp";
import ecommerceImg from "../assets/images/solutions/ecommerce.webp";
import personalBrandingImg from "../assets/images/solutions/personal-branding.webp";
import videoImg from "../assets/images/solutions/video.webp";

export const images = {
  home: { hero: heroTeam, whyPartner: whyPartnerImg },
  about: { hero: aboutHero, story: aboutStory },
  services: {
    hero: servicesHero,
    seo: seoImg,
    social: socialImg,
    paidAds: paidAdsImg,
    content: contentImg,
    web: webImg,
    email: emailImg,
    leads: leadsImg,
    analytics: analyticsImg,
    youtube: youtubeServiceImg,
  },
  solutions: {
    hero: solutionsHero,
    local: localImg,
    ecommerce: ecommerceImg,
    branding: personalBrandingImg,
    video: videoImg,
    youtube: youtubeGrowthImg,
  },
};

export const serviceImageMap = {
  seo: seoImg,
  "social-media-marketing": socialImg,
  "paid-advertising": paidAdsImg,
  "content-marketing": contentImg,
  "website-development": webImg,
  "email-marketing": emailImg,
  "lead-generation": leadsImg,
  "marketing-analytics": analyticsImg,
  "youtube-growth-management": youtubeServiceImg,
};

export const solutionImageMap = {
  "local-business-marketing": localImg,
  "ecommerce-marketing": ecommerceImg,
  "personal-branding": personalBrandingImg,
  "video-marketing": videoImg,
  "youtube-growth-management": youtubeGrowthImg,
};

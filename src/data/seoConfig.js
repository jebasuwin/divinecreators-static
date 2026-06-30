export const siteUrl = "https://divinecreators.in";
export const defaultOgImage = `${siteUrl}/og-image.jpg`;

export const pageSeo = {
  home: {
    title: "Divine Creators | Content That Builds Brands",
    description:
      "Divine Creators helps businesses, founders, and professionals grow their online presence through strategic content, compelling visuals, and impactful storytelling.",
    path: "/",
  },
  about: {
    title: "About Divine Creators | Content, Storytelling and Brand Growth",
    description:
      "Divine Creators helps businesses and professionals establish a strong digital presence through creative content, strategic communication, and consistent brand storytelling.",
    path: "/about",
  },
  services: {
    title: "What We Do | Divine Creators",
    description:
      "Explore Divine Creators services including social media management, LinkedIn personal branding, video editing, graphic design, content writing, YouTube growth support, and Website & App Development.",
    path: "/#services",
  },
  contact: {
    title: "Book a Free Consultation | Divine Creators",
    description:
      "Book a free consultation with Divine Creators in Sholinganallur, Chennai - 600100.",
    path: "/#contact",
  },
  notFound: {
    title: "Page Not Found | DIVINE CREATORS",
    description: "The page you are looking for could not be found.",
    path: "/404",
  },
};

export const getCanonicalUrl = (path) => `${siteUrl}${path === "/" ? "" : path}`;

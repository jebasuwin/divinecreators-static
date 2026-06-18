export const siteUrl = "https://www.divinecreatos.com";
export const defaultOgImage = `${siteUrl}/og-image.jpg`;

export const pageSeo = {
  home: {
    title: "Digital Marketing Agency in Chennai | DIVINECREATORS",
    description:
      "DIVINECREATORS offers SEO, social media marketing, paid advertising, content marketing, web development and YouTube growth management for businesses in Chennai and beyond.",
    path: "/",
  },
  about: {
    title: "About Our Digital Marketing Agency | DIVINECREATORS",
    description:
      "Learn about DIVINECREATORS — a digital marketing agency focused on strategy, transparency and measurable growth for businesses.",
    path: "/about",
  },
  services: {
    title: "SEO, Social Media and Paid Advertising Services | DIVINECREATORS",
    description:
      "Explore digital marketing services including SEO, social media marketing, paid advertising, content marketing, email marketing, lead generation and YouTube growth management.",
    path: "/services",
  },
  solutions: {
    title: "Local, E-commerce and Personal Branding Solutions | DIVINECREATORS",
    description:
      "Specialized marketing solutions for local businesses, e-commerce brands, personal branding, video marketing and YouTube growth.",
    path: "/solutions",
  },
  contact: {
    title: "Contact Our Digital Marketing Team | DIVINECREATORS",
    description:
      "Contact DIVINECREATORS in Sholinganallur, Chennai. Discuss SEO, ads, social media, content marketing and YouTube growth for your business.",
    path: "/contact",
  },
  notFound: {
    title: "Page Not Found | DIVINECREATORS",
    description: "The page you are looking for could not be found.",
    path: "/404",
  },
};

export const getCanonicalUrl = (path) => `${siteUrl}${path === "/" ? "" : path}`;

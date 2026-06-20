export const siteUrl = "https://jebasuwin.github.io/divinecreators-static";
export const defaultOgImage = `${siteUrl}/og-image.jpg`;

export const pageSeo = {
  home: {
    title: "Digital Marketing Agency in Chennai | DIVINE CREATORS",
    description:
      "DIVINE CREATORS offers SEO, social media marketing, paid advertising, content marketing, web development and YouTube growth management for businesses in Chennai and beyond.",
    path: "/",
  },
  about: {
    title: "About Our Digital Marketing Agency | DIVINE CREATORS",
    description:
      "Learn about DIVINE CREATORS - a digital marketing agency focused on strategy, transparency and measurable growth for businesses.",
    path: "/about",
  },
  services: {
    title: "SEO, Social Media and Paid Advertising Services | DIVINE CREATORS",
    description:
      "Explore digital marketing services including SEO, social media marketing, paid advertising, content marketing, email marketing, lead generation and YouTube growth management.",
    path: "/#services",
  },
  contact: {
    title: "Contact Our Digital Marketing Team | DIVINE CREATORS",
    description:
      "Contact DIVINE CREATORS in Sholinganallur, Chennai. Discuss SEO, ads, social media, content marketing and YouTube growth for your business.",
    path: "/#contact",
  },
  notFound: {
    title: "Page Not Found | DIVINE CREATORS",
    description: "The page you are looking for could not be found.",
    path: "/404",
  },
};

export const getCanonicalUrl = (path) => `${siteUrl}${path === "/" ? "" : path}`;

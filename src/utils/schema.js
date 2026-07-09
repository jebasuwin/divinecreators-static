import { siteUrl } from "../data/seoConfig";
import { businessInfo } from "../data/businessInfo";

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: businessInfo.name,
  url: siteUrl,
  logo: `${siteUrl}/assets/brand/dc-logo-black-256.png`,
  description: businessInfo.tagline,
  email: businessInfo.email,
  telephone: businessInfo.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sholinganallur, Chennai",
    postalCode: "600100",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: Object.values(businessInfo.socialLinks).filter(
    (link) => typeof link === "string" && link.trim() !== "" && link.trim() !== "#"
  ),
});

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: businessInfo.name,
  url: siteUrl,
  description: businessInfo.tagline,
  publisher: {
    "@type": "Organization",
    name: businessInfo.name,
  },
});

export const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: item.path ? `${siteUrl}${item.path === "/" ? "" : item.path}` : undefined,
  })),
});

export const getServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  description: service.shortDescription,
  provider: {
    "@type": "Organization",
    name: businessInfo.name,
    url: siteUrl,
  },
  areaServed: "IN",
  serviceType: service.title,
});

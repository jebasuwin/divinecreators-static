/**
 * DIVINECREATORS — Homepage Services (static images, service-block UI)
 */
(function () {
  "use strict";

  const IMAGE_BASE = "/divinecreators-static/assets/images/services";

  const DIGITAL_MARKETING_SERVICES = [
    {
      id: "seo",
      title: "Search Engine Optimization (SEO) - NEED TEAM",
      intro: "Help businesses rank higher on search engines like Google.",
      servicesLabel: "Services include:",
      services: ["Keyword research", "On-page SEO", "Technical SEO", "Local SEO", "Link building", "SEO audits", "SEO reporting"],
      image: `${IMAGE_BASE}/seo.webp`,
      imageAlt: "SEO search rankings, keyword research and organic traffic growth",
    },
    {
      id: "social-media-marketing",
      title: "Social Media Marketing (SMM) - SHIVA",
      intro: "Manage and grow a company's social media presence.",
      platformsLabel: "Platforms:",
      platforms: ["Instagram", "Facebook", "LinkedIn", "X (Twitter)", "YouTube"],
      servicesLabel: "Services:",
      services: ["Content creation", "Post scheduling", "Community management", "Growth strategies", "Analytics reporting"],
      image: `${IMAGE_BASE}/social-media-marketing-new.webp`,
      imageAlt: "Social media marketing dashboard with content, engagement and audience growth",
    },
    {
      id: "paid-advertising",
      title: "Paid Advertising (Performance Marketing) - ANJALI",
      intro: "Run ads that generate leads or sales.",
      platformsLabel: "Platforms:",
      platforms: ["Google Ads", "Meta Ads", "LinkedIn Ads", "YouTube Ads"],
      servicesLabel: "Services:",
      services: ["Campaign setup", "Audience targeting", "Ad creatives", "A/B testing", "Conversion tracking", "ROAS optimization"],
      image: `${IMAGE_BASE}/paid-advertising-new.webp`,
      imageAlt: "Paid advertising campaign dashboard with targeting, conversions and performance growth",
      imageFit: "contain",
    },
    {
      id: "content-marketing",
      title: "Content Marketing - SHIVA",
      intro: "Create content that attracts customers.",
      servicesLabel: "Services:",
      services: ["Blog writing", "Website copywriting", "Case studies", "E-books", "Landing page content", "Content strategy"],
      image: `${IMAGE_BASE}/content-marketing.webp`,
      imageAlt: "Content marketing strategy, writing and editorial planning",
    },
    {
      id: "website-development",
      title: "Website Design & Development - JEBA",
      intro: "Many clients need a website before marketing.",
      servicesLabel: "Services:",
      services: ["Business websites", "Landing pages", "E-commerce websites", "Website maintenance", "Conversion optimization"],
      image: `${IMAGE_BASE}/website-design-development.webp`,
      imageAlt: "Responsive website design and development across desktop and mobile",
    },
    {
      id: "email-marketing",
      title: "Email Marketing - NEED PERSON & IP",
      intro: "Generate repeat business and nurture leads.",
      servicesLabel: "Services:",
      services: ["Newsletter creation", "Email automation", "Lead nurturing sequences", "Customer retention campaigns", "Email performance analysis"],
      image: `${IMAGE_BASE}/email-marketing.webp`,
      imageAlt: "Email marketing automation, newsletters and customer nurturing",
    },
    {
      id: "lead-generation",
      title: "Lead Generation - SHIVA - 40% & DATA ANALYTICS - NEED PERSON",
      intro: "Especially popular for B2B agencies.",
      servicesLabel: "Services:",
      services: ["Lead funnels", "Landing pages", "CRM integration", "Appointment booking systems", "Lead qualification"],
      image: `${IMAGE_BASE}/lead-generation.webp`,
      imageAlt: "Lead generation funnel, CRM and qualified customer acquisition",
    },
    {
      id: "marketing-analytics",
      title: "Marketing Analytics & Reporting - DATA ANALYTICS - NEED PERSON",
      intro: "Show clients the ROI of your work.",
      servicesLabel: "Services:",
      services: ["Dashboard setup", "Conversion tracking", "Campaign reporting", "Customer journey analysis"],
      image: `${IMAGE_BASE}/marketing-analytics-reporting-new.webp`,
      imageAlt: "Marketing analytics dashboard with campaign reporting, ROI charts and conversion tracking",
    },
  ];

  const SPECIALIZED_SERVICES = [
    {
      id: "local-business-marketing",
      title: "Local Business Marketing - NEED PERSON",
      intro: "For restaurants, clinics, gyms, real estate agents, etc.",
      servicesLabel: "Services:",
      services: ["Local SEO", "Business profile optimization", "Review management", "Local ads"],
      image: `${IMAGE_BASE}/local-business-marketing.webp`,
      imageAlt: "Local business marketing, map visibility and nearby customer search",
    },
    {
      id: "ecommerce-marketing",
      title: "E-commerce Marketing - SAMYA",
      intro: "For online stores.",
      servicesLabel: "Services:",
      services: ["Store optimization", "Product ads", "Cart abandonment campaigns", "Retargeting", "Conversion rate optimization"],
      image: `${IMAGE_BASE}/ecommerce-marketing.webp`,
      imageAlt: "E-commerce marketing, product advertising and online sales conversion",
    },
    {
      id: "personal-branding",
      title: "Personal Branding - SHIVA",
      intro: "For founders, consultants, coaches, and creators.",
      servicesLabel: "Services:",
      services: ["LinkedIn growth", "Content strategy", "Thought leadership", "Personal websites"],
      image: `${IMAGE_BASE}/personal-branding.webp`,
      imageAlt: "Professional personal branding, creator identity and thought leadership",
    },
    {
      id: "video-marketing",
      title: "Video Marketing - CHARAN",
      servicesLabel: "Services:",
      services: ["Reels", "Shorts", "YouTube management", "Video editing", "Motion graphics"],
      image: `${IMAGE_BASE}/video-marketing-new.webp`,
      imageAlt: "Video marketing production with editing timeline, reels and short-form videos",
    },
    {
      id: "youtube-growth-management",
      title: "YouTube Growth Management",
      image: `${IMAGE_BASE}/youtube-growth-management.webp`,
      imageAlt: "YouTube channel growth, subscribers, watch time and video analytics",
    },
  ];

  const SERVICE_GROUPS = [
    { id: "digital-marketing", title: "Digital Marketing Services", services: DIGITAL_MARKETING_SERVICES, eyebrowPrefix: "Service" },
    { id: "specialized", title: "High-Demand Specialized Services", services: SPECIALIZED_SERVICES, eyebrowPrefix: "Specialized Service" },
  ];

  const renderList = (label, items, className = "") => {
    if (!items?.length) return "";
    return `
      <h3 class="service-block__list-heading">${label}</h3>
      <ul class="text-secondary small service-block__list ${className}">
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
  };

  const getServiceImages = () =>
    SERVICE_GROUPS.flatMap((group) => group.services)
      .map((service) => service.image)
      .filter(Boolean);

  const preloadServiceImages = () => {
    const load = () => {
      getServiceImages().forEach((src, index) => {
        window.setTimeout(() => {
          const img = new Image();
          img.decoding = "async";
          img.src = src;
        }, index * 45);
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(load, { timeout: 800 });
    } else {
      window.setTimeout(load, 250);
    }
  };

  const renderVisual = (service, blockIndex) => {
    if (!service.image) return "";
    const useContain = service.imageFit === "contain";
    const isPriority = blockIndex < 3;
    const priority = isPriority ? "high" : "low";
    return `
      <div class="service-visual${useContain ? " service-visual--contain" : ""}">
        <img
          src="${service.image}"
          alt="${service.imageAlt}"
          class="${useContain ? "contain-image" : ""}"
          loading="${isPriority ? "eager" : "lazy"}"
          fetchpriority="${priority}"
          width="1360"
          height="1120"
          decoding="async"
        />
      </div>
    `;
  };

  const renderBlock = (service, blockIndex, reverse, eyebrowLabel) => {
    const altClass = blockIndex % 2 === 1 ? " service-block--alt" : "";
    const reverseClass = reverse ? " flex-lg-row-reverse" : "";
    const intro = service.intro ? `<p class="text-secondary">${service.intro}</p>` : "";
    const platforms = service.platforms ? renderList(service.platformsLabel, service.platforms, "service-block__list--platforms") : "";
    const services = service.services ? renderList(service.servicesLabel, service.services) : "";

    return `
      <div id="${service.id}" class="service-block${altClass}">
        <div class="container-xl">
          <div class="row g-5 align-items-center${reverseClass}" data-aos="fade-up">
            <div class="col-lg-6">
              <span class="eyebrow">${eyebrowLabel}</span>
              <h2>${service.title}</h2>
              ${intro}
              ${platforms}
              ${services}
              <a href="#contact" class="btn-glow mt-3">Contact Us</a>
            </div>
            <div class="col-lg-6 service-block__visual">
              ${renderVisual(service, blockIndex)}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const renderHomeServices = () => {
    const root = document.querySelector("[data-home-services]");
    if (!root) return;

    let blockIndex = 0;
    root.innerHTML = SERVICE_GROUPS.map((group, groupIndex) => {
      const isFirstGroup = groupIndex === 0;
      const headingClass = `container-xl services-home__group-heading${isFirstGroup ? " services-heading" : ""}`;
      const headingLabel = isFirstGroup
        ? `<span class="eyebrow section-label">Services</span>`
        : "";
      const headingId = isFirstGroup ? ' id="services-heading"' : "";

      const blocks = group.services.map((service, groupServiceIndex) => {
        const reverse = blockIndex % 2 === 1;
        const eyebrowLabel = `${group.eyebrowPrefix} ${String(groupServiceIndex + 1).padStart(2, "0")}`;
        const html = renderBlock(service, blockIndex, reverse, eyebrowLabel);
        blockIndex += 1;
        return html;
      }).join("");

      return `
        <div class="services-home__group">
          <div class="${headingClass}" data-aos="fade-up">
            ${headingLabel}
            <h2 class="services-home__group-title"${headingId}>${group.title}</h2>
          </div>
          ${blocks}
        </div>
      `;
    }).join("");
  };

  window.HomeServices = { renderHomeServices, preloadServiceImages, SERVICE_GROUPS };
})();

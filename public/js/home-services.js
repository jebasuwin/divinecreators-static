/**
 * DIVINECREATORS - Homepage Services (static images, service-block UI)
 */
(function () {
  "use strict";

  const IMAGE_BASE = "assets/images/services";
  const IMAGE_DIMENSIONS = {
    "content-marketing": { width: 640, height: 427, mobileWidth: 480, mobileHeight: 320 },
    "lead-generation": { width: 640, height: 360, mobileWidth: 480, mobileHeight: 270 },
    "personal-branding": { width: 640, height: 480, mobileWidth: 480, mobileHeight: 360 },
    "social-media-marketing-new": { width: 640, height: 427, mobileWidth: 480, mobileHeight: 320 },
    "video-marketing-new": { width: 640, height: 427, mobileWidth: 480, mobileHeight: 320 },
    "website-design-development": { width: 640, height: 426, mobileWidth: 480, mobileHeight: 320 },
    "youtube-growth-management": { width: 640, height: 427, mobileWidth: 480, mobileHeight: 320 },
  };

  const SERVICES = [
    {
      id: "social-media-management",
      title: "Social Media Management",
      intro: "Build a consistent and professional presence across platforms with content tailored to your audience and business goals.",
      servicesLabel: "Services Include:",
      services: ["Content Planning", "Content Creation", "Social Media Management", "Post Scheduling", "Performance Reporting"],
      image: `${IMAGE_BASE}/social-media-marketing-new.webp`,
      imageAlt: "Social media content planning and management",
    },
    {
      id: "linkedin-personal-branding",
      title: "LinkedIn Personal Branding",
      intro: "Position yourself as a trusted voice in your industry and build meaningful professional visibility.",
      servicesLabel: "Services Include:",
      services: ["LinkedIn Profile Optimization", "Content Strategy", "Thought Leadership Content", "Personal Brand Development", "LinkedIn Growth Support"],
      image: `${IMAGE_BASE}/personal-branding.webp`,
      imageAlt: "LinkedIn personal branding and professional visibility",
    },
    {
      id: "graphic-design",
      title: "Graphic Design",
      intro: "Create visuals that strengthen your brand identity and communicate your message effectively.",
      servicesLabel: "Services Include:",
      services: ["Social Media Creatives", "Carousel Designs", "Marketing Materials", "Brand Visual Assets", "Presentation Design"],
      image: `${IMAGE_BASE}/content-marketing.webp`,
      imageAlt: "Graphic design and brand visual assets",
    },
    {
      id: "content-writing-script-development",
      title: "Content Writing & Script Development",
      intro: "Transform ideas into content that informs, engages, and drives action.",
      servicesLabel: "Services Include:",
      services: ["Social Media Content", "LinkedIn Posts", "Website Copy", "Blog Articles", "Video Scripts", "Content Calendars"],
      image: `${IMAGE_BASE}/lead-generation.webp`,
      imageAlt: "Content writing and script development",
    },
    {
      id: "youtube-growth-support",
      title: "YouTube Growth Support",
      intro: "Build a stronger YouTube presence through strategic content planning and channel management.",
      servicesLabel: "Services Include:",
      services: ["Content Planning", "Video Publishing Support", "Thumbnail Design", "Channel Optimization", "Content Strategy"],
      image: `${IMAGE_BASE}/youtube-growth-management.webp`,
      imageAlt: "YouTube growth support and channel optimization",
    },
    {
      id: "website-app-development",
      title: "Website & App Development",
      servicesLabel: "Services Include:",
      services: ["Website Development", "Web Application Development", "Mobile App Development (Android & iOS)", "UI/UX Design", "Software Testing & QA", "Cloud & DevOps", "Maintenance & Support", "AI & Automation Solutions"],
      image: `${IMAGE_BASE}/website-design-development.webp`,
      imageAlt: "Website and app development",
    },
    {
      id: "video-editing-short-form-content",
      title: "Video Editing & Short-Form Content",
      intro: "Capture attention and maximize engagement through professionally edited video content.",
      servicesLabel: "Services Include:",
      services: ["Reels Editing", "Shorts Editing", "Podcast Clips", "Talking Head Videos", "Motion Graphics", "YouTube Video Editing"],
      image: `${IMAGE_BASE}/video-marketing-new.webp`,
      imageAlt: "Video editing and short-form content",
      videoShowcase: {
        poster: "assets/videos/one-bullet-left-poster.webp",
        mobileSrc: "assets/videos/one-bullet-left-720.mp4",
        desktopSrc: "assets/videos/one-bullet-left-1080.mp4",
        label: "Video editing portfolio sample",
      },
    },
  ];

  const SERVICE_GROUPS = [
    { id: "what-we-do", title: "What We Do", services: SERVICES },
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

  const getResponsiveImage = (src) => {
    const base = src.replace(/\.[a-z0-9]+$/i, "");
    const imageName = base.split("/").pop();
    const dimensions = IMAGE_DIMENSIONS[imageName] || { width: 640, height: 427, mobileWidth: 480, mobileHeight: 320 };
    return {
      mobileSrc: `${base}-480.jpg`,
      src: `${base}-640.jpg`,
      srcset: `${base}-640.jpg 640w, ${base}-960.jpg 960w`,
      ...dimensions,
    };
  };

  const getServiceImages = () =>
    SERVICE_GROUPS.flatMap((group) => group.services)
      .map((service) => service.image)
      .filter(Boolean);

  const preloadServiceImages = () => {
    const images = getServiceImages().map(getResponsiveImage);
    const load = () => {
      images.forEach((image, index) => {
        window.setTimeout(() => {
          const img = new Image();
          img.decoding = "async";
          img.srcset = image.srcset;
          img.sizes = "(max-width: 575px) calc(100vw - 26px), (max-width: 991px) 423px, 498px";
          img.src = image.src;
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
    const image = getResponsiveImage(service.image);
    return `
      <div class="service-visual${useContain ? " service-visual--contain" : ""}">
        <picture>
          <source media="(max-width: 575px)" srcset="${image.mobileSrc}" width="${image.mobileWidth}" height="${image.mobileHeight}" />
          <img
            src="${image.src}"
            srcset="${image.srcset}"
            sizes="(max-width: 991px) 423px, 498px"
            alt="${service.imageAlt}"
            class="${useContain ? "contain-image" : ""}"
            loading="lazy"
            fetchpriority="auto"
            width="${image.width}"
            height="${image.height}"
            decoding="async"
          />
        </picture>
      </div>
    `;
  };

  const renderVideoShowcase = (showcase) => {
    if (!showcase) return "";
    return `
      <div class="service-video-showcase" data-service-video data-src-mobile="${showcase.mobileSrc}" data-src-desktop="${showcase.desktopSrc}">
        <div class="service-video-showcase__frame">
          <video
            class="service-video-showcase__media"
            poster="${showcase.poster}"
            preload="none"
            muted
            playsinline
            disablepictureinpicture
            controlslist="nodownload noplaybackrate"
            aria-label="${showcase.label}"
          ></video>
          <button type="button" class="service-video-showcase__mute" data-service-video-mute aria-label="Unmute video" aria-pressed="false">
            <span class="service-video-showcase__icon service-video-showcase__icon--muted" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4Zm12.2 1.4 1.4-1.4 2.1 2.1 2.1-2.1 1.4 1.4-2.1 2.1 2.1 2.1-1.4 1.4-2.1-2.1-2.1 2.1-1.4-1.4 2.1-2.1-2.1-2.1Z"/></svg>
            </span>
            <span class="service-video-showcase__icon service-video-showcase__icon--sound" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4Zm12.6-2.2-1.4 1.4A5.4 5.4 0 0 1 17 12a5.4 5.4 0 0 1-1.8 3.8l1.4 1.4A7.3 7.3 0 0 0 19 12a7.3 7.3 0 0 0-2.4-5.2Zm2.8-2.8L18 5.4A9.4 9.4 0 0 1 21 12a9.4 9.4 0 0 1-3 6.6l1.4 1.4A11.4 11.4 0 0 0 23 12a11.4 11.4 0 0 0-3.6-8Z"/></svg>
            </span>
          </button>
        </div>
      </div>
    `;
  };

  const setupVideoShowcases = (scope = document) => {
    const showcases = Array.from(scope.querySelectorAll("[data-service-video]"));
    if (!showcases.length) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const loadVideo = (showcase) => {
      if (showcase.dataset.loaded === "true") return;
      const video = showcase.querySelector("video");
      if (!video) return;

      const src = mobileQuery.matches ? showcase.dataset.srcMobile : showcase.dataset.srcDesktop;
      if (!src) return;

      video.src = src;
      video.load();
      showcase.dataset.loaded = "true";
    };

    const setMuted = (showcase, muted) => {
      const video = showcase.querySelector("video");
      const button = showcase.querySelector("[data-service-video-mute]");
      if (!video || !button) return;

      video.muted = muted;
      showcase.classList.toggle("is-audible", !muted);
      button.setAttribute("aria-pressed", muted ? "false" : "true");
      button.setAttribute("aria-label", muted ? "Unmute video" : "Mute video");
    };

    const playVideo = (showcase) => {
      const video = showcase.querySelector("video");
      if (!video) return;

      loadVideo(showcase);
      if (showcase.dataset.userAudible !== "true") {
        setMuted(showcase, true);
      }

      const playAttempt = video.play();
      if (playAttempt?.catch) {
        playAttempt.catch(() => {
          setMuted(showcase, true);
          video.play().catch(() => {});
        });
      }
    };

    const pauseVideo = (showcase) => {
      const video = showcase.querySelector("video");
      if (video && !video.paused) video.pause();
    };

    showcases.forEach((showcase) => {
      if (showcase.dataset.bound === "true") return;
      showcase.dataset.bound = "true";

      const button = showcase.querySelector("[data-service-video-mute]");
      button?.addEventListener("click", () => {
        loadVideo(showcase);
        const video = showcase.querySelector("video");
        if (!video) return;

        const shouldMute = !video.muted ? true : false;
        showcase.dataset.userAudible = shouldMute ? "false" : "true";
        setMuted(showcase, shouldMute);
        if (showcase.classList.contains("is-active")) {
          video.play().catch(() => {});
        }
      });
    });

    if (!("IntersectionObserver" in window)) {
      showcases.forEach((showcase) => {
        showcase.classList.add("is-active");
        playVideo(showcase);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const showcase = entry.target.querySelector("[data-service-video]") || entry.target;
          const active = entry.isIntersecting && entry.intersectionRatio >= 0.24;
          showcase.classList.toggle("is-active", active);
          if (active && !document.hidden) playVideo(showcase);
          else pauseVideo(showcase);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: [0, 0.24, 0.5] }
    );

    showcases.forEach((showcase) => observer.observe(showcase.closest(".service-block") || showcase));

    document.addEventListener("visibilitychange", () => {
      showcases.forEach((showcase) => {
        if (document.hidden) pauseVideo(showcase);
        else if (showcase.classList.contains("is-active")) playVideo(showcase);
      });
    });
  };

  const renderBlock = (service, blockIndex, reverse) => {
    const altClass = blockIndex % 2 === 1 ? " service-block--alt" : "";
    const reverseClass = reverse ? " flex-lg-row-reverse" : "";
    const intro = service.intro ? `<p class="text-secondary">${service.intro}</p>` : "";
    const services = service.services ? renderList(service.servicesLabel, service.services) : "";

    return `
      <div id="${service.id}" class="service-block${altClass}">
        <div class="container-xl">
          <div class="row g-5 align-items-center${reverseClass}" data-aos="fade-up">
          <div class="col-lg-6 service-block__copy">
            <div class="service-block__content">
              <h2>${service.title}</h2>
              ${intro}
              ${services}
              <a href="#contact" class="btn-glow mt-3">Book a Free Consultation</a>
            </div>
          </div>
            <div class="col-lg-6 service-block__visual">
              ${renderVisual(service, blockIndex)}
            </div>
          </div>
          ${renderVideoShowcase(service.videoShowcase)}
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
      const headingLabel = "";
      const headingId = isFirstGroup ? ' id="services-heading"' : "";

      const blocks = group.services.map((service, groupServiceIndex) => {
        const reverse = blockIndex % 2 === 1;
        const html = renderBlock(service, blockIndex, reverse);
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

    setupVideoShowcases(root);
  };

  window.HomeServices = { renderHomeServices, preloadServiceImages, setupVideoShowcases, SERVICE_GROUPS };
})();

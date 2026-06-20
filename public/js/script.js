/* DIVINECREATORS — Main script */
(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealAosElements = (scope = document) => {
    scope.querySelectorAll("[data-aos]").forEach((el) => {
      el.classList.add("aos-init", "aos-animate");
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.visibility = "visible";
    });
  };
  const aosCanAnimate = () => false;
  const syncAosElements = (scope = document) => {
    if (aosCanAnimate()) {
      if (typeof AOS.refreshHard === "function") AOS.refreshHard();
      else AOS.refresh();
      return;
    }
    revealAosElements(scope);
  };
  const smoothBehavior = "smooth";

  const setupScrollEffects = () => {
    const revealNodes = Array.from(document.querySelectorAll([
      ".stat-box",
      ".about-section__content",
      ".about-section__visual",
      ".services-home__group-heading",
      ".service-block .row",
      ".contact-section__intro",
      ".contact-info-card",
      ".contact-form-card",
      ".site-footer__grid > *",
    ].join(",")));
    const textSelector = [
      "main h1",
      "main h2",
      "main h3",
      "main h4",
      "main h5",
      "main h6",
      "main p",
      "main li",
      "main label",
      "main button",
      "main .eyebrow",
      "main .btn-glow",
      "main .btn-outline-glow",
      "main .stat-box__value",
      "main .stat-box__label",
      "main .contact-info-card__label",
      "main .contact-detail-label",
      "main .contact-detail-value",
      "main .contact-form-card__label",
      "footer h6",
      "footer p",
      "footer li",
      "footer .brand-logo span",
      "footer .site-footer__copy",
    ].join(",");
    const ignoredTextContainers = [
      ".hero-motion-graphic",
      ".about-dashboard-viz",
      ".service-block__visual",
      ".service-visual",
      ".service-scene",
      ".motion-graphic",
      ".circuit-motion-graphic",
      ".blob-motion-graphic",
      ".aurora-motion-graphic",
      "canvas",
      "svg",
      "picture",
      "video",
    ].join(",");
    const textNodes = Array.from(document.querySelectorAll(textSelector))
      .filter((el) => el.textContent.trim().length > 0)
      .filter((el) => !el.closest(".hero"))
      .filter((el) => !el.closest(ignoredTextContainers));

    if (!revealNodes.length && !textNodes.length) return;

    revealNodes.forEach((el, index) => {
      el.classList.add("scroll-soft");
      el.style.setProperty("--scroll-soft-delay", `${Math.min((index % 4) * 28, 84)}ms`);
    });

    const classifyTextNode = (el) => {
      const isServiceText = Boolean(el.closest(".service-block, .services-home__group-heading"));
      const isHeading = el.matches("h1, h2, h3, h4, h5, h6, .eyebrow, .section-label");
      const isItem = el.matches("li");
      const isAction = el.matches("a, button, .btn-glow, .btn-outline-glow");

      el.classList.add("scroll-text");
      if (isHeading) el.classList.add("scroll-text--heading");
      else if (isItem) el.classList.add("scroll-text--item");
      else if (isAction) el.classList.add("scroll-text--action");
      else el.classList.add("scroll-text--body");

      if (!isServiceText) return;

      el.classList.add("scroll-text--service");
      if (isHeading) el.classList.add("scroll-text--service-heading");
      else if (isItem) el.classList.add("scroll-text--service-item");
      else if (isAction) el.classList.add("scroll-text--service-action");
      else el.classList.add("scroll-text--service-body");
    };

    textNodes.forEach((el, index) => {
      classifyTextNode(el);
      const isServiceText = Boolean(el.closest(".service-block, .services-home__group-heading"));
      const delayStep = isServiceText ? 36 : 24;
      const maxDelay = isServiceText ? 180 : 120;
      el.style.setProperty("--scroll-text-delay", `${Math.min((index % 6) * delayStep, maxDelay)}ms`);
    });

    const isVisible = (el, before = 0.98, after = -0.08) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * before && rect.bottom > window.innerHeight * after;
    };

    const activateVisible = () => {
      revealNodes.forEach((el) => {
        el.classList.toggle("is-inview", isVisible(el, 1.12, -0.14));
      });
      textNodes.forEach((el) => {
        el.classList.toggle("is-inview", isVisible(el));
      });
    };

    activateVisible();

    if (!("IntersectionObserver" in window)) {
      window.addEventListener("scroll", activateVisible, { passive: true });
      window.addEventListener("resize", activateVisible);
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-inview", entry.isIntersecting);
        });
      },
      { rootMargin: "18% 0px 18% 0px", threshold: 0.01 }
    );

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-inview", entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );

    revealNodes.forEach((el) => revealObserver.observe(el));
    textNodes.forEach((el) => textObserver.observe(el));
    requestAnimationFrame(activateVisible);
  };

  /* ─── Navbar scroll ─── */
  const nav = document.querySelector(".site-nav");
  const onScroll = () => {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ─── Mobile menu ─── */
  const drawer = document.getElementById("mobileDrawer");
  const openBtn = document.querySelector("[data-menu-open]");
  const closeBtns = document.querySelectorAll("[data-menu-close]");

  const openMenu = () => {
    if (!drawer) return;
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    if (!drawer) return;
    drawer.classList.remove("open");
    document.body.style.overflow = "";
  };

  openBtn?.addEventListener("click", openMenu);
  closeBtns.forEach((btn) => btn.addEventListener("click", closeMenu));

  /* ─── Active nav link ─── */
  const siteBasePath = "/divinecreators-static";
  const path = window.location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
  const isHomePage = path === "/" || path === "/index" || path === siteBasePath || path === `${siteBasePath}/index`;

  /* ─── Hash navigation ─── */
  const scrollToHash = (hash, behavior = smoothBehavior) => {
    const id = (hash || "").replace(/^#/, "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior, block: "start" });
  };

  const getHashFromHref = (href) => {
    if (!href) return "";
    if (href.startsWith(`${siteBasePath}/#`)) return href.slice(siteBasePath.length + 1);
    if (href.startsWith("/#")) return href.slice(1);
    if (href.startsWith("#")) return href;
    return "";
  };

  document.querySelectorAll(".site-nav__link, .mobile-drawer__link, .site-footer__links a, .hero__actions a, .btn-glow").forEach((link) => {
    const hash = getHashFromHref(link.getAttribute("href"));
    if (!hash || hash === "#main") return;

    link.addEventListener("click", (e) => {
      closeMenu();
      if (isHomePage) {
        e.preventDefault();
        scrollToHash(hash);
        if (window.location.hash !== hash) {
          history.pushState(null, "", hash);
        }
      }
    });
  });

  document.querySelectorAll(".site-nav__link, .mobile-drawer__link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto")) return;
    if (getHashFromHref(href)) return;
    const linkPath = href.replace(/\.html$/, "").replace(/\/$/, "").replace(/#.*$/, "") || "/";
    if (linkPath === path) link.classList.add("active");
  });

  const handleInitialHash = () => {
    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash));
    }
  };

  if (document.readyState === "complete") {
    handleInitialHash();
  } else {
    window.addEventListener("load", handleInitialHash, { once: true });
  }

  window.addEventListener("hashchange", () => {
    if (window.location.hash) scrollToHash(window.location.hash);
  });

  /* ─── About section reveal ─── */
  const aboutRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        aboutRevealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
  );
  document.querySelectorAll("[data-about-reveal]").forEach((el) => aboutRevealObserver.observe(el));

  /* ─── AOS ─── */
  if (aosCanAnimate()) {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: reducedMotion,
    });
  } else {
    revealAosElements();
  }

  /* ─── Render homepage services ─── */
  if (typeof HomeServices !== "undefined") {
    HomeServices.renderHomeServices();
    HomeServices.preloadServiceImages?.();
    if (aosCanAnimate()) {
      AOS.refresh();
      window.setTimeout(() => {
        document.querySelectorAll(".services-home [data-aos]:not(.aos-animate)").forEach((el) => {
          el.classList.add("aos-animate");
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }, 2500);
    } else {
      revealAosElements(document.querySelector(".services-home") || document);
    }
  }

  /* ─── Section nav active state ─── */
  const navSectionLinks = document.querySelectorAll("[data-nav-section]");
  const SECTION_MAP = [
    { id: "home", nav: "home" },
    { id: "statistics", nav: "home" },
    { id: "about", nav: "about" },
    { id: "services", nav: "services" },
    { id: "contact", nav: "contact" },
  ];
  const HOME_SCROLL_FALLBACK = 160;
  const PROBE_OFFSET = 24;

  const getNavbarHeight = () => {
    const navbar = document.querySelector(".site-nav") || document.querySelector("header");
    return navbar?.getBoundingClientRect().height ?? 72;
  };

  const calculateActiveSection = () => {
    if (window.scrollY < HOME_SCROLL_FALLBACK) return "home";

    const navbarHeight = getNavbarHeight();
    const probeY = window.scrollY + navbarHeight + PROBE_OFFSET;
    let nextActive = "home";

    for (const section of SECTION_MAP) {
      const element = document.getElementById(section.id);
      if (!element) continue;

      const sectionTop = window.scrollY + element.getBoundingClientRect().top;
      const sectionBottom = sectionTop + element.offsetHeight;

      if (probeY >= sectionTop && probeY < sectionBottom) {
        nextActive = section.nav;
        break;
      }
    }

    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 12;

    if (nearBottom) return "contact";

    return nextActive;
  };

  const applyActiveSection = (activeId) => {
    navSectionLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("data-nav-section") === activeId);
    });
  };

  if (navSectionLinks.length) {
    let navFrameId = null;

    const updateActiveSection = () => {
      applyActiveSection(calculateActiveSection());
    };

    const onNavScroll = () => {
      if (navFrameId !== null) return;
      navFrameId = requestAnimationFrame(() => {
        updateActiveSection();
        navFrameId = null;
      });
    };

    navSectionLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const sectionId = link.getAttribute("data-nav-section");
        if (sectionId) applyActiveSection(sectionId);
      });
    });

    updateActiveSection();
    window.addEventListener("scroll", onNavScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", () => {
      window.setTimeout(updateActiveSection, 100);
      window.setTimeout(updateActiveSection, 450);
    });
  }

  /* ─── GSAP hero timeline ─── */
  const heroTl = () => {
    if (typeof gsap === "undefined" || reducedMotion) return;

    const visibleHeroCopy = ".hero__eyebrow, .hero__title, .hero__subtitle, .hero__actions";
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    gsap.set(visibleHeroCopy, { opacity: 1, visibility: "visible" });
    tl.from(".brand-logo", { y: 20, duration: 0.6 })
      .from(".hero__eyebrow", { y: 16, duration: 0.5 }, "-=0.3")
      .from(".hero__title", { y: 24, duration: 0.6 }, "-=0.2")
      .from(".hero__subtitle", { y: 20, duration: 0.55 }, "-=0.25")
      .from(".hero__actions .btn-glow", { y: 24, scale: 0.92, duration: 0.5 }, "-=0.2")
      .from(".hero__actions .btn-outline-glow", { y: 24, duration: 0.45 }, "-=0.4")
      .from(".hero-motion-graphic", { scale: 0.88, duration: 0.7 }, "-=0.5");
  };

  if (document.querySelector(".hero")) {
    heroTl();
  }

  /* ─── Homepage statistics ─── */
  const formatStatValue = (value, decimals, suffix) => {
    const num = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
    return `${num}${suffix}`;
  };

  const HOME_STATS = [
    { target: 4, suffix: "+", decimals: 0, duration: 1400, label: "Years of Expertise" },
    { target: 30, suffix: "+", decimals: 0, duration: 1500, label: "Trusted Clients" },
    { target: 2, suffix: "M+", decimals: 0, duration: 1600, label: "Audience Reached" },
    { target: 99.9, suffix: "%", decimals: 1, duration: 1700, label: "Client Retention" },
  ];

  const renderHomeStats = () => {
    const row = document.querySelector("[data-home-stats]");
    if (!row) return;
    row.innerHTML = HOME_STATS.map((stat, index) => `
      <div class="col-12 col-md-6 col-lg-3" data-aos="fade-up"${index ? ` data-aos-delay="${index * 100}"` : ""}>
        <div class="stat-box h-100">
          <div
            class="stat-box__value stat-value"
            data-stat-target="${stat.target}"
            data-stat-suffix="${stat.suffix}"
            data-stat-decimals="${stat.decimals}"
            data-stat-duration="${stat.duration}"
            data-stat-delay="${index * 100}"
          >${formatStatValue(0, stat.decimals, stat.suffix)}</div>
          <div class="stat-box__label">${stat.label}</div>
        </div>
      </div>
    `).join("");
  };

  renderHomeStats();
  syncAosElements(document.querySelector(".section-stats") || document);
  setupScrollEffects();

  const animatedStatElements = new WeakSet();

  const animateStatValue = (el) => {
    if (animatedStatElements.has(el)) return;
    animatedStatElements.add(el);

    const target = parseFloat(el.dataset.statTarget);
    const suffix = el.dataset.statSuffix || "";
    const decimals = parseInt(el.dataset.statDecimals || "0", 10);
    const duration = parseInt(el.dataset.statDuration || "1500", 10);
    const delay = parseInt(el.dataset.statDelay || "0", 10);

    if (Number.isNaN(target)) return;

    if (reducedMotion) {
      el.textContent = formatStatValue(target, decimals, suffix);
      return;
    }

    const startTime = performance.now() + delay;

    const step = (now) => {
      if (now < startTime) {
        requestAnimationFrame(step);
        return;
      }

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = target * eased;

      el.textContent = formatStatValue(current, decimals, suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatStatValue(target, decimals, suffix);
      }
    };

    requestAnimationFrame(step);
  };

  const statsSection = document.querySelector(".section-stats");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        statsSection.querySelectorAll("[data-stat-target]").forEach(animateStatValue);
        statsObserver.disconnect();
      },
      { threshold: 0.35 }
    );
    statsObserver.observe(statsSection);
    if (reducedMotion) {
      statsSection.querySelectorAll("[data-stat-target]").forEach(animateStatValue);
    }
  }

  /* ─── Progress bars ─── */
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll(".progress-skill").forEach((el) => progressObserver.observe(el));

  /* ─── Portfolio filter ─── */
  const filterBtns = document.querySelectorAll("[data-filter]");
  const projectItems = document.querySelectorAll("[data-category]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      projectItems.forEach((item) => {
        const show = filter === "all" || item.dataset.category === filter;
        item.closest(".col-md-6, .col-lg-4")?.classList.toggle("d-none", !show);
      });
    });
  });

  /* ─── Testimonial slider ─── */
  if (!document.querySelector(".testimonial-motion-wrap")) {
    const testimonials = document.querySelectorAll("[data-testimonial]");
    const prevBtn = document.querySelector("[data-testimonial-prev]");
    const nextBtn = document.querySelector("[data-testimonial-next]");
    let testimonialIndex = 0;

    const showTestimonial = (i) => {
      if (!testimonials.length) return;
      testimonialIndex = (i + testimonials.length) % testimonials.length;
      testimonials.forEach((t, idx) => {
        t.classList.toggle("d-none", idx !== testimonialIndex);
      });
    };

    prevBtn?.addEventListener("click", () => showTestimonial(testimonialIndex - 1));
    nextBtn?.addEventListener("click", () => showTestimonial(testimonialIndex + 1));
  }

  /* ─── Contact form ─── */
  const form = document.getElementById("contactForm");
  if (form) {
    const GOOGLE_FORM_ENDPOINT = "https://docs.google.com/forms/d/e/1FAIpQLSchFLajMTTEJIQOqaLkks-qoedDEYR1RMZsCumzN9jcIlvl2g/formResponse";
    const GOOGLE_FORM_FBZ = "-1814369755346911261";
    const GOOGLE_FORM_FIELDS = {
      email: "entry.1523820956",
      fullName: "entry.1846889827",
      phone: "entry.1055864657",
      company: "entry.164857000",
      service: "entry.1458681657",
      serviceOther: "entry.1458681657.other_option_response",
      serviceSentinel: "entry.1458681657_sentinel",
      message: "entry.1221370137",
    };
    const GOOGLE_SERVICE_VALUES = new Set([
      "Search Engine Optimization (SEO)",
      "Social Media Marketing (SMM)",
      "Paid Advertising (Performance Marketing)",
      "Content Marketing",
      "Website Design & Development",
      "Email Marketing",
      "Lead Generation & DATA ANALYTICS",
      "Marketing Analytics & Reporting - DATA ANALYTICS",
      "Local Business Marketing",
      "E-commerce Marketing",
      "Personal Branding",
      "Video Marketing",
    ]);
    const SERVICE_VALUE_MAP = new Map([
      ["Lead Generation", "Lead Generation & DATA ANALYTICS"],
      ["Marketing Analytics & Reporting", "Marketing Analytics & Reporting - DATA ANALYTICS"],
      ["Personal Branding", "Personal Branding"],
      ["Video Marketing", "Video Marketing"],
    ]);
    const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const getPhoneDigits = (v) => v.replace(/\D/g, "");
    const validatePhone = (v) => {
      const value = v.trim();
      const digits = getPhoneDigits(value);
      return /^\+?[\d\s\-()]+$/.test(value) && digits.length >= 10 && digits.length <= 15;
    };
    const sanitizePhone = (v) => v.replace(/[^\d+\-()\s]/g, "").replace(/(?!^)\+/g, "");
    const getFieldInput = (name) => form.querySelector(`[data-field="${name}"]`);
    const getFieldValue = (name) => getFieldInput(name)?.value.trim() || "";
    const getServiceValues = () => Array.from(form.querySelectorAll('input[name="service"]:checked'))
      .map((input) => input.value.trim())
      .filter(Boolean);
    const VALIDATION_RULES = {
      fullName: { required: true },
      email: { required: true, test: validateEmail },
      phone: { required: true, test: validatePhone },
      service: { required: true },
      message: { required: true, min: 10 },
    };

    form.querySelectorAll("[data-no-autofill]").forEach((input) => {
      const unlock = () => input.removeAttribute("readonly");
      input.addEventListener("focus", unlock, { once: true });
      input.addEventListener("pointerdown", unlock, { once: true });
      input.addEventListener("keydown", unlock, { once: true });
    });

    const getValidationMessage = (name, rules = VALIDATION_RULES[name]) => {
      if (!rules) return "";
      const val = name === "service" ? getServiceValues() : getFieldValue(name);

      if (name === "service" && rules.required && !val.length) {
        return "Select at least one service.";
      }
      if (rules.required && !val) {
        return "This field is required.";
      }
      if (name === "email" && val && !validateEmail(val)) {
        return "Enter a valid email address.";
      }
      if (name === "phone" && val && !validatePhone(val)) {
        return "Enter a valid phone number with 10 to 15 digits.";
      }
      if (rules.min && val.length < rules.min) {
        return `At least ${rules.min} characters.`;
      }

      return "";
    };

    const applyFieldValidation = (name, showError = true) => {
      const input = name === "service" ? form.querySelector('input[name="service"]') : getFieldInput(name);
      const err = form.querySelector(`[data-error="${name}"]`);
      if (!input) return true;

      const msg = getValidationMessage(name);
      const shouldShow = showError && Boolean(msg);
      const validationTarget = name === "service" ? form.querySelector(".contact-service-field") : input;

      validationTarget?.classList.toggle("is-invalid", shouldShow);
      input.setAttribute("aria-invalid", shouldShow ? "true" : "false");
      if (err) err.textContent = showError ? msg : "";

      return !msg;
    };

    ["email", "phone"].forEach((name) => {
      const input = getFieldInput(name);
      if (!input) return;

      input.addEventListener("input", () => {
        if (name === "phone") {
          const nextValue = sanitizePhone(input.value);
          if (input.value !== nextValue) input.value = nextValue;
        }
        if (input.dataset.touched === "true" || input.classList.contains("is-invalid")) {
          applyFieldValidation(name);
        }
      });

      input.addEventListener("blur", () => {
        input.dataset.touched = "true";
        applyFieldValidation(name);
      });
    });

    const appendValue = (payload, key, value) => {
      if (value) payload.append(key, value);
    };

    const normalizeServiceForGoogle = (service) => {
      const normalized = SERVICE_VALUE_MAP.get(service) || service;
      if (GOOGLE_SERVICE_VALUES.has(normalized)) {
        return { value: normalized, other: "" };
      }

      return {
        value: "__other_option__",
        other: normalized === "Other" ? "Other" : normalized,
      };
    };

    const buildGoogleFormPayload = () => {
      const payload = new URLSearchParams();
      const services = getServiceValues().map(normalizeServiceForGoogle);

      appendValue(payload, GOOGLE_FORM_FIELDS.email, getFieldValue("email"));
      appendValue(payload, GOOGLE_FORM_FIELDS.fullName, getFieldValue("fullName"));
      appendValue(payload, GOOGLE_FORM_FIELDS.phone, getFieldValue("phone"));
      appendValue(payload, GOOGLE_FORM_FIELDS.company, getFieldValue("company"));
      appendValue(payload, GOOGLE_FORM_FIELDS.message, getFieldValue("message"));
      services.forEach((service) => {
        payload.append(GOOGLE_FORM_FIELDS.service, service.value);
        if (service.other) payload.append(GOOGLE_FORM_FIELDS.serviceOther, service.other);
      });
      payload.append(GOOGLE_FORM_FIELDS.serviceSentinel, "");
      payload.append("fvv", "1");
      payload.append("partialResponse", `[null,null,"${GOOGLE_FORM_FBZ}"]`);
      payload.append("pageHistory", "0");
      payload.append("fbzx", GOOGLE_FORM_FBZ);
      payload.append("submissionTimestamp", "-1");

      return payload;
    };

    const submitGoogleForm = (payload) => new Promise((resolve, reject) => {
      if (!document.body) {
        reject(new Error("Document is not ready"));
        return;
      }

      const targetName = `google-form-target-${Date.now()}`;
      const iframe = document.createElement("iframe");
      const hiddenForm = document.createElement("form");
      let submitted = false;
      let settled = false;
      let timerId = null;

      const cleanup = () => {
        if (timerId) window.clearTimeout(timerId);
        window.setTimeout(() => {
          hiddenForm.remove();
          iframe.remove();
        }, 250);
      };

      const settle = () => {
        if (settled) return;
        settled = true;
        cleanup();
        resolve();
      };

      const fail = (error) => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(error);
      };

      iframe.name = targetName;
      iframe.title = "Enquiry submission";
      iframe.tabIndex = -1;
      iframe.setAttribute("aria-hidden", "true");
      iframe.style.display = "none";
      iframe.addEventListener("load", () => {
        if (submitted) settle();
      });

      hiddenForm.method = "POST";
      hiddenForm.action = GOOGLE_FORM_ENDPOINT;
      hiddenForm.target = targetName;
      hiddenForm.style.display = "none";

      payload.forEach((value, name) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        hiddenForm.appendChild(input);
      });

      timerId = window.setTimeout(settle, 6000);
      document.body.append(iframe, hiddenForm);
      window.requestAnimationFrame(() => {
        try {
          submitted = true;
          hiddenForm.submit();
        } catch (error) {
          fail(error);
        }
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector(".btn-submit");
      const spinner = btn?.querySelector(".spinner-border");
      const formError = document.getElementById("formError");
      let valid = true;
      formError?.classList.add("d-none");

      Object.keys(VALIDATION_RULES).forEach((name) => {
        const input = name === "service" ? form.querySelector('input[name="service"]') : getFieldInput(name);
        if (input) input.dataset.touched = "true";
        if (!applyFieldValidation(name)) valid = false;
      });

      if (!valid) return;

      btn.disabled = true;
      spinner?.classList.remove("d-none");

      try {
        await submitGoogleForm(buildGoogleFormPayload());
        form.reset();
        form.classList.add("d-none");
        document.getElementById("formSuccess")?.classList.remove("d-none");
      } catch (error) {
        if (formError) {
          formError.textContent = "Unable to submit your enquiry right now. Please try again in a moment.";
          formError.classList.remove("d-none");
        }
      } finally {
        spinner?.classList.add("d-none");
        btn.disabled = false;
      }
    });
  }

  /* ─── Footer glow line ─── */
  const footer = document.querySelector(".site-footer");
  if (footer) {
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          footer.classList.add("is-visible");
          footerObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    footerObserver.observe(footer);
  }

  /* ─── Back to top ─── */
  const backToTop = document.querySelector("[data-back-to-top]");
  if (backToTop) {
    const backToTopThreshold = 400;

    const updateBackToTop = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0
        ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
        : 0;

      backToTop.style.setProperty("--scroll-progress", String(progress));
      backToTop.classList.toggle("is-visible", scrollTop > backToTopThreshold);
    };

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    window.addEventListener("resize", updateBackToTop);
    updateBackToTop();

    backToTop.addEventListener("click", () => {
      const home = document.getElementById("home");
      const behavior = smoothBehavior;

      if (home) {
        home.scrollIntoView({ behavior, block: "start" });
        return;
      }

      window.scrollTo({ top: 0, behavior });
    });
  }

})();

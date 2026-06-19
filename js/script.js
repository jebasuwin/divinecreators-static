/* DIVINECREATORS — Main script */
(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  const path = window.location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
  const isHomePage = path === "/" || path === "/index";

  /* ─── Hash navigation ─── */
  const scrollToHash = (hash, behavior = reducedMotion ? "auto" : "smooth") => {
    const id = (hash || "").replace(/^#/, "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior, block: "start" });
  };

  const getHashFromHref = (href) => {
    if (!href) return "";
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
  if (typeof AOS !== "undefined" && !reducedMotion) {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: reducedMotion,
    });
  }

  /* ─── Render homepage services ─── */
  if (typeof HomeServices !== "undefined") {
    HomeServices.renderHomeServices();
    if (typeof AOS !== "undefined" && !reducedMotion) {
      AOS.refresh();
      window.setTimeout(() => {
        document.querySelectorAll(".services-home [data-aos]:not(.aos-animate)").forEach((el) => {
          el.classList.add("aos-animate");
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }, 2500);
    } else {
      document.querySelectorAll(".services-home [data-aos]").forEach((el) => {
        el.classList.add("aos-animate");
        el.style.opacity = "1";
        el.style.transform = "none";
      });
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

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".brand-logo", { opacity: 0, y: 20, duration: 0.6 })
      .from(".hero__eyebrow", { opacity: 0, y: 16, duration: 0.5 }, "-=0.3")
      .from(".hero__title", { opacity: 0, y: 24, duration: 0.6 }, "-=0.2")
      .from(".hero__subtitle", { opacity: 0, y: 20, duration: 0.55 }, "-=0.25")
      .from(".hero__actions .btn-glow", { opacity: 0, y: 24, scale: 0.92, duration: 0.5 }, "-=0.2")
      .from(".hero__actions .btn-outline-glow", { opacity: 0, y: 24, duration: 0.45 }, "-=0.4")
      .from(".hero-motion-graphic", { opacity: 0, scale: 0.88, duration: 0.7 }, "-=0.5");
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
    const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const validatePhone = (v) => /^[\d\s+\-()]{7,20}$/.test(v);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector(".btn-submit");
      const spinner = btn?.querySelector(".spinner-border");
      let valid = true;

      const fields = {
        fullName: { required: true },
        email: { required: true, test: validateEmail },
        phone: { required: true, test: validatePhone },
        service: { required: true },
        message: { required: true, min: 10 },
      };

      Object.entries(fields).forEach(([name, rules]) => {
        const input = form.elements[name];
        const err = form.querySelector(`[data-error="${name}"]`);
        if (!input) return;
        let msg = "";
        const val = rules.checkbox ? input.checked : input.value.trim();

        if (rules.checkbox) {
          if (!input.checked) msg = "Please agree to be contacted about your enquiry.";
        } else if (rules.required && !val) {
          msg = "This field is required.";
        } else if (name === "email" && val && !validateEmail(val)) {
          msg = "Enter a valid email.";
        } else if (name === "phone" && val && !validatePhone(val)) {
          msg = "Enter a valid phone.";
        } else if (rules.min && val.length < rules.min) {
          msg = `At least ${rules.min} characters.`;
        }

        input.classList.toggle("is-invalid", Boolean(msg));
        if (err) err.textContent = msg;
        if (msg) valid = false;
      });

      if (!valid) return;

      btn.disabled = true;
      spinner?.classList.remove("d-none");

      await new Promise((r) => setTimeout(r, 800));

      spinner?.classList.add("d-none");
      btn.disabled = false;
      form.classList.add("d-none");
      document.getElementById("formSuccess")?.classList.remove("d-none");
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
      const behavior = reducedMotion ? "auto" : "smooth";

      if (home) {
        home.scrollIntoView({ behavior, block: "start" });
        return;
      }

      window.scrollTo({ top: 0, behavior });
    });
  }

})();

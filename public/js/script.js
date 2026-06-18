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
  document.querySelectorAll(".site-nav__link, .mobile-drawer__link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto")) return;
    const linkPath = href.replace(/\.html$/, "").replace(/\/$/, "") || "/";
    if (linkPath === path) link.classList.add("active");
  });

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

  /* ─── GSAP hero timeline ─── */
  const heroTl = () => {
    if (typeof gsap === "undefined" || reducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero__logo", { opacity: 0, y: 20, duration: 0.6 })
      .from(".hero__eyebrow", { opacity: 0, y: 16, duration: 0.5 }, "-=0.3")
      .from(".hero__title", { opacity: 0, y: 24, duration: 0.6 }, "-=0.2")
      .from(".hero__subtitle", { opacity: 0, y: 20, duration: 0.55 }, "-=0.25")
      .from(".hero__actions .btn-glow", { opacity: 0, y: 24, scale: 0.92, duration: 0.5 }, "-=0.2")
      .from(".hero__actions .btn-outline-glow", { opacity: 0, y: 24, duration: 0.45 }, "-=0.4")
      .from(".hero__stats li", { opacity: 0, y: 16, stagger: 0.08, duration: 0.4 }, "-=0.2")
      .from(".hero-motion-graphic", { opacity: 0, scale: 0.88, duration: 0.7 }, "-=0.5");
  };

  /* ─── Typed.js headline ─── */
  const initTyped = () => {
    const el = document.getElementById("typed-headline");
    if (!el || typeof Typed === "undefined" || reducedMotion) {
      if (el) el.textContent = "Digital Growth";
      heroTl();
      return;
    }
    const typed = new Typed("#typed-headline", {
      strings: ["Digital Growth"],
      typeSpeed: 55,
      showCursor: true,
      cursorChar: "|",
      onComplete: () => {
        setTimeout(heroTl, 200);
      },
    });
    return typed;
  };

  if (document.querySelector(".hero")) {
    if (document.getElementById("typed-headline")) {
      initTyped();
    } else {
      heroTl();
    }
  }

  /* ─── Counter animation ─── */
  const animateCounter = (el) => {
    const target = el.dataset.count;
    if (!target) return;
    const match = target.match(/^([\d.]+)(.*)$/);
    if (!match) return;
    const end = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      el.textContent = (end * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

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
        consent: { checkbox: true },
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
  document.querySelector("[data-back-top]")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
})();

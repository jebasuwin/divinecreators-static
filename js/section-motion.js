/**
 * DIVINECREATORS — Homepage section-specific motion (unique per section)
 */
(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const hasGsap = typeof gsap !== "undefined";
  const hasST = typeof ScrollTrigger !== "undefined";

  if (hasGsap && hasST) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ─── ABOUT: Growth chart canvas ─── */
  function initAboutGrowth() {
    const root = document.querySelector(".about-growth-viz");
    const canvas = root?.querySelector(".about-growth-viz__canvas");
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d");
    const points = [
      { x: 0.08, y: 0.78, label: "Start" },
      { x: 0.28, y: 0.62 },
      { x: 0.48, y: 0.48 },
      { x: 0.68, y: 0.32 },
      { x: 0.88, y: 0.18, label: "Growth" },
    ];
    let progress = reduced ? 1 : 0;
    let raf = 0;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(0,212,255,0.06)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 5; i += 1) {
        const y = (h / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const visible = Math.max(1, Math.floor(progress * points.length));
      const pts = points.slice(0, visible).map((p) => ({ x: p.x * w, y: p.y * h }));

      if (pts.length > 1) {
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, "rgba(0,212,255,0.5)");
        grad.addColorStop(1, "rgba(123,47,255,0.5)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();

        ctx.lineTo(pts[pts.length - 1].x, h);
        ctx.lineTo(pts[0].x, h);
        ctx.closePath();
        const fill = ctx.createLinearGradient(0, 0, 0, h);
        fill.addColorStop(0, "rgba(0,212,255,0.12)");
        fill.addColorStop(1, "rgba(0,212,255,0)");
        ctx.fillStyle = fill;
        ctx.fill();
      }

      pts.forEach((p, i) => {
        const pulse = reduced ? 1 : 0.6 + Math.sin(Date.now() * 0.002 + i) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${0.5 + pulse * 0.5})`;
        ctx.fill();
        ctx.strokeStyle = "#00d4ff";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      for (let i = 0; i < pts.length - 1; i += 1) {
        const a = pts[i];
        const b = pts[i + 1];
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        ctx.strokeStyle = "rgba(123,47,255,0.2)";
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(mx + (i % 2 ? 30 : -30), my - 20);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (!reduced && progress < 1) {
        progress = Math.min(1, progress + 0.008);
        raf = requestAnimationFrame(draw);
      } else if (!reduced) {
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    if (hasGsap && hasST && !reduced) {
      ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        onEnter: () => {
          progress = 0;
          cancelAnimationFrame(raf);
          const animate = () => {
            draw();
            if (progress < 1) raf = requestAnimationFrame(animate);
          };
          raf = requestAnimationFrame(animate);
        },
      });
    } else {
      progress = 1;
      draw();
    }
  }

  /* ─── SERVICES: Mouse micro-interactions ─── */
  function initServiceCards() {
    document.querySelectorAll(".service-motion-card").forEach((card) => {
      const pulse = card.querySelector(".service-motion-card__pulse");
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * 100;
        const my = ((e.clientY - rect.top) / rect.height) * 100;
        if (pulse) {
          pulse.style.setProperty("--mx", `${mx}%`);
          pulse.style.setProperty("--my", `${my}%`);
        }
        if (!reduced && hasGsap) {
          const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
          const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
          gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.4, ease: "power2.out", transformPerspective: 600 });
        }
      });
      card.addEventListener("mouseleave", () => {
        if (hasGsap) gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
      });
    });
  }

  /* ─── PORTFOLIO: Spotlight + pipeline ─── */
  function initProjectCards() {
    document.querySelectorAll(".project-card--motion").forEach((card) => {
      const spot = card.querySelector(".project-card__spotlight");
      card.addEventListener("mousemove", (e) => {
        if (!spot) return;
        const rect = card.getBoundingClientRect();
        spot.style.setProperty("--sx", `${e.clientX - rect.left}px`);
        spot.style.setProperty("--sy", `${e.clientY - rect.top}px`);
      });
    });
  }

  function initSolutionsPipeline() {
    const section = document.querySelector(".section-solutions-motion");
    const pipeline = section?.querySelector(".solutions-pipeline");
    if (!pipeline || mobile) return;

    pipeline.innerHTML = `
      <svg class="solutions-pipeline__svg" viewBox="0 0 1000 48" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="pipelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#00d4ff"/>
            <stop offset="100%" stop-color="#7b2fff"/>
          </linearGradient>
        </defs>
        <path class="solutions-pipeline__line" d="M 50 24 L 250 24 L 350 24 L 500 24 L 650 24 L 750 24 L 950 24"/>
        <path class="solutions-pipeline__flow" d="M 50 24 L 250 24 L 350 24 L 500 24 L 650 24 L 750 24 L 950 24"/>
      </svg>
    `;
  }

  /* ─── PROCESS: Scroll roadmap ─── */
  function initProcessRoadmap() {
    const section = document.querySelector(".section-process-motion");
    const progress = section?.querySelector(".process-roadmap__progress");
    const steps = section?.querySelectorAll(".timeline__step");
    if (!section || !progress || !steps?.length) return;

    steps.forEach((step) => step.classList.add("is-active"));

    if (!hasGsap || !hasST || reduced) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 40%",
      scrub: 0.6,
      onUpdate: (self) => {
        progress.style.width = `${self.progress * 100}%`;
        const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
        steps.forEach((s, i) => s.classList.toggle("is-active", i <= idx));
      },
    });
  }

  /* ─── TESTIMONIALS: Particles + GSAP slides ─── */
  function initTestimonials() {
    const wrap = document.querySelector(".testimonial-motion-wrap");
    if (!wrap) return;

    const particles = wrap.querySelector(".testimonial-motion-wrap__particles");
    if (particles && !reduced) {
      for (let i = 0; i < (mobile ? 6 : 12); i += 1) {
        const p = document.createElement("span");
        p.className = "testimonial-quote-particle";
        p.textContent = "\u201C";
        p.style.left = `${Math.random() * 100}%`;
        p.style.animationDuration = `${10 + Math.random() * 8}s`;
        p.style.animationDelay = `${Math.random() * 5}s`;
        particles.appendChild(p);
      }
    }

    const slides = wrap.querySelectorAll(".testimonial-slide");
    const prevBtn = document.querySelector("[data-testimonial-prev]");
    const nextBtn = document.querySelector("[data-testimonial-next]");
    let index = 0;

    const show = (i) => {
      if (!slides.length) return;
      index = (i + slides.length) % slides.length;
      slides.forEach((s, idx) => {
        const active = idx === index;
        s.classList.toggle("is-active", active);
        if (hasGsap && !reduced && active) {
          gsap.fromTo(s, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.55, ease: "power2.out" });
        }
      });
    };

    if (slides.length) {
      slides.forEach((s, i) => s.classList.toggle("is-active", i === 0));
      prevBtn?.addEventListener("click", () => show(index - 1));
      nextBtn?.addEventListener("click", () => show(index + 1));
    }
  }

  /* ─── CONTACT CTA: Map canvas ─── */
  function initContactMap() {
    const root = document.querySelector(".contact-map-viz");
    const canvas = root?.querySelector("canvas");
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d");
    let raf = 0;

    const hubs = [
      { x: 0.22, y: 0.35 },
      { x: 0.48, y: 0.42 },
      { x: 0.72, y: 0.38 },
      { x: 0.58, y: 0.62 },
    ];
    const chennai = { x: 0.62, y: 0.55 };

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "rgba(0,212,255,0.04)";
      hubs.forEach((hub) => {
        ctx.beginPath();
        ctx.arc(hub.x * w, hub.y * h, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      const cx = chennai.x * w;
      const cy = chennai.y * h;
      const t = Date.now() / 1000;
      const pulse = reduced ? 1 : 0.5 + Math.sin(t * 2) * 0.5;

      hubs.forEach((hub) => {
        ctx.strokeStyle = `rgba(0,212,255,${0.08 + pulse * 0.1})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(hub.x * w, hub.y * h);
        ctx.lineTo(cx, cy);
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.arc(cx, cy, 8 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,212,255,${0.4 + pulse * 0.4})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#00d4ff";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    draw();
  }

  function init() {
    initAboutGrowth();
    initServiceCards();
    initSolutionsPipeline();
    initProjectCards();
    initProcessRoadmap();
    initTestimonials();
    initContactMap();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.SectionMotion = { init };
})();

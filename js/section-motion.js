/**
 * DIVINECREATORS — Homepage section-specific motion (unique per section)
 */
(function () {
  "use strict";

  const reduced = false;
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const hasGsap = typeof gsap !== "undefined";
  const hasST = typeof ScrollTrigger !== "undefined";

  if (hasGsap && hasST) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ─── ABOUT: Growth chart canvas ─── */
  function isAboutLightTheme() {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") return true;
    if (theme === "dark") return false;
    return false;
  }

  function getAboutChartTheme() {
    if (isAboutLightTheme()) {
      return {
        grid: "rgba(0, 0, 0, 0.08)",
        line: "rgba(0, 0, 0, 0.78)",
        lineGlow: "rgba(0, 0, 0, 0.2)",
        fillTop: "rgba(0, 0, 0, 0.1)",
        fillBottom: "rgba(0, 0, 0, 0)",
        nodeFill: "rgba(0, 0, 0, 0.88)",
        nodeStroke: "rgba(0, 0, 0, 0.95)",
        connector: "rgba(0, 0, 0, 0.22)",
        label: "rgba(0, 0, 0, 0.72)",
      };
    }

    return {
      grid: "rgba(255, 255, 255, 0.12)",
      line: "#ffffff",
      lineGlow: "rgba(255, 255, 255, 0.55)",
      fillTop: "rgba(255, 255, 255, 0.18)",
      fillBottom: "rgba(255, 255, 255, 0)",
      nodeFill: "rgba(255, 255, 255, 0.95)",
      nodeStroke: "#ffffff",
      connector: "rgba(255, 255, 255, 0.35)",
      label: "rgba(255, 255, 255, 0.72)",
    };
  }

  function initAboutGrowth() {
    const root = document.querySelector(".about-dashboard-viz");
    const canvas = root?.querySelector(".about-dashboard-viz__canvas");
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    const points = [
      { x: 0.1, y: 0.74, label: "Position", labelDx: 14, labelDy: -22 },
      { x: 0.3, y: 0.61, label: "Content", labelDx: 12, labelDy: 23 },
      { x: 0.5, y: 0.47, label: "Trust", labelDx: 14, labelDy: -24 },
      { x: 0.68, y: 0.34, label: "Leads", labelDx: 12, labelDy: 24 },
      { x: 0.84, y: 0.21, label: "Growth", labelDx: -8, labelDy: 30, labelAlign: "right" },
    ];
    const duration = mobile ? 950 : 1350;
    const repeatDelay = mobile ? 3400 : 3800;
    let progress = 0;
    let raf = 0;
    let repeatTimer = 0;
    let resizeRaf = 0;
    let sizeRetryTimer = 0;
    let startTime = 0;
    let completed = false;
    let visible = false;
    let sizeReady = false;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      const minReadyHeight = mobile ? 240 : 260;

      if (width < 220 || height < minReadyHeight) {
        sizeReady = false;
        window.clearTimeout(sizeRetryTimer);
        sizeRetryTimer = window.setTimeout(scheduleResize, 90);
        return false;
      }

      const dpr = Math.min(devicePixelRatio || 1, mobile ? 1.25 : 1.5);
      const nextWidth = Math.round(width * dpr);
      const nextHeight = Math.round(height * dpr);

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }

      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeReady = true;
      draw(performance.now());
      return true;
    };

    const scheduleResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        const ready = resize();
        if (ready && visible && !raf && !document.hidden && !completed) {
          start();
        }
      });
    };

    const getVisiblePoints = (scaledPoints, eased) => {
      const maxSegment = scaledPoints.length - 1;
      const position = eased * maxSegment;
      const fullSegments = Math.floor(position);
      const segmentProgress = position - fullSegments;
      const visiblePoints = [scaledPoints[0]];

      for (let i = 1; i <= fullSegments && i < scaledPoints.length; i += 1) {
        visiblePoints.push(scaledPoints[i]);
      }

      if (fullSegments < maxSegment) {
        const a = scaledPoints[fullSegments];
        const b = scaledPoints[fullSegments + 1];
        visiblePoints.push({
          x: a.x + (b.x - a.x) * segmentProgress,
          y: a.y + (b.y - a.y) * segmentProgress,
        });
      }

      return visiblePoints;
    };

    function drawLabels(scaledPoints, eased, theme, w) {
      const segmentCount = Math.max(points.length - 1, 1);
      const labelSize = Math.max(10, Math.min(12, w * 0.026));
      ctx.font = `700 ${labelSize}px Manrope, system-ui, sans-serif`;
      ctx.textBaseline = "middle";

      scaledPoints.forEach((point, index) => {
        const meta = points[index];
        if (!meta.label) return;

        const pointProgress = index === 0 ? 1 : clamp((eased - (index - 0.35) / segmentCount) * segmentCount, 0, 1);
        if (pointProgress <= 0.05) return;

        const label = meta.label;
        const metrics = ctx.measureText(label);
        let x = point.x + (meta.labelDx ?? 10);
        let y = point.y + (meta.labelDy ?? -18);

        if (meta.labelAlign === "right") x = point.x - metrics.width + (meta.labelDx ?? -10);

        if (x + metrics.width > w - 14) x = point.x - metrics.width - 12;
        if (y < 18) y = point.y + 22;

        ctx.save();
        ctx.globalAlpha = 0.25 + pointProgress * 0.65;
        ctx.shadowColor = "rgba(0, 0, 0, 0.48)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
        if (typeof ctx.roundRect === "function") {
          ctx.beginPath();
          ctx.roundRect(x - 7, y - labelSize * 0.8, metrics.width + 14, labelSize * 1.55, 999);
          ctx.fill();
        }
        ctx.fillStyle = theme.label;
        ctx.fillText(label, x, y);
        ctx.restore();
      });
    }

    function draw(t = performance.now()) {
      const theme = getAboutChartTheme();
      const w = root.clientWidth;
      const h = root.clientHeight;
      if (!w || !h) return;

      const eased = easeOutCubic(progress);
      const scaledPoints = points.map((p) => ({ x: p.x * w, y: p.y * h }));
      const visiblePoints = getVisiblePoints(scaledPoints, eased);

      ctx.clearRect(0, 0, w, h);
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";

      ctx.strokeStyle = theme.grid;
      ctx.lineWidth = 1;
      for (let i = 1; i < 5; i += 1) {
        const y = (h / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(255, 255, 255, 0.045)";
      for (let i = 1; i < 4; i += 1) {
        const x = (w / 4) * i;
        ctx.beginPath();
        ctx.moveTo(x, h * 0.16);
        ctx.lineTo(x, h * 0.86);
        ctx.stroke();
      }

      if (visiblePoints.length > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(visiblePoints[0].x, visiblePoints[0].y);
        visiblePoints.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.lineTo(visiblePoints[visiblePoints.length - 1].x, h);
        ctx.lineTo(visiblePoints[0].x, h);
        ctx.closePath();
        const fill = ctx.createLinearGradient(0, h * 0.1, 0, h);
        fill.addColorStop(0, theme.fillTop);
        fill.addColorStop(1, theme.fillBottom);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = theme.line;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = theme.lineGlow;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(visiblePoints[0].x, visiblePoints[0].y);
        visiblePoints.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.stroke();
        ctx.restore();
      }

      scaledPoints.forEach((p, i) => {
        const segmentCount = Math.max(points.length - 1, 1);
        const pointProgress = i === 0 ? 1 : clamp((eased - (i - 0.2) / segmentCount) * segmentCount, 0, 1);
        if (pointProgress <= 0) return;
        const pulse = completed ? 0 : Math.sin(t * 0.004 + i) * 0.5 + 0.5;

        ctx.save();
        ctx.globalAlpha = pointProgress;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5.5 + pulse * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = theme.nodeFill;
        ctx.fill();
        ctx.strokeStyle = theme.nodeStroke;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      });

      for (let i = 0; i < scaledPoints.length - 1; i += 1) {
        const connectorProgress = clamp((eased - i / (scaledPoints.length - 1)) * 3, 0, 1);
        if (connectorProgress <= 0) continue;
        const a = scaledPoints[i];
        const b = scaledPoints[i + 1];
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        ctx.save();
        ctx.globalAlpha = connectorProgress * 0.75;
        ctx.strokeStyle = theme.connector;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(mx + (i % 2 ? 30 : -30), my - 20);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      drawLabels(scaledPoints, eased, theme, w);
    }

    const animate = (t) => {
      if (!startTime) startTime = t;
      progress = clamp((t - startTime) / duration, 0, 1);
      draw(t);

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        completed = true;
        raf = 0;
        draw(t);
        if (visible && !document.hidden) {
          repeatTimer = window.setTimeout(start, repeatDelay);
        }
      }
    };

    const start = () => {
      if (!visible || document.hidden) return;
      if (!sizeReady && !resize()) return;
      window.clearTimeout(repeatTimer);
      cancelAnimationFrame(raf);
      completed = false;
      progress = 0;
      startTime = 0;
      raf = requestAnimationFrame(animate);
    };

    const stop = () => {
      window.clearTimeout(repeatTimer);
      repeatTimer = 0;
      window.clearTimeout(sizeRetryTimer);
      sizeRetryTimer = 0;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(scheduleResize);
      resizeObserver.observe(root);
    }
    window.addEventListener("resize", scheduleResize, { passive: true });
    window.addEventListener("load", scheduleResize, { once: true, passive: true });
    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleResize).catch(() => {});
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stop();
      } else if (visible) {
        start();
      }
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) start();
          else stop();
        },
        { rootMargin: "0px 0px -18% 0px", threshold: 0.2 }
      );
      observer.observe(root);
    } else {
      visible = true;
      start();
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
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0.55)"/>
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

  function init() {
    initAboutGrowth();
    initServiceCards();
    initSolutionsPipeline();
    initProjectCards();
    initProcessRoadmap();
    initTestimonials();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.SectionMotion = { init };
})();

/**
 * DIVINECREATORS — Section motion graphics initializer
 */
(function () {
  "use strict";

  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const motionLite = window.matchMedia("(prefers-reduced-motion: reduce)").matches || mobile;
  const reduced = false;
  const circuitLoops = new Map();

  const BLOB_PATHS = [
  "M200,80 C280,60 350,130 370,200 C390,270 340,350 260,370 C180,390 100,340 80,260 C60,180 120,100 200,80Z",
  "M200,60 C300,50 380,150 360,230 C340,310 250,380 170,360 C90,340 40,240 70,160 C100,80 160,70 200,60Z",
  "M200,90 C260,50 360,100 380,190 C400,280 330,370 240,380 C150,390 70,310 60,220 C50,130 140,130 200,90Z",
  ];

  const CIRCUIT_LAYOUTS = [
    {
      lines: [
        { x1: 0, y1: 0.2, x2: 0.4, y2: 0.2 },
        { x1: 0.4, y1: 0.2, x2: 0.4, y2: 0.6 },
        { x1: 0.4, y1: 0.6, x2: 1, y2: 0.6 },
        { x1: 0, y1: 0.7, x2: 0.6, y2: 0.7 },
        { x1: 0.6, y1: 0.7, x2: 0.6, y2: 0.3 },
        { x1: 0.6, y1: 0.3, x2: 1, y2: 0.3 },
        { x1: 0.2, y1: 0, x2: 0.2, y2: 0.5 },
        { x1: 0.8, y1: 0, x2: 0.8, y2: 0.6 },
      ],
      nodes: [
        { x: 0.4, y: 0.2 }, { x: 0.4, y: 0.6 }, { x: 0.6, y: 0.7 },
        { x: 0.6, y: 0.3 }, { x: 0.2, y: 0.5 }, { x: 0.8, y: 0.6 },
      ],
    },
    {
      lines: [
        { x1: 0.1, y1: 0.15, x2: 0.5, y2: 0.15 },
        { x1: 0.5, y1: 0.15, x2: 0.5, y2: 0.55 },
        { x1: 0.5, y1: 0.55, x2: 0.9, y2: 0.55 },
        { x1: 0.1, y1: 0.85, x2: 0.35, y2: 0.85 },
        { x1: 0.35, y1: 0.85, x2: 0.35, y2: 0.4 },
        { x1: 0.35, y1: 0.4, x2: 0.75, y2: 0.4 },
      ],
      nodes: [
        { x: 0.5, y: 0.15 }, { x: 0.5, y: 0.55 }, { x: 0.35, y: 0.85 },
        { x: 0.35, y: 0.4 }, { x: 0.75, y: 0.4 },
      ],
    },
    {
      lines: [
        { x1: 0, y1: 0.5, x2: 0.3, y2: 0.5 },
        { x1: 0.3, y1: 0.5, x2: 0.3, y2: 0.2 },
        { x1: 0.3, y1: 0.2, x2: 0.7, y2: 0.2 },
        { x1: 0.7, y1: 0.2, x2: 0.7, y2: 0.8 },
        { x1: 0.7, y1: 0.8, x2: 1, y2: 0.8 },
        { x1: 0.5, y1: 0.5, x2: 0.9, y2: 0.5 },
      ],
      nodes: [
        { x: 0.3, y: 0.5 }, { x: 0.3, y: 0.2 }, { x: 0.7, y: 0.2 },
        { x: 0.7, y: 0.8 }, { x: 0.5, y: 0.5 },
      ],
    },
    {
      lines: [
        { x1: 0.15, y1: 0.3, x2: 0.85, y2: 0.3 },
        { x1: 0.15, y1: 0.7, x2: 0.85, y2: 0.7 },
        { x1: 0.5, y1: 0.1, x2: 0.5, y2: 0.9 },
        { x1: 0.25, y1: 0.3, x2: 0.25, y2: 0.7 },
        { x1: 0.75, y1: 0.3, x2: 0.75, y2: 0.7 },
      ],
      nodes: [
        { x: 0.25, y: 0.3 }, { x: 0.75, y: 0.3 }, { x: 0.25, y: 0.7 },
        { x: 0.75, y: 0.7 }, { x: 0.5, y: 0.5 },
      ],
    },
    {
      lines: [
        { x1: 0, y1: 0.35, x2: 0.45, y2: 0.35 },
        { x1: 0.45, y1: 0.35, x2: 0.45, y2: 0.75 },
        { x1: 0.45, y1: 0.75, x2: 0.2, y2: 0.75 },
        { x1: 0.55, y1: 0.25, x2: 1, y2: 0.25 },
        { x1: 0.55, y1: 0.25, x2: 0.55, y2: 0.65 },
        { x1: 0.55, y1: 0.65, x2: 0.85, y2: 0.65 },
      ],
      nodes: [
        { x: 0.45, y: 0.35 }, { x: 0.45, y: 0.75 }, { x: 0.55, y: 0.25 },
        { x: 0.55, y: 0.65 }, { x: 0.2, y: 0.75 },
      ],
    },
  ];

  function uid(prefix) {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
  }

  /* ─── Hero particle galaxy canvas ─── */
  function initHeroGalaxyCanvas(canvas) {
    if (!canvas) return () => {};
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    let active = true;
    let visible = true;
    const count = motionLite ? 14 : 36;
    const nodes = [];

    const resize = () => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0 && count > 0) {
        for (let i = 0; i < count; i += 1) {
          nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * (motionLite ? 0.18 : 0.3),
            vy: (Math.random() - 0.5) * (motionLite ? 0.18 : 0.3),
            r: 1 + Math.random() * 2,
          });
        }
      }
    };

    const schedule = () => {
      if (!running || !active || raf) return;
      raf = requestAnimationFrame(draw);
    };

    const draw = (t) => {
      raf = 0;
      if (!running || !active) return;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      if (!reduced && count > 0) {
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        });

        for (let i = 0; i < nodes.length; i += 1) {
          for (let j = i + 1; j < nodes.length; j += 1) {
            const a = nodes[i];
            const b = nodes[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist > 100) continue;
            const alpha = (1 - dist / 100) * 0.2;
            ctx.strokeStyle = `rgba(255, 255, 255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        nodes.forEach((n, i) => {
          const pulse = 0.5 + Math.sin(t * 0.003 + i) * 0.5;
          ctx.fillStyle = `rgba(255, 255, 255,${0.5 + pulse * 0.5})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.35);
      glow.addColorStop(0, "rgba(255, 255, 255,0.08)");
      glow.addColorStop(1, "rgba(0, 0, 0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.35, 0, Math.PI * 2);
      ctx.fill();

      schedule();
    };

    const updateActive = () => {
      active = visible && !document.hidden;
      if (active) {
        schedule();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", updateActive);
    const visibilityObserver = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver((entries) => {
          visible = entries.some((entry) => entry.isIntersecting);
          updateActive();
        }, { rootMargin: "20% 0px 20% 0px", threshold: 0 })
      : null;
    visibilityObserver?.observe(parent || canvas);
    schedule();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", updateActive);
      visibilityObserver?.disconnect();
    };
  }

  function createHeroParticles(container) {
    if (!container || reduced) return;
    const field = container.querySelector(".particle-field");
    if (!field) return;
    const total = motionLite ? 8 : 22;
    for (let i = 0; i < total; i += 1) {
      const dot = document.createElement("div");
      dot.className = "floating-dot";
      const size = Math.random() * 4 + 1;
      dot.style.cssText = `
        width:${size}px;height:${size}px;
        left:${Math.random() * 100}%;
        bottom:${Math.random() * 20}%;
        animation-duration:${Math.random() * 4 + 3}s;
        animation-delay:${Math.random() * 3}s;
        opacity:${Math.random() * 0.7 + 0.3};
        box-shadow:0 0 6px #FFFFFF;
      `;
      field.appendChild(dot);
    }
  }

  function mountHeroGalaxy(container) {
    if (!container || container.dataset.mounted) return;
    container.dataset.mounted = "1";
    container.innerHTML = `
      <canvas id="heroCanvas"></canvas>
      <div class="ring ring-1"></div>
      <div class="ring ring-2"></div>
      <div class="ring ring-3"></div>
      <div class="hero-orb">
        <div class="orb-core"></div>
        <div class="orb-pulse"></div>
        <div class="orb-pulse delay-1"></div>
      </div>
      <div class="particle-field" id="heroParticles"></div>
      <div class="hero-glitch" aria-hidden="true"></div>
    `;
    createHeroParticles(container);
    const canvas = container.querySelector("#heroCanvas") || container.querySelector("canvas");
    initHeroGalaxyCanvas(canvas);
  }

  /* ─── Blob morphing ─── */
  function mountBlobGraphic(container) {
    if (!container || container.dataset.mounted) return;
    container.dataset.mounted = "1";
    const variant = parseInt(container.dataset.blobVariant || "0", 10) % 4;
    const gradId = uid("blobGrad");
    const filterId = uid("blobGlow");
    const pathId = uid("blobPath");

    container.innerHTML = `
      <svg class="morphing-blob" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.6"/>
            <stop offset="100%" style="stop-color:rgba(255,255,255,0.55);stop-opacity:0.6"/>
          </linearGradient>
          <filter id="${filterId}">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path id="${pathId}" fill="url(#${gradId})" filter="url(#${filterId})"/>
      </svg>
      <div class="geo-shape triangle"></div>
      <div class="geo-shape square"></div>
      <div class="geo-shape circle-outline"></div>
      <div class="geo-shape diamond"></div>
      <svg class="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line class="conn-line" x1="20" y1="20" x2="80" y2="50" />
        <line class="conn-line" x1="80" y1="50" x2="50" y2="80" />
        <line class="conn-line" x1="50" y1="80" x2="20" y2="20" />
        <circle class="conn-dot" cx="20" cy="20" r="4"/>
        <circle class="conn-dot" cx="80" cy="50" r="4"/>
        <circle class="conn-dot" cx="50" cy="80" r="4"/>
      </svg>
    `;

    const path = container.querySelector(`#${pathId}`);
    if (!path) return;

    path.setAttribute("d", BLOB_PATHS[0]);

    if (reduced) return;

    let current = variant % BLOB_PATHS.length;

    if (typeof gsap !== "undefined") {
      const morph = () => {
        current = (current + 1) % BLOB_PATHS.length;
        gsap.to(path, {
          attr: { d: BLOB_PATHS[current] },
          duration: 2,
          ease: "power2.inOut",
          onComplete: () => setTimeout(morph, 1200),
        });
      };
      setTimeout(morph, 2000 + variant * 400);
    } else {
      setInterval(() => {
        current = (current + 1) % BLOB_PATHS.length;
        path.setAttribute("d", BLOB_PATHS[current]);
      }, 3000);
    }
  }

  /* ─── Circuit board ─── */
  function drawCircuitLoop(canvas, layoutIndex, key) {
    const ctx = canvas.getContext("2d");
    const layout = CIRCUIT_LAYOUTS[layoutIndex % CIRCUIT_LAYOUTS.length];
    let running = true;
    let active = true;
    let visible = true;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const schedule = () => {
      if (!running || !active || raf) return;
      raf = requestAnimationFrame(draw);
    };

    const draw = () => {
      raf = 0;
      if (!running || !active) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255, 255, 255,0.25)";
      ctx.lineWidth = 1.5;
      layout.lines.forEach((l) => {
        ctx.beginPath();
        ctx.moveTo(l.x1 * w, l.y1 * h);
        ctx.lineTo(l.x2 * w, l.y2 * h);
        ctx.stroke();
      });

      const time = Date.now() / 1000;
      layout.nodes.forEach((n, i) => {
        const pulse = reduced ? 0.5 : Math.sin(time * 2 + i + layoutIndex) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255,${0.4 + pulse * 0.6})`;
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, 10 + pulse * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255,${0.2 * pulse})`;
        ctx.stroke();
      });

      if (!reduced) {
        const gridGap = 32;
        const off = (time * 12) % gridGap;
        ctx.strokeStyle = "rgba(255, 255, 255,0.04)";
        ctx.lineWidth = 1;
        for (let x = -gridGap + off; x < w + gridGap; x += gridGap) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = -gridGap + off * 0.5; y < h + gridGap; y += gridGap) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }

      schedule();
    };

    const updateActive = () => {
      active = visible && !document.hidden;
      if (active) {
        schedule();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    resize();
    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(resize)
      : null;
    ro?.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", updateActive);
    const visibilityObserver = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver((entries) => {
          visible = entries.some((entry) => entry.isIntersecting);
          updateActive();
        }, { rootMargin: "20% 0px 20% 0px", threshold: 0 })
      : null;
    visibilityObserver?.observe(canvas);
    schedule();

    circuitLoops.set(key, () => {
      running = false;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", updateActive);
      visibilityObserver?.disconnect();
    });
  }

  function mountCircuitGraphic(container) {
    if (!container || container.dataset.mounted) return;
    container.dataset.mounted = "1";
    const variant = parseInt(container.dataset.circuitVariant || "0", 10);
    const canvasId = uid("circuitCanvas");

    container.innerHTML = `
      <canvas id="${canvasId}"></canvas>
      <div class="circuit-overlay">
        <div class="data-packet p1"></div>
        <div class="data-packet p2"></div>
        <div class="data-packet p3"></div>
      </div>
    `;

    const canvas = container.querySelector(`#${canvasId}`);
    if (canvas) drawCircuitLoop(canvas, variant, canvasId);
  }

  function mountAurora(container) {
    if (!container || container.dataset.mounted) return;
    container.dataset.mounted = "1";
    container.innerHTML = `
      <div class="aurora-wave w1"></div>
      <div class="aurora-wave w2"></div>
      <div class="aurora-wave w3"></div>
      <div class="aurora-grid"></div>
    `;
  }

  function initAll() {
    document.querySelectorAll(".hero-motion-graphic[data-auto-mount], .hero-motion-graphic:not([data-mounted])").forEach((el) => {
      if (!el.dataset.mounted && (el.dataset.autoMount !== undefined || el.classList.contains("hero-motion-graphic"))) {
        mountHeroGalaxy(el);
      }
    });

    document.querySelectorAll(".blob-motion-graphic[data-auto-mount]").forEach(mountBlobGraphic);
    document.querySelectorAll(".circuit-motion-graphic[data-auto-mount]").forEach(mountCircuitGraphic);
    document.querySelectorAll(".aurora-motion-graphic[data-auto-mount]").forEach(mountAurora);

    document.querySelectorAll(".hero-motion-graphic").forEach((el) => {
      if (!el.dataset.mounted) mountHeroGalaxy(el);
    });
    document.querySelectorAll(".blob-motion-graphic").forEach((el) => {
      if (!el.dataset.mounted) mountBlobGraphic(el);
    });
    document.querySelectorAll(".circuit-motion-graphic").forEach((el) => {
      if (!el.dataset.mounted) mountCircuitGraphic(el);
    });
    document.querySelectorAll(".aurora-motion-graphic").forEach((el) => {
      if (!el.dataset.mounted) mountAurora(el);
    });
  }

  window.MotionGraphics = {
    init: initAll,
    mountHeroGalaxy,
    mountBlobGraphic,
    mountCircuitGraphic,
    mountAurora,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();

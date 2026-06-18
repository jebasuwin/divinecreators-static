/**
 * DIVINECREATORS — Cinematic service motion artwork (canvas-only scenes)
 */
(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const hasGsap = typeof gsap !== "undefined";
  const hasST = typeof ScrollTrigger !== "undefined";
  if (hasGsap && hasST) gsap.registerPlugin(ScrollTrigger);

  const mouse = new WeakMap();
  const loops = new Map();

  const SCENES = {
    seo: mountSeo,
    social: mountSocial,
    "paid-ads": mountPaidAds,
    content: mountContent,
    webdev: mountWebdev,
    email: mountEmail,
    leads: mountLeads,
    analytics: mountAnalytics,
    youtube: mountYoutube,
  };

  const CYAN = "#00d4ff";
  const VIOLET = "#7b2fff";
  const PINK = "#ff4fd8";

  /* ─── Scene shell (canvas-only, no UI widgets) ─── */
  function createCinematicScene(el, id) {
    el.classList.add("service-scene", `service-scene--${id}`);
    el.innerHTML = `
      <div class="service-scene__viewport">
        <canvas class="service-scene__canvas-bg"></canvas>
        <canvas class="service-scene__canvas-mid"></canvas>
        <div class="service-scene__fog"></div>
        <div class="service-scene__beam"></div>
        <canvas class="service-scene__canvas-fx"></canvas>
        <div class="service-scene__sweep"></div>
        <div class="service-scene__sweep service-scene__sweep--2"></div>
        <div class="service-scene__vignette"></div>
      </div>
    `;
    const root = el;
    const bg = el.querySelector(".service-scene__canvas-bg");
    const mid = el.querySelector(".service-scene__canvas-mid");
    const fx = el.querySelector(".service-scene__canvas-fx");
    bindParallax(root);
    bindScrollEntrance(root);
    return { root, bg, mid, fx };
  }

  function bindParallax(root) {
    mouse.set(root, { x: 0.5, y: 0.5 });
    if (reduced) return;
    root.addEventListener("mousemove", (e) => {
      const r = root.getBoundingClientRect();
      mouse.set(root, {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
      const m = mouse.get(root);
      root.style.setProperty("--scene-tilt-x", `${(m.y - 0.5) * -12}deg`);
      root.style.setProperty("--scene-tilt-y", `${(m.x - 0.5) * 14}deg`);
    });
    root.addEventListener("mouseleave", () => {
      root.style.setProperty("--scene-tilt-x", "0deg");
      root.style.setProperty("--scene-tilt-y", "0deg");
    });
  }

  function bindScrollEntrance(root) {
    if (!hasGsap || reduced) return;
    gsap.fromTo(root, { opacity: 0.5, scale: 0.94 }, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 88%", toggleActions: "play none none reverse" },
    });
  }

  function resizeCanvas(canvas, root) {
    const r = root.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, mobile ? 1.5 : 2);
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w: r.width, h: r.height, ctx };
  }

  function startLoop(key, fn) {
    if (reduced) { fn(0); return; }
    let on = true;
    const tick = (t) => {
      if (!on) return;
      if (!document.hidden) fn(t);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    loops.set(key, () => { on = false; });
  }

  function mountCanvasScene(el, id, init, render) {
    const { root, bg, mid, fx } = createCinematicScene(el, id);
    const state = init();
    const bgCtx = bg.getContext("2d");
    const midCtx = mid.getContext("2d");
    const fxCtx = fx.getContext("2d");
    startLoop(`${id}-${el}`, (t) => {
      const { w, h } = resizeCanvas(bg, root);
      resizeCanvas(mid, root);
      resizeCanvas(fx, root);
      const m = mouse.get(root) || { x: 0.5, y: 0.5 };
      bgCtx.clearRect(0, 0, w, h);
      midCtx.clearRect(0, 0, w, h);
      fxCtx.clearRect(0, 0, w, h);
      render(state, { bg: bgCtx, mid: midCtx, fx: fxCtx }, w, h, t, m);
    });
  }

  /* ─── Shared render utilities ─── */
  function drawCosmos(ctx, w, h, t, m, hue) {
    const g = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.5, w * 0.85);
    g.addColorStop(0, hue === "red" ? "#1a0810" : "#0a1428");
    g.addColorStop(0.5, "#060c18");
    g.addColorStop(1, "#020408");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    const count = mobile ? 60 : 140;
    for (let i = 0; i < count; i += 1) {
      const s = i * 97.3;
      const depth = (s % 3) + 1;
      const px = ((s * 0.013 + m.x * 0.04 * depth) % 1) * w;
      const py = ((s * 0.017 + m.y * 0.03 * depth + t * 0.000008 * depth) % 1) * h;
      const tw = 0.25 + Math.sin(t * 0.004 + s) * 0.25;
      ctx.fillStyle = `rgba(255,255,255,${0.15 + tw * 0.5})`;
      ctx.beginPath();
      ctx.arc(px, py, 0.4 + depth * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawNebula(ctx, w, h, cx, cy, r, c1, c2, t) {
    const pulse = 0.85 + Math.sin(t * 0.001) * 0.15;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * pulse);
    g.addColorStop(0, c1);
    g.addColorStop(0.45, c2);
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  function drawGlowRect(ctx, x, y, rw, rh, rad, color, alpha, blur) {
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.fillStyle = color.replace(")", `,${alpha})`).replace("rgb", "rgba").replace("#", "");
    if (color.startsWith("#")) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
    }
    roundRect(ctx, x, y, rw, rh, rad);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.35})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  function roundRect(ctx, x, y, rw, rh, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + rw - r, y);
    ctx.quadraticCurveTo(x + rw, y, x + rw, y + r);
    ctx.lineTo(x + rw, y + rh - r);
    ctx.quadraticCurveTo(x + rw, y + rh, x + rw - r, y + rh);
    ctx.lineTo(x + r, y + rh);
    ctx.quadraticCurveTo(x, y + rh, x, y + rh - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function drawOrb(ctx, x, y, r, color, alpha, glow) {
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = glow;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(255,255,255,${alpha})`);
    g.addColorStop(0.35, color.replace("1)", `${alpha})`));
    if (color.startsWith("#")) {
      const cr = parseInt(color.slice(1, 3), 16);
      const cg = parseInt(color.slice(3, 5), 16);
      const cb = parseInt(color.slice(5, 7), 16);
      g.addColorStop(0.35, `rgba(${cr},${cg},${cb},${alpha})`);
      g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
    }
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawStream(ctx, w, h, t, paths, color) {
    paths.forEach((p, i) => {
      const prog = ((t * p.speed + p.offset) % 1);
      const x = p.x0 + (p.x1 - p.x0) * prog;
      const y = p.y0 + (p.y1 - p.y0) * prog + Math.sin(prog * Math.PI * 4 + t * 0.003) * p.wave;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      if (!reduced && i % 3 === 0) {
        ctx.strokeStyle = color.replace("0.9", "0.15").replace("0.8", "0.12");
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x0, p.y0);
        for (let s = 0; s <= 1; s += 0.08) {
          const sx = p.x0 + (p.x1 - p.x0) * s;
          const sy = p.y0 + (p.y1 - p.y0) * s + Math.sin(s * Math.PI * 4) * p.wave;
          ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }
    });
  }

  function project3D(x, y, z, w, h, m) {
    const fov = 420;
    const scale = fov / (fov + z);
    const mx = (m.x - 0.5) * 40;
    const my = (m.y - 0.5) * 30;
    return {
      x: w * 0.5 + (x + mx) * scale,
      y: h * 0.52 + (y + my) * scale,
      s: scale,
    };
  }

  /* ─── SEO: Search universe ─── */
  function mountSeo(el) {
    const kwCount = mobile ? 8 : 14;
    mountCanvasScene(el, "seo", () => ({
      keywords: Array.from({ length: kwCount }, (_, i) => ({
        angle: (i / kwCount) * Math.PI * 2,
        dist: 0.22 + (i % 3) * 0.04,
        size: 4 + (i % 4),
        hue: i % 2 ? CYAN : VIOLET,
      })),
      towers: Array.from({ length: mobile ? 9 : 15 }, (_, i) => ({
        x: -0.42 + (i / 14) * 0.84,
        h: 0.15 + ((i * 47) % 100) / 100 * 0.55,
        w: 0.04 + (i % 3) * 0.012,
        climb: i * 0.07,
      })),
      streams: Array.from({ length: mobile ? 6 : 12 }, () => ({
        x0: Math.random() * 0.85,
        y0: Math.random() * 0.85,
        x1: 0.5,
        y1: 0.38,
        speed: 0.00012 + Math.random() * 0.0001,
        offset: Math.random(),
        wave: 8 + Math.random() * 14,
        size: 1.5 + Math.random() * 2,
      })),
      holo: Array.from({ length: 5 }, (_, i) => ({
        x: 0.15 + i * 0.17,
        y: 0.12 + (i % 2) * 0.08,
        r: 18 + i * 4,
        phase: i * 1.3,
      })),
    }), (st, c, w, h, t, m) => {
      drawCosmos(c.bg, w, h, t, m);
      drawNebula(c.bg, w, h, w * 0.5, h * 0.35, w * 0.55, "rgba(0,212,255,0.14)", "rgba(123,47,255,0.06)", t);
      drawNebula(c.bg, w, h, w * 0.2, h * 0.7, w * 0.35, "rgba(123,47,255,0.1)", "transparent", t);

      const floorY = h * 0.78;
      c.mid.strokeStyle = "rgba(0,212,255,0.08)";
      c.mid.lineWidth = 1;
      for (let i = -8; i <= 8; i += 1) {
        const x1 = w * 0.5 + i * w * 0.08;
        c.mid.beginPath();
        c.mid.moveTo(x1, floorY);
        c.mid.lineTo(w * 0.5 + i * w * 0.22, h);
        c.mid.stroke();
      }

      st.towers.forEach((tw) => {
        const climb = (Math.sin(t * 0.0008 + tw.climb) * 0.5 + 0.5) * 0.12;
        const th = (tw.h + climb) * h * 0.65;
        const bx = w * (0.5 + tw.x * 0.9 + (m.x - 0.5) * 0.04);
        const bw = tw.w * w * 0.9;
        const by = floorY - th;
        const grad = c.mid.createLinearGradient(bx, by, bx, floorY);
        grad.addColorStop(0, "rgba(0,212,255,0.85)");
        grad.addColorStop(0.4, "rgba(0,212,255,0.25)");
        grad.addColorStop(1, "rgba(123,47,255,0.15)");
        c.mid.fillStyle = grad;
        c.mid.shadowColor = CYAN;
        c.mid.shadowBlur = 14;
        c.mid.fillRect(bx - bw / 2, by, bw, th);
        c.mid.shadowBlur = 0;
        c.mid.fillStyle = "rgba(255,255,255,0.6)";
        c.mid.fillRect(bx - bw / 2, by, bw, 2);
      });

      const cx = w * (0.5 + (m.x - 0.5) * 0.06);
      const cy = h * (0.36 + (m.y - 0.5) * 0.04);
      const barW = w * 0.62;
      const barH = h * 0.09;
      drawGlowRect(c.mid, cx - barW / 2, cy - barH / 2, barW, barH, barH * 0.45, CYAN, 0.12, 40);
      drawGlowRect(c.mid, cx - barW / 2 + 6, cy - barH / 2 + 6, barW - 12, barH - 12, barH * 0.4, VIOLET, 0.08, 25);
      const cursor = (Math.sin(t * 0.005) * 0.5 + 0.5) * (barW * 0.55);
      c.mid.fillStyle = "rgba(0,212,255,0.9)";
      c.mid.shadowColor = CYAN;
      c.mid.shadowBlur = 12;
      c.mid.fillRect(cx - barW * 0.2 + cursor, cy - barH * 0.15, 2, barH * 0.3);
      c.mid.shadowBlur = 0;

      st.keywords.forEach((k) => {
        const a = k.angle + t * 0.00035;
        const dist = k.dist * Math.min(w, h);
        const kx = cx + Math.cos(a) * dist;
        const ky = cy + Math.sin(a) * dist * 0.55;
        drawOrb(c.fx, kx, ky, k.size + Math.sin(t * 0.004 + k.angle) * 1.5, k.hue, 0.85, 16);
        c.fx.strokeStyle = `rgba(0,212,255,${0.08 + Math.sin(t * 0.003 + k.angle) * 0.06})`;
        c.fx.beginPath();
        c.fx.moveTo(cx, cy);
        c.fx.lineTo(kx, ky);
        c.fx.stroke();
      });

      st.holo.forEach((ho) => {
        const hx = w * ho.x;
        const hy = h * ho.y + Math.sin(t * 0.002 + ho.phase) * 8;
        const hr = ho.r + Math.sin(t * 0.003 + ho.phase) * 4;
        c.fx.strokeStyle = `rgba(0,212,255,${0.25 + Math.sin(t * 0.004 + ho.phase) * 0.15})`;
        c.fx.lineWidth = 1.5;
        c.fx.shadowColor = CYAN;
        c.fx.shadowBlur = 12;
        c.fx.beginPath();
        c.fx.ellipse(hx, hy, hr, hr * 0.55, t * 0.0005 + ho.phase, 0, Math.PI * 2);
        c.fx.stroke();
        c.fx.shadowBlur = 0;
      });

      const paths = st.streams.map((s) => ({
        x0: s.x0 * w,
        y0: s.y0 * h,
        x1: cx,
        y1: cy,
        speed: s.speed,
        offset: s.offset,
        wave: s.wave,
        size: s.size,
      }));
      drawStream(c.fx, w, h, t, paths, "rgba(0,212,255,0.85)");
    });
  }

  /* ─── Social: Galaxy ─── */
  function mountSocial(el) {
    mountCanvasScene(el, "social", () => {
      const n = mobile ? 10 : 18;
      return {
        planets: Array.from({ length: n }, (_, i) => ({
          x: 0.12 + Math.random() * 0.76,
          y: 0.12 + Math.random() * 0.72,
          r: 10 + Math.random() * 22,
          hue: i % 3 === 0 ? PINK : i % 2 ? CYAN : VIOLET,
          orbit: Math.random() * Math.PI * 2,
          speed: 0.0002 + Math.random() * 0.0003,
        })),
        hubs: [
          { x: 0.5, y: 0.45, r: 28 },
          { x: 0.28, y: 0.62, r: 18 },
          { x: 0.72, y: 0.3, r: 20 },
        ],
        pulses: [],
        lastPulse: 0,
        packets: Array.from({ length: mobile ? 20 : 40 }, () => ({
          from: Math.floor(Math.random() * 18),
          to: Math.floor(Math.random() * 18),
          t: Math.random(),
          speed: 0.0004 + Math.random() * 0.0006,
          kind: Math.floor(Math.random() * 3),
        })),
      };
    }, (st, c, w, h, t, m) => {
      drawCosmos(c.bg, w, h, t, m);
      drawNebula(c.bg, w, h, w * 0.5, h * 0.5, w * 0.7, "rgba(123,47,255,0.12)", "rgba(255,79,216,0.06)", t);

      const pos = st.planets.map((p) => ({
        x: w * (p.x + Math.cos(p.orbit + t * p.speed) * 0.02 + (m.x - 0.5) * 0.03),
        y: h * (p.y + Math.sin(p.orbit + t * p.speed) * 0.02 + (m.y - 0.5) * 0.03),
        r: p.r,
        hue: p.hue,
      }));

      for (let i = 0; i < pos.length; i += 1) {
        for (let j = i + 1; j < pos.length; j += 1) {
          const dx = pos[i].x - pos[j].x;
          const dy = pos[i].y - pos[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > w * 0.35) continue;
          const a = (1 - dist / (w * 0.35)) * 0.2;
          const g = c.mid.createLinearGradient(pos[i].x, pos[i].y, pos[j].x, pos[j].y);
          g.addColorStop(0, `rgba(0,212,255,${a})`);
          g.addColorStop(1, `rgba(255,79,216,${a})`);
          c.mid.strokeStyle = g;
          c.mid.lineWidth = 0.8;
          c.mid.beginPath();
          c.mid.moveTo(pos[i].x, pos[i].y);
          c.mid.lineTo(pos[j].x, pos[j].y);
          c.mid.stroke();
        }
      }

      st.hubs.forEach((hub) => {
        const hx = w * hub.x;
        const hy = h * hub.y;
        drawOrb(c.mid, hx, hy, hub.r + Math.sin(t * 0.003) * 4, VIOLET, 0.35, 35);
        c.mid.strokeStyle = "rgba(255,79,216,0.25)";
        c.mid.lineWidth = 2;
        c.mid.beginPath();
        c.mid.arc(hx, hy, hub.r + 8 + Math.sin(t * 0.004) * 6, 0, Math.PI * 2);
        c.mid.stroke();
      });

      pos.forEach((p) => {
        drawOrb(c.mid, p.x, p.y, p.r, p.hue, 0.7, 22);
        c.mid.strokeStyle = "rgba(255,255,255,0.12)";
        c.mid.lineWidth = 1;
        c.mid.beginPath();
        c.mid.ellipse(p.x, p.y, p.r * 1.6, p.r * 0.45, t * 0.0003, 0, Math.PI * 2);
        c.mid.stroke();
      });

      if (!reduced && t - st.lastPulse > 1800) {
        st.pulses.push({ x: w * 0.5, y: h * 0.45, r: 0, life: 1 });
        st.lastPulse = t;
      }
      for (let i = st.pulses.length - 1; i >= 0; i -= 1) {
        const p = st.pulses[i];
        p.r += 3;
        p.life -= 0.01;
        if (p.life <= 0) { st.pulses.splice(i, 1); continue; }
        c.fx.strokeStyle = `rgba(255,79,216,${p.life * 0.4})`;
        c.fx.lineWidth = 2;
        c.fx.beginPath();
        c.fx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fx.stroke();
      }

      const colors = ["rgba(255,79,216,0.95)", "rgba(0,212,255,0.95)", "rgba(255,220,100,0.95)"];
      st.packets.forEach((pk) => {
        if (pk.from === pk.to || pk.from >= pos.length || pk.to >= pos.length) return;
        pk.t += pk.speed;
        if (pk.t > 1) pk.t = 0;
        const a = pos[pk.from];
        const b = pos[pk.to];
        const px = a.x + (b.x - a.x) * pk.t;
        const py = a.y + (b.y - a.y) * pk.t;
        c.fx.fillStyle = colors[pk.kind];
        c.fx.shadowColor = colors[pk.kind];
        c.fx.shadowBlur = 8;
        c.fx.beginPath();
        c.fx.arc(px, py, 2.5, 0, Math.PI * 2);
        c.fx.fill();
        c.fx.shadowBlur = 0;
      });
    });
  }

  /* ─── Paid ads: Command center ─── */
  function mountPaidAds(el) {
    mountCanvasScene(el, "paid-ads", () => ({
      billboards: Array.from({ length: mobile ? 4 : 7 }, (_, i) => ({
        angle: (i / 7) * Math.PI * 2,
        dist: 0.28 + (i % 2) * 0.08,
        tilt: 0.3 + i * 0.1,
      })),
      traffic: Array.from({ length: mobile ? 16 : 30 }, () => ({
        angle: Math.random() * Math.PI * 2,
        dist: 0.45 + Math.random() * 0.35,
        speed: 0.00025 + Math.random() * 0.0002,
        offset: Math.random(),
      })),
      revenue: Array.from({ length: mobile ? 12 : 24 }, () => ({
        x: 0.35 + Math.random() * 0.3,
        y: 0.5 + Math.random() * 0.35,
        vy: 0.00015 + Math.random() * 0.0002,
        phase: Math.random() * Math.PI * 2,
      })),
      portalPhase: 0,
    }), (st, c, w, h, t, m) => {
      drawCosmos(c.bg, w, h, t, m);
      drawNebula(c.bg, w, h, w * 0.5, h * 0.55, w * 0.5, "rgba(123,47,255,0.15)", "rgba(0,212,255,0.05)", t);

      const cx = w * (0.5 + (m.x - 0.5) * 0.05);
      const cy = h * (0.55 + (m.y - 0.5) * 0.04);

      for (let ring = 4; ring >= 0; ring -= 1) {
        const rw = w * (0.08 + ring * 0.07);
        const rh = h * (0.04 + ring * 0.035);
        c.mid.strokeStyle = `rgba(0,212,255,${0.15 + ring * 0.05})`;
        c.mid.lineWidth = 1.5;
        c.mid.beginPath();
        c.mid.ellipse(cx, cy, rw, rh, 0, 0, Math.PI * 2);
        c.mid.stroke();
      }

      st.billboards.forEach((b) => {
        const a = b.angle + t * 0.00015;
        const dist = b.dist * Math.min(w, h);
        const bx = cx + Math.cos(a) * dist;
        const by = cy + Math.sin(a) * dist * 0.5;
        const bw = w * 0.14;
        const bh = h * 0.08;
        c.mid.save();
        c.mid.translate(bx, by);
        c.mid.rotate(a + Math.PI / 2);
        drawGlowRect(c.mid, -bw / 2, -bh / 2, bw, bh, 6, CYAN, 0.1, 20);
        const scan = ((t * 0.001 + b.tilt) % 1) * bh;
        c.mid.fillStyle = "rgba(0,212,255,0.35)";
        c.mid.fillRect(-bw / 2, -bh / 2 + scan, bw, 2);
        c.mid.restore();
      });

      st.traffic.forEach((tr) => {
        const prog = 1 - ((t * tr.speed + tr.offset) % 1);
        const a = tr.angle + t * 0.0001;
        const outer = tr.dist * Math.min(w, h);
        const inner = outer * prog;
        const tx = cx + Math.cos(a) * inner;
        const ty = cy + Math.sin(a) * inner * 0.55;
        drawOrb(c.fx, tx, ty, 2 + prog * 2, CYAN, 0.8, 10);
      });

      const portalOpen = 0.5 + Math.sin(t * 0.0015) * 0.5;
      const pr = w * 0.06 * portalOpen;
      c.fx.strokeStyle = `rgba(255,220,80,${0.4 + portalOpen * 0.5})`;
      c.fx.lineWidth = 3;
      c.fx.shadowColor = "#ffdc50";
      c.fx.shadowBlur = 25;
      c.fx.beginPath();
      c.fx.ellipse(cx, cy - h * 0.02, pr, pr * 0.35, 0, 0, Math.PI * 2);
      c.fx.stroke();
      c.fx.shadowBlur = 0;

      st.revenue.forEach((rv) => {
        const ry = ((rv.y - (t * rv.vy + rv.phase) % 0.5)) * h;
        if (ry < h * 0.1 || ry > h * 0.95) return;
        const rx = w * rv.x + Math.sin(t * 0.003 + rv.phase) * 12;
        c.fx.fillStyle = `rgba(255,220,80,${0.5 + Math.sin(t * 0.005 + rv.phase) * 0.4})`;
        c.fx.shadowColor = "#ffdc50";
        c.fx.shadowBlur = 8;
        c.fx.fillRect(rx, ry, 2, 6);
        c.fx.shadowBlur = 0;
      });
    });
  }

  /* ─── Content: Creation engine ─── */
  function mountContent(el) {
    mountCanvasScene(el, "content", () => ({
      blocks: Array.from({ length: mobile ? 8 : 14 }, (_, i) => ({
        born: i * 400,
        x: 0.2 + Math.random() * 0.6,
        w: 0.12 + Math.random() * 0.15,
        h: 0.04 + Math.random() * 0.08,
        channel: Math.floor(Math.random() * 4),
      })),
      pathways: Array.from({ length: 5 }, (_, i) => ({
        y: 0.25 + i * 0.12,
        phase: i * 1.1,
      })),
      nodes: Array.from({ length: mobile ? 10 : 18 }, (_, i) => ({
        x: 0.1 + Math.random() * 0.8,
        y: 0.15 + Math.random() * 0.7,
        r: 3 + Math.random() * 5,
        pulse: Math.random() * Math.PI * 2,
      })),
    }), (st, c, w, h, t, m) => {
      drawCosmos(c.bg, w, h, t, m);
      drawNebula(c.bg, w, h, w * 0.35, h * 0.4, w * 0.45, "rgba(0,212,255,0.1)", "transparent", t);

      const vortexX = w * 0.18;
      const vortexY = h * 0.5;
      for (let i = 0; i < (mobile ? 12 : 24); i += 1) {
        const a = t * 0.002 + i * 0.5;
        const dist = 20 + (i % 8) * 8;
        const ex = vortexX + Math.cos(a) * dist;
        const ey = vortexY + Math.sin(a) * dist * 0.7;
        drawOrb(c.bg, ex, ey, 1.5, CYAN, 0.5, 6);
      }

      st.pathways.forEach((pw) => {
        const py = h * pw.y;
        c.mid.strokeStyle = "rgba(0,212,255,0.12)";
        c.mid.lineWidth = 2;
        c.mid.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const yy = py + Math.sin(x * 0.012 + t * 0.002 + pw.phase) * 16;
          if (x === 0) c.mid.moveTo(x, yy);
          else c.mid.lineTo(x, yy);
        }
        c.mid.stroke();
      });

      st.blocks.forEach((bl) => {
        const age = (t - bl.born) % 8000;
        const life = age / 8000;
        if (life > 0.95) return;
        const alpha = life < 0.1 ? life / 0.1 : life > 0.8 ? (1 - life) / 0.2 : 1;
        const bx = w * bl.x + life * w * 0.25 * bl.channel;
        const by = h * (0.3 + bl.channel * 0.12) + Math.sin(t * 0.002 + bl.born) * 10;
        const bw = bl.w * w;
        const bh = bl.h * h;
        const colors = [CYAN, VIOLET, PINK, "#a8ff60"];
        drawGlowRect(c.mid, bx, by, bw, bh, 4, colors[bl.channel], alpha * 0.35, 18);
      });

      st.nodes.forEach((n) => {
        const nx = w * n.x + (m.x - 0.5) * 20;
        const ny = h * n.y + (m.y - 0.5) * 15;
        drawOrb(c.fx, nx, ny, n.r + Math.sin(t * 0.004 + n.pulse) * 2, VIOLET, 0.6, 12);
      });

      for (let i = 0; i < st.nodes.length; i += 1) {
        for (let j = i + 1; j < st.nodes.length; j += 1) {
          const a = st.nodes[i];
          const b = st.nodes[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          if (Math.hypot(dx, dy) > w * 0.25) continue;
          c.fx.strokeStyle = "rgba(123,47,255,0.08)";
          c.fx.beginPath();
          c.fx.moveTo(a.x * w, a.y * h);
          c.fx.lineTo(b.x * w, b.y * h);
          c.fx.stroke();
        }
      }
    });
  }

  /* ─── Webdev: Digital city ─── */
  function mountWebdev(el) {
    mountCanvasScene(el, "webdev", () => ({
      buildings: Array.from({ length: mobile ? 8 : 14 }, (_, i) => ({
        x: -0.45 + (i / 13) * 0.9,
        h: 0.2 + ((i * 53) % 100) / 100 * 0.5,
        w: 0.05 + (i % 3) * 0.015,
        build: i * 0.08,
      })),
      codeRain: Array.from({ length: mobile ? 20 : 40 }, () => ({
        x: Math.random(),
        y: Math.random(),
        speed: 0.0002 + Math.random() * 0.0003,
        len: 4 + Math.floor(Math.random() * 8),
      })),
      browsers: [
        { prog: 0, x: 0.25, y: 0.22 },
        { prog: 0.3, x: 0.58, y: 0.18 },
      ],
      particles: Array.from({ length: mobile ? 30 : 60 }, () => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0002,
        vy: -0.0001 - Math.random() * 0.0002,
        life: Math.random(),
      })),
    }), (st, c, w, h, t, m) => {
      drawCosmos(c.bg, w, h, t, m);
      drawNebula(c.bg, w, h, w * 0.5, h * 0.75, w * 0.6, "rgba(0,212,255,0.08)", "rgba(123,47,255,0.06)", t);

      const horizon = h * 0.72;
      c.mid.fillStyle = "rgba(0,212,255,0.04)";
      c.mid.beginPath();
      c.mid.moveTo(0, horizon);
      c.mid.lineTo(w, horizon);
      c.mid.lineTo(w, h);
      c.mid.lineTo(0, h);
      c.mid.fill();

      st.buildings.forEach((b) => {
        const buildProg = (Math.sin(t * 0.0006 + b.build) * 0.5 + 0.5) * 0.15 + 0.85;
        const bh = b.h * buildProg * h * 0.55;
        const bx = w * (0.5 + b.x * 0.95 + (m.x - 0.5) * 0.03);
        const bw = b.w * w;
        const by = horizon - bh;
        const grad = c.mid.createLinearGradient(bx, by, bx, horizon);
        grad.addColorStop(0, "rgba(0,212,255,0.7)");
        grad.addColorStop(0.5, "rgba(123,47,255,0.3)");
        grad.addColorStop(1, "rgba(0,212,255,0.1)");
        c.mid.fillStyle = grad;
        c.mid.shadowColor = CYAN;
        c.mid.shadowBlur = 10;
        c.mid.fillRect(bx - bw / 2, by, bw, bh);
        c.mid.shadowBlur = 0;
        for (let win = 0; win < 4; win += 1) {
          if (Math.sin(t * 0.003 + win + b.build * 10) > 0.2) {
            c.mid.fillStyle = "rgba(255,255,255,0.5)";
            c.mid.fillRect(bx - bw * 0.3, by + bh * (0.15 + win * 0.18), bw * 0.25, bh * 0.06);
          }
        }
      });

      st.codeRain.forEach((cr) => {
        cr.y += cr.speed;
        if (cr.y > 1) cr.y = 0;
        const cx = cr.x * w;
        const cy = cr.y * h * 0.65;
        for (let i = 0; i < cr.len; i += 1) {
          c.fx.fillStyle = `rgba(0,212,255,${0.8 - i * 0.1})`;
          c.fx.fillRect(cx, cy - i * 8, 2, 5);
        }
      });

      st.browsers.forEach((br) => {
        br.prog = (br.prog + 0.001) % 1.2;
        const alpha = br.prog < 1 ? br.prog : 1.2 - br.prog;
        const bx = w * br.x;
        const by = h * br.y;
        const bw = w * 0.28;
        const bh = h * 0.2;
        drawGlowRect(c.fx, bx, by, bw * alpha, bh * alpha, 8, CYAN, alpha * 0.2, 22);
        c.fx.strokeStyle = `rgba(0,212,255,${alpha * 0.5})`;
        c.fx.strokeRect(bx, by, bw * alpha, bh * alpha);
      });

      st.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0.1) { p.y = 0.9; p.x = Math.random(); }
        const px = p.x * w;
        const py = p.y * h;
        drawOrb(c.fx, px, py, 1.5, CYAN, 0.7, 6);
      });
    });
  }

  /* ─── Email: Communication network ─── */
  function mountEmail(el) {
    mountCanvasScene(el, "email", () => ({
      pipes: [
        { pts: [[0.05, 0.3], [0.35, 0.3], [0.35, 0.55], [0.65, 0.55], [0.65, 0.75], [0.92, 0.75]] },
        { pts: [[0.08, 0.55], [0.45, 0.55], [0.45, 0.25], [0.88, 0.25]] },
        { pts: [[0.1, 0.78], [0.5, 0.78], [0.5, 0.42], [0.9, 0.42]] },
      ],
      packets: Array.from({ length: mobile ? 12 : 22 }, (_, i) => ({
        pipe: i % 3,
        t: Math.random(),
        speed: 0.0002 + Math.random() * 0.00015,
      })),
      nodes: [
        { x: 0.35, y: 0.3 }, { x: 0.35, y: 0.55 }, { x: 0.65, y: 0.55 },
        { x: 0.45, y: 0.55 }, { x: 0.5, y: 0.78 }, { x: 0.5, y: 0.42 },
      ],
    }), (st, c, w, h, t, m) => {
      drawCosmos(c.bg, w, h, t, m);
      drawNebula(c.bg, w, h, w * 0.5, h * 0.5, w * 0.55, "rgba(0,212,255,0.1)", "rgba(123,47,255,0.05)", t);

      st.pipes.forEach((pipe, pi) => {
        const pts = pipe.pts.map((p) => [p[0] * w + (m.x - 0.5) * 10, p[1] * h + (m.y - 0.5) * 8]);
        c.mid.strokeStyle = `rgba(0,212,255,${0.12 + pi * 0.04})`;
        c.mid.lineWidth = 10;
        c.mid.lineCap = "round";
        c.mid.lineJoin = "round";
        c.mid.shadowColor = CYAN;
        c.mid.shadowBlur = 15;
        c.mid.beginPath();
        c.mid.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i += 1) c.mid.lineTo(pts[i][0], pts[i][1]);
        c.mid.stroke();
        c.mid.lineWidth = 3;
        c.mid.strokeStyle = `rgba(0,212,255,${0.35 + Math.sin(t * 0.003 + pi) * 0.15})`;
        c.mid.shadowBlur = 8;
        c.mid.stroke();
        c.mid.shadowBlur = 0;
      });

      st.nodes.forEach((n, i) => {
        const nx = w * n.x;
        const ny = h * n.y;
        drawOrb(c.mid, nx, ny, 10 + Math.sin(t * 0.004 + i) * 3, CYAN, 0.5, 20);
      });

      st.packets.forEach((pk) => {
        const pipe = st.pipes[pk.pipe];
        if (!pipe) return;
        pk.t += pk.speed;
        if (pk.t > 1) pk.t = 0;
        const segs = pipe.pts.length - 1;
        const segProg = pk.t * segs;
        const si = Math.min(Math.floor(segProg), segs - 1);
        const local = segProg - si;
        const p0 = pipe.pts[si];
        const p1 = pipe.pts[si + 1];
        const px = w * (p0[0] + (p1[0] - p0[0]) * local);
        const py = h * (p0[1] + (p1[1] - p0[1]) * local);
        drawOrb(c.fx, px, py, 4, "#ffffff", 0.9, 14);
        c.fx.fillStyle = "rgba(0,212,255,0.6)";
        c.fx.fillRect(px - 5, py - 3, 10, 6);
      });
    });
  }

  /* ─── Leads: Acquisition machine ─── */
  function mountLeads(el) {
    mountCanvasScene(el, "leads", () => ({
      prospects: Array.from({ length: mobile ? 15 : 30 }, () => ({
        x: Math.random(),
        t: Math.random(),
        speed: 0.00012 + Math.random() * 0.0001,
        hue: Math.random() > 0.5 ? CYAN : VIOLET,
      })),
      gatewayPulse: 0,
    }), (st, c, w, h, t, m) => {
      drawCosmos(c.bg, w, h, t, m);
      drawNebula(c.bg, w, h, w * 0.5, h * 0.85, w * 0.4, "rgba(0,212,255,0.15)", "rgba(123,47,255,0.08)", t);

      const cx = w * 0.5;
      const top = h * 0.08;
      const bottom = h * 0.88;
      const levels = [0.9, 0.65, 0.42, 0.22];

      levels.forEach((lw, i) => {
        const y = top + (bottom - top) * (i / 3.5);
        const pulse = 0.5 + Math.sin(t * 0.002 + i) * 0.5;
        c.mid.strokeStyle = `rgba(0,212,255,${0.15 + pulse * 0.2})`;
        c.mid.lineWidth = 2;
        c.mid.shadowColor = CYAN;
        c.mid.shadowBlur = 8 * pulse;
        c.mid.beginPath();
        c.mid.moveTo(cx - w * lw * 0.45, y);
        c.mid.lineTo(cx + w * lw * 0.45, y);
        c.mid.stroke();
        c.mid.shadowBlur = 0;
        if (i < levels.length - 1) {
          const ny = top + (bottom - top) * ((i + 1) / 3.5);
          const nl = levels[i + 1];
          c.mid.strokeStyle = "rgba(123,47,255,0.1)";
          c.mid.beginPath();
          c.mid.moveTo(cx - w * lw * 0.45, y);
          c.mid.lineTo(cx - w * nl * 0.45, ny);
          c.mid.moveTo(cx + w * lw * 0.45, y);
          c.mid.lineTo(cx + w * nl * 0.45, ny);
          c.mid.stroke();
        }
      });

      const gateOpen = 0.6 + Math.sin(t * 0.0018) * 0.4;
      const gw = w * 0.18 * gateOpen;
      c.fx.strokeStyle = `rgba(255,255,255,${0.3 + gateOpen * 0.5})`;
      c.fx.lineWidth = 3;
      c.fx.shadowColor = CYAN;
      c.fx.shadowBlur = 30;
      c.fx.beginPath();
      c.fx.ellipse(cx, bottom, gw, gw * 0.25, 0, 0, Math.PI * 2);
      c.fx.stroke();
      c.fx.shadowBlur = 0;

      st.prospects.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) { p.t = 0; p.x = 0.2 + Math.random() * 0.6; }
        const stage = p.t * 3.5;
        const li = Math.min(3, Math.floor(stage));
        const lt = stage - li;
        const lw = levels[li] + (levels[Math.min(li + 1, 3)] - levels[li]) * lt;
        const y = top + (bottom - top) * (stage / 3.5);
        const px = cx + (p.x - 0.5) * w * lw * 0.8;
        drawOrb(c.fx, px, y, 3, p.hue, 0.85, 10);
      });
    });
  }

  /* ─── Analytics: Neural command center ─── */
  function mountAnalytics(el) {
    mountCanvasScene(el, "analytics", () => {
      const n = mobile ? 12 : 22;
      const nodes = Array.from({ length: n }, (_, i) => ({
        x: 0.5 + Math.cos((i / n) * Math.PI * 2) * (0.15 + (i % 3) * 0.12),
        y: 0.45 + Math.sin((i / n) * Math.PI * 2) * (0.12 + (i % 2) * 0.1),
        layer: i % 3,
      }));
      return {
        nodes,
        core: { x: 0.5, y: 0.45 },
        rivers: Array.from({ length: mobile ? 5 : 9 }, (_, i) => ({
          angle: (i / 9) * Math.PI * 2,
          speed: 0.00015 + i * 0.00002,
          offset: i * 0.3,
        })),
        orbs: Array.from({ length: 6 }, (_, i) => ({
          angle: i * 1.05,
          dist: 0.32 + (i % 2) * 0.08,
          size: 12 + i * 3,
        })),
      };
    }, (st, c, w, h, t, m) => {
      drawCosmos(c.bg, w, h, t, m);
      drawNebula(c.bg, w, h, w * 0.5, h * 0.45, w * 0.65, "rgba(123,47,255,0.14)", "rgba(0,212,255,0.06)", t);

      const coreX = w * (st.core.x + (m.x - 0.5) * 0.04);
      const coreY = h * (st.core.y + (m.y - 0.5) * 0.03);

      st.rivers.forEach((rv) => {
        const prog = (t * rv.speed + rv.offset) % 1;
        const len = w * 0.45;
        for (let s = 0; s < 1; s += 0.05) {
          const d = s * len * prog;
          const rx = coreX + Math.cos(rv.angle) * d;
          const ry = coreY + Math.sin(rv.angle) * d * 0.6;
          const alpha = (1 - s) * 0.4 * prog;
          drawOrb(c.bg, rx, ry, 2 + s * 4, CYAN, alpha, 8);
        }
      });

      st.nodes.forEach((n, i) => {
        st.nodes.forEach((n2, j) => {
          if (j <= i) return;
          if (Math.abs(n.layer - n2.layer) > 1) return;
          const dx = (n.x - n2.x) * w;
          const dy = (n.y - n2.y) * h;
          if (Math.hypot(dx, dy) > w * 0.35) return;
          const pulse = ((t * 0.001 + i + j) % 1);
          c.mid.strokeStyle = "rgba(0,212,255,0.08)";
          c.mid.beginPath();
          c.mid.moveTo(n.x * w, n.y * h);
          c.mid.lineTo(n2.x * w, n2.y * h);
          c.mid.stroke();
          c.mid.fillStyle = "rgba(123,47,255,0.8)";
          c.mid.beginPath();
          c.mid.arc(
            n.x * w + (n2.x - n.x) * w * pulse,
            n.y * h + (n2.y - n.y) * h * pulse,
            2.5, 0, Math.PI * 2
          );
          c.mid.fill();
        });
      });

      st.nodes.forEach((n, i) => {
        const nx = w * n.x;
        const ny = h * n.y;
        drawOrb(c.mid, nx, ny, 5 + n.layer * 2, i % 2 ? CYAN : VIOLET, 0.7, 14);
      });

      drawOrb(c.mid, coreX, coreY, 35 + Math.sin(t * 0.002) * 8, VIOLET, 0.35, 45);
      drawOrb(c.mid, coreX, coreY, 18 + Math.sin(t * 0.003) * 4, CYAN, 0.5, 30);

      st.orbs.forEach((o) => {
        const a = o.angle + t * 0.0004;
        const ox = coreX + Math.cos(a) * o.dist * Math.min(w, h);
        const oy = coreY + Math.sin(a) * o.dist * Math.min(w, h) * 0.55;
        c.fx.strokeStyle = `rgba(0,212,255,${0.2 + Math.sin(t * 0.004 + o.angle) * 0.15})`;
        c.fx.lineWidth = 1.5;
        c.fx.beginPath();
        c.fx.arc(ox, oy, o.size, 0, Math.PI * 2);
        c.fx.stroke();
        c.fx.beginPath();
        c.fx.moveTo(ox - o.size, oy);
        c.fx.lineTo(ox + o.size, oy);
        c.fx.moveTo(ox, oy - o.size * 0.6);
        c.fx.lineTo(ox, oy + o.size * 0.6);
        c.fx.stroke();
      });

      for (let ring = 0; ring < 3; ring += 1) {
        const rr = 50 + ring * 30 + Math.sin(t * 0.002 + ring) * 10;
        c.fx.strokeStyle = `rgba(123,47,255,${0.08 - ring * 0.02})`;
        c.fx.beginPath();
        c.fx.arc(coreX, coreY, rr, 0, Math.PI * 2);
        c.fx.stroke();
      }
    });
  }

  /* ─── YouTube: Growth universe ─── */
  function mountYoutube(el) {
    mountCanvasScene(el, "youtube", () => ({
      portals: Array.from({ length: mobile ? 4 : 7 }, (_, i) => ({
        x: 0.15 + (i % 4) * 0.22,
        y: 0.2 + Math.floor(i / 4) * 0.35,
        w: 0.16,
        h: 0.1,
        phase: i * 0.9,
      })),
      streams: Array.from({ length: mobile ? 15 : 28 }, () => ({
        portal: Math.floor(Math.random() * 7),
        t: Math.random(),
        speed: 0.0003 + Math.random() * 0.0004,
      })),
      bursts: [],
      lastBurst: 0,
    }), (st, c, w, h, t, m) => {
      drawCosmos(c.bg, w, h, t, m, "red");
      drawNebula(c.bg, w, h, w * 0.5, h * 0.45, w * 0.6, "rgba(255,60,60,0.12)", "rgba(0,212,255,0.05)", t);

      const hubX = w * 0.5;
      const hubY = h * 0.48;
      drawOrb(c.mid, hubX, hubY, 22 + Math.sin(t * 0.003) * 5, "#ff3c3c", 0.4, 35);

      st.portals.forEach((pt, i) => {
        const px = w * (pt.x + (m.x - 0.5) * 0.03);
        const py = h * (pt.y + (m.y - 0.5) * 0.02 + Math.sin(t * 0.002 + pt.phase) * 0.02);
        const pw = pt.w * w;
        const ph = pt.h * h;
        const flicker = 0.7 + Math.sin(t * 0.004 + pt.phase) * 0.3;
        drawGlowRect(c.mid, px, py, pw, ph, 6, "#ff3c3c", 0.15 * flicker, 25);
        c.mid.fillStyle = `rgba(255,60,60,${0.25 * flicker})`;
        c.mid.fillRect(px + 4, py + 4, pw - 8, ph - 8);
        c.mid.strokeStyle = `rgba(0,212,255,${0.2 * flicker})`;
        c.mid.strokeRect(px, py, pw, ph);
        c.mid.strokeStyle = "rgba(255,255,255,0.15)";
        c.mid.beginPath();
        c.mid.moveTo(px + pw * 0.5, py);
        c.mid.lineTo(hubX, hubY);
        c.mid.stroke();
      });

      st.streams.forEach((str) => {
        const pt = st.portals[str.portal % st.portals.length];
        if (!pt) return;
        str.t += str.speed;
        if (str.t > 1) str.t = 0;
        const px = w * pt.x + pt.w * w * 0.5;
        const py = h * pt.y + pt.h * h * 0.5;
        const sx = px + (hubX - px) * str.t;
        const sy = py + (hubY - py) * str.t;
        drawOrb(c.fx, sx, sy, 3, "#ff3c3c", 0.9, 12);
      });

      if (!reduced && t - st.lastBurst > 2200) {
        st.bursts.push({ x: hubX, y: hubY, r: 10, life: 1 });
        st.lastBurst = t;
      }
      for (let i = st.bursts.length - 1; i >= 0; i -= 1) {
        const b = st.bursts[i];
        b.r += 4;
        b.life -= 0.012;
        if (b.life <= 0) { st.bursts.splice(i, 1); continue; }
        c.fx.strokeStyle = `rgba(255,100,80,${b.life * 0.5})`;
        c.fx.lineWidth = 2;
        c.fx.beginPath();
        c.fx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        c.fx.stroke();
      }

      for (let i = 0; i < (mobile ? 8 : 14); i += 1) {
        const a = t * 0.0008 + i * 0.7;
        const dist = 80 + (i % 5) * 25;
        const ex = hubX + Math.cos(a) * dist;
        const ey = hubY + Math.sin(a) * dist * 0.5;
        drawOrb(c.fx, ex, ey, 1.5, CYAN, 0.5, 6);
      }
    });
  }

  function init() {
    document.querySelectorAll(".service-scene[data-scene]").forEach((el) => {
      if (el.dataset.mounted) return;
      const fn = SCENES[el.dataset.scene];
      if (fn) {
        el.dataset.mounted = "1";
        fn(el);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.ServiceScenes = { init };
})();

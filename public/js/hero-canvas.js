/**
 * DIVINECREATORS — Hero motion graphics (canvas network + glow)
 */
function initHeroMotion(canvas, container) {
  if (!canvas || !container) return () => {};

  const ctx = canvas.getContext("2d", { alpha: true });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const lite = mobile || window.matchMedia("(max-width: 1024px)").matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let running = true;
  let mouse = { x: 0.5, y: 0.5, active: false };
  let time = 0;

  const nodeCount = reduced ? 0 : lite ? 28 : 52;
  const nodes = [];
  const streaks = Array.from({ length: lite ? 3 : 6 }, (_, i) => ({
    x: Math.random(),
    y: Math.random() * 0.6 + 0.2,
    speed: 0.00015 + Math.random() * 0.0002,
    len: 0.12 + Math.random() * 0.18,
    phase: i * 1.3,
  }));

  const resize = () => {
    const rect = container.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (nodes.length === 0 && nodeCount > 0) spawnNodes();
  };

  const spawnNodes = () => {
    nodes.length = 0;
    for (let i = 0; i < nodeCount; i += 1) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        vx: (Math.random() - 0.5) * (lite ? 0.15 : 0.25),
        vy: (Math.random() - 0.5) * (lite ? 0.15 : 0.25),
        r: 1.2 + Math.random() * 2,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  };

  const drawGrid = (t) => {
    const gap = lite ? 56 : 44;
    const off = (t * 0.012) % gap;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let x = -gap + off; x < width + gap; x += gap) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = -gap + off * 0.6; y < height + gap; y += gap) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawConnections = (t) => {
    const maxDist = lite ? 110 : 150;
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist > maxDist) continue;
        const alpha = (1 - dist / maxDist) * 0.22;
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.8})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.6 + (1 - dist / maxDist) * 0.8;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        const pulsePos = ((t * 0.001 + (i + j) * 0.07) % 1);
        const px = a.x + (b.x - a.x) * pulsePos;
        const py = a.y + (b.y - a.y) * pulsePos;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 2.5})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const drawNodes = (t) => {
    nodes.forEach((n) => {
      const parallaxX = mouse.active ? (mouse.x - 0.5) * 30 * n.z : 0;
      const parallaxY = mouse.active ? (mouse.y - 0.5) * 22 * n.z : 0;
      const pulse = 0.6 + Math.sin(t * 0.002 + n.pulse) * 0.4;
      const x = n.x + parallaxX;
      const y = n.y + parallaxY;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, n.r * 6);
      glow.addColorStop(0, `rgba(255, 255, 255, ${0.35 * pulse})`);
      glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, n.r * 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(200, 240, 255, ${0.7 * pulse})`;
      ctx.beginPath();
      ctx.arc(x, y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawStreaks = (t) => {
    streaks.forEach((s) => {
      const progress = (t * s.speed + s.phase) % 1;
      const x = progress * (width + width * s.len) - width * s.len * 0.5;
      const y = s.y * height;
      const grad = ctx.createLinearGradient(x, y, x + width * s.len, y);
      grad.addColorStop(0, "rgba(255, 255, 255, 0)");
      grad.addColorStop(0.5, "rgba(255, 255, 255, 0.12)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width * s.len, y);
      ctx.stroke();
    });
  };

  const drawCoreGlow = (t) => {
    const cx = width * (lite ? 0.72 : 0.68) + (mouse.active ? (mouse.x - 0.5) * 40 : 0);
    const cy = height * 0.48 + (mouse.active ? (mouse.y - 0.5) * 30 : 0);
    const pulse = 0.85 + Math.sin(t * 0.0015) * 0.15;
    const r = Math.min(width, height) * (lite ? 0.22 : 0.28) * pulse;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, "rgba(255, 255, 255, 0.14)");
    g.addColorStop(0.45, "rgba(255, 255, 255, 0.08)");
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + Math.sin(t * 0.002) * 0.05})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 0.55, r * 0.32, t * 0.0004, 0, Math.PI * 2);
    ctx.stroke();
  };

  const tick = (now) => {
    if (!running) return;
    time = now;
    ctx.clearRect(0, 0, width, height);

    if (!reduced && nodeCount > 0) {
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      });
      drawGrid(now);
      drawStreaks(now);
      drawConnections(now);
      drawCoreGlow(now);
      drawNodes(now);
    } else {
      drawCoreGlow(now);
      drawGrid(now);
    }

    raf = requestAnimationFrame(tick);
  };

  const onMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / rect.width;
    mouse.y = (e.clientY - rect.top) / rect.height;
    mouse.active = true;
  };

  const onLeave = () => {
    mouse.active = false;
  };

  const onVisibility = () => {
    running = !document.hidden;
    if (running) raf = requestAnimationFrame(tick);
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });
  container.addEventListener("mousemove", onMove, { passive: true });
  container.addEventListener("mouseleave", onLeave, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  raf = requestAnimationFrame(tick);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    container.removeEventListener("mousemove", onMove);
    container.removeEventListener("mouseleave", onLeave);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}

if (typeof window !== "undefined") {
  window.initHeroMotion = initHeroMotion;
}

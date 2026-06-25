import { useEffect, useRef } from "react";
import { aboutSectionContent } from "../../data/homeContent";

const CHART_POINTS = [
  { x: 0.08, y: 0.78 },
  { x: 0.28, y: 0.62 },
  { x: 0.48, y: 0.48 },
  { x: 0.68, y: 0.32 },
  { x: 0.88, y: 0.18 },
];

const isAboutLightTheme = () => {
  const theme = document.documentElement.getAttribute("data-theme");
  if (theme === "light") return true;
  if (theme === "dark") return false;
  return false;
};

const getAboutChartTheme = () => {
  if (isAboutLightTheme()) {
    return {
      grid: "rgba(0, 0, 0, 0.08)",
      line: "rgba(0, 0, 0, 0.78)",
      lineGlow: "rgba(0, 0, 0, 0.2)",
      fillTop: "rgba(0, 0, 0, 0.1)",
      fillBottom: "rgba(0, 0, 0, 0)",
      nodeFill: "rgba(0, 0, 0, 0.88)",
      nodeStroke: "rgba(0, 0, 0, 0.95)",
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
  };
};

const AboutSection = () => {
  const vizRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const targets = [contentRef.current, visualRef.current].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = vizRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let progress = reduced ? 1 : 0;
    let raf = 0;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const theme = getAboutChartTheme();
      const w = root.clientWidth;
      const h = root.clientHeight;
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

      const visible = Math.max(1, Math.floor(progress * CHART_POINTS.length));
      const pts = CHART_POINTS.slice(0, visible).map((p) => ({ x: p.x * w, y: p.y * h }));

      if (pts.length > 1) {
        ctx.strokeStyle = theme.line;
        ctx.lineWidth = 3;
        ctx.shadowColor = theme.lineGlow;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.lineTo(pts[pts.length - 1].x, h);
        ctx.lineTo(pts[0].x, h);
        ctx.closePath();
        const fill = ctx.createLinearGradient(0, 0, 0, h);
        fill.addColorStop(0, theme.fillTop);
        fill.addColorStop(1, theme.fillBottom);
        ctx.fillStyle = fill;
        ctx.fill();
      }

      pts.forEach((p, i) => {
        const pulse = reduced ? 1 : 0.6 + Math.sin(Date.now() * 0.002 + i) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = theme.nodeFill;
        ctx.fill();
        ctx.strokeStyle = theme.nodeStroke;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });

      if (!reduced && progress < 1) {
        progress = Math.min(1, progress + 0.008);
        raf = requestAnimationFrame(draw);
      } else if (!reduced) {
        raf = requestAnimationFrame(draw);
      }
    };

    const startDraw = () => {
      progress = reduced ? 1 : 0;
      cancelAnimationFrame(raf);
      draw();
    };

    resize();
    startDraw();
    window.addEventListener("resize", resize, { passive: true });

    const chartObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) startDraw();
      },
      { threshold: 0.2 }
    );
    chartObserver.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      chartObserver.disconnect();
    };
  }, []);

  return (
    <section id="about" className="about-section section-pad" aria-labelledby="about-heading">
      <div className="container-xl about-section__container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 about-section__content" ref={contentRef}>
            <span className="eyebrow">{aboutSectionContent.label}</span>
            <h2 id="about-heading">{aboutSectionContent.heading}</h2>
            <p>{aboutSectionContent.paragraph}</p>
          </div>
          <div className="col-lg-6 about-section__visual" ref={visualRef} aria-hidden="true">
            <div className="about-dashboard-viz" ref={vizRef}>
              <canvas className="about-dashboard-viz__canvas" ref={canvasRef} />
              <div className="about-dashboard-viz__orbit">
                <span className="about-dashboard-viz__orbit-icon">
                  <i className="bi bi-broadcast" />
                </span>
              </div>
              <span className="about-dashboard-viz__chip about-dashboard-viz__chip--1">
                <i className="bi bi-compass" /> Strategy
              </span>
              <span className="about-dashboard-viz__chip about-dashboard-viz__chip--2">
                <i className="bi bi-pencil-square" /> Content
              </span>
              <span className="about-dashboard-viz__chip about-dashboard-viz__chip--3">
                <i className="bi bi-chat-square-quote" /> Storytelling
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

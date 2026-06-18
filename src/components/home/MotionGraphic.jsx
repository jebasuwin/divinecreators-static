import { useEffect, useRef } from "react";

const MotionGraphic = () => {
  const rootRef = useRef(null);
  const stateRef = useRef({ px: 0, py: 0, tx: 0, ty: 0, raf: 0, active: true });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const s = stateRef.current;

    if (reduced) {
      root.classList.add("motion-graphic--static");
      return undefined;
    }

    if (mobile) {
      root.classList.add("motion-graphic--lite");
    }

    const layers = root.querySelectorAll("[data-parallax]");
    const orb = root.querySelector(".motion-graphic__orb");

    const tick = () => {
      if (!s.active) {
        s.raf = requestAnimationFrame(tick);
        return;
      }
      s.px += (s.tx - s.px) * 0.06;
      s.py += (s.ty - s.py) * 0.06;
      const x = s.px;
      const y = s.py;
      if (orb) {
        orb.style.transform = `translate3d(${x * 12}px, ${y * 10}px, 0)`;
      }
      layers.forEach((el) => {
        const depth = Number(el.dataset.parallax) || 1;
        el.style.transform = `translate3d(${x * 8 * depth}px, ${y * 6 * depth}px, 0)`;
      });
      s.raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      s.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      s.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onLeave = () => {
      s.tx = 0;
      s.ty = 0;
    };

    const onVisibility = () => {
      s.active = !document.hidden;
    };

    s.raf = requestAnimationFrame(tick);
    root.addEventListener("mousemove", onMove, { passive: true });
    root.addEventListener("mouseleave", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(s.raf);
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} className="motion-graphic" aria-hidden="true">
      <div className="motion-graphic__grid" />
      <div className="motion-graphic__glow motion-graphic__glow--cyan" data-parallax="0.4" />
      <div className="motion-graphic__glow motion-graphic__glow--violet" data-parallax="0.6" />

      <svg className="motion-graphic__orbit motion-graphic__orbit--1" viewBox="0 0 400 400">
        <ellipse cx="200" cy="200" rx="165" ry="95" fill="none" stroke="url(#orbitGrad1)" strokeWidth="0.75" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      <svg className="motion-graphic__orbit motion-graphic__orbit--2" viewBox="0 0 400 400">
        <ellipse cx="200" cy="200" rx="130" ry="150" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" strokeDasharray="4 8" />
      </svg>

      <div className="motion-graphic__ring motion-graphic__ring--1" data-parallax="0.8" />
      <div className="motion-graphic__ring motion-graphic__ring--2" data-parallax="1.2" />
      <div className="motion-graphic__ring motion-graphic__ring--3" data-parallax="0.5" />

      <div className="motion-graphic__shapes" data-parallax="1.5">
        <span className="motion-graphic__shape motion-graphic__shape--tri" />
        <span className="motion-graphic__shape motion-graphic__shape--sq" />
        <span className="motion-graphic__shape motion-graphic__shape--dot" />
      </div>

      <div className="motion-graphic__orb-wrap">
        <div className="motion-graphic__orb">
          <div className="motion-graphic__orb-core" />
          <div className="motion-graphic__orb-sheen" />
        </div>
      </div>

      <div className="motion-graphic__particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="motion-graphic__particle" style={{ "--i": i }} />
        ))}
      </div>
    </div>
  );
};

export default MotionGraphic;

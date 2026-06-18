import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const rootRef = useRef(null);
  const glowRef = useRef(null);
  const trailRef = useRef(null);
  const stateRef = useRef({
    mx: 0,
    my: 0,
    gx: 0,
    gy: 0,
    tx: 0,
    ty: 0,
    raf: 0,
    visible: false,
    intense: false,
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const tablet = window.matchMedia("(max-width: 1024px)").matches;

    if (reduced || coarse || !fine || tablet) return undefined;

    const root = rootRef.current;
    const glow = glowRef.current;
    const trail = trailRef.current;
    if (!root || !glow || !trail) return undefined;

    const s = stateRef.current;

    const tick = () => {
      s.gx += (s.mx - s.gx) * 0.16;
      s.gy += (s.my - s.gy) * 0.16;
      s.tx += (s.mx - s.tx) * 0.08;
      s.ty += (s.my - s.ty) * 0.08;

      glow.style.transform = `translate3d(${s.gx}px, ${s.gy}px, 0)`;
      trail.style.transform = `translate3d(${s.tx}px, ${s.ty}px, 0)`;
      s.raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      s.mx = e.clientX;
      s.my = e.clientY;
      if (!s.visible) {
        s.visible = true;
        root.dataset.visible = "true";
      }
    };

    const onLeave = () => {
      s.visible = false;
      root.dataset.visible = "false";
    };

    const onOver = (e) => {
      const interactive = e.target.closest("a, button, [role='button'], .cursor-hover");
      const intense = Boolean(interactive && !interactive.matches("input, textarea, select"));
      if (intense !== s.intense) {
        s.intense = intense;
        root.dataset.intense = intense ? "true" : "false";
      }
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(s.raf);
      else s.raf = requestAnimationFrame(tick);
    };

    s.raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave, { passive: true });
    document.documentElement.addEventListener("mouseenter", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-aura" aria-hidden="true" data-visible="false">
      <div ref={trailRef} className="cursor-aura__trail" />
      <div ref={glowRef} className="cursor-aura__glow" />
    </div>
  );
};

export default CustomCursor;

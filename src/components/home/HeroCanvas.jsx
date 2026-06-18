import { useEffect, useRef } from "react";
import { initHeroMotion } from "../../utils/heroCanvas";

const HeroCanvas = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const cleanupMotion = initHeroMotion(canvas, container);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chips = container.querySelectorAll(".hero__chip, .hero__hex, .hero__core-orb");

    const onMove = (e) => {
      if (reduced) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      chips.forEach((el, i) => {
        const depth = 12 + i * 8;
        el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    };

    container.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cleanupMotion?.();
      container.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero__motion" aria-hidden="true">
      <canvas ref={canvasRef} id="hero-canvas" />
      <div className="hero__sweep" />
      <div className="hero__sweep hero__sweep--2" />
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />
      <div className="hero__cyber-ring" />
      <div className="hero__cyber-elements">
        <span className="hero__chip hero__chip--1" />
        <span className="hero__chip hero__chip--2" />
        <span className="hero__chip hero__chip--3" />
        <span className="hero__hex" />
      </div>
      <div className="hero__core-orb" />
    </div>
  );
};

export default HeroCanvas;

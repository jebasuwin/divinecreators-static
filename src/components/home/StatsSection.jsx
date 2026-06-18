import { useEffect, useRef, useState } from "react";
import { companyStats } from "../../data/homeContent";

const parseStat = (value) => {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { num: 0, suffix: value, decimals: 0 };
  const num = parseFloat(match[1]);
  const suffix = match[2];
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { num, suffix, decimals };
};

const AnimatedStat = ({ value, label }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const parsed = parseStat(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1200;

        const animate = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - t) ** 3;
          const current = parsed.num * eased;
          setDisplay(`${current.toFixed(parsed.decimals)}${parsed.suffix}`);
          if (t < 1) raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [parsed.num, parsed.suffix, parsed.decimals, value]);

  return (
    <div className="stat-item-v2 reveal reveal-up" ref={ref}>
      <div className="stat-item-v2__value">{display}</div>
      <div className="stat-item-v2__label">{label}</div>
    </div>
  );
};

const StatsSection = ({ compact = false }) => (
  <section
    className={`stats-section-v2${compact ? " stats-section-v2--compact" : ""}`}
    aria-label="Company statistics"
  >
    <div className="container-gd">
      <div className="stats-grid-v2 reveal-stagger">
        {companyStats.map((stat) => (
          <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;

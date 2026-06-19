import { useEffect, useRef, useState } from "react";

const formatStatValue = (value, decimals, suffix) => {
  const num = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
  return `${num}${suffix}`;
};

const CountUpStat = ({
  target,
  suffix = "",
  decimals = 0,
  duration = 1500,
  delay = 0,
  className = "",
}) => {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);
  const elementRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      if (prefersReducedMotion) {
        setValue(target);
        return;
      }

      const startTime = performance.now() + delay;

      const animate = (currentTime) => {
        if (currentTime < startTime) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        const currentValue = target * easedProgress;

        setValue(currentValue);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setValue(target);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        runAnimation();
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay, decimals]);

  return (
    <span ref={elementRef} className={className}>
      {formatStatValue(value, decimals, suffix)}
    </span>
  );
};

export default CountUpStat;

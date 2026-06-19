import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 400;

const getScrollProgress = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollHeight <= 0) return 0;

  return Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
};

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateBackToTop = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setVisible(scrollTop > SCROLL_THRESHOLD);
      setScrollProgress(getScrollProgress());
    };

    updateBackToTop();

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    window.addEventListener("resize", updateBackToTop);

    return () => {
      window.removeEventListener("scroll", updateBackToTop);
      window.removeEventListener("resize", updateBackToTop);
    };
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reducedMotion ? "auto" : "smooth";
    const home = document.getElementById("home");

    if (home) {
      home.scrollIntoView({ behavior, block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior });
  };

  return (
    <button
      type="button"
      className={`floating-back-to-top${visible ? " is-visible" : ""}`}
      style={{ "--scroll-progress": scrollProgress }}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <i className="bi bi-arrow-up" aria-hidden="true" />
    </button>
  );
};

export default BackToTopButton;

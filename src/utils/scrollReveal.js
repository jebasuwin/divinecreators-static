const REVEAL_SELECTOR = ".reveal, .reveal-up, .reveal-left, .reveal-right";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const applyStagger = (root) => {
  const step = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--reveal-stagger-step"),
    10
  ) || 75;

  root.querySelectorAll(".reveal-stagger").forEach((container) => {
    Array.from(container.children)
      .filter((child) => child.matches(REVEAL_SELECTOR))
      .forEach((child, index) => {
        child.style.setProperty("--reveal-delay", `${index * step}ms`);
      });
  });
};

const markAllVisible = (root) => {
  root.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    el.classList.add("is-visible");
  });
};

export const initScrollReveal = (root = document) => {
  const elements = root.querySelectorAll(REVEAL_SELECTOR);

  if (!elements.length) {
    return () => {};
  }

  applyStagger(root);

  if (prefersReducedMotion()) {
    markAllVisible(root);
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -4% 0px",
    }
  );

  elements.forEach((el) => {
    if (!el.classList.contains("is-visible")) {
      observer.observe(el);
    }
  });

  return () => observer.disconnect();
};

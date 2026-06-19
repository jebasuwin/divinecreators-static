import { useEffect, useState } from "react";

export const SECTION_MAP = [
  { id: "home", nav: "home" },
  { id: "statistics", nav: "home" },
  { id: "about", nav: "about" },
  { id: "services", nav: "services" },
  { id: "contact", nav: "contact" },
];

const HOME_SCROLL_FALLBACK = 160;
const PROBE_OFFSET = 24;

export const getNavbarHeight = () => {
  const navbar =
    document.querySelector(".floating-nav") ||
    document.querySelector(".site-nav") ||
    document.querySelector("header");

  return navbar?.getBoundingClientRect().height ?? 72;
};

export const calculateActiveSection = () => {
  if (window.scrollY < HOME_SCROLL_FALLBACK) {
    return "home";
  }

  const navbarHeight = getNavbarHeight();
  const probeY = window.scrollY + navbarHeight + PROBE_OFFSET;
  let nextActive = "home";

  for (const section of SECTION_MAP) {
    const element = document.getElementById(section.id);
    if (!element) continue;

    const sectionTop = window.scrollY + element.getBoundingClientRect().top;
    const sectionBottom = sectionTop + element.offsetHeight;

    if (probeY >= sectionTop && probeY < sectionBottom) {
      nextActive = section.nav;
      break;
    }
  }

  const nearBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 12;

  if (nearBottom) {
    nextActive = "contact";
  }

  return nextActive;
};

export const useActiveSection = (enabled = true) => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!enabled) return undefined;

    let frameId = null;

    const updateActiveSection = () => {
      const nextActive = calculateActiveSection();
      setActiveSection((current) => (current === nextActive ? current : nextActive));
    };

    const onScroll = () => {
      if (frameId !== null) return;

      frameId = requestAnimationFrame(() => {
        updateActiveSection();
        frameId = null;
      });
    };

    updateActiveSection();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", () => {
      window.setTimeout(updateActiveSection, 100);
      window.setTimeout(updateActiveSection, 450);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSection);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  return [activeSection, setActiveSection];
};

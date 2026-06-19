import { useLocation, useNavigate } from "react-router-dom";

export const scrollToSection = (hash, behavior) => {
  const id = hash.replace(/^#/, "");
  const element = document.getElementById(id);
  if (!element) return false;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: behavior ?? (reducedMotion ? "auto" : "smooth"), block: "start" });
  return true;
};

export const useHashNavigation = (onNavigate) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (event, hash) => {
    onNavigate?.();

    if (location.pathname === "/") {
      event.preventDefault();
      scrollToSection(hash);
      window.history.pushState(null, "", `#${hash.replace(/^#/, "")}`);
      return;
    }

    navigate({ pathname: "/", hash: hash.replace(/^#/, "") });
  };
};

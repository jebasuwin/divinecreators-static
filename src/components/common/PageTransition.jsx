import { useLocation } from "react-router-dom";

const PageTransition = () => {
  const { pathname } = useLocation();
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) return null;

  return <div key={pathname} className="page-transition" aria-hidden="true" />;
};

export default PageTransition;

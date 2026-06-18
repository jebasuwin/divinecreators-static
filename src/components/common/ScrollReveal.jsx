import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initScrollReveal } from "../../utils/scrollReveal";

const ScrollReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let cleanup = () => {};
    let frameId = 0;

    const setup = () => {
      cleanup();
      cleanup = initScrollReveal();
    };

    frameId = requestAnimationFrame(() => {
      frameId = requestAnimationFrame(setup);
    });

    return () => {
      cancelAnimationFrame(frameId);
      cleanup();
    };
  }, [pathname]);

  return null;
};

export default ScrollReveal;

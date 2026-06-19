import { useEffect } from "react";
import HeroCanvas from "./HeroCanvas";
import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";
import { useHashNavigation } from "../../utils/hashNavigation";
import { heroContent } from "../../data/homeContent";

const HeroSection = () => {
  const handleHashNav = useHashNavigation();

  useEffect(() => {
    const root = document.querySelector(".hero-v2");
    if (!root) return undefined;
    const t = window.setTimeout(() => root.classList.add("hero-v2--entered"), 60);
    return () => window.clearTimeout(t);
  }, []);

  const headlineParts = heroContent.headline.split("Digital Growth");

  return (
    <section id="home" className="hero-v2 hero-v2--motion" aria-labelledby="hero-heading">
      <HeroCanvas />
      <div className="hero-v2__readability" aria-hidden="true" />

      <div className="container-gd hero-v2__grid">
        <div className="hero-v2__content">
          <p className="hero-v2__eyebrow hero-v2__seq hero-v2__seq--1">
            DIGITAL EXPERIENCES • CREATIVE TECHNOLOGY
          </p>

          <h1 id="hero-heading" className="hero-v2__title hero-v2__seq hero-v2__seq--2">
            {headlineParts[0]}
            <span className="gradient-text">Digital Growth</span>
            {headlineParts[1] || ""}
          </h1>

          <p className="hero-v2__text hero-v2__seq hero-v2__seq--3">
            {heroContent.subheadline}
          </p>

          <div className="hero-v2__actions hero-v2__seq hero-v2__seq--4">
            <PrimaryButton
              href="/#contact"
              onClick={(event) => handleHashNav(event, heroContent.primaryCta.hash)}
            >
              {heroContent.primaryCta.label}
            </PrimaryButton>
            <SecondaryButton href={heroContent.secondaryCta.href}>
              {heroContent.secondaryCta.label}
            </SecondaryButton>
          </div>
        </div>
      </div>

      <a href="#services" className="hero-v2__scroll" aria-label="Scroll to services">
        <span className="hero-v2__scroll-line" />
        <span>Scroll</span>
      </a>
    </section>
  );
};

export default HeroSection;

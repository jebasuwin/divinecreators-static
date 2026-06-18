import { useEffect } from "react";
import { Link } from "react-router-dom";
import HeroCanvas from "./HeroCanvas";
import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";
import { heroContent, companyStats } from "../../data/homeContent";

const HeroSection = () => {
  useEffect(() => {
    const root = document.querySelector(".hero-v2");
    if (!root) return undefined;
    const t = window.setTimeout(() => root.classList.add("hero-v2--entered"), 60);
    return () => window.clearTimeout(t);
  }, []);

  const headlineParts = heroContent.headline.split("Digital Growth");
  const trustStats = companyStats.slice(0, 3);

  return (
    <section className="hero-v2 hero-v2--motion" aria-labelledby="hero-heading">
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
            <PrimaryButton to={heroContent.primaryCta.path}>
              {heroContent.primaryCta.label}
            </PrimaryButton>
            <SecondaryButton to={heroContent.secondaryCta.path}>
              {heroContent.secondaryCta.label}
            </SecondaryButton>
          </div>

          <ul className="hero-v2__trust hero-v2__seq hero-v2__seq--5" aria-label="Company highlights">
            {trustStats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link to="#services-section" className="hero-v2__scroll" aria-label="Scroll to services">
        <span className="hero-v2__scroll-line" />
        <span>Scroll</span>
      </Link>
    </section>
  );
};

export default HeroSection;

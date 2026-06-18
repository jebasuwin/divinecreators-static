import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import StatsSection from "../components/home/StatsSection";
import ServiceGrid from "../components/home/ServiceGrid";
import LargeCTA from "../components/common/LargeCTA";
import PrimaryButton from "../components/common/PrimaryButton";
import SecondaryButton from "../components/common/SecondaryButton";
import ImageReveal from "../components/common/ImageReveal";
import { pageSeo } from "../data/seoConfig";
import { images, solutionImageMap } from "../data/images";
import { homeSolutions } from "../data/solutions";
import {
  heroContent,
  homeWhyPartnerPreview,
  homeProcessSteps,
  pageCtas,
} from "../data/homeContent";
import { getOrganizationSchema, getWebSiteSchema } from "../utils/schema";

const Home = () => (
  <>
    <SEO
      title={pageSeo.home.title}
      description={pageSeo.home.description}
      path={pageSeo.home.path}
      schema={[getOrganizationSchema(), getWebSiteSchema()]}
    />

    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="container-gd home-hero__grid">
        <div>
          <h1 id="hero-heading" className="hero-title">{heroContent.headline}</h1>
          <p className="home-hero__text">{heroContent.subheadline}</p>
          <div className="home-hero__actions">
            <PrimaryButton to={heroContent.primaryCta.path}>{heroContent.primaryCta.label}</PrimaryButton>
            <SecondaryButton to={heroContent.secondaryCta.path} dark>
              {heroContent.secondaryCta.label}
            </SecondaryButton>
          </div>
        </div>
        <div className="home-hero__visual">
          <ImageReveal
            src={images.home.hero}
            alt="DIVINECREATORS digital marketing strategy and team collaboration"
            ratio="landscape"
            loading="eager"
          />
        </div>
      </div>
    </section>

    <section className="section-pad bg-soft why-partner-section" aria-labelledby="why-partner-heading">
      <div className="container-gd split-section split-section--center">
        <div>
          <span className="section-eyebrow">Why partner with us</span>
          <h2 id="why-partner-heading">{homeWhyPartnerPreview.heading}</h2>
          <p>{homeWhyPartnerPreview.paragraph}</p>
          <div className="highlight-list">
            {homeWhyPartnerPreview.highlights.map((item) => (
              <div className="highlight-item" key={item.title}>
                <span className="highlight-item__icon">
                  <i className={`bi ${item.icon}`} aria-hidden="true" />
                </span>
                <div>
                  <div className="highlight-item__title">{item.title}</div>
                  <p className="highlight-item__text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ImageReveal
          src={images.home.whyPartner}
          alt="Strategy planning for digital marketing"
          ratio="standard"
        />
      </div>
    </section>

    <StatsSection />

    <section className="section-pad" aria-labelledby="services-heading">
      <div className="container-gd">
        <span className="section-eyebrow">Our services</span>
        <h2 id="services-heading" className="section-heading--spaced section-heading--narrow">
          Digital marketing services for sustainable growth
        </h2>
        <ServiceGrid />
      </div>
    </section>

    <section className="section-pad bg-soft" aria-labelledby="specialized-heading">
      <div className="container-gd">
        <span className="section-eyebrow">Specialized services</span>
        <h2 id="specialized-heading" className="section-heading--spaced">
          Focused solutions for specific growth goals
        </h2>
        <div className="solution-preview-grid">
          {homeSolutions.map((sol) => (
            <Link key={sol.id} to={sol.link} className="solution-preview-card">
              <div className="solution-preview-card__media">
                <img src={solutionImageMap[sol.id]} alt={sol.title} loading="lazy" />
              </div>
              <div className="solution-preview-card__body">
                <h3>{sol.title}</h3>
                <p>{sol.description}</p>
                <span className="solution-preview-card__arrow">
                  View solution <i className="bi bi-arrow-right" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad bg-dark process-section--dark" aria-labelledby="process-heading">
      <div className="container-gd">
        <span className="section-eyebrow">Our process</span>
        <h2 id="process-heading" className="section-heading--spaced section-heading--on-dark">
          A clear path from strategy to results
        </h2>
        <div className="process-grid">
          {homeProcessSteps.map((step) => (
            <article className="process-card process-card--dark" key={step.title}>
              <div className="process-card__num">{step.step}</div>
              <h3 className="process-card__title">{step.title}</h3>
              <p className="process-card__text">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad">
      <div className="container-gd">
        <LargeCTA
          title={pageCtas.home.heading}
          primaryLabel={pageCtas.home.primaryCta.label}
          primaryTo={pageCtas.home.primaryCta.path}
          secondaryLabel={pageCtas.home.phoneCta.label}
          secondaryHref={pageCtas.home.phoneCta.path}
        />
      </div>
    </section>
  </>
);

export default Home;

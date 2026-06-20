import SEO from "../components/common/SEO";
import ContactCTA from "../components/common/ContactCTA";
import ImageReveal from "../components/common/ImageReveal";
import { pageSeo } from "../data/seoConfig";
import { images } from "../data/images";
import {
  aboutWhyPartnerContent,
  processSteps,
  aboutMission,
  aboutVision,
  aboutValues,
  pageCtas,
} from "../data/homeContent";
import { getBreadcrumbSchema } from "../utils/schema";

const breadcrumb = [{ label: "Home", path: "/" }, { label: "About" }];

const About = () => (
  <>
    <SEO
      title={pageSeo.about.title}
      description={pageSeo.about.description}
      path={pageSeo.about.path}
      schema={getBreadcrumbSchema(breadcrumb)}
    />

    <section className="page-hero page-hero--simple">
      <div className="container-gd">
        <div className="reveal reveal-up">
          <span className="section-eyebrow">About</span>
          <h1 className="page-title">Building digital growth with strategy and clarity</h1>
          <p>
            Divine Creators helps businesses improve online visibility, connect with the right audience and generate measurable growth through digital marketing.
          </p>
        </div>
        <div className="page-hero__media reveal reveal-up">
          <ImageReveal src={images.about.hero} alt="DIVINE CREATORS digital marketing team at work" ratio="landscape" loading="eager" />
        </div>
      </div>
    </section>

    <section className="section-pad bg-soft">
      <div className="container-gd about-intro">
        <div className="reveal reveal-up">
          <span className="section-eyebrow">Company introduction</span>
          <h2>Practical digital marketing for growing businesses</h2>
          <p>
            We combine marketing strategy, creative communication and performance analysis to help businesses build a stronger online presence.
          </p>
          <p>
            Our work starts with understanding your goals, then selecting the right channels and executing with consistency and accountability.
          </p>
        </div>
        <div className="reveal reveal-right">
        <ImageReveal src={images.about.story} alt="Modern workspace for digital marketing" ratio="standard" />
        </div>
      </div>
    </section>

    <section className="section-pad" aria-labelledby="why-partner-about">
      <div className="container-gd about-partner-grid">
        <div className="reveal reveal-up">
          <span className="section-eyebrow">Why partner with us</span>
          <h2 id="why-partner-about">{aboutWhyPartnerContent.heading}</h2>
          {aboutWhyPartnerContent.paragraphs.map((text) => (
            <p key={text.slice(0, 24)}>{text}</p>
          ))}
        </div>
        <div className="about-partner-image reveal reveal-left">
          <img
            src={images.home.whyPartner}
            alt="DIVINE CREATORS team collaboration and strategy planning"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <section className="section-pad bg-soft">
      <div className="container-gd">
        <div className="reveal reveal-up">
          <span className="section-eyebrow">Purpose</span>
        </div>
        <div className="mission-split reveal-stagger">
          <div className="mission-panel mission-panel--dark reveal reveal-up">
            <h3>{aboutMission.title}</h3>
            <p>{aboutMission.text}</p>
          </div>
          <div className="mission-panel mission-panel--light reveal reveal-up">
            <h3>{aboutVision.title}</h3>
            <p>{aboutVision.text}</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-pad">
      <div className="container-gd">
        <div className="reveal reveal-up">
          <span className="section-eyebrow">Values</span>
          <h2 className="section-heading--spaced">What guides our work</h2>
        </div>
        <div className="values-grid reveal-stagger">
          {aboutValues.map((v) => (
            <article className="value-card reveal reveal-up" key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad bg-dark process-section--dark">
      <div className="container-gd">
        <div className="reveal reveal-up">
          <span className="section-eyebrow">Process</span>
          <h2 className="section-heading--spaced section-heading--on-dark">How we work with you</h2>
        </div>
        <div className="process-row reveal-stagger">
          {processSteps.map((step) => (
            <article className="process-card process-card--dark reveal reveal-up" key={step.title}>
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
        <ContactCTA
          title={pageCtas.about.heading}
          primaryLabel={pageCtas.about.primaryCta.label}
          primaryTo={pageCtas.about.primaryCta.path}
          secondaryLabel={pageCtas.about.phoneCta.label}
          secondaryHref={pageCtas.about.phoneCta.path}
        />
      </div>
    </section>
  </>
);

export default About;

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
  whoWeWorkWith,
  faqs,
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
          <span className="section-eyebrow">About Divine Creators</span>
          <h1 className="page-title">
            Great content has the power to build trust, create influence, and drive business growth.
          </h1>
          <p>
            Our mission is to help businesses and professionals establish a strong digital presence through creative content, strategic communication, and consistent brand storytelling.
          </p>
        </div>
        <div className="page-hero__media reveal reveal-up">
          <ImageReveal src={images.about.hero} alt="Divine Creators content strategy" ratio="landscape" loading="eager" />
        </div>
      </div>
    </section>

    <section className="section-pad bg-soft">
      <div className="container-gd about-intro">
        <div className="reveal reveal-up">
          <span className="section-eyebrow">About Divine Creators</span>
          <h2>Divine Creators was founded with a simple belief:</h2>
          <p>
            Great content has the power to build trust, create influence, and drive business growth.
          </p>
          <p>
            We focus on creating meaningful content experiences that help our clients connect with the right audience and strengthen their brand over time.
          </p>
        </div>
        <div className="reveal reveal-right">
          <ImageReveal src={images.about.story} alt="Divine Creators brand storytelling" ratio="standard" />
        </div>
      </div>
    </section>

    <section className="section-pad" aria-labelledby="why-partner-about">
      <div className="container-gd about-partner-grid">
        <div className="reveal reveal-up">
          <span className="section-eyebrow">Why Choose Divine Creators?</span>
          <h2 id="why-partner-about">{aboutWhyPartnerContent.heading}</h2>
          {aboutValues.map((item) => (
            <p key={item.title}>{item.description}</p>
          ))}
        </div>
        <div className="about-partner-image reveal reveal-left">
          <img
            src={images.home.whyPartner}
            alt="Divine Creators creative storytelling"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <section className="section-pad bg-soft">
      <div className="container-gd">
        <div className="reveal reveal-up">
          <span className="section-eyebrow">About Divine Creators</span>
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
          <span className="section-eyebrow">Who We Work With</span>
          <h2 className="section-heading--spaced">Who We Work With</h2>
        </div>
        <div className="values-grid reveal-stagger">
          {whoWeWorkWith.map((name) => (
            <article className="value-card reveal reveal-up" key={name}>
              <h3>{name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad bg-dark process-section--dark">
      <div className="container-gd">
        <div className="reveal reveal-up">
          <span className="section-eyebrow">Our Process</span>
          <h2 className="section-heading--spaced section-heading--on-dark">Our Process</h2>
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
        <div className="reveal reveal-up">
          <span className="section-eyebrow">Frequently Asked Questions</span>
          <h2 className="section-heading--spaced">Frequently Asked Questions</h2>
        </div>
        <div className="values-grid reveal-stagger">
          {faqs.map((faq) => (
            <article className="value-card reveal reveal-up" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad">
      <div className="container-gd">
        <ContactCTA
          title={pageCtas.about.heading}
          subtitle="Whether you're building a personal brand, growing a business, or strengthening your online presence, we're here to help you create content that makes an impact."
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

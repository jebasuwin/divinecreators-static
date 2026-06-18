import { useEffect, useState } from "react";
import SEO from "../components/common/SEO";
import PrimaryButton from "../components/common/PrimaryButton";
import ContactCTA from "../components/common/ContactCTA";
import ImageReveal from "../components/common/ImageReveal";
import { pageSeo } from "../data/seoConfig";
import { detailedServices } from "../data/services";
import { serviceImageMap } from "../data/images";
import { pageCtas } from "../data/homeContent";
import { getBreadcrumbSchema, getServiceSchema } from "../utils/schema";

const navLabels = {
  seo: "SEO",
  "social-media-marketing": "Social",
  "paid-advertising": "Paid Ads",
  "content-marketing": "Content",
  "website-development": "Web",
  "email-marketing": "Email",
  "lead-generation": "Leads",
  "marketing-analytics": "Analytics",
  "youtube-growth-management": "YouTube",
};

const navItems = detailedServices.map((s) => ({
  id: s.id,
  label: navLabels[s.id] || s.title,
}));

const ServiceList = ({ items }) => (
  <ul className="service-list">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const Services = () => {
  const [activeNav, setActiveNav] = useState(detailedServices[0].id);
  const breadcrumb = [{ label: "Home", path: "/" }, { label: "Services" }];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -45% 0px" }
    );
    detailedServices.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        title={pageSeo.services.title}
        description={pageSeo.services.description}
        path={pageSeo.services.path}
        schema={[getBreadcrumbSchema(breadcrumb), ...detailedServices.map(getServiceSchema)]}
      />

      <section className="page-hero page-hero--simple">
        <div className="container-gd reveal reveal-up">
          <span className="section-eyebrow">Services</span>
          <h1 className="page-title">Digital marketing services that work together</h1>
          <p>
            SEO, social media, paid advertising, content, web development, email marketing, lead generation, analytics and YouTube growth management.
          </p>
        </div>
      </section>

      <nav className="service-nav" aria-label="Service sections">
        <div className="service-nav__track container-gd">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`service-nav__link ${activeNav === id ? "active" : ""}`}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {detailedServices.map((service, index) => {
        const isDark = index % 2 === 1;
        const img = serviceImageMap[service.id];

        return (
          <section
            key={service.id}
            id={service.id}
            className={`service-block ${isDark ? "service-block--dark" : ""}`}
          >
            <div className="container-gd">
              <div className={`split-section split-section--center ${index % 2 === 1 ? "split-section--reverse" : ""}`}>
                <div className={`reveal ${index % 2 === 1 ? "reveal-left" : "reveal-right"}`}>
                  <span className="section-eyebrow">
                    Service {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2>{service.title}</h2>
                  <p>{service.shortDescription}</p>
                  {service.platforms && (
                    <div className="platform-tags">
                      {service.platforms.map((p) => (
                        <span key={p} className="platform-tag">{p}</span>
                      ))}
                    </div>
                  )}
                  <h3 className="h5">What we offer</h3>
                  <ServiceList items={service.services} />
                  <PrimaryButton to="/contact" variant={isDark ? "light" : "default"}>
                    {service.cta}
                  </PrimaryButton>
                </div>
                <div className={`reveal ${index % 2 === 1 ? "reveal-right" : "reveal-left"}`}>
                <ImageReveal
                  src={img}
                  alt={service.title}
                  ratio="standard"
                />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-pad bg-soft text-center services-help-section">
        <div className="container-gd reveal reveal-up">
          <h2>Not sure which service you need?</h2>
          <p>
            Share your goals with us and we will help you identify the right marketing services for your business.
          </p>
          <PrimaryButton to="/contact">Contact Us</PrimaryButton>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-gd">
          <ContactCTA
            title={pageCtas.services.heading}
            primaryLabel={pageCtas.services.primaryCta.label}
            primaryTo={pageCtas.services.primaryCta.path}
            secondaryLabel={pageCtas.services.phoneCta.label}
            secondaryHref={pageCtas.services.phoneCta.path}
          />
        </div>
      </section>
    </>
  );
};

export default Services;

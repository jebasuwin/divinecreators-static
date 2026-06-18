import SEO from "../components/common/SEO";
import HeroSection from "../components/home/HeroSection";
import AboutPreview from "../components/home/AboutPreview";
import StatsSection from "../components/home/StatsSection";
import ServiceCard from "../components/home/ServiceCard";
import ProjectCard from "../components/home/ProjectCard";
import ProcessTimeline from "../components/home/ProcessTimeline";
import ClientStrip from "../components/home/ClientStrip";
import TestimonialSection from "../components/home/TestimonialSection";
import ContactCTA from "../components/common/ContactCTA";
import SectionHeading from "../components/common/SectionHeading";
import { pageSeo } from "../data/seoConfig";
import { solutionImageMap } from "../data/images";
import { homeSolutions } from "../data/solutions";
import { homeServices } from "../data/services";
import { homeProcessSteps, pageCtas } from "../data/homeContent";
import { getOrganizationSchema, getWebSiteSchema } from "../utils/schema";

const Home = () => (
  <>
    <SEO
      title={pageSeo.home.title}
      description={pageSeo.home.description}
      path={pageSeo.home.path}
      schema={[getOrganizationSchema(), getWebSiteSchema()]}
    />

    <HeroSection />

    <AboutPreview />

    <StatsSection />

    <section id="services-section" className="section-pad services-section-v2" aria-labelledby="services-heading">
      <div className="container-gd">
        <SectionHeading
          eyebrow="Our services"
          title="Digital marketing services for sustainable growth"
          titleId="services-heading"
        />
        <div className="services-grid-v2 reveal-stagger">
          {homeServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              index={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad portfolio-section" aria-labelledby="portfolio-heading">
      <div className="container-gd">
        <SectionHeading
          eyebrow="Featured solutions"
          title="Focused solutions for specific growth goals"
          description="Specialized marketing strategies tailored to distinct business paths and audiences."
          titleId="portfolio-heading"
        />
        <div className="portfolio-list">
          {homeSolutions.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              image={solutionImageMap[project.id]}
              index={index}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad process-section-v2" aria-labelledby="process-heading">
      <div className="container-gd">
        <SectionHeading
          eyebrow="Our process"
          title="A clear path from strategy to results"
          align="center"
          titleId="process-heading"
        />
        <ProcessTimeline steps={homeProcessSteps} />
      </div>
    </section>

    <ClientStrip />

    <TestimonialSection />

    <section className="section-pad">
      <div className="container-gd">
        <ContactCTA
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

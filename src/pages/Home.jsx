import SEO from "../components/common/SEO";
import SectionDivider from "../components/common/SectionDivider";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import AudienceChallengeSection from "../components/home/AudienceChallengeSection";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import HomeContentSections from "../components/home/HomeContentSections";
import ContactSection from "../components/home/ContactSection";
import { pageSeo } from "../data/seoConfig";
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
    <SectionDivider />

    <AudienceChallengeSection />
    <SectionDivider />

    <AboutSection />
    <SectionDivider />

    <ServicesSection />
    <SectionDivider />

    <HomeContentSections
      afterWho={(
        <>
          <SectionDivider />
          <StatsSection />
          <SectionDivider />
        </>
      )}
    />
    <SectionDivider />

    <ContactSection />
    <SectionDivider />
  </>
);

export default Home;

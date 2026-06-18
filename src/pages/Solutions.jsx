import SEO from "../components/common/SEO";
import PrimaryButton from "../components/common/PrimaryButton";
import LargeCTA from "../components/common/LargeCTA";
import ImageReveal from "../components/common/ImageReveal";
import { pageSeo } from "../data/seoConfig";
import { detailedSolutions } from "../data/solutions";
import { solutionImageMap } from "../data/images";
import { pageCtas } from "../data/homeContent";
import { getBreadcrumbSchema } from "../utils/schema";

const breadcrumb = [{ label: "Home", path: "/" }, { label: "Solutions" }];

const Solutions = () => (
  <>
    <SEO
      title={pageSeo.solutions.title}
      description={pageSeo.solutions.description}
      path={pageSeo.solutions.path}
      schema={getBreadcrumbSchema(breadcrumb)}
    />

    <section className="page-hero page-hero--simple">
      <div className="container-gd">
        <span className="section-eyebrow">Solutions</span>
        <h1 className="page-title">Focused strategies for different growth paths</h1>
        <p>
          Specialized marketing solutions for local businesses, e-commerce brands, personal branding, video marketing and YouTube growth.
        </p>
      </div>
    </section>

    {detailedSolutions.map((solution, index) => {
      const isSoft = index % 2 === 1;

      return (
        <section
          key={solution.id}
          id={solution.id}
          className={`solution-block ${isSoft ? "bg-soft" : "bg-white"}`}
        >
          <div className="container-gd">
            <div className={`solution-block__grid ${index % 2 === 1 ? "solution-block--reverse" : ""}`}>
              <ImageReveal
                src={solutionImageMap[solution.id]}
                alt={solution.title}
                ratio="standard"
              />
              <div>
                <span className="section-eyebrow">
                  Solution {String(index + 1).padStart(2, "0")}
                </span>
                <h2>{solution.title}</h2>
                <p className="solution-block__intro">
                  {solution.shortDescription}
                </p>
                {solution.suitableFor && (
                  <>
                    <h3 className="solution-block__subheading">Suitable for</h3>
                    <div className="platform-tags solution-block__tags">
                      {solution.suitableFor.map((s) => (
                        <span key={s} className="platform-tag">{s}</span>
                      ))}
                    </div>
                  </>
                )}
                <h3 className="solution-block__subheading">Services included</h3>
                <ul className="service-list solution-block__list">
                  {solution.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <PrimaryButton to="/contact">Discuss {solution.title}</PrimaryButton>
              </div>
            </div>
          </div>
        </section>
      );
    })}

    <section className="section-pad">
      <div className="container-gd">
        <LargeCTA
          title={pageCtas.solutions.heading}
          primaryLabel={pageCtas.solutions.primaryCta.label}
          primaryTo={pageCtas.solutions.primaryCta.path}
          secondaryLabel={pageCtas.solutions.phoneCta.label}
          secondaryHref={pageCtas.solutions.phoneCta.path}
        />
      </div>
    </section>
  </>
);

export default Solutions;

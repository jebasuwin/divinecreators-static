import { Link } from "react-router-dom";
import ImageReveal from "../common/ImageReveal";
import { aboutStatement, homeWhyPartnerPreview } from "../../data/homeContent";
import { images } from "../../data/images";

const AboutPreview = () => {
  const highlightKeywords = (text) => {
    let result = text;
    aboutStatement.keywords.forEach((kw) => {
      result = result.replace(kw, `<mark>${kw}</mark>`);
    });
    return result;
  };

  return (
    <section className="about-preview section-pad" aria-labelledby="about-preview-heading">
      <div className="container-gd about-preview__grid">
        <div className="about-preview__statement reveal reveal-up">
          <span className="section-heading__eyebrow">{aboutStatement.eyebrow}</span>
          <h2
            id="about-preview-heading"
            className="about-preview__title"
            dangerouslySetInnerHTML={{ __html: highlightKeywords(aboutStatement.statement) }}
          />
          <p className="about-preview__text">{homeWhyPartnerPreview.paragraph}</p>
          <Link to="/about" className="about-preview__link">
            Learn about us <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>

        <div className="about-preview__visual reveal reveal-right image-tilt">
          <ImageReveal
            src={images.home.whyPartner}
            alt="Divine Creators content strategy"
            ratio="standard"
          />
        </div>
      </div>

      <div className="container-gd">
        <div className="highlight-grid reveal-stagger">
          {homeWhyPartnerPreview.highlights.map((item) => (
            <div className="highlight-card reveal reveal-up" key={item.title}>
              <span className="highlight-card__icon">
                <i className={`bi ${item.icon}`} aria-hidden="true" />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;

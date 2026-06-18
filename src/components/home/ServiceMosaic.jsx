import { Link } from "react-router-dom";
import { images } from "../../data/images";

const mosaicData = [
  {
    num: "01",
    title: "Search Engine Optimization",
    tags: ["Keyword research", "On-page SEO", "Technical SEO"],
    link: "/services#seo",
    image: images.services.seo,
    variant: "large",
  },
  {
    num: "02",
    title: "Paid Advertising",
    tags: ["Google Ads", "Meta Ads", "ROAS"],
    link: "/services#paid-advertising",
    image: images.services.paidAds,
    variant: "tall",
  },
  {
    num: "03",
    title: "Social Media Marketing",
    tags: ["Content", "Community", "Growth"],
    link: "/services#social-media-marketing",
    image: images.services.social,
    variant: "medium",
  },
  {
    num: "04",
    title: "Content Marketing",
    tags: ["Blogs", "Copy", "Strategy"],
    link: "/services#content-marketing",
    variant: "small cream",
    desc: "Useful content that supports visibility, trust and conversions.",
  },
  {
    num: "05",
    title: "Website Design & Development",
    tags: ["Business sites", "Landing pages", "E-commerce"],
    link: "/services#website-development",
    image: images.services.web,
    variant: "wide",
  },
  {
    num: "06",
    title: "Email Marketing",
    tags: ["Automation", "Newsletters", "Nurture"],
    link: "/services#email-marketing",
    variant: "accent lime",
    desc: "Nurture leads and retain customers with targeted email campaigns.",
  },
];

const ServiceMosaic = () => (
  <div className="service-mosaic">
    {mosaicData.map((item) => {
      const variants = item.variant.split(" ");
      const hasImage = item.image && !variants.includes("cream") && !variants.includes("lime");

      return (
        <Link
          key={item.num}
          to={item.link}
          className={`mosaic-card mosaic-card--${variants[0]} ${variants[1] ? `mosaic-card--${variants[1]}` : ""}`}
        >
          {hasImage && (
            <div className="mosaic-card__bg">
              <img src={item.image} alt="" loading="lazy" />
              <div className="mosaic-card__overlay" />
            </div>
          )}
          <div className="mosaic-card__content">
            <div className="mosaic-card__num">{item.num}</div>
            <h3 className="mosaic-card__title">{item.title}</h3>
            {item.desc && <p style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "1rem" }}>{item.desc}</p>}
            <div className="mosaic-card__tags">
              {item.tags.map((tag) => (
                <span key={tag} className="mosaic-card__tag">{tag}</span>
              ))}
            </div>
            <span className="mosaic-card__arrow" aria-hidden="true">
              <i className="bi bi-arrow-up-right" />
            </span>
          </div>
        </Link>
      );
    })}
  </div>
);

export default ServiceMosaic;

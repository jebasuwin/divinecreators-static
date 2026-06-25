import { Link } from "react-router-dom";
import { images } from "../../data/images";

const mosaicData = [
  {
    num: "01",
    title: "Social Media Management",
    tags: ["Content Planning", "Content Creation", "Post Scheduling"],
    link: "/#social-media-management",
    image: images.services.social,
    variant: "large",
  },
  {
    num: "02",
    title: "LinkedIn Personal Branding",
    tags: ["Profile Optimization", "Content Strategy", "Thought Leadership Content"],
    link: "/#linkedin-personal-branding",
    image: images.services.personalBranding,
    variant: "tall",
  },
  {
    num: "03",
    title: "Video Editing & Short-Form Content",
    tags: ["Reels Editing", "Shorts Editing", "Motion Graphics"],
    link: "/#video-editing-short-form-content",
    image: images.services.video,
    variant: "medium",
  },
  {
    num: "04",
    title: "Graphic Design",
    tags: ["Social Media Creatives", "Carousel Designs", "Presentation Design"],
    link: "/#graphic-design",
    variant: "small cream",
    desc: "Create visuals that strengthen your brand identity and communicate your message effectively.",
  },
  {
    num: "05",
    title: "Content Writing & Script Development",
    tags: ["Social Media Content", "LinkedIn Posts", "Video Scripts"],
    link: "/#content-writing-script-development",
    image: images.services.content,
    variant: "wide",
  },
  {
    num: "06",
    title: "YouTube Growth Support",
    tags: ["Content Planning", "Thumbnail Design", "Channel Optimization"],
    link: "/#youtube-growth-support",
    variant: "accent lime",
    desc: "Build a stronger YouTube presence through strategic content planning and channel management.",
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

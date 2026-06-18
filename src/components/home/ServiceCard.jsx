import { useRef } from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ index, icon, title, description, link }) => {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--gx", `${x}%`);
    card.style.setProperty("--gy", `${y}%`);
  };

  return (
    <article
      ref={cardRef}
      className="service-card-v2 reveal reveal-up cursor-hover"
      onMouseMove={onMove}
    >
      <div className="service-card-v2__glow" aria-hidden="true" />
      <span className="service-card-v2__num">{String(index + 1).padStart(2, "0")}</span>
      <i className={`bi ${icon} service-card-v2__icon`} aria-hidden="true" />
      <h3 className="service-card-v2__title">{title}</h3>
      <p className="service-card-v2__text">{description}</p>
      <Link to={link} className="service-card-v2__link">
        Learn more
        <i className="bi bi-arrow-up-right" aria-hidden="true" />
      </Link>
    </article>
  );
};

export default ServiceCard;

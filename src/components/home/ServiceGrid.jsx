import { Link } from "react-router-dom";
import { homeServices } from "../../data/services";

const ServiceGrid = () => (
  <div className="service-grid reveal-stagger">
    {homeServices.map((service) => (
      <article key={service.id} className="service-card reveal reveal-up">
        <i className={`bi ${service.icon} service-card__icon`} aria-hidden="true" />
        <h3 className="service-card__title">{service.title}</h3>
        <p className="service-card__text">{service.description}</p>
        <Link to={service.link} className="service-card__link">
          Learn more <i className="bi bi-arrow-right" aria-hidden="true" />
        </Link>
      </article>
    ))}
  </div>
);

export default ServiceGrid;

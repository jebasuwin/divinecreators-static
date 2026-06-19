const ServiceVisual = ({ service }) => {
  if (!service.image) return null;

  const useContain = service.imageFit === "contain";

  return (
    <div className={`service-visual${useContain ? " service-visual--contain" : ""}`}>
      <img
        src={service.image}
        alt={service.imageAlt}
        className={useContain ? "contain-image" : undefined}
        loading="lazy"
        width={1360}
        height={1120}
        decoding="async"
      />
    </div>
  );
};

const ServiceBlock = ({ service, index, reverse, eyebrowLabel }) => {
  const isDark = index % 2 === 1;

  return (
    <div
      id={service.id}
      className={`service-block${isDark ? " service-block--alt" : ""}`}
    >
      <div className="container-xl">
        <div className={`row g-5 align-items-center${reverse ? " flex-lg-row-reverse" : ""}`} data-aos="fade-up">
          <div className="col-lg-6">
            <span className="eyebrow">{eyebrowLabel}</span>
            <h2>{service.title}</h2>
            {service.intro ? <p className="text-secondary">{service.intro}</p> : null}
            {service.platforms?.length ? (
              <>
                <h3 className="service-block__list-heading">{service.platformsLabel}</h3>
                <ul className="text-secondary small service-block__list service-block__list--platforms">
                  {service.platforms.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {service.services?.length ? (
              <>
                <h3 className="service-block__list-heading">{service.servicesLabel}</h3>
                <ul className="text-secondary small service-block__list">
                  {service.services.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
            <a href="#contact" className="btn-glow mt-3">
              Contact Us
            </a>
          </div>
          <div className="col-lg-6 service-block__visual">
            <ServiceVisual service={service} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBlock;

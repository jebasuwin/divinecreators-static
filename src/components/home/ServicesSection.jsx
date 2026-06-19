import { homeServiceGroups } from "../../data/services";
import ServiceBlock from "../services/ServiceBlock";

const serviceBlocks = homeServiceGroups.flatMap((group) =>
  group.services.map((service, groupIndex) => ({
    service,
    groupId: group.id,
    groupIndex,
  }))
);

const ServicesSection = () => (
  <section id="services" className="services-home" aria-labelledby="services-heading">
    {homeServiceGroups.map((group, groupIndex) => (
      <div key={group.id} className="services-home__group">
        <div
          className={`container-xl services-home__group-heading${groupIndex === 0 ? " services-heading" : ""}`}
          data-aos="fade-up"
        >
          {groupIndex === 0 ? (
            <span className="eyebrow section-label">Services</span>
          ) : null}
          <h2
            id={groupIndex === 0 ? "services-heading" : undefined}
            className="services-home__group-title"
          >
            {group.title}
          </h2>
        </div>

        {group.services.map((service, serviceIndex) => {
          const blockIndex = serviceBlocks.findIndex((entry) => entry.service.id === service.id);
          const reverse = blockIndex % 2 === 1;
          const eyebrowLabel = `${group.id === "specialized" ? "Specialized Service" : "Service"} ${String(serviceIndex + 1).padStart(2, "0")}`;

          return (
            <ServiceBlock
              key={service.id}
              service={service}
              index={blockIndex}
              reverse={reverse}
              eyebrowLabel={eyebrowLabel}
            />
          );
        })}
      </div>
    ))}
  </section>
);

export default ServicesSection;

import { digitalMarketingServices } from "../../data/services";
import ServiceCard from "./ServiceCard";

const ServiceGrid = () => (
  <div className="services-grid-v2">
    {digitalMarketingServices.map((service, index) => (
      <ServiceCard
        key={service.id}
        index={index}
        icon="bi-grid"
        title={service.title}
        description={service.intro}
        link={`/#${service.id}`}
      />
    ))}
  </div>
);

export default ServiceGrid;

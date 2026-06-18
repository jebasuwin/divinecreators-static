import { companyStats } from "../../data/homeContent";

const StatsSection = ({ compact = false }) => (
  <section
    className={`stats-section${compact ? " stats-section--compact" : ""}`}
    aria-label="Company statistics"
  >
    <div className="container-gd">
      <div className="stats-grid">
        {companyStats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <div className="stat-item__value">{stat.value}</div>
            <div className="stat-item__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;

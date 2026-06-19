import CountUpStat from "../common/CountUpStat";
import { companyStats } from "../../data/homeContent";

const StatsSection = () => (
  <section id="statistics" className="stats-section-v2" aria-label="Company statistics">
    <div className="container-gd">
      <div className="stats-grid-v2">
        {companyStats.map((stat, index) => (
          <div className="stat-item-v2" key={stat.label}>
            <CountUpStat
              target={stat.target}
              suffix={stat.suffix}
              decimals={stat.decimals}
              duration={stat.duration}
              delay={index * 100}
              className="stat-item-v2__value stat-value"
            />
            <div className="stat-item-v2__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;

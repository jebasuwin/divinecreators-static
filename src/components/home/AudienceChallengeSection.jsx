import { audienceChallenge } from "../../data/homeContent";

const AudienceChallengeSection = () => (
  <section id="audience" className="section-pad" aria-labelledby="audience-heading">
    <div className="container-xl">
      <div className="row g-5 align-items-center">
        <div className="col-lg-5" data-aos="fade-right">
          <span className="eyebrow">Divine Creators</span>
          <h2 id="audience-heading">{audienceChallenge.heading}</h2>
          <p className="text-secondary">{audienceChallenge.closing}</p>
          <p className="text-secondary">{audienceChallenge.note}</p>
        </div>
        <div className="col-lg-7" data-aos="fade-left">
          <div className="glass-card">
            <h3>{audienceChallenge.intro}</h3>
            <ul className="text-secondary small service-block__list">
              {audienceChallenge.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AudienceChallengeSection;

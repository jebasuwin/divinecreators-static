import { whoWeWorkWith } from "../../data/homeContent";

const ClientStrip = () => {
  const track = [...whoWeWorkWith, ...whoWeWorkWith];

  return (
    <section className="client-strip" aria-label="Who we work with">
      <div className="container-gd">
        <p className="client-strip__label reveal reveal-up">Who We Work With</p>
      </div>
      <div className="client-strip__marquee" aria-hidden="true">
        <div className="client-strip__track">
          {track.map((name, i) => (
            <span key={`${name}-${i}`} className="client-strip__logo">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientStrip;

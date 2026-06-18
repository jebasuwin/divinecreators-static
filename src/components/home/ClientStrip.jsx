const industries = [
  "E-commerce",
  "Local Services",
  "Healthcare",
  "Real Estate",
  "Coaching",
  "SaaS",
  "Creators",
  "Retail",
];

const ClientStrip = () => {
  const track = [...industries, ...industries];

  return (
    <section className="client-strip" aria-label="Industries we serve">
      <div className="container-gd">
        <p className="client-strip__label reveal reveal-up">Trusted across industries</p>
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

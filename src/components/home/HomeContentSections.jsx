import { aboutValues, processSteps, whoWeWorkWith, faqs } from "../../data/homeContent";

const HomeContentSections = ({ afterWho = null }) => (
  <>
    <section className="section-pad bg-alt" aria-labelledby="why-choose-heading">
      <div className="container-xl">
        <span className="eyebrow" data-aos="fade-up">Why Choose Divine Creators?</span>
        <h2 id="why-choose-heading" className="mb-4" data-aos="fade-up">
          Why Choose Divine Creators?
        </h2>
        <div className="row g-4">
          {aboutValues.map((item, index) => (
            <div className="col-md-6" data-aos="fade-up" data-aos-delay={index * 100} key={item.title}>
              <div className="glass-card h-100">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad" aria-labelledby="process-heading">
      <div className="container-xl">
        <span className="eyebrow" data-aos="fade-up">Our Process</span>
        <h2 id="process-heading" className="mb-4" data-aos="fade-up">Our Process</h2>
        <div className="row g-4">
          {processSteps.map((step, index) => (
            <div className="col-md-6 col-lg" data-aos="fade-up" data-aos-delay={index * 100} key={step.title}>
              <div className="glass-card h-100">
                <span className="eyebrow">{step.title}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad bg-alt" aria-labelledby="who-heading">
      <div className="container-xl">
        <span className="eyebrow" data-aos="fade-up">Who We Work With</span>
        <h2 id="who-heading" className="mb-4" data-aos="fade-up">Who We Work With</h2>
        <div className="row g-4">
          {whoWeWorkWith.map((item, index) => (
            <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay={(index % 4) * 100} key={item}>
              <div className="glass-card h-100">
                <h3>{item}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {afterWho}

    <section className="section-pad" aria-labelledby="faq-heading">
      <div className="container-xl">
        <span className="eyebrow" data-aos="fade-up">Frequently Asked Questions</span>
        <h2 id="faq-heading" className="mb-4" data-aos="fade-up">
          Frequently Asked Questions
        </h2>
        <div className="row g-4">
          {faqs.map((faq, index) => (
            <div className="col-md-6" data-aos="fade-up" data-aos-delay={index * 100} key={faq.question}>
              <div className="glass-card h-100">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default HomeContentSections;

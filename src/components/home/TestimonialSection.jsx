import { useState } from "react";
import { testimonials } from "../../data/homeContent";

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const go = (dir) => {
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  return (
    <section className="testimonial-section section-pad" aria-labelledby="testimonials-heading">
      <div className="container-gd">
        <header className="section-heading section-heading--center reveal reveal-up">
          <span className="section-heading__eyebrow">Client perspectives</span>
          <h2 id="testimonials-heading" className="section-heading__title">
            Trusted by businesses focused on growth
          </h2>
        </header>

        <div className="testimonial-slider reveal reveal-up">
          <blockquote className="testimonial-slider__quote">
            <span className="testimonial-slider__mark" aria-hidden="true">&ldquo;</span>
            <p>{current.quote}</p>
          </blockquote>
          <footer className="testimonial-slider__meta">
            <cite>{current.author}</cite>
            <span>{current.role}</span>
          </footer>

          <div className="testimonial-slider__controls">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial">
              <i className="bi bi-arrow-left" aria-hidden="true" />
            </button>
            <div className="testimonial-slider__dots" role="tablist" aria-label="Testimonials">
              {testimonials.map((t, i) => (
                <button
                  key={t.author}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1}`}
                  className={i === index ? "active" : ""}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial">
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

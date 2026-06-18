import { useEffect, useRef, useState } from "react";

const ProcessTimeline = ({ steps }) => {
  const trackRef = useRef(null);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.step);
            setActiveLine((prev) => Math.max(prev, idx));
          }
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );

    track.querySelectorAll(".process-timeline__step").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [steps]);

  return (
    <div className="process-timeline reveal reveal-up" ref={trackRef}>
      <div className="process-timeline__line" aria-hidden="true">
        <span
          className="process-timeline__line-fill"
          style={{ width: `${(activeLine / (steps.length - 1)) * 100}%` }}
        />
      </div>
      <div className="process-timeline__steps reveal-stagger">
        {steps.map((step, i) => (
          <article
            key={step.title}
            className="process-timeline__step reveal reveal-up"
            data-step={i}
          >
            <div className="process-timeline__marker">
              <span>{step.step}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProcessTimeline;

import { useEffect } from "react";

const markets = ["USA", "Canada", "Netherlands", "Nigeria", "Australia", "India"];

const StatsSection = () => {
  useEffect(() => {
    const section = document.querySelector(".proof-stats-section");
    if (!section) return undefined;

    let isActive = false;
    let frameId = 0;
    let observer;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const setInView = (visible) => {
      isActive = visible;
      section.classList.toggle("is-inview", visible);
    };

    const checkInView = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      setInView(rect.top < viewportHeight * 0.86 && rect.bottom > viewportHeight * 0.08);
    };

    checkInView();

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => setInView(entry.isIntersecting)),
        { rootMargin: "0px 0px -14% 0px", threshold: 0.08 }
      );
      observer.observe(section);
    } else {
      window.addEventListener("scroll", checkInView, { passive: true });
      window.addEventListener("resize", checkInView);
    }

    const path = section.querySelector(".proof-chart__line");
    const flow = section.querySelector(".proof-chart__flow");
    const runner = section.querySelector(".proof-chart__runner");
    if (!path || !runner || typeof path.getTotalLength !== "function") {
      return () => observer?.disconnect();
    }

    let length = 0;
    try {
      length = path.getTotalLength();
    } catch {
      length = 0;
    }
    if (!length) return () => observer?.disconnect();

    section.classList.add("motion-ready");
    const duration = reducedMotion ? 9000 : 7200;
    const dashCycle = 466;
    const startTime = performance.now();

    const render = (now) => {
      const progress = ((now - startTime) % duration) / duration;
      const point = path.getPointAtLength(progress * length);
      runner.setAttribute("cx", point.x.toFixed(2));
      runner.setAttribute("cy", point.y.toFixed(2));
      if (flow) flow.style.strokeDashoffset = String(-(progress * dashCycle));
      runner.style.opacity = isActive ? "1" : "0.48";
      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", checkInView);
      window.removeEventListener("resize", checkInView);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
  <section id="statistics" className="section-pad proof-stats-section" aria-labelledby="statistics-heading">
    <div className="container-gd">
      <div className="proof-stats-heading scroll-soft">
        <h2 id="statistics-heading">Statistics</h2>
      </div>
      <div className="proof-stats-layout">
        <div className="proof-stats-copy scroll-soft">
          <h3>Worked with more than 50+ clients and 70+ channels.</h3>
          <p>Clients from USA, Canada, Netherlands, Nigeria, Australia, and India.</p>
          <div className="proof-stat-cards" aria-label="Divine Creators statistics">
            <article className="proof-stat-card" style={{ "--i": 0 }}>
              <span>Clients</span>
              <strong>50+</strong>
            </article>
            <article className="proof-stat-card" style={{ "--i": 1 }}>
              <span>Channels</span>
              <strong>70+</strong>
            </article>
            <article className="proof-stat-card" style={{ "--i": 2 }}>
              <span>Markets</span>
              <strong>6</strong>
            </article>
          </div>
        </div>

        <div className="proof-analytics-card scroll-soft" aria-label="Animated statistics graphic">
          <div className="proof-analytics-card__top">
            <span className="proof-analytics-card__title">Client Growth</span>
            <span className="proof-analytics-card__status">Live Reach</span>
          </div>

          <div className="proof-analytics-card__metrics">
            <div>
              <span>Clients</span>
              <strong>50+</strong>
            </div>
            <div>
              <span>Channels</span>
              <strong>70+</strong>
            </div>
          </div>

          <div className="proof-chart" aria-hidden="true">
            <span className="proof-chart__grid" />
            <svg viewBox="0 0 520 250" role="img" focusable="false">
              <path className="proof-chart__area" d="M28 214 C88 190 116 164 154 128 C196 88 236 100 278 74 C328 42 374 56 422 38 C464 22 492 24 508 20 L508 224 L28 224 Z" />
              <path id="proofGrowthPathReact" className="proof-chart__line" d="M28 214 C88 190 116 164 154 128 C196 88 236 100 278 74 C328 42 374 56 422 38 C464 22 492 24 508 20" />
              <path className="proof-chart__flow" d="M28 214 C88 190 116 164 154 128 C196 88 236 100 278 74 C328 42 374 56 422 38 C464 22 492 24 508 20" />
              <g className="proof-chart__points">
                <circle cx="28" cy="214" r="5" />
                <circle cx="154" cy="128" r="5" />
                <circle cx="278" cy="74" r="5" />
                <circle cx="422" cy="38" r="5" />
                <circle cx="508" cy="20" r="5" />
              </g>
              <circle className="proof-chart__runner" cx="28" cy="214" r="5.5" />
            </svg>
            <div className="proof-chart__labels">
              <span>Start</span>
              <span>Growth</span>
              <span>Now</span>
            </div>
          </div>

          <div className="proof-market-row" aria-label="Client markets">
            {markets.map((market) => (
              <span key={market}>{market}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default StatsSection;

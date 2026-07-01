/* DIVINECREATORS — Main script */
(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 575px)").matches;
  const revealAosElements = (scope = document) => {
    scope.querySelectorAll("[data-aos]").forEach((el) => {
      el.classList.add("aos-init", "aos-animate");
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.visibility = "visible";
    });
  };
  const aosCanAnimate = () => false;
  const syncAosElements = (scope = document) => {
    if (aosCanAnimate()) {
      if (typeof AOS.refreshHard === "function") AOS.refreshHard();
      else AOS.refresh();
      return;
    }
    revealAosElements(scope);
  };
  const smoothBehavior = "smooth";

  const setupScrollEffects = () => {
    const revealNodes = Array.from(document.querySelectorAll([
      ".stat-box",
      ".about-section__content",
      ".about-section__visual",
      ".services-home__group-heading",
      ".service-block .row",
      ".contact-section__intro",
      ".contact-info-card",
      ".contact-form-card",
      ".site-footer__grid > *",
    ].join(",")));
    const textSelector = [
      "main h1",
      "main h2",
      "main h3",
      "main h4",
      "main h5",
      "main h6",
      "main p",
      "main li",
      "main label",
      "main button",
      "main .eyebrow",
      "main .btn-glow",
      "main .btn-outline-glow",
      "main .stat-box__value",
      "main .stat-box__label",
      "main .contact-info-card__label",
      "main .contact-detail-label",
      "main .contact-detail-value",
      "main .contact-form-card__label",
      "footer h6",
      "footer p",
      "footer li",
      "footer .brand-logo span",
      "footer .site-footer__copy",
    ].join(",");
    const ignoredTextContainers = [
      ".hero-motion-graphic",
      ".about-dashboard-viz",
      ".service-block__visual",
      ".service-visual",
      ".service-scene",
      ".motion-graphic",
      ".circuit-motion-graphic",
      ".blob-motion-graphic",
      ".aurora-motion-graphic",
      ".work-with-section",
      ".faq-section",
      "canvas",
      "svg",
      "picture",
      "video",
    ].join(",");
    const textNodes = Array.from(document.querySelectorAll(textSelector))
      .filter((el) => el.textContent.trim().length > 0)
      .filter((el) => !el.closest(".hero"))
      .filter((el) => !el.closest(ignoredTextContainers));

    if (!revealNodes.length && !textNodes.length) return;

    revealNodes.forEach((el, index) => {
      el.classList.add("scroll-soft");
      el.style.setProperty("--scroll-soft-delay", `${Math.min((index % 4) * 28, 84)}ms`);
    });

    const classifyTextNode = (el) => {
      const isServiceText = Boolean(el.closest(".service-block, .services-home__group-heading"));
      const isHeading = el.matches("h1, h2, h3, h4, h5, h6, .eyebrow, .section-label");
      const isItem = el.matches("li");
      const isAction = el.matches("a, button, .btn-glow, .btn-outline-glow");

      el.classList.add("scroll-text");
      if (isHeading) el.classList.add("scroll-text--heading");
      else if (isItem) el.classList.add("scroll-text--item");
      else if (isAction) el.classList.add("scroll-text--action");
      else el.classList.add("scroll-text--body");

      if (!isServiceText) return;

      el.classList.add("scroll-text--service");
      if (isHeading) el.classList.add("scroll-text--service-heading");
      else if (isItem) el.classList.add("scroll-text--service-item");
      else if (isAction) el.classList.add("scroll-text--service-action");
      else el.classList.add("scroll-text--service-body");
    };

    textNodes.forEach((el, index) => {
      classifyTextNode(el);
      const isServiceText = Boolean(el.closest(".service-block, .services-home__group-heading"));
      const delayStep = isServiceText ? 36 : 24;
      const maxDelay = isServiceText ? 180 : 120;
      el.style.setProperty("--scroll-text-delay", `${Math.min((index % 6) * delayStep, maxDelay)}ms`);
    });

    const isVisible = (el, before = 0.98, after = -0.08) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * before && rect.bottom > window.innerHeight * after;
    };

    const activateVisible = () => {
      revealNodes.forEach((el) => {
        el.classList.toggle("is-inview", isVisible(el, 1.12, -0.14));
      });
      textNodes.forEach((el) => {
        el.classList.toggle("is-inview", isVisible(el));
      });
    };

    activateVisible();

    if (!("IntersectionObserver" in window)) {
      window.addEventListener("scroll", activateVisible, { passive: true });
      window.addEventListener("resize", activateVisible);
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-inview", entry.isIntersecting);
        });
      },
      { rootMargin: "18% 0px 18% 0px", threshold: 0.01 }
    );

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-inview", entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );

    revealNodes.forEach((el) => revealObserver.observe(el));
    textNodes.forEach((el) => textObserver.observe(el));
    requestAnimationFrame(activateVisible);
  };

  const setupWorkWithScrollEffects = () => {
    const section = document.querySelector(".work-with-section");
    if (!section) return;

    const isVisible = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      return rect.top < viewportHeight * 0.96 && rect.bottom > viewportHeight * 0.04;
    };

    const update = () => {
      section.classList.toggle("is-inview", isVisible());
    };

    update();

    if (!("IntersectionObserver" in window)) {
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-inview", entry.isIntersecting);
        });
      },
      { rootMargin: "18% 0px 18% 0px", threshold: 0.01 }
    );

    observer.observe(section);
  };

  const setupProofStatsEffects = () => {
    const section = document.querySelector(".proof-stats-section");
    if (!section) return;

    let isActive = false;
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
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => setInView(entry.isIntersecting));
        },
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
    if (!path || !runner || typeof path.getTotalLength !== "function") return;

    let length = 0;
    try {
      length = path.getTotalLength();
    } catch (error) {
      length = 0;
    }
    if (!length) return;

    section.classList.add("motion-ready");
    if (mobile) return;

    const duration = reducedMotion ? 9000 : 7200;
    const dashCycle = 466;
    const startTime = performance.now();

    const render = (now) => {
      const progress = ((now - startTime) % duration) / duration;
      const point = path.getPointAtLength(progress * length);
      runner.setAttribute("cx", point.x.toFixed(2));
      runner.setAttribute("cy", point.y.toFixed(2));

      if (flow) {
        flow.style.strokeDashoffset = String(-(progress * dashCycle));
      }

      if (!isActive) {
        runner.style.opacity = "0.48";
      } else {
        runner.style.opacity = "1";
      }

      window.requestAnimationFrame(render);
    };

    window.requestAnimationFrame(render);
  };

  const setupFaqAccordion = () => {
    const section = document.querySelector(".faq-section");
    const list = document.querySelector("[data-faq-list]");
    if (!section || !list) return;

    const items = Array.from(list.querySelectorAll(".faq-item"));

    const setPanelHeight = (item, open) => {
      const panel = item.querySelector(".faq-item__panel");
      if (!panel) return;
      panel.style.maxHeight = open ? `${panel.scrollHeight}px` : "0px";
    };

    const closeItem = (item) => {
      const button = item.querySelector("[data-faq-toggle]");
      const panel = item.querySelector(".faq-item__panel");
      item.classList.remove("is-open");
      if (button) button.setAttribute("aria-expanded", "false");
      if (panel) panel.setAttribute("aria-hidden", "true");
      setPanelHeight(item, false);
    };

    const openItem = (item) => {
      const button = item.querySelector("[data-faq-toggle]");
      const panel = item.querySelector(".faq-item__panel");
      item.classList.add("is-open");
      if (button) button.setAttribute("aria-expanded", "true");
      if (panel) panel.setAttribute("aria-hidden", "false");
      setPanelHeight(item, true);
    };

    items.forEach((item) => {
      const button = item.querySelector("[data-faq-toggle]");
      closeItem(item);

      if (!button) return;
      button.addEventListener("click", () => {
        const shouldOpen = !item.classList.contains("is-open");
        items.forEach((other) => {
          if (other !== item) closeItem(other);
        });
        if (shouldOpen) openItem(item);
        else closeItem(item);
      });
    });

    let enteringTimer = null;
    const setInView = (visible) => {
      if (enteringTimer) {
        window.clearTimeout(enteringTimer);
        enteringTimer = null;
      }

      if (!visible) {
        section.classList.remove("is-inview", "is-entering");
        return;
      }

      section.classList.add("is-inview", "is-entering");
      enteringTimer = window.setTimeout(() => {
        section.classList.remove("is-entering");
        enteringTimer = null;
      }, 360);
    };

    if (!("IntersectionObserver" in window)) {
      setInView(true);
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setInView(entry.isIntersecting);
          });
        },
        { rootMargin: "18% 0px 18% 0px", threshold: 0.01 }
      );

      observer.observe(section);
    }

    window.addEventListener("resize", () => {
      items.forEach((item) => {
        if (item.classList.contains("is-open")) setPanelHeight(item, true);
      });
    }, { passive: true });
  };

  const setupAudienceScrollEffects = () => {
    const section = document.querySelector(".audience-section");
    if (!section) return;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const setFinalState = () => {
      section.classList.add("is-inview");
      section.style.setProperty("--audience-copy-y", "0px");
      section.style.setProperty("--audience-copy-opacity", "1");
      section.style.setProperty("--audience-flow-y", "0px");
      section.style.setProperty("--audience-flow-scale", "1");
      section.style.setProperty("--audience-flow-tilt", "0deg");
      section.style.setProperty("--audience-flow-opacity", "1");
      section.style.setProperty("--audience-highlight-reveal", "1");
      section.style.setProperty("--audience-highlight-width", "100%");
      section.style.setProperty("--audience-line-opacity", "0.24");
      section.style.setProperty("--audience-line-shift", "0%");
      section.style.setProperty("--audience-sweep-x", "34%");
    };

    if (reducedMotion) {
      setFinalState();
      return;
    }

    if (mobile) {
      setFinalState();
      return;
    }

    let ticking = false;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const progress = clamp(
        (viewportHeight * 0.86 - rect.top) / (viewportHeight * 0.78 + Math.min(rect.height, viewportHeight * 0.45)),
        0,
        1
      );
      const eased = 1 - Math.pow(1 - progress, 3);
      const isInView = rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * 0.14;

      section.classList.toggle("is-inview", isInView);
      section.style.setProperty("--audience-copy-y", `${(1 - eased) * 18}px`);
      section.style.setProperty("--audience-copy-opacity", `${0.74 + eased * 0.26}`);
      section.style.setProperty("--audience-flow-y", `${(1 - eased) * 28}px`);
      section.style.setProperty("--audience-flow-scale", `${0.96 + eased * 0.04}`);
      section.style.setProperty("--audience-flow-tilt", `${(1 - eased) * -4}deg`);
      section.style.setProperty("--audience-flow-opacity", `${0.78 + eased * 0.22}`);
      section.style.setProperty("--audience-highlight-reveal", `${clamp(eased * 1.18, 0, 1)}`);
      section.style.setProperty("--audience-highlight-width", `${clamp(eased * 112, 0, 100)}%`);
      section.style.setProperty("--audience-line-opacity", `${0.12 + eased * 0.16}`);
      section.style.setProperty("--audience-line-shift", `${-18 + eased * 36}%`);
      section.style.setProperty("--audience-sweep-x", `${-78 + eased * 112}%`);
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  };

  const setupAudienceLiveMotion = () => {
    const section = document.querySelector(".audience-section");
    const flow = section?.querySelector(".audience-flow");
    if (!section || !flow || !window.requestAnimationFrame) return;

    if (mobile) return;

    section.classList.add("audience-motion-live");

    const studio = flow.querySelector(".audience-flow__studio");
    const phone = flow.querySelector(".audience-flow__phone");
    const insight = flow.querySelector(".audience-flow__panel--insight");
    const response = flow.querySelector(".audience-flow__panel--response");
    const trail = flow.querySelector(".audience-flow__trail");
    const trailDot = flow.querySelector(".audience-flow__trail span");
    const signals = Array.from(flow.querySelectorAll(".audience-flow__signal"));
    const chips = Array.from(flow.querySelectorAll(".audience-flow__chip"));
    const lines = Array.from(flow.querySelectorAll(".audience-flow__lines span"));

    const orbitDots = [0, 1].map((index) => {
      const dot = document.createElement("span");
      dot.className = `audience-flow__orbital audience-flow__orbital--${index + 1}`;
      dot.setAttribute("aria-hidden", "true");
      flow.appendChild(dot);
      return dot;
    });

    let active = false;
    let frameId = null;
    let start = performance.now();

    const animate = (now) => {
      const time = (now - start) / 1000;
      const flowWidth = flow.clientWidth || 570;
      const trailWidth = trail?.clientWidth || flowWidth * 0.86;
      const orbitRadius = Math.min(flowWidth * 0.24, 150);

      flow.style.setProperty("--audience-grid-x", `${(time * 9) % 38}px`);
      flow.style.setProperty("--audience-grid-y", `${(time * 6) % 38}px`);
      flow.style.setProperty("--audience-live-sweep", `${-58 + ((time * 30) % 145)}%`);

      if (studio) {
        studio.style.transform = `translate3d(${Math.sin(time * 0.72) * 8}px, ${Math.cos(time * 0.78) * -6}px, 0)`;
      }

      if (phone) {
        const phoneLift = Math.sin(time * 1.3) * -7;
        const phoneScale = 1 + Math.cos(time * 1.05) * 0.024;
        phone.style.transform = `translate3d(${Math.cos(time * 0.9) * 4}px, ${phoneLift}px, 0) scale(${phoneScale})`;
      }

      if (insight) {
        insight.style.transform = `translate3d(${Math.sin(time * 0.82) * -7}px, ${Math.cos(time * 0.95) * 5}px, 0)`;
      }

      if (response) {
        response.style.transform = `translate3d(${Math.cos(time * 0.76) * 7}px, ${Math.sin(time * 0.9) * -5}px, 0)`;
      }

      if (trailDot) {
        const dotProgress = (time * 0.32) % 1;
        trailDot.style.left = "0";
        trailDot.style.transform = `translate3d(${dotProgress * Math.max(trailWidth - 9, 0)}px, 0, 0)`;
        trailDot.style.opacity = dotProgress > 0.08 && dotProgress < 0.92 ? "1" : "0";
      }

      signals.forEach((signal, index) => {
        const pulse = (Math.sin(time * 1.2 + index * Math.PI) + 1) / 2;
        signal.style.transform = `translateX(-50%) scale(${0.84 + pulse * 0.24})`;
        signal.style.opacity = String(0.18 + pulse * 0.28);
      });

      chips.forEach((chip, index) => {
        chip.style.transform = `translate3d(${Math.sin(time * 0.95 + index) * 5}px, ${Math.cos(time * 1.08 + index * 0.8) * -7}px, 0)`;
      });

      lines.forEach((line, index) => {
        const wave = (Math.sin(time * 2.1 + index * 0.72) + 1) / 2;
        line.style.transform = `scaleX(${0.62 + wave * 0.38})`;
        line.style.opacity = String(0.58 + wave * 0.38);
      });

      orbitDots.forEach((dot, index) => {
        const angle = time * (index ? -0.72 : 0.9) + index * Math.PI;
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius * 0.72;
        dot.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`;
        dot.style.opacity = String(0.28 + ((Math.sin(time * 1.4 + index) + 1) / 2) * 0.72);
      });

      if (active && !document.hidden) {
        frameId = requestAnimationFrame(animate);
      } else {
        frameId = null;
      }
    };

    const startLoop = () => {
      if (active && frameId !== null) return;
      active = true;
      start = performance.now();
      frameId = requestAnimationFrame(animate);
    };

    const stopLoop = () => {
      active = false;
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) startLoop();
          else stopLoop();
        },
        { rootMargin: "18% 0px 18% 0px", threshold: 0.01 }
      );
      observer.observe(section);
    } else {
      startLoop();
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopLoop();
      else startLoop();
    });
  };

  const setupWhyChooseScrollEffects = () => {
    const section = document.querySelector(".why-choose-section");
    if (!section) return;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const setFinalState = () => {
      section.classList.add("is-inview");
      section.style.setProperty("--why-copy-y", "0px");
      section.style.setProperty("--why-copy-opacity", "1");
      section.style.setProperty("--why-card-y", "0px");
      section.style.setProperty("--why-card-opacity", "1");
      section.style.setProperty("--why-viz-y", "0px");
      section.style.setProperty("--why-viz-scale", "1");
      section.style.setProperty("--why-viz-opacity", "1");
      section.style.setProperty("--why-glow-opacity", "0.95");
      section.style.setProperty("--why-line-opacity", "0.24");
    };

    if (reducedMotion) {
      setFinalState();
      return;
    }

    if (mobile) {
      setFinalState();
      return;
    }

    let ticking = false;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const progress = clamp(
        (viewportHeight * 0.9 - rect.top) / (viewportHeight * 0.82 + Math.min(rect.height, viewportHeight * 0.45)),
        0,
        1
      );
      const eased = 1 - Math.pow(1 - progress, 3);
      const isInView = rect.top < viewportHeight * 0.88 && rect.bottom > viewportHeight * 0.12;

      section.classList.toggle("is-inview", isInView);
      section.style.setProperty("--why-copy-y", `${(1 - eased) * 30}px`);
      section.style.setProperty("--why-copy-opacity", `${0.5 + eased * 0.5}`);
      section.style.setProperty("--why-card-y", `${(1 - eased) * 38}px`);
      section.style.setProperty("--why-card-opacity", `${0.38 + eased * 0.62}`);
      section.style.setProperty("--why-viz-y", `${(1 - eased) * 42}px`);
      section.style.setProperty("--why-viz-scale", `${0.9 + eased * 0.1}`);
      section.style.setProperty("--why-viz-opacity", `${0.42 + eased * 0.58}`);
      section.style.setProperty("--why-glow-opacity", `${0.3 + eased * 0.65}`);
      section.style.setProperty("--why-line-opacity", `${0.06 + eased * 0.18}`);
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  };

  const setupWhyChooseLiveMotion = () => {
    const section = document.querySelector(".why-choose-section");
    const viz = section?.querySelector(".why-choose-viz");
    if (!section || !viz || !window.requestAnimationFrame) return;

    section.classList.add("why-choose-motion-live");
    if (mobile) return;

    const motionScale = reducedMotion ? 0.42 : 1;

    const hub = viz.querySelector(".why-choose-viz__hub");
    const outerRing = viz.querySelector(".why-choose-viz__ring--outer");
    const innerRing = viz.querySelector(".why-choose-viz__ring--inner");
    const signals = Array.from(viz.querySelectorAll(".why-choose-viz__signal"));
    const beams = Array.from(viz.querySelectorAll(".why-choose-viz__beam"));
    const nodes = Array.from(viz.querySelectorAll(".why-choose-viz__node"));
    const metrics = Array.from(viz.querySelectorAll(".why-choose-viz__metric"));

    const orbitDots = [0, 1, 2].map((index) => {
      const existingDot = viz.querySelector(`.why-choose-viz__orbital--${index + 1}`);
      if (existingDot) return existingDot;
      const dot = document.createElement("span");
      dot.className = `why-choose-viz__orbital why-choose-viz__orbital--${index + 1}`;
      dot.setAttribute("aria-hidden", "true");
      viz.appendChild(dot);
      return dot;
    });

    let active = false;
    let frameId = null;
    let start = performance.now();

    const animate = (now) => {
      const time = (now - start) / 1000;
      const width = viz.clientWidth || 440;
      const orbitRadius = Math.min(width * 0.31, 148) * motionScale;

      viz.style.setProperty("--why-viz-grid-x", `${(time * 10 * motionScale) % 34}px`);
      viz.style.setProperty("--why-viz-grid-y", `${(time * 7 * motionScale) % 34}px`);
      viz.style.setProperty("--why-viz-sheen-x", `${-80 + ((time * 28 * motionScale) % 170)}%`);

      if (outerRing) {
        outerRing.style.transform = `translate(-50%, -50%) rotate(${time * 13 * motionScale}deg)`;
      }

      if (innerRing) {
        innerRing.style.transform = `translate(-50%, -50%) rotate(${-time * 18 * motionScale}deg)`;
      }

      if (hub) {
        const hubY = Math.sin(time * 1.1) * -8 * motionScale;
        const hubScale = 1 + Math.cos(time * 1.35) * 0.025 * motionScale;
        hub.style.transform = `translate(-50%, -50%) translate3d(${Math.cos(time * 0.8) * 3 * motionScale}px, ${hubY}px, 0) scale(${hubScale})`;
      }

      signals.forEach((signal, index) => {
        const pulse = (Math.sin(time * 1.55 + index * Math.PI) + 1) / 2;
        signal.style.transform = `translate(-50%, -50%) scale(${0.74 + pulse * 0.44 * motionScale})`;
        signal.style.opacity = String(0.08 + pulse * 0.42 * motionScale);
      });

      beams.forEach((beam, index) => {
        const direction = index ? -1 : 1;
        const speed = index ? 22 : 30;
        const opacityWave = (Math.sin(time * 1.4 + index * 1.8) + 1) / 2;
        beam.style.transform = `rotate(${direction * time * speed * motionScale}deg) translateY(-22px)`;
        beam.style.opacity = String(0.08 + opacityWave * 0.26 * motionScale);
      });

      nodes.forEach((node, index) => {
        const x = Math.sin(time * 0.92 + index * 1.15) * 7 * motionScale;
        const y = Math.cos(time * 1.08 + index * 0.8) * -9 * motionScale;
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      metrics.forEach((metric, index) => {
        const y = Math.sin(time * 0.88 + index * 1.7) * -8 * motionScale;
        const x = Math.cos(time * 0.7 + index) * 4 * motionScale;
        metric.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        const bar = metric.querySelector("i");
        const wave = (Math.sin(time * 2 + index * 1.35) + 1) / 2;
        bar?.style.setProperty("--why-metric-fill", `${56 + wave * 38 * motionScale}%`);
      });

      orbitDots.forEach((dot, index) => {
        const angle = time * (index === 1 ? -0.95 : 0.78 + index * 0.12) + index * 2.1;
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius * 0.76;
        dot.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`;
        dot.style.opacity = String(0.22 + ((Math.sin(time * 1.25 + index) + 1) / 2) * 0.7);
      });

      if (active && !document.hidden) {
        frameId = requestAnimationFrame(animate);
      } else {
        frameId = null;
      }
    };

    const startLoop = () => {
      if (active && frameId !== null) return;
      active = true;
      start = performance.now();
      frameId = requestAnimationFrame(animate);
    };

    const stopLoop = () => {
      active = false;
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    startLoop();

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) startLoop();
          else stopLoop();
        },
        { rootMargin: "20% 0px 20% 0px", threshold: 0.01 }
      );
      observer.observe(section);
    } else {
      startLoop();
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopLoop();
      else startLoop();
    });
  };

  /* ─── Navbar scroll ─── */
  const nav = document.querySelector(".site-nav");
  const onScroll = () => {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ─── Mobile menu ─── */
  const drawer = document.getElementById("mobileDrawer");
  const openBtn = document.querySelector("[data-menu-open]");
  const closeBtns = document.querySelectorAll("[data-menu-close]");

  const openMenu = () => {
    if (!drawer) return;
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    if (!drawer) return;
    drawer.classList.remove("open");
    document.body.style.overflow = "";
  };

  openBtn?.addEventListener("click", openMenu);
  closeBtns.forEach((btn) => btn.addEventListener("click", closeMenu));

  /* ─── Active nav link ─── */
  const projectBasePath = "/divinecreators-static";
  const path = window.location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
  const siteBasePath = path === projectBasePath || path.startsWith(`${projectBasePath}/`) ? projectBasePath : "";
  const isHomePage =
    path === "/" ||
    path === "/index" ||
    (siteBasePath && (path === siteBasePath || path === `${siteBasePath}/index`));

  /* ─── Hash navigation ─── */
  const scrollToHash = (hash, behavior = smoothBehavior) => {
    const id = (hash || "").replace(/^#/, "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior, block: "start" });
  };

  const getHashFromHref = (href) => {
    if (!href) return "";
    if (siteBasePath && href.startsWith(`${siteBasePath}/#`)) return href.slice(siteBasePath.length + 1);
    if (href.startsWith("./#")) return href.slice(1);
    if (href.startsWith("/#")) return href.slice(1);
    if (href.startsWith("#")) return href;
    return "";
  };

  document.querySelectorAll(".site-nav__link, .mobile-drawer__link, .site-footer__links a, .hero__actions a, .btn-glow").forEach((link) => {
    const hash = getHashFromHref(link.getAttribute("href"));
    if (!hash || hash === "#main") return;

    link.addEventListener("click", (e) => {
      closeMenu();
      if (isHomePage) {
        e.preventDefault();
        scrollToHash(hash);
        if (window.location.hash !== hash) {
          history.pushState(null, "", hash);
        }
      }
    });
  });

  document.querySelectorAll(".site-nav__link, .mobile-drawer__link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto")) return;
    if (getHashFromHref(href)) return;
    const linkPath = href.replace(/\.html$/, "").replace(/\/$/, "").replace(/#.*$/, "") || "/";
    if (linkPath === path) link.classList.add("active");
  });

  const handleInitialHash = () => {
    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash));
    }
  };

  if (document.readyState === "complete") {
    handleInitialHash();
  } else {
    window.addEventListener("load", handleInitialHash, { once: true });
  }

  window.addEventListener("hashchange", () => {
    if (window.location.hash) scrollToHash(window.location.hash);
  });

  /* ─── About section reveal ─── */
  const aboutRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        aboutRevealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
  );
  document.querySelectorAll("[data-about-reveal]").forEach((el) => aboutRevealObserver.observe(el));

  /* ─── AOS ─── */
  if (aosCanAnimate()) {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: reducedMotion,
    });
  } else {
    revealAosElements();
  }

  /* ─── Render homepage services ─── */
  if (typeof HomeServices !== "undefined") {
    HomeServices.renderHomeServices();
    if (aosCanAnimate()) {
      AOS.refresh();
      window.setTimeout(() => {
        document.querySelectorAll(".services-home [data-aos]:not(.aos-animate)").forEach((el) => {
          el.classList.add("aos-animate");
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }, 2500);
    } else {
      revealAosElements(document.querySelector(".services-home") || document);
    }
  }

  /* ─── Section nav active state ─── */
  const navSectionLinks = document.querySelectorAll("[data-nav-section]");
  const SECTION_MAP = [
    { id: "home", nav: "home" },
    { id: "statistics", nav: "home" },
    { id: "about", nav: "about" },
    { id: "services", nav: "services" },
    { id: "contact", nav: "contact" },
  ];
  const HOME_SCROLL_FALLBACK = 160;
  const PROBE_OFFSET = 24;

  const getNavbarHeight = () => {
    const navbar = document.querySelector(".site-nav") || document.querySelector("header");
    return navbar?.getBoundingClientRect().height ?? 72;
  };

  const calculateActiveSection = () => {
    if (window.scrollY < HOME_SCROLL_FALLBACK) return "home";

    const navbarHeight = getNavbarHeight();
    const probeY = window.scrollY + navbarHeight + PROBE_OFFSET;
    let nextActive = "home";

    for (const section of SECTION_MAP) {
      const element = document.getElementById(section.id);
      if (!element) continue;

      const sectionTop = window.scrollY + element.getBoundingClientRect().top;
      const sectionBottom = sectionTop + element.offsetHeight;

      if (probeY >= sectionTop && probeY < sectionBottom) {
        nextActive = section.nav;
        break;
      }
    }

    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 12;

    if (nearBottom) return "contact";

    return nextActive;
  };

  const applyActiveSection = (activeId) => {
    navSectionLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("data-nav-section") === activeId);
    });
  };

  if (navSectionLinks.length) {
    let navFrameId = null;

    const updateActiveSection = () => {
      applyActiveSection(calculateActiveSection());
    };

    const onNavScroll = () => {
      if (navFrameId !== null) return;
      navFrameId = requestAnimationFrame(() => {
        updateActiveSection();
        navFrameId = null;
      });
    };

    navSectionLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const sectionId = link.getAttribute("data-nav-section");
        if (sectionId) applyActiveSection(sectionId);
      });
    });

    updateActiveSection();
    window.addEventListener("scroll", onNavScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", () => {
      window.setTimeout(updateActiveSection, 100);
      window.setTimeout(updateActiveSection, 450);
    });
  }

  /* ─── GSAP hero timeline ─── */
  const heroTl = () => {
    if (typeof gsap === "undefined" || reducedMotion || mobile) return;

    const visibleHeroCopy = ".hero__eyebrow, .hero__title, .hero__subtitle, .hero__actions";
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    gsap.set(visibleHeroCopy, { opacity: 1, visibility: "visible" });
    tl.from(".brand-logo", { y: 20, duration: 0.6 })
      .from(".hero__eyebrow", { y: 16, duration: 0.5 }, "-=0.3")
      .from(".hero__title", { y: 24, duration: 0.6 }, "-=0.2")
      .from(".hero__subtitle", { y: 20, duration: 0.55 }, "-=0.25")
      .from(".hero__actions .btn-glow", { y: 24, scale: 0.92, duration: 0.5 }, "-=0.2")
      .from(".hero__actions .btn-outline-glow", { y: 24, duration: 0.45 }, "-=0.4")
      .from(".hero-motion-graphic", { scale: 0.88, duration: 0.7 }, "-=0.5");
  };

  if (document.querySelector(".hero")) {
    heroTl();
  }

  /* ─── Homepage statistics ─── */
  const formatStatValue = (value, decimals, suffix) => {
    const num = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
    return `${num}${suffix}`;
  };

  const HOME_STATS = [];

  const renderHomeStats = () => {
    const row = document.querySelector("[data-home-stats]");
    if (!row) return;
    row.innerHTML = HOME_STATS.map((stat, index) => `
      <div class="col-12 col-md-6 col-lg-3" data-aos="fade-up"${index ? ` data-aos-delay="${index * 100}"` : ""}>
        <div class="stat-box h-100">
          <div
            class="stat-box__value stat-value"
            data-stat-target="${stat.target}"
            data-stat-suffix="${stat.suffix}"
            data-stat-decimals="${stat.decimals}"
            data-stat-duration="${stat.duration}"
            data-stat-delay="${index * 100}"
          >${formatStatValue(0, stat.decimals, stat.suffix)}</div>
          <div class="stat-box__label">${stat.label}</div>
        </div>
      </div>
    `).join("");
  };

  renderHomeStats();
  syncAosElements(document.querySelector(".section-stats") || document);
  setupScrollEffects();
  setupWorkWithScrollEffects();
  setupProofStatsEffects();
  setupFaqAccordion();
  setupAudienceScrollEffects();
  setupAudienceLiveMotion();
  setupWhyChooseScrollEffects();
  setupWhyChooseLiveMotion();

  const animatedStatElements = new WeakSet();

  const animateStatValue = (el) => {
    if (animatedStatElements.has(el)) return;
    animatedStatElements.add(el);

    const target = parseFloat(el.dataset.statTarget);
    const suffix = el.dataset.statSuffix || "";
    const decimals = parseInt(el.dataset.statDecimals || "0", 10);
    const duration = parseInt(el.dataset.statDuration || "1500", 10);
    const delay = parseInt(el.dataset.statDelay || "0", 10);

    if (Number.isNaN(target)) return;

    if (reducedMotion) {
      el.textContent = formatStatValue(target, decimals, suffix);
      return;
    }

    const startTime = performance.now() + delay;

    const step = (now) => {
      if (now < startTime) {
        requestAnimationFrame(step);
        return;
      }

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = target * eased;

      el.textContent = formatStatValue(current, decimals, suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatStatValue(target, decimals, suffix);
      }
    };

    requestAnimationFrame(step);
  };

  const statsSection = document.querySelector(".section-stats");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        statsSection.querySelectorAll("[data-stat-target]").forEach(animateStatValue);
        statsObserver.disconnect();
      },
      { threshold: 0.35 }
    );
    statsObserver.observe(statsSection);
    if (reducedMotion) {
      statsSection.querySelectorAll("[data-stat-target]").forEach(animateStatValue);
    }
  }

  /* ─── Progress bars ─── */
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll(".progress-skill").forEach((el) => progressObserver.observe(el));

  /* ─── Portfolio filter ─── */
  const filterBtns = document.querySelectorAll("[data-filter]");
  const projectItems = document.querySelectorAll("[data-category]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      projectItems.forEach((item) => {
        const show = filter === "all" || item.dataset.category === filter;
        item.closest(".col-md-6, .col-lg-4")?.classList.toggle("d-none", !show);
      });
    });
  });

  /* ─── Testimonial slider ─── */
  if (!document.querySelector(".testimonial-motion-wrap")) {
    const testimonials = document.querySelectorAll("[data-testimonial]");
    const prevBtn = document.querySelector("[data-testimonial-prev]");
    const nextBtn = document.querySelector("[data-testimonial-next]");
    let testimonialIndex = 0;

    const showTestimonial = (i) => {
      if (!testimonials.length) return;
      testimonialIndex = (i + testimonials.length) % testimonials.length;
      testimonials.forEach((t, idx) => {
        t.classList.toggle("d-none", idx !== testimonialIndex);
      });
    };

    prevBtn?.addEventListener("click", () => showTestimonial(testimonialIndex - 1));
    nextBtn?.addEventListener("click", () => showTestimonial(testimonialIndex + 1));
  }

  /* ─── Contact form ─── */
  const form = document.getElementById("contactForm");
  if (form) {
    const GOOGLE_FORM_ENDPOINT = "https://docs.google.com/forms/d/e/1FAIpQLSchFLajMTTEJIQOqaLkks-qoedDEYR1RMZsCumzN9jcIlvl2g/formResponse";
    const GOOGLE_FORM_FBZ = "-1814369755346911261";
    const GOOGLE_FORM_FIELDS = {
      email: "entry.1523820956",
      fullName: "entry.1846889827",
      phone: "entry.1055864657",
      company: "entry.164857000",
      service: "entry.1458681657",
      serviceOther: "entry.1458681657.other_option_response",
      serviceSentinel: "entry.1458681657_sentinel",
      message: "entry.1221370137",
    };
    const GOOGLE_SERVICE_VALUES = new Set([
      "Social Media Management",
      "LinkedIn Personal Branding",
      "Graphic Design",
      "Content Writing & Script Development",
      "YouTube Growth Support",
      "Website & App Development",
      "Video Editing & Short-Form Content",
    ]);
    const SERVICE_VALUE_MAP = new Map();
    const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const getPhoneDigits = (v) => v.replace(/\D/g, "");
    const validatePhone = (v) => {
      const value = v.trim();
      const digits = getPhoneDigits(value);
      return /^\+?[\d\s\-()]+$/.test(value) && digits.length >= 10 && digits.length <= 15;
    };
    const sanitizePhone = (v) => v.replace(/[^\d+\-()\s]/g, "").replace(/(?!^)\+/g, "");
    const getFieldInput = (name) => form.querySelector(`[data-field="${name}"]`);
    const getFieldValue = (name) => getFieldInput(name)?.value.trim() || "";
    const getServiceValues = () => Array.from(form.querySelectorAll('input[name="service"]:checked'))
      .map((input) => input.value.trim())
      .filter(Boolean);
    const VALIDATION_RULES = {
      fullName: { required: true },
      email: { required: true, test: validateEmail },
      phone: { required: true, test: validatePhone },
      service: { required: true },
      message: { required: true, min: 10 },
    };

    form.querySelectorAll("[data-no-autofill]").forEach((input) => {
      const unlock = () => input.removeAttribute("readonly");
      input.addEventListener("focus", unlock, { once: true });
      input.addEventListener("pointerdown", unlock, { once: true });
      input.addEventListener("keydown", unlock, { once: true });
    });

    const getValidationMessage = (name, rules = VALIDATION_RULES[name]) => {
      if (!rules) return "";
      const val = name === "service" ? getServiceValues() : getFieldValue(name);

      if (name === "service" && rules.required && !val.length) {
        return "Select at least one service.";
      }
      if (rules.required && !val) {
        return "This field is required.";
      }
      if (name === "email" && val && !validateEmail(val)) {
        return "Enter a valid email address.";
      }
      if (name === "phone" && val && !validatePhone(val)) {
        return "Enter a valid phone number with 10 to 15 digits.";
      }
      if (rules.min && val.length < rules.min) {
        return `At least ${rules.min} characters.`;
      }

      return "";
    };

    const applyFieldValidation = (name, showError = true) => {
      const input = name === "service" ? form.querySelector('input[name="service"]') : getFieldInput(name);
      const err = form.querySelector(`[data-error="${name}"]`);
      if (!input) return true;

      const msg = getValidationMessage(name);
      const shouldShow = showError && Boolean(msg);
      const validationTarget = name === "service" ? form.querySelector(".contact-service-field") : input;

      validationTarget?.classList.toggle("is-invalid", shouldShow);
      input.setAttribute("aria-invalid", shouldShow ? "true" : "false");
      if (err) err.textContent = showError ? msg : "";

      return !msg;
    };

    ["email", "phone"].forEach((name) => {
      const input = getFieldInput(name);
      if (!input) return;

      input.addEventListener("input", () => {
        if (name === "phone") {
          const nextValue = sanitizePhone(input.value);
          if (input.value !== nextValue) input.value = nextValue;
        }
        if (input.dataset.touched === "true" || input.classList.contains("is-invalid")) {
          applyFieldValidation(name);
        }
      });

      input.addEventListener("blur", () => {
        input.dataset.touched = "true";
        applyFieldValidation(name);
      });
    });

    const appendValue = (payload, key, value) => {
      if (value) payload.append(key, value);
    };

    const normalizeServiceForGoogle = (service) => {
      const normalized = SERVICE_VALUE_MAP.get(service) || service;
      if (GOOGLE_SERVICE_VALUES.has(normalized)) {
        return { value: normalized, other: "" };
      }

      return {
        value: "__other_option__",
        other: normalized,
      };
    };

    const buildGoogleFormPayload = () => {
      const payload = new URLSearchParams();
      const services = getServiceValues().map(normalizeServiceForGoogle);

      appendValue(payload, GOOGLE_FORM_FIELDS.email, getFieldValue("email"));
      appendValue(payload, GOOGLE_FORM_FIELDS.fullName, getFieldValue("fullName"));
      appendValue(payload, GOOGLE_FORM_FIELDS.phone, getFieldValue("phone"));
      appendValue(payload, GOOGLE_FORM_FIELDS.company, getFieldValue("company"));
      appendValue(payload, GOOGLE_FORM_FIELDS.message, getFieldValue("message"));
      services.forEach((service) => {
        payload.append(GOOGLE_FORM_FIELDS.service, service.value);
        if (service.other) payload.append(GOOGLE_FORM_FIELDS.serviceOther, service.other);
      });
      payload.append(GOOGLE_FORM_FIELDS.serviceSentinel, "");
      payload.append("fvv", "1");
      payload.append("partialResponse", `[null,null,"${GOOGLE_FORM_FBZ}"]`);
      payload.append("pageHistory", "0");
      payload.append("fbzx", GOOGLE_FORM_FBZ);
      payload.append("submissionTimestamp", "-1");

      return payload;
    };

    const submitGoogleForm = (payload) => new Promise((resolve, reject) => {
      if (!document.body) {
        reject(new Error("Document is not ready"));
        return;
      }

      const targetName = `google-form-target-${Date.now()}`;
      const iframe = document.createElement("iframe");
      const hiddenForm = document.createElement("form");
      let submitted = false;
      let settled = false;
      let timerId = null;

      const cleanup = () => {
        if (timerId) window.clearTimeout(timerId);
        window.setTimeout(() => {
          hiddenForm.remove();
          iframe.remove();
        }, 250);
      };

      const settle = () => {
        if (settled) return;
        settled = true;
        cleanup();
        resolve();
      };

      const fail = (error) => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(error);
      };

      iframe.name = targetName;
      iframe.title = "Enquiry submission";
      iframe.tabIndex = -1;
      iframe.setAttribute("aria-hidden", "true");
      iframe.style.display = "none";
      iframe.addEventListener("load", () => {
        if (submitted) settle();
      });

      hiddenForm.method = "POST";
      hiddenForm.action = GOOGLE_FORM_ENDPOINT;
      hiddenForm.target = targetName;
      hiddenForm.style.display = "none";

      payload.forEach((value, name) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        hiddenForm.appendChild(input);
      });

      timerId = window.setTimeout(settle, 6000);
      document.body.append(iframe, hiddenForm);
      window.requestAnimationFrame(() => {
        try {
          submitted = true;
          hiddenForm.submit();
        } catch (error) {
          fail(error);
        }
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector(".btn-submit");
      const spinner = btn?.querySelector(".spinner-border");
      const formError = document.getElementById("formError");
      let valid = true;
      formError?.classList.add("d-none");

      Object.keys(VALIDATION_RULES).forEach((name) => {
        const input = name === "service" ? form.querySelector('input[name="service"]') : getFieldInput(name);
        if (input) input.dataset.touched = "true";
        if (!applyFieldValidation(name)) valid = false;
      });

      if (!valid) return;

      btn.disabled = true;
      spinner?.classList.remove("d-none");

      try {
        await submitGoogleForm(buildGoogleFormPayload());
        form.reset();
        form.classList.add("d-none");
        document.getElementById("formSuccess")?.classList.remove("d-none");
      } catch (error) {
        if (formError) {
          formError.textContent = "Unable to submit your enquiry right now. Please try again in a moment.";
          formError.classList.remove("d-none");
        }
      } finally {
        spinner?.classList.add("d-none");
        btn.disabled = false;
      }
    });
  }

  /* ─── Footer glow line ─── */
  const footer = document.querySelector(".site-footer");
  if (footer) {
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          footer.classList.add("is-visible");
          footerObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    footerObserver.observe(footer);
  }

  /* ─── Back to top ─── */
  const backToTop = document.querySelector("[data-back-to-top]");
  if (backToTop) {
    const backToTopThreshold = 400;

    const updateBackToTop = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0
        ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
        : 0;

      backToTop.style.setProperty("--scroll-progress", String(progress));
      backToTop.classList.toggle("is-visible", scrollTop > backToTopThreshold);
    };

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    window.addEventListener("resize", updateBackToTop);
    updateBackToTop();

    backToTop.addEventListener("click", () => {
      const home = document.getElementById("home");
      const behavior = smoothBehavior;

      if (home) {
        home.scrollIntoView({ behavior, block: "start" });
        return;
      }

      window.scrollTo({ top: 0, behavior });
    });
  }

})();

import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const LargeCTA = ({
  title,
  subtitle,
  dark = false,
  primaryLabel = "Contact Us",
  primaryTo = "/#contact",
  secondaryLabel,
  secondaryHref,
  showArrow = true,
}) => (
  <section className={`large-cta ${dark ? "large-cta--dark" : ""}`} aria-labelledby="large-cta-heading">
    <div className="large-cta__inner reveal reveal-up">
      <h2 id="large-cta-heading">{title}</h2>
      {subtitle && (
        <p className="large-cta__subtitle">
          {subtitle}
        </p>
      )}
      <div className="d-flex flex-wrap gap-3">
        <PrimaryButton href={primaryTo} variant={dark ? "light" : "default"} showArrow={showArrow}>
          {primaryLabel}
        </PrimaryButton>
        {secondaryLabel && secondaryHref && (
          <SecondaryButton href={secondaryHref} dark={!dark}>
            {secondaryLabel}
          </SecondaryButton>
        )}
      </div>
    </div>
  </section>
);

export default LargeCTA;

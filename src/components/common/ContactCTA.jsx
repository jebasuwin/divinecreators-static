import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const ContactCTA = ({
  title,
  subtitle,
  primaryLabel = "Contact Us",
  primaryTo = "/contact",
  secondaryLabel,
  secondaryHref,
  showArrow = true,
}) => (
  <section className="contact-cta reveal reveal-up" aria-labelledby="contact-cta-heading">
    <div className="contact-cta__glow" aria-hidden="true" />
    <div className="contact-cta__orbit" aria-hidden="true" />
    <div className="contact-cta__inner">
      <h2 id="contact-cta-heading">{title}</h2>
      {subtitle && <p className="contact-cta__subtitle">{subtitle}</p>}
      <div className="contact-cta__actions">
        <PrimaryButton to={primaryTo} showArrow={showArrow}>
          {primaryLabel}
        </PrimaryButton>
        {secondaryLabel && secondaryHref && (
          <SecondaryButton href={secondaryHref}>
            {secondaryLabel}
          </SecondaryButton>
        )}
      </div>
    </div>
  </section>
);

export default ContactCTA;

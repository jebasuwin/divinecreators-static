import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { businessInfo, getWhatsAppLink } from "../../data/businessInfo";

const ContactCTA = ({
  title,
  subtitle,
  primaryLabel = "Contact Us",
  primaryTo = "/#contact",
  secondaryLabel,
  secondaryHref,
  showArrow = true,
}) => (
  <section className="contact-cta reveal reveal-up" aria-labelledby="contact-cta-heading">
    <div className="contact-cta__inner">
      <h2 id="contact-cta-heading">{title}</h2>
      {subtitle && <p className="contact-cta__subtitle">{subtitle}</p>}
      <div className="contact-cta__actions">
        <PrimaryButton href={primaryTo} showArrow={showArrow}>
          {primaryLabel}
        </PrimaryButton>
        {secondaryLabel && secondaryHref && (
          <SecondaryButton href={secondaryHref}>
            {secondaryLabel}
          </SecondaryButton>
        )}
      </div>
      <div className="contact-cta__icons" aria-label="Contact options">
        <a href={businessInfo.phoneLink} className="contact-cta__icon" aria-label="Phone">
          <i className="bi bi-telephone" aria-hidden="true" />
        </a>
        <a href={`mailto:${businessInfo.email}`} className="contact-cta__icon" aria-label="Email">
          <i className="bi bi-envelope" aria-hidden="true" />
        </a>
        <a href={getWhatsAppLink()} className="contact-cta__icon" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <i className="bi bi-whatsapp" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
);

export default ContactCTA;

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/dc.png";
import { mainNavLinks } from "../../data/navigation";
import { businessInfo } from "../../data/businessInfo";
import SocialLinks from "../common/SocialLinks";

const navIcons = {
  home: "bi-house",
  about: "bi-person",
  services: "bi-grid",
  contact: "bi-envelope",
};

const MobileMenu = ({ isOpen, onClose, returnFocusRef, activeSection, onNavClick }) => {
  const basePath = import.meta.env.BASE_URL;
  const closeButtonRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      returnFocusRef?.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, returnFocusRef]);

  const handleNavClick = () => {
    onClose();
  };

  return (
    <div
      className={`mobile-menu${isOpen ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="mobile-menu__backdrop"
        aria-label="Close menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />

      <div className="mobile-menu__inner">
        <div className="mobile-menu__header">
          <Link to="/" className="brand-logo mobile-menu__logo" onClick={handleNavClick} aria-label="DIVINECREATORS home">
            <img src={logoImg} alt="Divine Creators logo" width={40} height={40} />
            <span>DIVINECREATORS</span>
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-menu__close"
            aria-label="Close menu"
            onClick={onClose}
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {mainNavLinks.map((link) => (
            <a
              key={link.hash}
              href={`${basePath}#${link.hash}`}
              className={`mobile-menu__link${activeSection === link.hash ? " active" : ""}`}
              onClick={(event) => onNavClick(event, link.hash)}
            >
              <span className="mobile-menu__link-icon" aria-hidden="true">
                <i className={`bi ${navIcons[link.hash]}`} />
              </span>
              <span className="mobile-menu__link-text">{link.label}</span>
              <span className="mobile-menu__link-arrow" aria-hidden="true">
                <i className="bi bi-chevron-right" />
              </span>
            </a>
          ))}
        </nav>

        <a
          href={`${basePath}#contact`}
          className="mobile-menu__cta"
          onClick={(event) => onNavClick(event, "contact")}
        >
          Get Started
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </a>

        <div className="mobile-menu__contact">
          <span className="mobile-menu__contact-label">Get in touch</span>

          <a href={businessInfo.phoneLink} className="mobile-menu__contact-item">
            <span className="mobile-menu__contact-icon" aria-hidden="true">
              <i className="bi bi-telephone" />
            </span>
            <span>{businessInfo.phoneDisplay}</span>
          </a>

          <a href={`mailto:${businessInfo.email}`} className="mobile-menu__contact-item">
            <span className="mobile-menu__contact-icon" aria-hidden="true">
              <i className="bi bi-envelope" />
            </span>
            <span>{businessInfo.email}</span>
          </a>

          <div className="mobile-menu__contact-item">
            <span className="mobile-menu__contact-icon" aria-hidden="true">
              <i className="bi bi-geo-alt" />
            </span>
            <span>{businessInfo.location}</span>
          </div>
        </div>

        <SocialLinks className="mobile-menu__socials" />
      </div>
    </div>
  );
};

export default MobileMenu;

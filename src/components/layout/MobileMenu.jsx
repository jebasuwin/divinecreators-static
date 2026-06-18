import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/dc.png";
import { mainNavLinks } from "../../data/navigation";
import { businessInfo } from "../../data/businessInfo";
import SocialLinks from "../common/SocialLinks";

const navIcons = {
  "/": "bi-house",
  "/about": "bi-person",
  "/services": "bi-grid",
  "/solutions": "bi-lightbulb",
  "/contact": "bi-envelope",
};

const MobileMenu = ({ isOpen, onClose, returnFocusRef }) => {
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
          <Link to="/" className="mobile-menu__logo" onClick={handleNavClick} aria-label="DIVINECREATORS home">
            <img src={logoImg} alt="DIVINECREATORS" />
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
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) => `mobile-menu__link${isActive ? " active" : ""}`}
              onClick={handleNavClick}
            >
              <span className="mobile-menu__link-icon" aria-hidden="true">
                <i className={`bi ${navIcons[link.path]}`} />
              </span>
              <span className="mobile-menu__link-text">{link.label}</span>
              <span className="mobile-menu__link-arrow" aria-hidden="true">
                <i className="bi bi-chevron-right" />
              </span>
            </NavLink>
          ))}
        </nav>

        <NavLink to="/contact" className="mobile-menu__cta" onClick={handleNavClick}>
          Get Started
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </NavLink>

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

import { Link } from "react-router-dom";
import { businessInfo } from "../../data/businessInfo";
import { footerQuickLinks } from "../../data/navigation";
import { footerServices } from "../../data/services";
import Logo from "../common/Logo";
import SocialLinks from "../common/SocialLinks";

const Footer = () => {
  const basePath = import.meta.env.BASE_URL;

  return (
  <footer className="site-footer site-footer--v2">
    <div className="site-footer__watermark" aria-hidden="true">
      DIVINE CREATORS
    </div>

    <div className="site-footer__inner">
      <div className="site-footer__grid">
        <div className="footer-brand footer-column footer-column--brand">
          <Logo variant="footer" />
          <p className="site-footer__desc">
            {businessInfo.tagline}.
          </p>
          <SocialLinks />
        </div>

        <nav className="footer-navigation footer-column footer-column--nav" aria-label="Footer navigation">
          <h5 className="footer-heading">
            Navigation
            <span className="footer-heading-line" aria-hidden="true" />
          </h5>
          <ul className="site-footer__links">
            {footerQuickLinks.map((l) => (
              <li key={l.hash ?? l.path}>
                {l.hash ? (
                  <a href={`${basePath}#${l.hash}`}>{l.label}</a>
                ) : (
                  <Link to={l.path}>{l.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-services footer-column footer-column--services">
          <h5 className="footer-heading">
            Services
            <span className="footer-heading-line" aria-hidden="true" />
          </h5>
          <ul className="site-footer__links site-footer__services-list">
            {footerServices.map((l) => (
              <li key={l.hash}>
                <a href={`${basePath}#${l.hash}`}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact footer-column footer-column--contact">
          <h5 className="footer-heading">
            Contact
            <span className="footer-heading-line" aria-hidden="true" />
          </h5>
          <ul className="site-footer__contact">
            <li><i className="bi bi-telephone" aria-hidden="true" /><a href={businessInfo.phoneLink}>{businessInfo.phoneDisplay}</a></li>
            <li><i className="bi bi-envelope" aria-hidden="true" /><a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a></li>
            <li><i className="bi bi-geo-alt" aria-hidden="true" /><span>{businessInfo.location}</span></li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom footer-bottom">
        <p className="site-footer__copy">&copy; 2026 DIVINE CREATORS. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;

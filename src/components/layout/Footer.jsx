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
      DIVINECREATORS
    </div>

    <div className="site-footer__inner">
      <div className="site-footer__grid">
        <div className="footer-brand">
          <Logo variant="footer" />
          <p className="site-footer__desc">
            {businessInfo.tagline}. Strategic digital marketing services for businesses in Chennai and beyond.
          </p>
          <SocialLinks />
        </div>

        <div className="footer-navigation">
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
        </div>

        <div className="footer-services">
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

        <div className="footer-contact">
          <h5 className="footer-heading">
            Contact
            <span className="footer-heading-line" aria-hidden="true" />
          </h5>
          <ul className="site-footer__links">
            <li><a href={businessInfo.phoneLink}>{businessInfo.phoneDisplay}</a></li>
            <li><a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a></li>
            <li>{businessInfo.location}</li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom footer-bottom">
        <p className="site-footer__copy">&copy; 2026 DIVINECREATORS. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;

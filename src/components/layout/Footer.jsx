import { Link } from "react-router-dom";
import { businessInfo } from "../../data/businessInfo";
import { footerQuickLinks } from "../../data/navigation";
import { footerServices } from "../../data/services";
import { footerSolutions } from "../../data/solutions";
import Logo from "../common/Logo";
import SocialLinks from "../common/SocialLinks";

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer site-footer--v2">
      <div className="site-footer__watermark" aria-hidden="true">
        DIVINECREATORS
      </div>

      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="footer-brand">
            <Logo />
            <p className="site-footer__desc">
              {businessInfo.tagline}. Strategic digital marketing services for businesses in Chennai and beyond.
            </p>
            <SocialLinks />
          </div>

          <div className="footer-navigation">
            <h5>Navigation</h5>
            <ul className="site-footer__links">
              {footerQuickLinks.map((l) => (
                <li key={l.path}><Link to={l.path}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-services">
            <h5>Services</h5>
            <ul className="site-footer__links">
              {footerServices.map((l) => (
                <li key={l.path}><Link to={l.path}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-solutions">
            <h5>Solutions</h5>
            <ul className="site-footer__links">
              {footerSolutions.map((l) => (
                <li key={l.path}><Link to={l.path}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h5>Contact</h5>
            <ul className="site-footer__links">
              <li><a href={businessInfo.phoneLink}>{businessInfo.phoneDisplay}</a></li>
              <li><a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a></li>
              <li>{businessInfo.location}</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>&copy; {year} {businessInfo.name}. All rights reserved.</p>
          <button type="button" className="site-footer__top" onClick={scrollTop}>
            Back to top <i className="bi bi-arrow-up" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

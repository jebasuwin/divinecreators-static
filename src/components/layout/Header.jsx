import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { mainNavLinks } from "../../data/navigation";
import { useActiveSection } from "../../utils/activeSection";
import { useHashNavigation } from "../../utils/hashNavigation";
import Logo from "../common/Logo";
import PrimaryButton from "../common/PrimaryButton";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const basePath = import.meta.env.BASE_URL;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [activeSection, setActiveSection] = useActiveSection(isHomePage);
  const handleHashNav = useHashNavigation(() => setMenuOpen(false));

  const handleNavClick = (event, hash) => {
    setActiveSection(hash);
    handleHashNav(event, hash);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`floating-nav ${scrolled ? "floating-nav--scrolled" : ""}`}>
        <div className="floating-nav__shell">
          <Logo />

          <nav className="floating-nav__links" aria-label="Main navigation">
            <ul>
              {mainNavLinks.map((link) => (
                <li key={link.hash}>
                  <a
                    href={`${basePath}#${link.hash}`}
                    className={`floating-nav__link${isHomePage && activeSection === link.hash ? " active" : ""}`}
                    onClick={(event) => handleNavClick(event, link.hash)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="floating-nav__actions">
            <PrimaryButton
              href={`${basePath}#contact`}
              small
              className="floating-nav__cta d-none d-lg-inline-flex"
              onClick={(event) => handleNavClick(event, "contact")}
            >
              Get Started
            </PrimaryButton>
            <button
              ref={menuToggleRef}
              type="button"
              className="floating-nav__toggle d-lg-none"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <i className="bi bi-list" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        returnFocusRef={menuToggleRef}
        activeSection={isHomePage ? activeSection : ""}
        onNavClick={handleNavClick}
      />
    </>
  );
};

export default Header;

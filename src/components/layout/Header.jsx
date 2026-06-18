import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { mainNavLinks } from "../../data/navigation";
import Logo from "../common/Logo";
import PrimaryButton from "../common/PrimaryButton";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);

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
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) => `floating-nav__link ${isActive ? "active" : ""}`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="floating-nav__actions">
            <PrimaryButton to="/contact" small className="floating-nav__cta d-none d-lg-inline-flex">
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
      />
    </>
  );
};

export default Header;

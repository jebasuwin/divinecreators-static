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
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container-gd site-header__bar">
          <Logo />

          <div className="site-header__end">
            <nav className="site-header__nav" aria-label="Main navigation">
              <ul className="site-nav">
                {mainNavLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      end={link.path === "/"}
                      className={({ isActive }) => `site-nav__link ${isActive ? "active" : ""}`}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="site-header__actions">
              <PrimaryButton to="/contact" small className="d-none d-lg-inline-flex">
                Get Started
              </PrimaryButton>
              <button
                ref={menuToggleRef}
                type="button"
                className="menu-toggle d-lg-none"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                <i className="bi bi-list" aria-hidden="true" />
              </button>
            </div>
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

import { Link } from "react-router-dom";

const Logo = ({ className = "", dark = false, variant = "nav" }) => {
  const isFooter = variant === "footer";
  const logoImg = `${import.meta.env.BASE_URL}assets/brand/dc-logo-white-128.png`;

  return (
    <Link
      to="/"
      className={`brand-logo site-logo ${isFooter ? "footer-brand-logo" : ""} ${dark ? "site-logo--dark" : ""} ${className}`}
      aria-label="DIVINE CREATORS home"
    >
      <img
        src={logoImg}
        srcSet={`${import.meta.env.BASE_URL}assets/brand/dc-logo-white-64.png 64w, ${import.meta.env.BASE_URL}assets/brand/dc-logo-white-128.png 128w, ${import.meta.env.BASE_URL}assets/brand/dc-logo-white-256.png 256w`}
        sizes={isFooter ? "58px" : "48px"}
        alt="Divine Creators logo"
        className="site-logo__img"
        width={isFooter ? 58 : 48}
        height={isFooter ? 58 : 48}
      />
      <span>DIVINE CREATORS</span>
    </Link>
  );
};

export default Logo;

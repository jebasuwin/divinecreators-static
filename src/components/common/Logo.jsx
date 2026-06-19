import { Link } from "react-router-dom";
import logoImg from "../../assets/dc.png";

const Logo = ({ className = "", dark = false, variant = "nav" }) => {
  const isFooter = variant === "footer";

  return (
    <Link
      to="/"
      className={`brand-logo site-logo ${isFooter ? "footer-brand-logo" : ""} ${dark ? "site-logo--dark" : ""} ${className}`}
      aria-label="DIVINECREATORS home"
    >
      <img
        src={logoImg}
        alt="Divine Creators logo"
        className="site-logo__img"
        width={isFooter ? 58 : 48}
        height={isFooter ? 58 : 48}
      />
      <span>DIVINECREATORS</span>
    </Link>
  );
};

export default Logo;

import { Link } from "react-router-dom";
import logoImg from "../../assets/dc.png";

const Logo = ({ className = "", dark = false }) => (
  <Link
    to="/"
    className={`site-logo ${dark ? "site-logo--dark" : ""} ${className}`}
    aria-label="DIVINECREATORS home"
  >
    <img src={logoImg} alt="DIVINECREATORS" className="site-logo__img" />
  </Link>
);

export default Logo;

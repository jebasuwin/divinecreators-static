import { Link } from "react-router-dom";

const SecondaryButton = ({
  children,
  to,
  href,
  onClick,
  type = "button",
  className = "",
  dark = false,
  small = false,
  external = false,
  ariaLabel,
}) => {
  const classes = `btn-secondary-gd ${dark ? "btn-secondary-gd--dark" : ""} ${small ? "btn-sm-gd" : ""} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
};

export default SecondaryButton;

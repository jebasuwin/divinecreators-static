import { Link } from "react-router-dom";

const PrimaryButton = ({
  children,
  to,
  href,
  onClick,
  type = "button",
  className = "",
  variant = "default",
  small = false,
  external = false,
  ariaLabel,
  showArrow = true,
}) => {
  const variantClass =
    variant === "outline" ? "btn-primary-gd--outline" :
    variant === "light" ? "btn-primary-gd--light" : "";

  const classes = `btn-primary-gd ${variantClass} ${small ? "btn-sm-gd" : ""} ${className}`.trim();

  const content = (
    <>
      {children}
      {showArrow && <i className="bi bi-arrow-right btn-icon" aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {content}
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
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
};

export default PrimaryButton;

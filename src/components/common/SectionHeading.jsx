const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
  titleId,
}) => (
  <header className={`section-heading ${align === "center" ? "section-heading--center" : ""} ${dark ? "section-heading--dark" : ""} ${className}`.trim()}>
    {eyebrow && <span className="section-heading__eyebrow reveal reveal-up">{eyebrow}</span>}
    {title && (
      <h2 id={titleId} className="section-heading__title reveal reveal-up">
        {title}
      </h2>
    )}
    {description && (
      <p className="section-heading__desc reveal reveal-up">{description}</p>
    )}
  </header>
);

export default SectionHeading;

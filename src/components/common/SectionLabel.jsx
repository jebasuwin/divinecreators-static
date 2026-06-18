const SectionLabel = ({ number, children, light = false }) => (
  <span className={`section-label ${light ? "section-label--light" : ""}`}>
    {number && <span className="section-label__num">{number}</span>}
    {children}
  </span>
);

export default SectionLabel;

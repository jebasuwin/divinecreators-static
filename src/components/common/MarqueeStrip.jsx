const items = [
  "SEO",
  "Social Media",
  "Paid Ads",
  "Content",
  "Web Design",
  "Lead Generation",
  "Analytics",
];

const MarqueeStrip = () => {
  const track = [...items, ...items];

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={`${item}-${i}`}>
            <em>{item}</em> •
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;

const items = [
  "Social Media Management",
  "LinkedIn Personal Branding",
  "Video Editing",
  "Graphic Design",
  "Content Writing",
  "YouTube Growth Support",
  "Website & App Development",
];

const MarqueeStrip = () => {
  const track = [...items, ...items];

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={`${item}-${i}`}>
            <em>{item}</em> *
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;

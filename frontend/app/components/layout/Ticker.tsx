export default function Ticker() {
  const items = [
    "8.3 Billion tonnes of plastic produced since 1950",
    "91% of plastic waste is never recycled",
    "Plastic takes over 450 years to decompose",
    "BioMANS biodegrades within 21 days",
    "Agricultural waste can replace plastic",
    "Circular materials are the future",
  ];

  return (
    <section className="ticker-wrap">
      {/* LEFT FADE */}

      <div className="ticker-fade-left" />

      {/* RIGHT FADE */}

      <div className="ticker-fade-right" />

      {/* TRACK */}

      <div className="ticker-track">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="ticker-item"
          >
            <span className="ticker-dot" />

            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

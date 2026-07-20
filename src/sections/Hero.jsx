'use client';

export default function Hero() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot">⚡</span>
            <span>New arrivals weekly</span>
          </div>
          <h1 className="hero-heading">
            Your everyday
            <br />
            essentials, <em className="hero-em">delivered.</em>
          </h1>
          <p className="hero-sub">
            Groceries, beauty, electronics, and more — curated and delivered
            fast.
          </p>
        </div>

        <div className="hero-right">
          <div className="hero-stat-row">
            <div className="hero-stat">
              <div className="hero-stat-num">
                8<span className="hero-stat-suffix">+</span>
              </div>
              <div className="hero-stat-lbl">Categories</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">
                2K<span className="hero-stat-suffix">+</span>
              </div>
              <div className="hero-stat-lbl">Products</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">
                4.8<span className="hero-stat-suffix">★</span>
              </div>
              <div className="hero-stat-lbl">Avg rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-inner">
          {[...Array(2)].map((_, i) =>
            [
              'Free delivery over $30',
              '2,000+ products in stock',
              'Same-day delivery available',
              '4.8 star average rating',
              'New arrivals every week',
              'Groceries · Beauty · Electronics',
            ].map((text, j) => (
              <span className="ticker-item" key={`${i}-${j}`}>
                {text}
                <span className="ticker-sep" />
              </span>
            )),
          )}
        </div>
      </div>
    </>
  );
}

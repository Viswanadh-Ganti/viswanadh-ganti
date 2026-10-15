export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Software Engineer · IBM · Hyderabad, Telangana, India</p>
        <h1>Enterprise software, built to hold up.</h1>
        <p>
          I&apos;m Viswanadh Ganti, a software engineer at IBM focused on customer success engineering,
          production support, and secure enterprise systems. With 7 years of experience across
          enterprise facilities management, logistics platforms, and collaborative Java engineering
          teams, I work on production-ready services that balance reliability, performance, and
          maintainability.
        </p>
        <div className="button-row">
          <a href="#experience" className="primary-btn">
            Explore experience
          </a>
          <a href="#contact" className="secondary-btn">
            Start a conversation
          </a>
        </div>
        <dl className="hero-facts" aria-label="Professional highlights">
          <div><dt>7</dt><dd>years in enterprise engineering</dd></div>
          <div><dt>IBM</dt><dd>facilities management platform</dd></div>
          <div><dt>4+</dt><dd>years in customer success engineering</dd></div>
        </dl>
      </div>

      <div className="hero-panel" aria-label="Profile card">
        <div className="profile-card">
            <picture>
              <source srcSet="/vswanadh.webp" type="image/webp" />
              <img className="profile-image" src="/vswanadh.jpeg" alt="Viswanadh Ganti" />
            </picture>
        </div>
        <p className="profile-caption">Software engineer at IBM · enterprise platform.</p>
      </div>
    </section>
  )
}

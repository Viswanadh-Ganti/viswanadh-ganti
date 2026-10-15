export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <h2>Contact</h2>
        <span>Open to the right challenge</span>
      </div>

      <div className="contact-grid">
        <div className="contact-item">
          <label>Email</label>
          <a href="mailto:viswanadh.ganti@gmail.com">viswanadh.ganti@gmail.com</a>
        </div>
        <div className="contact-item">
          <label>Phone</label>
          <a href="tel:+917075452889">+91 7075452889</a>
        </div>
        <div className="contact-item">
          <label>Location</label>
          <span>Hyderabad, Telangana, India</span>
        </div>
        <div className="contact-item">
          <label>Profiles</label>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/viswanadh-ganti/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/Viswanadh-Ganti" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

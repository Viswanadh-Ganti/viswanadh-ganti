import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section className="contact-section" id="contact" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .5 }}
      >
        <h2>Contact</h2>
        <span className="section-tag">// open to the right challenge</span>
      </motion.div>
      <div className="section-divider" />

      <motion.div
        className="contact-grid"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .55, delay: .15 }}
      >
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
            <a
              className="contact-link-btn"
              href="https://www.linkedin.com/in/viswanadh-ganti/"
              target="_blank"
              rel="noreferrer"
            >
              🔗 LinkedIn
            </a>
            <a
              className="contact-link-btn"
              href="https://github.com/Viswanadh-Ganti"
              target="_blank"
              rel="noreferrer"
            >
              🐙 GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

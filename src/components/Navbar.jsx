import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Home',        href: '#home' },
  { label: 'About',       href: '#about' },
  { label: 'Skills',      href: '#skills' },
  { label: 'Experience',  href: '#experience' },
  { label: 'Recognition', href: '#recognition' },
  { label: 'Projects',    href: '#projects' },
  { label: 'Contact',     href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection observer to highlight active section
  useEffect(() => {
    const sections = navItems.map(n => document.querySelector(n.href)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length) setActive('#' + visible[0].target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.header
      className="site-header"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .5, ease: 'easeOut' }}
      style={{ boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.4)' : 'none' }}
    >
      <nav className="navbar" aria-label="Main navigation">
        <div className="brand">
          <span className="brand-prompt">~/</span>
          <span>vg</span>
          <span className="brand-caret" aria-hidden="true" />
        </div>

        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={active === item.href ? { color: 'var(--accent)', background: 'rgba(88,166,255,.08)' } : {}}
            >
              {item.label}
            </a>
          ))}
          <a href="https://www.linkedin.com/in/viswanadh-ganti/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <button
            type="button"
            className="nav-resume-btn"
            onClick={() => window.print()}
          >
            ⬇ Resume
          </button>
        </div>
      </nav>
    </motion.header>
  )
}

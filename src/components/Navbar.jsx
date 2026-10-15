const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Recognition', href: '#recognition' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <div className="brand">
          VG
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="https://www.linkedin.com/in/viswanadh-ganti/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <button type="button" className="resume-nav-link" onClick={() => window.print()}>
            Print ATS Resume
          </button>
        </div>
      </nav>
    </header>
  )
}

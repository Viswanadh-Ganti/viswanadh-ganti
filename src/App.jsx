import './App.css'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import CICDPipeline from './components/CICDPipeline'
import Experience from './components/Experience'
import Recognition from './components/Recognition'
import Projects from './components/Project'
import Contact from './components/Contact'
import Resume from './components/Resume'

function App() {
  return (
    <>
      <div className="app-shell">
        <Navbar />
        <main className="page-content">
          <Hero />
          <About />
          <Skills />
          <CICDPipeline />
          <Experience />
          <Recognition />
          <Projects />
          <Contact />
          <Resume />
        </main>

        {/* Footer */}
        <footer className="site-footer">
          <span>
            <span className="footer-brand">~/viswanadh-ganti</span>
            &nbsp;— built with React + Vite
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '.7rem' }}>
            © 2024 · All systems operational
          </span>
        </footer>
      </div>

      {/* Floating status badge */}
      <div className="dev-badge" aria-hidden="true">
        <span className="dev-badge-dot" />
        All systems operational
      </div>

      <Analytics />
    </>
  )
}

export default App

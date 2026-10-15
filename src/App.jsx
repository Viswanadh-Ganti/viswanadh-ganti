import './App.css'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
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
          <Experience />
          <Recognition />
          <Projects />
          <Contact />
          <Resume />
        </main>
      </div>
      <Analytics />
    </>
  )
}

export default App

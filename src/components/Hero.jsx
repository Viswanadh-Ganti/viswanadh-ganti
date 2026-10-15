import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TYPED_STRINGS = [
  'Software Engineer @ IBM',
  'Enterprise Java Specialist',
  'Customer Success Engineer',
  'OpenShift & AWS Practitioner',
  'CI/CD & DevOps Advocate',
]

function useTyped(strings, speed = 70, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [phase, setPhase] = useState('typing')
  const [sIdx, setSIdx] = useState(0)
  const [cIdx, setCIdx] = useState(0)

  useEffect(() => {
    const current = strings[sIdx]
    if (phase === 'typing') {
      if (cIdx < current.length) {
        const t = setTimeout(() => { setDisplay(current.slice(0, cIdx + 1)); setCIdx(c => c + 1) }, speed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), pause)
        return () => clearTimeout(t)
      }
    } else {
      if (cIdx > 0) {
        const t = setTimeout(() => { setDisplay(current.slice(0, cIdx - 1)); setCIdx(c => c - 1) }, speed / 2)
        return () => clearTimeout(t)
      } else {
        setPhase('typing')
        setSIdx(i => (i + 1) % strings.length)
      }
    }
  }, [phase, sIdx, cIdx, strings, speed, pause])

  return display
}

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: .55, delay: i * .12, ease: [.25, .1, .25, 1] } }) }

export default function Hero() {
  const typed = useTyped(TYPED_STRINGS)

  return (
    <section className="hero-section" id="home">
      <motion.div className="hero-copy" variants={fadeUp} initial="hidden" animate="visible">
        <motion.p className="hero-eyebrow" custom={0} variants={fadeUp}>
          Software Engineer · IBM · Hyderabad, Telangana, India
        </motion.p>
        <motion.h1 custom={1} variants={fadeUp}>
          Enterprise software,{' '}
          <span className="accent-word">built to hold up.</span>
        </motion.h1>

        <motion.div className="hero-typed-wrap" custom={2} variants={fadeUp} aria-live="polite">
          <span className="t-prompt">$ </span>
          <span className="t-cmd">{typed}</span>
          <span className="brand-caret" aria-hidden="true" />
        </motion.div>

        <motion.p className="hero-description" custom={3} variants={fadeUp}>
          I&apos;m Viswanadh Ganti — a software engineer at IBM focused on customer success engineering,
          production support, and secure enterprise systems. With 7&nbsp;years across enterprise facilities
          management, logistics platforms, and collaborative Java engineering teams, I ship production-ready
          services that balance reliability, performance, and maintainability.
        </motion.p>

        <motion.div className="button-row" custom={4} variants={fadeUp}>
          <a href="#experience" className="primary-btn">
            View Experience →
          </a>
          <a href="#contact" className="secondary-btn">
            Start a conversation
          </a>
        </motion.div>

        <motion.dl className="hero-stats" custom={5} variants={fadeUp} aria-label="Professional highlights">
          <div className="hero-stat"><dt>7+</dt><dd>years in enterprise engineering</dd></div>
          <div className="hero-stat"><dt>IBM</dt><dd>facilities management platform</dd></div>
          <div className="hero-stat"><dt>4+</dt><dd>years in customer success</dd></div>
        </motion.dl>
      </motion.div>

      <motion.div className="hero-panel" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .2 }}>
        <div className="terminal-window">
          <div className="terminal-topbar">
            <span className="terminal-dot close" />
            <span className="terminal-dot min" />
            <span className="terminal-dot max" />
            <span className="terminal-title">viswanadh@ibm ~ zsh</span>
          </div>

          <div className="profile-picture-wrap">
            <picture>
              <source srcSet="/vswanadh.webp" type="image/webp" />
              <img src="/vswanadh.jpeg" alt="Viswanadh Ganti" />
            </picture>
          </div>

          <div className="terminal-body">
            <div><span className="t-prompt">→ </span><span className="t-cmd">cat profile.json</span></div>
            <div style={{marginTop:6}}>
              <span className="t-comment">{'{'}</span><br />
              <span style={{marginLeft:16}}><span className="t-key">&quot;name&quot;</span><span className="t-comment">: </span><span className="t-str">&quot;Viswanadh Ganti&quot;</span>,</span><br />
              <span style={{marginLeft:16}}><span className="t-key">&quot;role&quot;</span><span className="t-comment">: </span><span className="t-str">&quot;Software Engineer&quot;</span>,</span><br />
              <span style={{marginLeft:16}}><span className="t-key">&quot;company&quot;</span><span className="t-comment">: </span><span className="t-str">&quot;IBM&quot;</span>,</span><br />
              <span style={{marginLeft:16}}><span className="t-key">&quot;exp_years&quot;</span><span className="t-comment">: </span><span className="t-num">7</span>,</span><br />
              <span style={{marginLeft:16}}><span className="t-key">&quot;status&quot;</span><span className="t-comment">: </span><span className="t-ok">&quot;available for challenges&quot;</span></span><br />
              <span className="t-comment">{'}'}</span>
            </div>
          </div>

          <div className="profile-status">
            <span className="status-dot" />
            Available for the right challenge
          </div>
        </div>
      </motion.div>
    </section>
  )
}

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

/* ─── Stage definitions ──────────────────────────────────────────────── */
const STAGES = [
  { id: 'code',    label: 'Code',    icon: '📝', badge: 'git push',  color: '#58a6ff' },
  { id: 'build',   label: 'Build',   icon: '🔨', badge: 'Maven',     color: '#f0883e' },
  { id: 'test',    label: 'Test',    icon: '🧪', badge: 'JUnit',     color: '#d29922' },
  { id: 'scan',    label: 'Scan',    icon: '🛡️', badge: 'SonarQube', color: '#bc8cff' },
  { id: 'package', label: 'Package', icon: '🐳', badge: 'Docker',    color: '#39d0d8' },
  { id: 'deploy',  label: 'Deploy',  icon: '🚀', badge: 'OpenShift', color: '#3fb950' },
  { id: 'live',    label: 'Live',    icon: '🌐', badge: 'Grafana',   color: '#3fb950' },
]

/* ─── Timing (ms) ────────────────────────────────────────────────────── */
const RUN_MS       = 6000          // one continuous sweep across the whole pipeline
const SUCCESS_HOLD = 3200          // show "deployed" banner before looping
const DEPLOY_IDX   = 5
const LIVE_IDX     = 6

/* ─── Log events ─────────────────────────────────────────────────────── */
const LOG_EVENTS = [
  { at:  200, cls: 'log-info', msg: '[Pipeline] ▶ Jenkinsfile execution started' },
  { at:  800, cls: 'log-ok',  msg: '[Code]     ✓ git checkout main · 340 commits, 3 branches' },
  { at: 1600, cls: 'log-ok',  msg: '[Build]    ✓ mvn clean package — BUILD SUCCESS in 8.4s' },
  { at: 2000, cls: 'log-info',msg: '[Test]     ⚡ Running 842 unit tests…' },
  { at: 2400, cls: 'log-ok',  msg: '[Test]     ✓ 842 passed · 0 failed · 0 skipped' },
  { at: 2900, cls: 'log-warn',msg: '[Scan]     ⚠ 2 minor code smells detected' },
  { at: 3050, cls: 'log-ok',  msg: '[Scan]     ✓ XSS patches applied · OWASP Top-10 CLEAR' },
  { at: 3600, cls: 'log-ok',  msg: '[Package]  ✓ Docker image pushed to registry:latest' },
  { at: 4200, cls: 'log-info',msg: '[Deploy]   🚀 Initiating rolling update on OpenShift…' },
  { at: 4600, cls: 'log-ok',  msg: '[Deploy]   ✓ 3/3 pods running · health-checks passed' },
  { at: 5200, cls: 'log-ok',  msg: '[Live]     ✓ Grafana metrics nominal · P99 < 200ms' },
  { at: 5600, cls: 'log-ok',  msg: '[Pipeline] ✅ SUCCESS — 49s · Build #247' },
]

/* ─── Confetti palette ───────────────────────────────────────────────── */
const CONFETTI = [
  '#58a6ff','#3fb950','#f0883e','#bc8cff',
  '#39d0d8','#d29922','#ff7b72','#ffffff',
]

/* ─── Stage card component ───────────────────────────────────────────── */
function StageCard({ stage, status, isLaunching, isLive }) {
  const isDone    = status === 'done'
  const isActive  = status === 'active'
  const isPending = status === 'pending'

  return (
    <div
      className={`pc-stage ${isActive ? 'pc-active' : ''} ${isDone ? 'pc-done' : ''} ${isPending ? 'pc-pending' : ''}`}
      style={{ '--sc': stage.color }}
    >
      {/* Rocket launch overlay */}
      {isLaunching && (
        <>
          <div className="pc-rocket">🚀</div>
          <div className="pc-exhaust" />
        </>
      )}

      {/* Success ripple rings on live stage */}
      {isLive && isDone && (
        <>
          <div className="pc-ring pc-ring1" />
          <div className="pc-ring pc-ring2" />
          <div className="pc-ring pc-ring3" />
        </>
      )}

      {/* Glow aura behind active card */}
      {isActive && <div className="pc-glow" />}

      {/* Icon */}
      <div className="pc-icon-wrap">
        <span className="pc-icon">{stage.icon}</span>
      </div>

      <div className="pc-label">{stage.label}</div>
      <div className="pc-badge">{stage.badge}</div>

      {/* Status indicator */}
      <div className="pc-status">
        {isDone    && <span className="pc-check">✓</span>}
        {isActive  && <span className="pc-spinner" />}
      </div>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────── */
export default function CICDPipeline() {
  const [sectionRef, inView] = useInView({ threshold: 0.1, once: false })
  const [statuses,   setStatuses]  = useState(() => STAGES.map(() => 'pending'))
  const [logs,       setLogs]      = useState([])
  const [deployed,   setDeployed]  = useState(false)
  const [launching,  setLaunching] = useState(false)
  const logRef     = useRef(null)
  const fillRef    = useRef(null)

  /* ─── Scroll log to bottom ─────────────────────────────────────────── */
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [logs])

  /* ─── One continuous sweep: progress drives fill, stages and logs ──── */
  useEffect(() => {
    if (!inView) return undefined

    const N = STAGES.length
    const fillEl = fillRef.current
    let raf = 0
    let start = performance.now()
    let lastKey = ''
    let lastLogCount = -1
    let lastDeployed = false

    const reset = () => {
      lastKey = ''
      lastLogCount = -1
    }

    const frame = (now) => {
      let elapsed = now - start
      if (elapsed >= RUN_MS + SUCCESS_HOLD) {
        start = now
        elapsed = 0
        reset()
      }

      const p = Math.min(elapsed / RUN_MS, 1)
      if (fillEl) fillEl.style.transform = `scaleX(${p})`

      const next = STAGES.map((_, i) => {
        if (p >= (i + 0.5) / N) return 'done'
        if (p >= i / N) return 'active'
        return 'pending'
      })
      const key = next.join()
      if (key !== lastKey) {
        lastKey = key
        setStatuses(next)
        setLaunching(next[DEPLOY_IDX] === 'active' || (next[DEPLOY_IDX] === 'done' && next[LIVE_IDX] !== 'done'))
      }

      const logCount = LOG_EVENTS.filter(ev => ev.at / RUN_MS <= p).length
      if (logCount !== lastLogCount) {
        lastLogCount = logCount
        setLogs(LOG_EVENTS.slice(0, logCount))
      }

      const isDeployed = p >= 1
      if (isDeployed !== lastDeployed) {
        lastDeployed = isDeployed
        setDeployed(isDeployed)
      }

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      if (fillEl) fillEl.style.transform = 'scaleX(0)'
      setStatuses(STAGES.map(() => 'pending'))
      setLogs([])
      setDeployed(false)
      setLaunching(false)
    }
  }, [inView])

  const allDone = statuses.every(s => s === 'done')

  return (
    <section className="cicd-section" id="cicd" ref={sectionRef}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2>CI/CD Pipeline</h2>
        <span className="section-tag">// devops workflow</span>
      </motion.div>
      <div className="section-divider" />

      <motion.div
        className={`pc-container${allDone ? ' pc-success-border' : ''}`}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* ── Header row ───────────────────────────────────────────── */}
        <div className="pc-header">
          <div className="pc-title">
            <span className="pc-live-dot" />
            Jenkins Pipeline — TRIRIGA Enterprise Platform
          </div>
          <div>
            {deployed
              ? <span className="pc-badge-pill pc-badge-success">✅ DEPLOYED</span>
              : statuses.some(s => s !== 'pending')
              ? <span className="pc-badge-pill pc-badge-running">⚡ RUNNING</span>
              : <span className="pc-badge-pill pc-badge-idle">○ IDLE</span>
            }
          </div>
        </div>

        {/* ── Pipeline track ───────────────────────────────────────── */}
        <div className="pc-track-scroll">
          <div className="pc-track">
            <div className="pc-rail" aria-hidden="true">
              <div className="pc-rail-fill" ref={fillRef}>
                <span className="pc-rail-shine" />
              </div>
            </div>
            {STAGES.map((stage, i) => (
              <StageCard
                key={stage.id}
                stage={stage}
                status={statuses[i]}
                isLaunching={i === DEPLOY_IDX && launching}
                isLive={i === LIVE_IDX}
              />
            ))}
          </div>
        </div>

        {/* ── Deployed celebration banner ───────────────────────────── */}
        <AnimatePresence>
          {deployed && (
            <motion.div
              className="pc-deployed"
              initial={{ opacity: 0, scaleY: 0.6, y: -10 }}
              animate={{ opacity: 1, scaleY: 1,   y: 0 }}
              exit   ={{ opacity: 0, scaleY: 0.6, y: -10 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              {/* Confetti burst */}
              <div className="pc-confetti" aria-hidden>
                {CONFETTI.flatMap((color, ci) =>
                  [0, 1, 2].map(j => (
                    <span
                      key={`${ci}-${j}`}
                      className="pc-conf-piece"
                      style={{
                        background: color,
                        '--tx': `${Math.round((ci * 53 + j * 97 - 150) % 320 - 160)}px`,
                        '--ty': `${-Math.round(40 + (ci * 41 + j * 67) % 90)}px`,
                        '--rot': `${(ci * 71 + j * 113) % 360}deg`,
                        animationDelay: `${(ci * 0.06 + j * 0.09).toFixed(2)}s`,
                        width:  `${6 + (ci + j) % 5}px`,
                        height: `${6 + (ci + j) % 5}px`,
                        borderRadius: j % 2 === 0 ? '50%' : '2px',
                      }}
                    />
                  ))
                )}
              </div>

              {/* Launch text */}
              <motion.div
                className="pc-deployed-text"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1,   opacity: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18, delay: 0.12 }}
              >
                <span className="pc-deployed-emoji">🎉</span>
                <span className="pc-deployed-label">DEPLOYED TO PRODUCTION</span>
                <span className="pc-deployed-emoji">🚀</span>
              </motion.div>

              <motion.div
                className="pc-deployed-sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                All systems operational · OpenShift cluster healthy · Build #247
              </motion.div>

              {/* Orbiting ring */}
              <div className="pc-orbit-ring" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Log stream ───────────────────────────────────────────── */}
        <div className="pc-log" ref={logRef}>
          {logs.map((line, i) => (
            <motion.div
              key={i}
              className="log-line"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
            >
              <span className="log-ts">{`10:42:${String(i + 1).padStart(2, '0')}`}</span>
              <span className={line.cls}>{line.msg}</span>
            </motion.div>
          ))}

          {!deployed && statuses.some(s => s !== 'pending') && (
            <div className="log-line">
              <span className="log-ts">──────</span>
              <span className="log-info" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span className="pc-log-spinner" />
                Running stage…
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

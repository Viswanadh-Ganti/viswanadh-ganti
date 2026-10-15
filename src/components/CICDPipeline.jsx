import { useState, useEffect, useRef, useCallback } from 'react'
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

/* ─── Timing schedule (ms from cycle start) ─────────────────────────── */
//                   code  build  test  scan  pkg   deploy live
const ACTIVE_AT  = [ 300,  1100,  1900, 2700, 3500,  4300, 5100]
const DONE_AT    = [ 700,  1500,  2300, 3100, 3900,  4700, 5500]
const DEPLOY_IDX = 5
const LIVE_IDX   = 6
const SUCCESS_HOLD = 3200          // show "deployed" banner before looping
const CYCLE_TOTAL  = DONE_AT[LIVE_IDX] + SUCCESS_HOLD

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
  const timersRef  = useRef([])
  const logRef     = useRef(null)
  const cycleRef   = useRef(0)

  /* ─── Scroll log to bottom ─────────────────────────────────────────── */
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [logs])

  /* ─── Clear all scheduled timers ──────────────────────────────────── */
  const clearAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  /* ─── Run one animation cycle ──────────────────────────────────────── */
  const runCycle = useCallback(() => {
    const myId = ++cycleRef.current

    setStatuses(STAGES.map(() => 'pending'))
    setLogs([])
    setDeployed(false)
    setLaunching(false)

    const add = (fn, ms) => {
      timersRef.current.push(setTimeout(() => { if (cycleRef.current === myId) fn() }, ms))
    }

    /* Stage timers */
    STAGES.forEach((_, i) => {
      add(() => {
        setStatuses(prev => { const n = [...prev]; n[i] = 'active'; return n })
        if (i === DEPLOY_IDX) setLaunching(true)
      }, ACTIVE_AT[i])

      add(() => {
        setStatuses(prev => { const n = [...prev]; n[i] = 'done'; return n })
        if (i === DEPLOY_IDX) setLaunching(false)
        if (i === LIVE_IDX)   setDeployed(true)
      }, DONE_AT[i])
    })

    /* Log timers */
    LOG_EVENTS.forEach(ev => {
      add(() => setLogs(prev => [...prev, ev]), ev.at)
    })

    /* Loop */
    add(runCycle, CYCLE_TOTAL)
  }, [clearAll]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (inView) {
      runCycle()
    } else {
      clearAll()
      setStatuses(STAGES.map(() => 'pending'))
      setLogs([])
      setDeployed(false)
      setLaunching(false)
    }
    return clearAll
  }, [inView, runCycle, clearAll])

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
        <div className="pc-track">
          {STAGES.map((stage, i) => {
            const status    = statuses[i]
            const nextSt    = statuses[i + 1]
            const fillPct   = status === 'done' ? '100%'
                            : status === 'active' ? '55%'
                            : '0%'
            const flowing   = status === 'active' || status === 'done'

            return (
              <div key={stage.id} className="pc-stage-wrap">
                <StageCard
                  stage={stage}
                  status={status}
                  isLaunching={i === DEPLOY_IDX && launching}
                  isLive={i === LIVE_IDX}
                />

                {i < STAGES.length - 1 && (
                  <div className="pc-connector">
                    <div className="pc-connector-bg" />
                    <div
                      className="pc-connector-fill"
                      style={{ width: fillPct, background: stage.color }}
                    />
                    {flowing && (
                      <>
                        <span className="pc-dot pc-dot1" style={{ background: stage.color }} />
                        <span className="pc-dot pc-dot2" style={{ background: stage.color }} />
                        <span className="pc-dot pc-dot3" style={{ background: stage.color }} />
                      </>
                    )}
                    <span className="pc-arrow">›</span>
                  </div>
                )}
              </div>
            )
          })}
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

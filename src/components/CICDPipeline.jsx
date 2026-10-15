import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

/* ─── CI/CD Pipeline stages ──────────────────────────────────────────── */
const STAGES = [
  { id: 'code',    label: 'Code',    icon: '📝', badge: 'git push' },
  { id: 'build',   label: 'Build',   icon: '🔨', badge: 'Maven' },
  { id: 'test',    label: 'Test',    icon: '🧪', badge: 'JUnit' },
  { id: 'scan',    label: 'Scan',    icon: '🛡️', badge: 'SonarQube' },
  { id: 'docker',  label: 'Package', icon: '🐳', badge: 'Docker' },
  { id: 'deploy',  label: 'Deploy',  icon: '🚀', badge: 'OpenShift' },
  { id: 'monitor', label: 'Monitor', icon: '📊', badge: 'Grafana' },
]

const LOG_LINES = [
  { ts: '10:42:01', cls: 'log-info', msg: '[Pipeline] Starting Jenkinsfile execution…' },
  { ts: '10:42:03', cls: 'log-ok',   msg: '[Code] ✓ git checkout main (340 commits)' },
  { ts: '10:42:08', cls: 'log-ok',   msg: '[Build] ✓ mvn clean package -DskipTests — BUILD SUCCESS' },
  { ts: '10:42:15', cls: 'log-ok',   msg: '[Test] ✓ 842 tests, 0 failures, 0 errors — PASSED' },
  { ts: '10:42:22', cls: 'log-warn', msg: '[Scan] ⚠ 2 minor code smells — XSS patches applied' },
  { ts: '10:42:28', cls: 'log-ok',   msg: '[Scan] ✓ Security gate PASSED — OWASP Top-10 clear' },
  { ts: '10:42:35', cls: 'log-ok',   msg: '[Package] ✓ Docker image built & pushed to registry' },
  { ts: '10:42:44', cls: 'log-ok',   msg: '[Deploy] ✓ Rolling update on OpenShift cluster — healthy' },
  { ts: '10:42:50', cls: 'log-ok',   msg: '[Monitor] ✓ Health-check passed — all pods running 3/3' },
  { ts: '10:42:51', cls: 'log-info', msg: '[Pipeline] ✅ PIPELINE SUCCESS — 49s total' },
]

function PipelineStage({ stage, status, idx, inView }) {
  return (
    <motion.div
      className={`pipeline-stage ${status}`}
      initial={{ opacity: 0, scale: .8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: .4, delay: .4 + idx * .1 }}
    >
      <div className="pipeline-node">{stage.icon}</div>
      <div className="pipeline-stage-label">{stage.label}</div>
      <div className="pipeline-stage-badge">{stage.badge}</div>
    </motion.div>
  )
}

export default function CICDPipeline() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [visibleLogs, setVisibleLogs] = useState(0)
  const [activeStage, setActiveStage] = useState(-1)
  const logRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    let i = 0
    const timer = setInterval(() => {
      i++
      setVisibleLogs(i)
      setActiveStage(Math.min(Math.floor(i * STAGES.length / LOG_LINES.length), STAGES.length - 1))
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
      if (i >= LOG_LINES.length) clearInterval(timer)
    }, 350)
    return () => clearInterval(timer)
  }, [inView])

  const getStatus = (idx) => {
    if (idx < activeStage) return 'done'
    if (idx === activeStage && visibleLogs < LOG_LINES.length) return 'running'
    if (idx === activeStage && visibleLogs >= LOG_LINES.length) return 'done'
    return ''
  }

  return (
    <section className="cicd-section" id="cicd" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .5 }}
      >
        <h2>CI/CD Pipeline</h2>
        <span className="section-tag">// devops workflow</span>
      </motion.div>
      <div className="section-divider" />

      <motion.div
        className="pipeline-container"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .6, delay: .2 }}
      >
        <div className="pipeline-title">
          Jenkins Pipeline — TRIRIGA Enterprise Platform
        </div>

        <div className="pipeline-stages">
          {STAGES.map((stage, i) => (
            <PipelineStage
              key={stage.id}
              stage={stage}
              status={getStatus(i)}
              idx={i}
              inView={inView}
            />
          ))}
        </div>

        <div className="pipeline-log" ref={logRef}>
          {LOG_LINES.slice(0, visibleLogs).map((line, i) => (
            <motion.div
              key={i}
              className="log-line"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: .25 }}
            >
              <span className="log-ts">{line.ts}</span>
              <span className={line.cls}>{line.msg}</span>
            </motion.div>
          ))}
          {visibleLogs < LOG_LINES.length && (
            <div className="log-line">
              <span className="log-ts">──────</span>
              <span className="log-info" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-orange)', animation: 'pulse-dot 1s ease-in-out infinite' }} />
                Running…
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

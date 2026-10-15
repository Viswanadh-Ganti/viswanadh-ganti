import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: .55, delay: i * .1, ease: [.25,.1,.25,1] }
  })
}

const codeLines = [
  { ln: '01', tokens: [{ t: 'keyword', v: 'public class ' }, { t: 'type', v: 'ViswanadhhGanti' }, { t: 'plain', v: ' {' }] },
  { ln: '02', tokens: [] },
  { ln: '03', tokens: [{ t: 'comment', v: '  // 7 years · enterprise engineering' }] },
  { ln: '04', tokens: [{ t: 'keyword', v: '  @Focus' }, { t: 'plain', v: '(CustomerSuccess.' }, { t: 'lit', v: 'PRODUCTION_DEFECTS' }, { t: 'plain', v: ')' }] },
  { ln: '05', tokens: [{ t: 'keyword', v: '  String ' }, { t: 'plain', v: 'company = ' }, { t: 'str', v: '"IBM"' }, { t: 'plain', v: ';' }] },
  { ln: '06', tokens: [] },
  { ln: '07', tokens: [{ t: 'comment', v: '  // Security remediation' }] },
  { ln: '08', tokens: [{ t: 'keyword', v: '  void ' }, { t: 'fn', v: 'hardenXSS' }, { t: 'plain', v: '() { patch(XSS.' }, { t: 'lit', v: 'REFLECTED' }, { t: 'plain', v: '); }' }] },
  { ln: '09', tokens: [] },
  { ln: '10', tokens: [{ t: 'comment', v: '  // Platforms' }] },
  { ln: '11', tokens: [{ t: 'keyword', v: '  String' }, { t: 'plain', v: '[] stack = { ' }, { t: 'str', v: '"Java"' }, { t: 'plain', v: ', ' }, { t: 'str', v: '"Spring Boot"' }, { t: 'plain', v: ',' }] },
  { ln: '12', tokens: [{ t: 'plain', v: '       ' }, { t: 'str', v: '"OpenShift"' }, { t: 'plain', v: ', ' }, { t: 'str', v: '"AWS"' }, { t: 'plain', v: ', ' }, { t: 'str', v: '"Jenkins"' }, { t: 'plain', v: ' };' }] },
  { ln: '13', tokens: [{ t: 'plain', v: '}' }] },
]

const colorMap = {
  keyword:  'var(--accent)',
  type:     'var(--accent-teal)',
  comment:  'var(--text-muted)',
  str:      'var(--accent-yellow)',
  fn:       'var(--accent-green)',
  lit:      'var(--accent-orange)',
  plain:    'var(--text-secondary)',
}

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <section className="about-section" id="about" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .5 }}
      >
        <h2>About Me</h2>
        <span className="section-tag">// profile</span>
      </motion.div>
      <div className="section-divider" />

      <div className="about-grid">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: .6, delay: .1 }}
        >
          <p>
            I am a software engineer at IBM where my primary focus is <strong style={{color:'var(--accent)'}}>customer success
            engineering</strong> — handling complex customer-reported production defects, guiding teams through
            hard-to-reproduce issues, and driving resolution across a large enterprise
            facilities-management platform.
          </p>
          <p>
            My background spans enterprise platform development, high-throughput logistics systems, and
            mission-critical applications that demand production troubleshooting and secure delivery under
            real operational pressure.
          </p>
          <p>
            Beyond production support, my contributions include feature development, XSS and dependency
            security remediation, <strong style={{color:'var(--accent-green)'}}>accessibility compliance</strong>, defect resolution, and
            containerised deployment on <strong style={{color:'var(--accent-orange)'}}>OpenShift</strong>. I also mentor engineers, set code-quality
            standards, and help teams translate business requirements into scalable, production-ready Java
            services.
          </p>
        </motion.div>

        <motion.div
          className="about-code-block"
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: .6, delay: .2 }}
        >
          <div className="code-block-header">
            <span style={{color:'var(--accent-red)'}}>●</span>
            <span style={{color:'var(--accent-yellow)'}}>●</span>
            <span style={{color:'var(--accent-green)'}}>●</span>
            <span style={{marginLeft:8}}>ViswanadhhGanti.java</span>
            <span className="code-block-lang">Java</span>
          </div>
          <div className="code-block-body">
            {codeLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: .3 + idx * .04 }}
                style={{ display: 'flex', gap: 0, minHeight: '1.9em' }}
              >
                <span className="ln">{line.ln}</span>
                <span>
                  {line.tokens.map((tok, ti) => (
                    <span key={ti} style={{ color: colorMap[tok.t] }}>{tok.v}</span>
                  ))}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

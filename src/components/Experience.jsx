import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const experience = [
  {
    role: 'Software Engineer',
    company: 'IBM',
    period: 'Nov 2023 — Present',
    current: true,
    tags: ['Java', 'Spring Boot', 'OpenShift', 'AWS', 'Customer Success'],
    summary:
      'Primary focus on customer success engineering — managing prioritised customer-reported defects, guiding the team through hard-to-reproduce production issues, and driving resolution across a large enterprise facilities-management platform. Broader contributions span feature development, XSS and dependency security hardening, and containerised OpenShift deployment across 340+ commits and 50+ work items.',
  },
  {
    role: 'Technical Lead',
    company: 'Wipro Limited',
    period: 'Jul 2023 — Oct 2023',
    tags: ['Java', 'TRIRIGA', 'Agile', 'Architecture'],
    summary:
      'Led technical delivery for a Java engineering team on the TRIRIGA platform, coordinating design decisions, sprint planning, code-quality standards, and accessibility improvements for a major financial-sector client.',
  },
  {
    role: 'Senior Software Engineer',
    company: 'Wipro Technologies',
    period: 'Aug 2021 — Aug 2023',
    tags: ['Java', 'Spring', 'Security', 'Mentoring'],
    summary:
      'Delivered security and stability fixes across the TRIRIGA platform, resolved 10+ production defects, and mentored junior engineers while partnering with architects and stakeholders on scalable technical designs.',
  },
  {
    role: 'Project Engineer',
    company: 'Wipro Limited',
    period: 'Nov 2018 — Aug 2021',
    tags: ['Java', 'JDBC', 'SQL', 'FedEx', 'Multithreading'],
    summary:
      'Worked with the development team to build and maintain modules for the FedEx Integrated Sortation System, a high-throughput logistics platform, using multithreading, JDBC, and SQL optimization to improve production reliability and performance.',
  },
  {
    role: 'Intern',
    company: 'Hiferk Technologies Pvt. Ltd.',
    period: 'Dec 2017 — Mar 2018',
    tags: ['Full Stack', 'Java', 'Web'],
    summary:
      'Contributed to an Online Recruitment System web application, building foundational full stack experience across UI, backend workflows, and application lifecycle delivery.',
  },
]

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05 })

  return (
    <section className="experience-section" id="experience" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .5 }}
      >
        <h2>Experience</h2>
        <span className="section-tag">2017 — today</span>
      </motion.div>
      <div className="section-divider" />

      <div className="timeline">
        {experience.map((item, idx) => (
          <motion.article
            key={item.role + item.company}
            className="timeline-item"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .55, delay: idx * .1 }}
          >
            <div className="timeline-node" />
            <div className="timeline-left">
              <h3 className="timeline-role">{item.role}</h3>
              <span className="timeline-period">{item.period}</span>
              {item.current && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  marginLeft: 8, fontSize: '.6rem', fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-green)',
                  background: 'rgba(63,185,80,.1)',
                  border: '1px solid rgba(63,185,80,.3)',
                  padding: '1px 6px', borderRadius: 4,
                  verticalAlign: 'middle',
                }}>
                  <span style={{width:6,height:6,borderRadius:'50%',background:'var(--accent-green)'}} />
                  current
                </span>
              )}
              <span className="timeline-company">{item.company}</span>
            </div>
            <div className="timeline-right">
              <p className="timeline-desc">{item.summary}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 16 }}>
                {item.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '.67rem',
                    color: 'var(--accent)', background: 'rgba(88,166,255,.07)',
                    border: '1px solid rgba(88,166,255,.18)',
                    padding: '2px 9px', borderRadius: 4,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

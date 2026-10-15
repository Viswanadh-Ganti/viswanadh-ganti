import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const projects = [
  {
    icon: '🏢',
    title: 'IBM MREF / TRIRIGA',
    description:
      'Enterprise backend services for a large facilities and real-estate platform, covering feature development, security hardening, defect remediation, and deployment support in OpenShift and AWS environments. 340+ commits, 50+ work items.',
    tech: ['Java', 'Spring Boot', 'Hibernate', 'OpenShift', 'AWS'],
  },
  {
    icon: '🛡️',
    title: 'Security & Platform Hardening',
    description:
      'Remediated reflected XSS issues across high-traffic UI surfaces, upgraded vulnerable dependencies, improved static-analysis pipeline quality, and strengthened email and versioning behavior across customer-critical workflows.',
    tech: ['OWASP', 'XSS', 'CI/CD', 'Git', 'Jenkins'],
  },
  {
    icon: '📦',
    title: 'FedEx Integrated Sortation System',
    description:
      'High-throughput package-sorting platform modules using multithreading, JDBC, and SQL optimization for production-critical code-upgrade patches and reliability fixes across distributed logistics infrastructure.',
    tech: ['Java', 'JDBC', 'SQL', 'Multithreading'],
  },
]

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .5 }}
      >
        <h2>Selected enterprise work</h2>
        <span className="section-tag">// experience highlights</span>
      </motion.div>
      <div className="section-divider" />

      <div className="projects-grid">
        {projects.map((project, idx) => (
          <motion.article
            key={project.title}
            className="project-card"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .5, delay: idx * .12 }}
          >
            <div className="project-icon">{project.icon}</div>
            <h3>
              {project.url
                ? <a href={project.url} target="_blank" rel="noreferrer">{project.title}</a>
                : project.title}
            </h3>
            <p>{project.description}</p>
            <div className="project-tech">
              {project.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const skillGroups = [
  {
    title: 'Backend Engineering',
    icon: '⚙️',
    accent: 'var(--accent)',
    items: ['Java', 'Spring', 'Spring Boot', 'Hibernate', 'REST APIs', 'Security remediation', 'Multithreading'],
  },
  {
    title: 'Data & Integration',
    icon: '🗄️',
    accent: 'var(--accent-teal)',
    items: ['SQL', 'Oracle Database', 'JDBC', 'Relational modeling', 'Query optimization', 'Data localization'],
  },
  {
    title: 'Cloud & Delivery',
    icon: '☁️',
    accent: 'var(--accent-orange)',
    items: ['OpenShift', 'AWS', 'Docker', 'Podman', 'Jenkins', 'Git', 'Maven/Gradle', 'CI/CD'],
  },
  {
    title: 'Practices & Leadership',
    icon: '🧭',
    accent: 'var(--accent-green)',
    items: ['Agile/Scrum', 'JIRA', 'Sprint planning', 'Code review standards', 'Mentoring', 'Unit testing', 'TDD'],
  },
  {
    title: 'Currently Exploring',
    icon: '🤖',
    accent: 'var(--accent-purple)',
    items: ['Generative AI', 'Agentic AI', 'watsonx', 'LLM-assisted workflows', 'AI in enterprise systems'],
  },
]

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section className="skills-section" id="skills" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .5 }}
      >
        <h2>Skills</h2>
        <span className="section-tag">// capabilities</span>
      </motion.div>
      <div className="section-divider" />

      <div className="skills-grid">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={group.title}
            className="skill-card"
            style={{ '--card-accent': group.accent }}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .5, delay: idx * .09 }}
          >
            <h3>
              <span className="skill-card-icon">{group.icon}</span>
              {group.title}
            </h3>
            <ul className="skill-list">
              {group.items.map((skill) => (
                <li key={skill} className="skill-pill">{skill}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

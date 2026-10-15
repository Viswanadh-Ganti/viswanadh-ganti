import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const recognitions = [
  {
    title: 'Support and client success',
    issuer: 'Dinesh Bhudavaram',
    detail:
      'Thanks for helping Support by managing attention to prioritised skill cases, defects, and their fix deliveries. Non-replicated cases pose a greater challenge for us all, and your supportive nature makes it easy to progress them. Thanks for doing all that you do for our Client Success.',
  },
  {
    title: 'Year-round support',
    issuer: 'Kishore Pyaga',
    detail:
      'Thank you very much for all the support, guidance, and help all over this year. Expecting this to be continued further. Happy new year!',
  },
  {
    title: 'Customer escalations and security',
    issuer: 'Ashok Janagam',
    detail:
      'Thank you for the great work! You have done a good job on customer escalations, production defect resolutions, and security fixes in 2025. Special thanks for the strong collaboration and dedicated efforts on XSS mitigation. Keep up the outstanding work!',
  },
  {
    title: 'Customer success engineering',
    issuer: 'Sudhir Kumar Allamshetti',
    detail: 'Thanks for all the good work in 2025, especially the customer success engineering part. Keep up the good work!',
  },
  {
    title: 'Guidance and support',
    issuer: 'Niti Dewan',
    detail:
      'I hold immense gratitude for the unwavering guidance and support you have provided since my induction into the team. Your patience and eagerness to explain each of my questions have shaped my understanding and fostered a sense of trust and respect.',
  },
  {
    title: 'Manager Appreciation',
    issuer: 'Niti Dewan',
    detail:
      'Congratulations, Viswanadh! I would like to recognize and appreciate Viswa for his valuable contributions to the team — consistently supporting customer escalations, contributing to delivering fixes across release branches, and playing an important role in mentoring other team members.',
  },
  {
    title: 'Project onboarding and collaboration',
    issuer: 'Sunilkumar Tomar',
    detail:
      'I would like to express my appreciation for your dedication and effort in helping me get started with the project, set up the environment, and work through blockers many times. Your contributions have been invaluable in ensuring a smoother and more efficient workflow.',
  },
]

export default function Recognition() {
  const [ref, inView] = useInView({ threshold: 0.05 })

  return (
    <section className="recognition-section" id="recognition" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .5 }}
      >
        <h2>Recognition</h2>
        <span className="section-tag">// IBM appreciations</span>
      </motion.div>
      <div className="section-divider" />

      <div className="recognition-grid">
        {recognitions.map((r, idx) => (
          <motion.article
            key={r.title}
            className="recognition-card"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .5, delay: idx * .07 }}
          >
            <div className="recognition-issuer">✦ {r.issuer}</div>
            <h3 className="recognition-title">{r.title}</h3>
            <p className="recognition-detail">{r.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
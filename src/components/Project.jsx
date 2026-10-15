const projects = [
  {
    title: 'IBM MREF / TRIRIGA',
    description:
      'Worked with the development team on enterprise backend services for a large facilities and real-estate platform, covering feature development, security hardening, defect remediation, and deployment support in OpenShift and AWS environments.',
    tech: ['Java', 'Spring Boot', 'Hibernate', 'OpenShift', 'AWS'],
  },
  {
    title: 'Security and platform hardening',
    description:
      'Remediated reflected XSS issues across high-traffic UI surfaces, upgraded vulnerable dependencies, improved static-analysis pipeline quality, and strengthened email and versioning behavior across customer-critical workflows.',
    tech: ['OWASP', 'XSS', 'CI/CD', 'Git', 'Jenkins'],
  },
  {
    title: 'FedEx Integrated Sortation System',
    description:
      'Worked with the development team to build and maintain modules for a high-throughput package-sorting platform, applying multithreading, JDBC, and SQL optimization to production-critical code-upgrade patches and reliability fixes.',
    tech: ['Java', 'JDBC', 'SQL', 'Multithreading'],
  },
  // {
  //   title: 'Hayagreev Medha Labs (In Progress)',
  //   description:
  //     'This brand is currently in progress and will be ready soon. It is being shaped as a digital services and learning studio for small businesses and independent learners, with future offerings in websites, automation, project support, and guided technical learning.',
  //   tech: ['Brand In Progress', 'Digital Services', 'Automation', 'Technical Learning'],
  //   url: 'https://hayagreev-medha-labs.vercel.app/',
  // },
]

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <h2>Selected enterprise work</h2>
        <span>Experience highlights</span>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <h3>
              {project.url ? <a href={project.url} target="_blank" rel="noreferrer">{project.title}</a> : project.title}
            </h3>
            <p>{project.description}</p>
            <div className="project-tech">
              {project.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

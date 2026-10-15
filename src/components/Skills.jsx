const skillGroups = [
  {
    title: 'Backend engineering',
    items: ['Java', 'Spring', 'Spring Boot', 'Hibernate', 'REST APIs', 'Security remediation', 'Multithreading'],
  },
  {
    title: 'Data & integration',
    items: ['SQL', 'Oracle Database', 'JDBC', 'Relational data modeling', 'Query optimization', 'Data localization'],
  },
  {
    title: 'Cloud & delivery',
    items: ['OpenShift', 'AWS', 'Docker', 'Podman', 'Jenkins', 'Git', 'Maven/Gradle', 'CI/CD'],
  },
  {
    title: 'Practices & leadership',
    items: ['Agile/Scrum', 'JIRA', 'Sprint planning', 'Code review standards', 'Mentoring', 'Unit testing', 'TDD'],
  },
  {
    title: 'Currently exploring',
    items: ['Generative AI', 'Agentic AI', 'watsonx', 'LLM-assisted workflows', 'AI in enterprise systems'],
  },
]

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="section-header">
        <h2>Skills</h2>
        <span>Capabilities</span>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div className="skill-card" key={group.title}>
            <h3>{group.title}</h3>
            <ul className="skill-list">
              {group.items.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

const experience = [
  {
    role: 'Software Engineer',
    company: 'IBM',
    period: 'Nov 2023 — Present',
    summary:
      'Primary focus on customer success engineering — managing prioritised customer-reported defects, guiding the team through hard-to-reproduce production issues, and driving resolution across a large enterprise facilities-management platform. Broader contributions span feature development, XSS and dependency security hardening, and containerised OpenShift deployment across 340+ commits and 50+ work items.',
  },
  {
    role: 'Technical Lead',
    company: 'Wipro Limited',
    period: 'Jul 2023 — Oct 2023',
    summary:
      'Led technical delivery for a Java engineering team on the TRIRIGA platform, coordinating design decisions, sprint planning, code-quality standards, and accessibility improvements for a major financial-sector client.',
  },
  {
    role: 'Senior Software Engineer',
    company: 'Wipro Technologies',
    period: 'Aug 2021 — Aug 2023',
    summary:
      'Delivered security and stability fixes across the TRIRIGA platform, resolved 10+ production defects, and mentored junior engineers while partnering with architects and stakeholders on scalable technical designs.',
  },
  {
    role: 'Project Engineer',
    company: 'Wipro Limited',
    period: 'Nov 2018 — Aug 2021',
    summary:
      'Worked with the development team to build and maintain modules for the FedEx Integrated Sortation System, a high-throughput logistics platform, using multithreading, JDBC, and SQL optimization to improve production reliability and performance.',
  },
  {
    role: 'Intern',
    company: 'Hiferk Technologies Pvt. Ltd.',
    period: 'Dec 2017 — Mar 2018',
    summary:
      'Contributed to an Online Recruitment System web application, building foundational full stack experience across UI, backend workflows, and application lifecycle delivery.',
  },
]

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="section-header">
        <h2>Experience</h2>
        <span>2017 — today</span>
      </div>

      <div className="timeline">
        {experience.map((item) => (
          <article className="timeline-item" key={item.role}>
            <div className="timeline-top">
              <h3>{item.role}</h3>
              <span className="period">{item.period}</span>
            </div>
            <span className="company">{item.company}</span>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

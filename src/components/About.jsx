export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-header">
        <h2>About Me</h2>
        <span>Profile</span>
      </div>
      <p>
        I am a software engineer at IBM where my primary focus is customer success engineering —
        handling complex customer-reported production defects, guiding teams through hard-to-reproduce
        issues, and driving resolution across a large enterprise facilities-management platform.
        My background spans enterprise platform development, high-throughput logistics systems, and
        mission-critical applications that demand production troubleshooting and secure delivery
        under real operational pressure.
      </p>
      <p>
        Beyond production support, my contributions include feature development, XSS and dependency
        security remediation, accessibility compliance, defect resolution, and containerised
        deployment on OpenShift. I also mentor engineers, set code-quality standards, and help teams
        translate business requirements into scalable, production-ready Java services.
      </p>
    </section>
  )
}

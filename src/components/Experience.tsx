import { Section } from "./Section";

const EXPERIENCES = [
  {
    role: "Full Stack Developer",
    company: "Grayopus Technologies",
    location: "Noida, UP",
    period: "Jan'24 – Present",
    highlights: [
      "Architected and scaled Java Spring Boot microservices using Spring Security, OAuth2, MFA, supporting 500+ monthly users with 99.9% uptime.",
      "Improved system performance by 40%+ by optimizing critical SQL queries, implementing indexing and caching strategies using Redis, and reducing average API latency.",
      "Implemented real-time updates using SSE and enabled inter-service communication using AWS SQS/SNS, enabling asynchronous processing and reducing inter-service dependency bottlenecks by 35%.",
      "Built and optimized frontend modules using React, TypeScript, Redux Toolkit, improving Lighthouse performance score by 25% and automating workflows with Selenium, saving 15+ hours/week of manual effort.",
      "Contributed to deployment using Docker and AWS EC2 and improving environment consistency across development and production.",
      "Ensured code quality with JUnit, Mockito, achieving 85%+ test coverage and reducing production defects by 30% across services.",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "OAuth2",
      "Redis",
      "AWS SQS/SNS",
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Docker",
      "JUnit",
    ],
  },
  {
    role: "SDE Intern",
    company: "Traqo IO",
    location: "",
    period: "Sep'22 – Nov'22",
    highlights: [
      "Designed reusable, responsive UI components using ReactJS and Ant Design Pro.",
      "Implemented interactive map functionalities and built a dynamic KYC workflow with form validation.",
    ],
    tech: ["ReactJS", "Ant Design", "Google Maps API"],
  },
];

export function Experience() {
  return (
    <Section id="experience" number="02" title="Experience">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 md:pl-0 transition-all duration-300 group"
            >
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-[3px] top-2 bottom-[-48px] w-[1px] bg-borderDark group-hover:bg-accent-amber transition-colors duration-500 last:hidden" />

              <div className="md:grid md:grid-cols-4 gap-8">
                {/* Mobile specific timeline line */}
                <div className="md:hidden absolute left-0 top-2 bottom-[-48px] w-[1px] bg-borderDark group-hover:bg-accent-amber transition-colors duration-500 last:bottom-0" />

                {/* Period */}
                <div className="col-span-1 mt-1 mb-2 md:mb-0">
                  <span className="font-mono text-sm text-gray-500 group-hover:text-accent-amber transition-colors duration-300 relative pl-4">
                    <span className="absolute -left-[37px] md:-left-5 top-[6px] w-2 h-2 rounded-full bg-dark border-2 border-gray-500 group-hover:border-accent-amber transition-colors duration-300 z-10" />
                    {exp.period}
                  </span>
                </div>

                {/* Content */}
                <div className="col-span-3 pb-8">
                  <h3 className="text-xl font-bold text-light mb-1">
                    {exp.role}{" "}
                    <span className="text-accent-amber font-mono">
                      @{exp.company}
                    </span>
                  </h3>
                  {exp.location && (
                    <p className="font-mono text-xs text-gray-500 mb-4 tracking-wide">
                      {exp.location}
                    </p>
                  )}
                  <ul className="text-gray-400 mb-4 leading-relaxed space-y-2 list-disc pl-5">
                    {exp.highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-mono text-gray-400 bg-white/5 border border-borderDark rounded group-hover:border-accent-amber/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

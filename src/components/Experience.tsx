import { Section } from "./Section";

const EXPERIENCES = [
  {
    role: "Full Stack Developer",
    company: "Grayopus Technologies",
    period: "Jan'24 - Present",
    description: "Architected and scaled Java Spring Boot microservices, supporting 10,000+ monthly users. Optimized critical SQL queries improving performance by 40%+. Designed event-driven communication using Kafka and AWS.",
    tech: ["Java", "Spring Boot", "React", "AWS", "Kafka", "Docker"]
  },
  {
    role: "SDE Intern",
    company: "Traqo IO",
    period: "Sep'22 - Nov'22",
    description: "Designed reusable, responsive UI components using ReactJS and Ant Design Pro. Implemented interactive map functionalities and built a dynamic KYC workflow with form validation.",
    tech: ["ReactJS", "Ant Design", "Google Maps API"]
  }
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
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {exp.description}
                  </p>
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

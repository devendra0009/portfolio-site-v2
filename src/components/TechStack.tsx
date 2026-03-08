import { Section } from "./Section";

const CATEGORIES = [
  {
    name: "Languages",
    skills: ["Java", "JavaScript", "TypeScript", "SQL", "C++"]
  },
  {
    name: "Frontend",
    skills: ["ReactJS", "Next.js", "Redux", "Tailwind CSS"]
  },
  {
    name: "Backend",
    skills: ["Spring Boot", "Node.js", "Express.js", "Microservices", "RESTful APIs"]
  },
  {
    name: "Databases & Tools",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Apache Kafka", "Docker", "AWS", "Jenkins", "Git"]
  }
];

export function TechStack() {
  return (
    <Section id="skills" number="03" title="Tech Stack">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {CATEGORIES.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-mono text-accent-amber text-lg">
                &gt; {category.name.toLowerCase()}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <div 
                    key={i}
                    className="px-4 py-2 bg-dark border border-borderDark rounded text-gray-300 text-sm font-mono hover:border-accent-amber hover:text-accent-amber hover:bg-accent-amber/5 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

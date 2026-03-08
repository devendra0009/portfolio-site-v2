import { Section } from "./Section";

const EDUCATION = [
  {
    degree: "B.Tech in Information Technology",
    institution: "Maharaja Surajmal Institute Of Technology",
    period: "Dec'20 – July'24",
    details: "GPA: 9.183. Coursework primarily focused on Algorithms, Data Structures, and Web Technologies."
  },
  {
    degree: "High School (Science)",
    institution: "Evergreen Public School",
    period: "Jul'18 – Jul'20",
    details: "GPA: 9.48/10.0"
  }
];

export function Education() {
  return (
    <Section id="education" number="02.5" title="Education">
      <div className="max-w-4xl mx-auto px-6 pb-24 grid gap-6 grid-cols-1 md:grid-cols-2">
        {EDUCATION.map((edu, index) => (
          <div 
            key={index} 
            className="p-6 border border-borderDark bg-[#050505] hover:border-accent-amber transition-colors duration-300 rounded group"
          >
            <div className="font-mono text-sm text-gray-500 mb-2 group-hover:text-accent-amber transition-colors">
              {edu.period}
            </div>
            <h3 className="text-lg font-bold text-light mb-1">
              {edu.degree}
            </h3>
            <div className="text-accent-amber font-mono text-sm mb-4">
              {edu.institution}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {edu.details}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

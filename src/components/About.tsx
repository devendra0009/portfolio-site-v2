import { Section } from "./Section";

export function About() {
  const codeLines = [
    '<span class="text-accent-amber">const</span> developer <span class="text-accent-amber">=</span> {',
    '  location: <span class="text-green-400">"Delhi/Noida, India"</span>,',
    '  timezone: <span class="text-green-400">"IST (UTC+5:30)"</span>,',
    '   passion: <span class="text-green-400">"Building scalable backend systems and aesthetic UIs"</span>,',
    '  chai: <span class="text-blue-400">true</span>',
    '};'
  ];

  return (
    <Section id="about" number="01" title="About">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-7xl mx-auto px-6">
        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
          <p>
            Hello! I'm Davendra, a Full Stack Developer based in the Delhi NCR region. 
            I specialize in building scalable backend services and responsive web applications.
          </p>
          <p>
            With a strong focus on Java, Spring Boot, and React, I enjoy tackling complex architectural 
            challenges and delivering high-performance, user-friendly solutions.
          </p>
          <p>
            When I'm not writing code, I'm usually exploring new tech stacks, optimizing systems, 
            or finding inspiration in everyday design and logic.
          </p>
        </div>

        {/* Terminal/Code Display */}
        <div className="w-full bg-[#050505] border border-borderDark rounded-lg overflow-hidden font-mono text-sm sm:text-base leading-relaxed hover:border-accent-amber/50 transition-colors duration-500">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-borderDark bg-[#0A0A0A]">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            <span className="ml-2 text-xs text-gray-500">developer.ts</span>
          </div>
          
          {/* Terminal Body */}
          <div className="p-6 overflow-x-auto">
            <pre className="text-light">
              <code>
                {codeLines.map((line, i) => (
                  <div key={i} className="flex hover:bg-white/5 px-2 -mx-2 rounded transition-colors">
                    <span className="w-8 text-gray-600 select-none text-right pr-4">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: line }} />
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </Section>
  );
}

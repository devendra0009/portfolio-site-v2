import { Section } from "./Section";

const SOCIALS = [
  { label: "github", handle: "devendra0009", link: "https://github.com/devendra0009" },
  { label: "linkedin", handle: "davendra-bedwal-09608b232", link: "https://www.linkedin.com/in/davendra-bedwal-09608b232/" },
  { label: "leetcode", handle: "0-index", link: "https://leetcode.com/u/0-index/" },
  { label: "email", handle: "devendrabedwal4@gmail.com", link: "mailto:devendrabedwal4@gmail.com" },
];

export function Contact() {
  return (
    <Section id="contact" number="06" title="Contact">
      <div className="max-w-3xl mx-auto px-6 pb-24 w-full">
        <p className="text-gray-400 mb-12 text-lg">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="flex flex-col mb-16">
          {SOCIALS.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              className="flex justify-between items-center py-6 border-b border-borderDark hover:border-accent-amber transition-colors duration-300 group"
            >
              <span className="font-mono text-gray-500 group-hover:text-accent-amber text-sm uppercase tracking-widest transition-colors">
                {social.label}
              </span>
              <span className="font-mono text-light group-hover:text-white transition-colors">
                {social.handle}
              </span>
            </a>
          ))}
        </div>

        <div className="flex justify-center md:justify-start">
          <a
            href="https://drive.google.com/file/d/1basSGPkMjf013xUjIcLaUOWM-ZK1sOFk/view?usp=sharing"
            target="_blank"
            className="px-8 py-4 bg-accent-amber/10 border border-accent-amber text-accent-amber hover:bg-accent-amber hover:text-dark transition-all duration-300 font-mono text-sm relative group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              watch_resume()
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
}

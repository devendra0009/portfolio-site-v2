import { Section } from "./Section";
import { textToMorse } from "../utils/morse";

const HOBBIES = [
  { name: "Working Out", emoji: "🏋️" },
  { name: "Calisthenics", emoji: "🤸" },
  { name: "Ukulele", emoji: "🎵" },
  { name: "Volleyball", emoji: "🏐" },
  { name: "Mountains", emoji: "⛰️" }
];

export function Hobbies() {
  return (
    <Section id="hobbies" number="05" title="Beyond Code">
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {HOBBIES.map((hobby) => (
            <div
              key={hobby.name}
              className="flex flex-col items-center justify-center p-8 bg-[#050505] border border-borderDark rounded group hover:border-accent-amber hover:bg-accent-amber/5 transition-colors duration-300 text-center"
            >
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 transform-gpu">
                {hobby.emoji}
              </span>
              <h3 className="font-bold text-light mb-2">{hobby.name}</h3>
              <p className="font-mono text-[10px] text-gray-600 group-hover:text-accent-amber/70 transition-colors break-all cursor-help" title={`Morsed: ${hobby.name}`}>
                {textToMorse(hobby.name)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

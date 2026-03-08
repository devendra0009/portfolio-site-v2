import { Section } from "./Section";
import { textToMorse } from "../utils/morse";
import { motion } from "framer-motion";

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
          {HOBBIES.map((hobby, index) => (
            <motion.div
              key={hobby.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-8 bg-[#050505] border border-borderDark rounded group hover:border-accent-amber hover:bg-accent-amber/5 transition-colors duration-300 text-center"
            >
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 transform-gpu">
                {hobby.emoji}
              </span>
              <h3 className="font-bold text-light mb-2">{hobby.name}</h3>
              <p className="font-mono text-[10px] text-gray-600 group-hover:text-accent-amber/70 transition-colors break-all cursor-help" title={`Morsed: ${hobby.name}`}>
                {textToMorse(hobby.name)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

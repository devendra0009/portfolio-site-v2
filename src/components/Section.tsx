import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, number, title, children }: SectionProps) {
  return (
    <section id={id} className="py-16 sm:py-20 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-accent-amber font-mono text-sm sm:text-base font-bold">
            // {number}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight">
            {title}
          </h2>
        </div>
        <div className="w-12 h-1 bg-accent-amber" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

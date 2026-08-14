import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, number, title, children }: SectionProps) {
  return (
    <section id={id} className="py-16 sm:py-20 flex flex-col justify-center">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-accent-amber font-mono text-sm sm:text-base font-bold">
            // {number}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight">
            {title}
          </h2>
        </div>
        <div className="w-12 h-1 bg-accent-amber" />
      </div>
      <div>{children}</div>
    </section>
  );
}

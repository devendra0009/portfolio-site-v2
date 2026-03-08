import { textToMorse } from "../utils/morse";

export function Footer() {
  return (
    <footer className="w-full border-t border-borderDark mt-12 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-gray-500 text-sm font-mono tracking-widest uppercase">
          © {new Date().getFullYear()} Davendra Bedwal
        </div>
        
        <div className="font-mono text-gray-600 tracking-[0.3em] hover:text-accent-amber transition-colors cursor-help" title="Morsed: GG">
          {textToMorse("GG")}
        </div>
      </div>
    </footer>
  );
}

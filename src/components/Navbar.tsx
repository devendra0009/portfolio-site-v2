import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { textToMorse } from "../utils/morse";

const NAV_LINKS = [
  { name: "about", href: "#about" },
  { name: "experience", href: "#experience" },
  { name: "skills", href: "#skills" },
  { name: "projects", href: "#projects" },
  { name: "hobbies", href: "#hobbies" },
  { name: "contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      // Format as IST (Asia/Kolkata) natively
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setTimeStr(formatter.format(date));
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-dark/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.05)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: IST Clock */}
        <div className="font-mono text-sm tracking-widest hidden sm:flex items-center gap-2">
          <span className="text-accent-amber">IST</span>
          <span className="w-[8ch]">{timeStr || "00:00:00"}</span>
        </div>

        {/* Center: Links */}
        <div className="flex-1 flex justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="font-mono uppercase text-[12px] tracking-[0.2em] hover:text-accent-amber transition-colors hidden md:block"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: Morse "HI" */}
        <div className="font-mono text-accent-amber text-sm tracking-widest cursor-help" title="Morsed: HI">
          {textToMorse("HI")}
        </div>
      </div>
    </motion.nav>
  );
}

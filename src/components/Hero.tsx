import { useRef } from "react";
import { motion } from "framer-motion";
import { textToMorse } from "../utils/morse";

export function Hero() {
  // --- PLACEHOLDER VARIABLES ---
  const ROLE = "Davendra Bedwal";
  const GREETING = "hello_world";
  const TAGLINE = "Full Stack Developer proficient in Java, Spring Boot, React, and modern microservices architecture.";
  // Replace this with your actual image path when ready
  const IMAGE_URL = "https://ik.imagekit.io/awhvmzkkx/1751999710059.jpg";
  const OLD_PORTFOLIO_URL = "https://personal-portfolio-updated.vercel.app/"; // User will replace this.
  // -----------------------------

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleImageClick = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 px-6 max-w-7xl mx-auto w-full">
      {/* Background Morse Code Watermark */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 opacity-5 pointer-events-auto cursor-help select-none overflow-hidden max-w-full text-[10rem] font-bold leading-none break-all whitespace-nowrap hidden lg:block"
        title="Morsed: HELLO WORLD"
      >
        {textToMorse("HELLO WORLD")}
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl order-2 lg:order-1"
        >
          <div className="font-mono text-accent-amber mb-6 text-sm sm:text-base flex items-center gap-2">
            <span>&gt;</span>
            <span>{GREETING}</span>
            <span className="inline-block w-2 h-4 sm:h-5 bg-accent-amber animate-blink" />
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-6 relative">
            <span className="text-light">I'm </span>
            <span className="text-accent-amber [text-shadow:_0_0_30px_rgb(234_179_8_/_30%)]">
              {ROLE}
            </span>
            <span className="text-light">.</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed">
            {TAGLINE}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-mono text-sm flex-wrap">
            <a
              href="#contact"
              className="px-6 py-3 border border-borderDark hover:border-accent-amber hover:text-accent-amber transition-colors duration-300 relative group"
            >
              <span className="relative z-10 text-light group-hover:text-accent-amber">
                get_in_touch()
              </span>
            </a>
            <a
              href="#projects"
              className="text-gray-400 hover:text-accent-amber transition-colors duration-300 flex items-center gap-2"
            >
              view_work <span className="text-accent-amber">→</span>
            </a>
            <a
              href={OLD_PORTFOLIO_URL}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-300 border-b border-transparent hover:border-gray-500 transition-colors duration-300"
            >
              old_portfolio_v1 <span className="text-accent-amber">→</span>
            </a>
          </div>

        </motion.div>

        {/* Right Side Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
        >
          <div 
            className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[30rem] lg:w-full lg:max-w-md rounded mt-8 lg:mt-0 group cursor-pointer"
            onClick={handleImageClick}
          >
            <div className="absolute inset-0 border-2 border-borderDark group-hover:border-[#dcbfa6] transition-colors duration-500 rounded translate-x-4 translate-y-4"></div>
            <div className="relative w-full h-full bg-[#050505] border border-borderDark rounded overflow-hidden z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500">
              <img 
                src={IMAGE_URL} 
                alt="Profile" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
              />
              
              {/* Awake me text overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px]">
                <span className="font-mono text-accent-amber font-bold text-xl uppercase tracking-widest drop-shadow-md">
                  Awake me
                </span>
              </div>
            </div>
            
            {/* Decorative dots for tech aesthetic */}
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-[radial-gradient(var(--color-borderDark)_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-50"></div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Moved from left to absolute bottom center to avoid overlapping with elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-borderDark relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-accent-amber"
            animate={{
              y: ["0%", "200%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
          Scroll
        </span>
      </motion.div>

      {/* Audio element for image click */}
      <audio ref={audioRef} src="https://ik.imagekit.io/awhvmzkkx/fahhhhh.mp3" preload="auto" />
    </section>
  );
}

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects";
import { Hobbies } from "./components/Hobbies";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="bg-dark min-h-screen text-light font-sans selection:bg-accent-amber/30 selection:text-white pb-safe">
      <Navbar />
      
      <main className="flex flex-col w-full text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-12">
        <Hero />
        <About />
        <Experience />
        <Education />
        <TechStack />
        <Projects />
        <Hobbies />
        <Contact />
      </main>

      <Footer />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-dark border border-borderDark text-gray-400 hover:text-accent-amber hover:border-accent-amber transition-colors shadow-lg group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

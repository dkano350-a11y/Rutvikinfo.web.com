import React, { useState, useEffect } from "react";
import { ArrowUp, Play, Pause } from "lucide-react";

export default function Footer() {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsPaused(localStorage.getItem('reduceMotion') === 'true');
    
    // Listen for changes from other components if any
    const handleStorageChange = () => {
      setIsPaused(localStorage.getItem('reduceMotion') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleAnimation = () => {
    window.dispatchEvent(new CustomEvent('toggle-background-animation'));
    setIsPaused(!isPaused);
  };

  return (
    <footer className="bg-navy text-white/80 py-12 px-6 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
          <div>
            <h4 className="font-serif text-2xl font-bold text-white mb-2">
              Rutvik Dangar
            </h4>
            <p className="text-electric font-medium text-sm tracking-wider uppercase">
              Marketing × AI × No-Code
            </p>
          </div>
          
          <button
            onClick={toggleAnimation}
            className="flex items-center gap-2 text-xs font-medium px-5 py-2.5 bg-purple-900/40 hover:bg-purple-800/60 rounded-full border border-purple-500/30 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] uppercase tracking-wider text-purple-100 hover:text-white group"
          >
            {isPaused ? <Play size={14} className="text-purple-400 group-hover:text-purple-300" /> : <Pause size={14} className="text-purple-400 group-hover:text-purple-300" />}
            {isPaused ? "Play Background" : "Pause Background"}
          </button>
        </div>

        <div className="text-center text-sm opacity-60">
          © {new Date().getFullYear()} <a href="/admin/messages" className="hover:underline cursor-pointer">Rutvik Dangar</a>. All rights reserved.
        </div>

        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}

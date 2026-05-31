import React, { useState } from "react";
import { ArrowRight, Mail, Download } from "lucide-react";
import { motion } from "framer-motion";
import ResumeModal from "./ResumeModal";

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadClick = () => {
    setIsResumeOpen(true);
  };

  const downloadFile = async () => {
    try {
      const response = await fetch("/rutvik_dangar_resume.pdf?v=" + new Date().getTime());
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Rutvik_Dangar_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Download failed:", error);
      window.open("/rutvik_dangar_resume.pdf", "_blank");
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden px-6 pb-20 pt-28"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl" 
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1.2, delay: 0.2 }}
          className="mb-8 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-electric to-purple-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/50 shadow-2xl bg-white flex items-center justify-center">
            <span className="text-5xl border-emerald-400">👨🏻‍💻</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 40, damping: 14, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-navy mb-4"
        >
          Hi, I'm Rutvik Dangar{" "}
          <span className="inline-block origin-bottom-right hover:animate-wave">
            👋
          </span>
        </motion.h1>

        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 40, damping: 16, delay: 0.6 }}
          className="text-xl md:text-2xl font-medium text-navy mb-6 max-w-2xl"
        >
          Building at the intersection of <br className="md:hidden" />
          <span className="font-semibold gradient-text">
            Marketing × AI × No-Code
          </span>
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 40, damping: 16, delay: 0.8 }}
          className="text-base md:text-lg text-charcoal mb-10 max-w-xl leading-relaxed"
        >
          19-year-old BBA Marketing student from Ahmedabad. I don't just study
          how businesses grow — I build tools that help them do it.
        </motion.p>

        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ type: "spring", stiffness: 50, damping: 14, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto items-center justify-center flex-wrap"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 rounded-full font-medium transition-colors duration-300 shadow-lg shadow-navy/20 hover:scale-105 transform hover:bg-electric w-full sm:w-auto"
          >
            View My Work <ArrowRight size={18} />
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="flex items-center justify-center gap-2 bg-white text-navy px-8 py-4 rounded-full font-medium transition-colors duration-300 shadow-lg shadow-black/5 hover:scale-105 transform border border-gray-100 hover:bg-cream w-full sm:w-auto"
          >
            Let's Connect <Mail size={18} />
          </button>
          <button
             onClick={handleDownloadClick}
             className="flex items-center justify-center gap-2 bg-cream text-navy px-8 py-4 rounded-full font-medium hover:bg-navy hover:text-white transition-colors duration-300 shadow-lg shadow-black/5 hover:scale-105 transform border border-navy/10 w-full sm:w-auto"
          >
             Download Resume <Download size={18} />
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer pointer-events-auto"
        onClick={() => scrollTo("about")}
      >
        <span className="text-xs uppercase tracking-widest text-navy/60 font-semibold mb-2">Scroll</span>
        <div className="w-6 h-10 border-2 border-navy/30 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-navy/60 rounded-full"
          />
        </div>
      </motion.div>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onDownload={downloadFile}
      />
    </section>
  );
}

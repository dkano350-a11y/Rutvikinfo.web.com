import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-navy text-white/80 py-12 px-6 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h4 className="font-serif text-2xl font-bold text-white mb-2">
            Rutvik Dangar
          </h4>
          <p className="text-electric font-medium text-sm tracking-wider uppercase">
            Marketing × AI × No-Code
          </p>
        </div>

        <div className="text-center text-sm opacity-60">
          © {new Date().getFullYear()} Rutvik Dangar. All rights reserved.
        </div>

        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
}

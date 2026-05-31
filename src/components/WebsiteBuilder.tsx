import React, { useEffect, useState, useRef } from "react";
import { ExternalLink, Code2, Heart, Sparkles, TerminalSquare, Layout, Coffee } from "lucide-react";
import { motion, useInView } from "framer-motion";

function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const duration = 2000; // 2 seconds animation

      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(ease * value));

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    }
  }, [inView, value]);

  return <span ref={ref}>{count}</span>;
}

export default function WebsiteBuilder() {
  return (
    <section className="py-24 px-6 bg-transparent relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel border border-electric/20 rounded-[2.5rem] p-8 md:p-14 text-center bg-white shadow-xl shadow-navy/5 relative overflow-hidden group"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-32 bg-electric/10 blur-3xl rounded-full z-0 pointer-events-none transition-transform duration-700 group-hover:scale-150" />

          <div className="relative z-10 w-20 h-20 bg-blue-50 text-electric rounded-3xl flex items-center justify-center mx-auto mb-8 transform -rotate-3 hover:rotate-0 transition-transform duration-300 shadow-sm border border-blue-100">
            <Code2 size={36} />
            <Sparkles className="absolute -top-2 -right-2 text-yellow-400" size={20} />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy mb-6 tracking-tight">
            Website Builder
          </h2>
          
          <p className="text-charcoal/80 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            I designed and developed this entire portfolio myself from the ground up. It blends modern design principles with code, standing as a living testament to my continuous learning and passion for building things that matter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 border-y border-navy/5 py-8">
            <div className="flex flex-col items-center">
               <TerminalSquare size={24} className="text-electric mb-3 opacity-80" />
               <div className="text-4xl md:text-5xl font-bold font-serif text-navy mb-1"><AnimatedNumber value={8500} />+</div>
               <div className="text-sm font-medium text-charcoal/70 uppercase tracking-widest">Lines of Code</div>
            </div>
            <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-navy/5 py-6 md:py-0">
               <Layout size={24} className="text-electric mb-3 opacity-80" />
               <div className="text-4xl md:text-5xl font-bold font-serif text-navy mb-1"><AnimatedNumber value={30} />+</div>
               <div className="text-sm font-medium text-charcoal/70 uppercase tracking-widest">Components</div>
            </div>
            <div className="flex flex-col items-center">
               <Coffee size={24} className="text-electric mb-3 opacity-80" />
               <div className="text-4xl md:text-5xl font-bold font-serif text-navy mb-1"><AnimatedNumber value={150} />+</div>
               <div className="text-sm font-medium text-charcoal/70 uppercase tracking-widest">Hours Built</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="flex items-center gap-2.5 text-sm font-medium px-5 py-3 bg-cream border border-navy/5 text-charcoal rounded-full shadow-sm hover:shadow-md transition-shadow">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
              <span>by</span>
              <span className="font-bold text-navy text-base">@Rutvik-Dangar</span>
            </div>
            
            <a
              href="https://rutvikinfo-web-com.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-8 py-3 bg-electric text-white rounded-full font-bold shadow-lg shadow-electric/25 hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
            >
              <span>Visit Website</span>
              <ExternalLink size={20} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 -z-0"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 -z-0"></div>
    </section>
  );
}

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Anchor, Factory, Milk, Laptop, Lightbulb } from "lucide-react";

export default function IndustryVisits() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const itemWidth = container.scrollWidth / visits.length;
    const newIndex = Math.round(container.scrollLeft / itemWidth);
    setActiveIndex(Math.min(newIndex, visits.length - 1));
  };

  const visits = [
    {
      title: "Mundra Port & SEZ (Special Economic Zone)",
      company: "Adani Ports (Kutch)",
      type: "Mega-Industrial Exposure",
      icon: <Anchor size={32} />,
      learnings:
        "Port operations, container logistics, maritime trade management, supply chain workflows, import-export customs processing, robotic crane systems, SEZ business dynamics and its impact on international trade.",
      color: "bg-blue-50 text-blue-900",
      accent: "bg-blue-100",
    },
    {
      title: "Electrotherm India Ltd.",
      company: "Ahmedabad",
      type: "Industrial Manufacturing",
      icon: <Factory size={32} />,
      learnings:
        "Induction furnace manufacturing, steel-making machinery, EV division (ET Motors), supply chain of raw materials, quality control protocols, HR and organizational structure analysis.",
      color: "bg-stone-50 text-stone-900",
      accent: "bg-stone-200",
    },
    {
      title: "Amul — GCMMF",
      company: "Anand",
      type: "FMCG Cooperative",
      icon: <Milk size={32} />,
      learnings:
        "Three-tier cooperative business model, cold-chain logistics, Q-Commerce distribution networks, capital structure analysis, VAP distribution and processing plant operations.",
      color: "bg-amber-50 text-amber-900",
      accent: "bg-amber-100",
    },
    {
      title: "CLASM",
      company: "Tech Audit",
      type: "IT & Infrastructure",
      icon: <Laptop size={32} />,
      learnings:
        "Data entry operations, CRM architecture analysis, corporate reporting tools, validation processes, quality analyst workflows.",
      color: "bg-emerald-50 text-emerald-900",
      accent: "bg-emerald-100",
    },
    {
      title: "I-Hub",
      company: "Ahmedabad",
      type: "Startup Incubation Center",
      icon: <Lightbulb size={32} />,
      learnings:
        "Startup incubation lifecycle, seed funding mechanisms, networking with tech entrepreneurs, understanding government support for innovation and emerging startup ecosystems.",
      color: "bg-purple-50 text-purple-900",
      accent: "bg-purple-200",
    },
  ];

  return (
    <section
      id="visits"
      className="py-24 px-6 relative overflow-hidden bg-navy text-white"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-20 px-4 md:px-0"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-cream">
            Industry Immersions
          </h2>
          <p className="text-cream/70 text-lg max-w-2xl">
            My perspective is shaped by seeing real businesses operate at scale,
            not just reading about them in classrooms.
          </p>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 snap-x snap-mandatory hide-scrollbar pl-4 md:pl-0 pr-4"
        >
          {visits.map((visit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`min-w-[85vw] md:min-w-0 snap-center rounded-3xl p-8 flex flex-col h-full ${visit.color} border border-white/20 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
            >
              <div
                className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${visit.accent} opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out`}
              />

              <div className="relative z-10">
                <div className="mb-6 inline-block p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm">
                  {visit.icon}
                </div>

                <div className="mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                    {visit.type}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold mb-1">
                  {visit.title}
                </h3>
                <p className="font-medium opacity-70 mb-6">{visit.company}</p>

                <div className="h-px w-full bg-current opacity-10 mb-6"></div>

                <p className="text-sm leading-relaxed opacity-90 font-medium pb-4">
                  {visit.learnings}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Pagination Indicator */}
        <div className="flex flex-col items-center justify-center pt-2 pb-6 md:hidden max-w-[85vw] mx-auto opacity-80">
          <div className="flex gap-1.5 mb-2.5">
            {visits.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
          <div className="text-white/70 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>Swipe</span>
            <span className="text-white/40">&mdash;</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-white"
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
      <style>{`
 .hide-scrollbar::-webkit-scrollbar {
 display: none;
}
 .hide-scrollbar {
 -ms-overflow-style: none;
 scrollbar-width: none;
}
 `}</style>
    </section>
  );
}

import { Bot, Code2, Server, Layout, LineChart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Tools() {
  const tools = [
    {
      name: "ChatGPT",
      icon: <Bot size={32} />,
      desc: "Used for rapid ideation, conceptualizing marketing strategies, and generating complex app architectures.",
      project: "Big Bite",
    },
    {
      name: "Claude",
      icon: <Bot size={32} />,
      desc: "My go-to for deep logic mapping, nuanced content writing, and structuring extensive prompt chains for AI personas.",
      project: "ANANTA",
    },
    {
      name: "Gemini / AI Studio",
      icon: <Code2 size={32} />,
      desc: "Leveraged for sophisticated multimodal text and media processing, and seamlessly powering AI server-side capabilities.",
      project: "Portfolio AI Agent",
    },
    {
      name: "OutSystems",
      icon: <Server size={32} />,
      desc: "Employed to construct scalable enterprise-level low-code environments and fast-track MVP deployment.",
      project: "General Prototyping",
    },
    {
      name: "n8n AI",
      icon: <Layout size={32} />,
      desc: "My primary engine for building advanced workflow automations, seamlessly connecting data sources with AI APIs.",
      project: "Data Automations",
    },
    {
      name: "Framer",
      icon: <Layout size={32} />,
      desc: "Used to design premium, highly interactive front-end web experiences without getting bogged down in boilerplate code.",
      project: "Agency Concepts",
    },
    {
      name: "Shopify",
      icon: <Layout size={32} />,
      desc: "Configured for developing holistic e-commerce platforms, optimizing conversion funnels, and managing product data.",
      project: "Retail Projects",
    },
    {
      name: "MS Excel (Adv)",
      icon: <LineChart size={32} />,
      desc: "Mastered for deep data validation, dynamic pivots, multi-tier logic, and automated sales reporting structures.",
      project: "CLASM Data Project",
    },
  ];

  return (
    <section id="tools" className="py-24 px-6 relative bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:flex md:items-end md:justify-between gap-8">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-4">
              Tools & Technologies
            </h2>
            <p className="text-charcoal text-lg max-w-2xl">
              An overview of how I deploy specific platforms in my app-building
              process to bridge strategy and execution.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="inline-flex items-center gap-2 bg-navy/5 text-navy px-4 py-2 rounded-full text-sm font-bold border border-navy/10 shadow-sm">
              <Sparkles size={16} className="text-electric" /> Power Builder
            </span>
          </div>
        </div>

        <div className="reveal-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6 card-3d-wrap">
          {tools.map((tool, i) => (
            <motion.div
              key={i} 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ z: 20, y: -5, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ willChange: "transform", transformStyle: "preserve-3d" }}
              className="glass-panel p-6 rounded-3xl border border-white/60 transition-colors group flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-electric mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {tool.icon}
              </div>

              <h3 className="font-bold text-navy text-xl mb-3">{tool.name}</h3>

              <p className="text-charcoal text-sm leading-relaxed mb-6 flex-1">
                {tool.desc}
              </p>

              <div className="pt-4 border-t border-navy/10 mt-auto">
                <span className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-1">
                  Impact Area
                </span>
                <span className="text-sm font-bold text-electric">
                  {tool.project}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

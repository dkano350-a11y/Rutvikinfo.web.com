import { CheckCircle2, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function Skills() {
  const coreSkills = [
    {
      title: "Artificial Intelligence & Prompt Engineering",
      category: "Technical",
    },
    { title: "No-Code & Low-Code App Development", category: "Technical" },
    { title: "Digital Marketing & Marketing Strategy", category: "Strategy" },
    { title: "Market Research & Consumer Behaviour", category: "Research" },
    { title: "Business Research Methods (BRM)", category: "Research" },
    { title: "UI/UX Design Concept & Wireframing", category: "Design" },
    { title: "Advanced Data Analysis (Excel)", category: "Technical" },
    { title: "Social Media Marketing", category: "Strategy" },
    { title: "Content Strategy", category: "Strategy" },
    { title: "Product Design & Startup Planning", category: "Strategy" },
  ];

  return (
    <section id="skills" className="py-24 px-6 relative bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-4">
            Capabilities
          </h2>
          <p className="text-charcoal text-lg max-w-2xl mx-auto">
            Strategic focus areas enabling me to navigate from early ideation to
            market execution.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-navy/5 border border-navy/5">
          <h3 className="text-2xl font-bold text-navy mb-10 flex items-center justify-center gap-3">
            <Target className="text-electric" size={24} /> Core Focus Areas
          </h3>
          <div className="reveal-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 card-3d-wrap">
            {coreSkills.map((skill, i) => (
              <motion.div
                key={i} 
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ z: 20, y: -5, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ willChange: "transform", transformStyle: "preserve-3d" }}
                className="flex items-start gap-4 p-5 rounded-2xl glass-panel border border-white/60 transition-colors group"
              >
                <div className="mt-1">
                  <CheckCircle2
                    className="text-emerald-500 group-hover:scale-110 transition-transform"
                    size={20}
                  />
                </div>
                <div>
                  <div className="text-charcoal font-medium leading-snug mb-1">
                    {skill.title}
                  </div>
                  <div className="text-xs font-bold text-electric tracking-wide uppercase">
                    {skill.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

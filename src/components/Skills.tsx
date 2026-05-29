import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, Target } from "lucide-react";

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
    <section id="skills" className="py-24 px-6 relative bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-4">
            Capabilities
          </h2>
          <p className="text-charcoal text-lg max-w-2xl mx-auto">
            Strategic focus areas enabling me to navigate from early ideation to
            market execution.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-navy/5 border border-navy/5"
        >
          <h3 className="text-2xl font-bold text-navy mb-10 flex items-center justify-center gap-3">
            <Target className="text-electric" size={28} /> Core Focus Areas
          </h3>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coreSkills.map((skill, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.95, y: 20 },
                  show: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 15 },
                  },
                }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-cream/50 border border-navy/5 hover:border-electric/30 transition-colors group"
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

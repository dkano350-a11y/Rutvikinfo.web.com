import React from "react";
import { motion } from "motion/react";
import { Database, MonitorPlay, Sparkles, BookOpen } from "lucide-react";

export default function Courses() {
  const courses = [
    {
      title: "AI in Smart Data Management",
      organization: "Job-Oriented Program",
      icon: <Database size={24} className="text-blue-500" />,
      content:
        "A job-oriented program focused on Data Analysis, Reporting, Business Intelligence, Excel, Google Sheets, Power BI, Tableau, and AI tools such as ChatGPT and Gemini. The course includes hands-on projects, data visualization, reporting automation, and industry-relevant skills for modern data-driven roles.",
      color: "border-blue-200",
    },
    {
      title: "LMS Onboarding & Activation",
      organization: "Professional Learning Milestone",
      icon: <MonitorPlay size={24} className="text-emerald-500" />,
      content:
        "Mandatory onboarding and LMS activation session, including account verification, course portal setup, and learning platform access. Completed necessary protocols to access specialized learning tracks and operational resources.",
      color: "border-emerald-200",
    },
  ];

  return (
    <section id="courses" className="py-24 px-6 relative bg-white/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 text-navy rounded-full text-xs font-bold tracking-wide border border-navy/10 uppercase mb-6">
            <BookOpen size={14} />
            <h2>Certifications & Learning</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-sans font-bold text-navy tracking-tight mb-6">
            Professional Courses & Training
          </h3>
          <p className="text-charcoal/70 text-lg max-w-2xl mx-auto font-medium">
            Additional skill acquisition and platform onboarding.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="relative border-l-2 border-navy/10 ml-4 md:ml-12 pb-8"
        >
          {courses.map((course, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: -30 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { type: "spring", stiffness: 60, damping: 15 },
                },
              }}
              className="mb-12 relative pl-8 md:pl-12"
            >
              <div
                className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-white border-4 ${course.color} flex items-center justify-center shadow-sm`}
              >
                <div className="w-2 h-2 rounded-full bg-navy"></div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-charcoal/5 shadow-xl shadow-black/5 hover:-translate-y-1 transition-transform duration-300 relative group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  {course.icon}
                </div>
                <div className="text-sm font-bold text-electric mb-2 flex items-center gap-2">
                  <Sparkles size={14} /> {course.organization}
                </div>
                <h3 className="font-sans text-2xl font-bold text-navy mb-4 tracking-tight">
                  {course.title}
                </h3>

                <p className="text-charcoal/80 leading-relaxed font-medium">
                  {course.content}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

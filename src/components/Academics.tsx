import {
  BookOpen,
  Database,
  Presentation,
  Target,
  Sparkles,
} from "lucide-react";

export default function Academics() {
  const semesters = [
    {
      year: "2024 (Sem 1) & 2025 (Sem 2)",
      sem: "SEM 1 & 2 — Foundations",
      icon: <BookOpen size={18} className="text-electric" />,
      content:
        "Business Management, Accounting Principles, Business Communication, Organizational Behavior, Basic Market Dynamics.",
      color: "border-blue-200",
    },
    {
      year: "2025",
      sem: "SEM 3 — Core Management & Systems",
      icon: <Database size={18} className="text-purple-500" />,
      content:
        "MIS Portfolio: Enterprise architecture case studies, DBMS models, Transaction Processing Systems (TPS) for retail chains and healthcare. Technical work: ER Diagrams, SQL query design, data-driven organizational insights.",
      color: "border-purple-200",
    },
    {
      year: "2026",
      sem: "SEM 4 — Research & Analytics",
      icon: <Presentation size={18} className="text-emerald-500" />,
      items: [
        {
          title: "BRM Research Thesis",
          desc: '"College Students Buying Behaviour" — Lead Researcher. Explored purchasing psychology, spending triggers, and brand choices.',
        },
        {
          title: "CLASM Data Project",
          desc: "Advanced Excel automation — VLOOKUP/XLOOKUP, dynamic Pivot Tables, multi-tier IF logic, automated sales database management.",
        },
        {
          title: "Industrial Desk Research",
          desc: "Corporate audit tracking roles, data workflow efficiency, operational software quality metrics.",
        },
      ],
      color: "border-emerald-200",
    },
    {
      year: "Current 2026",
      sem: "SEM 5 — Marketing Specialization",
      icon: <Target size={18} className="text-orange-500" />,
      content:
        "Brand Management, Startup Roadmaps, Commercial Property Layout Analysis, Strategic Consumer Outreach.",
      color: "border-orange-200",
    },
  ];

  return (
    <section id="academics" className="py-24 px-6 relative bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center" >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-4">
            Academic Road
          </h2>
          <p className="text-charcoal text-lg">
            BBA Honours journey at AIHM Ahmedabad. Tracking milestones from
            foundation to specialization.
          </p>
        </div>

        <div className=" relative border-l-2 border-navy/10 ml-4 md:ml-12 pb-8">
          {semesters.map((sem, i) => (
            <div key={i} className="mb-12 relative pl-8 md:pl-12">
              <div
                className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-white border-4 ${sem.color} flex items-center justify-center shadow-sm`}
              >
                <div className="w-2 h-2 rounded-full bg-navy"></div>
              </div>

              <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white hover:shadow-lg transition-shadow duration-300 relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  {sem.icon}
                </div>
                <div className="text-sm font-bold text-electric mb-1 flex items-center gap-2">
                  <Sparkles size={18} /> {sem.year}
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy mb-4 items-center gap-2 flex">
                  {sem.sem}
                </h3>

                {sem.content && (
                  <p className="text-charcoal leading-relaxed">{sem.content}</p>
                )}

                {sem.items && (
                  <div className="space-y-4">
                    {sem.items.map((item, j) => (
                      <div key={j} className="bg-white/50 p-4 rounded-xl">
                        <h4 className="font-bold text-navy text-md mb-1">
                          {item.title}
                        </h4>
                        <p className="text-charcoal text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

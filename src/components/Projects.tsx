import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Play,
  X,
  Image as ImageIcon,
  BookOpen,
  Layers,
  Settings,
  Globe,
  Github,
  Info,
  AlertCircle,
  FileText,
  CheckCircle2,
} from "lucide-react";

type CaseStudy = {
  problem: string;
  designProcess: string[];
  challenges: string[];
  mockups: { title: string; desc: string; icon: React.ReactNode }[];
  links: { label: string; url: string; secondary?: boolean }[];
};

type Project = {
  title: string;
  type: string;
  tag: string;
  description: string;
  stack: string[];
  status: string;
  hasPrototype: boolean;
  color: string;
  caseStudy: CaseStudy;
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "design" | "tech">(
    "overview",
  );

  const projects: Project[] = [
    {
      title: "ANANTA",
      type: "AI Companion App",
      tag: "AI × No-Code × Product Design",
      description:
        "A premium AI companion app enabling users to interact with AI personas via chat, voice, and visual experiences. Covers RAG memory architecture, persona design, 3D visual interface, and voice interaction layer.",
      stack: ["Claude AI", "GPT-4", "ElevenLabs", "Flutter concept"],
      status: "🔄 In Development",
      hasPrototype: true,
      color:
        "from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20",
      caseStudy: {
        problem:
          "Traditional AI chatbots are highly transactional, lack continuous contextual storage (long-term RAG memory), and fail to project a distinct, warm, empathic personality over voice-based interfaces.",
        designProcess: [
          "Personas Design: Defined custom personality parameters with speech cadences, response latency modifiers, and specific conversational bounds.",
          "Visual Syncing: Mapped digital frequency lines and breathing particles that oscillate in response to real-time sentiment extraction.",
          "User Experience: Created a beautiful distraction-free full-screen chat focus view, allowing the conversational medium to take center stage.",
        ],
        challenges: [
          "RAG Memory Lag: Fetching relevant vector memories and feeding them to Claude without blowing past the 1500ms voice response latency ceiling.",
          "Sentiment Modulation: Dynamic speech output modulation via API was solved by sending context tags to ElevenLabs on separate audio channels.",
        ],
        mockups: [
          {
            title: "Quantum Sound Ring",
            desc: "An ambient pulsating gradient circle responding to mic volume",
            icon: <Layers size={18} className="text-blue-500" />,
          },
          {
            title: "Sentiment Timeline",
            desc: "Real-time graphing of user emotions decoded by voice-frequency algorithms",
            icon: <CheckCircle2 size={18} className="text-emerald-500" />,
          },
        ],
        links: [
          {
            label: "Interactive Prototype on Share.google",
            url: "https://share.google",
          },
          {
            label: "View Architecture Doc",
            url: "https://share.google",
            secondary: true,
          },
        ],
      },
    },
    {
      title: "MileCharge",
      type: "EV Charging App",
      tag: "UI/UX × Product Design × EV Tech",
      description:
        "Conceptualized and designed the complete UI/UX framework for an EV charging network mobile application — solving real-world charging accessibility problems across Indian cities.",
      stack: ["Figma", "UI/UX", "User Research"],
      status: "✅ Concept & Design Complete",
      hasPrototype: true,
      color:
        "from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20",
      caseStudy: {
        problem:
          "EV drivers face critical range anxiety in metropolitan India due to fragmented telemetry data, inaccurate station statuses, and complex, multiple pre-payment digital wallets.",
        designProcess: [
          "Automotive Context: Designed a super high-contrast console-compatible UI to maintain readability under glowing afternoon sun and minimize driver eye-strain.",
          "One-Tap Booking: Created a swift booking wizard requiring only 2 taps to secure a plug and initiate the charging schedule.",
          "Route Plotting: Fully mapped paths with smart micro-stops tailored to vehicle-specific batteries.",
        ],
        challenges: [
          "Fragmented API Sync: Solved the simulation of open charging point protocols (OCPP) merging status inputs from divergent station operators.",
          "Geo-clustering performance: Developed lightweight React map markers that cluster smoothly by avoiding unneeded re-rendering.",
        ],
        mockups: [
          {
            title: "Console Dashboard",
            desc: "A clean 16:9 view indicating vehicle state, distance metrics, and nearest fast charger slots",
            icon: <Layers size={18} className="text-emerald-500" />,
          },
          {
            title: "One-Pay Checkout",
            desc: "Seamless integrated gateway preview illustrating unified UPI payments",
            icon: <CheckCircle2 size={18} className="text-teal-500" />,
          },
        ],
        links: [
          { label: "Figma Prototype Canvas", url: "https://share.google" },
          {
            label: "UX Research Slides",
            url: "https://share.google",
            secondary: true,
          },
        ],
      },
    },
    {
      title: "Big Bite",
      type: "Fast Food Startup",
      tag: "Business × Branding × Startup",
      description:
        "Developed a full commercial business plan, brand identity, storefront renders, and operational roadmap for a fast-food startup concept targeting college students in Tier-2 Indian cities.",
      stack: ["Canva", "Business Strategy", "Branding"],
      status: "✅ Blueprint Complete",
      hasPrototype: true,
      color:
        "from-orange-500/10 to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20",
      caseStudy: {
        problem:
          "Tier-2 Indian university hubs lack dependable, sanitized, lightning-quick dining setups matching campus schedules, leading to localized monopolies serving low-quality options.",
        designProcess: [
          "Commercial Model: Compiled unit economics, supplier lists, high-density location selection metrics, and franchisee scale strategies.",
          "Brand Sensation: Developed active, engaging warm-toned palettes (orange-to-gold) evoking hunger, rapid student commutes, and communal spaces.",
          "Layout Strategy: Created custom digital storefront rendering guidelines tailored for high-volume campus express outlets.",
        ],
        challenges: [
          "Dynamic Pricing Logic: Structuring a real-time off-peak couponing engine during standard lecture lectures to ensure continuous store velocity.",
          "Supply Chain Consistency: Sourcing high-grade fresh ingredients reliably across disparate regional agricultural links.",
        ],
        mockups: [
          {
            title: "Branded Outlets Mockups",
            desc: "Concept store layouts featuring student self-checkout kiosks",
            icon: <Layers size={18} className="text-orange-500" />,
          },
          {
            title: "Financial Spreadsheet",
            desc: "Break-even models mapping revenue projections vs local vendor costs",
            icon: <CheckCircle2 size={18} className="text-amber-500" />,
          },
        ],
        links: [
          { label: "View Business Pitch Deck", url: "https://share.google" },
          {
            label: "Read Commercial Policy",
            url: "https://share.google",
            secondary: true,
          },
        ],
      },
    },
    {
      title: "Bella Voice",
      type: "Voice AI Assistant",
      tag: "AI × Voice Technology",
      description:
        "Complete blueprint and system architecture for a voice-based AI assistant. Covers conversation flow, persona design, and voice response framework.",
      stack: ["Voice UI", "Conversation Design", "AI Logic"],
      status: "🔄 In Development",
      hasPrototype: true,
      color:
        "from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20",
      caseStudy: {
        problem:
          "Current voice assistants lack standard conversational parameters: failing to process conversational interruptions, localized dialects, or contextual voice-level changes.",
        designProcess: [
          "Turn-taking Flowcharts: Drafted precise state loops covering silence thresholds, mid-conversation interruptions, and echo cancelation patterns.",
          "Vernacular Tuning: Tailored customized system responses supporting popular Indian references, colloquial phrasing, and tone-shifts.",
          "Ambient HUD Layout: Minimalist, always-active floating audio capsule pulsing matching user speech rhythms.",
        ],
        challenges: [
          "State Ambiguity: Devising semantic rules to determine if a user pause is standard thinking or an indication of turn completion.",
          "Noise Gate Isolation: Overcoming microphone background clutter without degrading voice transcription accuracy.",
        ],
        mockups: [
          {
            title: "Turn State Mapping",
            desc: "Logic maps representing decision loops for real-time auditory queues",
            icon: <Layers size={18} className="text-pink-500" />,
          },
          {
            title: "Audio Dashboard console",
            desc: "Telemetry charts verifying speed, response latency, and packet loss",
            icon: <CheckCircle2 size={18} className="text-rose-500" />,
          },
        ],
        links: [
          { label: "Architecture PDF", url: "https://share.google" },
          {
            label: "Explore Voice Flows",
            url: "https://share.google",
            secondary: true,
          },
        ],
      },
    },
  ];

  const openCaseStudy = (project: Project) => {
    setActiveProject(project);
    setActiveTab("overview");
  };

  return (
    <>
      <section id="projects" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.01] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-electric bg-electric/10 px-3 py-1.5 rounded-full inline-block mb-3">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-4">
              Selected Work
            </h2>
            <p className="text-charcoal text-lg max-w-2xl">
              A deep dive into conceptual architectures, user experience
              blueprints, and shipping logs crossing BBA marketing with
              high-level AI integrations.
            </p>
          </motion.div>

          {/* Project List */}
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
            className="grid md:grid-cols-2 gap-8"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                layoutId={`project-card-${project.title}`}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 40, damping: 12 },
                  },
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 0px 30px rgba(56, 189, 248, 0.4)",
                  borderColor: "rgba(56, 189, 248, 0.6)",
                }}
                onClick={() => openCaseStudy(project)}
                className={`glass-panel rounded-3xl p-8 relative overflow-hidden group border border-white/60 bg-gradient-to-br ${project.color} backdrop-blur-md flex flex-col justify-between cursor-pointer`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="text-navy w-8 h-8 opacity-50" />
                </div>

                <div>
                  <div className="mb-4">
                    <motion.span
                      layoutId={`project-tag-${project.title}`}
                      className="inline-block px-3 py-1 bg-white/50 rounded-full text-xs font-semibold text-navy tracking-wide mb-3 backdrop-blur-sm border border-white/50"
                    >
                      {project.tag}
                    </motion.span>
                    <motion.h3
                      layoutId={`project-title-${project.title}`}
                      className="font-serif text-3xl font-bold text-navy mb-1 flex items-center gap-3"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`project-type-${project.title}`}
                      className="text-sm font-medium text-electric"
                    >
                      {project.type}
                    </motion.p>
                  </div>

                  <p className="text-charcoal mb-8 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech, j) => (
                      <span
                        key={j}
                        className="text-xs px-2.5 py-1 bg-navy/5 text-navy rounded-md font-medium border border-navy/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between pt-4 border-t border-navy/5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-navy bg-white/40 px-3 py-1.5 rounded-full border border-white self-start">
                      {project.status}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openCaseStudy(project);
                      }}
                      className="flex items-center justify-center gap-2 text-xs font-bold text-white bg-navy hover:bg-electric transition-colors px-4 py-2.5 rounded-full shadow-sm"
                    >
                      <BookOpen size={14} /> Explore Case Study
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-navy/80 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              layoutId={`project-card-${activeProject.title}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream w-full max-w-4xl h-[90vh] md:h-[85vh] rounded-3xl overflow-hidden shadow-2xl relative border border-white/20 flex flex-col"
            >
              {/* Header bar */}
              <div className="w-full bg-navy p-6 flex items-center justify-between text-white relative z-10 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-electric/15 flex items-center justify-center text-electric font-black text-lg">
                    {activeProject.title[0]}
                  </div>
                  <div>
                    <motion.h3
                      layoutId={`project-title-${activeProject.title}`}
                      className="font-serif text-xl font-bold leading-tight"
                    >
                      {activeProject.title} Case Study
                    </motion.h3>
                    <motion.p
                      layoutId={`project-type-${activeProject.title}`}
                      className="text-xs text-white/60 font-medium tracking-wide uppercase mt-0.5"
                    >
                      {activeProject.type}
                    </motion.p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tabbing Navigation */}
              <div className="bg-white border-b border-navy/5 px-6 py-2.5 flex gap-2 shrink-0 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "overview" ? "bg-navy text-white shadow-sm" : "text-charcoal hover:bg-cream hover:text-navy"}`}
                >
                  <Info size={16} /> Overview
                </button>
                <button
                  onClick={() => setActiveTab("design")}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "design" ? "bg-navy text-white shadow-sm" : "text-charcoal hover:bg-cream hover:text-navy"}`}
                >
                  <Layers size={16} /> UX & Design Process
                </button>
                <button
                  onClick={() => setActiveTab("tech")}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "tech" ? "bg-navy text-white shadow-sm" : "text-charcoal hover:bg-cream hover:text-navy"}`}
                >
                  <Settings size={16} /> Technical Challenges
                </button>
              </div>

              {/* Inside Layout content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                {/* 1. OVERVIEW TAB */}
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-electric mb-2 flex items-center gap-1.5">
                        <AlertCircle size={14} /> The Problem Statement
                      </h4>
                      <p className="text-navy text-base font-medium leading-relaxed bg-electric/5 border border-electric/15 p-5 rounded-2xl">
                        {activeProject.caseStudy.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-3 flex items-center gap-1.5">
                        <ImageIcon size={14} /> Prototype Walkthrough & Visuals
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {activeProject.caseStudy.mockups.map((mockup, idx) => (
                          <div
                            key={idx}
                            className="bg-white border border-navy/10 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:border-navy/20 transition-all"
                          >
                            <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center shrink-0 border border-navy/5">
                              {mockup.icon}
                            </div>
                            <div>
                              <h5 className="font-bold text-navy text-[15px]">
                                {mockup.title}
                              </h5>
                              <p className="text-xs text-charcoal mt-1 leading-relaxed">
                                {mockup.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-navy/5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-3">
                        Tech Stack Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.stack.map((item, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1.5 bg-navy/5 text-navy font-bold rounded-lg border border-navy/5 shadow-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. DESIGN PROCESS TAB */}
                {activeTab === "design" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-electric mb-4 flex items-center gap-1.5">
                        <Layers size={14} /> Design Mechanics
                      </h4>
                      <div className="space-y-4">
                        {activeProject.caseStudy.designProcess.map(
                          (step, idx) => (
                            <div
                              key={idx}
                              className="flex gap-4 items-start bg-white border border-navy/5 p-5 rounded-2xl"
                            >
                              <div className="w-8 h-8 rounded-full bg-navy text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm">
                                {idx + 1}
                              </div>
                              <p className="text-charcoal text-[14px] leading-relaxed mt-0.5">
                                {step}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="bg-white border border-navy/15 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center items-center text-center py-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-cream to-white opacity-50"></div>
                      <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-4 border border-navy/5 z-10">
                        <Play
                          size={24}
                          className="text-electric fill-electric ml-1 animate-pulse"
                        />
                      </div>
                      <h5 className="font-bold text-navy text-lg z-10">
                        Concept Prototype Walkthrough
                      </h5>
                      <p className="text-xs text-charcoal max-w-sm mt-1 mb-4 z-10 leading-relaxed">
                        Interactive mockups, visual maps, and system flows are
                        accessible below.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 3. TECHNICAL CHALLENGES TAB */}
                {activeTab === "tech" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-4 flex items-center gap-1.5">
                        <AlertCircle size={14} /> Hurdles Solved
                      </h4>
                      <div className="space-y-4">
                        {activeProject.caseStudy.challenges.map(
                          (challenge, idx) => (
                            <div
                              key={idx}
                              className="bg-white border border-red-500/10 hover:border-red-500/20 p-5 rounded-2xl flex gap-4 items-start transition-colors"
                            >
                              <span className="text-lg mt-0.5 font-bold text-rose-500">
                                ⚡
                              </span>
                              <div>
                                <h5 className="font-bold text-navy text-[15px] mb-1">
                                  Challenge Core #{idx + 1}
                                </h5>
                                <p className="text-charcoal text-[14px] leading-relaxed">
                                  {challenge}
                                </p>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Technical Mock Blueprint Box */}
                    <div className="bg-charcoal/5 border border-navy/10 rounded-2xl p-5 font-mono text-xs text-charcoal space-y-2 relative">
                      <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-[#239a3b] bg-white border border-black/5 px-2 py-0.5 rounded font-sans font-bold">
                        Compiled successfully
                      </div>
                      <p className="text-electric font-bold">
                        // ANANTA Flow & Context Orchestration
                      </p>
                      <p className="text-charcoal">
                        async function getContextSensitivePrompt(userId,
                        promptInput) &#123;
                      </p>
                      <p className="pl-4 text-charcoal">
                        const userGraph = await fetchRAGMemories(userId,
                        promptInput);
                      </p>
                      <p className="pl-4 text-charcoal">
                        const optimizedResponse = await model.generate(&#123;
                      </p>
                      <p className="pl-8 text-emerald-600">
                        systemInstruction: "You are representing Rutvik's
                        digital companion persona. Respond with empathy and
                        intelligence...",
                      </p>
                      <p className="pl-8 text-charcoal">
                        prompt: `Context: $&#123;JSON.stringify(userGraph)&#125;
                        \nUser query: $&#123;promptInput&#125;`
                      </p>
                      <p className="pl-4 text-charcoal">&#125;);</p>
                      <p className="pl-4 text-charcoal">
                        return optimizedResponse;
                      </p>
                      <p className="text-charcoal">&#125;</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Action Links bar footer */}
              <div className="p-6 bg-white border-t border-navy/5 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
                <span className="text-xs text-charcoal font-bold uppercase tracking-wider">
                  Created as part of digital research portfolio
                </span>
                <div className="flex gap-2.5 w-full sm:w-auto">
                  {activeProject.caseStudy.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl text-xs font-bold transition-all hover:scale-105 duration-200 ${link.secondary ? "bg-navy/5 text-navy border border-navy/10 hover:bg-navy/10" : "bg-electric text-white shadow-md hover:bg-blue-600"}`}
                    >
                      {link.secondary ? (
                        <FileText size={14} />
                      ) : (
                        <Globe size={14} />
                      )}{" "}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

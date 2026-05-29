import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  TerminalSquare,
  MessageSquare,
  ArrowRight,
  Wand2,
  Bot,
  Copy,
  Check,
} from "lucide-react";

const promptExamples = [
  {
    title: "Market Research Analysis",
    prompt:
      "Act as a senior market researcher. Analyze the current trends in sustainable packaging for D2C brands. Provide 3 actionable strategies, 2 potential risks, and structure the output in a scannable format with bullet points and bold headers.",
    output:
      "Clearly structured analysis identifying biodegradable materials, unboxing experience optimization, and cost-efficiency strategies, highlighting supply chain vulnerabilities.",
  },
  {
    title: "Conversion Copywriting",
    prompt:
      "Write a high-converting landing page headline and subheadline for a new AI-powered time management app targeted at ADHD professionals. The tone should be empathetic, empowering, and concise. Avoid generic tech jargon.",
    output:
      "Resulted in 'Reclaim Your Focus, On Your Terms' with a subheadline emphasizing personalized workflows over rigid schedules.",
  },
  {
    title: "Code Structuring",
    prompt:
      "I have a React component that is becoming too large (handling state, fetching data, and rendering UI). Outline a plan to refactor this into custom hooks and smaller presentation components using modern React patterns.",
    output:
      "Provided a step-by-step refactoring architecture, separating business logic into custom hooks and organizing UI into focused stateless components.",
  },
];

export default function FeaturedSkill() {
  const [activeTab, setActiveTab] = useState(0);
  const [userPrompt, setUserPrompt] = useState("");
  const [demoResponse, setDemoResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptExamples[activeTab].prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    setIsGenerating(true);
    setDemoResponse("");

    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setDemoResponse(
        `Here is a simulated AI response to: "${userPrompt}". In a real environment, this input would be processed by the Gemini API to demonstrate dynamic, context-aware prompt engineering capabilities live.`,
      );
    }, 1500);
  };

  return (
    <section
      className="py-24 bg-navy relative overflow-hidden"
      id="prompt-engineering"
    >
      {/* Background aesthetics */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-electric/20 rounded-full blur-3xl rounded-full"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 text-electric border border-electric/20 mb-6"
          >
            <Sparkles size={16} />
            <span className="text-sm font-bold tracking-wide uppercase">
              Featured Skill Spotlight
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-white mb-6"
          >
            AI Prompt Engineering
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed"
          >
            The art and science of communicating effectively with large language
            models to extract precise, high-value outputs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Explanation & Examples */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <TerminalSquare className="text-electric" /> Designing the Input
              </h3>
              <p className="text-white/70 leading-relaxed mb-6 font-light">
                Prompt engineering is more than just typing questions. It
                involves structuring context, assigning roles, defining
                constraints, and iterating based on output. A well-crafted
                prompt turns a generic AI into a highly specialized expert
                tailored to your exact workflow.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-electric/20 p-1.5 rounded-full">
                    <Wand2 size={14} className="text-electric" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">
                      Contextual Anchoring
                    </h4>
                    <p className="text-sm text-white/50">
                      Providing background information to guide the AI's
                      understanding.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-electric/20 p-1.5 rounded-full">
                    <MessageSquare size={14} className="text-electric" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">
                      Persona Adoption
                    </h4>
                    <p className="text-sm text-white/50">
                      Instructing the model to act as a specific expert or
                      character.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">
                Proven Prompt Structures
              </h3>

              <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
                {promptExamples.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === idx
                        ? "bg-electric text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                        : "bg-white/10 text-white/60 hover:bg-white/15"
                    }`}
                  >
                    {example.title}
                  </button>
                ))}
              </div>

              <div className="mt-4 relative min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <div className="bg-navy/50 border border-white/5 rounded-xl p-5 mb-4 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-electric"></div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-electric block uppercase tracking-wider">
                          Input Prompt
                        </span>
                        <button
                          onClick={handleCopy}
                          className="text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-md flex items-center justify-center"
                          title="Copy to clipboard"
                        >
                          {copied ? (
                            <Check size={14} className="text-green-400" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-white/90 italic">
                        "{promptExamples[activeTab].prompt}"
                      </p>
                    </div>

                    <div className="pl-4 border-l border-white/10 ml-2">
                      <span className="text-xs font-mono text-emerald-400 mb-1 flex items-center gap-1">
                        <ArrowRight size={12} /> Output Result
                      </span>
                      <p className="text-sm text-white/60">
                        {promptExamples[activeTab].output}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-cream rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Top decorative bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-electric via-purple-500 to-electric"></div>

            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl font-bold text-navy flex items-center gap-2">
                <Bot className="text-electric" /> Try It Yourself
              </h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
                Live Demo
              </span>
            </div>

            <p className="text-charcoal mb-8 max-w-sm">
              Experience the difference a clear prompt makes. Enter a basic
              request below to see how it transforms.
            </p>

            <form onSubmit={handleDemoSubmit} className="mb-8">
              <label
                htmlFor="interactive-prompt"
                className="block text-sm font-bold text-navy mb-2"
              >
                Your Prompt:
              </label>
              <div className="relative">
                <textarea
                  id="interactive-prompt"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="e.g., Write a cold email for a marketing agency..."
                  className="w-full bg-white border-2 border-navy/10 rounded-xl p-4 min-h-[120px] text-charcoal focus:outline-none focus:border-electric focus:ring-4 focus:ring-electric/20 transition-all resize-none shadow-inner"
                ></textarea>
                <div className="absolute bottom-3 right-3 text-xs text-charcoal font-mono">
                  {userPrompt.length} chars
                </div>
              </div>

              <button
                type="submit"
                disabled={!userPrompt.trim() || isGenerating}
                className="mt-4 w-full bg-navy hover:bg-electric text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg hover:shadow-electric/30"
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <Wand2 size={18} className="text-white/80" />
                  </motion.div>
                ) : (
                  <Sparkles size={18} className="group-hover:animate-pulse" />
                )}
                {isGenerating ? "Processing Context..." : "Simulate Output"}
              </button>
            </form>

            <div className="bg-navy/5 rounded-xl border border-navy/10 p-6 min-h-[160px] flex flex-col relative overflow-hidden">
              <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-3 flex items-center gap-2">
                <ArrowRight size={14} className="text-electric" /> Generated
                Response
              </h4>

              {demoResponse ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-charcoal leading-relaxed"
                >
                  {demoResponse}
                </motion.div>
              ) : isGenerating ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-charcoal">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-electric"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium uppercase tracking-widest">
                    Generating
                  </span>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-charcoal text-sm italic text-center px-4">
                  Enter a prompt and hit simulate to see the result here.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

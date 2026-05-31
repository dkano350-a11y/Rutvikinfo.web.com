import React, { useState } from "react";
import { Sparkles, Bot, Layers, Check, Copy, Wand2, MessageSquare, ArrowRight, Terminal } from "lucide-react";

export default function FeaturedSkill() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [demoResponse, setDemoResponse] = useState("");

  const promptExamples = [
    {
      title: "Content Marketing",
      prompt: "Act as a senior copywriter. Draft a 3-part email sequence for a new SaaS product launch. Context: The product is AI-driven analytics. Target Audience: CMOs. Goal: Book a demo.",
      output: "Subject 1: The AI Analytics edge for CMOs...\nSubject 2: Less data wrangling, more strategy...\nSubject 3: Quick 15-min demo to see it live...",
    },
    {
      title: "Code Generation",
      prompt: "Write a React hook in TypeScript that handles a paginated API request with built-in debouncing, error handling, and offline caching via localStorage.",
      output: "const usePaginatedData = <T>({...}) => {\n  const [data, setData] = useState<T[]>([]);\n  // Implementation details...\n}",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(promptExamples[activeTab].prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setDemoResponse(
        `Optimized output: Based on your input "${userPrompt.substring(
          0,
          20
        )}...", here is a structured and highly contextualized response utilizing best prompt engineering practices.`
      );
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <section id="featured-skill" className="py-24 px-4 md:px-6 relative bg-navy/90 backdrop-blur-md border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-electric/10 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 md:text-center text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-electric rounded-full text-xs font-bold tracking-wide border border-white/10 uppercase mb-6">
            <Sparkles size={14} />
            <h2>Featured Skill</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight mb-6">
            Mastering Prompt Engineering
          </h3>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Bridging the gap between human intention and AI execution through advanced instruction design.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column: Explanations & Examples */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">The Anatomy of a Perfect Prompt</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-electric/20 p-2 rounded-xl border border-electric/20">
                    <Layers size={20} className="text-electric" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Structured Formatting</h4>
                    <p className="text-sm text-white/50 leading-relaxed">Using markdown, delimiters, and clear headings to segment logical boundaries.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-purple-500/20 p-2 rounded-xl border border-purple-500/20">
                    <Wand2 size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Contextual Anchoring</h4>
                    <p className="text-sm text-white/50 leading-relaxed">Providing background information to guide the AI's understanding and constraints.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/20">
                    <MessageSquare size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Persona Adoption</h4>
                    <p className="text-sm text-white/50 leading-relaxed">Instructing the model to act as a specific expert, tailoring tone and depth.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Proven Prompt Structures</h3>

              <div className="flex flex-wrap gap-2 pb-4">
                {promptExamples.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeTab === idx
                        ? "bg-electric text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                        : "bg-white/5 text-white/60 hover:bg-white/10 border border-transparent hover:border-white/10"
                    }`}
                  >
                    {example.title}
                  </button>
                ))}
              </div>

              <div className="mt-2 relative">
                <div className="bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden group">
                  {/* MacOS Window Header */}
                  <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="ml-3 text-xs font-mono text-white/40 flex items-center gap-2"><Terminal size={12}/> terminal - bash</span>
                  </div>
                  <div className="p-5 relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-electric block uppercase tracking-wider font-bold">~ Input Prompt</span>
                      <button
                        onClick={handleCopy}
                        className="text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-lg flex items-center justify-center border border-white/5 hover:border-white/10"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <p className="text-sm md:text-base text-white/80 italic leading-relaxed mb-6 font-mono break-words whitespace-pre-wrap">
                      "{promptExamples[activeTab].prompt}"
                    </p>
                    
                    <div className="pt-5 border-t border-white/10">
                      <span className="text-xs font-mono text-emerald-400 mb-3 flex items-center gap-2 font-bold">
                        <ArrowRight size={14} /> Output Result
                      </span>
                      <p className="text-sm md:text-base text-white/50 font-mono leading-relaxed bg-white/5 p-4 rounded-xl break-words whitespace-pre-wrap overflow-x-hidden">
                        {promptExamples[activeTab].output}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Screen Demo Mockup */}
          <div className="bg-cream rounded-2xl md:rounded-3xl shadow-2xl relative overflow-hidden ring-1 ring-black/5 transform transition-all duration-500 hover:shadow-electric/10 mt-4 md:mt-0">
            {/* Screen Mockup Top Bar */}
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between pointer-events-none sticky top-0 z-10 w-full">
               <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
               </div>
               <div className="flex-1 px-4">
                  <div className="bg-white/80 border border-gray-200/60 rounded-md py-1 px-3 text-center text-xs font-medium text-gray-500 max-w-sm mx-auto shadow-inner flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    sandbox.prompt-engine.local
                  </div>
               </div>
            </div>

            <div className="p-6 md:p-8 lg:p-10 relative">
              <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                <h3 className="font-serif text-2xl font-bold text-navy flex items-center gap-2">
                  <Bot className="text-electric" /> Try It Yourself
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide flex items-center gap-1.5 border border-green-200 shadow-sm">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                   Live Demo
                </span>
              </div>

              <p className="text-charcoal/80 mb-8 max-w-sm text-sm md:text-base">
                Experience the difference a precise instructional prompt structure makes.
              </p>

              <form onSubmit={handleDemoSubmit} className="mb-8">
                <label htmlFor="interactive-prompt" className="block text-sm font-bold text-navy mb-2">
                  Your Prompt:
                </label>
                <div className="relative group">
                  <textarea
                    id="interactive-prompt"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="e.g., Write a cold email for..."
                    className="w-full bg-white border-2 border-navy/10 rounded-2xl p-4 min-h-[140px] text-charcoal focus:outline-none focus:border-electric focus:ring-4 focus:ring-electric/20 transition-all resize-none shadow-sm group-hover:border-navy/20"
                  ></textarea>
                  <div className="absolute bottom-4 right-4 text-xs text-charcoal/50 font-mono bg-white/80 backdrop-blur px-2 py-1 rounded-md border border-gray-100 pointer-events-none">
                    {userPrompt.length} chars
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!userPrompt.trim() || isGenerating}
                  className="mt-6 w-full bg-navy hover:bg-electric text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl hover:shadow-electric/30 hover:-translate-y-0.5"
                >
                  {isGenerating ? <div className="animate-spin"><Wand2 size={18} className="text-white/80" /></div> : <Sparkles size={18} className="group-hover:animate-pulse" />}
                  {isGenerating ? "Processing Context..." : "Simulate AI Output"}
                </button>
              </form>

              <div className="bg-navy/5 rounded-2xl border border-navy/10 p-6 min-h-[180px] flex flex-col relative overflow-hidden transition-all duration-300">
                <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ArrowRight size={16} className="text-electric" /> Generated Response
                </h4>

                {demoResponse ? (
                  <div className="text-sm text-charcoal leading-relaxed p-4 bg-white/60 rounded-xl border border-white shadow-sm font-medium">{demoResponse}</div>
                ) : isGenerating ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 text-charcoal/60">
                    <div className="flex gap-2">
                      {[0, 1, 2].map((_, i) => (
                        <div key={i} className="w-2.5 h-2.5 rounded-full bg-electric animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-navy bg-navy/5 px-3 py-1 rounded-full">Reasoning</span>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-charcoal/50 text-sm italic text-center px-4">
                    <div className="max-w-[200px]">Enter a prompt above and hit simulate to observe the contextual output.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


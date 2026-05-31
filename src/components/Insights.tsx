import React, { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Clock,
  Link,
  Check,
  Mail,
  Send,
  Search,
  X,
  ChevronRight,
  Share2,
  Twitter,
  Linkedin,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

type Article = {
  id: number;
  title: string;
  category: "No-Code Strategies" | "AI Trends" | "Marketing Innovations";
  description: string;
  readTime: string;
  date: string;
  featured: boolean;
  content: {
    introduction: string;
    sections: { heading: string; body: string }[];
    conclusion: string;
  };
};

export default function Insights() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isViewingAll, setIsViewingAll] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Subscription state
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const text = `Hi Rutvik, I would like to stay in the loop! My email is ${email}`;
      window.open(
        `https://wa.me/919328796324?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer",
      );
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const posts: Article[] = [
    {
      id: 1,
      title: "The Silent Shift: How No-Code is Redefining the MVP",
      category: "No-Code Strategies",
      description:
        "Tired of months-long development cycles? Here is how to validate multi-million dollar startup concepts in a weekend using visual programming.",
      readTime: "4 min read",
      date: "May 15, 2026",
      featured: true,
      content: {
        introduction:
          "Developing any high-fidelity product used to take months of planning, hiring developers, and wasting capital on unvalidated ideas. Today, visual programming frameworks have initiated a quiet revolution — bringing power directly to product builders and marketing strategists.",
        sections: [
          {
            heading: "1. The Traditional Bottleneck",
            body: "Historically, launching a Minimum Viable Product (MVP) required setting up infrastructure, architecting backends, and debugging frontends. This delay between inspiration and validation is where 90% of prospective startups die. Visual compilers completely skip this barrier, converting user flow charts directly into optimized cloud code.",
          },
          {
            heading: "2. Weekends, Not Semesters",
            body: "By standardizing drag-and-drop mechanics with modular database logic, platforms like OutSystems allow creators to build responsive functional portals, manage state changes, and map telemetry points in days. This enables rapid agile iterations based on active user feedback rather than theoretical speculation.",
          },
          {
            heading: "3. Real Validation Over Paper Blueprints",
            body: "No-code allows us to test actual buying intent by delivering operating solutions directly to customers. When building Big Bite, rapid visual mapping allowed us to demonstrate operational maps and self-checkout portals to potential sponsors in days rather than waiting for structural code, completely changing our speed to market.",
          },
        ],
        conclusion:
          "The competitive edge belongs to those who iterate faster. No-code is not just a shortcut — it is a strategic business paradigm shifting MVP development from heavy technical debt into immediate market validation.",
      },
    },
    {
      id: 2,
      title: "Building ANANTA: Architecting AI Companions for the Real World",
      category: "AI Trends",
      description:
        "A deep dive into the RAG architecture and persona design framework used to build ANANTA, exploring what makes an AI feel 'alive'.",
      readTime: "8 min read",
      date: "April 28, 2026",
      featured: false,
      content: {
        introduction:
          "AI interaction patterns are undergoing a profound evolution. Simple prompt-and-response chatbots feel sterile, mechanical, and transactional. With ANANTA, our goal was to build a warm, contextual companion capable of real emotional intelligence, multimodal interaction, and long-term memory.",
        sections: [
          {
            heading: "1. The Memory Layer: Cognitive RAG",
            body: "Most models suffer from amnesia after a conversation session. We resolved this by integrating a modular Retrieval-Augmented Generation (RAG) architecture. When you talk to ANANTA, a vector graph parses past preferences, conversational flow dynamics, and historical moods to generate a coherent, contextual, continuous dialog.",
          },
          {
            heading: "2. Breathing Warmth into Speech",
            body: "Using ElevenLabs API, we designed distinct verbal pacing boundaries. By modulating latency responses, incorporating conversational breathing cues, and analyzing real-time sentiment from user messages, we built an assistant that shifts vocal styles seamlessly from energetic and inspiring to comforting.",
          },
          {
            heading: "3. Designing Context Borders",
            body: "To prevent AI loops and maintain a safe, constructive companionship bubble, we structured semantic gatekeepers. These guardrails parse inputs for high-anxiety triggers, gracefully routing discussions toward grounded topics while keeping persona consistency intact.",
          },
        ],
        conclusion:
          "A true companions app isn't built on raw processing metrics alone. It requires crossing algorithmic precision with behavioral science, building interfaces that feel helpful, compassionate, and fundamentally human.",
      },
    },
    {
      id: 3,
      title: "Omnichannel is Dead. Long Live Hyper-Personalization.",
      category: "Marketing Innovations",
      description:
        "Why traditional omnichannel marketing campaigns are failing to capture Gen-Z attention, and how data-driven micro-targeting is taking over.",
      readTime: "5 min read",
      date: "March 12, 2026",
      featured: false,
      content: {
        introduction:
          "For a decade, omnichannel was the holy grail of corporate marketing departments. The thesis was simple: be everywhere, on every device, all the time. But Gen-Z has developed systemic banner blindness and notification fatigue. Spreading standard ads across multiple platforms is now just throwing marketing budget down the drain.",
        sections: [
          {
            heading: "1. The Rise of the Hyper-Target",
            body: "Instead of bombarding users at random, hyper-personalization builds on predictive intent models. By leveraging local databases, shopping cycles, and real-time app telemetry, modern marketing campaigns act on precise microscopic triggers — offering the exact suggestion a user needs, right at the point of action.",
          },
          {
            heading: "2. Insights from Logistics Giants",
            body: "During my industry visits to Adani Ports and Amul, I saw how massive distribution infrastructures coordinate data streams in real-time. Translating this precision to consumer marketing means organizing message channels as an active supply line — matching content delivery to active behavioral cycles rather than static calendar lists.",
          },
          {
            heading: "3. Bridging Content with Context",
            body: "True micro-targeting is empathetic. It respects the user's attention span. By designing visual interfaces that adjust color themes and headlines dynamically based on how users scroll, we create an active dialogue that retains attention organically.",
          },
        ],
        conclusion:
          "The future belongs to depth, not breadth. Marketing strategy is no longer about maximizing raw impressions; it is about cultivating hyper-relevant microscopic interactions that add genuine user value.",
      },
    },
    {
      id: 4,
      title: "The No-Code Roadmap: Scaling Beyond the Prototype",
      category: "No-Code Strategies",
      description:
        "Common myths about visual programming and visual compilers. Detailed breakdown of database indexing, clean API request protocols, and code separation.",
      readTime: "6 min read",
      date: "February 20, 2026",
      featured: false,
      content: {
        introduction:
          "Many engineering veterans dismiss visual development as a playground toy useful only for low-tier mockups. That assumption is rapidly becoming outdated. Let’s map out the operational guidelines to take a weekend build to enterprise scale.",
        sections: [
          {
            heading: "1. Structured Database Indexing",
            body: "The core bottleneck of no-code systems is database design. Creating nested and flat structures, setting appropriate indexes, and implementing strict pagination limits prevents server bottlenecks during unexpected transaction surges.",
          },
          {
            heading: "2. Optimizing API Handshakes",
            body: "Do not poll client-side keys constantly. Using lightweight webhook payloads, queuing jobs server-side, and establishing clean caching layers in proxy servers are vital steps before introducing thousands of users to your MVP.",
          },
        ],
        conclusion:
          "By structuring data flows symmetrically and caching endpoint variables thoughtfully, visual apps can comfortably handle millions of API calls, bridging the divide between agile speed and massive scale.",
      },
    },
    {
      id: 5,
      title: "Prompt Engineering: Creative Copywriting for the Machine",
      category: "AI Trends",
      description:
        "Bridging the gap between standard linguistic copy and mathematical AI constraints. Deep review of custom system boundaries, priming instructions, and dynamic variables.",
      readTime: "7 min read",
      date: "January 14, 2026",
      featured: false,
      content: {
        introduction:
          "Prompt engineering is often treated as a mysterious dark art of random keyword recipes. In reality, it is a form of structured programming using high-level human vocabulary. It is the ultimate bridge between design thinking and artificial intelligence.",
        sections: [
          {
            heading: "1. Contextual Boundary Mapping",
            body: "Simply instructing an AI to 'be polite' is insufficient. Effective prompts require definite systemic parameters: defining role boundaries, specific domain focus areas, allowed vocabulary ranges, and strict formatting directives.",
          },
          {
            heading: "2. Variable Injection & Conversational Rhythm",
            body: "Combining static system constraints with dynamic user properties (location, conversation history, tone preferences) allows the AI to craft responses that feel highly relevant, matching the unique vibration of each individual user.",
          },
        ],
        conclusion:
          "Prompt engineering is the new copywriting. By treating prompts as structured program frameworks, product strategists can architect interfaces that communicate with surgical precision and deep empathy.",
      },
    },
  ];

  const handleCopy = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    e.preventDefault();
    const shareUrl = `${window.location.origin}/#insight-${id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = (platform: string, article: Article) => {
    const text = `Read "${article.title}" by Rutvik Dangar`;
    const url = encodeURIComponent(
      `${window.location.origin}/#insight-${article.id}`,
    );

    let shareUrl = "";
    if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
    } else if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === "whatsapp") {
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + window.location.origin + "/#insight-" + article.id)}`;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  // Filters logic
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = posts.filter((p) => !p.featured).slice(0, 2);

  const categories = [
    "All",
    "AI Trends",
    "No-Code Strategies",
    "Marketing Innovations",
  ];

  return (
    <>
      <section
        id="insights"
        className="py-24 px-6 relative bg-transparent border-t border-navy/5"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-[0.01] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header element */}
          <motion.div 
            initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10 md:flex md:items-end md:justify-between gap-8" 
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-electric bg-electric/10 px-3 py-1.5 rounded-full inline-block mb-3">
                Publications
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-4">
                {activeCategory === "All" ? "Insights & Writing" : activeCategory}
              </h2>
              <p className="text-charcoal text-lg max-w-2xl mt-4">
                Thoughts, guidelines, and engineering analyses written on AI
                pipelines, visual programming MVP architecture, and high-convert
                marketing.
              </p>
            </div>
          </motion.div>

          {/* Categorization chips - Always Visible */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-8 mb-4 border-b border-navy/5">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCategory(cat);
                  setIsViewingAll(true);
                  if (cat === "All") setIsViewingAll(false);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? "bg-navy text-white shadow-sm" : "bg-white text-charcoal border border-navy/10 hover:bg-cream hover:text-navy"}`}
              >
                {cat === "All" ? "Featured & Latest" : cat}
              </button>
            ))}
          </div>

          {/* DYNAMIC VIEW FOR BLOG INDEX / ARCHIVE */}
          {isViewingAll ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-10 mb-20" 
            >
              {/* Filters & Search Row */}
              <div className="bg-white border border-navy/10 p-4 rounded-3xl md:flex md:items-center md:justify-between gap-6 shadow-sm">
                {/* Search field */}
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal" />
                    <input
                    type="text"
                    placeholder="Search articles & concepts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-cream/50 text-navy font-medium placeholder:text-charcoal rounded-2xl focus:outline-none focus:ring-2 focus:ring-electric transition-shadow text-sm border border-navy/5"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal hover:text-navy"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Grid block */}
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post, index) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                      key={post.id} onClick={() => setSelectedArticle(post)}
                      className="group flex flex-col justify-between bg-white rounded-3xl p-8 border border-navy/10 hover:border-navy/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <span className="inline-block px-3 py-1 bg-navy/5 text-navy rounded-full text-xs font-bold tracking-wide border border-navy/10 uppercase">
                            {post.category}
                          </span>
                          <span className="text-[11px] text-charcoal font-bold tracking-wider">
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-navy text-lg leading-tight mb-3 group-hover:text-electric transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-charcoal text-xs leading-relaxed mb-6 line-clamp-3">
                          {post.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-navy/5 mt-auto">
                        <span className="text-xs font-medium text-charcoal">
                          {post.date}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-navy group-hover:bg-electric group-hover:text-white transition-colors">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-navy/5 rounded-3xl p-16 text-center text-charcoal">
                  <p className="text-lg font-bold text-navy mb-1">
                    No articles found
                  </p>
                  <p className="text-sm">
                    Try adjusting your search query or topic filtering.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            /* STANDARD HOME VIEW */
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {/* Featured Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onClick={() => setSelectedArticle(featuredPost)}
                className="group flex flex-col justify-between bg-white rounded-3xl p-8 border border-electric/30 hover:border-electric ring-1 ring-electric/5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer md:col-span-2"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-electric/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-block px-3 py-1 bg-electric/10 text-electric rounded-full text-xs font-extrabold tracking-widest border border-electric/10 uppercase">
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-charcoal font-medium">
                        <Clock size={18} /> {featuredPost.readTime}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleCopy(e, featuredPost.id)}
                      className="p-2 rounded-full hover:bg-navy/5 text-charcoal hover:text-navy transition-colors relative z-10"
                      title="Copy Link"
                    >
                      {copiedId === featuredPost.id ? (
                        <Check size={18} className="text-emerald-500" />
                      ) : (
                        <Link size={18} />
                      )}
                    </button>
                  </div>

                  <h3 className="font-serif font-bold text-navy mb-4 leading-tight group-hover:text-electric transition-colors text-2xl md:text-4xl pr-8">
                    {featuredPost.title}
                  </h3>

                  <p className="text-charcoal leading-relaxed mb-8 text-base md:text-lg max-w-xl">
                    {featuredPost.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-navy/5 mt-auto">
                  <span className="text-xs font-medium text-charcoal">
                    {featuredPost.date}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-bold text-electric">
                    Read Article <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.div>

              {/* Other Regular posts */}
              <div className="flex flex-col gap-6">
                {regularPosts.map((post, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.2, type: "spring", stiffness: 100 }}
                    key={post.id} onClick={() => setSelectedArticle(post)}
                    className="group bg-white rounded-3xl p-6 border border-navy/10 hover:border-navy/30 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between cursor-pointer flex-1"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-block px-2.5 py-0.5 bg-navy/5 text-navy rounded-full text-[10px] font-bold tracking-wide border border-navy/10 uppercase">
                          {post.category}
                        </span>
                        <button
                          onClick={(e) => handleCopy(e, post.id)}
                          className="p-1.5 rounded-full hover:bg-navy/5 text-charcoal hover:text-navy transition-colors relative z-10"
                          title="Copy Link"
                        >
                          {copiedId === post.id ? (
                            <Check size={18} className="text-emerald-500" />
                          ) : (
                            <Link size={18} />
                          )}
                        </button>
                      </div>

                      <h4 className="font-serif font-bold text-navy text-base leading-snug mb-2 group-hover:text-electric transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-charcoal text-xs leading-relaxed line-clamp-2 mb-4">
                        {post.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-navy/5 mt-auto">
                      <span className="text-[11px] text-charcoal font-bold">
                        {post.date}
                      </span>
                      <ChevronRight size={18} className="text-navy group-hover:text-electric transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Box */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-navy rounded-3xl p-8 md:p-12 relative overflow-hidden" 
          >
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-[#0d1b3e] to-[#040817] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left md:max-w-md">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3 flex items-center justify-center md:justify-start gap-3">
                  <Mail className="text-electric animate-bounce" /> Stay in the
                  loop
                </h3>
                <p className="text-white/70 text-sm md:text-base">
                  Get occasional publication archives on what I'm designing and
                  shipping across AI pipelines, visual compiler setups, and
                  marketing matrices.
                </p>
              </div>

              <div className="w-full md:max-w-md">
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      required
                      className="w-full pl-5 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-electric backdrop-blur-sm text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={subscribed} className="px-6 py-4 bg-electric text-white font-bold rounded-xl hover:bg-blue-500 transition-colors flex items-center gap-2 group disabled:opacity-80 disabled:cursor-not-allowed text-sm"
                  >
                    {subscribed ? (
                      <>
                        <Check size={18} /> Subscribed!
                      </>
                    ) : (
                      <>
                        <Send
                          size={18} className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </form>
                <p className="text-white/40 text-xs mt-3 text-center md:text-left">
                  No tracking scripts. Unsubscribe anytime in 1-click.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DETAILED ARTICLE READER MODAL */}
      
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-navy/85 backdrop-blur-md" onClick={() => setSelectedArticle(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl h-[90vh] md:h-[85vh] rounded-3xl overflow-hidden shadow-2xl relative border border-navy/10 flex flex-col text-navy"
            >
              {/* Back navigation/close panel */}
              <div className="bg-cream/40 px-6 py-4 border-b border-navy/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#239a3b] bg-[#e1f5fe]/80 border border-[#b3e5fc]/30 px-2.5 py-1 rounded">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-charcoal font-bold">
                    {selectedArticle.readTime}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-9 h-9 bg-navy/5 text-navy hover:bg-navy hover:text-white rounded-full flex items-center justify-center transition-all border border-navy/10"
                  title="Close Reader"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Reader Body content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 select-text">
                {/* Meta details */}
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl md:text-4xl font-bold text-navy leading-tight pr-6">
                    {selectedArticle.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-charcoal font-semibold border-b border-navy/5 pb-6">
                    <span>Published: {selectedArticle.date}</span>
                    <span>•</span>
                    <span>By Rutvik Dangar</span>
                  </div>
                </div>

                {/* Body paragraph content */}
                <div className="space-y-6 text-charcoal leading-relaxed text-sm md:text-base">
                  <p className="font-medium text-navy text-base md:text-lg italic border-l-4 border-electric pl-4 py-1">
                    {selectedArticle.content.introduction}
                  </p>

                  {/* Dynamic sections */}
                  {selectedArticle.content.sections.map((section, idx) => (
                    <div key={idx} className="space-y-3 pt-4">
                      <h4 className="font-serif font-bold text-navy text-lg md:text-xl">
                        {section.heading}
                      </h4>
                      <p className="leading-relaxed">{section.body}</p>
                    </div>
                  ))}

                  {/* Summary/conclusion */}
                  <div className="pt-6 border-t border-navy/5 mt-8 bg-cream/15 p-6 rounded-2xl">
                    <h5 className="font-bold text-navy text-[15px] mb-2">
                      Architectural Conclusion
                    </h5>
                    <p className="text-xs leading-relaxed italic">
                      {selectedArticle.content.conclusion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Share & actions footer */}
              <div className="p-6 bg-cream/30 border-t border-navy/5 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
                <span className="text-xs font-bold text-navy flex items-center gap-1.5 uppercase tracking-wide">
                  <Share2 size={18} /> Spread the word
                </span>

                <div className="flex gap-2 w-full sm:w-auto">
                  {/* Share Twitter */}
                  <button
                    onClick={() => handleShare("twitter", selectedArticle)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
                  >
                    <Twitter size={18} /> X / Twitter
                  </button>

                  {/* Share LinkedIn */}
                  <button
                    onClick={() => handleShare("linkedin", selectedArticle)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
                  >
                    <Linkedin size={18} /> LinkedIn
                  </button>

                  {/* Share WhatsApp */}
                  <button
                    onClick={() => handleShare("whatsapp", selectedArticle)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
                  >
                    <MessageSquare size={18} /> WhatsApp
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={(e) => handleCopy(e as any, selectedArticle.id)}
                    className="p-2.5 rounded-xl bg-navy/5 text-navy border border-navy/10 hover:bg-navy/10 transition-colors flex items-center justify-center"
                    title="Copy Article Link"
                  >
                    {copiedId === selectedArticle.id ? (
                      <Check size={18} className="text-emerald-500" />
                    ) : (
                      <Link size={18} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
    </>
  );
}

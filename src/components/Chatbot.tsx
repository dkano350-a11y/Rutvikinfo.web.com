import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Sparkles,
  Paperclip,
  Trash2,
  RotateCcw,
  MoreVertical,
  Image as ImageIcon,
  Settings,
  Share2,
  FileText,
} from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextareaAutosize from "react-textarea-autosize";

type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
  image?: string;
};

const SECTION_SUGGESTIONS: Record<string, string[]> = {
  hero: [
    "Who is Rutvik?",
    "What are his main skills?",
    "Where is he studying?",
  ],
  about: [
    "Tell me more about his background",
    "What is his edge?",
    "Where is he based?",
  ],
  projects: [
    "What is ANANTA?",
    "How does MileCharge work?",
    "Tell me about the fast food startup",
  ],
  academics: [
    "What is his BRM thesis about?",
    "What did he learn in Sem 3?",
    "Tell me about the CLASM data project",
  ],
  visits: [
    "What did he learn at Amul?",
    "Tell me about his visit to Adani Ports",
    "What did he do at Electrotherm?",
  ],
  skills: [
    "What are his core marketing skills?",
    "What UI/UX tools does he use?",
    "Is he experienced with data analysis?",
  ],
  tools: [
    "How does he use Claude?",
    "What does he build with OutSystems?",
    "Why does he use Framer?",
  ],
  insights: [
    "What is his opinion on No-Code?",
    "Tell me about the Omnichannel post",
    "What are his thoughts on AI trends?",
  ],
  contact: [
    "What is his email address?",
    "Does he have a LinkedIn?",
    "Is he open to internships?",
  ],
  default: [
    "Who is Rutvik?",
    "What projects has he built?",
    "What is ANANTA?",
    "How can I contact him?",
  ],
};

const INITIAL_MESSAGE =
  "Hi there! I'm Rutvik's AI assistant. I have complete knowledge of his academic journey, marketing strategies, industry visits, and AI projects. How can I help you learn more about his work today?";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "ai", text: INITIAL_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<"reset" | "delete" | null>(
    null,
  );

  const [activeSection, setActiveSection] = useState("default");

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminInstructions, setAdminInstructions] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "default";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("rutvik_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) setMessages(parsed);
      } catch (e) {}
    }
    const savedAdmin = localStorage.getItem("rutvik_admin_instructions");
    if (savedAdmin) {
      setAdminInstructions(savedAdmin);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rutvik_chat_history", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const saveAdminInstructions = () => {
    localStorage.setItem("rutvik_admin_instructions", adminInstructions);
    setIsAdminOpen(false);
    setShowOptions(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selected);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Rutvik Dangar Space",
          text: "Check out Rutvik Dangar's portfolio and chat with this awesome AI agent! 🚀",
          url: "https://rutvikinfo-web-com.vercel.app"
        });
      } else {
        await navigator.clipboard.writeText("https://rutvikinfo-web-com.vercel.app");
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const resetChat = () => {
    setMessages([
      { id: Date.now().toString(), role: "ai", text: INITIAL_MESSAGE },
    ]);
    setConfirmDialog(null);
    setShowOptions(false);
  };

  const deleteChat = () => {
    setMessages([
      { id: Date.now().toString(), role: "ai", text: INITIAL_MESSAGE },
    ]);
    setConfirmDialog(null);
    setShowOptions(false);
    setIsOpen(false);
  };

  const handleSend = async (text: string) => {
    if (!text.trim() && !file) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
      image: previewUrl || undefined,
    };

    // Convert to history format backend expects
    const currentHist = [...messages].map((m) => ({
      role: m.role,
      text: m.text,
    }));

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    
    // Capture file before removing it
    const fileBase64 = previewUrl;
    
    removeFile();
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text || "User uploaded a file.",
          history: currentHist,
          adminInstructions,
          image: fileBase64 || undefined,
        }),
      });

      const data = await res.json();

      if (data.text) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), role: "ai", text: data.text },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "ai",
            text: "Sorry, I couldn't process that right now.",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          text: "Connection error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: 1,
              boxShadow: [
                "0px 0px 0px 0px rgba(56, 189, 248, 0.4)",
                "0px 0px 20px 10px rgba(56, 189, 248, 0)",
                "0px 0px 0px 0px rgba(56, 189, 248, 0)",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.0,
              ease: "easeInOut",
            }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center z-50 group border border-electric/30"
          >
            <Bot
              size={28}
              className="group-hover:scale-110 transition-transform"
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-32px)] md:w-[450px] h-[650px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-navy/10"
          >
            {/* Header */}
            <div className="bg-navy p-4 flex items-center justify-between shadow-md relative z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-electric/20 flex items-center justify-center relative shadow-inner shadow-electric/50">
                  <Bot size={20} className="text-white" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-navy"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">
                    Rutvik's AI Agent
                  </h3>
                  <p className="text-electric text-xs flex items-center gap-1">
                    <Sparkles size={10} /> Always Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative">
                <button
                  onClick={handleShare}
                  className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label="Share"
                >
                  <Share2 size={18} />
                </button>
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <MoreVertical size={20} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>

                {/* Options Dropdown */}
                <AnimatePresence>
                  {showOptions && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute right-0 top-12 bg-white rounded-xl shadow-xl border border-navy/10 py-2 w-40 z-50"
                    >
                      <button
                        onClick={() => setConfirmDialog("reset")}
                        className="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream flex items-center gap-2 transition-colors"
                      >
                        <RotateCcw size={16} /> Reset Chat
                      </button>
                      <button
                        onClick={() => setConfirmDialog("delete")}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <Trash2 size={16} /> Delete Chat
                      </button>
                      <button
                        onClick={() => {
                          setShowOptions(false);
                          setIsAdminOpen(true);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream flex items-center gap-2 transition-colors"
                      >
                        <Settings size={16} /> Admin Panel
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Admin Panel Overlay */}
            <AnimatePresence>
              {isAdminOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-navy/60 backdrop-blur-md z-40 flex items-center justify-center p-4 rounded-3xl"
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-2xl p-5 shadow-2xl max-w-sm w-full flex flex-col h-[80%]"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-navy flex items-center gap-2">
                        <Settings size={18} className="text-electric" /> Admin
                        Setup
                      </h3>
                      <button
                        onClick={() => setIsAdminOpen(false)}
                        className="text-charcoal hover:text-navy"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className="text-xs text-charcoal mb-3">
                      Update the chatbot's knowledge base securely here.
                    </p>
                    <textarea
                      className="flex-1 w-full border border-navy/10 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-electric/30 mb-4 bg-cream/30"
                      placeholder="e.g. Rutvik recently won a hackathon..."
                      value={adminInstructions}
                      onChange={(e) => setAdminInstructions(e.target.value)}
                    ></textarea>
                    <button
                      onClick={saveAdminInstructions}
                      className="w-full py-2.5 rounded-xl bg-navy text-white font-bold text-sm hover:bg-electric transition-colors"
                    >
                      Save Knowledge
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confirmation Dialog overlay */}
            <AnimatePresence>
              {confirmDialog && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-navy/40 backdrop-blur-sm z-40 flex items-center justify-center p-4"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm">
                    <h4 className="font-bold text-navy text-lg mb-2">
                      {confirmDialog === "reset"
                        ? "Reset Conversation?"
                        : "Delete Conversation?"}
                    </h4>
                    <p className="text-charcoal text-sm mb-6">
                      Are you sure you want to{" "}
                      {confirmDialog === "reset" ? "clear" : "delete"} all
                      existing messages? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setConfirmDialog(null)}
                        className="px-4 py-2 text-sm font-medium text-navy hover:bg-cream rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={
                          confirmDialog === "reset" ? resetChat : deleteChat
                        }
                        className="px-4 py-2 text-sm font-bold text-white bg-electric hover:bg-blue-600 rounded-lg transition-colors shadow-sm"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f8f9fa] space-y-6"
              onClick={() => setShowOptions(false)}
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-electric text-white flex items-center justify-center shrink-0 mr-3 mt-1 shadow-sm">
                      <Bot size={16} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${msg.role === "user" ? "bg-navy text-white rounded-tr-sm shadow-md" : "bg-white border border-black/5 text-charcoal rounded-tl-sm shadow-sm"}`}
                  >
                    {msg.image && (
                      <div className="mb-3 rounded-xl overflow-hidden relative group">
                        {msg.image.startsWith("data:image/") ? (
                          <img
                            src={msg.image}
                            alt="Upload preview"
                            className="w-full h-auto object-cover max-h-48 bg-white"
                          />
                        ) : (
                          <div className="w-full h-24 bg-white/10 flex items-center justify-center gap-2 border border-white/20 rounded-xl">
                            <FileText size={24} className="text-white/80" />
                            <span className="text-sm font-medium text-white/80">Document Attached</span>
                          </div>
                        )}
                      </div>
                    )}
                    {msg.text && (
                      <div className="text-[15px] prose prose-sm prose-p:leading-relaxed prose-a:text-electric prose-strong:text-current">
                        <Markdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </Markdown>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex w-full justify-start items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-electric/20 text-electric flex items-center justify-center shrink-0 mr-3 shadow-sm">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white border border-black/5 px-5 py-3.5 rounded-2xl rounded-tl-sm flex gap-2 items-center shadow-sm">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      className="w-2 h-2 bg-electric rounded-full"
                    />
                    <motion.span 
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="text-xs font-medium text-electric tracking-wide"
                    >
                      Thinking...
                    </motion.span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-navy/5 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-10 relative">
              <div className="flex overflow-x-auto gap-2 mb-4 pb-2 items-center hide-scrollbar">
                {(
                  SECTION_SUGGESTIONS[activeSection] ||
                  SECTION_SUGGESTIONS.default
                ).map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sug)}
                    className="shrink-0 whitespace-nowrap text-xs bg-cream/70 border border-navy/10 text-navy font-medium px-4 py-2 rounded-full hover:bg-electric hover:text-white hover:border-electric transition-colors shadow-sm"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* File Preview */}
              <AnimatePresence>
                {previewUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    className="mb-3 relative inline-block"
                  >
                    <div className="relative group rounded-xl overflow-hidden border border-navy/10 w-24 h-24 bg-cream flex items-center justify-center shadow-sm">
                      {file?.type.startsWith("image/") ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="text-navy" />
                      )}

                      <button
                        type="button"
                        onClick={removeFile}
                        className="absolute top-1 right-1 w-6 h-6 bg-charcoal/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-end gap-2 bg-[#f4f4f5] rounded-2xl p-2 border border-black/5 focus-within:ring-2 focus-within:ring-electric/30 transition-shadow"
              >
                <div className="pb-1 pl-1">
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-charcoal hover:text-navy hover:bg-black/5 rounded-full transition-colors flex shrink-0"
                    title="Upload File or Image"
                  >
                    <Paperclip size={20} />
                  </button>
                </div>

                <TextareaAutosize
                  minRows={1}
                  maxRows={5}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(input);
                    }
                  }}
                  placeholder="Ask anything about Rutvik..."
                  className="flex-1 bg-transparent px-2 py-2.5 resize-none focus:outline-none text-sm text-charcoal leading-snug self-center"
                  disabled={isLoading}
                />

                <div className="pb-1 pr-1">
                  <button
                    type="submit"
                    disabled={(!input.trim() && !file) || isLoading}
                    className="w-9 h-9 bg-navy text-white rounded-full flex items-center justify-center hover:bg-electric transition-colors disabled:opacity-40 disabled:hover:bg-navy shrink-0 shadow-sm"
                  >
                    <Send size={16} className="ml-0.5" />
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <span className="text-[10px] text-charcoal font-medium tracking-wide uppercase">
                  AI assistants can make mistakes. Verify important info.
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

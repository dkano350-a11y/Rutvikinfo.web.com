import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  const [progress, setProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
      } catch (e) {
        // ignore
      }
    }
    const savedAdmin = localStorage.getItem("rutvik_admin_instructions");
    if (savedAdmin) {
      setAdminInstructions(savedAdmin);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("rutvik_chat_history", JSON.stringify(messages));
    } catch (e) {
      console.warn("Could not save to localStorage, likely due to size limits.");
    }
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
    showToast("Conversation reset successfully!");
  };

  const deleteChat = () => {
    setMessages([
      { id: Date.now().toString(), role: "ai", text: INITIAL_MESSAGE },
    ]);
    setConfirmDialog(null);
    setShowOptions(false);
    setIsOpen(false);
    showToast("Conversation deleted successfully!");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + Math.floor(Math.random() * 15) + 5 : 95));
    }, 400);

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

      clearInterval(progressInterval);
      setProgress(100);

      if (!res.ok) {
        let fallbackMessage = "Connection error. Please try again later.";
        try {
          const errData = await res.json();
          if (errData.error) fallbackMessage = errData.error;
        } catch (_) {
          try {
            const rawText = await res.text();
            if (rawText) fallbackMessage = rawText;
          } catch (__) {}
        }
        throw new Error(fallbackMessage);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (!reader) {
        throw new Error("No body reader available for streaming.");
      }

      const tempId = Date.now().toString();
      setMessages((prev) => [
        ...prev,
        { id: tempId, role: "ai", text: "" },
      ]);

      let accumulatedText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        accumulatedText += chunkText;

        if (accumulatedText.includes("[ERROR]:")) {
          const parts = accumulatedText.split("[ERROR]:");
          accumulatedText = parts[0] + "\n\n⚠️ " + (parts[1] || "An error occurred.");
        }

        setMessages((prev) =>
          prev.map((m) => (m.id === tempId ? { ...m, text: accumulatedText } : m))
        );
      }
    } catch (err: any) {
      clearInterval(progressInterval);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          text: err?.message || "Connection error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center z-[9000] group border border-electric/30 hover:scale-105 shadow-xl transition-all"
          >
            <Bot size={18} className="group-hover:scale-110 transition-transform" />
          </button>
        )}

        {isOpen && (
          <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-24px)] md:w-[450px] h-[600px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col z-[9000] overflow-hidden border border-navy/10" >
            {/* Header */}
            <div className="bg-navy p-4 flex items-center justify-between shadow-md relative z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-electric/20 flex items-center justify-center relative shadow-inner shadow-electric/50">
                  <Bot size={18} className="text-white" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-navy"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">
                    Rutvik's AI Agent
                  </h3>
                  <p className="text-electric text-xs flex items-center gap-1">
                    <Sparkles size={18} /> Always Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative">
                <button
                  onClick={handleShare} className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label="Share"
                >
                  <Share2 size={18} />
                </button>
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <MoreVertical size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <X size={18} />
                </button>

                {/* Options Dropdown */}
                
                  {showOptions && (
                    <div   className="absolute right-0 top-12 bg-white rounded-xl shadow-xl border border-navy/10 py-2 w-40 z-50" >
                      <button
                        onClick={() => setConfirmDialog("reset")}
                        className="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream flex items-center gap-2 transition-colors"
                      >
                        <RotateCcw size={18} /> Reset Chat
                      </button>
                      <button
                        onClick={() => setConfirmDialog("delete")}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <Trash2 size={18} /> Delete Chat
                      </button>
                      <button
                        onClick={() => {
                          setShowOptions(false);
                          setIsAdminOpen(true);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream flex items-center gap-2 transition-colors"
                      >
                        <Settings size={18} /> Admin Panel
                      </button>
                    </div>
                  )}
              </div>
            </div>

            {/* Admin Panel Overlay */}
              {isAdminOpen && (
                <div className="absolute inset-0 bg-navy/60 backdrop-blur-md z-40 flex items-center justify-center p-4 rounded-3xl">
                  <div className="bg-white rounded-2xl p-5 shadow-2xl max-w-sm w-full flex flex-col h-[80%]">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-navy flex items-center gap-2">
                        <Settings size={18} className="text-electric" /> Admin Setup
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
                      onClick={() => {
                        localStorage.setItem("rutvik_admin_instructions", adminInstructions);
                        setIsAdminOpen(false);
                      }}
                      className="w-full py-2.5 rounded-xl bg-navy text-white font-bold text-sm hover:bg-electric transition-colors"
                    >
                      Save Knowledge
                    </button>
                  </div>
                </div>
              )}

            {/* Confirmation Dialog overlay in Portal */}
            {typeof document !== "undefined" &&
              createPortal(
                <>
                  {confirmDialog && (
                    <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                      <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm border border-navy/10 relative">
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
                            className="px-4 py-2 text-sm font-medium text-navy hover:bg-cream rounded-lg transition-colors border border-navy/10"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={
                              confirmDialog === "reset" ? resetChat : deleteChat
                            }
                            className="px-4 py-2 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-sm"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>,
                document.body,
              )}

            {/* Toast Notification */}
            {typeof document !== "undefined" &&
              createPortal(
                <>
                  {toastMessage && (
                    <div style={{ transform: "translateX(-50%)" }} className="fixed bottom-10 left-1/2 z-[10000] bg-navy text-white px-6 py-3 rounded-full shadow-lg font-medium text-sm flex items-center gap-2">
                      <Sparkles size={18} className="text-electric" />
                      {toastMessage}
                    </div>
                  )}
                </>,
                document.body,
              )}

            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f8f9fa] space-y-6"
              onClick={() => setShowOptions(false)}
            >
              {messages.map((msg, index) => (
                <div key={index} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-electric text-white flex items-center justify-center shrink-0 mr-3 mt-1 shadow-sm">
                      <Bot size={18} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${msg.role === "user" ? "bg-navy text-white rounded-tr-sm shadow-md" : "bg-white border border-black/5 text-charcoal rounded-tl-sm shadow-sm"}`}>
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
                            <FileText size={18} className="text-white/80" />
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
                </div>
              ))}
              {isLoading && (
                <div className="flex w-full justify-start items-center">
                  <div className="w-8 h-8 rounded-full bg-electric/20 text-electric flex items-center justify-center shrink-0 mr-3 shadow-sm">
                    <Bot size={18} />
                  </div>
                  <div className="bg-white border border-black/5 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-3 items-center shadow-sm relative overflow-hidden min-w-[200px]">
                    <div className="absolute left-0 top-0 bottom-0 bg-electric/5 transition-all duration-300 ease-out" 
                      style={{ width: `${progress}%` }}></div>
                    
                    <div className="relative w-5 h-5 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 24 24">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          className="text-navy/10"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          className="text-electric animate-[spin_2s_linear_infinite]"
                          strokeDasharray={2 * Math.PI * 10}
                          strokeDashoffset={(2 * Math.PI * 10) * (1 - (progress / 100))}
                          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                        />
                      </svg>
                    </div>
                    
                    <div className="flex flex-col relative">
                      <span className="text-xs font-bold text-navy">
                        Analyzing
                      </span>
                      <span className="text-[10px] text-charcoal/70 font-medium tracking-wide">
                        {progress}% Complete
                      </span>
                    </div>
                  </div>
                </div>
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
              
                {previewUrl && (
                  <div className="mb-3 relative inline-block">
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
                        onClick={removeFile} className="absolute top-1 right-1 w-6 h-6 bg-charcoal/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                )}
              

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }} className="flex items-end gap-2 bg-[#f4f4f5] rounded-2xl p-2 border border-black/5 focus-within:ring-2 focus-within:ring-electric/30 transition-shadow"
              >
                <div className="pb-1 pl-1">
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-charcoal hover:text-navy hover:bg-black/5 rounded-full transition-colors flex shrink-0"
                    title="Upload File or Image"
                  >
                    <Paperclip size={18} />
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
                  }} placeholder="Ask anything about Rutvik..."
                  className="flex-1 bg-transparent px-2 py-2.5 resize-none focus:outline-none text-sm text-charcoal leading-snug self-center"
                  disabled={isLoading}
                />

                <div className="pb-1 pr-1">
                  <button
                    type="submit"
                    disabled={(!input.trim() && !file) || isLoading} className="w-9 h-9 bg-navy text-white rounded-full flex items-center justify-center hover:bg-electric transition-colors disabled:opacity-40 disabled:hover:bg-navy shrink-0 shadow-sm"
                  >
                    <Send size={18} className="ml-0.5" />
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <span className="text-[10px] text-charcoal font-medium tracking-wide uppercase">
                  AI assistants can make mistakes. Verify important info.
                </span>
              </div>
            </div>
          </div>
        )}
      
    </>
  );
}

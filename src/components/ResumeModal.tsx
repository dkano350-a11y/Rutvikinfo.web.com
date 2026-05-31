import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Download, FileText, CheckCircle2, Loader2 } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void | Promise<void>;
}

export default function ResumeModal({
  isOpen,
  onClose,
  onDownload,
}: ResumeModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (resumeRef.current) {
        // @ts-ignore
        const html2pdf = (await import('html2pdf.js')).default;
        const opt = {
          margin:       [0.5, 0, 0.5, 0] as [number, number, number, number], // top, left, bottom, right
          filename:     'Rutvik_Dangar_Resume.pdf',
          image:        { type: 'jpeg' as const, quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
        };
        await html2pdf().set(opt).from(resumeRef.current).save();
      } else {
        await onDownload(); // fallback
      }
    } catch (e) {
      console.error('Download Error:', e);
      try {
        await onDownload();
      } catch (err) {
        console.error(err);
      }
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-navy/80 backdrop-blur-md" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="bg-cream w-full max-w-4xl h-[90vh] md:h-[85vh] rounded-3xl overflow-hidden shadow-2xl relative border border-white/20 flex flex-col"
      >
            {/* Header bar */}
            <div className="w-full bg-navy p-6 flex items-center justify-between text-white relative z-10 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-electric/15 flex items-center justify-center text-electric">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold leading-tight">
                    Rutvik_Dangar_Resume.pdf
                  </h3>
                  <p className="text-xs text-white/60 font-medium tracking-wide mt-0.5">
                    Preview generated for AI & Recruiter reference
                  </p>
                </div>
              </div>
              <button
                onClick={onClose} className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body - Resume view */}
            <div className="flex-1 overflow-y-auto p-0 md:p-8 bg-black/5 flex flex-col items-center cursor-text">
              <div ref={resumeRef} className="w-full max-w-3xl flex flex-col gap-8">
              {/* PAGE 1 */}
              <div className="w-full bg-white shadow-xl shadow-black/5 border border-black/5 p-10 md:p-14 shrink-0 transition-transform hover:scale-[1.01] duration-300">
                <div className="text-center mb-8 border-b border-black/10 pb-6">
                  <h1 className="text-3xl md:text-4xl font-sans font-black text-charcoal tracking-wide mb-3">
                    DANGAR RUTVIKKUMAR ALPESHBHAI
                  </h1>
                  <p className="text-sm font-medium text-charcoal">
                    Email: rutvikdangar20@gmail.com | Phone: +91 9328796324 |
                    Location: Ahmedabad, Gujarat
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-base font-black text-charcoal tracking-widest uppercase border-b-2 border-charcoal/80 pb-1 mb-3">
                    Professional Summary
                  </h2>
                  <p className="text-[13px] md:text-[14px] text-charcoal leading-relaxed text-justify">
                    An analytical and highly motivated Bachelor of Business
                    Administration (BBA) student specializing in{" "}
                    <strong>Marketing</strong> (Semester 5). Possesses an
                    empirical foundation in Management Information Systems
                    (MIS), corporate financial structures, and consumer buying
                    trends. Proven competency in drafting comprehensive business
                    research models, analyzing data, and translating market
                    parameters into core corporate strategies. Seeking to
                    leverage academic research experience and modern marketing
                    literacy in a progressive business environment.
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-base font-black text-charcoal tracking-widest uppercase border-b-2 border-charcoal/80 pb-1 mb-3">
                    Education
                  </h2>

                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[14px] font-bold text-charcoal">
                        Bachelor of Business Administration (BBA) — Marketing
                        Specialization
                      </h3>
                      <span className="text-[13px] font-bold text-charcoal shrink-0 ml-4 text-right">
                        2024 — Present (Semester 5)
                      </span>
                    </div>
                    <p className="text-[13px] text-charcoal mb-2 italic">
                      Ahmedabad Institute of Business Management (AIBM)
                    </p>
                    <p className="text-[13px] text-charcoal leading-relaxed">
                      Focusing on Consumer Behaviour architecture, Operational
                      Planning, Brand Strategy, Business Analytics, and
                      Management Information Systems (MIS).
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[14px] font-bold text-charcoal">
                        Higher Secondary Certificate (HSC — Class XII)
                      </h3>
                      <span className="text-[13px] font-bold text-charcoal shrink-0 ml-4 text-right">
                        March 2024
                      </span>
                    </div>
                    <p className="text-[13px] text-charcoal mb-1 italic">
                      Gujarat Secondary and Higher Secondary Education Board,
                      Gandhinagar
                    </p>
                    <p className="text-[13px] font-bold text-charcoal mb-1">
                      Percentile Rank: 68 PR
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[14px] font-bold text-charcoal">
                        Secondary School Certificate (SSC — Class X)
                      </h3>
                      <span className="text-[13px] font-bold text-charcoal shrink-0 ml-4 text-right">
                        March 2022
                      </span>
                    </div>
                    <p className="text-[13px] text-charcoal mb-1 italic">
                      Gujarat Secondary and Higher Secondary Education Board,
                      Gandhinagar
                    </p>
                    <p className="text-[13px] font-bold text-charcoal mb-1">
                      Percentile Rank: 76 PR
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-black text-charcoal tracking-widest uppercase border-b-2 border-charcoal/80 pb-1 mb-3">
                    Academic & Business Projects
                  </h2>

                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[14px] font-bold text-charcoal">
                        Business Research Methods (BRM) Project: College
                        Students Buying Behaviour
                      </h3>
                      <span className="text-[13px] font-bold text-charcoal shrink-0 ml-4 text-right">
                        Semester 4 Academic Project
                      </span>
                    </div>
                    <p className="text-[13px] text-charcoal mb-2 italic">
                      Lead Researcher & Analyst
                    </p>
                    <ul className="list-disc pl-5 text-[13px] text-charcoal space-y-1">
                      <li>
                        Formulated structural research criteria to evaluate
                        product preferences, brand loyalty patterns, and
                        purchasing triggers among student segments.
                      </li>
                      <li>
                        Compiled qualitative data arrays to identify consumer
                        price elasticity, reliance on digital commerce
                        infrastructure, and regional brand-switching activities.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* PAGE 2 */}
              <div className="w-full max-w-3xl bg-white shadow-xl shadow-black/5 border border-black/5 p-10 md:p-14 shrink-0 mt-2 mb-8 transition-transform hover:scale-[1.01] duration-300">
                <div className="mb-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[14px] font-bold text-charcoal">
                        Financial Management Analysis: Dairy Sector Leader
                        (Amul)
                      </h3>
                      <span className="text-[13px] font-bold text-charcoal shrink-0 ml-4 text-right">
                        AIBM Curriculum Study
                      </span>
                    </div>
                    <p className="text-[13px] text-charcoal mb-2 italic">
                      Market Analyst & Project Contributor
                    </p>
                    <ul className="list-disc pl-5 text-[13px] text-charcoal space-y-1">
                      <li>
                        Evaluated capital frameworks, working capital cycles,
                        and operational asset distributions of GCMMF (Amul)
                        within the FMCG ecosystem.
                      </li>
                      <li>
                        Assessed integration mechanics of perishable supply
                        chain systems scaling into emerging Quick-Commerce
                        distribution nodes.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[14px] font-bold text-charcoal">
                        Project Aura & Advanced Automation Frameworks
                      </h3>
                      <span className="text-[13px] font-bold text-charcoal shrink-0 ml-4 text-right">
                        Technical Automation Design
                      </span>
                    </div>
                    <p className="text-[13px] text-charcoal mb-2 italic">
                      System Logic Design & Prompt Architect
                    </p>
                    <ul className="list-disc pl-5 text-[13px] text-charcoal space-y-1">
                      <li>
                        Engineered context-handling frameworks and
                        conversational parameters optimization for voice-first
                        automation companions (Aura, Bella AI, Maya).
                      </li>
                      <li>
                        Mapped semantic logic configurations to handle regional
                        multi-dialect code-switching interactions smoothly.
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-black text-charcoal tracking-widest uppercase border-b-2 border-charcoal/80 pb-1 mb-3 mt-8">
                    Core Competencies & Professional Skills
                  </h2>

                  <div className="space-y-3">
                    <div className="grid grid-cols-[30%_70%] gap-4">
                      <h3 className="text-[13px] font-bold text-charcoal leading-tight">
                        Marketing & Strategy:
                      </h3>
                      <p className="text-[13px] text-charcoal">
                        Consumer Behaviour Tracking, Brand Architecture
                        Foundations, Market Friction Analysis
                      </p>
                    </div>
                    <div className="grid grid-cols-[30%_70%] gap-4">
                      <h3 className="text-[13px] font-bold text-charcoal leading-tight">
                        Management & Systems:
                      </h3>
                      <p className="text-[13px] text-charcoal">
                        Business Research Models, Management Information Systems
                        (MIS), Project Planning
                      </p>
                    </div>
                    <div className="grid grid-cols-[30%_70%] gap-4">
                      <h3 className="text-[13px] font-bold text-charcoal leading-tight">
                        Technical Competencies:
                      </h3>
                      <p className="text-[13px] text-charcoal">
                        Conversational Architecture Principles, MS Excel Data
                        Records, Flow-Logic Maps
                      </p>
                    </div>
                    <div className="grid grid-cols-[30%_70%] gap-4">
                      <h3 className="text-[13px] font-bold text-charcoal leading-tight">
                        Languages Known:
                      </h3>
                      <p className="text-[13px] text-charcoal">
                        English, Hindi, Gujarati, Hinglish
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>

            {/* Action Links bar footer */}
            <div className="p-5 bg-white border-t border-navy/5 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
              <span className="text-xs text-charcoal font-bold uppercase tracking-wider flex items-center gap-1.5 ml-2">
                <CheckCircle2 size={18} className="text-emerald-500" />{" "}
                Authorized AI-Generated Preview
              </span>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 duration-200 bg-charcoal/5 text-charcoal shadow-sm hover:bg-charcoal/10"
                >
                  Close
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading} className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-md ring-2 ring-transparent focus:ring-electric/30 ${
                    isDownloading
                      ? "bg-electric/60 text-white shadow-none pointer-events-none scale-95"
                      : "bg-electric text-white hover:bg-blue-600 hover:scale-105"
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />{" "}
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={18} /> Download Full PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
  );
}

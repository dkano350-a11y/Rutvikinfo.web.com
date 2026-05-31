import React, { useEffect } from "react";
import { ShieldCheck, ArrowRight, X } from "lucide-react";

interface TermsPopupProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export default function TermsPopup({
  isOpen,
  onAccept,
  onClose,
}: TermsPopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleAccept = () => {
    // Save to localStorage
    localStorage.setItem("hasAcceptedTerms", "true");
    onAccept();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[8000] bg-cream/90 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-electric/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
          </div>

          <div className="bg-white max-w-2xl w-full rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 border border-navy/10">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-charcoal hover:text-navy hover:bg-black/5 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="w-16 h-16 bg-navy/5 text-navy rounded-2xl flex items-center justify-center mb-8">
              <ShieldCheck size={18} />
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">
              Terms & Conditions
            </h1>

            <div className="prose prose-sm text-charcoal mb-8 max-h-[40vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-navy/20 scrollbar-track-transparent">
              <p className="mb-4">
                Welcome to Rutvik Dangar's Portfolio & AI Experiments platform.
                Before exploring, please review and accept the following terms:
              </p>

              <h3 className="font-bold text-navy text-base mt-6 mb-2">
                1. AI Experience & Content
              </h3>
              <p className="mb-4">
                This platform integrates artificial intelligence features (such
                as the interactive Chatbot). AI agents can make mistakes. Please
                independently verify any critical information provided by the AI
                regarding projects, technical implementations, or external data.
              </p>

              <h3 className="font-bold text-navy text-base mt-6 mb-2">
                2. Data Processing & Privacy
              </h3>
              <p className="mb-4">
                When you interact with the Contact form or Newsletter, you agree
                that your submitted information (such as name and email) will be
                stored to facilitate communication. We do not sell your personal
                data to third parties.
              </p>

              <h3 className="font-bold text-navy text-base mt-6 mb-2">
                3. Intellectual Property
              </h3>
              <p className="mb-4">
                The projects, designs, and analytical insights presented on this
                site are the intellectual property of Rutvik Dangar unless
                otherwise stated. They are intended for portfolio demonstration
                and not for unauthorized commercial replication.
              </p>
            </div>

            <div className="pt-6 border-t border-navy/10 flex flex-col sm:flex-row items-center justify-end gap-4">
              <p className="text-xs text-charcoal mr-auto text-left hidden sm:block max-w-[200px]">
                By clicking accept, you agree to these standard terms of use.
              </p>
              <button
                onClick={handleAccept}
                className="w-full sm:w-auto bg-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-electric transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-navy/20"
              >
                Accept & Continue
                <ArrowRight
                  size={18}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

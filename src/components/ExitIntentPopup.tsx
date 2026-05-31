import React, { useState, useEffect } from "react";
import { X, Send, Mail } from "lucide-react";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenExitPopup");

    if (hasSeenPopup) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves from the top of the viewport
      if (e.clientY <= 0) {
        setIsVisible(true);
        sessionStorage.setItem("hasSeenExitPopup", "true");
        // Remove listener once triggered
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const text = `Hi Rutvik, I would love to join your newsletter! My email is ${email}`;
    window.open(
      `https://wa.me/919328796324?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );

    setIsSubmitted(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  };

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full relative overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 bg-electric/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

            <button
              onClick={closePopup}
              className="absolute top-4 right-4 p-2 text-charcoal hover:text-navy hover:bg-black/5 rounded-full transition-colors z-20"
            >
              <X size={18} />
            </button>

            {!isSubmitted ? (
              <div className="relative z-10">
                <div className="w-12 h-12 bg-navy/5 text-navy rounded-2xl flex items-center justify-center mb-6 transform -rotate-6">
                  <Mail size={18} className="transform rotate-6" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-navy mb-3">
                  Leaving so soon?
                </h3>
                <p className="text-charcoal mb-8 leading-relaxed font-light">
                  Join my newsletter to get the latest updates on my{" "}
                  <strong className="font-semibold text-navy">
                    AI experiments, marketing insights, and new project
                    releases
                  </strong>
                  . No spam, just value.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-5 py-4 rounded-xl border border-navy/10 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-electric/50 transition-shadow text-charcoal placeholder:text-charcoal"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-navy text-white font-bold py-4 rounded-xl hover:bg-electric transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-electric/30"
                  >
                    Subscribe Now <Send size={18} />
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <button
                    onClick={closePopup}
                    className="text-xs text-charcoal hover:text-navy transition-colors font-medium border-b border-transparent hover:border-navy"
                  >
                    No thanks, I'll explore more first
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy mb-2">
                  You're on the list!
                </h3>
                <p className="text-charcoal">
                  Thanks for subscribing. Keep an eye on your inbox.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Academics from "./components/Academics";
import IndustryVisits from "./components/IndustryVisits";
import Seminars from "./components/Seminars";
import Courses from "./components/Courses";
import Skills from "./components/Skills";
import FeaturedSkill from "./components/FeaturedSkill";
import Tools from "./components/Tools";
import ShaderBackground from "./components/ShaderBackground";
import WebsiteBuilder from "./components/WebsiteBuilder";

import Insights from "./components/Insights";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ExitIntentPopup from "./components/ExitIntentPopup";
import TermsPopup from "./components/TermsPopup";
import { ToastProvider } from "./ToastContext";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const accepted = localStorage.getItem("hasAcceptedTerms") === "true";
    setTermsAccepted(accepted);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Call global motion initializer attached to window
    if (typeof (window as any).__initPortfolioMotion === 'function') {
        (window as any).__initPortfolioMotion();
    }

    return () => clearTimeout(timer);
  }, []);

  const handleProtectedAction = (action: () => void) => {
    const accepted = localStorage.getItem("hasAcceptedTerms") === "true";
    if (accepted || termsAccepted) {
      action();
    } else {
      setPendingAction(() => action);
      setShowTerms(true);
    }
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTerms(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleCloseTerms = () => {
    setShowTerms(false);
    setPendingAction(null);
  };

  return (
    <ToastProvider>
      <ReactLenis root options={{ 
        lerp: 0.08, 
        duration: 1.5, 
        smoothWheel: true, 
        wheelMultiplier: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      }}>
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="preloader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 z-[9999] mesh-preloader flex flex-col items-center justify-center overflow-hidden"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  mass: 1,
                }}
                className="relative"
              >
                <div className="absolute inset-0 border-4 border-white/40 rounded-full animate-ping"></div>
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center text-white font-serif text-3xl font-bold shadow-2xl z-10 relative">
                  R
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                className="mt-6 text-white font-medium tracking-widest text-sm uppercase"
              >
                Loading Experience
              </motion.div>
              <motion.div
                className="h-1 bg-white/80 w-0 absolute bottom-0 left-0"
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 bg-electric origin-left z-[9000] shadow-[0_0_10px_rgba(35,154,59,0.8)]"
          style={{ scaleX: scrollYProgress }}
        />

        <TermsPopup
          isOpen={showTerms}
          onAccept={handleAcceptTerms}
          onClose={handleCloseTerms}
        />

        <Header />
        <ShaderBackground showControls={!isLoading} />

        <div className="relative w-full overflow-x-clip">
          <Hero />
          <About />
          <Projects />
          <Academics />
          <IndustryVisits />
          <Seminars />
          <Courses />
          <Skills />
          <FeaturedSkill />
          <Tools />
          <Insights />
          <WebsiteBuilder />
          <Contact onProtectedAction={handleProtectedAction} />
          <Footer />
          <Chatbot />
          <ExitIntentPopup />
        </div>
        
      </ReactLenis>
    </ToastProvider>
  );
}

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
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

import Insights from "./components/Insights";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ExitIntentPopup from "./components/ExitIntentPopup";
import TermsPopup from "./components/TermsPopup";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const accepted = localStorage.getItem("hasAcceptedTerms") === "true";
    setTermsAccepted(accepted);

    // Simulate a brief loading sequence to ensure fonts/images are ready
    // and deliver a polished "opening" effect.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-cream flex flex-col items-center justify-center overflow-hidden"
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
              <div className="absolute inset-0 border-4 border-electric/30 rounded-full animate-ping"></div>
              <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center text-white font-serif text-3xl font-bold shadow-2xl z-10 relative">
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
              className="mt-6 text-navy font-medium tracking-widest text-sm uppercase"
            >
              Loading Experience
            </motion.div>
            <motion.div
              className="h-1 bg-electric w-0 absolute bottom-0 left-0"
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <TermsPopup
        isOpen={showTerms}
        onAccept={handleAcceptTerms}
        onClose={handleCloseTerms}
      />

      <motion.div
        className="relative w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 bg-electric transform origin-left z-50"
          style={{ scaleX }}
        />
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
        <Contact onProtectedAction={handleProtectedAction} />
        <Footer />
        <Chatbot />
        <ExitIntentPopup />
      </motion.div>
    </>
  );
}

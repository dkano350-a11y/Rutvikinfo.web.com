import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Mail,
  Upload,
  Instagram,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

interface ContactProps {
  onProtectedAction?: (action: () => void) => void;
}

export default function Contact({ onProtectedAction }: ContactProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleProtectedRedirect = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string,
    isBlank: boolean = true,
  ) => {
    e.preventDefault();
    const action = () => {
      if (isBlank) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = url;
      }
    };

    if (onProtectedAction) {
      onProtectedAction(action);
    } else {
      action();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Failed to submit", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          <div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-navy mb-6">
              Let's Build Something Together 🚀
            </h2>
            <p className="text-xl text-charcoal mb-10 leading-relaxed">
              Open to collaborations, projects, internships, and interesting
              conversations.
            </p>

            <div className="space-y-6 mb-12">
              <a
                href="tel:+919328796324"
                className="flex items-center gap-4 text-lg text-navy font-medium hover:text-electric transition-colors group"
              >
                <span className="w-12 h-12 bg-cream rounded-full flex items-center justify-center group-hover:bg-electric/10 transition-colors">
                  <Phone className="text-electric" size={24} />
                </span>
                +91 9328796324
              </a>
              <a
                href="mailto:rutvikdangar20@gmail.com"
                onClick={(e) =>
                  handleProtectedRedirect(
                    e,
                    "mailto:rutvikdangar20@gmail.com",
                    false,
                  )
                }
                className="flex items-center gap-4 text-lg text-navy font-medium hover:text-electric transition-colors group"
              >
                <span className="w-12 h-12 bg-cream rounded-full flex items-center justify-center group-hover:bg-electric/10 transition-colors">
                  <Mail className="text-electric" size={24} />
                </span>
                rutvikdangar20@gmail.com
              </a>
              <div className="flex items-center gap-4 text-lg text-navy font-medium">
                <span className="w-12 h-12 bg-cream rounded-full flex items-center justify-center">
                  <MapPin className="text-electric" size={24} />
                </span>
                Ahmedabad, Gujarat, India
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/rutvik-dangar-416219313"
                onClick={(e) =>
                  handleProtectedRedirect(
                    e,
                    "https://linkedin.com/in/rutvik-dangar-416219313",
                  )
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/Rutvik-Dangar"
                onClick={(e) =>
                  handleProtectedRedirect(e, "https://github.com/Rutvik-Dangar")
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:rutvikdangar20@gmail.com"
                onClick={(e) =>
                  handleProtectedRedirect(
                    e,
                    "mailto:rutvikdangar20@gmail.com",
                    false,
                  )
                }
                className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://instagram.com/rutvik_dangar_4"
                onClick={(e) =>
                  handleProtectedRedirect(
                    e,
                    "https://instagram.com/rutvik_dangar_4",
                  )
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 text-white rounded-full flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/qr/JNPRPQRBK4SSC1"
                onClick={(e) =>
                  handleProtectedRedirect(e, "https://wa.me/qr/JNPRPQRBK4SSC1")
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-cream p-8 rounded-3xl border border-navy/5"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-green-100 border border-green-200 text-green-800 p-4 rounded-xl flex items-center justify-center gap-2 font-bold mb-6"
                  >
                    <CheckCircle2 size={18} className="text-green-600" />{" "}
                    Message delivered successfully!
                  </motion.div>
                )}
              </AnimatePresence>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-navy mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-electric/50 transition-shadow"
                  placeholder="Elon Musk"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-navy mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-electric/50 transition-shadow"
                  placeholder="elon@x.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-navy mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-electric/50 transition-shadow resize-none"
                  placeholder="Hey Rutvik, loved your portfolio..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">
                  Attachment (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full px-4 py-3 rounded-xl border border-dashed border-navy/30 bg-white flex items-center gap-3 text-charcoal hover:bg-navy/5 transition-colors">
                    <Upload size={20} />
                    <span>Upload a file or photo</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-4 bg-navy text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-electric transition-colors disabled:opacity-70"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                  />
                ) : success ? (
                  <>Message Sent! ✨</>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

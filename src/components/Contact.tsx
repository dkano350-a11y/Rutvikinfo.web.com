import React, { useState } from "react";
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
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "../ToastContext";

interface ContactProps {
  onProtectedAction?: (action: () => void) => void;
}

export default function Contact({ onProtectedAction }: ContactProps) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setIsAnalyzing(true);

    // Show preview immediately
    if (selected.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selected);
    } else {
      setFilePreview(null);
    }

    try {
      // Simulate 1.5s network delay for user experience per request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const formDataObj = new FormData();
      formDataObj.append("file", selected);

      const res = await fetch("/api/analyze-file", {
        method: "POST",
        body: formDataObj,
      });

      const data = await res.json();
      if (!data.safe) {
        addToast(data.reason || "This content is not allowed.", "error");
        setFile(null);
        setFilePreview(null);
        setUploadedFileUrl(null);
        if (e.target) e.target.value = "";
      } else {
        if (data.fileUrl) {
          setUploadedFileUrl(data.fileUrl);
        }
      }
    } catch (err) {
      console.error(err);
      addToast("Failed to analyze file. Please try again.", "error");
      setFile(null);
      setFilePreview(null);
      setUploadedFileUrl(null);
      if (e.target) e.target.value = "";
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnalyzing) return; // wait for analysis

    const action = async () => {
      let attachmentText = "";
      if (uploadedFileUrl) {
        attachmentText = `\n\nAttachments:\n${uploadedFileUrl}`;
      } else if (file) {
        attachmentText = `\n[Attached File Processed Safely: ${file.name}]`;
      }

      const text = `Hi Rutvik, my name is ${formData.name}.\nEmail: ${formData.email}\n\nMessage:\n${formData.message}${attachmentText}`;

      // Open WhatsApp synchronously before any await so browser popup blocker doesn't intercept it
      window.open(
        `https://wa.me/919328796324?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer",
      );

      addToast("Message delivered successfully!", "success");
      setFormData({ name: "", email: "", message: "" });
      setFile(null);
      setFilePreview(null);
      setUploadedFileUrl(null);

      try {
        // Also fire off to the local /api/contact to log it via keepalive fetch
        fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            keepalive: true,
            body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message }),
        }).catch(() => {});

        // Dont await this, let Firebase handle in background
        addDoc(collection(db, "messages"), {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          attachmentUrl: uploadedFileUrl || null,
          attachmentName: file ? file.name : null,
          createdAt: serverTimestamp(),
        }).catch((err) => console.error("Firebase save failed:", err));
      } catch (error: any) {
        console.error("Error preparing save:", error);
      }
    };

    if (onProtectedAction) {
      onProtectedAction(action);
    } else {
      action();
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start" >
          <div>
            <h2 className="reveal font-serif text-4xl md:text-6xl font-bold text-navy mb-6">
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
                  <Phone className="text-electric" size={18} />
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
                  <Mail className="text-electric" size={18} />
                </span>
                rutvikdangar20@gmail.com
              </a>
              <div className="flex items-center gap-4 text-lg text-navy font-medium">
                <span className="w-12 h-12 bg-cream rounded-full flex items-center justify-center">
                  <MapPin className="text-electric" size={18} />
                </span>
                Ahmedabad, Gujarat, India
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
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
                <Linkedin size={18} />
              </a>
              <a
                href="tel:+919328796324"
                onClick={(e) =>
                  handleProtectedRedirect(e, "tel:+919328796324", false)
                }
                className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <Phone size={18} />
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
                <Github size={18} />
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
                <Mail size={18} />
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
                <Instagram size={18} />
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
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div className="bg-cream p-8 rounded-3xl border border-navy/5" >
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Your full name"
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
                  placeholder="your@email.com"
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
                  placeholder="Tell me about your project or idea..."
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
                    onChange={handleFileChange}
                    className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 ${(isAnalyzing || file) ? 'pointer-events-none' : ''}`}
                    accept="image/*,.pdf,.doc,.docx"
                    disabled={isAnalyzing || file !== null}
                  />
                  <div className="w-full px-4 py-3 rounded-xl border border-dashed border-navy/30 bg-white flex flex-col gap-3 text-charcoal hover:bg-navy/5 transition-colors relative z-0 min-h-[56px] justify-center">
                    {isAnalyzing ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin"></div>
                        <span>Analyzing file...</span>
                      </div>
                    ) : file ? (
                      <div className="flex flex-col gap-3 relative z-10">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 size={18} className="text-green-600" />
                          <span className="font-medium truncate max-w-[200px] md:max-w-xs text-charcoal">
                            {file.name} (Safe)
                          </span>
                        </div>
                        {filePreview && (
                          <div className="rounded-lg overflow-hidden border border-navy/10 w-24 h-24 relative">
                            <img
                              src={filePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFile(null);
                            setFilePreview(null);
                            const fileInput = document.getElementById('file') as HTMLInputElement;
                            if (fileInput) fileInput.value = '';
                          }}
                          className="absolute -top-1 -right-1 w-6 h-6 bg-charcoal/80 text-white rounded-full flex items-center justify-center hover:bg-charcoal transition-colors z-[100]"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-charcoal">
                        <Upload size={18} />
                        <span>Upload a file or photo</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-4 bg-navy text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-electric transition-colors disabled:opacity-70"
              >
                <>
                  Send Messages <Send size={18} />
                </>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

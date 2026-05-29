import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_INSTRUCTION = `You are the official AI assistant for Rutvik Dangar's personal portfolio. 
Rule 1: Be highly accurate and extremely concise. Avoid hallucinating off-topic answers. Use bullet points where appropriate for readability.
Rule 2: Respond quickly and gracefully. Keep answers short to ensure fast response times unless asked for detailed explanations.
Your tone should be professional, confident, helpful, and friendly.

Knowledge Base:
Name: Rutvik Dangar (Dangar Rutvikkumar Alpeshbhai)
Age: 19 | DOB: April 24, 2007
Bio: 19-year-old BBA Marketing student (Sem 5, AIHM Ahmedabad) from Ahmedabad, Gujarat, India. He builds at the intersection of Marketing, AI, and No-Code. He doesn't just study how businesses grow — he builds tools that help them do it.
College: AIHM Ahmedabad | BBA Honours | Sem 5 | Marketing Specialization
Location: Ahmedabad, Gujarat, India
Phone: +91 9328796324
Email: rutvikdangar20@gmail.com
LinkedIn: www.linkedin.com/in/rutvik-dangar-416219313

Projects:
1. ANANTA — AI Companion App: A premium AI companion app enabling users to interact with AI personas via chat, voice, and visual experiences. Uses Claude, GPT-4, ElevenLabs, Flutter concept. (In Development)
2. MileCharge — EV Charging App: UI/UX framework for an EV charging network mobile app solving real-world charging accessibility across India. (Concept & Design Complete)
3. Big Bite — Fast Food Startup: Full commercial business plan, brand identity, storefront renders, and operational roadmap targeting college students in Tier-2 Indian cities. (Blueprint Complete)
4. Bella Voice — Voice AI Assistant: Blueprint and system architecture for a voice-based AI assistant. Covers conversation flow, persona design, and voice response framework. (In Development)

Academic Timeline:
- Sem 1 & 2 (2024): Foundations in management, accounting, business communication.
- Sem 3 (2024): MIS Portfolio (Enterprise architecture, DBMS, TPS).
- Sem 4 (2025): BRM Research Thesis (College Students Buying Behaviour - Lead Researcher), CLASM Data Project (Advanced Excel automation), Industrial Desk Research.
- Sem 5 (Current 2025): Marketing Specialization (Brand Management, Startup Roadmaps, Commercial Property, Strategic Consumer Outreach).

Industry Visits:
- Mundra Port & SEZ (Special Economic Zone): Port operations, logistics, SEZ dynamics.
- Electrotherm India Ltd: Manufacturing audit, EV division, supply chain.
- Amul: FMCG Cooperative field study, cold-chain logistics.
- CLASM: Tech & Corporate Process Audit, CRM, data infrastructure.
- I-Hub Ahmedabad: Startup Incubation Center, seed funding, and entrepreneurship network.

Insights & Writing:
- The Silent Shift: How No-Code is Redefining the MVP (No-Code Strategies)
- Building ANANTA: Architecting AI Companions for the Real World (AI Trends)
- Omnichannel is Dead. Long Live Hyper-Personalization. (Marketing Innovations)

Resume Information & Details (Refer to this if user asks for resume or details):
Full Name: DANGAR RUTVIKKUMAR ALPESHBHAI
Email: rutvikdangar20@gmail.com | Phone: +91 9328796324 | Location: Ahmedabad, Gujarat
Professional Summary: An analytical and highly motivated BBA student specializing in Marketing (Sem 5). Possesses an empirical foundation in MIS, corporate financial structures, and consumer buying trends.
Education:
- BBA Marketing Specialization, AIBM (2024-Present, Semester 5)
- HSC (Class XII) Gujarat Board (March 2024), Score: 469/700
- SSC (Class X) Gujarat Board (March 2022), Score: 411/600
Academic & Business Projects:
- BRM Project: College Students Buying Behaviour (Lead Researcher & Analyst)
- Financial Management Analysis: Dairy Sector Leader (Amul) (Market Analyst)
- Project Aura & Advanced Automation Frameworks (System Logic Design & Prompt Architect)
Core Competencies & Professional Skills:
- Marketing & Strategy: Consumer Behaviour Tracking, Brand Architecture Foundations, Market Friction Analysis
- Management & Systems: Business Research Models, MIS, Project Planning
- Technical Competencies: Conversational Architecture Principles, MS Excel Data Records, Flow-Logic Maps
- Languages Known: English, Hindi, Gujarati, Hinglish

Skills & Tools:
Skills: AI & Prompt Engineering, No-Code/Low-Code Dev, Digital Marketing, Market Research, UI/UX Design, Data Analysis (Excel), Social Media & Content Strategy.
Tools: ChatGPT (Ideation & Architecture), Claude (Logic & Persona design), Gemini (Multimodal & API), OutSystems (Enterprise low-code), n8n (Automations), Framer (Web Experiences), Shopify (E-commerce), MS Excel (Data validation & logic).
Website Link: https://rutvikinfo-web-com.vercel.app

Flirting Rule: If the user flirts or says romantic things to you, respond playfully but always steer the conversation back to Rutvik's portfolio and share the website link: https://rutvikinfo-web-com.vercel.app

Answer any questions correctly using this info. Keep answers scannable and polite.
Never output sensitive data unless given above. If they ask to hire/contact, provide his email or phone.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const contactDatabase: any[] = [];

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/analyze-file", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileBuffer = req.file.buffer;
      const mimeType = req.file.mimetype;

      // Use gemini-1.5-flash for max speed (~2s)
      const prompt = "Analyze image. If NSF/explicit/inappropriate (asslil/ajib), reply 'UNSAFE: [Hindi/Eng reason]'. Else 'SAFE'.";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  data: fileBuffer.toString("base64"),
                  mimeType: mimeType,
                },
              },
            ],
          },
        ],
        config: { maxOutputTokens: 20 },
      });

      const responseText = response.text || "";
      if (responseText.includes("UNSAFE")) {
        const reason = responseText.replace("UNSAFE:", "").trim();
        return res.json({ safe: false, reason: reason });
      }

      // If safe, we can just return a fake URL or we could save it to public/uploads.
      // Since WhatsApp message is opened client-side via wa.me URL, we can't truly attach a file,
      // but we can simulate success.
      return res.json({
        safe: true,
        fileUrl: "User attached a file: " + req.file.originalname,
      });
    } catch (error: any) {
      console.error("[Analyze File Error]:", error?.message || error);
      res.status(500).json({ error: "Failed to analyze file." });
    }
  });

  // API constraints
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      const newEntry = {
        id: Date.now().toString(),
        name,
        email,
        message,
        submittedAt: new Date().toISOString(),
      };

      contactDatabase.push(newEntry);
      console.log(`[Database] Contact Saved: ${name} <${email}>`);
      console.log(`[Database] Total Entries: ${contactDatabase.length}`);

      res
        .status(200)
        .json({ success: true, message: "Data successfully saved." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save contact data" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history = [], adminInstructions = "", image } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      let currentSystemInstruction = SYSTEM_INSTRUCTION;
      if (adminInstructions) {
        currentSystemInstruction += `\n\nADMIN OVERRIDE/ADDITIONAL KNOWLEDGE:\n${adminInstructions}`;
      }

      // Restore history manually
      let validHistory = [...history];
      if (validHistory.length > 0 && validHistory[0].role === "ai") {
        validHistory.shift();
      }

      const contents = validHistory.map((msg: any) => ({
        role: msg.role === "ai" ? "model" : "user",
        parts: [{ text: msg.text }],
      }));

      const userParts: any[] = [{ text: message }];

      if (image && typeof image === "string" && image.startsWith("data:")) {
        const [meta, base64Data] = image.split(",");
        const mimeTypeMatch = meta.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*;/);
        
        if (mimeTypeMatch && mimeTypeMatch[1]) {
           const mimeType = mimeTypeMatch[1];
           // In Gemini API, only certain mimetypes are supported, but we pass it and if it fails, it fails gracefully.
           userParts.push({
             inlineData: {
               data: base64Data,
               mimeType: mimeType,
             },
           });
        }
      }

      contents.push({ role: "user", parts: userParts });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: currentSystemInstruction,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("[Gemini API Error]:", error?.message || error);
      res.status(500).json({ error: error?.message || "Failed to fetch response." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support wildcard routing for React Router (if used)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

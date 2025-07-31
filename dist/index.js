// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  documents;
  constructor() {
    this.documents = /* @__PURE__ */ new Map();
  }
  async createDocument(insertDocument) {
    const id = randomUUID();
    const now = /* @__PURE__ */ new Date();
    const document = {
      ...insertDocument,
      id,
      language: insertDocument.language || "en",
      generatedContent: insertDocument.generatedContent || null,
      createdAt: now,
      updatedAt: now
    };
    this.documents.set(id, document);
    return document;
  }
  async getDocument(id) {
    return this.documents.get(id);
  }
  async updateDocument(id, updates) {
    const existing = this.documents.get(id);
    if (!existing) return void 0;
    const updated = {
      ...existing,
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.documents.set(id, updated);
    return updated;
  }
  async deleteDocument(id) {
    return this.documents.delete(id);
  }
  async listDocuments() {
    return Array.from(this.documents.values());
  }
};
var storage = new MemStorage();

// server/services/ai.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});
var LANGUAGE_SETTINGS = {
  en: {
    name: "English",
    culturalNotes: "Use professional, confident language. Emphasize achievements and quantifiable results.",
    documentStructure: "Clear headings, bullet points for achievements, concise paragraphs.",
    formalityLevel: "Professional but approachable. Use active voice and action verbs."
  },
  nl: {
    name: "Dutch (Nederlands)",
    culturalNotes: "Dutch business culture values directness, humility, and collaboration. Avoid overly boastful language.",
    documentStructure: "Traditional CV format with clear sections. Prefer comprehensive paragraphs.",
    formalityLevel: "Professional and modest. Be specific but not overly promotional."
  },
  fr: {
    name: "French (Fran\xE7ais)",
    culturalNotes: "French professional culture values eloquence, education, and intellectual approach.",
    documentStructure: "Formal structure with detailed descriptions. Education section is prominent.",
    formalityLevel: "Formal and sophisticated. Use elegant expressions and avoid anglicisms."
  },
  de: {
    name: "German (Deutsch)",
    culturalNotes: "German business culture values thoroughness, precision, and qualifications.",
    documentStructure: "Comprehensive, detailed format (Lebenslauf). Include all relevant qualifications.",
    formalityLevel: "Very professional and detailed. Use precise language."
  },
  es: {
    name: "Spanish (Espa\xF1ol)",
    culturalNotes: "Spanish-speaking cultures value relationships and personal connection.",
    documentStructure: "Personal information section at top. Balance professional and personal aspects.",
    formalityLevel: "Professional but warm. Show personality alongside qualifications."
  },
  it: {
    name: "Italian (Italiano)",
    culturalNotes: "Italian business culture appreciates personal style, creativity, and relationship-building.",
    documentStructure: "Elegant formatting with attention to visual appeal.",
    formalityLevel: "Professional with personal touch. Show passion and enthusiasm."
  },
  pt: {
    name: "Portuguese (Portugu\xEAs)",
    culturalNotes: "Portuguese/Brazilian culture values relationships, education, and personal development.",
    documentStructure: "Include personal information and educational background prominently.",
    formalityLevel: "Respectful and warm. Emphasize growth, learning, and collaborative achievements."
  },
  zh: {
    name: "Chinese (\u4E2D\u6587)",
    culturalNotes: "Chinese business culture values education, hierarchy, respect, and long-term thinking.",
    documentStructure: "Education and qualifications first, followed by experience.",
    formalityLevel: "Highly respectful and humble. Emphasize dedication and continuous improvement."
  },
  ja: {
    name: "Japanese (\u65E5\u672C\u8A9E)",
    culturalNotes: "Japanese business culture emphasizes respect, group harmony, and continuous improvement.",
    documentStructure: "Formal structure with careful attention to detail.",
    formalityLevel: "Very respectful and humble. Use formal language."
  },
  ko: {
    name: "Korean (\uD55C\uAD6D\uC5B4)",
    culturalNotes: "Korean business culture values education, hard work, and respect for hierarchy.",
    documentStructure: "Educational background prominently featured.",
    formalityLevel: "Respectful and formal. Emphasize dedication and educational achievement."
  },
  ar: {
    name: "Arabic (\u0627\u0644\u0639\u0631\u0628\u064A\u0629)",
    culturalNotes: "Arabic business culture values respect, family, education, and personal relationships.",
    documentStructure: "Include personal information that shows character and family values.",
    formalityLevel: "Respectful and dignified. Use formal Arabic expressions."
  },
  hi: {
    name: "Hindi (\u0939\u093F\u0928\u094D\u0926\u0940)",
    culturalNotes: "Indian business culture values education, family, and respect for experience.",
    documentStructure: "Educational qualifications prominent.",
    formalityLevel: "Respectful and humble. Emphasize dedication to learning."
  },
  ru: {
    name: "Russian (\u0420\u0443\u0441\u0441\u043A\u0438\u0439)",
    culturalNotes: "Russian business culture values education, intellectual achievement, and systematic approach.",
    documentStructure: "Detailed educational background and technical qualifications.",
    formalityLevel: "Professional and intellectual. Emphasize competence and systematic thinking."
  },
  pl: {
    name: "Polish (Polski)",
    culturalNotes: "Polish business culture values education, tradition, and professional competence.",
    documentStructure: "Traditional CV format with emphasis on qualifications.",
    formalityLevel: "Professional and respectful. Emphasize qualifications and experience."
  },
  sv: {
    name: "Swedish (Svenska)",
    culturalNotes: "Swedish business culture values equality, collaboration, and work-life balance.",
    documentStructure: "Straightforward format emphasizing team achievements.",
    formalityLevel: "Professional but egalitarian. Emphasize collaboration and balance."
  }
};
var ENHANCED_PROMPT_TEMPLATE = `You are an expert professional writer specializing in resumes, CVs, and cover letters with deep cultural and linguistic expertise across multiple languages and business cultures.

**Task:** Create a {document_type} in {language} for the following candidate.

**Language & Cultural Context:**
Language: {language_name}
Cultural Notes: {cultural_notes}
Document Structure: {document_structure}
Formality Level: {formality_level}

**Candidate Information:**
- Name: {name}
- Job Title: {job_title}
- Age: {age}
- Gender: {gender}
- Country: {country}
- Years of Experience: {years_experience}

**Work Experience:**
{work_experience}

**Education:**
{education}

**Skills:**
- Technical Skills: {technical_skills}
- Soft Skills: {soft_skills}
- Language Skills: {language_skills}

**Motivation (for cover letters):**
- Why applying: {why_applying}
- What attracts you to the organization: {what_attracts}
- Unique qualities: {unique_qualities}
- Career goals: {career_goals}

**Instructions:**
1. Write the document entirely in native {language}, using authentic expressions and professional conventions specific to {language_name}-speaking regions
2. Apply the cultural context: {cultural_notes}
3. Follow the document structure guidelines: {document_structure}
4. Use the appropriate formality level: {formality_level}
5. For resumes/CVs: Focus on culturally appropriate presentation of achievements and experience
6. For cover letters: Create a compelling narrative that shows understanding of local business culture
7. Use industry-standard formatting and terminology specific to {language_name} professional contexts
8. Ensure all content is grammatically perfect and culturally appropriate
9. Include appropriate professional greetings and closings for the language and document type

**Critical Requirements:**
- Write ONLY in {language} using authentic professional vocabulary
- Apply cultural communication norms specific to {language_name}-speaking business environments
- Return only the complete document content without explanations
- Use proper professional formatting and structure for {language_name} business documents

Generate a professional, culturally appropriate {document_type} that would impress employers in {language_name}-speaking regions.`;
async function generateDocument(formData) {
  try {
    const { documentType, language, basicInfo, workExperience, education, skills, motivation } = formData;
    const languageSettings = LANGUAGE_SETTINGS[language] || LANGUAGE_SETTINGS.en;
    const workExpText = workExperience.map(
      (exp) => `${exp.jobTitle} at ${exp.companyName} (${exp.startDate} - ${exp.endDate || "Present"}): ${exp.responsibilities}${exp.achievements ? ". Achievements: " + exp.achievements : ""}`
    ).join("\n");
    const educationText = education.map(
      (edu) => `${edu.degree} from ${edu.institution} (${edu.startDate} - ${edu.endDate || "Present"})${edu.description ? ": " + edu.description : ""}`
    ).join("\n");
    const prompt = ENHANCED_PROMPT_TEMPLATE.replace(/{document_type}/g, documentType === "resume" ? "resume/CV" : "cover letter").replace(/{language}/g, language).replace(/{language_name}/g, languageSettings.name).replace(/{cultural_notes}/g, languageSettings.culturalNotes).replace(/{document_structure}/g, languageSettings.documentStructure).replace(/{formality_level}/g, languageSettings.formalityLevel).replace(/{job_title}/g, basicInfo.jobTitle).replace(/{name}/g, basicInfo.name).replace(/{age}/g, basicInfo.age.toString()).replace(/{gender}/g, basicInfo.gender || "").replace(/{country}/g, basicInfo.country).replace(/{years_experience}/g, basicInfo.yearsExperience.toString()).replace(/{work_experience}/g, workExpText).replace(/{technical_skills}/g, skills.technicalSkills).replace(/{soft_skills}/g, skills.softSkills).replace(/{language_skills}/g, skills.languageSkills).replace(/{education}/g, educationText).replace(/{why_applying}/g, motivation?.whyApplying || "").replace(/{what_attracts}/g, motivation?.whatAttracts || "").replace(/{unique_qualities}/g, motivation?.uniqueQualities || "").replace(/{career_goals}/g, motivation?.careerGoals || "");
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });
    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Error generating document:", error);
    if (error?.status === 429 || error?.code === "insufficient_quota") {
      console.log("OpenAI API quota exceeded, providing fallback document");
      return generateFallbackDocument(formData);
    }
    throw new Error("Failed to generate document content");
  }
}
function generateFallbackDocument(formData) {
  const { documentType, basicInfo, workExperience, education, skills } = formData;
  if (documentType === "cover-letter") {
    return `Dear Hiring Manager,

I am writing to express my strong interest in the ${basicInfo.jobTitle} position. With ${basicInfo.yearsExperience} years of experience in the field, I am confident that I would be a valuable addition to your team.

Throughout my career, I have developed expertise in ${skills.technicalSkills}. My professional experience includes:

${workExperience.map((exp) => `\u2022 ${exp.jobTitle} at ${exp.companyName}: ${exp.responsibilities}`).join("\n")}

I hold a ${education[0]?.degree || "relevant degree"} from ${education[0]?.institution || "a respected institution"}, which has provided me with a strong foundation in the field.

My soft skills include ${skills.softSkills}, and I am proficient in ${skills.languageSkills}.

I am excited about the opportunity to contribute to your organization and would welcome the chance to discuss how my experience and skills can benefit your team.

Thank you for your consideration.

Sincerely,
${basicInfo.name}`;
  }
  return `${basicInfo.name}
${basicInfo.jobTitle}

Contact Information:
Email: ${basicInfo.email}
Phone: ${basicInfo.phone}
Location: ${basicInfo.location}

PROFESSIONAL SUMMARY
Experienced ${basicInfo.jobTitle} with ${basicInfo.yearsExperience} years of expertise in delivering high-quality results and leading teams effectively.

WORK EXPERIENCE
${workExperience.map((exp) => `
${exp.jobTitle} | ${exp.companyName}
${exp.startDate} - ${exp.endDate || "Present"}
\u2022 ${exp.responsibilities}
${exp.achievements ? "\u2022 Achievements: " + exp.achievements : ""}
`).join("\n")}

EDUCATION
${education.map((edu) => `
${edu.degree} | ${edu.institution}
${edu.startDate} - ${edu.endDate || "Present"}
${edu.description || ""}
`).join("\n")}

TECHNICAL SKILLS
${skills.technicalSkills}

SOFT SKILLS
${skills.softSkills}

LANGUAGES
${skills.languageSkills}`;
}

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  // 'resume' or 'cover-letter'
  language: text("language").notNull().default("en"),
  data: jsonb("data").notNull(),
  generatedContent: text("generated_content"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var workExperiences = pgTable("work_experiences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: varchar("document_id").notNull(),
  jobTitle: text("job_title").notNull(),
  companyName: text("company_name").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  responsibilities: text("responsibilities").notNull(),
  achievements: text("achievements")
});
var educationEntries = pgTable("education_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: varchar("document_id").notNull(),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description")
});
var basicInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(16).max(100),
  gender: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  yearsExperience: z.number().min(0),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required")
});
var workExperienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  responsibilities: z.string().min(1, "Responsibilities are required"),
  achievements: z.string().optional()
});
var educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional()
});
var skillsSchema = z.object({
  technicalSkills: z.string().min(1, "Technical skills are required"),
  softSkills: z.string().min(1, "Soft skills are required"),
  languageSkills: z.string().min(1, "Language skills are required")
});
var motivationSchema = z.object({
  whyApplying: z.string().optional(),
  whatAttracts: z.string().optional(),
  uniqueQualities: z.string().optional(),
  careerGoals: z.string().optional()
});
var completeFormSchema = z.object({
  documentType: z.enum(["resume", "cover-letter"]),
  language: z.string().min(1),
  basicInfo: basicInfoSchema,
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  skills: skillsSchema,
  motivation: motivationSchema.optional()
});
var insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// server/routes.ts
import { z as z2 } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development"
    });
  });
  app2.post("/api/documents", async (req, res) => {
    try {
      const formData = completeFormSchema.parse(req.body);
      const generatedContent = await generateDocument(formData);
      const document = await storage.createDocument({
        type: formData.documentType,
        language: formData.language,
        data: formData,
        generatedContent
      });
      res.json(document);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Error creating document:", error);
        res.status(500).json({
          message: "Failed to create document"
        });
      }
    }
  });
  app2.get("/api/documents/:id", async (req, res) => {
    try {
      const document = await storage.getDocument(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json(document);
    } catch (error) {
      console.error("Error fetching document:", error);
      res.status(500).json({ message: "Failed to fetch document" });
    }
  });
  app2.put("/api/documents/:id", async (req, res) => {
    try {
      const formData = completeFormSchema.parse(req.body);
      const generatedContent = await generateDocument(formData);
      const document = await storage.updateDocument(req.params.id, {
        type: formData.documentType,
        language: formData.language,
        data: formData,
        generatedContent
      });
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json(document);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Error updating document:", error);
        res.status(500).json({
          message: "Failed to update document"
        });
      }
    }
  });
  app2.get("/api/documents", async (req, res) => {
    try {
      const documents2 = await storage.listDocuments();
      res.json(documents2);
    } catch (error) {
      console.error("Error listing documents:", error);
      res.status(500).json({ message: "Failed to list documents" });
    }
  });
  app2.delete("/api/documents/:id", async (req, res) => {
    try {
      const success = await storage.deleteDocument(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json({ message: "Document deleted successfully" });
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ message: "Failed to delete document" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // 'resume' or 'cover-letter'
  language: text("language").notNull().default('en'),
  data: jsonb("data").notNull(),
  generatedContent: text("generated_content"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const workExperiences = pgTable("work_experiences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: varchar("document_id").notNull(),
  jobTitle: text("job_title").notNull(),
  companyName: text("company_name").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  responsibilities: text("responsibilities").notNull(),
  achievements: text("achievements"),
});

export const educationEntries = pgTable("education_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: varchar("document_id").notNull(),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description"),
});

// Form data schemas
export const basicInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(16).max(100),
  gender: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  yearsExperience: z.number().min(0),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required"),
});

export const workExperienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  responsibilities: z.string().min(1, "Responsibilities are required"),
  achievements: z.string().optional(),
});

export const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export const skillsSchema = z.object({
  technicalSkills: z.string().min(1, "Technical skills are required"),
  softSkills: z.string().min(1, "Soft skills are required"),
  languageSkills: z.string().min(1, "Language skills are required"),
});

export const motivationSchema = z.object({
  whyApplying: z.string().optional(),
  whatAttracts: z.string().optional(),
  uniqueQualities: z.string().optional(),
  careerGoals: z.string().optional(),
});

export const completeFormSchema = z.object({
  documentType: z.enum(['resume', 'cover-letter']),
  language: z.string().min(1),
  basicInfo: basicInfoSchema,
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  skills: skillsSchema,
  motivation: motivationSchema.optional(),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type WorkExperience = typeof workExperiences.$inferSelect;
export type Education = typeof educationEntries.$inferSelect;
export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type Motivation = z.infer<typeof motivationSchema>;
export type CompleteForm = z.infer<typeof completeFormSchema>;

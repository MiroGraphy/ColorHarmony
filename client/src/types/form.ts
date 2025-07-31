import { z } from "zod";
import { 
  basicInfoSchema, 
  workExperienceSchema, 
  educationSchema, 
  skillsSchema, 
  motivationSchema,
  completeFormSchema
} from "@shared/schema";

export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type WorkExperienceForm = z.infer<typeof workExperienceSchema>;
export type EducationForm = z.infer<typeof educationSchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type Motivation = z.infer<typeof motivationSchema>;
export type CompleteForm = z.infer<typeof completeFormSchema>;

export interface FormState {
  currentStep: number;
  documentType: 'resume' | 'cover-letter';
  language: string;
  basicInfo: Partial<BasicInfo>;
  workExperience: WorkExperienceForm[];
  education: EducationForm[];
  skills: Partial<Skills>;
  motivation: Partial<Motivation>;
}

// Moved to i18n.ts for better internationalization support

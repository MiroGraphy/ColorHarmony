import OpenAI from "openai";
import { CompleteForm } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

interface LanguageSettings {
  name: string;
  culturalNotes: string;
  documentStructure: string;
  formalityLevel: string;
}

const LANGUAGE_SETTINGS: Record<string, LanguageSettings> = {
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
    name: "French (Français)",
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
    name: "Spanish (Español)",
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
    name: "Portuguese (Português)",
    culturalNotes: "Portuguese/Brazilian culture values relationships, education, and personal development.",
    documentStructure: "Include personal information and educational background prominently.",
    formalityLevel: "Respectful and warm. Emphasize growth, learning, and collaborative achievements."
  },
  zh: {
    name: "Chinese (中文)",
    culturalNotes: "Chinese business culture values education, hierarchy, respect, and long-term thinking.",
    documentStructure: "Education and qualifications first, followed by experience.",
    formalityLevel: "Highly respectful and humble. Emphasize dedication and continuous improvement."
  },
  ja: {
    name: "Japanese (日本語)",
    culturalNotes: "Japanese business culture emphasizes respect, group harmony, and continuous improvement.",
    documentStructure: "Formal structure with careful attention to detail.",
    formalityLevel: "Very respectful and humble. Use formal language."
  },
  ko: {
    name: "Korean (한국어)",
    culturalNotes: "Korean business culture values education, hard work, and respect for hierarchy.",
    documentStructure: "Educational background prominently featured.",
    formalityLevel: "Respectful and formal. Emphasize dedication and educational achievement."
  },
  ar: {
    name: "Arabic (العربية)",
    culturalNotes: "Arabic business culture values respect, family, education, and personal relationships.",
    documentStructure: "Include personal information that shows character and family values.",
    formalityLevel: "Respectful and dignified. Use formal Arabic expressions."
  },
  hi: {
    name: "Hindi (हिन्दी)",
    culturalNotes: "Indian business culture values education, family, and respect for experience.",
    documentStructure: "Educational qualifications prominent.",
    formalityLevel: "Respectful and humble. Emphasize dedication to learning."
  },
  ru: {
    name: "Russian (Русский)",
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

const ENHANCED_PROMPT_TEMPLATE = `You are an expert professional writer specializing in resumes, CVs, and cover letters with deep cultural and linguistic expertise across multiple languages and business cultures.

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

export async function generateDocument(formData: CompleteForm): Promise<string> {
  try {
    const { documentType, language, basicInfo, workExperience, education, skills, motivation } = formData;

    // Get language-specific settings
    const languageSettings = LANGUAGE_SETTINGS[language] || LANGUAGE_SETTINGS.en;

    // Format work experience
    const workExpText = workExperience.map(exp => 
      `${exp.jobTitle} at ${exp.companyName} (${exp.startDate} - ${exp.endDate || 'Present'}): ${exp.responsibilities}${exp.achievements ? '. Achievements: ' + exp.achievements : ''}`
    ).join('\n');

    // Format education
    const educationText = education.map(edu =>
      `${edu.degree} from ${edu.institution} (${edu.startDate} - ${edu.endDate || 'Present'})${edu.description ? ': ' + edu.description : ''}`
    ).join('\n');

    const prompt = ENHANCED_PROMPT_TEMPLATE
      .replace(/{document_type}/g, documentType === 'resume' ? 'resume/CV' : 'cover letter')
      .replace(/{language}/g, language)
      .replace(/{language_name}/g, languageSettings.name)
      .replace(/{cultural_notes}/g, languageSettings.culturalNotes)
      .replace(/{document_structure}/g, languageSettings.documentStructure)
      .replace(/{formality_level}/g, languageSettings.formalityLevel)
      .replace(/{job_title}/g, basicInfo.jobTitle)
      .replace(/{name}/g, basicInfo.name)
      .replace(/{age}/g, basicInfo.age.toString())
      .replace(/{gender}/g, basicInfo.gender || '')
      .replace(/{country}/g, basicInfo.country)
      .replace(/{years_experience}/g, basicInfo.yearsExperience.toString())
      .replace(/{work_experience}/g, workExpText)
      .replace(/{technical_skills}/g, skills.technicalSkills)
      .replace(/{soft_skills}/g, skills.softSkills)
      .replace(/{language_skills}/g, skills.languageSkills)
      .replace(/{education}/g, educationText)
      .replace(/{why_applying}/g, motivation?.whyApplying || '')
      .replace(/{what_attracts}/g, motivation?.whatAttracts || '')
      .replace(/{unique_qualities}/g, motivation?.uniqueQualities || '')
      .replace(/{career_goals}/g, motivation?.careerGoals || '');

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content || '';
  } catch (error: any) {
    console.error('Error generating document:', error);
    
    // Fallback for when API is unavailable
    if (error?.status === 429 || error?.code === 'insufficient_quota') {
      console.log('OpenAI API quota exceeded, providing fallback document');
      return generateFallbackDocument(formData);
    }
    
    throw new Error('Failed to generate document content');
  }
}

function generateFallbackDocument(formData: CompleteForm): string {
  const { documentType, basicInfo, workExperience, education, skills } = formData;
  
  if (documentType === 'cover-letter') {
    return `Dear Hiring Manager,

I am writing to express my strong interest in the ${basicInfo.jobTitle} position. With ${basicInfo.yearsExperience} years of experience in the field, I am confident that I would be a valuable addition to your team.

Throughout my career, I have developed expertise in ${skills.technicalSkills}. My professional experience includes:

${workExperience.map(exp => `• ${exp.jobTitle} at ${exp.companyName}: ${exp.responsibilities}`).join('\n')}

I hold a ${education[0]?.degree || 'relevant degree'} from ${education[0]?.institution || 'a respected institution'}, which has provided me with a strong foundation in the field.

My soft skills include ${skills.softSkills}, and I am proficient in ${skills.languageSkills}.

I am excited about the opportunity to contribute to your organization and would welcome the chance to discuss how my experience and skills can benefit your team.

Thank you for your consideration.

Sincerely,
${basicInfo.name}`;
  }
  
  // Resume format
  return `${basicInfo.name}
${basicInfo.jobTitle}

Contact Information:
Email: ${basicInfo.email}
Phone: ${basicInfo.phone}
Location: ${basicInfo.location}

PROFESSIONAL SUMMARY
Experienced ${basicInfo.jobTitle} with ${basicInfo.yearsExperience} years of expertise in delivering high-quality results and leading teams effectively.

WORK EXPERIENCE
${workExperience.map(exp => `
${exp.jobTitle} | ${exp.companyName}
${exp.startDate} - ${exp.endDate || 'Present'}
• ${exp.responsibilities}
${exp.achievements ? '• Achievements: ' + exp.achievements : ''}
`).join('\n')}

EDUCATION
${education.map(edu => `
${edu.degree} | ${edu.institution}
${edu.startDate} - ${edu.endDate || 'Present'}
${edu.description || ''}
`).join('\n')}

TECHNICAL SKILLS
${skills.technicalSkills}

SOFT SKILLS
${skills.softSkills}

LANGUAGES
${skills.languageSkills}`;
}

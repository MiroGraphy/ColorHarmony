import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// GitHub Pages fallback API
async function mockApiResponse(method: string, url: string, data?: any): Promise<Response> {
  if (method === 'POST' && url.includes('/api/documents')) {
    // Mock document generation for GitHub Pages
    const mockDocument = {
      id: `mock-${Date.now()}`,
      type: data?.documentType || 'resume',
      language: data?.language || 'en',
      data,
      generatedContent: generateMockDocument(data),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(mockDocument), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  throw new Error('Mock API: Endpoint not implemented');
}

function generateMockDocument(formData: any): string {
  if (!formData) return 'Mock document content';
  
  const { documentType, basicInfo, workExperience, education, skills } = formData;
  
  if (documentType === 'cover-letter') {
    return `Dear Hiring Manager,

I am writing to express my strong interest in the ${basicInfo?.jobTitle || 'position'}. With ${basicInfo?.yearsExperience || 'several'} years of experience, I believe I would be a valuable addition to your team.

Throughout my career, I have developed expertise in ${skills?.technicalSkills || 'various technologies'}. My experience includes working at ${workExperience?.[0]?.companyName || 'leading companies'} where I ${workExperience?.[0]?.responsibilities || 'contributed significantly to projects'}.

I hold a ${education?.[0]?.degree || 'relevant degree'} from ${education?.[0]?.institution || 'a respected institution'}, which has provided me with a strong foundation in the field.

My soft skills include ${skills?.softSkills || 'communication and teamwork'}, and I am proficient in ${skills?.languageSkills || 'multiple languages'}.

Thank you for your consideration.

Sincerely,
${basicInfo?.name || 'Candidate'}`;
  }
  
  // Resume format
  return `${basicInfo?.name || 'Your Name'}
${basicInfo?.jobTitle || 'Your Job Title'}

Contact Information:
Email: ${basicInfo?.email || 'your.email@example.com'}
Phone: ${basicInfo?.phone || 'Your Phone'}
Location: ${basicInfo?.location || 'Your Location'}

PROFESSIONAL SUMMARY
Experienced professional with ${basicInfo?.yearsExperience || 'several'} years of expertise in delivering high-quality results.

WORK EXPERIENCE
${workExperience?.map((exp: any) => `
${exp.jobTitle || 'Job Title'} | ${exp.companyName || 'Company'}
${exp.startDate || 'Start'} - ${exp.endDate || 'Present'}
• ${exp.responsibilities || 'Key responsibilities and achievements'}
`).join('\n') || 'Your work experience will appear here'}

EDUCATION
${education?.map((edu: any) => `
${edu.degree || 'Degree'} | ${edu.institution || 'Institution'}
${edu.startDate || 'Start'} - ${edu.endDate || 'End'}
`).join('\n') || 'Your education will appear here'}

TECHNICAL SKILLS
${skills?.technicalSkills || 'Your technical skills'}

SOFT SKILLS
${skills?.softSkills || 'Your soft skills'}

LANGUAGES
${skills?.languageSkills || 'Your language skills'}`;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  try {
    const res = await fetch(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    // Fallback to mock API for GitHub Pages (when backend is not available)
    if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
      console.log('Using mock API for GitHub Pages deployment');
      return mockApiResponse(method, url, data);
    }
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const res = await fetch(queryKey.join("/") as string, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    } catch (error) {
      // Fallback for GitHub Pages
      if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
        console.log('Query fallback for GitHub Pages');
        return null;
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

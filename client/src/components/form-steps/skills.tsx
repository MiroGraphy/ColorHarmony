import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillsSchema, motivationSchema, type Skills, type Motivation } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { z } from "zod";

const skillsFormSchema = z.object({
  skills: skillsSchema,
  motivation: motivationSchema.optional(),
});

type SkillsFormData = z.infer<typeof skillsFormSchema>;

interface SkillsFormProps {
  data: { skills: Partial<Skills>; motivation: Partial<Motivation> };
  onNext: (data: { skills: Skills; motivation?: Motivation }) => void;
  onPrevious: () => void;
  documentType: 'resume' | 'cover-letter';
}

export function SkillsForm({ data, onNext, onPrevious, documentType }: SkillsFormProps) {
  const form = useForm<SkillsFormData>({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: {
      skills: {
        technicalSkills: data.skills.technicalSkills || "",
        softSkills: data.skills.softSkills || "",
        languageSkills: data.skills.languageSkills || "",
      },
      motivation: documentType === 'cover-letter' ? {
        whyApplying: data.motivation.whyApplying || "",
        whatAttracts: data.motivation.whatAttracts || "",
        uniqueQualities: data.motivation.uniqueQualities || "",
        careerGoals: data.motivation.careerGoals || "",
      } : undefined,
    },
  });

  const onSubmit = (values: SkillsFormData) => {
    onNext({
      skills: values.skills,
      motivation: values.motivation,
    });
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-burgundy-800 mb-6">Skills & Competencies</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="skills.technicalSkills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Skills</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={3}
                    placeholder="JavaScript, Python, React, Node.js, PostgreSQL, AWS..."
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skills.softSkills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soft Skills</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={3}
                    placeholder="Team leadership, Communication, Problem-solving, Project management..."
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skills.languageSkills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language Skills</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={3}
                    placeholder="Dutch (Native), English (Fluent), German (Intermediate)..."
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {documentType === 'cover-letter' && (
            <>
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-burgundy-700 mb-4">Motivation (Cover Letter)</h4>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="motivation.whyApplying"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why are you applying for this position?</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={2}
                            placeholder="I am passionate about this role because..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="motivation.whatAttracts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What attracts you to this organization?</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={2}
                            placeholder="I am drawn to your company's innovative approach..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="motivation.uniqueQualities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What unique qualities do you bring?</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={2}
                            placeholder="My unique combination of technical expertise and leadership skills..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="motivation.careerGoals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What are your career goals?</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={2}
                            placeholder="My short-term goal is to contribute to innovative projects, while long-term I aim to..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              className="px-6 py-2"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              type="submit"
              className="px-6 py-2 bg-burgundy-600 hover:bg-burgundy-700"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { workExperienceSchema } from "@shared/schema";
import { type WorkExperienceForm } from "@/types/form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";

const experienceFormSchema = z.object({
  workExperience: z.array(workExperienceSchema).min(1, "At least one work experience is required"),
});

type ExperienceFormData = z.infer<typeof experienceFormSchema>;

interface ExperienceFormProps {
  data: WorkExperienceForm[];
  onNext: (data: WorkExperienceForm[]) => void;
  onPrevious: () => void;
}

export function ExperienceForm({ data, onNext, onPrevious }: ExperienceFormProps) {
  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      workExperience: data.length > 0 ? data : [{
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
        achievements: "",
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });

  const onSubmit = (values: ExperienceFormData) => {
    onNext(values.workExperience);
  };

  const addExperience = () => {
    append({
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
      achievements: "",
    });
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-burgundy-800 mb-6">Work Experience</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">
                  Experience {index + 1}
                </CardTitle>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`workExperience.${index}.jobTitle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Senior Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`workExperience.${index}.companyName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Tech Solutions BV" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`workExperience.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input placeholder="2020-01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`workExperience.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Present or 2023-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`workExperience.${index}.responsibilities`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Responsibilities</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={3}
                          placeholder="Led development of microservices architecture, managed team of 5 developers..."
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`workExperience.${index}.achievements`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Achievements (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={2}
                          placeholder="Improved application performance by 40%, reduced deployment time by 60%..."
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addExperience}
            className="w-full border-dashed"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Experience
          </Button>

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

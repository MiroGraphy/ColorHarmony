import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CompleteForm } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Download, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  data: CompleteForm;
  onPrevious: () => void;
  onComplete: (documentId: string) => void;
}

export function ReviewForm({ data, onPrevious, onComplete }: ReviewFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createDocumentMutation = useMutation({
    mutationFn: async (formData: CompleteForm) => {
      const response = await apiRequest("POST", "/api/documents", formData);
      return response.json();
    },
    onSuccess: (document) => {
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      toast({
        title: "Document Generated Successfully",
        description: "Your document has been created and is ready for download.",
      });
      onComplete(document.id);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate document. Please try again.",
        variant: "destructive",
      });
      console.error('Error creating document:', error);
    },
  });

  const handleSubmit = () => {
    createDocumentMutation.mutate(data);
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-burgundy-800 mb-6">Review & Generate</h3>
      
      <div className="space-y-6">
        {/* Document Type & Language */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Document Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-burgundy-100 text-burgundy-800">
                {data.documentType === 'resume' ? 'Resume/CV' : 'Cover Letter'}
              </Badge>
              <Badge variant="outline">
                {data.language}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {data.basicInfo.name}
              </div>
              <div>
                <span className="font-medium">Job Title:</span> {data.basicInfo.jobTitle}
              </div>
              <div>
                <span className="font-medium">Age:</span> {data.basicInfo.age}
              </div>
              <div>
                <span className="font-medium">Country:</span> {data.basicInfo.country}
              </div>
              <div>
                <span className="font-medium">Experience:</span> {data.basicInfo.yearsExperience} years
              </div>
              <div>
                <span className="font-medium">Email:</span> {data.basicInfo.email}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Work Experience ({data.workExperience.length} entries)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.workExperience.map((exp, index) => (
                <div key={index} className="border-l-2 border-burgundy-500 pl-4">
                  <h4 className="font-medium">{exp.jobTitle} at {exp.companyName}</h4>
                  <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Education ({data.education.length} entries)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-gold-500 pl-4">
                  <h4 className="font-medium">{edu.degree}</h4>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate || 'Present'}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Technical:</span> {data.skills.technicalSkills}
              </div>
              <div>
                <span className="font-medium">Soft Skills:</span> {data.skills.softSkills}
              </div>
              <div>
                <span className="font-medium">Languages:</span> {data.skills.languageSkills}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
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
            onClick={handleSubmit}
            disabled={createDocumentMutation.isPending}
            className="px-6 py-2 bg-gold-600 hover:bg-gold-700"
          >
            {createDocumentMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Generate Document
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FormState, CompleteForm } from "@/types/form";
import { getLanguageOptions, getTranslation } from "@/lib/i18n";
import { BasicInfoForm } from "@/components/form-steps/basic-info";
import { ExperienceForm } from "@/components/form-steps/experience";
import { EducationForm } from "@/components/form-steps/education";
import { SkillsForm } from "@/components/form-steps/skills";
import { ReviewForm } from "@/components/form-steps/review";
import { DocumentPreview } from "@/components/document-preview";
import { PDFGenerator } from "@/components/pdf-generator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileText, Mail, HelpCircle, Palette } from "lucide-react";

const TOTAL_STEPS = 5;

export default function Home() {
  const { toast } = useToast();
  
  const [formState, setFormState] = useState<FormState>({
    currentStep: 1,
    documentType: 'resume',
    language: 'en',
    basicInfo: {},
    workExperience: [],
    education: [],
    skills: {},
    motivation: {},
  });

  const t = getTranslation(formState.language);

  const [generatedDocumentId, setGeneratedDocumentId] = useState<string | null>(null);

  // Fetch generated document if available
  const { data: generatedDocument } = useQuery<{ generatedContent?: string }>({
    queryKey: ['/api/documents', generatedDocumentId],
    enabled: !!generatedDocumentId,
  });

  const updateFormState = (updates: Partial<FormState>) => {
    setFormState(prev => ({ ...prev, ...updates }));
  };

  const handleDocumentTypeChange = (type: 'resume' | 'cover-letter') => {
    updateFormState({ documentType: type });
  };

  const handleLanguageChange = (language: string) => {
    updateFormState({ language });
  };

  const handleStepComplete = (stepData: any) => {
    switch (formState.currentStep) {
      case 1:
        updateFormState({ 
          basicInfo: stepData, 
          currentStep: 2 
        });
        break;
      case 2:
        updateFormState({ 
          workExperience: stepData, 
          currentStep: 3 
        });
        break;
      case 3:
        updateFormState({ 
          education: stepData, 
          currentStep: 4 
        });
        break;
      case 4:
        updateFormState({ 
          skills: stepData.skills,
          motivation: stepData.motivation || {},
          currentStep: 5 
        });
        break;
    }
  };

  const handlePrevious = () => {
    if (formState.currentStep > 1) {
      updateFormState({ currentStep: formState.currentStep - 1 });
    }
  };

  const handleDocumentGenerated = (documentId: string) => {
    setGeneratedDocumentId(documentId);
  };

  const getStepName = (step: number) => {
    const steps = [t.basicInfo, t.workExperience, t.education, t.skills, t.review];
    return steps[step - 1];
  };

  const renderCurrentStep = () => {
    const commonProps = {
      onPrevious: handlePrevious,
    };

    switch (formState.currentStep) {
      case 1:
        return (
          <BasicInfoForm
            {...commonProps}
            data={formState.basicInfo}
            onNext={handleStepComplete}
            canGoBack={false}
            language={formState.language}
          />
        );
      case 2:
        return (
          <ExperienceForm
            {...commonProps}
            data={formState.workExperience}
            onNext={handleStepComplete}
          />
        );
      case 3:
        return (
          <EducationForm
            {...commonProps}
            data={formState.education}
            onNext={handleStepComplete}
          />
        );
      case 4:
        return (
          <SkillsForm
            {...commonProps}
            data={{ skills: formState.skills, motivation: formState.motivation }}
            onNext={handleStepComplete}
            documentType={formState.documentType}
          />
        );
      case 5:
        const completeForm: CompleteForm = {
          documentType: formState.documentType,
          language: formState.language,
          basicInfo: formState.basicInfo as any,
          workExperience: formState.workExperience,
          education: formState.education,
          skills: formState.skills as any,
          motivation: formState.motivation as any,
        };
        return (
          <ReviewForm
            {...commonProps}
            data={completeForm}
            onComplete={handleDocumentGenerated}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-burgundy-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-burgundy-600 to-burgundy-800 rounded-lg flex items-center justify-center shadow-lg">
                <FileText className="text-gold-100 text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-burgundy-800">{t.appTitle}</h1>
                <p className="text-sm text-gray-600">{t.appSubtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={formState.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getLanguageOptions().map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="ghost" size="icon" className="text-burgundy-600 hover:text-burgundy-800">
                <HelpCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form Panel */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            {/* Progress Indicator */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-burgundy-800">{t.appTitle}</h2>
                <span className="text-sm text-gray-500">
{t.step} {formState.currentStep} {t.of} {TOTAL_STEPS}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full ${
                      i < formState.currentStep ? 'bg-gold-600' : 'bg-burgundy-100'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                  <span key={i}>{getStepName(i + 1)}</span>
                ))}
              </div>
            </div>

            {/* Document Type Selector */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-burgundy-800 mb-4">Document Type</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="documentType"
                    value="resume"
                    checked={formState.documentType === 'resume'}
                    onChange={() => handleDocumentTypeChange('resume')}
                    className="sr-only peer"
                  />
                  <div className={`document-type-option ${formState.documentType === 'resume' ? 'selected' : ''} p-4 border-2 border-gray-200 rounded-lg hover:border-burgundy-300 cursor-pointer`}>
                    <div className="flex items-center space-x-3">
                      <FileText className="option-icon text-2xl text-burgundy-600" />
                      <div>
                        <h4 className="option-title font-medium text-gray-800">{t.resume}</h4>
                        <p className="text-sm text-gray-600">Professional resume</p>
                      </div>
                    </div>
                  </div>
                </label>
                
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="documentType"
                    value="cover-letter"
                    checked={formState.documentType === 'cover-letter'}
                    onChange={() => handleDocumentTypeChange('cover-letter')}
                    className="sr-only peer"
                  />
                  <div className={`document-type-option ${formState.documentType === 'cover-letter' ? 'selected' : ''} p-4 border-2 border-gray-200 rounded-lg hover:border-burgundy-300 cursor-pointer`}>
                    <div className="flex items-center space-x-3">
                      <Mail className="option-icon text-2xl text-burgundy-600" />
                      <div>
                        <h4 className="option-title font-medium text-gray-800">{t.coverLetter}</h4>
                        <p className="text-sm text-gray-600">Compelling introduction</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Form Steps */}
            {renderCurrentStep()}
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-burgundy-800">Live Preview</h2>
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-burgundy-600 hover:text-burgundy-800"
                    onClick={() => {
                      // Toggle between template styles - for now just show a toast
                      toast({
                        title: "Template Changed",
                        description: "Alternative template style applied",
                      });
                    }}
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Change Template
                  </Button>
                  <PDFGenerator 
                    content={generatedDocument?.generatedContent || undefined}
                    fileName={`${formState.documentType}-${formState.basicInfo.name || 'document'}`}
                  />
                </div>
              </div>
            </div>

            <DocumentPreview 
              data={formState as Partial<CompleteForm>}
              generatedContent={generatedDocument?.generatedContent}
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

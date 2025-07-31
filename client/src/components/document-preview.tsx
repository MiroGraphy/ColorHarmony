import { CompleteForm } from "@/types/form";

interface DocumentPreviewProps {
  data: Partial<CompleteForm>;
  generatedContent?: string;
}

export function DocumentPreview({ data, generatedContent }: DocumentPreviewProps) {
  const documentType = data.documentType || 'resume';
  
  if (generatedContent) {
    return (
      <div className="p-6">
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm min-h-[600px] p-8">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {generatedContent}
          </div>
        </div>
      </div>
    );
  }

  if (!data.basicInfo?.name) {
    return (
      <div className="p-6">
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm min-h-[600px] p-8 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium mb-2">Live Preview</p>
            <p className="text-sm">Fill out the form to see your {documentType === 'cover-letter' ? 'cover letter' : 'resume'} preview</p>
          </div>
        </div>
      </div>
    );
  }

  // Show different preview based on document type
  if (documentType === 'cover-letter') {
    return (
      <div className="p-6">
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm min-h-[600px] p-8">
          {/* Cover Letter Format */}
          <div className="text-right mb-6 text-sm text-gray-600">
            {new Date().toLocaleDateString()}
          </div>
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-burgundy-800 mb-1">
              {data.basicInfo?.name || "Your Name"}
            </h1>
            <div className="text-sm text-gray-600 space-y-1">
              <div>{data.basicInfo?.email || "your.email@example.com"}</div>
              <div>{data.basicInfo?.phone || "Your Phone"}</div>
              <div>{data.basicInfo?.location || "Your Location"}</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-4">
              Hiring Manager<br/>
              Company Name<br/>
              Company Address
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm">Dear Hiring Manager,</p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              I am writing to express my strong interest in the <strong>{data.basicInfo?.jobTitle || "position"}</strong> 
              {data.motivation?.whyApplying && (
                <span> because {data.motivation.whyApplying.toLowerCase()}</span>
              )}. 
              With {data.basicInfo?.yearsExperience || "several"} years of experience, I am confident in my ability to contribute effectively to your team.
            </p>
            
            {data.motivation?.whatAttracts && (
              <p>
                What particularly attracts me to your organization is {data.motivation.whatAttracts.toLowerCase()}.
              </p>
            )}
            
            {data.motivation?.uniqueQualities && (
              <p>
                I bring unique qualities including {data.motivation.uniqueQualities.toLowerCase()}, 
                which would be valuable assets to your team.
              </p>
            )}
            
            {data.motivation?.careerGoals && (
              <p>
                My career goals align well with this opportunity as {data.motivation.careerGoals.toLowerCase()}.
              </p>
            )}
          </div>

          <div className="mt-6 text-sm">
            <p>Thank you for considering my application. I look forward to discussing how I can contribute to your team.</p>
            <p className="mt-4">Sincerely,</p>
            <p className="mt-6 font-medium">{data.basicInfo?.name || "Your Name"}</p>
          </div>
        </div>
      </div>
    );
  }

  // Resume format
  return (
    <div className="p-6">
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm min-h-[600px] p-8">
        {/* Document Header */}
        <div className="border-b-2 border-burgundy-500 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-burgundy-800 mb-2">
            {data.basicInfo?.name || "Your Name"}
          </h1>
          <p className="text-xl text-gray-700 mb-3">
            {data.basicInfo?.jobTitle || "Your Job Title"}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>
              <i className="fas fa-envelope text-burgundy-500 mr-2"></i>
              {data.basicInfo?.email || "your.email@example.com"}
            </span>
            <span>
              <i className="fas fa-phone text-burgundy-500 mr-2"></i>
              {data.basicInfo?.phone || "Your Phone"}
            </span>
            <span>
              <i className="fas fa-map-marker-alt text-burgundy-500 mr-2"></i>
              {data.basicInfo?.location || "Your Location"}
            </span>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-burgundy-800 mb-3 flex items-center">
            <div className="w-1 h-6 bg-gold-500 mr-3"></div>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            {data.basicInfo?.yearsExperience ? 
              `Experienced ${data.basicInfo.jobTitle} with ${data.basicInfo.yearsExperience}+ years of expertise. ` : 
              "Experienced professional with extensive expertise. "
            }
            Proven track record of delivering high-quality results and leading teams effectively.
          </p>
        </div>

        {/* Work Experience */}
        {data.workExperience && data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-burgundy-800 mb-3 flex items-center">
              <div className="w-1 h-6 bg-gold-500 mr-3"></div>
              Work Experience
            </h2>
            
            {data.workExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-burgundy-600 text-sm">{exp.companyName}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <div className="text-sm text-gray-700 ml-4">
                  <p>{exp.responsibilities}</p>
                  {exp.achievements && (
                    <p className="mt-1 text-green-700">• {exp.achievements}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technical Skills */}
        {data.skills?.technicalSkills && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-burgundy-800 mb-3 flex items-center">
              <div className="w-1 h-6 bg-gold-500 mr-3"></div>
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.technicalSkills.split(',').map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-burgundy-100 text-burgundy-800 text-xs rounded-full"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-burgundy-800 mb-3 flex items-center">
              <div className="w-1 h-6 bg-gold-500 mr-3"></div>
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                    <p className="text-burgundy-600 text-sm">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


import React, { useRef, useState } from "react";
import { ResumeData, initialResumeData } from "@/components/ResumeSections";
import ResumePreview from "@/components/ResumePreview";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import EducationForm from "@/components/EducationForm";
import ExperienceForm from "@/components/ExperienceForm";
import SkillsForm from "@/components/SkillsForm";
import ProjectsForm from "@/components/ProjectsForm";
import FinishForm from "@/components/FinishForm";
import { Card } from "@/components/ui/card";
import { FileText, ArrowLeft, ArrowRight } from "lucide-react";

type SectionType = "personal" | "education" | "experience" | "skills" | "projects" | "finish";

const sections: SectionType[] = ["personal", "education", "experience", "skills", "projects", "finish"];

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [currentSection, setCurrentSection] = useState<SectionType>("personal");
  const [isStarted, setIsStarted] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleUpdateData = (data: ResumeData) => {
    setResumeData(data);
  };

  const goToNextSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
      if (editorRef.current) {
        editorRef.current.scrollTop = 0;
      }
    }
  };

  const goToPrevSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
      if (editorRef.current) {
        editorRef.current.scrollTop = 0;
      }
    }
  };

  const goToSection = (section: SectionType) => {
    setCurrentSection(section);
    if (editorRef.current) {
      editorRef.current.scrollTop = 0;
    }
  };

  const renderForm = () => {
    switch (currentSection) {
      case "personal":
        return (
          <PersonalInfoForm
            data={resumeData}
            updateData={handleUpdateData}
            onNext={goToNextSection}
          />
        );
      case "education":
        return (
          <EducationForm
            data={resumeData}
            updateData={handleUpdateData}
            onNext={goToNextSection}
            onBack={goToPrevSection}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            data={resumeData}
            updateData={handleUpdateData}
            onNext={goToNextSection}
            onBack={goToPrevSection}
          />
        );
      case "skills":
        return (
          <SkillsForm
            data={resumeData}
            updateData={handleUpdateData}
            onNext={goToNextSection}
            onBack={goToPrevSection}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            data={resumeData}
            updateData={handleUpdateData}
            onNext={goToNextSection}
            onBack={goToPrevSection}
          />
        );
      case "finish":
        return (
          <FinishForm data={resumeData} onBack={goToPrevSection} />
        );
      default:
        return null;
    }
  };

  const renderStartScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Resumatic <span className="text-primary">AI</span> Builder
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create a professional, ATS-friendly resume in minutes.
          Our step-by-step builder helps you craft the perfect resume.
        </p>
        
        <div className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">ATS Optimized</h3>
              <p className="text-sm text-gray-500">
                Single-column format for maximum ATS compatibility
              </p>
            </div>
            
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Step-by-Step</h3>
              <p className="text-sm text-gray-500">
                Guided process with live preview as you build
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setIsStarted(true)}
          className="px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          Start Building Your Resume
        </button>
      </div>
    </div>
  );

  const renderBuilder = () => (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Resumatic <span className="text-primary">AI</span> Builder
            </h1>
            <div className="flex items-center space-x-1">
              {sections.map((section, index) => (
                <button
                  key={section}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSection === section
                      ? "bg-primary"
                      : index <= sections.indexOf(currentSection)
                      ? "bg-blue-200"
                      : "bg-gray-200"
                  }`}
                  onClick={() => {
                    // Only allow going to sections that are before or equal to the current one
                    if (index <= sections.indexOf(currentSection)) {
                      goToSection(section);
                    }
                  }}
                  aria-label={`Go to ${section} section`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor panel */}
          <div ref={editorRef} className="lg:order-1 order-2 overflow-y-auto h-[calc(100vh-10rem)]">
            <Card className="p-6">{renderForm()}</Card>
          </div>

          {/* Preview panel */}
          <div className="lg:order-2 order-1 h-[calc(100vh-10rem)]">
            <Card className="h-full overflow-hidden">
              <ResumePreview data={resumeData} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  return isStarted ? renderBuilder() : renderStartScreen();
};

export default Index;

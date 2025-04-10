
import React, { useRef, useState } from "react";
import { ResumeData, initialResumeData } from "@/components/ResumeSections";
import ResumePreview from "@/components/ResumePreview";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import EducationForm from "@/components/EducationForm";
import ExperienceForm from "@/components/ExperienceForm";
import SkillsForm from "@/components/SkillsForm";
import ProjectsForm from "@/components/ProjectsForm";
import FinishForm from "@/components/FinishForm";
import TemplateSelector from "@/components/TemplateSelector";
import { Card } from "@/components/ui/card";
import { FileText, ArrowLeft, ArrowRight, User, BookOpen, Briefcase, Code, Shapes, CheckCircle, LayoutTemplate } from "lucide-react";
import { useTemplates, ResumeTemplate } from "@/contexts/TemplateContext";

type SectionType = "personal" | "education" | "experience" | "skills" | "projects" | "finish";

interface SectionInfo {
  id: SectionType;
  label: string;
  icon: React.ReactNode;
}

const sections: SectionInfo[] = [
  { id: "personal", label: "Personal", icon: <User className="h-4 w-4" /> },
  { id: "education", label: "Education", icon: <BookOpen className="h-4 w-4" /> },
  { id: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
  { id: "skills", label: "Skills", icon: <Code className="h-4 w-4" /> },
  { id: "projects", label: "Projects", icon: <Shapes className="h-4 w-4" /> },
  { id: "finish", label: "Finish", icon: <CheckCircle className="h-4 w-4" /> }
];

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [currentSection, setCurrentSection] = useState<SectionType>("personal");
  const [isStarted, setIsStarted] = useState(false);
  const [hideProfessionalTitle, setHideProfessionalTitle] = useState(false);
  const [isSelectingTemplate, setIsSelectingTemplate] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const { setSelectedTemplate } = useTemplates();

  const handleUpdateData = (data: ResumeData) => {
    // Check if professional title is empty or not
    setHideProfessionalTitle(!data.personal.title);
    setResumeData(data);
  };

  const goToNextSection = () => {
    const currentIndex = sections.findIndex(s => s.id === currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1].id);
      if (editorRef.current) {
        editorRef.current.scrollTop = 0;
      }
    }
  };

  const goToPrevSection = () => {
    const currentIndex = sections.findIndex(s => s.id === currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1].id);
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

  const handleTemplateSelection = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
    setIsSelectingTemplate(false);
  };

  const handleStart = () => {
    setIsStarted(true);
    setIsSelectingTemplate(true);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-6 inline-block">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur opacity-30"></div>
            <div className="relative bg-white rounded-full p-3 shadow-soft">
              <FileText className="h-12 w-12 text-primary" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-heading">
          Resumatic AI Builder
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Create a professional, ATS-friendly resume in minutes with our
          step-by-step builder.
        </p>
        
        <div className="mb-12 bg-white p-8 rounded-2xl shadow-soft">
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <div className="flex-1 flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-medium mb-2 text-lg font-heading">ATS Optimized</h3>
              <p className="text-sm text-gray-500">
                Single-column format for maximum ATS compatibility
              </p>
            </div>
            
            <div className="flex-1 flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                <ArrowRight className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-medium mb-2 text-lg font-heading">Step-by-Step</h3>
              <p className="text-sm text-gray-500">
                Guided process with live preview as you build
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleStart}
          className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 bg-pos-0 rounded-xl text-white font-medium shadow-md hover:shadow-lg hover:bg-pos-100 transition-all duration-500 transform hover:scale-105"
        >
          Start Building Your Resume
        </button>
      </div>
    </div>
  );

  const renderTemplateSelector = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-12">
      <div className="container mx-auto">
        <div className="mb-6 text-center">
          <div className="inline-block">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur opacity-30"></div>
              <div className="relative bg-white rounded-full p-3 shadow-soft">
                <LayoutTemplate className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
        
        <TemplateSelector onSelect={handleTemplateSelection} />
      </div>
    </div>
  );

  const renderBuilder = () => (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b py-4 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-heading">
              Resumatic AI Builder
            </h1>
            
            {/* Modern step indicators */}
            <div className="hidden md:flex items-center">
              {sections.map((section, index) => {
                const currentIndex = sections.findIndex(s => s.id === currentSection);
                const isActive = section.id === currentSection;
                const isCompleted = index < currentIndex;
                
                return (
                  <React.Fragment key={section.id}>
                    {index > 0 && (
                      <div 
                        className={`h-0.5 w-6 mx-1 ${
                          index <= currentIndex ? "bg-gradient-to-r from-primary to-secondary" : "bg-gray-200"
                        } transition-all duration-300`}
                      />
                    )}
                    <button
                      className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
                        isActive 
                          ? "bg-gradient-to-r from-primary to-secondary text-white h-8 w-8 shadow-md" 
                          : isCompleted 
                            ? "bg-primary/15 text-primary h-7 w-7" 
                            : "bg-gray-100 text-gray-400 h-7 w-7"
                      }`}
                      onClick={() => {
                        // Only allow going to sections that are before or equal to the current one
                        if (index <= currentIndex) {
                          goToSection(section.id);
                        }
                      }}
                      title={section.label}
                    >
                      {section.icon}
                      <span className={`absolute -bottom-6 text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                        isActive ? "text-primary" : "text-gray-500"
                      }`}>
                        {section.label}
                      </span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
            
            {/* Mobile step indicator */}
            <div className="flex md:hidden items-center space-x-1.5">
              {sections.map((section, index) => {
                const currentIndex = sections.findIndex(s => s.id === currentSection);
                return (
                  <button
                    key={section.id}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      section.id === currentSection
                        ? "bg-gradient-to-r from-primary to-secondary scale-110 shadow-sm"
                        : index <= currentIndex
                        ? "bg-primary/40"
                        : "bg-gray-200"
                    }`}
                    onClick={() => {
                      // Only allow going to sections that are before or equal to the current one
                      if (index <= currentIndex) {
                        goToSection(section.id);
                      }
                    }}
                    aria-label={`Go to ${section.label} section`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor panel */}
          <div ref={editorRef} className="lg:order-1 order-2 overflow-y-auto h-[calc(100vh-10rem)] animate-fade-in">
            <Card className="p-6 shadow-soft rounded-xl border-0 hover:shadow-md transition-all duration-300">{renderForm()}</Card>
          </div>

          {/* Preview panel */}
          <div className="lg:order-2 order-1 h-[calc(100vh-10rem)] animate-fade-in">
            <Card className="h-full overflow-hidden shadow-soft rounded-xl border-0">
              <ResumePreview data={resumeData} hideProfessionalTitle={hideProfessionalTitle} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isStarted) {
    return renderStartScreen();
  }

  if (isSelectingTemplate) {
    return renderTemplateSelector();
  }

  return renderBuilder();
};

export default Index;

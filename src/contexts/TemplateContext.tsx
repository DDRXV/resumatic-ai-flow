
import React, { createContext, useContext, useState } from "react";
import { ResumeData } from "@/components/ResumeSections";
import templates from "@/components/templates";

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  accent: string;
  preview: React.FC<{data: ResumeData, hideProfessionalTitle?: boolean}>;
}

interface TemplateContextProps {
  templates: ResumeTemplate[];
  selectedTemplate: ResumeTemplate | null;
  setSelectedTemplate: (template: ResumeTemplate) => void;
}

const TemplateContext = createContext<TemplateContextProps | undefined>(undefined);

export const useTemplates = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplates must be used within a TemplateProvider");
  }
  return context;
};

export const TemplateProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);

  return (
    <TemplateContext.Provider 
      value={{
        templates,
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

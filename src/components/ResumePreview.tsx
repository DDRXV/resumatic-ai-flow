
import React from "react";
import { ResumeData } from "./ResumeSections";
import { useTemplates } from "@/contexts/TemplateContext";
import DefaultTemplate from "./templates/DefaultTemplate";

interface ResumePreviewProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, hideProfessionalTitle = false }) => {
  const { selectedTemplate } = useTemplates();
  
  // If no template is selected, fallback to DefaultTemplate
  const Template = selectedTemplate?.preview || DefaultTemplate;
  
  return <Template data={data} hideProfessionalTitle={hideProfessionalTitle} />;
};

export default ResumePreview;

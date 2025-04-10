
import DefaultTemplate from "./DefaultTemplate";
import ModernTemplate from "./ModernTemplate";
import { ResumeTemplate } from "@/contexts/TemplateContext";

export const templates: ResumeTemplate[] = [
  {
    id: "default",
    name: "Classic",
    description: "Traditional resume layout with a clean and professional look.",
    accent: "#0EA5E9",
    preview: DefaultTemplate,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with improved spacing and typography.",
    accent: "#3B82F6",
    preview: ModernTemplate,
  }
];

export default templates;

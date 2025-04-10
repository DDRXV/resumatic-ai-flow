
import DefaultTemplate from "./DefaultTemplate";
import ModernTemplate from "./ModernTemplate";
import SideBySideTemplate from "./SideBySideTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";
import ModernAccentTemplate from "./ModernAccentTemplate";
import CreativeTemplate from "./CreativeTemplate";
import SimpleTemplate from "./SimpleTemplate";
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
  },
  {
    id: "sidebyside",
    name: "Side Panel",
    description: "Two-column layout with a colored sidebar for visual impact.",
    accent: "#1e293b",
    preview: SideBySideTemplate,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and minimalist design focusing on content clarity.",
    accent: "#6B7280",
    preview: MinimalTemplate,
  },
  {
    id: "professional",
    name: "Professional",
    description: "Elegant two-column layout with clear hierarchy and structure.",
    accent: "#4B5563",
    preview: ProfessionalTemplate,
  },
  {
    id: "modernaccent",
    name: "Accent",
    description: "Modern design with a strong accent color and timeline elements.",
    accent: "#1E3A8A",
    preview: ModernAccentTemplate,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold, colorful design with modern styling elements.",
    accent: "#4F46E5",
    preview: CreativeTemplate,
  },
  {
    id: "simple",
    name: "Simple",
    description: "Understated, straightforward layout for maximum readability.",
    accent: "#374151",
    preview: SimpleTemplate,
  }
];

export default templates;

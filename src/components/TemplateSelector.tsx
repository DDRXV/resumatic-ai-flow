
import React from "react";
import { initialResumeData } from "@/components/ResumeSections";
import { Card } from "@/components/ui/card";
import { useTemplates, ResumeTemplate } from "@/contexts/TemplateContext";
import { Check, ArrowRight } from "lucide-react";

interface TemplateSelectorProps {
  onSelect: (template: ResumeTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  const { templates } = useTemplates();
  const [hoveredTemplate, setHoveredTemplate] = React.useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Choose Your Resume Template
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Select a template to get started. You can customize it with your information in the next steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {templates.map((template) => (
          <div key={template.id} className="flex flex-col">
            <Card 
              className={`relative flex-1 overflow-hidden transition-all duration-300 border-2 hover:shadow-lg cursor-pointer ${
                hoveredTemplate === template.id ? 'border-primary scale-[1.02]' : 'border-transparent'
              }`}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              onClick={() => onSelect(template)}
            >
              {/* Template Preview */}
              <div className="h-[400px] overflow-hidden">
                <div className="transform scale-[0.4] origin-top h-[250%] w-[250%] -ml-[75%] -mt-[10%]">
                  <template.preview data={initialResumeData} />
                </div>
              </div>
              
              {/* Hover Overlay */}
              {hoveredTemplate === template.id && (
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                  <div className="bg-white rounded-full p-3 shadow-md">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                </div>
              )}
            </Card>
            
            <div className="mt-3 text-center">
              <h3 className="font-semibold text-lg text-gray-800">{template.name}</h3>
              <p className="text-sm text-gray-500">{template.description}</p>
              <button 
                className="mt-2 inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                onClick={() => onSelect(template)}
              >
                Select this template
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;

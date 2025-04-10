
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, X, Code, Blocks, Sparkles } from "lucide-react";
import { ResumeData } from "./ResumeSections";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface ProjectsFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const handleChange = (id: string, field: string, value: string) => {
    const updatedProjects = data.projects.map((project) =>
      project.id === id ? { ...project, [field]: value } : project
    );
    
    updateData({ ...data, projects: updatedProjects });
  };

  const handleBulletChange = (id: string, index: number, value: string) => {
    const updatedProjects = data.projects.map((project) => {
      if (project.id === id) {
        const updatedBullets = [...project.bullets];
        updatedBullets[index] = value;
        return { ...project, bullets: updatedBullets };
      }
      return project;
    });
    
    updateData({ ...data, projects: updatedProjects });
  };

  const addBullet = (id: string) => {
    const project = data.projects.find((p) => p.id === id);
    if (!project || project.bullets.length >= 3) return;
    
    const updatedProjects = data.projects.map((project) => {
      if (project.id === id) {
        return { ...project, bullets: [...project.bullets, ""] };
      }
      return project;
    });
    
    updateData({ ...data, projects: updatedProjects });
  };

  const removeBullet = (id: string, index: number) => {
    const updatedProjects = data.projects.map((project) => {
      if (project.id === id) {
        const updatedBullets = [...project.bullets];
        updatedBullets.splice(index, 1);
        return { ...project, bullets: updatedBullets };
      }
      return project;
    });
    
    updateData({ ...data, projects: updatedProjects });
  };

  const addProject = () => {
    if (data.projects.length >= 2) return;
    
    const newProject = {
      id: `proj-${Date.now()}`,
      name: "",
      description: "",
      bullets: [""],
    };
    
    updateData({ ...data, projects: [...data.projects, newProject] });
  };

  const removeProject = (id: string) => {
    updateData({
      ...data,
      projects: data.projects.filter((project) => project.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="form-section-title text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Projects
        </h2>
        <p className="form-section-subtitle text-slate-500">
          Showcase your best work and personal projects
        </p>
      </div>
      
      <div className="space-y-6">
        {data.projects.map((project, index) => (
          <Card 
            key={project.id} 
            className="animate-scale-in border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="form-item-title text-lg font-medium">
                      Project {index + 1}
                    </h3>
                    {project.name && 
                      <p className="text-sm text-slate-500">{project.name}</p>
                    }
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeProject(project.id)}
                  disabled={data.projects.length <= 0}
                  className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor={`name-${project.id}`} className="font-medium text-slate-700 flex items-center">
                    <Blocks className="h-4 w-4 mr-2 text-primary" /> Project Name
                  </Label>
                  <div className="relative">
                    <Input
                      id={`name-${project.id}`}
                      value={project.name}
                      onChange={(e) => handleChange(project.id, "name", e.target.value)}
                      maxLength={50}
                      placeholder="E-commerce Platform"
                      className="form-input pl-9 border-slate-200 shadow-sm"
                    />
                    <Code className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${project.id}`} className="font-medium text-slate-700 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-primary" /> Brief Description
                  </Label>
                  <div className="relative">
                    <Input
                      id={`description-${project.id}`}
                      value={project.description}
                      onChange={(e) => handleChange(project.id, "description", e.target.value)}
                      maxLength={50}
                      placeholder="A full-stack e-commerce application"
                      className="form-input pl-9 border-slate-200 shadow-sm"
                    />
                    <Sparkles className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-3">
                <Label className="font-medium text-slate-700 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-primary" /> Key Features & Highlights
                </Label>
                
                <div className="space-y-4">
                  {project.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex gap-3 group relative animate-fade-in">
                      <div className="flex-1">
                        <div className="relative">
                          <Textarea
                            value={bullet}
                            onChange={(e) => handleBulletChange(project.id, idx, e.target.value)}
                            placeholder="Describe a key feature or achievement of this project"
                            maxLength={100}
                            className="form-input resize-none min-h-[70px] pr-10 border-slate-200 focus:border-primary/50 shadow-sm"
                          />
                          <Badge 
                            variant="outline" 
                            className="absolute right-2 top-2 text-xs bg-slate-50 text-slate-500 border-slate-200"
                          >
                            {bullet.length}/100
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeBullet(project.id, idx)}
                        disabled={project.bullets.length <= 1}
                        className="h-9 w-9 mt-1 self-start opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {project.bullets.length < 3 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 border-dashed border-slate-300 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    onClick={() => addBullet(project.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Feature
                  </Button>
                )}
                
                <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full transition-all duration-300"
                    style={{ width: `${(project.bullets.length / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.projects.length < 2 && (
        <Card className="border border-dashed border-slate-300 bg-slate-50/50 shadow-sm hover:bg-slate-50 transition-colors">
          <CardContent className="flex items-center justify-center p-10">
            <Button
              variant="outline"
              className="border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-colors"
              onClick={addProject}
            >
              <Plus className="h-5 w-5 mr-2 text-primary" /> Add New Project
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="form-buttons mt-8 pt-4 border-t border-slate-200">
        <Button variant="outline" onClick={onBack} className="form-button-back">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1.5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" 
              clipRule="evenodd"
            />
          </svg>
          Back
        </Button>
        <Button onClick={onNext} className="form-button-next">
          Continue to Final Step
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1.5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ProjectsForm;

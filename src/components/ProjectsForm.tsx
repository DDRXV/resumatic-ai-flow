
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, X } from "lucide-react";
import { ResumeData } from "./ResumeSections";

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
    if (!project || project.bullets.length >= 3) return; // Limit to 3 bullets
    
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
    if (data.projects.length >= 2) return; // Limit to 2 projects
    
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
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Projects</h2>
      
      {data.projects.map((project, index) => (
        <div key={project.id} className="p-4 border rounded-md space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Project #{index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeProject(project.id)}
              disabled={data.projects.length <= 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor={`name-${project.id}`}>Project Name</Label>
            <Input
              id={`name-${project.id}`}
              value={project.name}
              onChange={(e) => handleChange(project.id, "name", e.target.value)}
              maxLength={50}
              placeholder="E-commerce Platform"
            />
          </div>

          <div>
            <Label htmlFor={`description-${project.id}`}>Brief Description</Label>
            <Input
              id={`description-${project.id}`}
              value={project.description}
              onChange={(e) => handleChange(project.id, "description", e.target.value)}
              maxLength={50}
              placeholder="A full-stack e-commerce application"
            />
          </div>

          <div>
            <Label>Key Features & Highlights</Label>
            {project.bullets.map((bullet, idx) => (
              <div key={idx} className="flex space-x-2 mt-2">
                <Textarea
                  value={bullet}
                  onChange={(e) => handleBulletChange(project.id, idx, e.target.value)}
                  placeholder="Describe a key feature or accomplishment of this project"
                  maxLength={100}
                  className="min-h-[60px]"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBullet(project.id, idx)}
                  disabled={project.bullets.length <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {project.bullets.length < 3 && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addBullet(project.id)}
              >
                <Plus className="h-3 w-3 mr-1" /> Add Bullet
              </Button>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {project.bullets.length}/3 bullet points
            </p>
          </div>
        </div>
      ))}

      {data.projects.length < 2 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={addProject}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

export default ProjectsForm;

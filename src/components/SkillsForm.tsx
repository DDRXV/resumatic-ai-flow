
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Zap } from "lucide-react";
import { ResumeData } from "./ResumeSections";

interface SkillsFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
  onNext: () => void;
  onBack: () => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (!newSkill.trim() || data.skills.length >= 10) return;
    
    const skillExists = data.skills.some(
      (skill) => skill.name.toLowerCase() === newSkill.toLowerCase()
    );
    
    if (skillExists) {
      setNewSkill("");
      return;
    }
    
    const newSkillObj = {
      id: `skill-${Date.now()}`,
      name: newSkill.trim(),
    };
    
    updateData({ ...data, skills: [...data.skills, newSkillObj] });
    setNewSkill("");
  };

  const removeSkill = (id: string) => {
    updateData({
      ...data,
      skills: data.skills.filter((skill) => skill.id !== id),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="form-section-title bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Skills
        </h2>
        <p className="form-section-subtitle">
          Add up to 10 skills that highlight your expertise
        </p>
      </div>

      <div className="form-field-group">
        <div>
          <Label htmlFor="newSkill" className="form-label flex items-center">
            <Zap className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Add Skill
          </Label>
          <div className="flex space-x-2">
            <Input
              id="newSkill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={30}
              placeholder="JavaScript, React, Project Management, etc."
              disabled={data.skills.length >= 10}
              className="form-input shadow-sm"
            />
            <Button 
              onClick={addSkill} 
              disabled={!newSkill.trim() || data.skills.length >= 10}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1.5 flex items-center justify-between">
            <span>Press Enter to add</span>
            <span>{data.skills.length}/10 skills added</span>
          </p>
        </div>

        <div className="mt-5">
          <Label className="form-label flex items-center">
            <Zap className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Your Skills
          </Label>
          <div className="flex flex-wrap gap-2 mt-2 min-h-[100px] p-3 border rounded-lg bg-gray-50">
            {data.skills.length === 0 ? (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-sm text-gray-400 italic">No skills added yet</p>
              </div>
            ) : (
              data.skills.map((skill) => (
                <Badge 
                  key={skill.id} 
                  variant="secondary" 
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {skill.name}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
                    onClick={() => removeSkill(skill.id)}
                  />
                </Badge>
              ))
            )}
          </div>
          <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
              style={{ width: `${(data.skills.length / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="form-buttons">
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
          Continue to Projects
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

export default SkillsForm;

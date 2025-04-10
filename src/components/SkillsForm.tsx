
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
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
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Skills</h2>
      <p className="text-sm text-gray-500">
        Add up to 10 skills that highlight your expertise
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="newSkill">Add Skill</Label>
          <div className="flex space-x-2">
            <Input
              id="newSkill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={30}
              placeholder="JavaScript, React, Project Management, etc."
              disabled={data.skills.length >= 10}
            />
            <Button 
              onClick={addSkill} 
              disabled={!newSkill.trim() || data.skills.length >= 10}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <Label>Your Skills ({data.skills.length}/10)</Label>
          <div className="flex flex-wrap gap-2 mt-2 min-h-[50px] p-2 border rounded-md">
            {data.skills.map((skill) => (
              <Badge key={skill.id} variant="secondary" className="flex items-center gap-1">
                {skill.name}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSkill(skill.id)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

export default SkillsForm;

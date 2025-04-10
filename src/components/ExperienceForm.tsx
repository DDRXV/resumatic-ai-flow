
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, X, Briefcase, Calendar, MapPin, Award } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ResumeData } from "./ResumeSections";
import { DatePicker } from "@/components/ui/date-picker";
import { Badge } from "@/components/ui/badge";

interface ExperienceFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const handleChange = (id: string, field: string, value: any) => {
    const updatedExperience = data.experience.map((exp) => {
      if (exp.id === id) {
        const updatedExp = { ...exp, [field]: value };
        if (field === "current" && value === true) {
          updatedExp.endDate = null;
        }
        return updatedExp;
      }
      return exp;
    });
    
    updateData({ ...data, experience: updatedExperience });
  };

  const handleBulletChange = (id: string, index: number, value: string) => {
    const updatedExperience = data.experience.map((exp) => {
      if (exp.id === id) {
        const updatedBullets = [...exp.bullets];
        updatedBullets[index] = value;
        return { ...exp, bullets: updatedBullets };
      }
      return exp;
    });
    
    updateData({ ...data, experience: updatedExperience });
  };

  const addBullet = (id: string) => {
    const exp = data.experience.find((e) => e.id === id);
    if (!exp || exp.bullets.length >= 5) return;
    
    const updatedExperience = data.experience.map((exp) => {
      if (exp.id === id) {
        return { ...exp, bullets: [...exp.bullets, ""] };
      }
      return exp;
    });
    
    updateData({ ...data, experience: updatedExperience });
  };

  const removeBullet = (id: string, index: number) => {
    const updatedExperience = data.experience.map((exp) => {
      if (exp.id === id) {
        const updatedBullets = [...exp.bullets];
        updatedBullets.splice(index, 1);
        return { ...exp, bullets: updatedBullets };
      }
      return exp;
    });
    
    updateData({ ...data, experience: updatedExperience });
  };

  const addExperience = () => {
    if (data.experience.length >= 3) return;
    
    const newExperience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: null,
      endDate: null,
      current: false,
      bullets: [""],
    };
    
    updateData({ ...data, experience: [...data.experience, newExperience] });
  };

  const removeExperience = (id: string) => {
    updateData({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="form-section-title bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Work Experience
        </h2>
        <p className="form-section-subtitle">
          Add your relevant work experience
        </p>
      </div>
      
      {data.experience.map((exp, index) => (
        <div key={exp.id} className="form-item-container animate-fade-in">
          <div className="form-item-header">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <h3 className="form-item-title">
                Position {index + 1}
                {exp.position && <span className="ml-1 text-gray-400">• {exp.position}</span>}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeExperience(exp.id)}
              disabled={data.experience.length <= 1}
              className="h-8 w-8 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="form-field-group">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`position-${exp.id}`} className="form-label">Position</Label>
                <div className="relative">
                  <Input
                    id={`position-${exp.id}`}
                    value={exp.position}
                    onChange={(e) => handleChange(exp.id, "position", e.target.value)}
                    maxLength={50}
                    placeholder="Software Engineer"
                    className="form-input pl-9"
                  />
                  <Award className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              <div>
                <Label htmlFor={`company-${exp.id}`} className="form-label">Company</Label>
                <div className="relative">
                  <Input
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) => handleChange(exp.id, "company", e.target.value)}
                    maxLength={50}
                    placeholder="Tech Solutions Inc."
                    className="form-input pl-9"
                  />
                  <Briefcase className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor={`location-${exp.id}`} className="form-label">Location</Label>
              <div className="relative">
                <Input
                  id={`location-${exp.id}`}
                  value={exp.location}
                  onChange={(e) => handleChange(exp.id, "location", e.target.value)}
                  maxLength={50}
                  placeholder="New York, NY"
                  className="form-input pl-9"
                />
                <MapPin className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div className="mt-2 mb-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) =>
                    handleChange(exp.id, "current", checked === true)
                  }
                />
                <Label
                  htmlFor={`current-${exp.id}`}
                  className="cursor-pointer text-sm"
                >
                  I currently work here
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <Label className="form-label flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" /> Start Date
                </Label>
                <DatePicker
                  date={exp.startDate}
                  onDateChange={(date) => handleChange(exp.id, "startDate", date)}
                  placeholder="Select start date"
                  monthYearOnly={true}
                />
              </div>

              <div>
                <Label className="form-label flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" /> End Date
                </Label>
                <DatePicker
                  date={exp.endDate}
                  onDateChange={(date) => handleChange(exp.id, "endDate", date)}
                  placeholder="Select end date"
                  monthYearOnly={true}
                  disabled={exp.current}
                />
              </div>
            </div>

            <div className="mt-4">
              <Label className="form-label flex items-center">
                <Award className="h-3.5 w-3.5 mr-1.5 text-primary" /> 
                Responsibilities & Achievements
              </Label>
              
              <div className="mt-2 space-y-3">
                {exp.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex gap-2 group relative animate-fade-in">
                    <div className="flex-1">
                      <div className="relative">
                        <Textarea
                          value={bullet}
                          onChange={(e) => handleBulletChange(exp.id, idx, e.target.value)}
                          placeholder="Describe a key responsibility or achievement"
                          maxLength={100}
                          className="form-input resize-none min-h-[60px] pr-8 border-slate-200 focus:border-primary/50 shadow-sm"
                        />
                        <Badge 
                          variant="outline" 
                          className="absolute right-2 top-2 text-xs bg-slate-50 text-slate-400 border-slate-200"
                        >
                          {bullet.length}/100
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBullet(exp.id, idx)}
                      disabled={exp.bullets.length <= 1}
                      className="h-8 w-8 mt-1 self-start opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              {exp.bullets.length < 5 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  onClick={() => addBullet(exp.id)}
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Achievement
                </Button>
              )}
              
              <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                  style={{ width: `${(exp.bullets.length / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {data.experience.length < 3 && (
        <Button
          variant="outline"
          className="w-full border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors"
          onClick={addExperience}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Experience
        </Button>
      )}

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
          Continue to Skills
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

export default ExperienceForm;

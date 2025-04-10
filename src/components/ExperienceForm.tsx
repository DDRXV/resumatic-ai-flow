
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, X, Briefcase, Calendar, MapPin, Award, GraduationCap } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ResumeData } from "./ResumeSections";
import { DatePicker } from "@/components/ui/date-picker";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="form-section-title text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Work Experience
        </h2>
        <p className="form-section-subtitle text-slate-500">
          Add your relevant work experience
        </p>
      </div>
      
      <div className="space-y-6">
        {data.experience.map((exp, index) => (
          <Card 
            key={exp.id} 
            className="animate-scale-in border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="form-item-title text-lg font-medium">
                      Position {index + 1}
                    </h3>
                    {exp.position && 
                      <p className="text-sm text-slate-500">{exp.position}</p>
                    }
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExperience(exp.id)}
                  disabled={data.experience.length <= 1}
                  className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor={`position-${exp.id}`} className="font-medium text-slate-700 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-primary" /> Position
                  </Label>
                  <div className="relative">
                    <Input
                      id={`position-${exp.id}`}
                      value={exp.position}
                      onChange={(e) => handleChange(exp.id, "position", e.target.value)}
                      maxLength={50}
                      placeholder="Software Engineer"
                      className="form-input pl-9 border-slate-200 shadow-sm"
                    />
                    <Award className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`company-${exp.id}`} className="font-medium text-slate-700 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-primary" /> Company
                  </Label>
                  <div className="relative">
                    <Input
                      id={`company-${exp.id}`}
                      value={exp.company}
                      onChange={(e) => handleChange(exp.id, "company", e.target.value)}
                      maxLength={50}
                      placeholder="Tech Solutions Inc."
                      className="form-input pl-9 border-slate-200 shadow-sm"
                    />
                    <Briefcase className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`location-${exp.id}`} className="font-medium text-slate-700 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" /> Location
                </Label>
                <div className="relative">
                  <Input
                    id={`location-${exp.id}`}
                    value={exp.location}
                    onChange={(e) => handleChange(exp.id, "location", e.target.value)}
                    maxLength={50}
                    placeholder="New York, NY"
                    className="form-input pl-9 border-slate-200 shadow-sm"
                  />
                  <MapPin className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              <Separator className="my-2" />

              <div className="space-y-6">
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
                    className="cursor-pointer text-sm text-slate-700"
                  >
                    I currently work here
                  </Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-medium text-slate-700 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" /> Start Date
                    </Label>
                    <DatePicker
                      date={exp.startDate}
                      onDateChange={(date) => handleChange(exp.id, "startDate", date)}
                      placeholder="Select start date"
                      monthYearOnly={true}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium text-slate-700 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" /> End Date
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
              </div>

              <Separator className="my-1" />
              
              <div className="space-y-4 pt-2">
                <Label className="font-medium text-slate-700 flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2 text-primary" /> 
                  Responsibilities & Achievements
                </Label>
                
                <div className="space-y-4">
                  {exp.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex gap-3 group relative animate-fade-in">
                      <div className="flex-1">
                        <div className="relative">
                          <Textarea
                            value={bullet}
                            onChange={(e) => handleBulletChange(exp.id, idx, e.target.value)}
                            placeholder="Describe a key responsibility or achievement"
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
                        onClick={() => removeBullet(exp.id, idx)}
                        disabled={exp.bullets.length <= 1}
                        className="h-9 w-9 mt-1 self-start opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 hover:bg-red-50"
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
                    className="mt-2 border-dashed border-slate-300 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    onClick={() => addBullet(exp.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Achievement
                  </Button>
                )}
                
                <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full transition-all duration-300"
                    style={{ width: `${(exp.bullets.length / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.experience.length < 3 && (
        <Card className="border border-dashed border-slate-300 bg-slate-50/50 shadow-sm hover:bg-slate-50 transition-colors">
          <CardContent className="flex items-center justify-center p-10">
            <Button
              variant="outline"
              className="border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-colors"
              onClick={addExperience}
            >
              <Plus className="h-5 w-5 mr-2 text-primary" /> Add New Experience
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

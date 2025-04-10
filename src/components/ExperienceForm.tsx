
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plus, Trash2, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { ResumeData } from "./ResumeSections";

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
        // If setting current to true, clear the end date
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
    if (!exp || exp.bullets.length >= 5) return; // Limit to 5 bullets
    
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
    if (data.experience.length >= 3) return; // Limit to 3 experience entries
    
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
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Experience</h2>
      
      {data.experience.map((exp, index) => (
        <div key={exp.id} className="p-4 border rounded-md space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Experience #{index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeExperience(exp.id)}
              disabled={data.experience.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor={`position-${exp.id}`}>Position</Label>
            <Input
              id={`position-${exp.id}`}
              value={exp.position}
              onChange={(e) => handleChange(exp.id, "position", e.target.value)}
              maxLength={50}
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <Label htmlFor={`company-${exp.id}`}>Company</Label>
            <Input
              id={`company-${exp.id}`}
              value={exp.company}
              onChange={(e) => handleChange(exp.id, "company", e.target.value)}
              maxLength={50}
              placeholder="Tech Solutions Inc."
            />
          </div>

          <div>
            <Label htmlFor={`location-${exp.id}`}>Location</Label>
            <Input
              id={`location-${exp.id}`}
              value={exp.location}
              onChange={(e) => handleChange(exp.id, "location", e.target.value)}
              maxLength={50}
              placeholder="New York, NY"
            />
          </div>

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
              className="cursor-pointer"
            >
              I currently work here
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !exp.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {exp.startDate ? (
                      format(exp.startDate, "MMM yyyy")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={exp.startDate || undefined}
                    onSelect={(date) => handleChange(exp.id, "startDate", date)}
                    captionLayout="dropdown-buttons"
                    fromYear={1990}
                    toYear={2030}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !exp.endDate && "text-muted-foreground"
                    )}
                    disabled={exp.current}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {exp.endDate ? (
                      format(exp.endDate, "MMM yyyy")
                    ) : (
                      <span>{exp.current ? "Present" : "Select date"}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={exp.endDate || undefined}
                    onSelect={(date) => handleChange(exp.id, "endDate", date)}
                    captionLayout="dropdown-buttons"
                    fromYear={1990}
                    toYear={2030}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label>Responsibilities & Achievements</Label>
            {exp.bullets.map((bullet, idx) => (
              <div key={idx} className="flex space-x-2 mt-2">
                <Textarea
                  value={bullet}
                  onChange={(e) => handleBulletChange(exp.id, idx, e.target.value)}
                  placeholder="Describe your responsibilities and achievements"
                  maxLength={100}
                  className="min-h-[60px]"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBullet(exp.id, idx)}
                  disabled={exp.bullets.length <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {exp.bullets.length < 5 && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addBullet(exp.id)}
              >
                <Plus className="h-3 w-3 mr-1" /> Add Bullet
              </Button>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {exp.bullets.length}/5 bullet points
            </p>
          </div>
        </div>
      ))}

      {data.experience.length < 3 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={addExperience}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Experience
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

export default ExperienceForm;

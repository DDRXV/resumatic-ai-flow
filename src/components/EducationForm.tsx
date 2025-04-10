
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ResumeData } from "./ResumeSections";

interface EducationFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
  onNext: () => void;
  onBack: () => void;
}

const EducationForm: React.FC<EducationFormProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const handleChange = (id: string, field: string, value: string | Date | null) => {
    const updatedEducation = data.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateData({ ...data, education: updatedEducation });
  };

  const addEducation = () => {
    if (data.education.length >= 3) return; // Limit to 3 education entries
    const newEducation = {
      id: `edu-${Date.now()}`,
      school: "",
      degree: "",
      location: "",
      startDate: null,
      endDate: null,
    };
    updateData({ ...data, education: [...data.education, newEducation] });
  };

  const removeEducation = (id: string) => {
    updateData({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Education</h2>
      
      {data.education.map((edu, index) => (
        <div key={edu.id} className="p-4 border rounded-md space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Education #{index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeEducation(edu.id)}
              disabled={data.education.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor={`school-${edu.id}`}>School/University</Label>
            <Input
              id={`school-${edu.id}`}
              value={edu.school}
              onChange={(e) => handleChange(edu.id, "school", e.target.value)}
              maxLength={100}
              placeholder="University of Technology"
            />
          </div>

          <div>
            <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
            <Input
              id={`degree-${edu.id}`}
              value={edu.degree}
              onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
              maxLength={100}
              placeholder="Bachelor of Science in Computer Science"
            />
          </div>

          <div>
            <Label htmlFor={`location-${edu.id}`}>Location</Label>
            <Input
              id={`location-${edu.id}`}
              value={edu.location}
              onChange={(e) => handleChange(edu.id, "location", e.target.value)}
              maxLength={50}
              placeholder="New York, NY"
            />
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
                      !edu.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {edu.startDate ? (
                      format(edu.startDate, "MMM yyyy")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={edu.startDate || undefined}
                    onSelect={(date) => handleChange(edu.id, "startDate", date)}
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
                      !edu.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {edu.endDate ? (
                      format(edu.endDate, "MMM yyyy")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={edu.endDate || undefined}
                    onSelect={(date) => handleChange(edu.id, "endDate", date)}
                    captionLayout="dropdown-buttons"
                    fromYear={1990}
                    toYear={2030}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      ))}

      {data.education.length < 3 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={addEducation}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Education
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

export default EducationForm;

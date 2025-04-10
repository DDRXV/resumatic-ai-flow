
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData } from "./ResumeSections";
import { DatePicker } from "@/components/ui/date-picker";

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
        <div key={edu.id} className="p-4 border rounded-md space-y-3 bg-background/50 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Education #{index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeEducation(edu.id)}
              disabled={data.education.length <= 1}
              className="h-8 w-8"
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
              className="bg-background/50 border-input/50"
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
              className="bg-background/50 border-input/50"
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
              className="bg-background/50 border-input/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <DatePicker
                date={edu.startDate}
                onDateChange={(date) => handleChange(edu.id, "startDate", date)}
                placeholder="Select start date"
                monthYearOnly={true}
              />
            </div>

            <div>
              <Label>End Date</Label>
              <DatePicker
                date={edu.endDate}
                onDateChange={(date) => handleChange(edu.id, "endDate", date)}
                placeholder="Select end date"
                monthYearOnly={true}
              />
            </div>
          </div>
        </div>
      ))}

      {data.education.length < 3 && (
        <Button
          variant="outline"
          className="w-full border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors"
          onClick={addEducation}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Education
        </Button>
      )}

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

export default EducationForm;

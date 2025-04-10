
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, GraduationCap, Calendar, MapPin, School } from "lucide-react";
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
    if (data.education.length >= 3) return;
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
    <div className="space-y-5">
      <div>
        <h2 className="form-section-title bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Education
        </h2>
        <p className="form-section-subtitle">
          Add your educational background
        </p>
      </div>
      
      {data.education.map((edu, index) => (
        <div key={edu.id} className="form-item-container animate-fade-in">
          <div className="form-item-header">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <GraduationCap className="h-4 w-4 text-primary" />
              </div>
              <h3 className="form-item-title">
                Education {index + 1}
                {edu.school && <span className="ml-1 text-gray-400">• {edu.school}</span>}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeEducation(edu.id)}
              disabled={data.education.length <= 1}
              className="h-8 w-8 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="form-field-group">
            <div>
              <Label htmlFor={`school-${edu.id}`} className="form-label flex items-center">
                <School className="h-3.5 w-3.5 mr-1.5 text-primary" /> School/University
              </Label>
              <div className="relative">
                <Input
                  id={`school-${edu.id}`}
                  value={edu.school}
                  onChange={(e) => handleChange(edu.id, "school", e.target.value)}
                  maxLength={100}
                  placeholder="University of Technology"
                  className="form-input pl-9"
                />
                <School className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div>
              <Label htmlFor={`degree-${edu.id}`} className="form-label flex items-center">
                <GraduationCap className="h-3.5 w-3.5 mr-1.5 text-primary" /> Degree
              </Label>
              <div className="relative">
                <Input
                  id={`degree-${edu.id}`}
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
                  maxLength={100}
                  placeholder="Bachelor of Science in Computer Science"
                  className="form-input pl-9"
                />
                <GraduationCap className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div>
              <Label htmlFor={`location-${edu.id}`} className="form-label flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary" /> Location
              </Label>
              <div className="relative">
                <Input
                  id={`location-${edu.id}`}
                  value={edu.location}
                  onChange={(e) => handleChange(edu.id, "location", e.target.value)}
                  maxLength={50}
                  placeholder="New York, NY"
                  className="form-input pl-9"
                />
                <MapPin className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <Label className="form-label flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" /> Start Date
                </Label>
                <DatePicker
                  date={edu.startDate}
                  onDateChange={(date) => handleChange(edu.id, "startDate", date)}
                  placeholder="Select start date"
                  monthYearOnly={true}
                />
              </div>

              <div>
                <Label className="form-label flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" /> End Date
                </Label>
                <DatePicker
                  date={edu.endDate}
                  onDateChange={(date) => handleChange(edu.id, "endDate", date)}
                  placeholder="Select end date"
                  monthYearOnly={true}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {data.education.length < 3 && (
        <Button
          variant="outline"
          className="w-full border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          onClick={addEducation}
        >
          <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" /> 
          Add Education
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
          Continue to Experience
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

export default EducationForm;

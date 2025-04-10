
import React from "react";
import { ResumeData } from "./ResumeSections";
import EducationItem from "./education/EducationItem";
import AddEducationButton from "./education/AddEducationButton";
import NavigationButtons from "./common/NavigationButtons";
import SectionHeader from "./common/SectionHeader";

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
    <div className="space-y-6">
      <SectionHeader 
        title="Education" 
        subtitle="Add your educational background" 
      />
      
      {data.education.map((edu, index) => (
        <EducationItem
          key={edu.id}
          id={edu.id}
          school={edu.school}
          degree={edu.degree}
          location={edu.location}
          startDate={edu.startDate}
          endDate={edu.endDate}
          index={index}
          onChange={handleChange}
          onRemove={removeEducation}
          disabled={data.education.length <= 1}
        />
      ))}

      {data.education.length < 3 && (
        <AddEducationButton 
          onClick={addEducation} 
          disabled={data.education.length >= 3} 
        />
      )}

      <NavigationButtons 
        onBack={onBack} 
        onNext={onNext} 
      />
    </div>
  );
};

export default EducationForm;

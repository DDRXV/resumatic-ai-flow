
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "./ResumeSections";
import { Switch } from "@/components/ui/switch";

interface PersonalInfoFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
  onNext: () => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  updateData,
  onNext,
}) => {
  const [showTitle, setShowTitle] = useState(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateData({
      ...data,
      personal: {
        ...data.personal,
        [name]: value,
      },
    });
  };

  const handleToggleTitle = (checked: boolean) => {
    setShowTitle(checked);
    // If we're hiding the title, we should empty it out to save space in the data structure
    if (!checked) {
      updateData({
        ...data,
        personal: {
          ...data.personal,
          title: "",
        },
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={data.personal.name}
            onChange={handleChange}
            maxLength={50}
            placeholder="John Doe"
            className="form-input"
          />
        </div>

        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="show-title" className="cursor-pointer">
            Show Professional Title
          </Label>
          <Switch 
            id="show-title" 
            checked={showTitle} 
            onCheckedChange={handleToggleTitle}
          />
        </div>

        {showTitle && (
          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              name="title"
              value={data.personal.title}
              onChange={handleChange}
              maxLength={50}
              placeholder="Software Engineer"
              className="form-input"
            />
          </div>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.personal.email}
            onChange={handleChange}
            maxLength={50}
            placeholder="john.doe@example.com"
            className="form-input"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={data.personal.phone}
            onChange={handleChange}
            maxLength={20}
            placeholder="(123) 456-7890"
            className="form-input"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={data.personal.location}
            onChange={handleChange}
            maxLength={50}
            placeholder="New York, NY"
            className="form-input"
          />
        </div>

        <div>
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            name="summary"
            value={data.personal.summary}
            onChange={handleChange}
            maxLength={300}
            placeholder="Brief summary of your career goals and expertise"
            rows={4}
            className="form-input resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            {data.personal.summary.length}/300 characters
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} className="bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500">
          Next
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;

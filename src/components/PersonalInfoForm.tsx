
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "./ResumeSections";

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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Personal Information</h2>
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
          />
        </div>

        <div>
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            name="title"
            value={data.personal.title}
            onChange={handleChange}
            maxLength={50}
            placeholder="Software Engineer"
          />
        </div>

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
          />
          <p className="text-xs text-gray-500 mt-1">
            {data.personal.summary.length}/300 characters
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;

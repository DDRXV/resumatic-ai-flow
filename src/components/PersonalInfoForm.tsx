
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "./ResumeSections";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, MapPin, FileText } from "lucide-react";

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
    <div className="space-y-5">
      <div>
        <h2 className="form-section-title bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Personal Information
        </h2>
        <p className="form-section-subtitle">
          Let's start with the basics about you
        </p>
      </div>
      
      <div className="form-item-container animate-fade-in">
        <div className="form-item-header mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <User className="h-4 w-4 text-primary" />
            </div>
            <h3 className="form-item-title">
              Basic Details
            </h3>
          </div>
        </div>

        <div className="form-field-group">
          <div className="relative">
            <Label htmlFor="name" className="form-label flex items-center">
              <User className="h-3.5 w-3.5 mr-1.5 text-primary" />
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              value={data.personal.name}
              onChange={handleChange}
              maxLength={50}
              placeholder="John Doe"
              className="form-input shadow-sm"
            />
          </div>

          <div className="flex items-center justify-between pt-2 pb-1">
            <Label htmlFor="show-title" className="form-label cursor-pointer flex items-center">
              <FileText className="h-3.5 w-3.5 mr-1.5 text-primary" />
              Show Professional Title
            </Label>
            <Switch 
              id="show-title" 
              checked={showTitle} 
              onCheckedChange={handleToggleTitle}
            />
          </div>

          {showTitle && (
            <div className="animate-fade-in">
              <Label htmlFor="title" className="form-label">
                Professional Title
              </Label>
              <Input
                id="title"
                name="title"
                value={data.personal.title}
                onChange={handleChange}
                maxLength={50}
                placeholder="Software Engineer"
                className="form-input shadow-sm"
              />
            </div>
          )}
        </div>
      </div>

      <div className="form-item-container animate-fade-in">
        <div className="form-item-header mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <h3 className="form-item-title">
              Contact Information
            </h3>
          </div>
        </div>

        <div className="form-field-group">
          <div className="relative">
            <Label htmlFor="email" className="form-label flex items-center">
              <Mail className="h-3.5 w-3.5 mr-1.5 text-primary" />
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={data.personal.email}
              onChange={handleChange}
              maxLength={50}
              placeholder="john.doe@example.com"
              className="form-input shadow-sm"
            />
          </div>

          <div className="relative">
            <Label htmlFor="phone" className="form-label flex items-center">
              <Phone className="h-3.5 w-3.5 mr-1.5 text-primary" />
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              value={data.personal.phone}
              onChange={handleChange}
              maxLength={20}
              placeholder="(123) 456-7890"
              className="form-input shadow-sm"
            />
          </div>

          <div className="relative">
            <Label htmlFor="location" className="form-label flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary" />
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={data.personal.location}
              onChange={handleChange}
              maxLength={50}
              placeholder="New York, NY"
              className="form-input shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="form-item-container animate-fade-in">
        <div className="form-item-header mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <h3 className="form-item-title">
              Professional Summary
            </h3>
          </div>
        </div>

        <div className="form-field-group">
          <div>
            <Label htmlFor="summary" className="form-label flex items-center">
              <FileText className="h-3.5 w-3.5 mr-1.5 text-primary" />
              Professional Summary
            </Label>
            <Textarea
              id="summary"
              name="summary"
              value={data.personal.summary}
              onChange={handleChange}
              maxLength={300}
              placeholder="Brief summary of your career goals and expertise"
              rows={4}
              className="form-input resize-none shadow-sm"
            />
            <div className="flex justify-between mt-1.5">
              <p className="text-xs text-gray-500">
                {data.personal.summary.length}/300 characters
              </p>
              <div className="h-1 w-24 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                  style={{ width: `${(data.personal.summary.length / 300) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-buttons">
        <div></div> {/* Empty div for flex spacing */}
        <Button 
          onClick={onNext} 
          className="form-button-next"
        >
          Continue to Education
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

export default PersonalInfoForm;

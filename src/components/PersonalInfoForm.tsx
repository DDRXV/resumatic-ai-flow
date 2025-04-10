
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "./ResumeSections";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, MapPin, FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="form-section-title text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Personal Information
        </h2>
        <p className="form-section-subtitle text-slate-500">
          Let's start with the basics about you
        </p>
      </div>
      
      <Card className="animate-scale-in border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <h3 className="form-item-title text-lg font-medium">
              Basic Details
            </h3>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium text-slate-700 flex items-center">
                <User className="h-4 w-4 mr-2 text-primary" /> Full Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  value={data.personal.name}
                  onChange={handleChange}
                  maxLength={50}
                  placeholder="John Doe"
                  className="form-input pl-9 border-slate-200 shadow-sm"
                />
                <User className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="show-title" className="font-medium text-slate-700 cursor-pointer flex items-center">
                <FileText className="h-4 w-4 mr-2 text-primary" /> Show Professional Title
              </Label>
              <Switch 
                id="show-title" 
                checked={showTitle} 
                onCheckedChange={handleToggleTitle}
              />
            </div>

            {showTitle && (
              <div className="animate-fade-in space-y-2">
                <Label htmlFor="title" className="font-medium text-slate-700 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" /> Professional Title
                </Label>
                <div className="relative">
                  <Input
                    id="title"
                    name="title"
                    value={data.personal.title}
                    onChange={handleChange}
                    maxLength={50}
                    placeholder="Software Engineer"
                    className="form-input pl-9 border-slate-200 shadow-sm"
                  />
                  <FileText className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="animate-scale-in border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h3 className="form-item-title text-lg font-medium">
              Contact Information
            </h3>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium text-slate-700 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" /> Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={data.personal.email}
                  onChange={handleChange}
                  maxLength={50}
                  placeholder="john.doe@example.com"
                  className="form-input pl-9 border-slate-200 shadow-sm"
                />
                <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-medium text-slate-700 flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" /> Phone
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  value={data.personal.phone}
                  onChange={handleChange}
                  maxLength={20}
                  placeholder="(123) 456-7890"
                  className="form-input pl-9 border-slate-200 shadow-sm"
                />
                <Phone className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="font-medium text-slate-700 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary" /> Location
              </Label>
              <div className="relative">
                <Input
                  id="location"
                  name="location"
                  value={data.personal.location}
                  onChange={handleChange}
                  maxLength={50}
                  placeholder="New York, NY"
                  className="form-input pl-9 border-slate-200 shadow-sm"
                />
                <MapPin className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-scale-in border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h3 className="form-item-title text-lg font-medium">
              Professional Summary
            </h3>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="summary" className="font-medium text-slate-700 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-primary" /> Professional Summary
            </Label>
            <div className="relative">
              <Textarea
                id="summary"
                name="summary"
                value={data.personal.summary}
                onChange={handleChange}
                maxLength={300}
                placeholder="Brief summary of your career goals and expertise"
                rows={4}
                className="form-input resize-none shadow-sm border-slate-200 pt-3 pl-9"
              />
              <FileText className="h-4 w-4 text-slate-400 absolute left-3 top-8" />
            </div>
            <div className="flex justify-between mt-1.5">
              <p className="text-xs text-gray-500">
                {data.personal.summary.length}/300 characters
              </p>
              <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                  style={{ width: `${(data.personal.summary.length / 300) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="form-buttons mt-8 pt-4 border-t border-slate-200">
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

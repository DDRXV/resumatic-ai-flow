
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "./ResumeSections";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, MapPin, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="mb-6">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Personal Information
        </h2>
        <p className="text-slate-500">
          Let's start with the basics about you
        </p>
      </div>
      
      {/* Basic Details Card */}
      <Card className="animate-scale-in border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Basic Details</h3>
          </div>

          <div className="space-y-5">
            {/* Name Input */}
            <div className="relative">
              <Input
                id="name"
                name="name"
                value={data.personal.name}
                onChange={handleChange}
                maxLength={50}
                placeholder="Full Name"
                className="pl-9 border-slate-200"
              />
              <User className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Professional Title Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-slate-700">Professional Title</span>
              </div>
              <Switch 
                id="show-title" 
                checked={showTitle} 
                onCheckedChange={handleToggleTitle}
              />
            </div>

            {/* Professional Title Input (conditional) */}
            {showTitle && (
              <div className="animate-fade-in relative">
                <Input
                  id="title"
                  name="title"
                  value={data.personal.title}
                  onChange={handleChange}
                  maxLength={50}
                  placeholder="Software Engineer"
                  className="pl-9 border-slate-200"
                />
                <FileText className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Card */}
      <Card className="animate-scale-in border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Contact Information</h3>
          </div>

          <div className="space-y-5">
            {/* Email Input */}
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={data.personal.email}
                onChange={handleChange}
                maxLength={50}
                placeholder="Email"
                className="pl-9 border-slate-200"
              />
              <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Phone Input */}
            <div className="relative">
              <Input
                id="phone"
                name="phone"
                value={data.personal.phone}
                onChange={handleChange}
                maxLength={20}
                placeholder="Phone"
                className="pl-9 border-slate-200"
              />
              <Phone className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Location Input */}
            <div className="relative">
              <Input
                id="location"
                name="location"
                value={data.personal.location}
                onChange={handleChange}
                maxLength={50}
                placeholder="Location"
                className="pl-9 border-slate-200"
              />
              <MapPin className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary Card */}
      <Card className="animate-scale-in border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Professional Summary</h3>
          </div>
          
          <div className="space-y-1">
            <div className="relative">
              <Textarea
                id="summary"
                name="summary"
                value={data.personal.summary}
                onChange={handleChange}
                maxLength={300}
                placeholder="Brief summary of your career goals and expertise"
                rows={4}
                className="resize-none pt-3 pl-9 border-slate-200"
              />
              <FileText className="h-4 w-4 text-slate-400 absolute left-3 top-8" />
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                {data.personal.summary.length}/300
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

      {/* Navigation Button */}
      <div className="flex justify-end mt-8 pt-4 border-t border-slate-200">
        <Button 
          onClick={onNext} 
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
        >
          Continue
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

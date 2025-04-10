
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Calendar, MapPin, School, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";

interface EducationItemProps {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: Date | null;
  endDate: Date | null;
  index: number;
  onChange: (id: string, field: string, value: string | Date | null) => void;
  onRemove: (id: string) => void;
  disabled: boolean;
}

const EducationItem: React.FC<EducationItemProps> = ({
  id,
  school,
  degree,
  location,
  startDate,
  endDate,
  index,
  onChange,
  onRemove,
  disabled
}) => {
  return (
    <Card className="animate-scale-in border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 mb-4">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-medium">
              {school ? school : `Education ${index + 1}`}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            disabled={disabled}
            className="h-8 w-8 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-5">
          <div className="relative">
            <Input
              id={`school-${id}`}
              value={school}
              onChange={(e) => onChange(id, "school", e.target.value)}
              maxLength={100}
              placeholder="University/School Name"
              className="pl-9 border-slate-200"
            />
            <School className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          <div className="relative">
            <Input
              id={`degree-${id}`}
              value={degree}
              onChange={(e) => onChange(id, "degree", e.target.value)}
              maxLength={100}
              placeholder="Degree/Certificate"
              className="pl-9 border-slate-200"
            />
            <GraduationCap className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          <div className="relative">
            <Input
              id={`location-${id}`}
              value={location}
              onChange={(e) => onChange(id, "location", e.target.value)}
              maxLength={50}
              placeholder="Location"
              className="pl-9 border-slate-200"
            />
            <MapPin className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2 text-sm text-slate-600">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" /> Start Date
              </div>
              <DatePicker
                date={startDate}
                onDateChange={(date) => onChange(id, "startDate", date)}
                placeholder="Select start date"
                monthYearOnly={true}
              />
            </div>

            <div>
              <div className="flex items-center mb-2 text-sm text-slate-600">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" /> End Date
              </div>
              <DatePicker
                date={endDate}
                onDateChange={(date) => onChange(id, "endDate", date)}
                placeholder="Select end date"
                monthYearOnly={true}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationItem;


import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  date: Date | null;
  onDateChange: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  monthYearOnly?: boolean;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Select date",
  disabled = false,
  className,
  monthYearOnly = false
}: DatePickerProps) {
  const [month, setMonth] = React.useState<number>(date ? date.getMonth() : new Date().getMonth());
  const [year, setYear] = React.useState<number>(date ? date.getFullYear() : new Date().getFullYear());

  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 50 }, (_, i) => currentYear - 30 + i);
  }, []);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleYearChange = (value: string) => {
    const newYear = parseInt(value);
    setYear(newYear);
    
    if (monthYearOnly) {
      const newDate = new Date(newYear, month, 1);
      onDateChange(newDate);
    }
  };

  const handleMonthChange = (value: string) => {
    const newMonth = parseInt(value);
    setMonth(newMonth);
    
    if (monthYearOnly) {
      const newDate = new Date(year, newMonth, 1);
      onDateChange(newDate);
    }
  };

  React.useEffect(() => {
    if (date) {
      setMonth(date.getMonth());
      setYear(date.getFullYear());
    }
  }, [date]);

  if (monthYearOnly) {
    return (
      <div className={cn("grid grid-cols-2 gap-2 w-full", className)}>
        <Select 
          value={month.toString()} 
          onValueChange={handleMonthChange}
          disabled={disabled}
        >
          <SelectTrigger className="h-10 bg-background/50 border-input/50 hover:bg-background/80 transition-colors">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-[280px] overflow-y-auto">
            {months.map((monthName, index) => (
              <SelectItem key={index} value={index.toString()}>
                {monthName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={year.toString()} 
          onValueChange={handleYearChange}
          disabled={disabled}
        >
          <SelectTrigger className="h-10 bg-background/50 border-input/50 hover:bg-background/80 transition-colors">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-[280px] overflow-y-auto">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal bg-background/50 border-input/50 hover:bg-background/80",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 border-b flex gap-2">
          <Select value={month.toString()} onValueChange={handleMonthChange}>
            <SelectTrigger className="h-8 w-[120px] text-sm">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent position="popper" className="max-h-[280px] overflow-y-auto">
              {months.map((monthName, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {monthName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={year.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="h-8 w-[100px] text-sm">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent position="popper" className="max-h-[280px] overflow-y-auto">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={onDateChange}
          month={new Date(year, month)}
          onMonthChange={(date) => {
            setMonth(date.getMonth());
            setYear(date.getFullYear());
          }}
          className="p-3 pointer-events-auto rounded-lg"
          classNames={{
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
            day_today: "bg-accent text-accent-foreground rounded-full",
            day: "rounded-full hover:bg-muted transition-colors h-9 w-9"
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

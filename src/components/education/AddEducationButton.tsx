
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddEducationButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const AddEducationButton: React.FC<AddEducationButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button
      variant="outline"
      className="w-full border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors group"
      onClick={onClick}
      disabled={disabled}
    >
      <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" /> 
      Add Education
    </Button>
  );
};

export default AddEducationButton;


import React from "react";
import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  showBack?: boolean;
  backText?: string;
  nextText?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  showBack = true,
  backText = "Back",
  nextText = "Continue",
}) => {
  return (
    <div className="flex justify-between mt-8 pt-4 border-t border-slate-200">
      {showBack && (
        <Button variant="outline" onClick={onBack} className="flex items-center">
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
          {backText}
        </Button>
      )}
      <Button 
        onClick={onNext} 
        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
      >
        {nextText}
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
  );
};

export default NavigationButtons;

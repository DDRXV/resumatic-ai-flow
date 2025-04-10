
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ResumeData } from "./ResumeSections";
import { Check, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf"; // Updated import syntax

interface FinishFormProps {
  data: ResumeData;
  onBack: () => void;
}

const FinishForm: React.FC<FinishFormProps> = ({ data, onBack }) => {
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement | null>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      toast({
        title: "Preparing your resume...",
        description: "This may take a moment.",
      });

      const element = document.querySelector(".resume-paper") as HTMLElement;
      if (!element) throw new Error("Resume element not found");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "letter",
      });

      const imgWidth = 612; // Letter width in points (8.5 inches)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${data.personal.name.replace(/\s+/g, "_")}_Resume.pdf`);

      toast({
        title: "Resume downloaded!",
        description: "Your resume has been saved as a PDF.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error downloading resume",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center text-green-600 gap-2 mb-2">
        <Check className="h-5 w-5" />
        <h2 className="text-xl font-bold">Resume Complete!</h2>
      </div>
      
      <p className="text-sm text-gray-600">
        Your resume is ready to download. You can go back to make any final adjustments, or download your resume as a PDF.
      </p>
      
      <div className="space-y-3 my-6">
        <Button 
          className="w-full" 
          size="lg" 
          onClick={downloadPDF}
        >
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
        
        <Button
          variant="outline"
          className="w-full"
          size="lg"
          onClick={onBack}
        >
          <FileText className="mr-2 h-4 w-4" /> Edit Resume
        </Button>
      </div>
      
      <div className="mt-4">
        <div ref={resumeRef} className="hidden">
          {/* This div is for PDF generation only */}
        </div>
      </div>
    </div>
  );
};

export default FinishForm;

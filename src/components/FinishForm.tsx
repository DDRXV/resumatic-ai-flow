
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

      // Add padding for PDF generation to prevent margin cutoff
      element.style.padding = "20px";
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        // Add some margin space to prevent content cutoff
        windowWidth: element.scrollWidth + 40,
        windowHeight: element.scrollHeight + 40,
      });
      
      // Reset padding
      element.style.padding = "1.5rem";

      const imgData = canvas.toDataURL("image/png");
      
      // Use letter size with margins
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "letter",
      });

      // Calculate dimensions with margins
      const margin = 20; // 20pt margin
      const pdfWidth = pdf.internal.pageSize.getWidth() - (margin * 2);
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Add the image with margins
      pdf.addImage(imgData, "PNG", margin, margin, pdfWidth, pdfHeight);
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
    <div className="space-y-6">
      <div className="p-4 bg-green-50 border border-green-100 rounded-lg flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-full">
          <Check className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-green-800">Resume Complete!</h2>
          <p className="text-sm text-green-700">Your resume is ready to download</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-600">
        You can go back to make any final adjustments, or download your resume as a PDF.
      </p>
      
      <div className="space-y-3 my-6">
        <Button 
          className="w-full relative overflow-hidden group" 
          size="lg" 
          onClick={downloadPDF}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center justify-center">
            <Download className="mr-2 h-4 w-4 animate-float" /> Download PDF
          </span>
        </Button>
        
        <Button
          variant="outline"
          className="w-full border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-all"
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

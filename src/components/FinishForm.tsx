
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { ResumeData } from './ResumeSections';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface FinishFormProps {
  data: ResumeData;
  onBack: () => void;
}

const FinishForm: React.FC<FinishFormProps> = ({ data, onBack }) => {
  const downloadPDF = async () => {
    const resumeElement = document.querySelector('.resume-paper') as HTMLElement;
    
    if (resumeElement) {
      // Apply temporary styles for better PDF rendering
      const originalPadding = resumeElement.style.padding;
      resumeElement.style.padding = '15px';
      
      try {
        const canvas = await html2canvas(resumeElement, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        // Create PDF with correct dimensions (A4)
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        
        // Calculate the correct width and height
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Add the image with proper margins
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        // Save the PDF
        pdf.save(`${data.personal.name.replace(/\s+/g, '_')}_Resume.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('There was an error generating your PDF. Please try again.');
      } finally {
        // Restore original styles
        resumeElement.style.padding = originalPadding;
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <FileText className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Resume is Ready!</h2>
        <p className="text-gray-600 mb-6">
          You've successfully created your professional resume. Download it now or go back to make
          additional edits.
        </p>
      </div>

      <div className="p-6 bg-gray-50 rounded-xl">
        <h3 className="font-medium mb-3 text-primary">Resume Details</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{data.personal.name}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Experience Entries:</span>
            <span className="font-medium">{data.experience.length}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Education Entries:</span>
            <span className="font-medium">{data.education.length}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Skills:</span>
            <span className="font-medium">{data.skills.length}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Projects:</span>
            <span className="font-medium">{data.projects.length}</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button 
          onClick={onBack} 
          variant="outline"
          className="border-gray-300 hover:bg-gray-100"
        >
          Go Back & Edit
        </Button>
        <Button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default FinishForm;


import React from "react";
import { ResumeData, formatDateRange } from "../ResumeSections";

interface TemplateProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const SideBySideTemplate: React.FC<TemplateProps> = ({ data, hideProfessionalTitle = false }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto bg-white"> 
        <div className="flex flex-row">
          {/* Left sidebar */}
          <div className="w-1/3 bg-teal-800 text-white p-6">
            <div className="mb-8 flex flex-col items-center">
              {/* Profile Photo Area */}
              <div className="w-24 h-24 rounded-full bg-teal-700 mb-4 overflow-hidden flex items-center justify-center">
                {/* This is a placeholder for the profile photo */}
                <span className="text-4xl font-bold">{data.personal.name.charAt(0)}</span>
              </div>
              <h1 className="text-xl font-bold text-center">{data.personal.name}</h1>
              <p className="text-sm text-center uppercase">{data.personal.title}</p>
            </div>

            {/* Contact Details */}
            <div className="mb-6">
              <h2 className="text-sm uppercase font-bold border-b border-teal-600 pb-1 mb-3">Details</h2>
              <div className="text-xs space-y-2">
                <p>{data.personal.location}</p>
                <p>{data.personal.phone}</p>
                <p>{data.personal.email}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-sm uppercase font-bold border-b border-teal-600 pb-1 mb-3">Skills</h2>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="mb-1">
                    <p className="text-xs font-medium">{skill.name}</p>
                    <div className="w-full bg-teal-700 h-1.5 mt-1 rounded-full">
                      <div className="bg-teal-400 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="w-2/3 p-6">
            {/* Profile/Summary */}
            <div className="mb-6">
              <h2 className="text-sm uppercase font-bold text-teal-800 border-b border-teal-800 pb-1 mb-2">Profile</h2>
              <p className="text-xs text-gray-700">{data.personal.summary}</p>
            </div>

            {/* Employment History */}
            <div className="mb-6">
              <h2 className="text-sm uppercase font-bold text-teal-800 border-b border-teal-800 pb-1 mb-2">Employment History</h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-gray-800">{exp.position}</h3>
                    <span className="text-xs text-gray-600">
                      {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700">{exp.company}, {exp.location}</p>
                  <ul className="list-disc text-xs text-gray-700 ml-4 mt-1">
                    {exp.bullets.map((bullet, index) => (
                      <li key={index} className="mb-1">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-sm uppercase font-bold text-teal-800 border-b border-teal-800 pb-1 mb-2">Education</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-xs text-gray-700">{edu.school}, {edu.location}</p>
                  <p className="text-xs text-gray-600">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </p>
                </div>
              ))}
            </div>

            {/* References */}
            <div>
              <h2 className="text-sm uppercase font-bold text-teal-800 border-b border-teal-800 pb-1 mb-2">References</h2>
              <p className="text-xs text-gray-700">References available upon request</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBySideTemplate;

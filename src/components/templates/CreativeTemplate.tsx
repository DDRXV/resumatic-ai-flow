
import React from "react";
import { ResumeData, formatDateRange } from "../ResumeSections";

interface TemplateProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const CreativeTemplate: React.FC<TemplateProps> = ({ data, hideProfessionalTitle = false }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto bg-white">
        {/* Header with modern styling */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 p-8 text-white">
          <div className="flex items-center">
            {/* Photo circle placeholder */}
            <div className="w-24 h-24 bg-white rounded-full overflow-hidden flex items-center justify-center mr-6">
              <span className="text-3xl font-bold text-indigo-700">{data.personal.name.charAt(0)}</span>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">{data.personal.name}</h1>
              {!hideProfessionalTitle && (
                <p className="text-lg mt-1 font-light">{data.personal.title}</p>
              )}
              <div className="flex mt-3 space-x-4 text-xs">
                <div>{data.personal.email}</div>
                <div className="before:content-['•'] before:mr-4">{data.personal.phone}</div>
                <div className="before:content-['•'] before:mr-4">{data.personal.location}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content with creative layout */}
        <div className="p-8">
          {/* Profile with creative styling */}
          {data.personal.summary && (
            <div className="mb-8 relative">
              <h2 className="inline-block px-4 py-1 bg-indigo-100 text-indigo-800 text-sm uppercase font-bold rounded-full mb-4">Profile</h2>
              <div className="pl-6 border-l-2 border-indigo-300">
                <p className="text-sm text-gray-700 leading-relaxed">{data.personal.summary}</p>
              </div>
            </div>
          )}
          
          {/* Two column layout for main content */}
          <div className="flex flex-wrap -mx-4">
            {/* Left column (60%) */}
            <div className="w-[60%] px-4">
              {/* Experience with creative timeline */}
              {data.experience.length > 0 && (
                <div className="mb-8 relative">
                  <h2 className="inline-block px-4 py-1 bg-indigo-100 text-indigo-800 text-sm uppercase font-bold rounded-full mb-4">Experience</h2>
                  <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-indigo-200">
                    {data.experience.map((exp, index) => (
                      <div key={exp.id} className="mb-6 relative">
                        <div className="absolute w-4 h-4 rounded-full bg-indigo-500 left-[-8px] top-0 border-2 border-white"></div>
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                              {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                            </span>
                          </div>
                          <p className="text-xs text-indigo-600 font-medium mb-2">{exp.company}, {exp.location}</p>
                          <ul className="space-y-1">
                            {exp.bullets.map((bullet, idx) => (
                              <li key={idx} className="text-xs text-gray-700 flex">
                                <span className="text-indigo-400 mr-2">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Projects */}
              {data.projects.length > 0 && (
                <div className="mb-8 relative">
                  <h2 className="inline-block px-4 py-1 bg-indigo-100 text-indigo-800 text-sm uppercase font-bold rounded-full mb-4">Projects</h2>
                  <div className="space-y-4 pl-6 border-l-2 border-indigo-300">
                    {data.projects.map((project) => (
                      <div key={project.id} className="mb-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-1">{project.name}</h3>
                        <p className="text-xs text-gray-700 mb-2">{project.description}</p>
                        <ul className="space-y-1">
                          {project.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex">
                              <span className="text-indigo-400 mr-2">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right column (40%) */}
            <div className="w-[40%] px-4">
              {/* Education */}
              {data.education.length > 0 && (
                <div className="mb-8 bg-indigo-50 p-4 rounded-lg">
                  <h2 className="text-sm uppercase font-bold text-indigo-800 mb-4 border-b border-indigo-200 pb-2">Education</h2>
                  <div className="space-y-4">
                    {data.education.map((edu) => (
                      <div key={edu.id} className="mb-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-gray-800">{edu.degree}</h3>
                          <span className="text-xs text-indigo-600">
                            {formatDateRange(edu.startDate, edu.endDate)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700">{edu.school}</p>
                        <p className="text-xs text-gray-600">{edu.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Skills with creative display */}
              {data.skills.length > 0 && (
                <div className="mb-8 bg-indigo-50 p-4 rounded-lg">
                  <h2 className="text-sm uppercase font-bold text-indigo-800 mb-4 border-b border-indigo-200 pb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill) => (
                      <span key={skill.id} className="px-3 py-1 bg-white rounded-full text-xs text-indigo-700 shadow-sm border border-indigo-100">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* References */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h2 className="text-sm uppercase font-bold text-indigo-800 mb-4 border-b border-indigo-200 pb-2">References</h2>
                <p className="text-xs text-gray-700 italic">References available upon request</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;

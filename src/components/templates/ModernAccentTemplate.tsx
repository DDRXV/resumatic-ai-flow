
import React from "react";
import { ResumeData, formatDateRange } from "../ResumeSections";

interface TemplateProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const ModernAccentTemplate: React.FC<TemplateProps> = ({ data, hideProfessionalTitle = false }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto bg-white">
        {/* Header with colored background */}
        <div className="bg-blue-900 text-white p-8">
          <div className="flex items-center">
            {/* Photo area (placeholder circle) */}
            <div className="rounded-full bg-white h-20 w-20 flex items-center justify-center text-blue-900 text-2xl font-bold mr-6 overflow-hidden">
              {data.personal.name.charAt(0)}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">{data.personal.name}</h1>
              {!hideProfessionalTitle && (
                <p className="text-sm mt-1">{data.personal.title}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Main content with two columns */}
        <div className="flex p-8">
          {/* Left column for details and skills (35%) */}
          <div className="w-[35%] pr-8">
            {/* Details section */}
            <div className="mb-6">
              <h2 className="text-sm uppercase font-bold text-blue-900 border-b border-blue-200 pb-1 mb-3">Details</h2>
              <div className="space-y-3 text-xs">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>{data.personal.location}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>{data.personal.phone}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>{data.personal.email}</div>
                </div>
              </div>
            </div>

            {/* Skills with dot indicators */}
            {data.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm uppercase font-bold text-blue-900 border-b border-blue-200 pb-1 mb-3">Skills</h2>
                <div className="space-y-3">
                  {data.skills.map((skill) => (
                    <div key={skill.id}>
                      <p className="text-xs font-medium text-gray-800 mb-1">{skill.name}</p>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <div
                            key={dot}
                            className={`w-2 h-2 rounded-full ${
                              dot <= 4 ? "bg-blue-600" : "bg-gray-300"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div>
                <h2 className="text-sm uppercase font-bold text-blue-900 border-b border-blue-200 pb-1 mb-3">Education</h2>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-4 text-xs">
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.school}</p>
                    <p className="text-gray-600">{edu.location}</p>
                    <p className="text-gray-600 mt-1">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column for profile and experience (65%) */}
          <div className="w-[65%]">
            {/* Profile section */}
            {data.personal.summary && (
              <div className="mb-6">
                <h2 className="text-sm uppercase font-bold text-blue-900 border-b border-blue-200 pb-1 mb-3">Profile</h2>
                <p className="text-xs text-gray-700 leading-relaxed">{data.personal.summary}</p>
              </div>
            )}

            {/* Employment History */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm uppercase font-bold text-blue-900 border-b border-blue-200 pb-1 mb-3">Employment History</h2>
                {data.experience.map((exp) => (
                  <div key={exp.id} className="mb-5 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-100">
                    <div className="absolute w-3 h-3 rounded-full bg-blue-500 left-[-4px] top-1"></div>
                    
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-semibold text-gray-800">{exp.position}</h3>
                      <span className="text-xs text-gray-600">
                        {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 mb-2">{exp.company}, {exp.location}</p>
                    <ul className="list-disc text-xs text-gray-700 ml-4">
                      {exp.bullets.map((bullet, index) => (
                        <li key={index} className="mb-1">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <div>
                <h2 className="text-sm uppercase font-bold text-blue-900 border-b border-blue-200 pb-1 mb-3">Projects</h2>
                {data.projects.map((project) => (
                  <div key={project.id} className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">{project.name}</h3>
                    <p className="text-xs text-gray-700 mb-2">{project.description}</p>
                    <ul className="list-disc text-xs text-gray-700 ml-4">
                      {project.bullets.map((bullet, index) => (
                        <li key={index} className="mb-1">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernAccentTemplate;

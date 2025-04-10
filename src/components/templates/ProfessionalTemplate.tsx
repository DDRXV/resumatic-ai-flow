
import React from "react";
import { ResumeData, formatDateRange } from "../ResumeSections";
import { Circle } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({ data, hideProfessionalTitle = false }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto bg-white px-10 py-8">
        {/* Header with Name and Contact Info */}
        <div className="border-b-2 border-gray-300 pb-4 mb-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{data.personal.name}</h1>
              {!hideProfessionalTitle && (
                <p className="text-sm font-medium text-gray-600">{data.personal.title}</p>
              )}
            </div>
            <div className="text-right text-xs space-y-0.5">
              <p className="text-gray-700">{data.personal.email}</p>
              <p className="text-gray-700">{data.personal.phone}</p>
              <p className="text-gray-700">{data.personal.location}</p>
            </div>
          </div>
        </div>

        {/* Two column layout for the main content */}
        <div className="flex gap-8">
          {/* Left column (70%) */}
          <div className="w-[70%]">
            {/* Profile/Summary */}
            {data.personal.summary && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-2">Profile</h2>
                <p className="text-xs text-gray-700 leading-relaxed">{data.personal.summary}</p>
              </div>
            )}

            {/* Employment History */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-2">Employment History</h2>
                {data.experience.map((exp) => (
                  <div key={exp.id} className="mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-1">{exp.position}</h3>
                        <p className="text-xs text-gray-700">{exp.company}, {exp.location}</p>
                      </div>
                      <span className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-0.5 rounded-sm">
                        {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                      </span>
                    </div>
                    <ul className="list-none text-xs text-gray-700 mt-2 space-y-1.5">
                      {exp.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start">
                          <Circle className="h-1.5 w-1.5 text-gray-700 mt-1 mr-2 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-2">Projects</h2>
                {data.projects.map((project) => (
                  <div key={project.id} className="mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1.5">{project.name}</h3>
                    <p className="text-xs text-gray-700 mb-2">{project.description}</p>
                    <ul className="list-none text-xs text-gray-700 space-y-1.5">
                      {project.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start">
                          <Circle className="h-1.5 w-1.5 text-gray-700 mt-1 mr-2 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column (30%) */}
          <div className="w-[30%]">
            {/* Education */}
            {data.education.length > 0 && (
              <div className="mb-6 bg-gray-50 p-4 rounded-md">
                <h2 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-2">Education</h2>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-4 last:mb-0">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">{edu.degree}</h3>
                    <p className="text-xs text-gray-700 mb-0.5">{edu.school}</p>
                    <p className="text-xs text-gray-600 mb-1">{edu.location}</p>
                    <p className="text-xs text-gray-600 font-medium">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills with improved ratings */}
            {data.skills.length > 0 && (
              <div className="mb-6 bg-gray-50 p-4 rounded-md">
                <h2 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-2">Skills</h2>
                <div className="space-y-3">
                  {data.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between">
                        <p className="text-xs font-medium text-gray-800 mb-1">{skill.name}</p>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <div
                              key={rating}
                              className={`w-2 h-2 rounded-full ${
                                rating <= 4 ? "bg-gray-700" : "bg-gray-300"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                        <div className="bg-gray-700 h-1 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-2">References</h2>
              <p className="text-xs text-gray-700">Available upon request</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;

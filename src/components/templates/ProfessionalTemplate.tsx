
import React from "react";
import { ResumeData, formatDateRange } from "../ResumeSections";

interface TemplateProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({ data, hideProfessionalTitle = false }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto bg-white px-10 py-8">
        {/* Header with Name and Contact Info */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{data.personal.name}</h1>
              {!hideProfessionalTitle && (
                <p className="text-sm font-medium text-gray-600">{data.personal.title}</p>
              )}
            </div>
            <div className="text-right text-xs">
              <p className="mb-1">{data.personal.email}</p>
              <p className="mb-1">{data.personal.phone}</p>
              <p>{data.personal.location}</p>
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
                <h2 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-1">Profile</h2>
                <p className="text-xs text-gray-700 leading-relaxed">{data.personal.summary}</p>
              </div>
            )}

            {/* Employment History */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-1">Employment History</h2>
                {data.experience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">{exp.position}</h3>
                        <p className="text-xs text-gray-700">{exp.company}, {exp.location}</p>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">
                        {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                      </span>
                    </div>
                    <ul className="list-disc text-xs text-gray-700 ml-4 mt-2">
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
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-1">Projects</h2>
                {data.projects.map((project) => (
                  <div key={project.id} className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-800">{project.name}</h3>
                    <p className="text-xs text-gray-700 mb-1">{project.description}</p>
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

          {/* Right column (30%) */}
          <div className="w-[30%]">
            {/* Education */}
            {data.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-1">Education</h2>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-xs text-gray-700">{edu.school}</p>
                    <p className="text-xs text-gray-600 mb-1">{edu.location}</p>
                    <p className="text-xs text-gray-600">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills with ratings */}
            {data.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-1">Skills</h2>
                <div className="space-y-2">
                  {data.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between">
                        <p className="text-xs font-medium text-gray-800">{skill.name}</p>
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
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            <div>
              <h2 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-1">References</h2>
              <p className="text-xs text-gray-700">Available upon request</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;

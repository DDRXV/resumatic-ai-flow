
import React from "react";
import { ResumeData, formatDateRange } from "../ResumeSections";

interface TemplateProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const SimpleTemplate: React.FC<TemplateProps> = ({ data, hideProfessionalTitle = false }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto bg-white px-12 py-10">
        {/* Centered header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{data.personal.name}</h1>
          {!hideProfessionalTitle && (
            <p className="text-sm text-gray-700 mt-1">{data.personal.title}</p>
          )}
          <div className="text-xs text-gray-600 mt-2">
            <span>{data.personal.email}</span>
            <span className="mx-2">•</span>
            <span>{data.personal.phone}</span>
            <span className="mx-2">•</span>
            <span>{data.personal.location}</span>
          </div>
        </div>

        {/* Horizontal line */}
        <div className="border-t border-gray-300 mb-6"></div>

        {/* Summary */}
        {data.personal.summary && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-2">Professional Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{data.personal.summary}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-2">Skills</h2>
            <div className="flex flex-wrap">
              {data.skills.map((skill, index) => (
                <React.Fragment key={skill.id}>
                  <span className="text-xs text-gray-700">{skill.name}</span>
                  {index < data.skills.length - 1 && <span className="mx-2 text-gray-400">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-2">Work Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-800">{exp.position}</h3>
                  <span className="text-xs text-gray-600">
                    {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                  </span>
                </div>
                <p className="text-xs text-gray-700 mb-2">{exp.company}, {exp.location}</p>
                <ul className="list-disc ml-5 text-xs text-gray-700">
                  {exp.bullets.map((bullet, index) => (
                    <li key={index} className="mb-1">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-2">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-800">{edu.degree}</h3>
                  <span className="text-xs text-gray-600">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                <p className="text-xs text-gray-700">{edu.school}, {edu.location}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-2">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-3">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{project.name}</h3>
                <p className="text-xs text-gray-700 mb-1">{project.description}</p>
                <ul className="list-disc ml-5 text-xs text-gray-700">
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
  );
};

export default SimpleTemplate;

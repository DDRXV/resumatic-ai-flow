
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
        {/* Centered header with improved spacing */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{data.personal.name}</h1>
          {!hideProfessionalTitle && (
            <p className="text-sm text-gray-700 mb-2">{data.personal.title}</p>
          )}
          <div className="text-xs text-gray-600 flex justify-center items-center flex-wrap gap-2">
            <span>{data.personal.email}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            <span>{data.personal.phone}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            <span>{data.personal.location}</span>
          </div>
        </div>

        {/* Horizontal line */}
        <div className="border-t border-gray-300 mb-8"></div>

        {/* Summary with improved spacing */}
        {data.personal.summary && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3">Professional Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{data.personal.summary}</p>
          </div>
        )}

        {/* Skills with improved visual design */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span 
                  key={skill.id}
                  className="text-xs text-gray-700 px-3 py-1 bg-gray-100 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience with improved spacing and hierarchy */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3">Work Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">{exp.position}</h3>
                  <span className="text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded">
                    {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                  </span>
                </div>
                <p className="text-xs text-gray-700 mb-3">{exp.company}, {exp.location}</p>
                <ul className="list-disc ml-5 text-xs text-gray-700 space-y-1.5">
                  {exp.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education with improved spacing */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">{edu.degree}</h3>
                  <span className="text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                <p className="text-xs text-gray-700">{edu.school}, {edu.location}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects with improved spacing and structure */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-5 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">{project.name}</h3>
                <p className="text-xs text-gray-700 mb-2">{project.description}</p>
                <ul className="list-disc ml-5 text-xs text-gray-700 space-y-1.5">
                  {project.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
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

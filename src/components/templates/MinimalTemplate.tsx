
import React from "react";
import { ResumeData, formatDateRange } from "../ResumeSections";

interface TemplateProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const MinimalTemplate: React.FC<TemplateProps> = ({ data, hideProfessionalTitle = false }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto bg-white px-12 py-10">
        <div className="flex justify-between items-start mb-8">
          {/* Left side (Name and Title) */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{data.personal.name}</h1>
            {!hideProfessionalTitle && (
              <p className="text-sm text-gray-600">{data.personal.title}</p>
            )}
          </div>
          
          {/* Right side (Contact Details) */}
          <div className="text-right text-xs text-gray-600 space-y-0.5">
            <p>{data.personal.email}</p>
            <p>{data.personal.phone}</p>
            <p>{data.personal.location}</p>
          </div>
        </div>

        {/* Profile/Summary */}
        {data.personal.summary && (
          <div className="mb-8">
            <h2 className="text-sm uppercase font-bold text-gray-800 border-b border-gray-300 pb-1.5 mb-3">Profile</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{data.personal.summary}</p>
          </div>
        )}

        {/* Employment History */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase font-bold text-gray-800 border-b border-gray-300 pb-1.5 mb-3">Employment History</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                <div className="flex justify-between items-start mb-1.5">
                  <h3 className="text-sm font-semibold text-gray-800">{exp.position}</h3>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-sm">
                    {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                  </span>
                </div>
                <p className="text-xs text-gray-700 mb-2">{exp.company}, {exp.location}</p>
                <ul className="list-disc text-xs text-gray-700 ml-4 space-y-1">
                  {exp.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase font-bold text-gray-800 border-b border-gray-300 pb-1.5 mb-3">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start mb-1.5">
                  <h3 className="text-sm font-semibold text-gray-800">{edu.school}</h3>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-sm">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                <p className="text-xs text-gray-700 mb-0.5">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.location}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase font-bold text-gray-800 border-b border-gray-300 pb-1.5 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill.id} className="text-xs px-3 py-1.5 bg-gray-100 rounded-md text-gray-700">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-sm uppercase font-bold text-gray-800 border-b border-gray-300 pb-1.5 mb-3">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                <h3 className="text-sm font-semibold text-gray-800 mb-1.5">{project.name}</h3>
                <p className="text-xs text-gray-700 mb-2">{project.description}</p>
                <ul className="list-disc text-xs text-gray-700 ml-4 space-y-1">
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

export default MinimalTemplate;

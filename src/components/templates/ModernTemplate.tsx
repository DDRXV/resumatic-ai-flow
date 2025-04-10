
import React from "react";
import { ResumeData, formatDateRange } from "../ResumeSections";

interface TemplateProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data, hideProfessionalTitle = false }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md p-6 resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto bg-white px-12 py-6"> 
        {/* Header/Personal Info */}
        <div className="mb-1.5"> 
          <h1 className="text-xl font-bold text-slate-800">{data.personal.name}</h1>
          {!hideProfessionalTitle && (
            <p className="text-xs font-semibold text-blue-500">{data.personal.title}</p>
          )}
          <div className="text-xs mt-1 flex flex-wrap gap-x-2 text-slate-600">
            <span>{data.personal.email}</span>
            <span className="before:content-['•'] before:mx-1.5 before:text-blue-500">
              {data.personal.phone}
            </span>
            <span className="before:content-['•'] before:mx-1.5 before:text-blue-500">
              {data.personal.location}
            </span>
          </div>
        </div>

        {/* Summary - closer to contact info */}
        {data.personal.summary && (
          <div className="mt-1.5 mb-3">
            <h2 className="text-blue-500 font-bold uppercase text-sm border-b border-blue-500 pb-0.5 mb-1">Summary</h2>
            <p className="text-xs leading-tight text-slate-600">{data.personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-3">
            <h2 className="text-blue-500 font-bold uppercase text-sm border-b border-blue-500 pb-0.5 mb-1">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-2 last:mb-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-slate-700">{exp.position}</h3>
                  <span className="text-xs text-slate-600 font-medium">
                    {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-xs font-medium text-slate-600">{exp.company}</p>
                  <p className="text-xs text-slate-600 italic">{exp.location}</p>
                </div>
                <ul className="list-disc ml-3.5 mt-0.5 pl-1.5"> 
                  {exp.bullets.map((bullet, index) => (
                    <li key={index} className="text-xs leading-tight text-slate-600 mb-0.5 last:mb-0">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-3">
            <h2 className="text-blue-500 font-bold uppercase text-sm border-b border-blue-500 pb-0.5 mb-1">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2 last:mb-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-slate-700">{edu.school}</h3>
                  <span className="text-xs text-slate-600 font-medium">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-xs font-medium text-slate-600">{edu.degree}</p>
                  <p className="text-xs text-slate-600 italic">{edu.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills with pill design */}
        {data.skills.length > 0 && (
          <div className="mb-3">
            <h2 className="text-blue-500 font-bold uppercase text-sm border-b border-blue-500 pb-0.5 mb-1">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill) => (
                <span key={skill.id} className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-3">
            <h2 className="text-blue-500 font-bold uppercase text-sm border-b border-blue-500 pb-0.5 mb-1">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-2 last:mb-0">
                <h3 className="text-sm font-semibold text-slate-700">{project.name}</h3>
                <p className="text-xs text-slate-600 mb-0.5">{project.description}</p>
                <ul className="list-disc ml-3.5 pl-1.5">
                  {project.bullets.map((bullet, index) => (
                    <li key={index} className="text-xs leading-tight text-slate-600 mb-0.5 last:mb-0">
                      {bullet}
                    </li>
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

export default ModernTemplate;


import React from "react";
import { ResumeData, formatDateRange } from "./ResumeSections";

interface ResumePreviewProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, hideProfessionalTitle = false }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md p-6 resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto bg-white px-12 py-6"> 
        {/* Header/Personal Info with clean, minimal design */}
        <div className="mb-3 pb-1 border-b border-resume-accent"> 
          <h1 className="text-lg font-bold text-resume-heading">{data.personal.name}</h1>
          {!hideProfessionalTitle && (
            <p className="text-xs font-medium text-resume-accent">{data.personal.title}</p>
          )}
          <div className="text-xs mt-1 flex flex-wrap gap-x-3 text-resume-text">
            <span>{data.personal.email}</span>
            <span className="before:content-['•'] before:mx-2 before:text-resume-accent">
              {data.personal.phone}
            </span>
            <span className="before:content-['•'] before:mx-2 before:text-resume-accent">
              {data.personal.location}
            </span>
          </div>
        </div>

        {/* Summary */}
        {data.personal.summary && (
          <div className="resume-section">
            <h2 className="resume-heading">Summary</h2>
            <p className="resume-text">{data.personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-heading">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="resume-item">
                <div className="flex justify-between items-start">
                  <h3 className="resume-subheading">{exp.position}</h3>
                  <span className="resume-date">
                    {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-xs font-medium text-resume-text">{exp.company}</p>
                  <p className="resume-location">{exp.location}</p>
                </div>
                <ul className="list-disc ml-4 mt-1">
                  {exp.bullets.map((bullet, index) => (
                    <li key={index} className="resume-text resume-bullet">
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
          <div className="resume-section">
            <h2 className="resume-heading">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="resume-item">
                <div className="flex justify-between items-start">
                  <h3 className="resume-subheading">{edu.school}</h3>
                  <span className="resume-date">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-xs font-medium text-resume-text">{edu.degree}</p>
                  <p className="resume-location">{edu.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills with modern design */}
        {data.skills.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-heading">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill) => (
                <span key={skill.id} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-resume-text">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-heading">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="resume-item">
                <h3 className="resume-subheading">{project.name}</h3>
                <p className="text-xs text-resume-text mb-1">{project.description}</p>
                <ul className="list-disc ml-4">
                  {project.bullets.map((bullet, index) => (
                    <li key={index} className="resume-text resume-bullet">
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

export default ResumePreview;

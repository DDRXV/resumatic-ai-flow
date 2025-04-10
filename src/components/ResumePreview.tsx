
import React from "react";
import { ResumeData, formatDateRange } from "./ResumeSections";

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md p-6 resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto">
        {/* Header/Personal Info */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-resume-heading">{data.personal.name}</h1>
          <p className="text-resume-subheading">{data.personal.title}</p>
          <div className="text-resume-text text-sm mt-2 flex justify-center flex-wrap gap-x-4">
            <span>{data.personal.email}</span>
            <span>{data.personal.phone}</span>
            <span>{data.personal.location}</span>
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
                  <span className="text-sm text-resume-text">
                    {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-resume-subheading">{exp.company}</p>
                  <p className="text-sm text-resume-text">{exp.location}</p>
                </div>
                <ul className="list-disc ml-5 mt-1">
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
                  <span className="text-sm text-resume-text">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-resume-text">{edu.degree}</p>
                  <p className="text-sm text-resume-text">{edu.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-heading">Skills</h2>
            <p className="resume-text">
              {data.skills.map((skill) => skill.name).join(", ")}
            </p>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-heading">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="resume-item">
                <h3 className="resume-subheading">{project.name}</h3>
                <p className="text-sm text-resume-text mb-1">{project.description}</p>
                <ul className="list-disc ml-5">
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

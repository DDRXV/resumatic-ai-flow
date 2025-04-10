
import React from "react";
import { ResumeData, formatDateRange } from "../ResumeSections";
import { Mail, Phone, MapPin, Award } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const SideBySideTemplate: React.FC<TemplateProps> = ({ data, hideProfessionalTitle = false }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto bg-white"> 
        <div className="flex flex-row">
          {/* Left sidebar */}
          <div className="w-1/3 bg-slate-800 text-white p-6">
            <div className="mb-8 flex flex-col items-center">
              {/* Profile Photo Area */}
              <div className="w-24 h-24 rounded-full bg-slate-700 mb-4 overflow-hidden flex items-center justify-center">
                {/* Placeholder for profile photo */}
                <span className="text-4xl font-bold">{data.personal.name.charAt(0)}</span>
              </div>
              <h1 className="text-xl font-bold text-center mb-1">{data.personal.name}</h1>
              {!hideProfessionalTitle && (
                <p className="text-sm text-center text-slate-300 uppercase">{data.personal.title}</p>
              )}
            </div>

            {/* Contact Details */}
            <div className="mb-8">
              <h2 className="text-sm uppercase font-bold border-b border-slate-600 pb-2 mb-4">Contact</h2>
              <div className="text-xs space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <p>{data.personal.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <p>{data.personal.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <p>{data.personal.email}</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h2 className="text-sm uppercase font-bold border-b border-slate-600 pb-2 mb-4">Skills</h2>
              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="mb-2">
                    <p className="text-xs font-medium mb-1.5">{skill.name}</p>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-slate-400 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="w-2/3 p-6">
            {/* Profile/Summary */}
            <div className="mb-6">
              <h2 className="text-sm uppercase font-bold text-slate-800 border-b border-slate-300 pb-2 mb-3">
                Profile
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed">{data.personal.summary}</p>
            </div>

            {/* Employment History */}
            <div className="mb-8">
              <h2 className="text-sm uppercase font-bold text-slate-800 border-b border-slate-300 pb-2 mb-3">
                Employment History
              </h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-semibold text-gray-800">{exp.position}</h3>
                    <span className="text-xs text-gray-600 bg-slate-100 px-2 py-0.5 rounded">
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

            {/* Education */}
            <div className="mb-8">
              <h2 className="text-sm uppercase font-bold text-slate-800 border-b border-slate-300 pb-2 mb-3">
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-semibold text-gray-800">{edu.degree}</h3>
                    <span className="text-xs text-gray-600 bg-slate-100 px-2 py-0.5 rounded">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700">{edu.school}, {edu.location}</p>
                </div>
              ))}
            </div>

            {/* Projects */}
            {data.projects.length > 0 && (
              <div>
                <h2 className="text-sm uppercase font-bold text-slate-800 border-b border-slate-300 pb-2 mb-3">
                  Projects
                </h2>
                {data.projects.map((project) => (
                  <div key={project.id} className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">{project.name}</h3>
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
      </div>
    </div>
  );
};

export default SideBySideTemplate;

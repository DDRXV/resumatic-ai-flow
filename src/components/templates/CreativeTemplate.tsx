
import React from "react";
import { ResumeData, formatDateRange } from "../ResumeSections";
import { Briefcase, GraduationCap, User, Award, Calendar } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const CreativeTemplate: React.FC<TemplateProps> = ({ data, hideProfessionalTitle = false }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto bg-white">
        {/* Header with modern styling */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 text-white">
          <div className="flex items-center">
            {/* Photo circle placeholder */}
            <div className="w-24 h-24 bg-white rounded-full overflow-hidden flex items-center justify-center mr-6 border-4 border-white/20">
              <span className="text-3xl font-bold text-indigo-600">{data.personal.name.charAt(0)}</span>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold mb-1">{data.personal.name}</h1>
              {!hideProfessionalTitle && (
                <p className="text-lg font-light">{data.personal.title}</p>
              )}
              <div className="flex mt-3 space-x-6 text-xs">
                <div className="opacity-90">{data.personal.email}</div>
                <div className="opacity-90">{data.personal.phone}</div>
                <div className="opacity-90">{data.personal.location}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content with improved layout */}
        <div className="p-8">
          {/* Profile with clean styling */}
          {data.personal.summary && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-indigo-600 mr-2" />
                <h2 className="text-sm uppercase font-bold text-indigo-800">Profile</h2>
              </div>
              <div className="pl-7">
                <p className="text-sm text-gray-700 leading-relaxed">{data.personal.summary}</p>
              </div>
            </div>
          )}
          
          {/* Two column layout for main content */}
          <div className="flex flex-wrap -mx-4">
            {/* Left column (60%) */}
            <div className="w-[60%] px-4">
              {/* Experience with improved timeline */}
              {data.experience.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-5 w-5 text-indigo-600 mr-2" />
                    <h2 className="text-sm uppercase font-bold text-indigo-800">Experience</h2>
                  </div>
                  <div className="relative pl-7">
                    {data.experience.map((exp, index) => (
                      <div key={exp.id} className="mb-6 pb-6 border-b border-indigo-50 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                          <div className="flex items-center text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs font-medium text-indigo-600 mb-2">{exp.company}, {exp.location}</p>
                        <ul className="space-y-1.5">
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex">
                              <span className="text-indigo-400 mr-2">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Projects */}
              {data.projects.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Award className="h-5 w-5 text-indigo-600 mr-2" />
                    <h2 className="text-sm uppercase font-bold text-indigo-800">Projects</h2>
                  </div>
                  <div className="pl-7">
                    {data.projects.map((project) => (
                      <div key={project.id} className="mb-5 pb-5 border-b border-indigo-50 last:border-0 last:pb-0">
                        <h3 className="text-sm font-bold text-gray-800 mb-2">{project.name}</h3>
                        <p className="text-xs text-gray-700 mb-2">{project.description}</p>
                        <ul className="space-y-1.5">
                          {project.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex">
                              <span className="text-indigo-400 mr-2">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right column (40%) */}
            <div className="w-[40%] px-4">
              {/* Education */}
              {data.education.length > 0 && (
                <div className="mb-8 bg-indigo-50 p-5 rounded-lg">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="h-5 w-5 text-indigo-600 mr-2" />
                    <h2 className="text-sm uppercase font-bold text-indigo-800">Education</h2>
                  </div>
                  <div className="space-y-4">
                    {data.education.map((edu) => (
                      <div key={edu.id} className="mb-3 pb-3 border-b border-indigo-100 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-gray-800">{edu.degree}</h3>
                        </div>
                        <p className="text-xs text-gray-700 mb-1">{edu.school}</p>
                        <p className="text-xs text-gray-600 mb-1">{edu.location}</p>
                        <div className="flex items-center text-xs text-indigo-600">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDateRange(edu.startDate, edu.endDate)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Skills with improved display */}
              {data.skills.length > 0 && (
                <div className="mb-8 bg-indigo-50 p-5 rounded-lg">
                  <h2 className="text-sm uppercase font-bold text-indigo-800 mb-4 border-b border-indigo-200 pb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill) => (
                      <span key={skill.id} className="px-3 py-1.5 bg-white rounded-md text-xs text-indigo-700 shadow-sm border border-indigo-100 font-medium">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;


import React from "react";
import { ResumeData, formatDateRange } from "../ResumeSections";
import { Mail, Phone, MapPin, User, Briefcase, GraduationCap, Award, Circle, Calendar } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  hideProfessionalTitle?: boolean;
}

const ModernAccentTemplate: React.FC<TemplateProps> = ({ data, hideProfessionalTitle = false }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-md resume-preview">
      <div className="resume-paper max-w-[8.5in] mx-auto bg-white">
        {/* Header with colored background */}
        <div className="bg-blue-900 text-white p-8">
          <div className="flex items-center">
            {/* Photo area (placeholder circle) */}
            <div className="rounded-full bg-white h-20 w-20 flex items-center justify-center text-blue-900 text-2xl font-bold mr-6 overflow-hidden border-4 border-blue-700">
              {data.personal.name.charAt(0)}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold mb-1">{data.personal.name}</h1>
              {!hideProfessionalTitle && (
                <p className="text-sm mt-1 opacity-90">{data.personal.title}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Main content with two columns */}
        <div className="flex p-8 gap-8">
          {/* Left column for details and skills (35%) */}
          <div className="w-[35%]">
            {/* Details section */}
            <div className="mb-8">
              <h2 className="text-sm uppercase font-bold text-blue-900 border-b border-blue-200 pb-2 mb-4">Contact Details</h2>
              <div className="space-y-4 text-xs">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 mr-3">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>{data.personal.location}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 mr-3">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>{data.personal.phone}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 mr-3">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>{data.personal.email}</div>
                </div>
              </div>
            </div>

            {/* Skills with improved indicators */}
            {data.skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm uppercase font-bold text-blue-900 border-b border-blue-200 pb-2 mb-4">Skills</h2>
                <div className="space-y-4">
                  {data.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-medium text-gray-800">{skill.name}</p>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <div
                              key={dot}
                              className={`w-2 h-2 rounded-full ${
                                dot <= 4 ? "bg-blue-600" : "bg-gray-300"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div>
                <h2 className="text-sm uppercase font-bold text-blue-900 border-b border-blue-200 pb-2 mb-4">Education</h2>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-5 pb-5 border-b border-blue-50 last:border-0 last:pb-0">
                    <div className="flex items-start mb-2">
                      <GraduationCap className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{edu.degree}</h3>
                        <p className="text-xs text-gray-700">{edu.school}</p>
                        <p className="text-xs text-gray-600">{edu.location}</p>
                        <div className="flex items-center text-xs text-blue-600 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDateRange(edu.startDate, edu.endDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column for profile and experience (65%) */}
          <div className="w-[65%]">
            {/* Profile section */}
            {data.personal.summary && (
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <User className="h-5 w-5 text-blue-900 mr-2" />
                  <h2 className="text-sm uppercase font-bold text-blue-900 border-b border-blue-200 pb-1 flex-grow">Profile</h2>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed pl-7">{data.personal.summary}</p>
              </div>
            )}

            {/* Employment History */}
            {data.experience.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <Briefcase className="h-5 w-5 text-blue-900 mr-2" />
                  <h2 className="text-sm uppercase font-bold text-blue-900 border-b border-blue-200 pb-1 flex-grow">Employment History</h2>
                </div>
                <div className="space-y-6 mt-4">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-7">
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-blue-200"></div>
                      <div className="absolute w-3 h-3 rounded-full bg-blue-600 left-[-4px] top-1 border-2 border-white"></div>
                      
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-semibold text-gray-800">{exp.position}</h3>
                        <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            {formatDateRange(exp.startDate, exp.current ? null : exp.endDate)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">{exp.company}, {exp.location}</p>
                      <ul className="list-none text-xs text-gray-700 space-y-1.5">
                        {exp.bullets.map((bullet, index) => (
                          <li key={index} className="flex">
                            <Circle className="h-2 w-2 text-blue-600 mr-2 mt-1 flex-shrink-0" />
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
              <div>
                <div className="flex items-center mb-3">
                  <Award className="h-5 w-5 text-blue-900 mr-2" />
                  <h2 className="text-sm uppercase font-bold text-blue-900 border-b border-blue-200 pb-1 flex-grow">Projects</h2>
                </div>
                <div className="space-y-5 mt-4 pl-7">
                  {data.projects.map((project) => (
                    <div key={project.id} className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-800 mb-2">{project.name}</h3>
                      <p className="text-xs text-gray-700 mb-2">{project.description}</p>
                      <ul className="list-none text-xs text-gray-700 space-y-1.5">
                        {project.bullets.map((bullet, index) => (
                          <li key={index} className="flex">
                            <Circle className="h-2 w-2 text-blue-600 mr-2 mt-1 flex-shrink-0" />
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
        </div>
      </div>
    </div>
  );
};

export default ModernAccentTemplate;

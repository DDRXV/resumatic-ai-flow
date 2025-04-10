
import { format } from "date-fns";

export type ResumeData = {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  education: Array<{
    id: string;
    school: string;
    degree: string;
    location: string;
    startDate: Date | null;
    endDate: Date | null;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: Date | null;
    endDate: Date | null;
    current: boolean;
    bullets: string[];
  }>;
  skills: Array<{
    id: string;
    name: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    bullets: string[];
  }>;
};

export const initialResumeData: ResumeData = {
  personal: {
    name: "John Doe",
    title: "Software Engineer",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "New York, NY",
    summary: "Experienced software engineer with a passion for building user-friendly applications and solving complex problems."
  },
  education: [
    {
      id: "edu-1",
      school: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      location: "New York, NY",
      startDate: new Date(2016, 8, 1),
      endDate: new Date(2020, 5, 1)
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "Tech Solutions Inc.",
      position: "Software Engineer",
      location: "New York, NY",
      startDate: new Date(2020, 6, 1),
      endDate: null,
      current: true,
      bullets: [
        "Developed and maintained web applications using React and TypeScript",
        "Collaborated with cross-functional teams to implement new features",
        "Improved application performance by 30% by optimizing database queries"
      ]
    },
    {
      id: "exp-2",
      company: "Startup Innovations",
      position: "Junior Developer",
      location: "Boston, MA",
      startDate: new Date(2019, 5, 1),
      endDate: new Date(2020, 5, 31),
      current: false,
      bullets: [
        "Built responsive web interfaces using HTML, CSS, and JavaScript",
        "Participated in code reviews and implemented feedback from senior developers",
        "Assisted in the development of RESTful APIs using Node.js"
      ]
    }
  ],
  skills: [
    { id: "skill-1", name: "JavaScript" },
    { id: "skill-2", name: "TypeScript" },
    { id: "skill-3", name: "React" },
    { id: "skill-4", name: "Node.js" },
    { id: "skill-5", name: "SQL" },
    { id: "skill-6", name: "Git" }
  ],
  projects: [
    {
      id: "proj-1",
      name: "E-commerce Platform",
      description: "A full-stack e-commerce application",
      bullets: [
        "Implemented user authentication and product management features",
        "Integrated payment processing with Stripe",
        "Designed responsive UI with a focus on mobile-first experience"
      ]
    }
  ]
};

// Helper function to format dates
export const formatDate = (date: Date | null): string => {
  if (!date) return "Present";
  return format(date, "MMM yyyy");
};

// Format date range for display
export const formatDateRange = (startDate: Date | null, endDate: Date | null): string => {
  if (!startDate) return "";
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};

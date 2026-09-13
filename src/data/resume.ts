export type SectionId =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "awards"
  | "languages";

export interface Location {
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  region?: string;
}

export interface Profile {
  network: string;
  username?: string;
  url: string;
}

export interface Basics {
  name: string;
  label?: string;
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  summary?: string;
  location?: Location;
  profiles?: Profile[];
}

export interface Work {
  name: string;
  location?: string;
  description?: string;
  position: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface Education {
  institution: string;
  url?: string;
  area?: string;
  studyType?: string;
  startDate?: string;
  endDate?: string;
  score?: string;
  courses?: string[];
}

export interface Skill {
  name: string;
  level?: string;
  keywords?: string[];
}

export interface Project {
  name: string;
  description?: string;
  highlights?: string[];
  keywords?: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
}

export interface Award {
  title: string;
  date?: string;
  awarder?: string;
  summary?: string;
}

export interface Language {
  language: string;
  fluency?: string;
}

export interface ResumeMeta {
  sections?: SectionId[];
  aside?: SectionId[];
  main?: SectionId[];
}

export interface Resume {
  $schema?: string;
  meta?: ResumeMeta;
  basics: Basics;
  work?: Work[];
  education?: Education[];
  skills?: Skill[];
  projects?: Project[];
  awards?: Award[];
  languages?: Language[];
}

export const DEFAULT_SECTIONS: SectionId[] = [
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "awards",
  "languages",
];

export const DEFAULT_ASIDE: SectionId[] = [
  "skills",
  "languages",
  "education",
  "summary",
];

export const DEFAULT_MAIN: SectionId[] = ["experience", "awards"];

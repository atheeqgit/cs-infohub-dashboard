export interface SrcType {
  url: string;
  public_id: string;
}

export interface AdminType {
  _id?: string;
  username: string;
  email: string;
  token: string;
  password?: string;
  role?: string;
  faculty?: string;
}
export interface DepartmentType {
  _id: string;
  pathName: string;
  deptIcon: SrcType;
  deptName: string;
  bannerData: SrcType[]; // Banner images
  snippetData: {
    studentsCount: number;
    staffsCount: number;
    alumniCount: number;
  };
  about: string[];
  facultyBG: SrcType;
  eventsBG: SrcType;
  aboutBG: SrcType;
  facultyData: FacultyType[];
  programsData: ProgramType[];
  eventsData: EventType[];
}

export interface FacultyType {
  _id: string;
  imgSrc: SrcType;
  name: string;
  designation: string;
  education: string;
  pdfSrc: SrcType;
  shift: "shift1" | "shift2" | "both";
  showOnHome: string;
  deptID: string;
}

export interface EventType {
  _id: string;
  eventTitle: string;
  date: string;
  eventType: string;
  aboutEvent: string;
  imgSrc: SrcType;
  imgType: string;
  showOnHome: boolean;
  deptID: string;
}
export interface ProgramType {
  _id: string;
  title: string;
  programType: string;
  aboutProgram: string[];
  deptID: string;
  totalSemesters: number;
}

export interface EcontentType {
  _id?: string;
  title: string;
  subjectName: string;
  subjectCode: string;
  semester: number;
  programName: string;
  programId: string;
  type: string;
  files: SrcType[];
  uploadedBy: string;
  uploadedAt: string;
  tags: {
    type: string;
    index: true;
  }[];
  metadata: {
    academicYear: string;
    author: string;
    institution: string;
  };
}

export type UserRole = "admin" | "user";

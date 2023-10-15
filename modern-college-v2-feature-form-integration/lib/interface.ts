import NextAuth from "next-auth";
export interface RoutesA {
  href: string;
  label: string;
  active: boolean;
  hide?: boolean;
  role?: "hidden" | "";
}
export interface PersonalInfo {
  id?: string;
  dateOfBirth: Date | undefined;
  bloodGroup: string;
  mobile1: string;
  city: string;
  state: string;
  pincode: string;
  subjectOfTeaching: string;
  employmentStatus: boolean;
}

export interface FamilyDetail {
  id?: string;
  name: string;
  relationName: string;
  occupation: string;
  address: string;
  contact: string;
}

export interface PreviousAcademic {
  id?: string;
  boardUniversity: string;
  collegeName: string;
  courseName: string;
  passingYear: string;
  percentage: string;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      password: string | null;
      role: "Teacher" | "Student" | "Principle" | "HOD";
      academics: {
        designation: string;
        dateOfJoining: Date;
        facultyName: string;
        departmentName: string;
      } | null;
      personalInfo: {
        mobile1: string;
      } | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  }
}
export interface FormSteps {
  status: Boolean;
  formStep: String;
  href: String;
}
export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: "Teacher" | "Student" | "Principle" | "HOD";
  academics: {
    designation: string;
    dateOfJoining: Date;
    facultyName: string;
    departmentName: string;
  } | null;
  personalInfo: {
    mobile1: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface TeacherBasicInfo {
  mobile1: string;
  designation: string;
  dateOfJoining: Date;
  facultyName: string;
  departmentName: string;
}

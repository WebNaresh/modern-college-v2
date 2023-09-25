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
      role: "Teacher" | "Student" | "Admin";
      personalInfo: PersonalInfo | null;
      familyDetail: FamilyDetail[] | [];
      previousAcademics: PreviousAcademic[] | [];
      temporaryAddress: string;
      permanentAddress: string;
      religion: string;
      caste: string;
      gender: "Male" | "Female" | "Other" | null;
      isAuthorize: "UnAuthorize" | "Request" | "Authorize";
    } | null;
  }
}

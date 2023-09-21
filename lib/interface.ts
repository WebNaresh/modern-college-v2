import NextAuth from "next-auth";
export interface RoutesA {
  href: string;
  label: string;
  active: boolean;
  hide?: boolean;
  role?: "hidden" | "";
}
interface PersonalInfo {
  id: string;
  dateOfBirth: Date | undefined;
  gender: "Male" | "Female" | "Other" | undefined;
  religion: string;
  caste: string;
  category: string;
  bloodGroup: string;
  mobile1: string;
  temporaryAddress: string;
  permanentAddress: string;
}
interface FamilyDetail {
  id: string;
  name: string;
  relationName: string;
  occupation: string;
  address: string;
  contact: string;
}

interface PreviousAcademic {
  id: string;
  boardUniversity: string;
  collegeName: string;
  courseName: string;
  passingYear: Date;
  percentage: number;
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
    } | null;
  }
}

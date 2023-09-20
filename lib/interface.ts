import NextAuth from "next-auth";
export interface RoutesA {
  href: string;
  label: string;
  active: boolean;
  hide?: boolean;
  role?: "hidden" | "";
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
    } | null;
  }
}

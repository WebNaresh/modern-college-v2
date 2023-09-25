export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/teacher-registration", "/student-registration", "/request"],
};

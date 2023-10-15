interface Users {
  name: string;
  email: string;
  password: string;
  role: "Student" | "Teacher" | "Principle" | "HOD";
}
export const user: Users[] = [
  {
    name: "teacher",
    email: "teacher@teacher.com",
    password: "password",
    role: "Teacher",
  },
  {
    name: "student",
    email: "student@student.com",
    password: "password",
    role: "Student",
  },
  {
    name: "admin",
    email: "admin@admin.com",
    password: "password",
    role: "HOD",
  },
];

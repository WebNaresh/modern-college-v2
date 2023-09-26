import { RoutesA } from "@/lib/interface";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../toggle-button";

type Props = {
  teacherArray?: User[] | null;
};

const RightNav = (props: Props) => {
  const pathname = usePathname();
  const data = useSession();

  const routes: RoutesA[] = [
    {
      href: "/",
      label: "Me",
      active: pathname === "/",
      role: data.data?.user?.role === "Student" ? "hidden" : "hidden",
    },
    {
      href: "/courses",
      label: "Courses",
      active: pathname === "/courses",
      role: data.data?.user?.role === "Admin" ? "hidden" : "hidden",
    },
    {
      href: "/login",
      label: "Login",
      hide: data?.data?.user ? true : false,
      active: pathname === "/login",
      role: data.data?.user ? "hidden" : "",
    },
    {
      href: "/signUp",
      label: "signUp",
      hide: data?.data?.user ? true : false,
      active: pathname === "/signUp",
      role: data.data?.user ? "hidden" : "",
    },
    {
      href: "/teachers",
      label: "Teachers",
      active: pathname === "/teachers",
      role: data.data?.user?.role === "Admin" ? "" : "hidden",
    },
    {
      href: "/request",
      label: `Request ${
        (props.teacherArray?.length as number) > 0
          ? `(${props.teacherArray?.length})`
          : ""
      }`,
      active: pathname === "/request",
      role: data.data?.user?.role === "Admin" ? "" : "hidden",
    },
    {
      href: "/teacher-registration",
      label: "Register As Teacher",
      active: pathname === "/techer-registration",
      role:
        data.data?.user?.role !== "Teacher" ||
        data.data?.user?.isAuthorize === "Request"
          ? "hidden"
          : "",
    },
    {
      href: "/student-registration",
      label: "Register As Student",
      active: pathname === "/student-registration",
      role: data.data?.user?.role === "Student" ? "" : "hidden",
    },
  ];
  const showHideNavbar = () => {
    const navabar = document.getElementById("navbarSupportedContent1");
    if (navabar?.classList.contains("hidden")) {
      navabar?.classList.remove("hidden");
    } else {
      navabar?.classList.add("hidden");
    }
  };

  return (
    <>
      {routes.map((ele, i) => {
        return (
          <li key={i} className={`${ele.role}`}>
            <Link
              onClick={showHideNavbar}
              className={`hover:text-primary ${
                ele.active ? "text-primary" : "text-foreground"
              }  font-sans`}
              href={ele.href}
            >
              {ele.label}
            </Link>
          </li>
        );
      })}

      <li>
        <ThemeToggle />
      </li>
    </>
  );
};

export default RightNav;

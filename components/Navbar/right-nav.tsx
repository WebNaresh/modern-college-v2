import { RoutesA } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ThemeToggle } from "../toggle-button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

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
      role: data.data?.user?.role === "HOD" ? "hidden" : "hidden",
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
      role: data.data?.user?.role === "HOD" ? "" : "hidden",
    },
    {
      href: "/request",
      label: `Request ${
        (props.teacherArray?.length as number) > 0
          ? `(${props.teacherArray?.length})`
          : ""
      }`,
      active: pathname === "/request",
      role: data.data?.user?.role === "HOD" ? "" : "hidden",
    },
    {
      href: "/teacher-registration",
      label: "Register As Teacher",
      active: pathname === "/techer-registration",
      role: data.data?.user?.role !== "Teacher" ? "hidden" : "",
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
            {data?.data?.user?.role !== "Teacher" ? (
              <Link
                onClick={showHideNavbar}
                className={`hover:text-primary ${
                  ele.active ? "text-primary" : "text-foreground"
                }  font-sans`}
                href={ele.href}
              >
                {ele.label}
              </Link>
            ) : (
              <NavigationMenu
                className={`hover:text-primary ${
                  ele.active ? "text-primary" : "text-foreground"
                }  font-sans`}
              >
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      {" "}
                      Hover for Menu
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[200px] ">
                        <ListItem
                          href="/performance-evaluation"
                          title=" Performance Evaluation"
                        >
                          Here You can fill performance evaluation form of
                          Modern College Of Engineering MCA branch
                        </ListItem>
                        {/* <ListItem
                          href="/docs/installation"
                          title="Installation"
                        >
                          How to install dependencies and structure your app.
                        </ListItem>
                        <ListItem
                          href="/docs/primitives/typography"
                          title="Typography"
                        >
                          Styles for headings, paragraphs, lists...etc
                        </ListItem> */}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
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
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="w-full">
      <NavigationMenuLink asChild>
        <Link
          href={props.href as string}
          ref={ref}
          className={cn(
            "block select-none w-full space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

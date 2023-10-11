"use client";
import { RoutesA } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { Academics, Performance, PersonalInfo, User } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { ThemeToggle } from "../toggle-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { ScrollArea } from "../ui/scroll-area";
import { ProfileForm } from "./(teacher)/teacherPEModal";

type Props = {
  teacherArray?: User[] | null;
  peFormDetails?: Performance | null;
  user?:
    | (User & {
        academics: Academics | null;
        personalInfo: PersonalInfo | null;
        performance: Performance[];
      })
    | null;
};

const RightNav = (props: Props) => {
  const isClickedOutsideNavbar = (event: Event) => {
    const navbar = document.getElementById("navbarSupportedContent1");
    const button = document.getElementById("button-id-1"); // Replace with your actual button ID
    const targetElement = event.target as Node;

    if (
      navbar &&
      button &&
      !navbar.contains(targetElement) &&
      !button.contains(targetElement)
    ) {
      navbar.classList.add("hidden");
    }
  };
  useEffect(() => {
    document.addEventListener("click", isClickedOutsideNavbar);
    document.addEventListener("scroll", isClickedOutsideNavbar);

    return () => {
      document.removeEventListener("click", isClickedOutsideNavbar);
      document.removeEventListener("scroll", isClickedOutsideNavbar);
    };
  }, []);
  const pathname = usePathname();

  const routes: RoutesA[] = [
    {
      href: "/",
      label: "Me",
      active: pathname === "/",
      role: props.user?.role === "Student" ? "hidden" : "hidden",
    },
    {
      href: "/courses",
      label: "Courses",
      active: pathname === "/courses",
      role: props.user?.role === "HOD" ? "hidden" : "hidden",
    },
    {
      href: "/login",
      label: "Login",
      hide: props.user ? true : false,
      active: pathname === "/login",
      role: props.user ? "hidden" : "",
    },
    {
      href: "/signUp",
      label: "signUp",
      hide: props.user ? true : false,
      active: pathname === "/signUp",
      role: props.user ? "hidden" : "",
    },
    {
      href: "/teachers",
      label: "Teachers",
      active: pathname === "/teachers",
      role: props.user?.role === "HOD" ? "" : "hidden",
    },
    {
      href: "/request",
      label: `Request ${
        (props.teacherArray?.length as number) > 0
          ? `(${props.teacherArray?.length})`
          : ""
      }`,
      active: pathname === "/request",
      role: props.user?.role === "HOD" ? "" : "hidden",
    },
    {
      href: "/teacher-registration",
      label: "Register As Teacher",
      active: pathname === "/techer-registration",
      role: props.user?.role !== "Teacher" ? "hidden" : "",
    },
    {
      href: "/student-registration",
      label: "Register As Student",
      active: pathname === "/student-registration",
      role: props.user?.role === "Student" ? "" : "hidden",
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
            {props?.user?.role !== "Teacher" ? (
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
                        {props.peFormDetails !== null ? (
                          <ListItem
                            href={`/performance/${props.peFormDetails?.id}`}
                            className="border"
                            title="Existing PE form"
                          >
                            Click to see
                          </ListItem>
                        ) : (
                          <Dialog modal={true}>
                            <DialogTrigger className="w-full border rounded-sm p-2 ">
                              New PE Form
                            </DialogTrigger>
                            <DialogContent className="h-[70vh] p-0">
                              <ScrollArea className="h-full w-full rounded-md p-6">
                                <DialogHeader>
                                  <DialogTitle>
                                    1st question to start
                                  </DialogTitle>
                                  <DialogDescription>
                                    Are you sure to start new Performance
                                    Evaluation form for this year
                                  </DialogDescription>
                                </DialogHeader>
                                <ProfileForm
                                  user={props.user ? props.user : null}
                                />
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
                        )}
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
        <ThemeToggle user={props.user} />
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

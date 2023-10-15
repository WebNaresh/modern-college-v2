"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
type Props = {
  user?: User | null;
};
export function ThemeToggle(props: Props) {
  const data = useSession();
  const { setTheme, theme } = useTheme();
  const toggleMode = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="gap-2 flex">
      {props.user ? (
        <Button
          suppressHydrationWarning
          onClick={() => signOut()}
          variant="outline"
          size="sm"
        >
          <HiOutlineLogout className="text-red-600 text-lg" />
        </Button>
      ) : (
        ""
      )}
      <Button
        suppressHydrationWarning
        onClick={() => toggleMode()}
        variant="outline"
        size="sm"
      >
        <SunIcon className="h-[1.2rem] text-primary w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] text-primary w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}

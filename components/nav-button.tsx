"use client";
import { useEffect } from "react";
import { Button } from "./ui/button";

type Props = {};

const NavButton = (props: Props) => {
  const showHideNavbar = (event: any) => {
    const navabar = document.getElementById("navbarSupportedContent1");
    if (navabar?.classList.contains("hidden")) {
      navabar?.classList.remove("hidden");
    } else {
      navabar?.classList.add("hidden");
    }
    console.log(`🚀 ~ navabar:`, navabar?.classList);
  };
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

  return (
    <Button
      id="button-id-1"
      className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
      type="button"
      data-te-collapse-init
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
      onClick={showHideNavbar}
    >
      <span className="[&>svg]:w-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </Button>
  );
};

export default NavButton;

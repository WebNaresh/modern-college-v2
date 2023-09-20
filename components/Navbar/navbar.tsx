"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import LeftNav from "./left-nav";
import MobileNav from "./mobile-nav";
import RightNav from "./right-nav";

type Props = {};

const Navbar = (props: Props) => {
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
    <div className=" transition-all">
      <nav
        className={` fixed top-0 lg:flex md:flex xl:flex lg:h-[90px] flex-no-wrap backdrop-filter backdrop-blur-sm bg-opacity-20 z-30 w-full items-center border-b border-secondary justify-between py-2  shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4 shadow-2xl`}
      >
        <div className="grid grid-cols-12 w-full justify-between px-3 h-full">
          <div className="!visible col-span-7 flex-grow basis-[100%] items-center lg:!flex lg:basis-auto transform  transition-all duration-300 ease-in-out">
            <ul className="list-style-none mr-auto flex  pl-0 lg:flex-row items-center gap-6">
              <li>
                <Link href={"/"}>
                  <Image
                    src="/bigLogo.png"
                    height={50}
                    width={50}
                    alt="Moder logo"
                    className="p-2"
                  ></Image>
                </Link>
              </li>
              <LeftNav />
            </ul>
          </div>

          <div className="relative col-span-5  flex flex-row-reverse items-center">
            <div className=" md:relative xl:relative lg:relative">
              <ul className="list-style-none mr-auto hidden xl:flex pl-0 lg:flex-row items-center gap-8 align-center font-[fantasy] text-primary px-4  md:flex lg:flex">
                <RightNav />
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <MobileNav />
    </div>
  );
};

export default Navbar;

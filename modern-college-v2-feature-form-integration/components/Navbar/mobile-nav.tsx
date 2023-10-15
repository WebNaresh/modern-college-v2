"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import RightNav from "./right-nav";

type Props = {
  teacherArray?: User[] | null;
};
const MobileNav = (props: Props) => {
  const [switchNav, setSwitchNav] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav
        id="navbarSupportedContent1"
        className={`${
          switchNav ? "flex" : "hidden"
        } fixed top-0 lg:h-[90px] flex-no-wrap  z-30 w-full items-center justify-between py-2 shadow-black/5 backdrop-filter backdrop-blur-sm bg-opacity-20 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4 border-b-2 shadow-2xl border-secondary`}
      >
        <div className="flex w-full justify-between px-3 h-full flex-col">
          <div className="!visible flex-grow basis-[100%] items-center lg:!flex lg:basis-auto transform  transition-all duration-300 ease-in-out">
            <ul className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row items-center gap-6">
              <li>
                <Link href={"/"}>
                  <Image
                    src="/biglogo.png"
                    height={50}
                    width={50}
                    alt="Moder logo"
                    className="p-2"
                  ></Image>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex">
            <div className="m-auto">
              <ul className="list-style-none mr-auto flex-col py-3 lg:flex-row items-center flex gap-4 align-center font-[fantasy] text-primary px-4  md:flex lg:flex">
                <RightNav teacherArray={props.teacherArray} />
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <GiHamburgerMenu
        id="button-id-1"
        onClick={() => setSwitchNav(switchNav === true ? false : true)}
        className="text-xl cursor-pointer md:hidden lg:hidden xl:hidden fixed right-0 top-0 m-6 z-50"
      />
    </>
  );
};

export default MobileNav;

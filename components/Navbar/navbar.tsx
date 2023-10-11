import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/primsa";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import LeftNav from "./left-nav";
import MobileNav from "./mobile-nav";
import RightNav from "./right-nav";

type Props = {};

const Navbar = async (props: Props) => {
  const data = await getServerSession(authOptions);
  const currentYear = new Date().getFullYear();
  let user;
  if (data?.user) {
    user = await prisma.user.findUnique({
      where: {
        id: data?.user?.id as string,
      },
      include: {
        academics: true,
        personalInfo: true,
        performance: true,
      },
    });
  } else {
    user = null;
  }
  const existingPerformance = await prisma.performance.findFirst({
    where: {
      userId: data?.user?.id,
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`), // Start of the current year
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`), // Start of the next year
      },
    },
  });
  return (
    <div className=" transition-all">
      <nav
        className={` fixed top-0 lg:flex md:flex xl:flex h-[80px]  flex-no-wrap backdrop-filter backdrop-blur-sm bg-opacity-20 z-30 w-full items-center border-b border-secondary justify-between py-2  shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4 shadow-2xl`}
      >
        <div className="grid grid-cols-12 w-full justify-between px-3 h-full content-center">
          <div className="!visible col-span-7 flex-grow basis-[100%] items-center lg:!flex lg:basis-auto transform  transition-all duration-300 ease-in-out">
            <ul className="list-style-none mr-auto flex  pl-0 lg:flex-row items-center gap-6">
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
              <LeftNav />
            </ul>
          </div>

          <div className="relative col-span-5  flex flex-row-reverse items-center">
            <div className=" md:relative xl:relative lg:relative">
              <ul className="list-style-none mr-auto hidden xl:flex pl-0 lg:flex-row items-center gap-8 align-center font-[fantasy] text-primary px-4  md:flex lg:flex">
                <RightNav peFormDetails={existingPerformance} user={user} />
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

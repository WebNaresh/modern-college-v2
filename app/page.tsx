import { authOptions } from "@/lib/auth";
import type { NextPage } from "next";
import { getServerSession } from "next-auth";
import CarouselComp from "./components/carousel";
import Utility1 from "./components/utility-1";

const HomeComponent: NextPage = async () => {
  const data = await getServerSession(authOptions);
  console.log(`🚀 ~ data:`, data);
  return (
    <>
      <CarouselComp />
      <Utility1 />
    </>
  );
};

export default HomeComponent;

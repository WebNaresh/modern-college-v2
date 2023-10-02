import type { NextPage } from "next";
import CarouselComp from "./components/carousel";
import Utility1 from "./components/utility-1";

const HomeComponent: NextPage = async () => {
  return (
    <>
      <CarouselComp />
      <Utility1 />
    </>
  );
};

export default HomeComponent;

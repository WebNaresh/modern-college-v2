import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

type Props = {};

const Utility1 = (props: Props) => {
  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4 h-64  m-4 rounded-lg box-border">
        <div className=" grid grid-cols-12 gap-y-2">
          <div className=" col-span-1 m-1">
            <AiFillStar className="text-primary text-xl" />
          </div>
          <div className="col-span-11 grid grid-rows-8 gap-y-2">
            <h1 className=" text-primary row-span-1 font-semibold text-lg">
              JUST SCAN AND SHARE
            </h1>
            <h1 className="text-gray-500 text-sm pr-8 row-span-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
              dignissimos eveniet dolor.lorem12 Lorem ipsum dolor sit ndis
              provident fugit debitis!
            </h1>
            <Button
              className="w-fit m-auto rounded-full row-span-1"
              size={"lg"}
            >
              Scan
            </Button>
          </div>
        </div>
        <div className="relative mx-20 ">
          <Image
            src={"/bg-12.jpg"}
            alt="scan image"
            className="rounded-xl hidden md:block lg:block"
            fill
          ></Image>
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4 h-64  m-4 rounded-lg box-border">
        <div className="relative mx-20 ">
          <Image
            src={"/bg-12.jpg"}
            alt="scan image"
            className="rounded-xl hidden md:block lg:block"
            fill
          ></Image>
        </div>
        <div className=" grid grid-cols-12 gap-y-2">
          <div className=" col-span-1 m-1">
            <AiFillStar className="text-primary text-xl" />
          </div>
          <div className="col-span-11 grid grid-rows-8 gap-y-2">
            <h1 className=" text-primary row-span-1 font-semibold text-lg">
              JUST SCAN AND CHAT
            </h1>
            <h1 className="text-gray-500 text-sm pr-8 row-span-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
              dignissimos eveniet dolor.lorem12 Lorem ipsum dolor sit ndis
              provident fugit debitis!
            </h1>
            <Button
              className="w-fit m-auto rounded-full row-span-1"
              size={"lg"}
            >
              Chat
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Utility1;

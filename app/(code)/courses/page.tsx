import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PiScan } from "react-icons/pi";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <div className="flex w-full justify-center items-center h-[90vh]">
        <div className="w-[40%] flex  justify-center ">
          <Button
            size={"lg"}
            className="rounded-full bg-green-400 text-md gap-4"
          >
            <PiScan />
            Scan
          </Button>
        </div>

        <Image
          src="/scanner.png"
          alt="image scan"
          height={0}
          width={0}
          sizes="100vw"
          className="w-[60%] h-full hidden lg:block object-contain border-l-2 dark:border-gray-800 border-gray-200"
        />
      </div>
    </>
  );
};

export default Page;

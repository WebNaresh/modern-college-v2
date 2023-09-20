type Props = {
  setState: (value: number | ((prevVar: number) => number)) => void;
};
import { AiOutlineUser } from "react-icons/ai";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { RiGraduationCapLine } from "react-icons/ri";

// <MdSecurity />
// <MdFamilyRestroom />
// <FaUserGraduate />

const IconBar = (props: Props) => {
  function setState(arg0: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex items-center">
      {/* Include the SVG path for each icon */}

      <div className="flex items-center text-primary relative">
        <div
          onClick={() => setState(1)}
          className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-primary cursor-pointer"
        >
          <AiOutlineUser className={`m-auto flex text-2xl`} />
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium text-primary">
          User-Info
        </div>
      </div>
      <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-primary"></div>
      <div className="flex items-center text-gray-500 relative">
        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-primary border-primary">
          <BiSolidUserDetail className={`m-auto flex text-2xl`} />
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium text-primary">
          User-Detail
        </div>
      </div>
      <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
      <div className="flex items-center text-gray-500 relative">
        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
          <MdOutlineFamilyRestroom className={`m-auto flex text-2xl`} />
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium text-gray-500">
          Education
        </div>
      </div>
      <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
      <div className="flex items-center text-gray-500 relative">
        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
          <RiGraduationCapLine className={`m-auto flex text-2xl`} />
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium text-gray-500">
          Family-Details
        </div>
      </div>
    </div>
  );
};

export default IconBar;

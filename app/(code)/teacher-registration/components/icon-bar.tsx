"use client";
import useUpdateUserStore from "@/hooks/stepper-user-update-hook";
import { AiOutlineUser } from "react-icons/ai";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { RiGraduationCapLine } from "react-icons/ri";

type Props = {};
// <MdSecurity />
// <MdFamilyRestroom />
// <FaUserGraduate />

const IconBar = (props: Props) => {
  const { stepper, index, setIndex, makeIndex } = useUpdateUserStore();

  return (
    <div className="flex items-center">
      {/* Include the SVG path for each icon */}
      {stepper.map((e, i) => {
        return (
          <div key={i} className=" contents ">
            <div
              className={`flex items-center text-primary relative ${
                i <= index ? "text-primary" : "text-gray-700"
              }`}
            >
              <div
                onClick={() => setIndex(i)}
                className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                  i <= index ? "border-primary" : "border-gray-700"
                } cursor-pointer`}
              >
                {e.icon === "AiOutlineUserIcon" ? (
                  <AiOutlineUser className={`m-auto flex text-2xl`} />
                ) : e.icon === "BiSolidUserDetailIcon" ? (
                  <BiSolidUserDetail className={`m-auto flex text-2xl`} />
                ) : e.icon === "MdOutlineFamilyRestroomIcon" ? (
                  <RiGraduationCapLine className={`m-auto flex text-2xl`} />
                ) : e.icon === "RiGraduationCapLineIcon" ? (
                  <MdOutlineFamilyRestroom className={`m-auto flex text-2xl`} />
                ) : (
                  ""
                )}
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium text-primary">
                {e.description}
              </div>
            </div>
            {i < stepper.length - 1 ? (
              <div
                className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
                  i < index ? "border-primary" : "border-gray-700"
                }`}
              ></div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IconBar;

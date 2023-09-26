"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { AiOutlineUser } from "react-icons/ai";
// import { FaUserGraduate } from "react-icons/fa";
// import { MdFamilyRestroom, MdSecurity } from "react-icons/md";
//  <AiOutlineUser />
//             <MdSecurity />
//             <MdFamilyRestroom />
//             <FaUserGraduate />

function YourComponent() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            {/* Step 1 content */}
            <h2>Step 1: Personal Info</h2>
            {/* Add your input fields for personal info here */}
          </div>
        );
      case 2:
        return (
          <div>
            {/* Step 2 content */}
            <h2>Step 2: Account Info</h2>
            {/* Add your input fields for account info here */}
          </div>
        );
      case 3:
        return (
          <div>
            {/* Step 3 content */}
            <h2>Step 3: Message</h2>
            {/* Add your input fields for message here */}
          </div>
        );
      case 4:
        return (
          <div>
            {/* Step 4 content */}
            <h2>Step 4: Confirm</h2>
            {/* Add your input fields for confirmation here */}
          </div>
        );
      default:
        return null;
    }
  };

  const renderStepIcons = () => {
    const stepIcons = ["bookmark", "user", "mail", "database"];

    return stepIcons.map((icon, index) => (
      <div
        key={index}
        className={`flex items-center text-primary relative ${
          index + 1 === currentStep ? "font-bold" : "font-normal"
        }`}
      >
        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-${icon}`}
          >
            {/* Include the SVG path for each icon */}
            {icon === "bookmark" && (
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            )}
            {icon === "user-plus" && (
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            )}
            {icon === "mail" && (
              <>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </>
            )}
            {icon === "database" && (
              <>
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </>
            )}
          </svg>
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-primary">
          Step {index + 1}
        </div>
      </div>
    ));
  };

  return (
    <div className="p-5">
      <div className="mx-4 p-4">
        <div className="flex items-center">
          <div className="flex items-center text-primary relative">
            <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-user-plus "
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-primary">
              Personal
            </div>
          </div>
          <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-primary"></div>
          <div className="flex items-center text-white relative">
            <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-primary border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-user-plus "
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-primary">
              Account
            </div>
          </div>
          <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
          <div className="flex items-center text-gray-500 relative">
            <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-mail "
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">
              Message
            </div>
          </div>
          <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
          <div className="flex items-center text-gray-500 relative">
            <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-database "
              >
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
            </div>
            <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">
              Confirm
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 p-4">{renderStepContent()}</div>
      <div className="flex p-2 mt-4">
        <Button onClick={handlePrevious}>Previous</Button>
        <div className="flex-auto flex flex-row-reverse">
          {currentStep < 4 && <Button onClick={handleNext}>Next</Button>}
          <Button>Skip</Button>
        </div>
      </div>
    </div>
  );
}

export default YourComponent;

"use client";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import BottomBar from "./bottom-bar";
import IconBar from "./icon-bar";
import UserInfo1 from "./stepper/stepper-1";
import UserInfo2 from "./stepper/stepper-2";
import UserInfo3 from "./stepper/stepper-3";
import UserInfo4 from "./stepper/stepper-4";

type Props = {
  session: Session | null;
};
function Stepper(props: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const { data } = useSession();

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
        return <UserInfo1 session={props.session} />;
      case 2:
        return <UserInfo2 />;
      case 3:
        return <UserInfo3 />;
      case 4:
        return <UserInfo4 />;
      default:
        return null;
    }
  };

  return (
    <div className="p-5">
      <CardHeader>
        <CardTitle>Teacher Registration Form</CardTitle>
        <CardDescription>Welcome {data?.user?.name}</CardDescription>
        <IconBar setState={setCurrentStep} />
      </CardHeader>
      <CardContent>
        <div className="mt-8 p-4">{renderStepContent()}</div>
      </CardContent>
      <CardFooter className=" flex flex-col w-full">
        <BottomBar
          currentStep={currentStep}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </CardFooter>
    </div>
  );
}

export default Stepper;

"use client";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUpdateUserStore from "@/hooks/stepper-user-update-hook";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
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
  const { index, nextStep, prevStep, setIndex } = useUpdateUserStore();
  const { data } = useSession();

  const renderStepContent = () => {
    switch (index) {
      case 0:
        return <UserInfo1 session={props.session} />;
      case 1:
        return <UserInfo2 session={props.session} />;
      case 2:
        return <UserInfo3 session={props.session} />;
      case 3:
        return <UserInfo4 session={props.session} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-5">
      <CardHeader>
        <CardTitle>Teacher Registration Form</CardTitle>
        <CardDescription>Welcome {data?.user?.name}</CardDescription>
        <IconBar />
      </CardHeader>
      <CardContent>
        <div className="mt-8 p-4">{renderStepContent()}</div>
      </CardContent>
      <CardFooter className=" flex flex-col w-full">
        <BottomBar />
      </CardFooter>
    </div>
  );
}

export default Stepper;

import { Button } from "@/components/ui/button";
import useUpdateUserStore from "@/hooks/stepper-user-update-hook";
import { useSession } from "next-auth/react";

type Props = {};

const BottomBar = (props: Props) => {
  const { index, nextStep, prevStep, loading } = useUpdateUserStore();
  const { data } = useSession();

  return (
    <>
      {" "}
      {index === 3 &&
      data?.user?.personalInfo !== null &&
      data?.user?.familyDetail !== null &&
      data?.user?.previousAcademics !== null ? (
        <Button>Submit Your Form</Button>
      ) : (
        ""
      )}
      <div className="flex p-2 mt-4 w-full">
        {index !== 0 && (
          <Button className="bg-primary" variant={"outline"} onClick={prevStep}>
            Previous
          </Button>
        )}
        <div className="flex-auto flex flex-row-reverse">
          {index < 3 && (
            <Button
              disabled={loading}
              className="bg-primary"
              variant={"outline"}
              onClick={nextStep}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default BottomBar;

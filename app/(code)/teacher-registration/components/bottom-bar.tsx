import { teacherIsInProcess } from "@/actions/handleUserFor";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import useCelebration from "@/hooks/celebration";
import useStore from "@/hooks/loader-hook";
import useUpdateUserStore from "@/hooks/stepper-user-update-hook";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};

const BottomBar = (props: Props) => {
  const router = useRouter();
  const { index, nextStep, prevStep, loading } = useUpdateUserStore();
  const { data, update } = useSession();
  const { setCelebration } = useCelebration();
  const { setLoading } = useStore();
  const lastStep = () => {
    setLoading(true);
    teacherIsInProcess()
      .then((res) => {
        setCelebration(true);
        update({ res });
        toast({
          title: res.message,
          description: `Congrats ${res.user?.name}`,
        });
        setLoading(false);
        router.push("/");
      })
      .catch((res) => {
        console.log(`🚀 ~ res:`, res);
        toast({
          title: res.message,
          description: "Something went wrong",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {" "}
      {index === 3 &&
      data?.user?.personalInfo !== null &&
      data?.user?.familyDetail !== null &&
      data?.user?.previousAcademics.length !== 0 ? (
        <Button onClick={lastStep}>Now You Can Apply For Teacher</Button>
      ) : (
        ""
      )}
      {/* <div className="flex p-2 mt-4 w-full">
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
      </div> */}
    </>
  );
};

export default BottomBar;

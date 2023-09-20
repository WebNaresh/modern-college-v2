import { Button } from "@/components/ui/button";

type Props = {
  handlePrevious: () => void;
  handleNext: () => void;
  currentStep: number;
};

const BottomBar = ({ handleNext, handlePrevious, currentStep }: Props) => {
  return (
    <>
      {" "}
      <div className="flex p-2 mt-4 w-full">
        <Button
          className="bg-background"
          variant={"ghost"}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <div className="flex-auto flex flex-row-reverse">
          {currentStep < 4 && (
            <Button
              className="bg-background"
              variant={"ghost"}
              onClick={handleNext}
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

"use client";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { AverageResult, Feedback, Performance } from "@prisma/client";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import MiniForm from "./mini-form";
import MiniForm2 from "./mini-form-2";
import MiniForm3 from "./mini-form-3";

type Props = {
  user: Session;
  performance: Performance & {
    teachingAndLearning: AverageResult[];
    feedback: Feedback | null;
  };
};
export type AcademicAppraisel = {
  id?: string;
  nameOfSubject: string;
  level: "UG" | "PG";
  courseHead: "TH" | "PR" | "T";
  term: "I" | "II";
  year: "Current" | "Previous";
  hoursAlloted: number;
  classConducted: number;
  result: number;
  performanceId?: string;
};
const FormDetails = ({ user, performance }: Props) => {
  const [academicAppraisel, setAcademicAppraisel] = useState<
    AcademicAppraisel[]
  >(performance.teachingAndLearning);
  const [arrayOfECD, setArrayOfECD] = useState<string[]>(
    performance.effectiveCurriculamEfforts
  );

  const router = useRouter();
  if (user === undefined) {
    router.push("/login");
  }

  const { toast } = useToast();
  const onSubmit = async () => {
    console.log("hello");
  };

  const deleteFromArray = async (i: number) => {
    // Make sure the index is within the valid range of the array
    if (i < 0 || i >= academicAppraisel.length) {
      return;
    }

    // Clone the original array to avoid mutating it directly
    const newArray = [...academicAppraisel];

    // Remove the element at index i from the cloned array
    const deletedItem = newArray.splice(i, 1)[0];

    // Update the state with the new array (if you're using React)
    setAcademicAppraisel(newArray);

    // Check if the deleted item has an 'id' property and perform an API delete
    if (deletedItem && deletedItem.id) {
      // setLoading(true);
      try {
        // Assuming you have a function called 'deleteFamilyItem' that makes the API call
        // let res = await deleteFamilyItem(deletedItem);
        // update({ data: academicAppraisel });
        // if (res?.user) {
        //   // Show a success toast when the item is successfully deleted
        //   toast({
        //     title: "Success!",
        //     description: "Item deleted successfully.",
        //   });
        // } else {
        //   // Show an error toast when the delete operation fails
        //   toast({
        //     title: "Error!",
        //     description: "Failed to delete item. Please try again later.",
        //     variant: "destructive", // Use "destructive" variant for error messages
        //   });
        // }
      } catch (error) {
        // Handle the error appropriately

        // Show an error toast when the delete operation fails
        toast({
          title: "Error!",
          description: "Failed to delete item. Please try again later.",
          variant: "destructive", // Use "destructive" variant for error messages
        });
      } finally {
        // setLoading(false);
      }
    }
  };
  const deleteFromECDArray = async (i: number) => {
    // Make sure the index is within the valid range of the array
    if (i < 0 || i >= arrayOfECD.length) {
      return;
    }

    // Clone the original array to avoid mutating it directly
    const newCopyRightsArray = [...arrayOfECD];

    // Remove the element at index i from the cloned array
    const deletedCopyRightsItem = newCopyRightsArray.splice(i, 1)[0];

    // Update the state with the new array (if you're using React)
    setArrayOfECD(newCopyRightsArray);

    // Check if the deleted item has an 'id' property and perform an API delete
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-full flex-col flex gap-4">
        <MiniForm setAcademicAppraisel={setAcademicAppraisel} />
        <div className="rounded-lg w-full overflow-auto mb-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-left">Term</TableHead>
                <TableHead className="text-left">Year</TableHead>
                <TableHead className="text-left">Result</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {academicAppraisel?.map((e, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-left">
                      {e.nameOfSubject}
                    </TableCell>
                    <TableCell className="font-medium text-left">
                      {e.term}
                    </TableCell>
                    <TableCell className="font-medium text-left">
                      {e.year}
                    </TableCell>
                    <TableCell className="text-left">{e.result}%</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={"ghost"}
                        type="button"
                        size={"icon"}
                        onClick={() => deleteFromArray(i)}
                      >
                        <MdDelete className="text-lg" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="w-full flex flex-col pt-8 gap-4">
        <MiniForm2 setArrayOfECD={setArrayOfECD} />
        <div className="rounded-lg w-full overflow-auto mb-10">
          <Table>
            {/* <TableCaption>
            Minimum 1 subject of current Year and 1 subject of previous Year
            Cumplsory
          </TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Sr No .</TableHead>
                <TableHead className="text-left">
                  Effective Curriculum Delivery
                </TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {arrayOfECD?.map((e, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-left">
                      {i + 1}
                    </TableCell>
                    <TableCell className="font-medium text-left">{e}</TableCell>

                    <TableCell className="text-center">
                      <Button
                        variant={"ghost"}
                        type="button"
                        size={"icon"}
                        onClick={() => deleteFromECDArray(i)}
                      >
                        <MdDelete className="text-lg" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="w-full flex-col flex gap-4 py-8">
        <div className="w-full">
          <CardTitle>Academic-Evaluation</CardTitle>
          <CardDescription>Average-Feedback</CardDescription>
        </div>
        <MiniForm3
          academicAppraisel={academicAppraisel}
          arrayOfECD={arrayOfECD}
          feedback={performance?.feedback}
          performance={performance}
        />
      </div>
    </div>
  );
};

export default FormDetails;

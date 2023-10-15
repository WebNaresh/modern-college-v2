"use client";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import useStore from "@/hooks/loader-hook";
import { Activity, Performance, Responsibility } from "@prisma/client";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import MiniForm from "./mini-form";
import MiniForm2 from "./mini-form.2";

type Props = {
  user: Session;
  performance: Performance & {
    activities: Activity[];
    responsibilities: Responsibility[];
  };
};
const Envolvement = ({ user, performance }: Props) => {
  type Activity = {
    id?: string;
    name: string;
    duration: string;
    type: "ExtraCurricular" | "CoCurricular";
    performanceId?: string;
  };
  type Responsibility = {
    id?: string;
    natureOfWork: string;
    level: "Department" | "Institute";
    performanceId?: string;
  };
  const [activity, setActivity] = useState<Activity[]>(performance.activities);
  const [responsibility, setResponsibility] = useState<Responsibility[]>(
    performance.responsibilities
  );
  const router = useRouter();
  if (user === undefined) {
    router.push("/login");
  }

  const { toast } = useToast();
  const { loading, setLoading } = useStore();
  const onSubmit = async () => {
    console.log("hello");

    console.log(activity);
  };
  const deleteFromArray = async (i: number) => {
    // Make sure the index is within the valid range of the array
    if (i < 0 || i >= activity.length) {
      return;
    }

    // Clone the original array to avoid mutating it directly
    const newArray = [...activity];

    // Remove the element at index i from the cloned array
    const deletedItem = newArray.splice(i, 1)[0];

    // Update the state with the new array (if you're using React)
    setActivity(newArray);

    // Check if the deleted item has an 'id' property and perform an API delete
    if (deletedItem && deletedItem.id) {
      setLoading(true);
      try {
        // Assuming you have a function called 'deleteFamilyItem' that makes the API call
        // let res = await deleteFamilyItem(deletedItem);
        // update({ data: activity });
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
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex-col flex items-center">
      <MiniForm setActivity={setActivity} />
      <div className="rounded-lg w-full overflow-auto mb-10">
        <Table>
          <TableCaption>
            Minimum 1 subject of current Year and 1 subject of previous Year
            Cumplsory
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Activity Name</TableHead>
              <TableHead className="text-left">Duration</TableHead>
              <TableHead className="text-left">Type</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activity?.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium text-left">
                    {e.name}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.duration}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.type}
                  </TableCell>
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
      <div className="w-full my-4 flex gap-4 flex-col">
        <CardTitle>Major Responsibilities Handled</CardTitle>
        <CardDescription>At Department/Institute level</CardDescription>
      </div>
      <MiniForm2 setResponsibility={setResponsibility} />
      <div className="rounded-lg w-full overflow-auto">
        <Table>
          <TableCaption>
            Minimum 1 subject of current Year and 1 subject of previous Year
            Cumplsory
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Nature of Work</TableHead>
              <TableHead className="text-left">Level of Work</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responsibility?.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium text-left">
                    {e.natureOfWork}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.level}
                  </TableCell>
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

      <Button
        onClick={onSubmit}
        disabled={!(activity.length > 0)}
        className="m-10 text-center w-fit"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default Envolvement;

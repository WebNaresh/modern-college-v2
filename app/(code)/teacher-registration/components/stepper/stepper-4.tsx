"use client";
import {
  deleteAcademicsItem,
  updatePreviousAcademics,
} from "@/actions/handleUserFor";
import { Button } from "@/components/ui/button";
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
import { PreviousAcademic } from "@/lib/interface";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import MiniForm2 from "./components/stepper-4-form";

type Props = {
  session: Session | null;
};

const UserInfo4 = (props: Props) => {
  const { data, update } = useSession();
  const [arrayOfAccademics, setArrayOfAcademics] = useState<PreviousAcademic[]>(
    data?.user?.previousAcademics!
  );

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await updatePreviousAcademics(arrayOfAccademics);
      console.log(`🚀 ~ res:`, res);

      // Show a success toast when the update is successful
      if (res.user) {
        toast({
          title: "Success!",
          description: "Previous Academics details updated successfully.",
        });

        update({ data: arrayOfAccademics });
        setLoading(false);
      } else {
        setLoading(false);
        toast({
          title: "Error!",
          description:
            "Failed to update Previous Academics details. Please try again later.",
          variant: "destructive", // You may need to adjust this based on your toast component's configuration
        });
      }
    } catch (error) {
      // Show an error toast if the update fails
      toast({
        title: "Error!",
        description:
          "Failed to update Previous Academics details. Please try again later.",
        variant: "destructive", // You may need to adjust this based on your toast component's configuration
      });
      setLoading(false);
    }
  };
  const deleteFromArray = async (i: number) => {
    // Make sure the index is within the valid range of the array
    if (i < 0 || i >= arrayOfAccademics.length) {
      return;
    }

    // Clone the original array to avoid mutating it directly
    const newArray = [...arrayOfAccademics];

    // Remove the element at index i from the cloned array
    const deletedItem = newArray.splice(i, 1)[0];

    // Update the state with the new array (if you're using React)
    setArrayOfAcademics(newArray);

    // Check if the deleted item has an 'id' property and perform an API delete
    if (deletedItem && deletedItem.id) {
      setLoading(true);
      try {
        // Assuming you have a function called 'deletePreviouse Academics Item' that makes the API call
        let res = await deleteAcademicsItem(deletedItem);
        update({ data: arrayOfAccademics });
        if (res?.user) {
          // Show a success toast when the item is successfully deleted
          toast({
            title: "Success!",
            description: "Item deleted successfully.",
          });
        } else {
          // Show an error toast when the delete operation fails
          toast({
            title: "Error!",
            description: "Failed to delete item. Please try again later.",
            variant: "destructive", // Use "destructive" variant for error messages
          });
        }
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
    <>
      <div className="grid place-items-center w-full">
        <MiniForm2 setArrayOfAcademics={setArrayOfAcademics} />
        <form onSubmit={onSubmit} className="grid place-items-center w-full">
          <Table>
            <TableCaption>
              Previouse Academics Member Details you must have add 2 entry here
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">College Name</TableHead>
                <TableHead className="text-right">Percentage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(arrayOfAccademics || data?.user?.previousAcademics!)?.map(
                (e, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {e.collegeName}
                      </TableCell>
                      <TableCell className="text-right">
                        {e.percentage}
                      </TableCell>
                      <TableCell className="text-right">
                        {" "}
                        <Button
                          type="button"
                          size={"icon"}
                          onClick={() => deleteFromArray(i)}
                        >
                          <MdDelete className="text-lg" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
          <Button
            type="submit"
            className="mt-4"
            disabled={
              !(arrayOfAccademics?.length >= 2) ||
              arrayOfAccademics.length <= data?.user?.previousAcademics?.length!
            }
          >
            Save changes
          </Button>
        </form>
      </div>
    </>
  );
};

export default UserInfo4;

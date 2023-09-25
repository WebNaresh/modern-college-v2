"use client";
import { deleteFamilyItem, updateFamilyDetails } from "@/actions/handleUserFor";
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
import { toast } from "@/components/ui/use-toast";
import useStore from "@/hooks/loader-hook";
import useUpdateUserStore from "@/hooks/stepper-user-update-hook";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import MiniForm from "./components/stepper-3-form";

type Props = {
  session: Session | null;
};
type UserForm1Values = {
  id?: string;
  occupation: string;
  contact: string;
  name: string;
  relationName: string;
  address: string;
};

const UserInfo3 = (props: Props) => {
  const { data, update } = useSession();
  const [arrayOfFamily, setArrayOfFamily] = useState<UserForm1Values[]>(
    data?.user?.familyDetail || []
  );
  const { nextStep } = useUpdateUserStore();

  const { setLoading } = useStore();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await updateFamilyDetails(arrayOfFamily);

      // Show a success toast when the update is successful
      if (res.user) {
        toast({
          title: "Success!",
          description: "Family details updated successfully.",
        });

        update({ data: arrayOfFamily });
        setLoading(false);
        nextStep();
      } else {
        setLoading(false);
      }
    } catch (error) {
      // Show an error toast if the update fails
      toast({
        title: "Error!",
        description: "Failed to update family details. Please try again later.",
        variant: "destructive", // You may need to adjust this based on your toast component's configuration
      });
      setLoading(false);
    }
  };
  const deleteFromArray = async (i: number) => {
    // Make sure the index is within the valid range of the array
    if (i < 0 || i >= arrayOfFamily.length) {
      return;
    }

    // Clone the original array to avoid mutating it directly
    const newArray = [...arrayOfFamily];

    // Remove the element at index i from the cloned array
    const deletedItem = newArray.splice(i, 1)[0];

    // Update the state with the new array (if you're using React)
    setArrayOfFamily(newArray);

    // Check if the deleted item has an 'id' property and perform an API delete
    if (deletedItem && deletedItem.id) {
      setLoading(true);
      try {
        // Assuming you have a function called 'deleteFamilyItem' that makes the API call
        let res = await deleteFamilyItem(deletedItem);
        update({ data: arrayOfFamily });
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
        <MiniForm setArrayOfFamily={setArrayOfFamily} />
        <form onSubmit={onSubmit} className="grid place-items-center w-full">
          <Table>
            <TableCaption>
              Family Member Details you must have add 2 entry here
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead>Relation</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(arrayOfFamily || data?.user?.familyDetail)?.map((e, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>{e.relationName}</TableCell>
                    <TableCell className="text-right">
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
              })}
            </TableBody>
          </Table>
          <Button
            type="submit"
            className="mt-4"
            disabled={
              !(arrayOfFamily?.length >= 2) ||
              arrayOfFamily.length <= data?.user?.familyDetail?.length!
            }
          >
            Save changes
          </Button>
        </form>
      </div>
    </>
  );
};

export default UserInfo3;

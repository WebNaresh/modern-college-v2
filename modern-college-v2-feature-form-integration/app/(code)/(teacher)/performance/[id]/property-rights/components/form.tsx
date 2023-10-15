"use client";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import useStore from "@/hooks/loader-hook";
import {
  CopyRights,
  ExaminationDuty,
  Patent,
  Performance,
  TradeMarks,
} from "@prisma/client";
import { format } from "date-fns";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import MiniForm from "./mini-form";
import MiniForm2 from "./mini-form.2";

type Props = {
  user: Session;
  performance: Performance & {
    intellectualPropertyRights: {
      patents: Patent[];
      copyRights: CopyRights[];
      tradeMarks: TradeMarks[];
    } | null;
    examinationDuties: ExaminationDuty | null;
  };
};
const PropertyRightForm = ({ user, performance }: Props) => {
  type Patents = {
    id?: string;
    status: "Applied" | "NotApplied";
    dateOfAppliedGranted: Date;
    commercialized: boolean;
    intellectualPropertyRightId?: string;
  };

  // Publication Array
  const [arrayOfPatents, setArrayOfPatents] = useState<Patents[]>([]);

  // CopyRights Array
  const [arrayOfCopyRights, setArrayOfCopyRights] = useState<Patents[]>([]);

  // TradeMark Array
  const [arrayOfTradeMark, setArrayOfTradeMark] = useState<Patents[]>([]);

  const router = useRouter();
  if (user === undefined) {
    router.push("/login");
  }

  const { toast } = useToast();

  const { loading, setLoading } = useStore();
  const onSubmit = async () => {
    console.log("hello");

    console.log(arrayOfPatents);
    console.log(arrayOfCopyRights);
    console.log(arrayOfTradeMark);
  };

  const deleteFromArray = async (i: number) => {
    // Make sure the index is within the valid range of the array
    if (i < 0 || i >= arrayOfPatents.length) {
      return;
    }

    // Clone the original array to avoid mutating it directly
    const newArray = [...arrayOfPatents];

    // Remove the element at index i from the cloned array
    const deletedItem = newArray.splice(i, 1)[0];

    // Update the state with the new array (if you're using React)
    setArrayOfPatents(newArray);

    // Check if the deleted item has an 'id' property and pCerform an API delete
    if (deletedItem && deletedItem.id) {
      setLoading(true);
      try {
        // Assuming you have a function called 'deleteFamilyItem' that makes the API call
        // let res = await deleteFamilyItem(deletedItem);
        // update({ data: arrayOfPublications });
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

  // TODO Delete for copyrights from
  const deleteFromCopyRightsArray = async (i: number) => {
    // Make sure the index is within the valid range of the array
    if (i < 0 || i >= arrayOfCopyRights.length) {
      return;
    }

    // Clone the original array to avoid mutating it directly
    const newCopyRightsArray = [...arrayOfCopyRights];

    // Remove the element at index i from the cloned array
    const deletedCopyRightsItem = newCopyRightsArray.splice(i, 1)[0];

    // Update the state with the new array (if you're using React)
    setArrayOfCopyRights(newCopyRightsArray);

    // Check if the deleted item has an 'id' property and perform an API delete
    if (deletedCopyRightsItem && deletedCopyRightsItem.id) {
      setLoading(true);
      try {
        // Assuming you have a function called 'deleteFamilyItem' that makes the API call
        // let res = await deleteFamilyItem(deletedItem);
        // update({ data: arrayOfPublications });
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

  // TODO Delete for copyrights from
  const deleteFromTradeMarkArray = async (i: number) => {
    // Make sure the index is within the valid range of the array
    if (i < 0 || i >= arrayOfTradeMark.length) {
      return;
    }

    // Clone the original array to avoid mutating it directly
    const newTradeMarkArray = [...arrayOfTradeMark];

    // Remove the element at index i from the cloned array
    const deletedTradeMarkItem = newTradeMarkArray.splice(i, 1)[0];

    // Update the state with the new array (if you're using React)
    setArrayOfTradeMark(newTradeMarkArray);

    // Check if the deleted item has an 'id' property and perform an API delete
    if (deletedTradeMarkItem && deletedTradeMarkItem.id) {
      setLoading(true);
      try {
        // Assuming you have a function called 'deleteFamilyItem' that makes the API call
        // let res = await deleteFamilyItem(deletedItem);
        // update({ data: arrayOfPublications });
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
  useEffect(() => {
    if (performance.intellectualPropertyRights?.patents !== undefined) {
      setArrayOfPatents(performance.intellectualPropertyRights?.patents);
    }
    if (performance.intellectualPropertyRights?.copyRights !== undefined) {
      setArrayOfCopyRights(performance.intellectualPropertyRights?.copyRights);
    }
    if (performance.intellectualPropertyRights?.tradeMarks !== undefined) {
      setArrayOfTradeMark(performance.intellectualPropertyRights?.tradeMarks);
    }
  }, []);

  return (
    <div className="flex-col flex items-center">
      <MiniForm arrayOfPublications={setArrayOfPatents} />
      <div className="rounded-lg w-full overflow-auto mb-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Sr No .</TableHead>
              <TableHead className="text-left">Status</TableHead>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {arrayOfPatents?.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium text-left">
                    {i + 1}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.status}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {format(new Date(e.dateOfAppliedGranted), "PPP")}
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
      <div className="w-full my-4">
        <CardTitle>Copyrights</CardTitle>
        {/* <CardDescription>Faculty Performance Evaluation </CardDescription> */}
      </div>
      <MiniForm arrayOfPublications={setArrayOfCopyRights} />
      <div className="rounded-lg w-full overflow-auto mb-10">
        <Table>
          {/* <TableCaption>
            Minimum 1 subject of current Year and 1 subject of previous Year
            Cumplsory
          </TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Sr No .</TableHead>
              <TableHead className="text-left">Status</TableHead>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {arrayOfCopyRights?.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium text-left">
                    {i + 1}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.status}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {format(new Date(e.dateOfAppliedGranted), "PPP")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant={"ghost"}
                      type="button"
                      size={"icon"}
                      onClick={() => deleteFromCopyRightsArray(i)}
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

      <div className="w-full my-4">
        <CardTitle>Trademarks</CardTitle>
        {/* <CardDescription>Faculty Performance Evaluation </CardDescription> */}
      </div>
      <MiniForm arrayOfPublications={setArrayOfTradeMark} />
      <div className="rounded-lg w-full overflow-auto mb-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Sr No .</TableHead>
              <TableHead className="text-left">Status</TableHead>
              <TableHead className="text-left">Commetcialiazed</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {arrayOfTradeMark?.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium text-left">
                    {i + 1}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.status}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {format(new Date(e.dateOfAppliedGranted), "PPP")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant={"ghost"}
                      type="button"
                      size={"icon"}
                      onClick={() => deleteFromTradeMarkArray(i)}
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

      <div className="w-full my-4">
        <CardTitle className="text-muted">
          Examination Duties Assigned & Performed{" "}
        </CardTitle>
      </div>

      <MiniForm2 examinationDuties={performance.examinationDuties} />
      <Button
        onClick={onSubmit}
        // disabled={!(arrayOfPublications.length > 0)}
        className="m-10 text-center w-fit"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default PropertyRightForm;

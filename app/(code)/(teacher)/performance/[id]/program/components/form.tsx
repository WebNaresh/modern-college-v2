"use client";
import { pEFormStep4 } from "@/actions/teacherActions";
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
import useCelebration from "@/hooks/celebration";
import useStore from "@/hooks/loader-hook";
import {
  Performance,
  ProgramsAttended,
  ProgramsOrganized,
} from "@prisma/client";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import MiniForm from "./mini-form";
import MiniForm2 from "./mini-form.2";

type Props = {
  user: Session;
  performance: Performance & {
    programsOrganized: ProgramsOrganized[];
    programsAttended: ProgramsAttended[];
  };
};
export type ProgramOrganized = {
  id?: string;
  title: string;
  duration: string;
  performanceId?: string;
};
export type ProgramAttended = {
  id?: string;
  title: string;
  duration: string;
  place: string;
  organizerName: string;
  performanceId?: string;
};
const PublicationForm = ({ performance, user }: Props) => {
  const [programAttended, setProgramAttended] = useState<ProgramAttended[]>(
    performance.programsAttended
  );
  const [programOrganized, setProgramOrganized] = useState<ProgramOrganized[]>(
    performance.programsOrganized
  );
  const router = useRouter();
  if (user === undefined) {
    router.push("/login");
  }

  const { toast } = useToast();
  const { loading, setLoading } = useStore();
  const { setCelebration } = useCelebration();
  const onSubmit = async () => {
    console.log("hello");
    setLoading(true);
    const newPeform = await pEFormStep4({
      programOrganized,
      programAttended,
      performanceId: performance.id,
    }).then(async ({ message, status }) => {
      console.log(`🚀 ~  message, status :`, message, status);
      status = await status;
      toast({
        title: message,
      });
      if (status === true) {
        setLoading(false);
        setCelebration(true);
        router.push(`/performance/${performance.id}/evaluation`);
      } else {
        setLoading(false);
      }
    });
    console.log(programAttended);
  };
  const deleteFromArray = async (i: number) => {
    // Make sure the index is within the valid range of the array
    if (i < 0 || i >= programAttended.length) {
      return;
    }

    // Clone the original array to avoid mutating it directly
    const newArray = [...programAttended];

    // Remove the element at index i from the cloned array
    const deletedItem = newArray.splice(i, 1)[0];

    // Update the state with the new array (if you're using React)
    setProgramAttended(newArray);

    // Check if the deleted item has an 'id' property and perform an API delete
    if (deletedItem && deletedItem.id) {
      setLoading(true);
      try {
        // Assuming you have a function called 'deleteFamilyItem' that makes the API call
        // let res = await deleteFamilyItem(deletedItem);
        // update({ data: programAttended });
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
      <MiniForm programAttended={setProgramAttended} />
      <div className="rounded-lg w-full overflow-auto mb-10">
        <Table>
          <TableCaption>
            Minimum 1 subject of current Year and 1 subject of previous Year
            Cumplsory
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Title</TableHead>
              <TableHead className="text-left">Place</TableHead>
              <TableHead className="text-left">Duration</TableHead>
              <TableHead className="text-left">Organizer Name</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programAttended?.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium text-left">
                    {e.title}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.place}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.duration}
                  </TableCell>
                  <TableCell className="text-left">{e.organizerName}</TableCell>
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
      <div className="w-full my-4 gap-2 flex flex-col">
        <CardTitle>Program organized</CardTitle>
        <CardDescription>
          Knowledge enhancement programs organized
        </CardDescription>
      </div>
      <MiniForm2 setProgramOrganized={setProgramOrganized} />
      <div className="rounded-lg w-full overflow-auto">
        <Table>
          <TableCaption>
            Minimum 1 subject of current Year and 1 subject of previous Year
            Cumplsory
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Title</TableHead>
              <TableHead className="text-left">Duration</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programOrganized?.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium text-left">
                    {e.title}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.duration}
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
        disabled={
          !(programAttended.length > 0 && programOrganized.length > 0) ||
          programAttended.length <= performance.programsAttended.length ||
          programOrganized.length <= performance.programsOrganized.length
        }
        className="m-10 text-center w-fit"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default PublicationForm;

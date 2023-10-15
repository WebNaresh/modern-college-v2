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
import {
  ConsultancyService,
  Performance,
  SponsoredResearch,
} from "@prisma/client";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import MiniForm from "./mini-form";
import MiniForm2 from "./mini-form.2";
import useLoader from "@/hooks/loader-hook";
import useCelebration from "@/hooks/celebration";
import { pEFormStep5 } from "@/actions/teacherActions";

type Props = {
  user: Session;
  performance: Performance & {
    sponsoredResearch: SponsoredResearch[];
    consultancyServices: ConsultancyService[];
  };
};

export type SponseredReasearchFormValues = {
  id?: string;
  scheme: string;
  agency: string;
  status: "Awarded" | "Submitted";
  dateOfSubmissionOrAwarded: Date;
  grantReceived: string;
  performanceId?: string;
};
export type ConsultancyServicesFormValues = {
  id?: string;
  natureOfWork: string;
  agency: string;
  workCommendamentDate: Date;
  DateOfCompletion: Date;
  publishingMonthAndYear: string;
  performanceId?: string;
};
const Evaluation = ({ user, performance }: Props) => {
  const [sponseredReasearch, setSponseredReasearch] = useState<
    SponseredReasearchFormValues[]
  >(performance.sponsoredResearch);
  const [consultancyServices, setConsultancyServices] = useState<
    ConsultancyServicesFormValues[]
  >(performance.consultancyServices);
  const router = useRouter();
  const { setLoading } = useLoader();
  const { setCelebration } = useCelebration();
  if (user === undefined) {
    router.push("/login");
  }

  const { toast } = useToast();
  // const { loading, setLoading } = useStore();
  const onSubmit = async () => {
    let status = false;
    console.log("hello");
    setLoading(true);
    try {
      // console.log("hello");
      const form5 = await pEFormStep5({
        sponseredReasearch,
        consultancyServices,
        performanceId: performance.id,
      });

      if (form5?.status === true) {
        toast({
          title: form5.message,
        });
        status = true;
        console.log(form5.message);
        setCelebration(true);
      } else {
        toast({
          title: form5?.message,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (status) {
        router.push("/performance/clnqzjvqy00059m2wyc3fb8w8/property-rights");
      }
      setLoading(false);
    }

    console.log(sponseredReasearch);
  };
  const deleteFromArray = async (i: number) => {
    // Make sure the index is within the valid range of the array
    if (i < 0 || i >= sponseredReasearch.length) {
      return;
    }

    // Clone the original array to avoid mutating it directly
    const newArray = [...sponseredReasearch];

    // Remove the element at index i from the cloned array
    const deletedItem = newArray.splice(i, 1)[0];

    // Update the state with the new array (if you're using React)
    setSponseredReasearch(newArray);

    // Check if the deleted item has an 'id' property and perform an API delete
    if (deletedItem && deletedItem.id) {
      setLoading(true);
      try {
        // Assuming you have a function called 'deleteFamilyItem' that makes the API call
        // let res = await deleteFamilyItem(deletedItem);
        // update({ data: sponseredReasearch });
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
      <MiniForm setSponseredReasearch={setSponseredReasearch} />
      <div className="rounded-lg w-full overflow-auto mb-10">
        <Table>
          <TableCaption>
            Minimum 1 subject of current Year and 1 subject of previous Year
            Cumplsory
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Scheme</TableHead>
              <TableHead className="text-left">Agency</TableHead>
              <TableHead className="text-left">Status</TableHead>
              <TableHead className="text-left">
                Date of Submission/Awarded.
              </TableHead>
              <TableHead className="text-left">Grant-Received</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sponseredReasearch?.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium text-left">
                    {e.scheme}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.agency}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.status}
                  </TableCell>
                  <TableCell className="text-left">
                    {e.dateOfSubmissionOrAwarded.toString()}
                  </TableCell>
                  <TableCell className="text-left">{e.grantReceived}</TableCell>
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
        <CardTitle>Consultancy/Internal Revenue Generation (IRG)</CardTitle>
        <CardDescription>Faculty Performance Evaluation </CardDescription>
      </div>
      <MiniForm2 setConsultancyServices={setConsultancyServices} />
      <div className="rounded-lg w-full overflow-auto">
        <Table>
          <TableCaption>
            Minimum 1 subject of current Year and 1 subject of previous Year
            Cumplsory
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Nature of Work</TableHead>
              <TableHead className="text-left">Agency</TableHead>
              <TableHead className="text-left">WC-Date</TableHead>
              <TableHead className="text-center">D-O-C</TableHead>
              <TableHead className="text-left">
                publishing Month And Year
              </TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultancyServices?.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium text-left">
                    {e.natureOfWork}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.agency}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.workCommendamentDate.toString()}
                  </TableCell>
                  <TableCell className="text-left">
                    {e.DateOfCompletion.toString()}
                  </TableCell>
                  <TableCell className="text-left">
                    {e.publishingMonthAndYear}%
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
          !(sponseredReasearch.length > performance.sponsoredResearch.length) ||
          !(consultancyServices.length > performance.consultancyServices.length)
        }
        className="m-10 text-center w-fit"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default Evaluation;

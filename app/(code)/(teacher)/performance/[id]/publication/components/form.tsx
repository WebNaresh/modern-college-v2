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
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import MiniForm from "./mini-form";
import MiniForm2 from "./mini-form.2";

type Props = {
  user: Session;
};
const PublicationForm = (props: Props) => {
  type PublicationValues = {
    id?: string;
    paperTitle: string;
    level: "State" | "Local" | "International" | "National";
    name: string;
    issnNo: number;
    isMainAuthor: boolean;
    indexedIn: string;
  };
  type BookValues = {
    id?: string;
    title: string;
    titleWithPageNo: string;
    isbnNo: number;
    detailOfCoAuthors: string;
    publishedMonthAndYear: string;
  };
  const [arrayOfPublications, setArrayOfPublications] = useState<
    PublicationValues[]
  >([]);
  const [arrayOfBooks, setArrayOfBooks] = useState<BookValues[]>([]);
  const router = useRouter();
  if (props.user === undefined) {
    router.push("/login");
  }

  const { toast } = useToast();
  const { loading, setLoading } = useStore();
  const onSubmit = async () => {
    console.log("hello");

    console.log(arrayOfPublications);
  };
  const deleteFromArray = async (i: number) => {
    // Make sure the index is within the valid range of the array
    if (i < 0 || i >= arrayOfPublications.length) {
      return;
    }

    // Clone the original array to avoid mutating it directly
    const newArray = [...arrayOfPublications];

    // Remove the element at index i from the cloned array
    const deletedItem = newArray.splice(i, 1)[0];

    // Update the state with the new array (if you're using React)
    setArrayOfPublications(newArray);

    // Check if the deleted item has an 'id' property and perform an API delete
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

  return (
    <div className="flex-col flex items-center">
      <MiniForm arrayOfPublications={setArrayOfPublications} />
      <div className="rounded-lg w-full overflow-auto mb-10">
        <Table>
          <TableCaption>
            Minimum 1 subject of current Year and 1 subject of previous Year
            Cumplsory
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Paper Title</TableHead>
              <TableHead className="text-left">Paper Level</TableHead>
              <TableHead className="text-left">Name Of journal</TableHead>
              <TableHead className="text-left">ISSN No.</TableHead>
              <TableHead className="text-left">indexed in</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {arrayOfPublications?.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium text-left">
                    {e.paperTitle}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.level}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.name}
                  </TableCell>
                  <TableCell className="text-left">{e.issnNo}</TableCell>
                  <TableCell className="text-left">{e.indexedIn}</TableCell>
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
        <CardTitle>Academic-Evaluation</CardTitle>
        <CardDescription>Average-Feedback</CardDescription>
      </div>
      <MiniForm2 setArrayOfBooks={setArrayOfBooks} />
      <div className="rounded-lg w-full overflow-auto">
        <Table>
          <TableCaption>
            Minimum 1 subject of current Year and 1 subject of previous Year
            Cumplsory
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Title</TableHead>
              <TableHead className="text-left">Title with page No</TableHead>
              <TableHead className="text-left">ISSBN No</TableHead>
              <TableHead className="text-center">
                Published Month and year
              </TableHead>
              <TableHead className="text-left">Co-Authors</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {arrayOfBooks?.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium text-left">
                    {e.title}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.titleWithPageNo}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {e.isbnNo}
                  </TableCell>
                  <TableCell className="text-left">
                    {e.publishedMonthAndYear}%
                  </TableCell>
                  <TableCell className="text-left">
                    {e.detailOfCoAuthors}%
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
        disabled={!(arrayOfPublications.length > 0)}
        className="m-10 text-center w-fit"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default PublicationForm;

"use client";
import { pEFormStep3 } from "@/actions/teacherActions";
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
import useLoader from "@/hooks/loader-hook";
import {
  BookArticleChapterPublished,
  Performance,
  PublicationAndJournal,
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
    publications: PublicationAndJournal[];
    booksArticleChpter: BookArticleChapterPublished[];
  };
};
export type PublicationValues = {
  id?: string;
  paperTitle: string;
  level: "State" | "Local" | "International" | "National";
  name: string;
  issnNo: string;
  isMainAuthor: boolean;
  indexedIn: string;
  performanceId?: string;
};
export type BookValues = {
  id?: string;
  title: string;
  titleWithPageNo: string;
  isbnNo: string;
  detailOfCoAuthors: string;
  publishedMonthAndYear: string;
};
const PublicationForm = ({ performance, user }: Props) => {
  const [arrayOfPublications, setArrayOfPublications] = useState<
    PublicationValues[]
  >(performance.publications);
  const [arrayOfBooks, setArrayOfBooks] = useState<BookValues[]>([]);
  const router = useRouter();
  if (user === undefined) {
    router.push("/login");
  }

  const { toast } = useToast();
  const { setLoading, loading } = useLoader();
  const { setCelebration } = useCelebration();
  const onSubmit = async () => {
    console.log("hello");
    const newPeform = await pEFormStep3({
      arrayOfPublications,
      arrayOfBooks,
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
        router.push(`/performance/${performance.id}/program`);
      } else {
        setLoading(false);
      }
    });
    console.log(`🚀 ~ newPeform:`, newPeform);
    console.log(arrayOfPublications);
  };
  const deleteFromArray = async (i: number) => {
    if (i < 0 || i >= arrayOfPublications.length) {
      return;
    }

    const newArray = [...arrayOfPublications];

    const deletedItem = newArray.splice(i, 1)[0];

    setArrayOfPublications(newArray);

    if (deletedItem && deletedItem.id) {
      setLoading(true);
      try {
      } catch (error) {
        toast({
          title: "Error!",
          description: "Failed to delete item. Please try again later.",
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
        <CardTitle>Book-Publication</CardTitle>
        <CardDescription>Faculty Performance Evaluation </CardDescription>
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
        disabled={
          !(arrayOfPublications.length > 0 && arrayOfBooks.length > 0) ||
          arrayOfPublications.length <= performance.publications.length ||
          arrayOfBooks.length <= performance.booksArticleChpter.length
        }
        className="m-10 text-center w-fit"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default PublicationForm;

"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  setArrayOfBooks: React.Dispatch<React.SetStateAction<UserForm1Values[]>>;
};
type UserForm1Values = z.infer<typeof formSchema>;

const formSchema = z.object({
  title: z.string().min(1),
  titleWithPageNo: z.string().min(1),
  isbnNo: z.number().min(0),
  detailOfCoAuthors: z.string().min(1),
  publishedMonthAndYear: z.string().min(1),
});

const MiniForm2 = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      titleWithPageNo: "",
      isbnNo: undefined,
      detailOfCoAuthors: "",
      publishedMonthAndYear: "",
    },
  });
  const onSubmit = async (formData: UserForm1Values) => {
    console.log(`🚀 ~ formData:`, formData);
    // formData.result =
    //   (formData.noOfClassesConducted / formData.noOfAllotedHour) * 100;
    props.setArrayOfBooks((prevArray) => [...prevArray, formData]);
    // form.reset();
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid place-items-center w-full"
        >
          <div className=" flex flex-col md:grid md:grid-cols-2 place-items-center w-full gap-x-4 gap-y-4">
            <FormField
              control={form.control}
              name={"title"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Book title</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        disabled={loading}
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"titleWithPageNo"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Title with Page No</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"isbnNo"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>ISBN Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          form.setValue("isbnNo", parseInt(e.target.value));
                        }}
                        placeholder="Enter 13 digit ISSN No"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"publishedMonthAndYear"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Published Month and Year</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="June 2002" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"detailOfCoAuthors"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Detail of Co-Authors</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Co-Authors" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button
            variant={"outline"}
            type="submit"
            className="m-4 h-14 w-14 rounded-full"
          >
            <MdAdd className="text-primary text-2xl" />
          </Button>
        </form>
      </Form>
    </>
  );
};

export default MiniForm2;

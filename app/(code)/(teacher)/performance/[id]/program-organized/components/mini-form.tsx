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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  programAttended: React.Dispatch<React.SetStateAction<UserForm1Values[]>>;
};
type UserForm1Values = z.infer<typeof formSchema>;

const formSchema = z.object({
  title: z.string().min(1),
  duration: z.string().min(1),
  place: z.string().min(1),
  organizerName: z.string().min(1),
});

const MiniForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      title: "",
      duration: "",
      place: "",
      organizerName: "",
    },
  });

  const onSubmit = async (formData: UserForm1Values) => {
    // formData.result =
    //   (formData.noOfClassesConducted / formData.noOfAllotedHour) * 100;
    props.programAttended((prevArray) => [...prevArray, formData]);
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
                    <FormLabel>Title of STTP/FDP/WorkShop/Programs</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
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
              name={"place"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Place of Program</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="place" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"duration"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Duration of the program</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="2 weeks..."
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
              name={"organizerName"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Organizer Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Organizer" />
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

export default MiniForm;

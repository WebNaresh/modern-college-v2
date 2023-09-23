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
  setArrayOfAcademics: React.Dispatch<React.SetStateAction<UserForm1Values[]>>;
};
type UserForm1Values = z.infer<typeof formSchema>;
const formSchema = z.object({
  boardUniversity: z.string().min(1),
  collegeName: z.string().min(1),
  courseName: z.string().min(1),
  passingYear: z.string().min(10),
  percentage: z.string().min(2),
});

const MiniForm2 = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boardUniversity: "",
      collegeName: "",
      courseName: "",
      passingYear: "",
      percentage: "",
    },
  });
  const onSubmit = async (formData: UserForm1Values) => {
    console.log(`🚀 ~ formData:`, formData);
    props.setArrayOfAcademics((prevArray) => [...prevArray, formData]);
    // form.reset();
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid place-items-center w-full"
        >
          <div className="grid place-items-center w-[70%]">
            <FormField
              control={form.control}
              name={"boardUniversity"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Your Board/University</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        disabled={loading}
                        placeholder="Board / University"
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
              name={"collegeName"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="College name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"courseName"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Course Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Course name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"passingYear"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Passing Year</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Passing year" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"percentage"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Percentage here </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Don't add % sign" />
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

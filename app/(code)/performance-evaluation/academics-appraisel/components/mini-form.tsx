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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePercentage } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  arrayOfPreviousYear: React.Dispatch<React.SetStateAction<UserForm1Values[]>>;
};
type UserForm1Values = z.infer<typeof formSchema>;
const formSchema = z.object({
  name: z.string().min(1),
  level: z.enum(["UG", "PG"]),
  courseHead: z.enum(["TH", "PR", "T"]),
  noOfAllotedHour: z.number({
    required_error: "Mobile number is required",
    invalid_type_error: " number must be type of a number",
  }),
  noOfClassesConducted: z.number(),
  result: z.number(),
});

const MiniForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      level: undefined,
      courseHead: undefined,
      noOfAllotedHour: 0,
      noOfClassesConducted: 0,
      result: 0,
    },
  });
  console.log(
    `🚀 ~ formData:`,
    (form.getValues("noOfClassesConducted") /
      form.getValues("noOfAllotedHour")) *
      100
  );
  const onSubmit = async (formData: UserForm1Values) => {
    formData.result =
      (formData.noOfClassesConducted / formData.noOfAllotedHour) * 100;
    props.arrayOfPreviousYear((prevArray) => [...prevArray, formData]);
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
              name={"name"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Name of subject</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        disabled={loading}
                        placeholder="Name"
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
              name={"level"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Course level</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Course Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UG">UG</SelectItem>
                          <SelectItem value="PG">PG</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"courseHead"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Course head</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Course-Head" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TH">TH</SelectItem>
                          <SelectItem value="PR">PR</SelectItem>
                          <SelectItem value="T">T</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"noOfAllotedHour"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Hours alloted</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        ref={field.ref}
                        disabled={field.disabled}
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          if (e.target.value !== "" && e.target.value !== "0") {
                            const value =
                              (form.getValues("noOfClassesConducted") /
                                form.getValues("noOfAllotedHour")) *
                              100;
                            form.setValue("result", value);
                            console.log(e);

                            form.setValue(
                              "noOfAllotedHour",
                              parseInt(e.target.value)
                            );
                          } else {
                            form.setValue("noOfAllotedHour", 0);
                          }
                        }}
                        placeholder="Number of hour alloted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name={"noOfClassesConducted"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Hours counducted</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        ref={field.ref}
                        disabled={field.disabled}
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          if (e.target.value !== "" && e.target.value !== "0") {
                            const value =
                              (form.getValues("noOfClassesConducted") /
                                form.getValues("noOfAllotedHour")) *
                              100;
                            form.setValue("result", value);
                            console.log(e);

                            form.setValue(
                              "noOfClassesConducted",
                              parseInt(e.target.value)
                            );
                          } else {
                            form.setValue("noOfClassesConducted", 0);
                          }
                        }}
                        placeholder="Number of hour conducted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"result"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full relative">
                    <FormLabel>Your result</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          value={
                            (form.getValues("noOfClassesConducted") /
                              form.getValues("noOfAllotedHour")) *
                            100
                          }
                          className="w-full"
                          type="number"
                          disabled
                          placeholder="Result"
                        />
                        <AiOutlinePercentage className="absolute right-2 top-1/2 bottom-1/2 text-input" />
                      </>
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

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
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  setArrayOfExaminationDuties: React.Dispatch<
    React.SetStateAction<UserForm1Values[]>
  >;
};
type UserForm1Values = z.infer<typeof formSchema>;

const formSchema = z.object({
  invigilation: z.enum(["University", "Institute"]),
  evaluation: z.enum(["University", "Institute"]),
  questionpaper: z.enum(["University", "Institute"]),
});

const MiniForm2 = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      invigilation: undefined,
      evaluation: undefined,
      questionpaper: undefined,
    },
  });
  const onSubmit = async (formData: UserForm1Values) => {
    console.log(`🚀 ~ formData:`, formData);
    // formData.result =
    //   (formData.noOfClassesConducted / formData.noOfAllotedHour) * 100;
    props.setArrayOfExaminationDuties((prevArray) => [...prevArray, formData]);
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
              name={"invigilation"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Invigilation, flying squad duties, exam duties
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="University / Insitute" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="University">University</SelectItem>
                          <SelectItem value="Institute">Institute</SelectItem>
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
              name={"evaluation"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Evaluation of Answer Scripts</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="University / Insitute" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="University">University</SelectItem>
                          <SelectItem value="Institute">Institute</SelectItem>
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
              name={"questionpaper"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Question Paper Setting</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="University / Insitute" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="University">University</SelectItem>
                          <SelectItem value="Institute">Institute</SelectItem>
                        </SelectContent>
                      </Select>
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

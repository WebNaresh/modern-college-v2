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
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  setResponsibility: React.Dispatch<
    React.SetStateAction<ResposibilityFormValues[]>
  >;
};
type ResposibilityFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  natureOfWork: z.string().min(1),
  level: z.enum(["Department", "Institute"]),
});

const MiniForm2 = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<ResposibilityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      natureOfWork: "",
      level: undefined,
    },
  });
  const onSubmit = async (formData: ResposibilityFormValues) => {
    // console.log(`🚀 ~ formData:`, formData);
    // formData.result =
    //   (formData.noOfClassesConducted / formData.noOfAllotedHour) * 100;
    props.setResponsibility((prevArray) => [...prevArray, formData]);
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
              name={"natureOfWork"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Nature of Work</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        disabled={loading}
                        placeholder="Nature"
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
                    <FormLabel>
                      {" "}
                      Extra- curricular/ Co-Curricular Activities{" "}
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Type of Activity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Department">Department</SelectItem>
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

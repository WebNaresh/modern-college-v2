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
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  setActivity: React.Dispatch<React.SetStateAction<UserForm1Values[]>>;
};
type UserForm1Values = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(1),
  duration: z.string().min(1),
  type: z.enum(["ExtraCurricular", "CoCurricular"]),
});

const MiniForm = (props: Props) => {
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      duration: "",
      type: undefined,
    },
  });

  const onSubmit = async (formData: UserForm1Values) => {
    // formData.result =
    //   (formData.noOfClassesConducted / formData.noOfAllotedHour) * 100;
    props.setActivity((prevArray) => [...prevArray, formData]);
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
                    <FormLabel>Name of the Activity</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Activity"
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
              name={"duration"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="2 weeks.." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"type"}
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
                          <SelectItem value="ExtraCurricular">
                            ExtraCurricular
                          </SelectItem>
                          <SelectItem value="CoCurricular">
                            CoCurricular
                          </SelectItem>
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

export default MiniForm;

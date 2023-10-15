"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  setSponseredReasearch: React.Dispatch<
    React.SetStateAction<UserForm1Values[]>
  >;
};
type UserForm1Values = z.infer<typeof formSchema>;

const formSchema = z.object({
  scheme: z.string().min(1),
  agency: z.string().min(1),
  status: z.enum(["Awarded", "Submitted"]),
  dateOfSubmissionOrAwarded: z.date(),
  grantReceived: z.string().min(1),
});

const MiniForm = (props: Props) => {
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      scheme: "",
      agency: "",
      status: undefined,
      dateOfSubmissionOrAwarded: undefined,
      grantReceived: "",
    },
  });

  const onSubmit = async (formData: UserForm1Values) => {
    // formData.result =
    //   (formData.noOfClassesConducted / formData.noOfAllotedHour) * 100;
    props.setSponseredReasearch((prevArray) => [...prevArray, formData]);
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
              name={"scheme"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Scheme info</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Scheme"
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
              name={"agency"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Agency Details</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Agency" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"status"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Awarded / Submitted" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Awarded">Awarded</SelectItem>
                          <SelectItem value="Submitted">Submitted</SelectItem>
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
              name="dateOfSubmissionOrAwarded"
              render={({ field }) => (
                <FormItem className="my-4 flex w-full flex-col">
                  <FormLabel> Date of Submission/Awarded.</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger
                      type="button"
                      aria-modal={true}
                      className="flex items-center "
                    >
                      <FormControl>
                        <div
                          className={cn(
                            "w-full pl-3 text-left font-normal flex rounded-sm border-slate-800 border p-2 items-center",
                            !field.value && "text-muted-foreground "
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Date of (Awarded/Submission)</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-card "
                      align="start"
                    >
                      <Calendar
                        captionLayout="dropdown"
                        mode="single"
                        className="z-50"
                        fromYear={1900}
                        toYear={2035}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"grantReceived"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Grant Recieved</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Recieved" />
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

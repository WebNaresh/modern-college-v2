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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  setConsultancyServices: React.Dispatch<
    React.SetStateAction<UserForm1Values[]>
  >;
};
type UserForm1Values = z.infer<typeof formSchema>;

const formSchema = z.object({
  natureOfWork: z.string().min(1),
  agency: z.string().min(1),
  workCommendamentDate: z.date(),
  DateOfCompletion: z.date(),
  publishingMonthAndYear: z.string().min(1),
});

const MiniForm2 = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      natureOfWork: "",
      agency: "",
      workCommendamentDate: undefined,
      DateOfCompletion: undefined,
      publishingMonthAndYear: "",
    },
  });
  const onSubmit = async (formData: UserForm1Values) => {
    console.log(`🚀 ~ formData:`, formData);
    // formData.result =
    //   (formData.noOfClassesConducted / formData.noOfAllotedHour) * 100;
    props.setConsultancyServices((prevArray) => [...prevArray, formData]);
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
              name={"agency"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Consultancy Agency</FormLabel>
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
              name="workCommendamentDate"
              render={({ field }) => (
                <FormItem className="my-4 flex w-full flex-col">
                  <FormLabel>Date of Work Commendament</FormLabel>
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
                            <span>Date</span>
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
              name="DateOfCompletion"
              render={({ field }) => (
                <FormItem className="my-4 flex w-full flex-col">
                  <FormLabel>Date of Work Completion</FormLabel>
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
                            <span>Date</span>
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
              name={"publishingMonthAndYear"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Publishing Month and Year</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="June 2002..." />
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

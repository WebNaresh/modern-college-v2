"use client";
import { DatePickerForm } from "@/components/Calendar/page";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  arrayOfPublications: React.Dispatch<
    React.SetStateAction<PropertyRightValues[]>
  >;
};
type PropertyRightValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  // paperTitle: z.string().min(1),
  status: z.enum(["Applied", "Not Applied"]),
  dateofpatent: z.date(),
  // name: z.string().min(1),
  // issnNo: z.number(),
  isCommetcialiazed: z.boolean(),
  // indexedIn: z.string().min(1),
});

const MiniForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<PropertyRightValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      isCommetcialiazed: false,
      status: "Applied",
      // paperTitle: "",
      // name: "",
      // indexedIn: "",
    },
  });

  const onSubmit = async (formData: PropertyRightValues) => {
    props.arrayOfPublications((prevArray) => [...prevArray, formData]);

    console.log(props.arrayOfPublications);

    // formData.result =
    //   (formData.noOfClassesConducted / formData.noOfAllotedHour) * 100;
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
            {/* <FormField
              control={form.control}
              name={"paperTitle"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Status</FormLabel>
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
            /> */}
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
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Applied">Applied</SelectItem>
                          <SelectItem value="Not Applied">
                            Not Applied
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Name of jounal/conference</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Jounal/Conference" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}
            {/* <FormField
              control={form.control}
              name={"issnNo"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>ISSN Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          form.setValue("issnNo", parseInt(e.target.value));
                        }}
                        placeholder="Enter 13 digit ISSN No"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}

            {/* <FormField
              control={form.control}
              name={"indexedIn"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Indexed in SCI/Scopus/ UGC Care / peer reviewed
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Indexed in" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}

            <FormField
              control={form.control}
              name="dateofpatent"
              render={({ field }) => (
                <FormItem className="my-4 flex w-full flex-col">
                  <FormLabel>Date of Joining</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger
                      type="button"
                      aria-modal={true}
                      className="flex items-center "
                    >
                      <FormControl>
                        <div
                          className={cn(
                            "w-full pl-3 mt-2 text-left font-normal flex rounded-sm outline-primary border py-[0.30rem] px-2 items-center",
                            !field.value && "text-muted-foreground "
                          )}
                        >
                          {field.value ? (
                            format(field.value as any, "PPP")
                          ) : (
                            <span>Pick Your Joining Date</span>
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
                        selected={field.value as any}
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
              name={"isCommetcialiazed"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full flex gap-4 items-center p-2 mt-8">
                    <FormControl>
                      <Checkbox
                        type="button"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="!mt-0 leading-none ">
                      <FormLabel>Is that commercialized</FormLabel>
                    </div>
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

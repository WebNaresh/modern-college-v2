"use client";

import { updateTeacherDetails } from "@/actions/teacherActions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import useCelebration from "@/hooks/celebration";
import useLoader from "@/hooks/loader-hook";
import { TeacherBasicInfo } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Academics, Performance, PersonalInfo } from "@prisma/client";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
const formSchema = z.object({
  mobile1: z.string().length(10, "no should be 10 digit"),
  designation: z.string().min(3),
  dateOfJoining: z.date(),
  facultyName: z.string().min(3),
  departmentName: z.string().min(3),
});
type Props = {
  user?:
    | (User & {
        academics: Academics | null;
        personalInfo: PersonalInfo | null;
        performance: Performance[];
      })
    | null;
};
export function InitailTeacherForm(props: Props) {
  console.log(`🚀 ~ props:`, props.user?.personalInfo === null);
  const { setLoading } = useLoader();
  const { setCelebration } = useCelebration();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    props.user?.academics === null || props.user?.personalInfo === null
      ? setOpen(true)
      : setOpen(false);
  }, [props.user]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile1: props.user?.personalInfo?.mobile1 || "",
      designation: props.user?.academics?.designation || "",
      dateOfJoining: props.user?.academics?.dateOfJoining || new Date(),
      facultyName: props.user?.academics?.facultyName || "",
      departmentName: props.user?.academics?.departmentName || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: TeacherBasicInfo) {
    setLoading(true);
    console.log(values);
    updateTeacherDetails(values)
      .then(({ message, user }) => {
        console.log(`🚀 ~ message:`, message);
        console.log(`🚀 ~ user:`, user);
        setOpen(false);
        router.refresh();
        setCelebration(true);
        toast({
          title: `${user?.name} your Info is Updated`,
          description: message,
        });
      })
      .catch(({ message, user }) => {
        toast({
          title: "updation failed",
          description: message,
          variant: "destructive",
        });
        router.refresh();
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <Dialog modal={false} open={open}>
      <DialogTrigger hidden className="w-full border rounded-sm p-2 ">
        New PE Form
      </DialogTrigger>
      <DialogContent className="h-[610px] p-0">
        <ScrollArea className="h-full w-full rounded-md p-6">
          <DialogHeader className="p-2">
            <DialogTitle>Basic details</DialogTitle>
            <DialogDescription>
              It help us to minimize your efforts
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid place-items-center w-full"
            >
              <div className="grid place-items-center w-full gap-4 px-2">
                <FormField
                  control={form.control}
                  name={"mobile1"}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Your Contact Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="10 digit number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name={"designation"}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Enter Designation of yours</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Designation" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="dateOfJoining"
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
                                "w-full pl-3 text-left font-normal flex rounded-sm border-slate-800 border p-2 items-center",
                                !field.value && "text-muted-foreground "
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
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
                  name={"facultyName"}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Your Faculty Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter faculty" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name={"departmentName"}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Department Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Department Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <Button className="m-4" type="submit">
                Save Changes
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

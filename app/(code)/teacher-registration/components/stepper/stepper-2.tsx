"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  religion: z.string().min(1),
  caste: z.string().min(1),
  permanentAddress: z.string().min(5),
  temporaryAddress: z.string().min(5),
  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.enum(["Male", "Female", "Other"]),
  bloodGroup: z.string().min(1),
  mobile1: z.string().min(10),
});
type Props = {
  session: Session | null;
};
const UserInfo2 = (props: Props) => {
  const { data, update } = useSession();
  console.log(`🚀 ~ data:`, data);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: any) => {
    console.log(`🚀 ~ formData:`, formData);
    // setLoading(true);
    // const { message, user } = await updateUserInfo(formData);
    // if (user) {
    //   toast({
    //     title: "Updated successfully",
    //     description: "User updated successfully now you can go to Next Step",
    //   });
    //   update({ name: formData.name, image: formData.imageUrl });
    // } else {
    //   toast({
    //     title: message,
    //     description: "Something went wrong",
    //     variant: "destructive",
    //   });
    // }
  };

  type UserForm1Values = z.infer<typeof formSchema>;
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      religion: `${props.session?.user?.personalInfo?.religion || ""}`,
      caste: `${props.session?.user?.personalInfo?.caste || "Male"}`,
      permanentAddress: `${
        props.session?.user?.personalInfo?.permanentAddress || ""
      }`,
      temporaryAddress: `${
        props.session?.user?.personalInfo?.temporaryAddress || ""
      }`,
      dateOfBirth: props.session?.user?.personalInfo?.dateOfBirth,
      gender: props.session?.user?.personalInfo?.gender,
      bloodGroup: props.session?.user?.personalInfo?.bloodGroup || "",
      mobile1: props.session?.user?.personalInfo?.mobile1 || "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid place-items-center w-full"
      >
        <div className="grid place-items-center w-[70%]">
          <FormField
            control={form.control}
            name={"religion"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Religion</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="Religion"
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
            name={"caste"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Caste</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="Caste"
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
            name={"permanentAddress"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Permanent Address</FormLabel>
                  <FormControl>
                    {/* <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="Caste"
                      {...field}
                    /> */}
                    <Textarea
                      {...field}
                      placeholder="Type permanent address."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={"temporaryAddress"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Temporary Address</FormLabel>
                  <FormControl>
                    {/* <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="Caste"
                      {...field}
                    /> */}
                    <Textarea
                      {...field}
                      placeholder="Type temporary address."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="my-4 flex w-full flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      captionLayout="dropdown"
                      mode="single"
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
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"gender"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
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
            name={"bloodGroup"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Blood Group</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="Blood-Group"
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
            name={"mobile1"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Your Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="Contact Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <Button
          // disabled={
          //   form.getValues().name === data?.user?.name &&
          //   form.getValues().imageUrl === data?.user?.image
          // }
          className="m-4"
          type="submit"
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default UserInfo2;

"use client";
import { updateUserDetails } from "@/actions/handleUserFor";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useToast } from "@/components/ui/use-toast";
import useStore from "@/hooks/loader-hook";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
  bloodGroup: z.string().min(1),
  mobile1: z.string().min(10),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(2),
  subjectOfTeaching: z.string().min(2),
  employmentStatus: z.boolean(),
});
type Props = {
  session: Session | null;
};
const UserInfo2 = (props: Props) => {
  const { data, update } = useSession();
  const { toast } = useToast();
  const { loading, setLoading } = useStore();

  const onSubmit = async (formData: UserForm1Values) => {
    setLoading(true);
    let info = await updateUserDetails(formData);

    if (info.user) {
      toast({
        title: "Updated successfully",
        description: "info updated successfully now you can go to Next Step",
      });
    } else {
      toast({
        title: info.message,
        description: "Something went wrong",
        variant: "destructive",
      });
      update({ formData });
    }
    setLoading(false);
  };

  type UserForm1Values = z.infer<typeof formSchema>;
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateOfBirth: props.session?.user?.personalInfo?.dateOfBirth,
      bloodGroup: props.session?.user?.personalInfo?.bloodGroup || "",
      mobile1: props.session?.user?.personalInfo?.mobile1 || "",
      city: props.session?.user?.personalInfo?.city || "",
      state: props.session?.user?.personalInfo?.state || "",
      pincode: props.session?.user?.personalInfo?.pincode || "",
      subjectOfTeaching:
        props.session?.user?.personalInfo?.subjectOfTeaching || "",
      employmentStatus: props.session?.user?.personalInfo?.employmentStatus,
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
                          "w-full pl-3 text-left font-normal",
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
                  <PopoverContent className="w-auto p-0 bg-card" align="start">
                    <Calendar
                      captionLayout="dropdown"
                      mode="single"
                      className=""
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
          <FormField
            control={form.control}
            name={"city"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Your current city</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="City"
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
            name={"state"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Your current state</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="State"
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
            name={"pincode"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>PinCode</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="Pin-Code"
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
            name={"subjectOfTeaching"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Your Subject of teaching</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="Subject"
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
            name="employmentStatus"
            render={({ field }) => (
              <FormItem className="flex w-full flex-row items-start space-x-3 space-y-0 rounded-md py-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Are you currrently employed</FormLabel>
                  <FormDescription>
                    then we can think about your notice period{" "}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={
            form.getValues().bloodGroup ===
              data?.user?.personalInfo?.bloodGroup &&
            form.getValues().mobile1 === data?.user?.personalInfo?.mobile1 &&
            form.getValues().city === data?.user?.personalInfo?.city &&
            form.getValues().pincode === data?.user?.personalInfo?.pincode &&
            form.getValues().subjectOfTeaching ===
              data?.user?.personalInfo.subjectOfTeaching &&
            form.getValues().employmentStatus ===
              data?.user?.personalInfo?.employmentStatus
          }
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

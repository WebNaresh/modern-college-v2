"use client";
import { updateUserDetails } from "@/actions/handleUserFor";
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
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import useStore from "@/hooks/loader-hook";
import useUpdateUserStore from "@/hooks/stepper-user-update-hook";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Performance } from "@prisma/client";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  image: z.string().min(1),
  contact: z.string().min(10).max(10),
  designation: z.string().min(3),
  dateOfJoining: z.date({
    required_error: "A date of birth is required.",
  }),
  facultyName: z.string().min(5),
  departmentName: z.string().min(1),
  phdDuringPeriod: z.string(),
});
type Props = {
  user: Session;
  performance: Performance | null;
};
const FormDetails = (props: Props) => {
  const router = useRouter();
  if (props.user === undefined) {
    router.push("/login");
  }
  const { update } = useSession();

  const { toast } = useToast();
  const { loading, setLoading } = useStore();
  const { index, nextStep } = useUpdateUserStore();

  const onSubmit = async (formData: UserForm1Values) => {
    setLoading(true);
    updateUserDetails(formData)
      .then(({ message, user }) => {
        update(user);
        toast({
          title: "Updated successfully",
          description: "User updated successfully now you can go to Next Step",
        });
        router.refresh();
        router.push("/performance-evaluation/academics-appraisel");
      })
      .catch((res) => {
        res.toast({
          title: res.message,
          description: "Something went wrong",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  type UserForm1Values = z.infer<typeof formSchema>;
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${props?.user?.user?.name}` || "",
      image: `${props?.user?.user?.image}` || "",
      contact: props?.user?.user?.personalInfo?.mobile1 || "",
      designation: props?.user?.user?.academics?.designation || "",
      dateOfJoining: props?.user?.user?.academics?.dateOfJoining || undefined,
      facultyName: props?.user?.user?.academics?.facultyName || "",
      departmentName: props?.user?.user?.academics?.departmentName || "",
      phdDuringPeriod: props.performance?.phdDuringPeriod || "",
    },
  });
  const UploadButtonCLick = () => {
    const element = document.getElementById("UploadButtonId");
    element?.click();
  };
  console.log(
    form.getValues().phdDuringPeriod === props?.performance?.phdDuringPeriod
  );
  console.log(
    `🚀 ~ props?.performance?.phdDuringPeriod:`,
    props?.performance?.phdDuringPeriod
  );
  console.log(
    `🚀 ~  form.getValues().phdDuringPeriod :`,
    form.getValues().phdDuringPeriod
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid place-items-center w-full "
      >
        <FormField
          control={form.control}
          name={"image"}
          render={({ field }) => {
            return (
              <FormItem className="w-full flex flex-col items-center">
                <FormLabel>Profile image</FormLabel>
                <FormControl>
                  <div className="relative p-4">
                    <div className="z-10 absolute top-2 right-2">
                      <Button
                        type="button"
                        onClick={UploadButtonCLick}
                        variant={"default"}
                        size={"icon"}
                      >
                        <BiEdit className="h-4 w-4" />
                      </Button>
                    </div>
                    <Image
                      className="object-cover rounded-full"
                      alt="Image"
                      src={field.value}
                      height={150}
                      width={150}
                    />
                    <ImageUpload
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      value={field.value}
                      onRemove={() => field.onChange("")}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="grid place-items-center w-full gap-4">
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="Recheck your username"
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
            name={"contact"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="contact"
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
            name={"designation"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={loading}
                      placeholder="designation"
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
            name="dateOfJoining"
            render={({ field }) => (
              <FormItem className="my-4 flex w-full flex-col">
                <FormLabel>Date of Joining</FormLabel>
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
                          <span>Pick Your Joining Date</span>
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
                  <FormLabel>Faculty Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Type facaulty name" />
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
                    <Input {...field} placeholder="Type department name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={"phdDuringPeriod"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>PHD During Period</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Any phd during period" />
                  </FormControl>
                  <FormDescription>
                    Leave Blank if no PHD during period
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <Button
          disabled={
            form.getValues().name === props?.user?.user?.name &&
            form.getValues().image === props?.user?.user?.image &&
            form.getValues().contact ===
              props?.user?.user?.personalInfo?.mobile1 &&
            form.getValues().departmentName ===
              props?.user?.user?.academics?.departmentName &&
            form.getValues().designation ===
              props?.user?.user?.academics?.designation &&
            form.getValues().facultyName ===
              props?.user?.user?.academics.facultyName &&
            form.getValues().phdDuringPeriod ===
              props?.performance?.phdDuringPeriod
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

export default FormDetails;

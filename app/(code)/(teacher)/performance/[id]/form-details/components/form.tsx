"use client";
import { updateUserDetails } from "@/actions/handleUserFor";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/components/ui/use-toast";
import useStore from "@/hooks/loader-hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Performance } from "@prisma/client";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
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

  const { toast } = useToast();
  const { setLoading } = useStore();

  const onSubmit = async (formData: UserForm1Values) => {
    setLoading(true);
    updateUserDetails({ ...formData, id: props.performance?.id as string })
      .then(({ message, performance }) => {
        toast({
          title: "Updated successfully",
          description:
            "performance updated successfully now you can go to Next Step",
        });
        return router.push(
          `/performance/${performance?.id}/academics-appraisel`
        );
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
      facultyName: props.performance?.facultyName || "",
      departmentName: props.performance?.departmentName || "",
      phdDuringPeriod: props.performance?.phdDuringPeriod || "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid place-items-center w-full "
      >
        <div className="grid place-items-center w-full gap-4">
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
            form.getValues().departmentName ===
              props.performance?.departmentName &&
            form.getValues().facultyName === props.performance.facultyName &&
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

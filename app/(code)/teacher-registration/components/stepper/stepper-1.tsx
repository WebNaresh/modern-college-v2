"use client";
import { updateUserInfo } from "@/actions/handleUserFor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
  religion: z.string().min(1),
  caste: z.string().min(1),
  permanentAddress: z.string().min(5),
  temporaryAddress: z.string().min(5),
  gender: z.enum(["Male", "Female", "Other"]),
});
type Props = {
  session: Session | null;
};
const UserInfo1 = (props: Props) => {
  const { data, update } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: UserForm1Values) => {
    // setLoading(true);
    const { message, user } = await updateUserInfo(formData);
    if (user) {
      update({ name: formData.name, image: formData.imageUrl });
      toast({
        title: "Updated successfully",
        description: "User updated successfully now you can go to Next Step",
      });
    } else {
      toast({
        title: message,
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  type UserForm1Values = z.infer<typeof formSchema>;
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${props.session?.user?.name}`,
      imageUrl: `${props.session?.user?.image || "/default.png"}`,
      religion: props.session?.user?.religion || "",
      caste: props.session?.user?.caste || "",
      permanentAddress: props.session?.user?.permanentAddress || "",
      temporaryAddress: props.session?.user?.temporaryAddress || "",
      gender: props.session?.user?.gender || undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid place-items-center w-full"
      >
        <FormField
          control={form.control}
          name={"imageUrl"}
          render={({ field }) => {
            const isNameChanged = field.value !== data?.user?.name;
            return (
              <FormItem className="w-full flex flex-col items-center">
                <FormLabel>Profile image</FormLabel>
                {!props.session?.user?.name && (
                  <Skeleton className="w-[200px] h-[200px] rounded-full" />
                )}
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    value={field.value}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="grid place-items-center w-[70%]">
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
        </div>

        <Button
          disabled={
            form.getValues().name === data?.user?.name &&
            form.getValues().imageUrl === data?.user?.image
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

export default UserInfo1;

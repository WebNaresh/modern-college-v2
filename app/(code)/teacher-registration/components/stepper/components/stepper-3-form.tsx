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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  setArrayOfFamily: React.Dispatch<React.SetStateAction<UserForm1Values[]>>;
};
type UserForm1Values = z.infer<typeof formSchema>;
const formSchema = z.object({
  familyMemberName: z.string().min(1),
  relationWithMember: z.string().min(1),
  addressOfMember: z.string().min(5),
  occupation: z.string().min(5),
  contact: z.string().min(10),
});

const MiniForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      familyMemberName: "",
      relationWithMember: "",
      addressOfMember: "",
      occupation: ``,
      contact: "",
    },
  });
  const onSubmit = async (formData: UserForm1Values) => {
    console.log(`🚀 ~ formData:`, formData);
    props.setArrayOfFamily((prevArray) => [...prevArray, formData]);
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
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid place-items-center w-full"
        >
          <div className="grid place-items-center w-[70%]">
            <FormField
              control={form.control}
              name={"familyMemberName"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Family Member Name</FormLabel>
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
              name={"relationWithMember"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Relation with member</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        disabled={loading}
                        placeholder="Relation with member"
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
              name={"addressOfMember"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Address of member</FormLabel>
                    <FormControl>
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
              name={"occupation"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Occupation of member</FormLabel>
                    <FormControl>
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
              name={"contact"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Member Contact Number</FormLabel>
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

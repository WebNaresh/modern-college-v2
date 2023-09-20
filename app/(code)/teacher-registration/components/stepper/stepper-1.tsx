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
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
});
type Props = {
  session: Session | null;
};
const UserInfo1 = (props: Props) => {
  const { data } = useSession();
  console.log(`🚀 ~ data:`, data);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(props.session?.user?.image);

  const onSubmit = async (data: BillboardFormValues) => {
    setLoading(true);

    console.log(`🚀 ~ data:`, data);
    try {
    } catch (error) {
    } finally {
    }
  };

  type BillboardFormValues = z.infer<typeof formSchema>;
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${props.session?.user?.name}`,
      imageUrl: `${props.session?.user?.image || "/default.png"}`,
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
            return (
              <FormItem className="w-full flex flex-col items-center">
                <FormLabel>Profile image</FormLabel>
                {props.session?.user ? (
                  <Skeleton className="w-[200px] h-[200px] rounded-full" />
                ) : (
                  ""
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
        </div>

        <Button disabled={loading} className="m-4" type="submit">
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default UserInfo1;

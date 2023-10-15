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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  setArrayOfECD: React.Dispatch<React.SetStateAction<string[]>>;
};
export type PropertyRightValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  value: z.string().min(1),
});

const MiniForm2 = (props: Props) => {
  const form = useForm<PropertyRightValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      value: "",
    },
  });

  const onSubmit = async (formData: PropertyRightValues) => {
    console.log(`🚀 ~ formData:`, formData);

    props.setArrayOfECD((prevArray) => [...prevArray, formData.value]);
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col place-items-center w-full"
        >
          <div className="flex flex-col items-center w-full">
            <FormField
              control={form.control}
              name={"value"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Effective Curriculum Work</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Enter Text then click of + icon"
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

export default MiniForm2;

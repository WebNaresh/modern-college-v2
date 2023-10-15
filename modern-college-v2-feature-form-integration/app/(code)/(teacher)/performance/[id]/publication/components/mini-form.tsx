"use client";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  arrayOfPublications: React.Dispatch<React.SetStateAction<UserForm1Values[]>>;
};
type UserForm1Values = z.infer<typeof formSchema>;

const formSchema = z.object({
  paperTitle: z.string().min(1),
  level: z.enum(["State", "Local", "International", "National"]),
  name: z.string().min(1),
  issnNo: z.string().min(1),
  isMainAuthor: z.boolean(),
  indexedIn: z.string().min(1),
});

const MiniForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      paperTitle: "",
      level: undefined,
      name: "",
      issnNo: "",
      isMainAuthor: false,
      indexedIn: "",
    },
  });

  const onSubmit = async (formData: UserForm1Values) => {
    // formData.result =
    //   (formData.noOfClassesConducted / formData.noOfAllotedHour) * 100;
    props.arrayOfPublications((prevArray) => [...prevArray, formData]);
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
            <FormField
              control={form.control}
              name={"paperTitle"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>What is your Paper Title</FormLabel>
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
            />
            <FormField
              control={form.control}
              name={"level"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Jounal/Conference</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Local/State/National/International" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Local">Local</SelectItem>
                          <SelectItem value="State">State</SelectItem>
                          <SelectItem value="National">National</SelectItem>
                          <SelectItem value="International">
                            International
                          </SelectItem>
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
            />
            <FormField
              control={form.control}
              name={"issnNo"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>ISSN Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter 13 digit ISSN No" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
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
            />
            <FormField
              control={form.control}
              name={"isMainAuthor"}
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
                      <FormLabel>Are you main Author</FormLabel>
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

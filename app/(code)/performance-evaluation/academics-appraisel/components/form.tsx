"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import useStore from "@/hooks/loader-hook";
import useUpdateUserStore from "@/hooks/stepper-user-update-hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { z } from "zod";
import MiniForm from "./mini-form";

const formSchema = z.object({
  name: z.string().min(1),
  level: z.enum(["UG", "PG"]),
  courseHead: z.enum(["TH", "PR", "T"]),
  noOfAllotedHour: z.number(),
  noOfClassesConducted: z.number(),
  result: z.number(),
});
type Props = {
  user: Session;
};
const FormDetails = (props: Props) => {
  const [arrayOfPreviousYear, setArrayOfPreviousYear] = useState<
    UserForm1Values[]
  >([]);
  const router = useRouter();
  if (props.user === undefined) {
    router.push("/login");
  }

  const { toast } = useToast();
  const { loading, setLoading } = useStore();
  const { index, nextStep } = useUpdateUserStore();
  const onSubmit = async (formData: UserForm1Values) => {
    setLoading(true);
    // updateUserDetails(formData)
    //   .then(({ message, user }) => {
    //     update(user);
    //     toast({
    //       title: "Updated successfully",
    //       description: "User updated successfully now you can go to Next Step",
    //     });
    //     router.refresh();
    //   })
    //   .catch((res) => {
    //     res.toast({
    //       title: res.message,
    //       description: "Something went wrong",
    //       variant: "destructive",
    //     });
    //   })
    //   .finally(() => {
    setLoading(false);
    // });
  };

  type UserForm1Values = z.infer<typeof formSchema>;
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${props?.user?.user?.name}` || "",
      level: undefined,
      courseHead: undefined,
      noOfAllotedHour: 0,
      noOfClassesConducted: 0,
      result: 0,
    },
  });

  return (
    <>
      <MiniForm arrayOfPreviousYear={setArrayOfPreviousYear} />
      <Table>
        <TableCaption>
          Family Member Details you must have add 2 entry here
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Relation</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {arrayOfPreviousYear?.map((e, i) => {
            return (
              <TableRow key={i}>
                <TableCell className="font-medium">{e.name}</TableCell>
                <TableCell>{e.result}</TableCell>
                <TableCell className="text-right">
                  <Button
                    type="button"
                    size={"icon"}
                    // onClick={() => deleteFromArray(i)}
                  >
                    <MdDelete className="text-lg" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* <Form {...form}>
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
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-card"
                      align="start"
                    >
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
                    <FormControl>
                      <Input {...field} placeholder="Type department name" />
                    </FormControl>
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
                props?.user?.user?.academics.facultyName
            }
            className="m-4"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </Form> */}
    </>
  );
};

export default FormDetails;

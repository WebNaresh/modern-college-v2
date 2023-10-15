"use client";

import { pEFormStep1 } from "@/actions/teacherActions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import useCelebration from "@/hooks/celebration";
import useLoader from "@/hooks/loader-hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Academics, Performance, PersonalInfo } from "@prisma/client";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
const formSchema = z.object({
  isphdDuringPeriod: z.enum(["yes", "no"]),
  phdDuringPeriod: z.string(),
});
type Props = {
  user?:
    | (User & {
        academics: Academics | null;
        personalInfo: PersonalInfo | null;
        performance: Performance[];
      })
    | null;
};
export function ProfileForm(props: Props) {
  const { setLoading } = useLoader();
  const { setCelebration } = useCelebration();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isphdDuringPeriod: undefined,
      phdDuringPeriod: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log(values);
    pEFormStep1(values)
      .then(({ message, user }) => {
        router.refresh();
        setCelebration(true);
        toast({
          title: `${user?.name} your Info is Updated`,
          description: message,
        });
      })
      .catch(({ message, user }) => {
        toast({
          title: "updation failed",
          description: message,
          variant: "destructive",
        });
        router.refresh();
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid place-items-center w-full "
      >
        <div className="grid place-items-center w-full gap-4 px-2">
          <FormField
            control={form.control}
            name="isphdDuringPeriod"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>PHD Info</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Any PHD During Period" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent aria-modal={false}>
                    <SelectItem value="yes">yes</SelectItem>
                    <SelectItem value="no">no</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          {form.getValues("isphdDuringPeriod") === "yes" ? (
            <FormField
              control={form.control}
              name={"phdDuringPeriod"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>PHD info</FormLabel>

                    <FormControl>
                      <Input
                        autoComplete="off"
                        {...field}
                        placeholder="Which Phd you bought"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ) : (
            ""
          )}
        </div>

        <Button className="m-4" type="submit">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}

"use client";
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
import { Feedback } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiPercent } from "react-icons/fi";
import { z } from "zod";

type Props = {
  feedback: Feedback | null | undefined;
};
type UserForm1Values = z.infer<typeof formSchema>;
const formSchema = z.object({
  studentTermICurrentYear: z.number().min(0).max(100),
  studentTermIIPreviousYear: z.number().min(0).max(100),
  peerTermICurrentYear: z.number().min(0).max(100),
  peerTermIIPreviousYear: z.number().min(0).max(100),
  peerAndStudentFeedback: z.number().min(0).max(100),
});

const MiniForm2 = ({ feedback }: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentTermICurrentYear: feedback?.studentTermICurrentYear,
      studentTermIIPreviousYear: feedback?.studentTermIIPreviousYear,
      peerTermICurrentYear: feedback?.peerTermICurrentYear,
      peerTermIIPreviousYear: feedback?.peerTermIIPreviousYear,
      peerAndStudentFeedback: feedback?.peerAndStudentFeedback,
    },
  });
  const onSubmit = async (formData: UserForm1Values) => {
    console.log(`🚀 ~ formData:`, formData);
    // formData.result =
    //   (formData.noOfClassesConducted / formData.noOfAllotedHour) * 100;
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
              name={"studentTermICurrentYear"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Average Student Feedback score for term-I Current Year
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FiPercent className="absolute right-2 top-2" />
                        <Input
                          type="number"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            form.setValue(
                              "studentTermICurrentYear",
                              parseInt(e.target.value)
                            );
                          }}
                          className="w-full"
                          disabled={loading}
                          placeholder="Term-I"
                          // {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"studentTermIIPreviousYear"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Average Student Feedback score for term-II Previous Year
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FiPercent className="absolute right-2 top-2" />
                        <Input
                          className="w-full"
                          disabled={loading}
                          type="number"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            form.setValue(
                              "studentTermIIPreviousYear",
                              parseInt(e.target.value)
                            );
                          }}
                          placeholder="Term-II"
                          // {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"peerTermICurrentYear"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Average Peer Feedback score for term-I Current Year
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FiPercent className="absolute right-2 top-2" />
                        <Input
                          className="w-full"
                          disabled={loading}
                          placeholder="Term-I"
                          type="number"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            form.setValue(
                              "peerTermICurrentYear",
                              parseInt(e.target.value)
                            );
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"peerTermIIPreviousYear"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Average Peer Feedback score for term-II Previous Year
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FiPercent className="absolute right-2 top-2" />
                        <Input
                          className="w-full"
                          disabled={loading}
                          placeholder="Term-II"
                          type="number"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            form.setValue(
                              "peerTermIIPreviousYear",
                              parseInt(e.target.value)
                            );
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name={"peerAndStudentFeedback"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Average Peer + Student Feedback</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FiPercent className="absolute right-2 top-2" />
                        <Input
                          className="w-full"
                          disabled={loading}
                          placeholder="Average feedback of both"
                          type="number"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            form.setValue(
                              "peerAndStudentFeedback",
                              parseInt(e.target.value)
                            );
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default MiniForm2;

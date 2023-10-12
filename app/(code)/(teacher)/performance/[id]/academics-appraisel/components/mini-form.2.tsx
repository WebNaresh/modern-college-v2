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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiPercent } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {
  setEvaluation: React.Dispatch<React.SetStateAction<UserForm1Values[]>>;
};
type UserForm1Values = z.infer<typeof formSchema>;
const formSchema = z.object({
  averageStudentFeedbackScoreTermI: z.number().min(0).max(100),
  averageStudentFeedbackScoreTermII: z.number().min(0).max(100),
  averagePeerFeedbackScoreTermI: z.number().min(0).max(100),
  averagePeerFeedbackScoreTermII: z.number().min(0).max(100),
  averagePeerStudentFeedback: z.number().min(0).max(100),
});

const MiniForm2 = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      averageStudentFeedbackScoreTermI: undefined,
      averageStudentFeedbackScoreTermII: undefined,
      averagePeerFeedbackScoreTermI: undefined,
      averagePeerFeedbackScoreTermII: undefined,
      averagePeerStudentFeedback: undefined,
    },
  });
  const onSubmit = async (formData: UserForm1Values) => {
    console.log(`🚀 ~ formData:`, formData);
    // formData.result =
    //   (formData.noOfClassesConducted / formData.noOfAllotedHour) * 100;
    props.setEvaluation((prevArray) => [...prevArray, formData]);
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
              name={"averageStudentFeedbackScoreTermI"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Average Student Feedback score for term-I
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
                              "averageStudentFeedbackScoreTermI",
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
              name={"averageStudentFeedbackScoreTermII"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Average Student Feedback score for term-II
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
                              "averageStudentFeedbackScoreTermII",
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
              name={"averagePeerFeedbackScoreTermI"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Average Peer Feedback score for term-I
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
                              "averagePeerFeedbackScoreTermI",
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
              name={"averagePeerFeedbackScoreTermII"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Average Peer Feedback score for term-II
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
                              "averagePeerFeedbackScoreTermII",
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
              name={"averagePeerStudentFeedback"}
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
                              "averagePeerStudentFeedback",
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

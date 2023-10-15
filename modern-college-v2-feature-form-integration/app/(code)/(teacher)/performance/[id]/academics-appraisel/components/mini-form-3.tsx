"use client";
import { pEFormStep2 } from "@/actions/teacherActions";
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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AverageResult, Feedback, Performance } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiPercent } from "react-icons/fi";
import { z } from "zod";
import { AcademicAppraisel } from "./form";

type Props = {
  feedback: Feedback | null | undefined;
  academicAppraisel: AcademicAppraisel[];
  arrayOfECD: string[];
  performance: Performance & {
    teachingAndLearning: AverageResult[];
    feedback: Feedback | null;
  };
};
export type FeedbackFormTypes = z.infer<typeof formSchema>;
const formSchema = z.object({
  studentTermICurrentYear: z.number().min(0).max(100),
  studentTermIIPreviousYear: z.number().min(0).max(100),
  peerTermICurrentYear: z.number().min(0).max(100),
  peerTermIIPreviousYear: z.number().min(0).max(100),
  peerAndStudentFeedback: z.number().min(0).max(100),
});

const MiniForm3 = ({
  feedback,
  arrayOfECD,
  academicAppraisel,
  performance,
}: Props) => {
  const [loading, setLoading] = useState(false);
  console.log(`🚀 ~ feedback:`, feedback?.studentTermICurrentYear);

  const form = useForm<FeedbackFormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentTermICurrentYear: feedback?.studentTermICurrentYear,
      studentTermIIPreviousYear: feedback?.studentTermIIPreviousYear,
      peerTermICurrentYear: feedback?.peerTermICurrentYear,
      peerTermIIPreviousYear: feedback?.peerTermIIPreviousYear,
      peerAndStudentFeedback: feedback?.peerAndStudentFeedback,
    },
  });

  const onSubmit = async (formData: FeedbackFormTypes) => {
    console.log(`🚀 ~ formData:`, formData);
    console.log(academicAppraisel);
    const hasCurrentYearEntry = academicAppraisel.some(
      (entry) => entry.year === "Current"
    );

    // Check if there is at least one entry for the previous year
    const hasPreviousYearEntry = academicAppraisel.some(
      (entry) => entry.year === "Previous"
    );
    const hasCurrentTermIEntry = academicAppraisel.some(
      (entry) => entry.term === "I"
    );

    // Check if there is at least one entry for the previous term
    const hasPreviousTermIIEntry = academicAppraisel.some(
      (entry) => entry.term === "II"
    );
    if (
      hasCurrentYearEntry &&
      hasPreviousYearEntry &&
      hasCurrentTermIEntry &&
      hasPreviousTermIIEntry &&
      arrayOfECD.length > 0
    ) {
      const formStatus = await pEFormStep2({
        formData,
        academicAppraisel,
        arrayOfECD,
        performanceId: performance.id,
      });
    } else {
      console.log(`🚀 ~       hasCurrentYearEntry`, hasCurrentYearEntry);
      if (!hasCurrentYearEntry) {
        toast({
          title: "Add Entry",
          description: "Add minimum one entry of current Year",
        });
      } else if (!hasPreviousYearEntry) {
        toast({
          title: "Add Entry",
          description: "Add minimum one entry of previous Year",
        });
      } else if (!hasCurrentTermIEntry) {
        toast({
          title: "Add Entry",
          description: "Add minimum one entry of term I Year",
        });
      } else if (!hasPreviousTermIIEntry) {
        toast({
          title: "Add Entry",
          description: "Add minimum one entry of termII Year",
        });
      } else if (!(arrayOfECD.length > 0)) {
        toast({
          title: "Add Entry",
          description: "Add Entry in effective learning",
        });
      } else {
        // toast({
        //   title: "Add Entry",
        //   description: "Add minimumasdfasfd one entry of termII Year",
        // });
      }
    }
  };
  console.log(
    `🚀 ~form.getValues().peerAndStudentFeedback:`,
    form.formState.isDirty
  );

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
                          value={field.value}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            form.formState.isDirty = true;
                            if (e.target.value === "") {
                              form.setValue("peerTermIIPreviousYear", 0);
                            } else {
                              form.setValue(
                                "studentTermICurrentYear",
                                parseInt(e.target.value)
                              );
                              field.onChange(e);
                            }
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
                          value={field.value}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            form.formState.isDirty = true;
                            if (e.target.value === "") {
                              form.setValue("peerTermIIPreviousYear", 0);
                            } else {
                              form.setValue(
                                "studentTermIIPreviousYear",
                                parseInt(e.target.value)
                              );
                            }
                          }}
                          // onChange={field.onChange}
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
                          value={field.value}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            form.formState.isDirty = true;
                            if (e.target.value === "") {
                              form.setValue("peerTermIIPreviousYear", 0);
                            } else {
                              form.setValue(
                                "peerTermICurrentYear",
                                parseInt(e.target.value)
                              );
                            }
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
                          value={field.value}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            form.formState.isDirty = true;
                            if (e.target.value === "") {
                              form.setValue("peerTermIIPreviousYear", 0);
                            } else {
                              form.setValue(
                                "peerTermIIPreviousYear",
                                parseInt(e.target.value)
                              );
                            }
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
                          value={field.value}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            form.formState.isDirty = true;
                            if (e.target.value === "") {
                              form.setValue("peerTermIIPreviousYear", 0);
                            } else {
                              form.setValue(
                                "peerAndStudentFeedback",
                                parseInt(e.target.value)
                              );
                            }
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
            disabled={
              !(
                performance?.teachingAndLearning.length <
                academicAppraisel.length
              ) &&
              !(
                performance?.effectiveCurriculamEfforts.length <
                arrayOfECD.length
              ) &&
              !form.formState.isDirty
            }
            className="m-10 text-center w-fit"
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default MiniForm3;

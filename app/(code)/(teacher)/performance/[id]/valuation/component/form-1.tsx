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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { z } from "zod";

type Props = {};
type UserForm1Values = z.infer<typeof formSchema>;

const formSchema = z.object({
  averageResult: z.number().min(1).max(6),
  classEngagement: z.number().min(1).max(7),
  studentFeedback: z.number().min(1).max(6),
  peerFeedback: z.number().min(1).max(6),
  effectiveCurriculum: z.number().min(1).max(10),
});
const gradeData = [
  { level: "UG", grades: ["6", "5", "4", "3", "2", "1"] },
  {
    level: "I",
    grades: ["90-100", "80-89", "70-79", "60-69", "55-59", "50-54"],
  },
  {
    level: "II",
    grades: ["90-100", "80-89", "70-79", "60-69", "55-59", "50-54"],
  },
  {
    level: "III",
    grades: ["96-100", "90-95", "80-89", "70-79", "60-69", "55-59"],
  },
  {
    level: "IV",
    grades: ["96-100", "90-95", "85-89", "80-84", "75-79", "70-74"],
  },
];
const averageResultData = [
  {
    level: "PG",
    grades: ["6", "5", "4", "3", "2", "1"],
  },
  {
    level: "I",
    grades: ["96-100", "90-95", "80-89", "70-79", "60-69", "55-59"],
  },
  {
    level: "II",
    grades: ["96-100", "90-95", "85-89", "80-84", "75-79", "70-74"],
  },
];
const Form1 = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<UserForm1Values>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      averageResult: undefined,
      classEngagement: undefined,
      studentFeedback: undefined,
      peerFeedback: undefined,
      effectiveCurriculum: undefined,
    },
  });

  const onSubmit = async (formData: UserForm1Values) => {
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
          <div className=" flex flex-col md:grid md:grid-cols-1 place-items-center w-full gap-x-4 gap-y-4">
            <div className="flex flex-col w-full gap-6">
              <div className="border rounded-lg">
                <Table>
                  <TableCaption>
                    Minimum 1 subject of current Year and 1 subject of previous
                    Year Compulsory
                  </TableCaption>
                  <TableHeader></TableHeader>
                  <TableBody>
                    {gradeData.map((grade, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-center">
                          {grade.level}
                        </TableCell>
                        {grade.grades.map((value, idx) => (
                          <TableCell
                            key={idx}
                            className="font-medium text-center"
                          >
                            {value}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="border rounded-lg">
                <Table>
                  <TableCaption>Average % Result (Theory)</TableCaption>

                  <TableBody>
                    {averageResultData.map((grade, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-center">
                          {grade.level}
                        </TableCell>
                        {grade.grades.map((value, idx) => (
                          <TableCell
                            key={idx}
                            className="font-medium text-center"
                          >
                            {value}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <FormField
                control={form.control}
                name={"averageResult"}
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Average % Result (Theory):</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          disabled={field.disabled}
                          value={field.value}
                          name={field.name}
                          ref={field.ref}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                          placeholder="Enter number between 1 to 7"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex flex-col w-full gap-6">
              <div className="border rounded-lg">
                <Table>
                  <TableCaption>Table Caption Here</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">PG</TableHead>
                      <TableHead className="text-center">6</TableHead>
                      <TableHead className="text-center">5</TableHead>
                      <TableHead className="text-center">4</TableHead>
                      <TableHead className="text-center">3</TableHead>
                      <TableHead className="text-center">2</TableHead>
                      <TableHead className="text-center">1</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center">I</TableCell>
                      <TableCell className="text-center">96-100</TableCell>
                      <TableCell className="text-center">90-95</TableCell>
                      <TableCell className="text-center">80-89</TableCell>
                      <TableCell className="text-center">70-79</TableCell>
                      <TableCell className="text-center">60-69</TableCell>
                      <TableCell className="text-center">55-59</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center">II</TableCell>
                      <TableCell className="text-center">96-100</TableCell>
                      <TableCell className="text-center">90-95</TableCell>
                      <TableCell className="text-center">85-89</TableCell>
                      <TableCell className="text-center">80-84</TableCell>
                      <TableCell className="text-center">75-79</TableCell>
                      <TableCell className="text-center">70-74</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <FormField
                control={form.control}
                name={"classEngagement"}
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Average % Class Engagement</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          disabled={field.disabled}
                          value={field.value}
                          name={field.name}
                          ref={field.ref}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                          placeholder="Enter number between 1 to 6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex flex-col w-full gap-6">
              <div className="border rounded-lg">
                <Table>
                  <TableCaption>Table Caption Here</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">PG</TableHead>
                      <TableHead className="text-center">6</TableHead>
                      <TableHead className="text-center">5</TableHead>
                      <TableHead className="text-center">4</TableHead>
                      <TableHead className="text-center">3</TableHead>
                      <TableHead className="text-center">2</TableHead>
                      <TableHead className="text-center">1</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center">I</TableCell>
                      <TableCell className="text-center">96-100</TableCell>
                      <TableCell className="text-center">90-95</TableCell>
                      <TableCell className="text-center">80-89</TableCell>
                      <TableCell className="text-center">70-79</TableCell>
                      <TableCell className="text-center">60-69</TableCell>
                      <TableCell className="text-center">55-59</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center">II</TableCell>
                      <TableCell className="text-center">96-100</TableCell>
                      <TableCell className="text-center">90-95</TableCell>
                      <TableCell className="text-center">85-89</TableCell>
                      <TableCell className="text-center">80-84</TableCell>
                      <TableCell className="text-center">75-79</TableCell>
                      <TableCell className="text-center">70-74</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <FormField
                control={form.control}
                name={"studentFeedback"}
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Average % Student Feedback Score</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          disabled={field.disabled}
                          value={field.value}
                          name={field.name}
                          ref={field.ref}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                          placeholder="Enter number between 1 to 6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex flex-col w-full gap-6">
              <div className="border rounded-lg">
                <Table>
                  <TableCaption>Table Caption Here</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">PG</TableHead>
                      <TableHead className="text-center">6</TableHead>
                      <TableHead className="text-center">5</TableHead>
                      <TableHead className="text-center">4</TableHead>
                      <TableHead className="text-center">3</TableHead>
                      <TableHead className="text-center">2</TableHead>
                      <TableHead className="text-center">1</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center">I</TableCell>
                      <TableCell className="text-center">96-100</TableCell>
                      <TableCell className="text-center">90-95</TableCell>
                      <TableCell className="text-center">80-89</TableCell>
                      <TableCell className="text-center">70-79</TableCell>
                      <TableCell className="text-center">60-69</TableCell>
                      <TableCell className="text-center">55-59</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center">II</TableCell>
                      <TableCell className="text-center">96-100</TableCell>
                      <TableCell className="text-center">90-95</TableCell>
                      <TableCell className="text-center">85-89</TableCell>
                      <TableCell className="text-center">80-84</TableCell>
                      <TableCell className="text-center">75-79</TableCell>
                      <TableCell className="text-center">70-74</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <FormField
                control={form.control}
                name={"peerFeedback"}
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Average % Peer Feedback Score</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          disabled={field.disabled}
                          value={field.value}
                          name={field.name}
                          ref={field.ref}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                          placeholder="Enter number between 1 to 6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex flex-col w-full gap-6">
              <div className="border rounded-lg">
                <Table>
                  <TableCaption>Table Caption Here</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">PG</TableHead>
                      <TableHead className="text-center">6</TableHead>
                      <TableHead className="text-center">5</TableHead>
                      <TableHead className="text-center">4</TableHead>
                      <TableHead className="text-center">3</TableHead>
                      <TableHead className="text-center">2</TableHead>
                      <TableHead className="text-center">1</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center">I</TableCell>
                      <TableCell className="text-center">96-100</TableCell>
                      <TableCell className="text-center">90-95</TableCell>
                      <TableCell className="text-center">80-89</TableCell>
                      <TableCell className="text-center">70-79</TableCell>
                      <TableCell className="text-center">60-69</TableCell>
                      <TableCell className="text-center">55-59</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center">II</TableCell>
                      <TableCell className="text-center">96-100</TableCell>
                      <TableCell className="text-center">90-95</TableCell>
                      <TableCell className="text-center">85-89</TableCell>
                      <TableCell className="text-center">80-84</TableCell>
                      <TableCell className="text-center">75-79</TableCell>
                      <TableCell className="text-center">70-74</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <FormField
                control={form.control}
                name={"effectiveCurriculum"}
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>
                        6 Efforts taken for Effective Curriculum Delivery [
                        Minimum 1 expected ]
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          disabled={field.disabled}
                          value={field.value}
                          name={field.name}
                          ref={field.ref}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                          placeholder="Enter number between 1 to 10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
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

export default Form1;

"use client";

import InputField from "@/components/AuthComponets/InputField";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useStore from "@/hooks/loader-hook";
import { ToastAction } from "@radix-ui/react-toast";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Email is not Valid" }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  role: z.enum(["Student", "Teacher"]), // Add "role" to the schema as an enum
});

const SignUpForm = () => {
  const { toast } = useToast();
  const { setLoadingTrue, setLoadingFalse } = useStore();
  const router = useRouter();
  const { data } = useSession();
  if (data?.user) {
    router.push("/");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "Student", // Add a default value for the role field if needed
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoadingTrue();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`🚀 ~ res:`, res);

    if (res.status === 200) {
      toast({
        title: "Now Login with your credentials",
        description: "Registering successfully",
      });

      router.push("/login");
    } else if (res.status === 400) {
      // toast.error(res.statusText);
      toast({
        title: "User already exist",
        description: res.statusText,
        variant: "destructive",
        action: (
          <ToastAction altText="Login" className="">
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          </ToastAction>
        ),
      });
    } else {
      toast({
        title: "Something went wrong",
        description: "Try after sometime",
        variant: "destructive",
      });
    }
    setLoadingFalse();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <InputField
            form={form}
            name="name"
            label="Name"
            placeholder="Enter your name"
            desc=" This is your public display name."
          />
          <InputField
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            desc=" This is your public display email."
          />
          <InputField
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            desc=" This is your public display password."
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Student May Sign-Up As Student Only
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full text-white" type="submit">
            Register
          </Button>

          {/* <Button
            type="button"
            className="w-full bg-white dark:hover:bg-slate-100"
            onClick={() => signIn("github")}
          >
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            Continue with Github
          </Button> */}
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;

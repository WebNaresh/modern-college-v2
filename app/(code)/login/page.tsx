import LoginForm from "./components/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const page = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center">
        {/* <div
          id="container"
          className=" sm:mx-auto sm:w-full sm:max-w-md  bg  rounded-lg  shadow-md shadow-black/5 dark:bg-slate-900 dark:shadow-black/10 "
        > */}
        {/* <AuthForm /> */}
        {/* <LoginForm />
        </div> */}
        <Card className="sm:w-[60vh] w-[480px]">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Welcome-back</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="text-gray-400 text-xs text-center flex justify-center">
            Don`t have an account?
            <Link href={"/signUp"} className="text-primary pl-1">
              {" "}
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </section>
    </>
  );
};

export default page;

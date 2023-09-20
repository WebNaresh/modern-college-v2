import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SignUpForm from "./components/signUpForm";

const page = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center mb-6">
        {/* <div
          id="container"
          className="py-4 px-10  sm:mx-auto sm:w-full sm:max-w-md  bg-[#FBFBFB] rounded-lg  shadow-md shadow-black/5 dark:bg-slate-900 dark:shadow-black/10 "
        >
          <SignUpForm />
        </div> */}
        <Card className="sm:w-[60vh] wi[40vh]">
          <CardHeader>
            <CardTitle>Register to your account</CardTitle>
            <CardDescription>
              welcome to{" "}
              <Link href={"/"} className="text-primary">
                Modern College Of Engineering
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
          <CardFooter className="text-gray-400 text-xs text-center flex justify-center">
            Already have an account?
            <Link href={"/login"} className="text-primary pl-1">
              Log in
            </Link>
          </CardFooter>
        </Card>
      </section>
    </>
  );
};

export default page;

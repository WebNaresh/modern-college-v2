import LoginForm from "./components/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const LoginInfo = async () => {
  const data = await getServerSession(authOptions);
  if (data?.user) {
    redirect("/");
  }
  return (
    <>
      <section className="flex flex-col items-center justify-center">
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

export default LoginInfo;

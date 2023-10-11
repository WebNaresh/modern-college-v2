import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Form from "./components/form";
import FormDetails2 from "./components/form.2";

type Props = {};

const page = async (props: Props) => {
  const data = await getServerSession(authOptions);
  if (data?.user === undefined) {
    return <div>Please Login FIrst</div>;
  }
  return (
    <div className="px-4">
      <Card className="w-full px-4 my-4">
        <CardHeader>
          <CardTitle>Academic Appraisel-Details</CardTitle>
          <CardDescription>Welcome {data?.user?.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form user={data} />
          <FormDetails2 user={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

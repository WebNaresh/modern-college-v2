import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import PublicationForm from "./components/form";

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
          <CardTitle>College Envolvement</CardTitle>
          <CardDescription>
            Co-curricular/Extra-curricular/Professional Development activities
            organized
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PublicationForm user={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

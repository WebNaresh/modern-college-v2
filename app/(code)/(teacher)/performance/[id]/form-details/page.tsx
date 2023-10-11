import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/primsa";
import { getServerSession } from "next-auth";
import Form from "./components/form";

type Props = {
  params: {
    id: string;
  };
};

const page = async (props: Props) => {
  const data = await getServerSession(authOptions);
  if (data?.user === undefined) {
    return <div>Please Login FIrst</div>;
  }
  const existingPerformance = await prisma.performance.findUnique({
    where: {
      id: props.params.id,
    },
  });
  if (existingPerformance === null || undefined) {
  }
  return (
    <div>
      <Card className="w-[90vw] md:w-[500px] px-4 m-auto my-4">
        <CardHeader>
          <CardTitle>Teacher Evaluation Details</CardTitle>
          <CardDescription>Welcome {data?.user?.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form user={data} performance={existingPerformance} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

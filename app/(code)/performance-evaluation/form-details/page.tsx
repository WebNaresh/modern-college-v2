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

type Props = {};

const page = async (props: Props) => {
  const data = await getServerSession(authOptions);
  const currentYear = new Date().getFullYear();
  const existingPerformance = await prisma.performance.findFirst({
    where: {
      userId: data?.user?.id,
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`), // Start of the current year
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`), // Start of the next year
      },
    },
  });
  console.log(`🚀 ~ existingPerformance:`, existingPerformance);
  if (data?.user === undefined) {
    return <div>Please Login FIrst</div>;
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

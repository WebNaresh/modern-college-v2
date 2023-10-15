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
import { redirect } from "next/navigation";
import PropertyRightForm from "./components/form";

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
    include: {
      intellectualPropertyRights: {
        include: {
          patents: true,
          copyRights: true,
          tradeMarks: true,
        },
      },
      examinationDuties: true,
    },
  });
  if (existingPerformance === null || undefined) {
    redirect("/");
  }
  return (
    <div className="px-4">
      <Card className="w-full px-4 my-4">
        <CardHeader>
          <CardDescription>Intellectual Property Rights</CardDescription>
          <CardTitle>Patents</CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyRightForm user={data} performance={existingPerformance} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

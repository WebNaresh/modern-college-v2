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
import PublicationForm from "./components/form";
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
      publications: true,
      booksArticleChpter: true,
    },
  });
  if (existingPerformance === null || undefined) {
    redirect("/");
  }
  return (
    <div className="px-4">
      <Card className="w-full px-4 my-4">
        <CardHeader>
          <CardTitle>Publications</CardTitle>
          <CardDescription>Faculty Performance Evaluation</CardDescription>
        </CardHeader>
        <CardContent>
          <PublicationForm performance={existingPerformance} user={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

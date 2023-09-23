import { Card } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Stepper from "./components/stepper";

type Props = {};

const Page = async (props: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Card className="w-[90vw] md:w-[60vw] px-4 m-auto">
        <Stepper session={session} />
      </Card>
    </div>
  );
};

export default Page;

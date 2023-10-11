import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/primsa";
import { getServerSession } from "next-auth";
import { InitailTeacherForm } from "./form";

type Props = {};

const page = async (props: Props) => {
  const data = await getServerSession(authOptions);
  let user;
  if (data?.user) {
    user = await prisma.user.findUnique({
      where: {
        id: data?.user?.id as string,
      },
      include: {
        academics: true,
        personalInfo: true,
        performance: true,
      },
    });
  } else {
    user = null;
  }
  return (
    <>
      <InitailTeacherForm user={user} />
    </>
  );
};

export default page;

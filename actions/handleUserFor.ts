"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/primsa";
import { getServerSession } from "next-auth";

type Data = {
  name: string;
  imageUrl: string;
};
export const updateUserInfo = async ({ name, imageUrl }: Data) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  } else {
    const user = await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        name,
        image: imageUrl,
      },
      select: {
        name: true,
        image: true,
      },
    });
    return {
      message: "user updated",
      user: user,
    };
  }
};

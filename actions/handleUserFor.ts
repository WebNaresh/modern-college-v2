"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/primsa";
import { getServerSession } from "next-auth";

type Data = {
  name: string;
  imageUrl: string;
  religion: string;
  caste: string;
  permanentAddress: string;
  temporaryAddress: string;
  gender: "Male" | "Female" | "Other";
};
type UserForm1Values = {
  facultyName: string;
  departmentName: string;
  phdDuringPeriod: string;
  id: string;
};
export const updateUserInfo = async ({
  name,
  imageUrl,
  religion,
  caste,
  permanentAddress,
  temporaryAddress,
  gender,
}: Data) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  } else {
    try {
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
    } catch (error) {
      return { message: "Something went wrong", user: null };
    }
  }
};
export const updateUserDetails = async ({
  facultyName,
  departmentName,
  phdDuringPeriod,
  id,
}: UserForm1Values) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  } else {
    try {
      const performance = await prisma.performance.upsert({
        where: {
          id,
        },
        update: {
          facultyName,
          departmentName,
          phdDuringPeriod,
        },
        create: {
          userId: session.user?.id as string,
          facultyName,
          departmentName,
          phdDuringPeriod,
        },
      });
      console.log(`🚀 ~ performance:`, performance);

      return {
        message: "performance updated",
        performance: performance,
      };
    } catch (error) {
      return { message: "Something went wrong", performance: null };
    }
  }
};

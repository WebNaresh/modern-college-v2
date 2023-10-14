"use server";

import { authOptions } from "@/lib/auth";
import { TeacherBasicInfo } from "@/lib/interface";
import { prisma } from "@/lib/primsa";
import { getServerSession } from "next-auth";

export const updateTeacherDetails = async ({
  mobile1,
  designation,
  dateOfJoining,
  facultyName,
  departmentName,
}: TeacherBasicInfo) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  } else {
    try {
      const primsse = await prisma.personalInfo.upsert({
        where: {
          userId: session.user?.id,
        },
        update: {
          mobile1,
        },
        create: {
          userId: session.user?.id as string,
          mobile1,
        },
      });
      console.log(`🚀 ~ primsse:`, primsse);
      await prisma.academics.upsert({
        where: {
          userId: session.user?.id,
        },
        update: {
          designation,
          dateOfJoining,
          facultyName,
          departmentName,
        },
        create: {
          designation,
          dateOfJoining,
          facultyName,
          departmentName,
          userId: session.user?.id as string,
        },
      });

      return {
        message: "user updated",
        user: session.user,
      };
    } catch (error) {
      return { message: "Something went wrong", user: null };
    }
  }
};
export const pEFormStep1 = async ({
  phdDuringPeriod,
  isphdDuringPeriod,
}: {
  phdDuringPeriod: string;
  isphdDuringPeriod: "yes" | "no";
}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  } else {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
      include: {
        academics: true,
        personalInfo: true,
        performance: true,
      },
    });
    try {
      const performance = await prisma.performance.create({
        data: {
          userId: session.user?.id as string,
          departmentName: user?.academics?.departmentName as string,
          facultyName: user?.academics?.facultyName as string,
          phdDuringPeriod: phdDuringPeriod,
        },
      });
      console.log(`🚀 ~ performance:`, performance);

      return {
        message: "user updated",
        user: user,
      };
    } catch (error) {
      return { message: "Something went wrong", user: null };
    }
  }
};

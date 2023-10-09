"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/primsa";
import { Performance } from "@prisma/client";
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
  name: string;
  image: string;
  contact: string;
  designation: string;
  dateOfJoining: Date;
  facultyName: string;
  departmentName: string;
  phdDuringPeriod: string;
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
  name,
  image,
  contact,
  designation,
  dateOfJoining,
  facultyName,
  departmentName,
  phdDuringPeriod,
}: UserForm1Values) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  } else {
    try {
      await prisma.personalInfo.upsert({
        where: {
          userId: session.user?.id,
        },
        update: {
          mobile1: contact,
        },
        create: {
          userId: session.user?.id as string,
          mobile1: contact,
        },
      });
      await prisma.academics.upsert({
        where: {
          userId: session.user?.id,
        },
        update: {
          designation,
          departmentName,
          facultyName,
          dateOfJoining,
        },
        create: {
          userId: session.user?.id as string,
          designation,
          departmentName,
          facultyName,
          dateOfJoining,
        },
      });
      const user = await prisma.user.update({
        where: {
          id: session.user?.id,
        },
        data: {
          name,
          image,
        },
        include: {
          personalInfo: true,
          academics: true,
        },
      });
      const currentYear = new Date().getFullYear();
      const existingPerformance = await prisma.performance.findFirst({
        where: {
          userId: session.user?.id,
          createdAt: {
            gte: new Date(`${currentYear}-01-01T00:00:00.000Z`), // Start of the current year
            lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`), // Start of the next year
          },
        },
      });

      if (!existingPerformance) {
        await prisma.performance.create({
          data: {
            departmentName,
            facultyName,
            userId: session.user?.id as string,
            phdDuringPeriod,
          },
        });
      }
      return {
        message: "user updated",
        user: user,
      };
    } catch (error) {
      return { message: "Something went wrong", user: null };
    }
  }
};
type AddAcademicAppraiselDetails = {
  personalInfo: Performance;
  academicAppraiselDetails: {
    id?: string;
    name: string;
    level: "UG" | "PG";
    courseHead: "TH" | "PR" | "T";
    term: "I" | "II";
    previousYear: "Current" | "Previous";
    noOfAllotedHour: number;
    noOfClassesConducted: number;
    result: number;
  };
};
export const addAcademicAppraiselDetails = async (
  academicAppraiselDetails: AddAcademicAppraiselDetails
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  } else {
    try {
      await prisma.personalInfo.upsert({
        where: {
          userId: session.user?.id,
        },
        update: {
          mobile1: contact,
        },
        create: {
          userId: session.user?.id as string,
          mobile1: contact,
        },
      });
      await prisma.academics.upsert({
        where: {
          userId: session.user?.id,
        },
        update: {
          designation,
          departmentName,
          facultyName,
          dateOfJoining,
        },
        create: {
          userId: session.user?.id as string,
          designation,
          departmentName,
          facultyName,
          dateOfJoining,
        },
      });
      const user = await prisma.user.update({
        where: {
          id: session.user?.id,
        },
        data: {
          name,
          image,
        },
        include: {
          personalInfo: true,
          academics: true,
        },
      });
      const currentYear = new Date().getFullYear();
      const existingPerformance = await prisma.performance.findFirst({
        where: {
          userId: session.user?.id,
          createdAt: {
            gte: new Date(`${currentYear}-01-01T00:00:00.000Z`), // Start of the current year
            lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`), // Start of the next year
          },
        },
      });

      if (!existingPerformance) {
        await prisma.performance.create({
          data: {
            departmentName,
            facultyName,
            userId: session.user?.id as string,
            phdDuringPeriod,
          },
        });
      }
      return {
        message: "user updated",
        user: user,
      };
    } catch (error) {
      return { message: "Something went wrong", user: null };
    }
  }
};

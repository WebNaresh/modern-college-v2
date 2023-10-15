"use server";

import { AcademicAppraisel } from "@/app/(code)/(teacher)/performance/[id]/academics-appraisel/components/form";
import { FeedbackFormTypes } from "@/app/(code)/(teacher)/performance/[id]/academics-appraisel/components/mini-form-3";
import { ActivityFormValues, ResponsibilityFormValues } from "@/app/(code)/(teacher)/performance/[id]/envolvement/components/form";
import { ConsultancyServicesFormValues, SponseredReasearchFormValues } from "@/app/(code)/(teacher)/performance/[id]/evaluation/components/form";
import { authOptions } from "@/lib/auth";
import { TeacherBasicInfo } from "@/lib/interface";
import { prisma } from "@/lib/primsa";
import { Activity, Responsibility } from "@prisma/client";
import { getServerSession } from "next-auth";

type FeedbackCreateManyInput = AcademicAppraisel & {
  performanceId: string;
};
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
export const pEFormStep2 = async ({
  formData,
  academicAppraisel,
  arrayOfECD,
  performanceId,
}: {
  formData: FeedbackFormTypes;
  academicAppraisel: AcademicAppraisel[];
  arrayOfECD: string[];
  performanceId: string;
}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  } else {
    const academicAppraiselWithoutId = academicAppraisel
      .filter((value) => !value.id)
      .map((appraisal) => ({
        ...appraisal,
        performanceId, // Add your actual performanceId here
      }));

    try {
      const createdFeedback = await prisma.averageResult.createMany({
        data: academicAppraiselWithoutId,
      });
      const addEffectiveCurriculumEffortsInPerformance =
        await prisma.performance.update({
          where: {
            id: performanceId,
          },
          data: {
            effectiveCurriculamEfforts: arrayOfECD,
          },
        });
      const feedback = await prisma.feedback.upsert({
        where: {
          performanceId,
        },
        create: {
          ...formData,
          performanceId,
        },
        update: {
          ...formData,
          performanceId,
        },
      });
      console.log(`🚀 ~ feedback:`, feedback);
      console.log(
        `🚀 ~ addEffectiveCurriculumEffortsInPerformance:`,
        addEffectiveCurriculumEffortsInPerformance
      );
      console.log(`🚀 ~ createdFeedback:`, createdFeedback);

      return {
        message: "user updated",
        status: true,
      };
    } catch (error) {
      return { message: "Something went wrong", status: false };
    }
  }
};


export const pEFormStep5 = async ({ sponseredReasearch, consultancyServices, performanceId }: {
  sponseredReasearch: SponseredReasearchFormValues[],
  consultancyServices: ConsultancyServicesFormValues[]
  performanceId: string
}) => {
  const session = await getServerSession(authOptions)
  console.log(session);
  
  if (!session) {
    return { message: "user is not authorized", user: null };
  } else {
    try {
      // Check the activty Performaceid if not add in it
      const sponseredReasearchWithId = sponseredReasearch
        .filter((value) => !value.id)
        .map((sponseredReasearch) => ({
          ...sponseredReasearch,
          performanceId, // Add your actual performanceId here
        }));

      const sponseredReasearched = await prisma.sponsoredResearch.createMany({
        data: sponseredReasearchWithId
      })
      // Check the reposibilty Performaceid if not add in it
      const consultancyServicesWithId = consultancyServices
        .filter((value) => !value.id)
        .map((consultancyServices) => ({
          ...consultancyServices,
          performanceId, // Add your actual performanceId here
        }));

      const resposibilities = await prisma.consultancyService.createMany({
        data: consultancyServicesWithId
      })
      console.log(sponseredReasearched, resposibilities);
      return {
        message: "Consultancy services and sponseredReasearched added",
        status: true
      }

    } catch (error) {
      console.log({
        status: false,
        error
      });
    }
  }
}






export const pEFormStep7 = async ({ activity, responsibility, performanceId }: {
  activity: ActivityFormValues[],
  responsibility: ResponsibilityFormValues[]
  performanceId: string
}) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { message: "user is not authorized", user: null };
  } else {
    try {
      // Check the activty Performaceid if not add in it
      const activityWithId = activity
        .filter((value) => !value.id)
        .map((activity) => ({
          ...activity,
          performanceId, // Add your actual performanceId here
        }));

      const activities = await prisma.activity.createMany({
        data: activityWithId
      })
      // Check the reposibilty Performaceid if not add in it
      const resposibilityWithId = responsibility
        .filter((value) => !value.id)
        .map((activity) => ({
          ...activity,
          performanceId, // Add your actual performanceId here
        }));

      const resposibilities = await prisma.responsibility.createMany({
        data: resposibilityWithId
      })
      console.log(activities, resposibilities);
      return {
        message: "activty and data added",
        status: true
      }

    } catch (error) {
      console.log({
        status: false,
        error
      });
    }
  }
}


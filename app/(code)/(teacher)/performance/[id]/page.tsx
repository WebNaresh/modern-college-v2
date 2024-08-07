import { DataTableDemo } from "@/components/Data-Table/component/data-table";
import { authOptions } from "@/lib/auth";
import { FormSteps } from "@/lib/interface";
import { prisma } from "@/lib/primsa";
import { getServerSession } from "next-auth";

type Props = {};

const Page = async (props: Props) => {
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
    include: {
      teachingAndLearning: true,
      publications: true,
      programsOrganized: true,
      programsAttended: true,
      sponsoredResearch: true,
      consultancyServices: true,
      activities: true,
      responsibilities: true,
      booksArticleChpter: true,
      intellectualPropertyRights: true,
      examinationDuties: true,
    },
  });
  if (data?.user === undefined) {
    return <div>Please Login FIrst</div>;
  }
  const stepData: FormSteps[] = [
    {
      status: existingPerformance?.phdDuringPeriod ? true : false,
      formStep: "Update form-details",
      href: `/performance/${existingPerformance?.id}/form-details`,
    },
    {
      status:
        (existingPerformance?.teachingAndLearning?.length as number) >= 2
          ? true
          : false,
      formStep: "Academic appraisel-details",
      href: `/performance/${existingPerformance?.id}/academics-appraisel`,
    },
    {
      status:
        (existingPerformance?.publications?.length as number) >= 1 &&
        (existingPerformance?.booksArticleChpter.length as number) >= 1
          ? true
          : false,
      formStep: "Publication-details",
      href: `/performance/${existingPerformance?.id}/publication`,
    },
    {
      status:
        (existingPerformance?.programsOrganized?.length as number) >= 1 &&
        (existingPerformance?.programsOrganized?.length as number) >= 1
          ? true
          : false,
      formStep: "Program-details",
      href: `/performance/${existingPerformance?.id}/program`,
    },
    {
      status:
        (existingPerformance?.consultancyServices?.length as number) >= 1 &&
        (existingPerformance?.sponsoredResearch.length as number) >= 1
          ? true
          : false,
      formStep: "Personal Evaluation",
      href: `/performance/${existingPerformance?.id}/evaluation`,
    },
    {
      status: existingPerformance?.intellectualPropertyRights ? true : false,
      formStep: "Intelectual property rights",
      href: `/performance/${existingPerformance?.id}/property-rights`,
    },
    {
      status:
        (existingPerformance?.activities.length as number) >= 1 &&
        (existingPerformance?.responsibilities?.length as number) >= 1
          ? true
          : false,
      formStep: "College Envolvement",
      href: `/performance/${existingPerformance?.id}/envolvement`,
    },
    {
      status: false,
      formStep: "Performance Valuation",
      href: `/performance/${existingPerformance?.id}/valuation`,
    },
  ];

  return (
    <div>
      <DataTableDemo data={stepData} />
    </div>
  );
};

export default Page;

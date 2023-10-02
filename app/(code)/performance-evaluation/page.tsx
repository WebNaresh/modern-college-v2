import { DataTableDemo } from "@/components/Data-Table/component/data-table";
import { FormSteps } from "@/lib/interface";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <DataTableDemo data={stepData} />
    </div>
  );
};

export default page;
const stepData: FormSteps[] = [
  {
    status: false,
    formStep: "Update form-details",
    href: "/performance-evaluation/form-details",
  },
  {
    status: false,
    formStep: "Academic appraisel-details",
    href: "/performance-evaluation/academics-appraisel",
  },
  {
    status: false,
    formStep: "Publication-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "Organized program-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "Attended program-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "Sposored research-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "Consultancy service-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "Inteleactual property-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "examination duties-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "Extra activities-details",
    href: "/performance-evaluation/",
  },
];

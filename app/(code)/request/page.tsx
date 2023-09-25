import { getTeacherRequestArray } from "@/actions/adminAcions";
import { DataTableDemo } from "@/components/Data-Table/component/data-table";

type Props = {};

const Admin = async (props: Props) => {
  const TeacherRequestArray = await getTeacherRequestArray();

  return (
    <div className="px-4">
      <h4 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
        New request from teacher
      </h4>
      <DataTableDemo data={TeacherRequestArray.users} />
    </div>
  );
};

export default Admin;

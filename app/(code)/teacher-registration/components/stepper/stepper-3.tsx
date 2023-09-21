"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import MiniForm from "./components/stepper-3-form";

type Props = {
  session: Session | null;
};
type UserForm1Values = {
  occupation: string;
  contact: string;
  familyMemberName: string;
  relationWithMember: string;
  addressOfMember: string;
};
const UserInfo3 = (props: Props) => {
  const { data, update } = useSession();
  console.log(`🚀 ~ data:`, data);
  const [arrayOfFamily, setarrayOfFamily] = useState<UserForm1Values[]>([]);
  console.log(`🚀 ~ arrayOfFamily:`, arrayOfFamily);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    // <Form
    // // {...form}
    // >
    <form
      // onSubmit={form.handleSubmit(onSubmit)}
      className="grid place-items-center w-full"
    >
      <MiniForm setArrayOfFamily={setarrayOfFamily} />
      <Table>
        <TableCaption>
          Family Member Details you must have add 2 entry here
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Relation</TableHead>
            <TableHead>Adress</TableHead>
            <TableHead className="text-right">Contact</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Naresh</TableCell>
            <TableCell>Brother</TableCell>
            <TableCell>Satara</TableCell>
            <TableCell className="text-right">3970928324</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </form>
    // </Form>
  );
};

export default UserInfo3;

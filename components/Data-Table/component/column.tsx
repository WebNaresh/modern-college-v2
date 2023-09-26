"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useStore from "@/hooks/loader-hook";
import { User } from "@prisma/client";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { revalidatePath } from "next/cache";
import Actions from "./actions";
const authorize = async (array: User[]) => {
  const completed = await fetch("/api/update-teacher-position", {
    method: "POST",
    body: JSON.stringify({ teacherArray: array }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  revalidatePath("/request");
};
const deAuthorize = async (array: User[]) => {
  const { setLoading } = useStore();
  setLoading(true);
  // fetch("/api/degrade-teacher-position", {
  //   method: "POST",
  //   body: JSON.stringify({ teacherArray: array }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => {
  //     console.log(`🚀 ~ completed:`, res);
  //     revalidatePath("/request");
  //     toast({
  //       title: "User DeAuthorize",
  //       description: "This user is also deleted from database",
  //     });
  //   })
  //   .catch((res) => {
  //     toast({
  //       title: "User DeAuthorization failed",
  //       description: "Error occured in server please try after some time",
  //       variant: "destructive",
  //     });
  //   })
  //   .finally(() => {
  //     setLoading(false);
  //   });
};
export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div>Name</div>,
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hidden  sm:flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase hidden  sm:table-cell">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: () => (
      <div className="text-right hidden  sm:table-cell">Gender</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium hidden  sm:table-cell">
          {row.getValue("gender")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="w-full text-center">
          <Actions users={[payment]} />
        </div>
      );
    },
  },
];

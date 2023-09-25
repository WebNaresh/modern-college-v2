"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
const authorize = async (array: User[]) => {
  console.log("hlo");
  console.log(`🚀 ~ array:`, array);
  const completed = await fetch("/api/update-teacher-position", {
    method: "POST",
    body: JSON.stringify({ teacherArray: array }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(`🚀 ~ completed:`, completed);
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="text-xs text-muted-foreground">Actions</div>
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => authorize([payment])}>
                Authorize as Teacher
              </DropdownMenuItem>
              <DropdownMenuItem
              // onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Reject as Teacher
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

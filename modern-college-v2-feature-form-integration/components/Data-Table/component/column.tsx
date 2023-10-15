"use client";
import { FormSteps } from "@/lib/interface";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

export const columns: ColumnDef<FormSteps>[] = [
  {
    accessorKey: "formStep",
    header: () => <div className="text-left">From Steps</div>,
    cell: ({ row }) => (
      <div className="capitalize text-left pl-2">
        {row.getValue("formStep")}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: () => <div className="!text-center hidden  sm:block ">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {row.getValue("status") === true ? (
            <div className="text-center hidden sm:block w-fit font-mono text-[#008000] dark:text-[#14ff00] bg-[#0bff6369] px-4 py-1 rounded-full dark:bg-[#0a3118] text-[13px] font-extralight">
              Completed
            </div>
          ) : (
            <div className="text-center hidden sm:block w-fit font-mono text-[#ff0000] dark:text-red-600 px-4 py-1 rounded-full dark:bg-[#330808] bg-[#ff030373] text-[13px]">
              In-Completed
            </div>
          )}
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
          <Actions formStep={row.original} />
        </div>
      );
    },
  },
];

"use client";
import { FormSteps } from "@/lib/interface";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

export const columns: ColumnDef<FormSteps>[] = [
  {
    accessorKey: "formStep",
    header: () => <div className="text-left">From Steps</div>,
    cell: ({ row }) => (
      <div className="capitalize text-left">{row.getValue("formStep")}</div>
    ),
  },

  {
    accessorKey: "status",
    header: () => (
      <div className="text-center hidden  sm:table-cell">Status</div>
    ),
    cell: ({ row }) => {
      return (
        <>
          {row.getValue("status") === true ? (
            <div className="text-center hidden  sm:table-cell">Completed</div>
          ) : (
            <div className="text-center hidden  sm:table-cell text-destructive">
              In-Complete
            </div>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="w-full text-right">
          <Actions formStep={row.original} />
        </div>
      );
    },
  },
];

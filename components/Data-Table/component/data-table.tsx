"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import useStore from "@/hooks/loader-hook";
import { FormSteps } from "@/lib/interface";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { columns } from "./column";

interface Props {
  data: FormSteps[];
}
export function DataTableDemo({ data }: Props) {
  const { refresh } = useRouter();
  const { setLoading } = useStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const authorize = async (array: any[]) => {
    let restructredArray = array.map((array) => array.original);

    if (array.length > 0) {
      setLoading(true);
      fetch("/api/update-teacher-position", {
        method: "POST",
        body: JSON.stringify({ teacherArray: restructredArray }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          toast({
            title: "Succesufully authorize teacher",
            description: "work done successfully",
          });
          refresh();
        })
        .catch((res) => {
          toast({
            title: "Error Occured Please refresh",
            description: "something went wrong",
            variant: "destructive",
          });
          refresh();
        })
        .finally(() => {
          setLoading(false);
          refresh();
        });
    }
  };
  const deAuthorize = async (array: any[]) => {
    let restructredArray = array.map((array) => array.original);
    if (array.length > 0) {
      setLoading(true);
      fetch("/api/degrade-teacher-position", {
        method: "POST",
        body: JSON.stringify({ teacherArray: restructredArray }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          refresh();
          toast({
            title: "User DeAuthorize",
            description: "This user is also deleted from database",
          });
        })
        .catch((res) => {
          toast({
            title: "User DeAuthorization failed",
            description: "Error occured in server please try after some time",
            variant: "destructive",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div className="w-full p-4 box-border">
      <div className="rounded-md border px-4">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

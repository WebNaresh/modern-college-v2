"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { User } from "@prisma/client";
import { ChevronDownIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
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
  data: User[];
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
    <div className="w-full   box-border">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="h-[36px] w-[58px] m-auto flex">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="text-xs text-muted-foreground">Actions</div>
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    authorize(table.getFilteredSelectedRowModel().rows)
                  }
                >
                  Authorize as Teacher
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    deAuthorize(table.getFilteredSelectedRowModel().rows)
                  }
                >
                  Reject as Teacher
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      // className={`${
                      //   header.getContext().header.id === "email" ||
                      //   header.getContext().header.id === "gender"
                      //     ? "hidden  sm:table-cell"
                      //     : ""
                      // }`}
                      key={header.id}
                    >
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

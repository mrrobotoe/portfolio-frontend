import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateOptions } from "@/lib/utils";
import { Issue } from "@/types/api";

import { useIssues } from "../api/get-issues";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table>
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
                        header.getContext(),
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="table-container__cell__empty-set h-24 text-center"
            >
              Empty
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          className="table-container__button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <CaretSortIcon />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="table-container__button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const status = getValue();
      if (status === "Open") {
        return <Badge variant="outline">Open</Badge>;
      }
      if (status === "Done") {
        return <Badge variant="success">Done</Badge>;
      }
      if (status === "In Progress") {
        return <Badge variant="warning">In Progress</Badge>;
      }
      if (status === "Backlog") {
        return <Badge variant="secondary">Backlog</Badge>;
      }
    },
  },
  {
    accessorKey: "project_name",
    header: "Project",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          className="table-container__button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <CaretSortIcon />
        </Button>
      );
    },
    accessorFn: (row) =>
      new Date(row.created_at).toLocaleDateString("en-US", dateOptions),
  },
];

const IssuesList = () => {
  const issuesQuery = useIssues();

  if (issuesQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner />
      </div>
    );
  }

  if (!issuesQuery.data) return null;

  return <DataTable columns={columns} data={issuesQuery.data} />;
};

export { IssuesList };

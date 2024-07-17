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
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { acronymn, dateOptions } from "@/lib/utils";
import { Issue } from "@/types/api";

import { useIssues } from "../api/get-issues";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  status: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  status,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();

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
    <>
      {table.getRowModel().rows?.length ? (
        <div className="status__header">{status}</div>
      ) : null}
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length
            ? table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() => {
                    const id = (row.getValue("id") as string)?.split("-").pop();
                    navigate(`./${id}`);
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </>
  );
}

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "id",
    accessorFn: (row) => {
      return acronymn(row.team) + "-" + row.id;
    },
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

const IssuesList = ({ status }: { status: string }) => {
  const issuesQuery = useIssues();

  if (issuesQuery.isLoading) {
    return (
      <div className="centered">
        <Spinner />
      </div>
    );
  }

  if (!issuesQuery.data) return null;

  return (
    <>
      <DataTable
        status={status}
        columns={columns}
        data={issuesQuery.data.filter((d) => d.status === status)}
      />
    </>
  );
};

export { IssuesList };

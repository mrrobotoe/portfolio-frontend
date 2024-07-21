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

import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { dateOptions, priorities, properties } from "@/lib/utils";
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
  const StatusIcon = properties[status].icon;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
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
        <div className="status__header">
          <div className="status__header__icon">
            <StatusIcon />
          </div>
          <p className="status__header__title">{properties[status].value}</p>
        </div>
      ) : null}
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length
            ? table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() => {
                    const id = row.getValue("issue_key") as string;
                    navigate(`./${id}`);
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    if (
                      cell.column.id === "status" ||
                      cell.column.id === "priority" ||
                      cell.column.id === "issue_key"
                    ) {
                      return null;
                    }

                    if (cell.column.id === "id") {
                      const Icon =
                        priorities[row.getValue("priority") as string].icon;
                      return (
                        <TableCell key={cell.id}>
                          <Icon />
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    }

                    if (cell.column.id === "title") {
                      const Icon =
                        properties[row.getValue("status") as string].icon;
                      return (
                        <TableCell key={cell.id}>
                          <Icon />
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={cell.id}>
                        <div className="issues-list__cell">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
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
    maxSize: 20,
    accessorFn: (row) => {
      return row.issue_key;
    },
  },
  {
    accessorKey: "priority",
  },
  {
    accessorKey: "title",
  },
  {
    accessorKey: "status",
  },
  {
    accessorKey: "issue_key",
  },
  {
    accessorKey: "created_at",
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

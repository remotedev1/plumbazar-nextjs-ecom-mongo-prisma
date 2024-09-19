"use client";

import { convertTimestampToFormattedDate } from "@/lib/utils";
import { CellAction } from "./cell-action";

export const columns = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "validFrom",
    header: "From",
    cell: ({ row }) => (
      <div className="">
        {convertTimestampToFormattedDate(row.original?.validFrom)}
      </div>
    ),
  },
  {
    accessorKey: "validUntil",
    header: "Till",
    cell: ({ row }) => (
      <div className="">
        {convertTimestampToFormattedDate(row.original?.validUntil)}
      </div>
    ),
  },

  {
    accessorKey: "deletedAt",
    header: "Deleted",
    cell: ({ row }) => (
      <div className="">{row.original?.deletedAt ? "true" : "false"}</div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

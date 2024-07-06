"use client";

import { convertTimestampToFormattedDate } from "@/lib/utils";
import { CellAction } from "./cell-action";

export const columns = [

  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="">
        {convertTimestampToFormattedDate(row.original?.createdAt)}
      </div>
    ),
  },

  {
    id: "actions",
    header: "Actions",

    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

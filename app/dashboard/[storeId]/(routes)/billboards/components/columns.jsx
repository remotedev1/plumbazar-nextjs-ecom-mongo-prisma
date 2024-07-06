"use client";

import { CellAction } from "./cell-action";

export const columns = [
  {
    accessorKey: "label",
    header: "Label",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },

  {
    accessorKey: "category",
    header: "category",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

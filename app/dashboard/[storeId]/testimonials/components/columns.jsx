"use client";

import { CellAction } from "./cell-action";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "organization",
    header: "Organization",
  },
 
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

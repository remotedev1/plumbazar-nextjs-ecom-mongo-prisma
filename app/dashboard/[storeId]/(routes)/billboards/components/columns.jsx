"use client";

import Image from "next/image";
import { CellAction } from "./cell-action";

export const columns = [
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      if (row.original.images) {
        return (
          <Image
            width={100}
            height={100}
            src={row.original.images[0]}
            alt="image"
          />
        );
      }
    },
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

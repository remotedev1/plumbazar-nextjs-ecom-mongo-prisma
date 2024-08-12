"use client";

import Image from "next/image";
import { CellAction } from "./cell-action";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      if (row.original.image) {
        return (
          <Image
            width={50}
            height={50}
            src={row.original.image}
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

"use client";

import { CellAction } from "./cell-action";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "purchasedPrice",
    header: "PP",
  },
  {
    accessorKey: "mrp",
    header: "MRP",
  },
  {
    accessorKey: "msp",
    header: "MSP",
  },
  {
    accessorKey: "brand.name",
    header: "Brand",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

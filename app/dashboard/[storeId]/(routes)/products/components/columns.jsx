"use client";

import Image from "next/image";
import { CellAction } from "./cell-action";

export const columns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      if (row.original.images[0]) {
        return (
          <Image
            width={50}
            height={50}
            src={row.original.images[0]}
            alt="image"
          />
        );
      }
    },
  },
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
    accessorKey: "gst",
    header: "GST",
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
    accessorKey: "offers",
    header: "Offers",
    cell: ({ row }) => <div className="">{row.original?.offers.length}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

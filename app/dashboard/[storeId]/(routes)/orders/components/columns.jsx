"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { StoreId } from "@/lib/variables";

const onCopy = (id) => {
  navigator.clipboard.writeText(id);
  toast.success("Order ID copied to clipboard.");
};
export const columns = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex items-center ">
          <span className="text-[#146EB4] font-semibold">
            # {order.id.split("-")[0]}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "totalPrice",
    header: "Order Amount",
  },
  {
    accessorKey: "isPaid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex items-center">
          <span
            className={`h-3 w-3 rounded-full mr-2 ${
              order.isPaid ? "bg-green-500" : "bg-red-500"
            }`}
            aria-hidden="true"
          />
          {order.isPaid ? "Paid" : "UnPaid"}
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      return <div className="flex items-center">{order.deliveryStatus}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(order.id.split(" ")[0])}>
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/dashboard/${StoreId}/orders/${order.id}`}>
                <Button>View Orders</Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

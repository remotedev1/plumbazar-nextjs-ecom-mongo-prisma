"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import Link from "next/link";

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
    accessorKey: "products",
    header: "Products",
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
    header: "Payment",
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
          {order.isPaid ? "paid" : "not paid"}
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: "status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href={{
                  pathname: "/profile/orders",
                  query: { orderId: row.original.id.split(" ").slice(0, 1)[0] },
                }}
              >
                <Button>View Orders</Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

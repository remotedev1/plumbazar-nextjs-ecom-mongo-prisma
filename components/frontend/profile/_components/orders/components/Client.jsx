"use client";

import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";

const OrderClient = ({ data }) => {
  return (
    <>
      <Heading title="Transactions" description="Manage your Orders" />

      <Separator />
      <DataTable searchKey="id" columns={columns} data={data} />
    </>
  );
};

export default OrderClient;

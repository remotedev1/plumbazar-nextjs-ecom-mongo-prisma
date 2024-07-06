"use client";

import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";

const OrderClient = ({params, data }) => {
  return (
    <>
      <Heading
        title={`Transactions | This Month (${data.length}) `}
        description="Manage Orders for your store"
      />

      <Separator />
      <DataTable searchKey="id" columns={columns} data={data} />
    </>
  );
};

export default OrderClient;

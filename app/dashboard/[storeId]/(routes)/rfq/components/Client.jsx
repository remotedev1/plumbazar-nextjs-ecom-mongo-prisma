"use client";

import Heading from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

const RfqClient = ({ data, isPending }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Quotations" description="Manage your quotations." />
      </div>
      {isPending ? (
        <h2 className="text-center font-bold text-2xl p-5">Loading...</h2>
      ) : data?.length > 0 && (
        <DataTable searchKey="createdAt" columns={columns} data={data} />
      ) }
    </>
  );
};

export default RfqClient;

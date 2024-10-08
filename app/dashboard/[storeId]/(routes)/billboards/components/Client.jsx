"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {  columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

const BillboardClient = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Billboards are the main way to advertise your products and services. You can create a billboard by clicking on the button."
        />
        <Button
          onClick={() =>
            router.push(`/dashboard/${params.storeId}/billboards/new`)
          }
        >
          <Plus className="mr-2 h-4 w-4">Add New</Plus>
        </Button>
      </div>
      <Separator />
      <DataTable  columns={columns} data={data} />
      {/* <Heading
        title="API"
        description="API calls for Billboards. You can also use the endpoints to get the billboards of a specific store."
      />
      <Separator /> */}
      {/* <ApiList entityName="billboards" entityIdName="billboardId" /> */}
    </>
  );
};

export default BillboardClient;

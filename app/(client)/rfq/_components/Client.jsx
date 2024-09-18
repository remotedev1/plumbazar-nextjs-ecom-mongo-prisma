"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import {  useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";



const RfqClient = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="RFQ"
          description="Manage your RFQs."
        />

        <Button onClick={() => router.push(`/rfq/new`)} variant="destructive">
          <Plus className="mr-2 h-4 w-4"/>
        </Button>
      </div>
      <DataTable searchKey="createdAt" columns={columns} data={data} />
    </>
  );
};

export default RfqClient;

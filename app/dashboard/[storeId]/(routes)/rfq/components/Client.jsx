"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";



const RfqClient = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Quotations"
          description="Manage your quotations."
        />

       
      </div>
      <DataTable searchKey="createdAt" columns={columns} data={data} />
    </>
  );
};

export default RfqClient;

"use client";

// import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { ColorColumn, columns } from "./columns";

const ColorClient = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Color (${data.length})`}
          description="Manage Color for your store"
        />

        <Button onClick={() => router.push(`/dashboard/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4">Add New Size</Plus>
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title="API" description="API calls for Color" />
      <Separator />
      {/* <ApiList entityName="Color" entityIdName="colorId" /> */}
    </>
  );
};

export default ColorClient;

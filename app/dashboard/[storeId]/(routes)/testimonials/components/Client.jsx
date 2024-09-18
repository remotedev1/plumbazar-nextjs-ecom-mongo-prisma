"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

const TestimonialsClient = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Testimonials (${data.length})`}
          description="Manage testimonials for your store. 
          "
        />
        <Button
          onClick={() =>
            router.push(`/dashboard/${params.storeId}/testimonials/new`)
          }
        >
          <Plus className="mr-2 h-4 w-4">Add New</Plus>
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default TestimonialsClient;

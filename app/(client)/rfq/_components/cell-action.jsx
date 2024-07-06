"use client";

import { Button } from "@/components/ui/button";

import { Trash } from "lucide-react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Modal } from "@/components/ui/modal";
import { ViewDrawer } from "@/app/dashboard/[storeId]/(routes)/rfq/components/ViewDrawer";

export const CellAction = ({ data }) => {
  const router = useRouter();

  // loading state and modal state
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("Product Id copied to clipboard.");
  };

  const onCancel = async () => {
    try {
      setLoading(true);
      await axios.get(`/api/rfq/${data.id}/cancel`, { status: "CANCELLED" });
      router.refresh();
      toast.success("RFQ successfully canceled");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <Modal
        title="Are you sure ?"
        description="This action cannot be undone."
        isOpen={open}
        onClose={onCancel}
      >
        <div className="pt-6 space-x-2 flex items-center justify-end">
          <Button disabled={loading} variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={loading} variant="destructive" onClick={onCancel}>
            Edit
          </Button>
        </div>
      </Modal>
      <div className="flex space-x-2">
        <ViewDrawer data={data} />

        <Button onClick={() => setOpen(true)}>
          <Trash className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </>
  );
};

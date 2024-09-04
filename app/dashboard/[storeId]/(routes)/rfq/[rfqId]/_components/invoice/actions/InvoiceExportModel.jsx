"use client";

import { useState } from "react";

// ShadCn
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Components
import BaseButton from "@/components/dashboard/BaseButton";

// Context
import { useInvoiceContext } from "@/providers/invoice-provider";


const InvoiceExportModal = ({ children }) => {
  const [open, setOpen] = useState(false);

  const { invoicePdfLoading, exportInvoiceAs } = useInvoiceContext();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export the invoice</DialogTitle>
          <DialogDescription>
            Please select export option for your invoice
          </DialogDescription>
        </DialogHeader>

        {/* Export options here */}

        <div className="flex flex-wrap flex-row gap-5">
          <BaseButton
            tooltipLabel="Export Invoice as JSON"
            variant="outline"
            disabled={invoicePdfLoading}
            onClick={() => exportInvoiceAs("JSON")}
          >
            Export as JSON
          </BaseButton>
          <BaseButton
            tooltipLabel="Export Invoice as CSV"
            variant="outline"
            disabled={invoicePdfLoading}
            onClick={() => exportInvoiceAs("CSV")}
          >
            Export as CSV
          </BaseButton>

          <BaseButton
            tooltipLabel="Export Invoice as XML"
            variant="outline"
            disabled={invoicePdfLoading}
            onClick={() => exportInvoiceAs("XML")}
          >
            Export as XML
          </BaseButton>

          <BaseButton
            tooltipLabel="Export Invoice as XLSX"
            variant="outline"
            disabled={invoicePdfLoading}
            onClick={() => exportInvoiceAs("XLSX")}
          >
            Export as XLSX
          </BaseButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceExportModal;

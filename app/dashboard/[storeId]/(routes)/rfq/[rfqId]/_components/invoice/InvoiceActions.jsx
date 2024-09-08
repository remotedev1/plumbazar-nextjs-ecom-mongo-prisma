"use client";

// ShadCn
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Components
// import {
//     // PdfViewer,
//     // BaseButton,
//     // NewInvoiceAlert,
//     // InvoiceLoaderModal,
//     // InvoiceExportModal,
// } from "@/app/components";

// Contexts

// Icons
import { FileInput, Import, Save } from "lucide-react";
import { useInvoiceContext } from "@/providers/invoice-provider";
import BaseButton from "../BaseButton";
import PdfViewer from "./actions/PdfViewer";
import InvoiceExportModal from "./actions/InvoiceExportModel";

const InvoiceActions = ({ draftInvoiceData, rfq }) => {
  const { invoicePdfLoading, commitOrder, getApproval, generateInvoice } =
    useInvoiceContext();
  return (
    <div className={`xl:w-[45%]`}>
      <Card className="h-auto sticky top-0 px-2">
        <CardHeader>
          <CardTitle>ACTIONS</CardTitle>
          <CardDescription>Operations and preview</CardDescription>
        </CardHeader>

        <div className="flex flex-col flex-wrap items-center gap-2">
          {/* Load modal button */}
          {/* <InvoiceLoaderModal>
                            <BaseButton
                                variant="outline"
                                tooltipLabel="Open load invoice menu"
                                disabled={invoicePdfLoading}
                            >
                                <FolderUp />
                                Load Invoice
                            </BaseButton>
                        </InvoiceLoaderModal> */}

          <div className="flex flex-wrap gap-3">
            {/* New invoice button */}
            {/* <NewInvoiceAlert>
                            <BaseButton
                                variant="outline"
                                tooltipLabel="Get a new invoice form"
                                disabled={invoicePdfLoading}
                            >
                                <Plus />
                                New Invoice
                            </BaseButton>
                        </NewInvoiceAlert> */}
            {/* Generate pdf button */}

            {draftInvoiceData && draftInvoiceData?.status === "APPROVED" ? (
              <div className="flex flex-wrap gap-3">
                {/* Export modal button */}
                <h2>Approved by admin</h2>
                <InvoiceExportModal>
                  <BaseButton
                    variant="outline"
                    tooltipLabel="Open load invoice menu"
                    disabled={invoicePdfLoading}
                  >
                    <Import />
                    Export Invoice
                  </BaseButton>
                </InvoiceExportModal>
                <BaseButton
                  onClick={generateInvoice}
                  tooltipLabel="Generate your invoice"
                  loading={invoicePdfLoading}
                  loadingText="Generating your invoice"
                >
                  <FileInput />
                  Generate PDF
                </BaseButton>
              </div>
            ) : null}

{draftInvoiceData?.id && draftInvoiceData?.status === "CREATED" ? (
  <>
    <BaseButton
      type="submit"
      tooltipLabel="Update your invoice"
      disabled={invoicePdfLoading}
      loadingText="Updating your invoice"
      className="bg-blue-500"
    >
      <Save />
      Update
    </BaseButton>
    <BaseButton
      tooltipLabel="Get approval for your invoice"
      disabled={invoicePdfLoading}
      onClick={() => getApproval(draftInvoiceData?.id)}
      loadingText="Updating your invoice"
      className="bg-orange-600"
    >
      <Save />
      Get Approval
    </BaseButton>
  </>
) : draftInvoiceData?.status === "WAITING" ? (
  <h2>Waiting for approval</h2>
) : draftInvoiceData?.status !== "APPROVED" ? (
  <BaseButton
    type="submit"
    tooltipLabel="Save your invoice"
    disabled={invoicePdfLoading}
    loadingText="Saving your invoice"
    className="bg-blue-500"
  >
    <Save />
    Save
  </BaseButton>
) : null}

          </div>

          <div className="w-full">
            {/* Live preview and Final pdf */}
            <PdfViewer />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvoiceActions;

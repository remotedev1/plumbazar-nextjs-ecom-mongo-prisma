"use client";

// ShadCn
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//hooks
import { useInvoiceContext } from "@/providers/invoice-provider";
import { useSession } from "next-auth/react";

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

import BaseButton from "../BaseButton";
import PdfViewer from "./actions/PdfViewer";
import InvoiceExportModal from "./actions/InvoiceExportModel";

const InvoiceActions = ({ draftInvoiceData, rfq }) => {
  const { invoicePdfLoading, generatePdf, getApproval,postApproval } =
    useInvoiceContext();
  const {
    data: { user },
  } = useSession();


  return (
    <div className="w-[85%]">
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
                  onClick={generatePdf}
                  tooltipLabel="Generate your invoice"
                  loadingText="Generating your invoice"
                >
                  <FileInput />
                  Generate PDF
                </BaseButton>
              </div>
            ) : null}

            <>
            {draftInvoiceData?.status === "WAITING" && (
                <h2>Waiting for approval</h2>
              )}
              {(draftInvoiceData?.status === "CREATED" ||
                (draftInvoiceData?.status === "WAITING" &&
                  user.role !== "SALES")) && (
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
              )}

              {draftInvoiceData?.status === "CREATED" &&
              user?.role === "SALES" ? (
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
              ) : null}
             
            </>

            {/* Save button */}
            {!draftInvoiceData?.status && (
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
            )}
            { user?.role !== "SALES" && draftInvoiceData?.status === "WAITING" && (
              <BaseButton
                tooltipLabel="Approve your invoice"
                disabled={invoicePdfLoading}
                onClick={() => postApproval(draftInvoiceData?.id)}
                loadingText="Approve your invoice"
                className="bg-blue-500"
              >
                <Save />
                Approve
              </BaseButton>
            )}
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

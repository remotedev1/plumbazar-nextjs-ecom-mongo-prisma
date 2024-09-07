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
import { Button } from "@/components/ui/button";

const InvoiceActions = ({ draftInvoiceData, rfq }) => {
  const {
    invoicePdfLoading,
    saveInvoice,
    updateInvoice,
    commitOrder,
    generateInvoice,
  } = useInvoiceContext();
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

            {!!draftInvoiceData.status === "APPROVED" ? (
              <div className="flex flex-wrap gap-3">
                {/* Export modal button */}
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

            {draftInvoiceData.id ? (
              <BaseButton
                type="submit"
                tooltipLabel="update your invoice"
                disabled={invoicePdfLoading}
                onClick={() => updateInvoice(draftInvoiceData.id)}
                loadingText="updating your invoice"
                className="bg-blue-500"
              >
                <Save />
                Update
              </BaseButton>
            ) : (
              <BaseButton
                type="submit"
                tooltipLabel="save your invoice"
                disabled={invoicePdfLoading}
                onClick={() => saveInvoice()}
                loadingText="saving your invoice"
                className="bg-blue-500"
              >
                <Save />
                Save
              </BaseButton>
            )}

            {/* <BaseButton
              tooltipLabel="move to orders"
              disabled={invoicePdfLoading}
              onClick={() => commitOrder(draftInvoiceData.id)}
              loadingText="Committing your order"
              className="bg-orange-500"
            >
              <Save />
              order commit
            </BaseButton> */}
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

"use client";

// Debounce
import { useDebounce } from "use-debounce";

// RHF
import { useFormContext } from "react-hook-form";

// Components
import LivePreview from "./LivePreview";
import FinalPdf from "./FinalPdf";

// Contexts
import { useInvoiceContext } from "@/providers/invoice-provider";





const PdfViewer = () => {
    const { invoicePdf } = useInvoiceContext();

    const { watch } = useFormContext();

    const [debouncedWatch] = useDebounce(watch, 1000);
    const formValues = debouncedWatch();

    return (
        <div className="my-3">
            {invoicePdf.size == 0 ? (
                <LivePreview data={formValues} />
            ) : (
                <FinalPdf />
            )}
        </div>
    );
};

export default PdfViewer;

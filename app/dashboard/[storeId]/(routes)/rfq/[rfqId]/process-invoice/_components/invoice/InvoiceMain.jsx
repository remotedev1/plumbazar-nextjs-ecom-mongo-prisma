"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import { Form } from "@/components/ui/form";

// Components
import InvoiceActions from "./InvoiceActions";

// Context

// Types
import { useInvoiceContext } from "@/providers/invoice-provider";
import InvoiceForm from "./InvoiceForm";

const InvoiceMain = ({ rfq }) => {
    const { handleSubmit } = useFormContext();

    // Get the needed values from invoice context
    const { onFormSubmit,formValues } = useInvoiceContext();

    console.log(rfq)
    console.log(formValues)

    return (
        <>
            <Form {...useFormContext()}>
                <form
                    onSubmit={handleSubmit(onFormSubmit, (err) => {
                        console.log(err);
                    })}
                >
                    <div className="flex flex-wrap">
                        <InvoiceForm />
                        <InvoiceActions />
                    </div>
                </form>
            </Form>
        </>
    );
};

export default InvoiceMain;

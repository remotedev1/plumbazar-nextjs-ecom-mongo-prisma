"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import { Form } from "@/components/ui/form";

// Components
import {  InvoiceForm } from "@/app/components";

// Context

// Types
import { InvoiceType } from "@/types";
import { useInvoiceContext } from "@/providers/invoice-provider";

const InvoiceMain = () => {
    const { handleSubmit } = useFormContext();

    // Get the needed values from invoice context
    const { onFormSubmit } = useInvoiceContext();

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
                        {/* <InvoiceActions /> */}
                    </div>
                </form>
            </Form>
        </>
    );
};

export default InvoiceMain;

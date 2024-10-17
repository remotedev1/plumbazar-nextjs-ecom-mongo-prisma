"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import { Form } from "@/components/ui/form";

// Components
import InvoiceActions from "./InvoiceActions";

// Context
import { useInvoiceContext } from "@/providers/invoice-provider";
import InvoiceForm from "./InvoiceForm";
import { useEffect } from "react";

const InvoiceMain = ({ rfq, draftInvoiceData }) => {
  const { handleSubmit, setValue, reset, formState } = useFormContext();
  const { onFormSubmit, formValues } = useInvoiceContext();
  useEffect(() => {
    if (draftInvoiceData) {
      // Reset the form with draftInvoiceData if it exists
      reset({
        receiver: draftInvoiceData.receiver,
        details: {
          ...draftInvoiceData.details,
          rfqId: rfq.id,
          draftId: draftInvoiceData.id,
        },
      });
    } else if (rfq?.user) {
      // If no draftInvoiceData, but rfq.user.address exists, set form values based on user info
      const { id, name, email, address, phone } = rfq.user;
      setValue("receiver.customerId", id);
      setValue("receiver.name", name || "");
      setValue("receiver.address", address?.address || "");
      setValue("receiver.zip", address?.zip || "");
      setValue("receiver.city", address?.city || "");
      setValue("receiver.email", email || "");
      setValue("receiver.phone", rfq.phone || "");
      setValue("receiver.country", "India");
      setValue("details.rfqId", rfq.id);
    }
  }, [draftInvoiceData, rfq, reset, setValue]);

  return (
    <>
      <Form {...useFormContext()}>
        <form
          onSubmit={handleSubmit(onFormSubmit, (err) => {
            // console.log(err);
          })}
        >
          <div className="flex flex-wrap justify-center gap-5">
            <InvoiceForm />
            <InvoiceActions draftInvoiceData={draftInvoiceData} rfq={rfq} />
          </div>
        </form>
      </Form>
    </>
  );
};

export default InvoiceMain;

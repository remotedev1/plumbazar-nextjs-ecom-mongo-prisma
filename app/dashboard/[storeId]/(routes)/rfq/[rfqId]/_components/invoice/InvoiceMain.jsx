"use client";

// RHF
import { useFormContext, useForm } from "react-hook-form";

// ShadCn
import { Form } from "@/components/ui/form";

// Components
import InvoiceActions from "./InvoiceActions";

// Context
import { useInvoiceContext } from "@/providers/invoice-provider";
import InvoiceForm from "./InvoiceForm";
import { useEffect } from "react";

const InvoiceMain = ({ rfq, draftInvoiceData }) => {
  const { handleSubmit, setValue, reset } = useFormContext();
  const { onFormSubmit, formValues } = useInvoiceContext();


  useEffect(() => {
    if (draftInvoiceData) {
      // Reset the form with draftInvoiceData if it exists
      reset({
        receiver: draftInvoiceData.receiver,
        details: { ...draftInvoiceData.details, rfqId: rfq.id, draftId: draftInvoiceData.id },
      });
    } else if (rfq?.user?.address) {
      // If no draftInvoiceData, but rfq.user.address exists, set form values based on user info
      const { id, name, email, address } = rfq.user;
      const { address: addr, zip, city, phone } = address;

      setValue("receiver.customerId", id);
      setValue("receiver.name", name || "");
      setValue("receiver.address", addr || "");
      setValue("receiver.zip", zip || "");
      setValue("receiver.city", city || "");
      setValue("receiver.email", email || "");
      setValue("receiver.phone", phone || "");
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
          <div className="flex flex-wrap">
            <InvoiceForm />
            <InvoiceActions draftInvoiceData={draftInvoiceData} rfq={rfq} />
          </div>
        </form>
      </Form>
    </>
  );
};

export default InvoiceMain;

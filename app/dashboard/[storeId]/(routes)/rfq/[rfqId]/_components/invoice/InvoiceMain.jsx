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
  // Set default values when draftInvoiceData is available
  useEffect(() => {
    if (draftInvoiceData) {
      reset({
        receiver: draftInvoiceData.receiver,
        details: { ...draftInvoiceData.details, rfqId: rfq.id },
      });
    }
  }, [draftInvoiceData, reset]);




  useEffect(() => {
    if (!draftInvoiceData && rfq?.user?.address) {
      const { id, name, email, address } = rfq.user;
      if (address) {
        const { address: addr, zip, city, phone } = address;
        setValue("receiver.customerId", id);
        setValue("receiver.name", name || '');
        setValue("receiver.address", addr || '');
        setValue("receiver.zip", zip || '');
        setValue("receiver.city", city || '');
        setValue("receiver.email", email || '');
        setValue("receiver.phone", phone || '');
        setValue("receiver.country", "India");
      }
      setValue("details.rfqId", rfq.id);
    }
  }, [rfq, setValue, draftInvoiceData]);
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
            <InvoiceActions draftInvoiceData={draftInvoiceData} />
          </div>
        </form>
      </Form>
    </>
  );
};

export default InvoiceMain;

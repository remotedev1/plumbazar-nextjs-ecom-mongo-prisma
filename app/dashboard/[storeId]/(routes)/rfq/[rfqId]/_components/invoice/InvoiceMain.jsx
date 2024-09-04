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
        details: draftInvoiceData.details,
      });
    }
  }, [draftInvoiceData, reset]);

  useEffect(() => {
    if (!draftInvoiceData && rfq?.user?.address) {
      const { id, name, email } = rfq.user;
      const { address, zip, city, phone } = rfq.user.address;
      if (name) setValue("receiver.customerId", id);
      if (name) setValue("receiver.name", name);
      if (address) setValue("receiver.address", address);
      if (zip) setValue("receiver.zip", zip);
      if (city) setValue("receiver.city", city);
      if (email) setValue("receiver.email", email);
      if (phone) setValue("receiver.phone", phone);
      setValue("details.rfqId", rfq.id);
      setValue("receiver.country", "India");
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
            <InvoiceActions />
          </div>
        </form>
      </Form>
    </>
  );
};

export default InvoiceMain;

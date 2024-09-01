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
import { useEffect } from "react";

const InvoiceMain = ({ rfq }) => {
  const { handleSubmit, setValue } = useFormContext();

  // Get the needed values from invoice context
  const { onFormSubmit, formValues } = useInvoiceContext();
  useEffect(() => {
    if (rfq?.user?.address) {
      const { name, email } = rfq.user;
      const { address, zip, city, phone } = rfq.user.address;

      if (name) setValue("receiver.name", name);
      if (address) setValue("receiver.address", address);
      if (zip) setValue("receiver.zip", zip);
      if (city) setValue("receiver.city", city);
      if (email) setValue("receiver.email", email);
      if (phone) setValue("receiver.phone", phone);
      setValue("receiver.country", "India");
    }
  }, [rfq, setValue]);

  console.log(formValues);

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

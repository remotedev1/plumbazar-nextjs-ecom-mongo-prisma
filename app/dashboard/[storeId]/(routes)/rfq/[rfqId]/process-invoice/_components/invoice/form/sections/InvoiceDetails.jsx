"use client";

import { useFormContext } from "react-hook-form";
// Components
import DatePickerFormField from "../../../form-fields/DatePickerFormField";
import FormInput from "../../../form-fields/FormInput";
import Subheading from "../../../Subheading";
import { generateInvoiceNumber } from "@/lib/variables";
import { useEffect } from "react";
// import TemplateSelector from "../TemplateSelector";

const InvoiceDetails = () => {
  const { setValue } = useFormContext();

  // Set the default value for invoiceNumber when the component mounts
  useEffect(() => {
    const invoiceNumber = generateInvoiceNumber();
    setValue("details.invoiceNumber", invoiceNumber);
    setValue("details.invoiceDate", new Date());
  }, [setValue]);

  return (
    <section className="flex flex-col flex-wrap gap-5">
      <Subheading>Invoice Details:</Subheading>

      <div className="flex flex-row flex-wrap gap-5">
        <div className="flex flex-col gap-2">
          <FormInput
            name="details.invoiceNumber"
            label="invoiceNumber"
            placeholder="Invoice number"
          />

          <DatePickerFormField name="details.invoiceDate" label="issuedDate" />
        </div>

        {/* <div className="flex flex-col gap-2">
          <TemplateSelector />
        </div> */}
      </div>
    </section>
  );
};

export default InvoiceDetails;

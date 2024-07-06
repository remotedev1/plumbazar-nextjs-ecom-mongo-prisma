"use client";

// Components
import DatePickerFormField from "../../../form-fields/DatePickerFormField";
import FormFile from "../../../form-fields/FormFile";
import FormInput from "../../../form-fields/FormInput";
import Subheading from "../../../Subheading";
// import TemplateSelector from "../TemplateSelector";

const InvoiceDetails = () => {
  return (
    <section className="flex flex-col flex-wrap gap-5">
      <Subheading>heading:</Subheading>

      <div className="flex flex-row flex-wrap gap-5">
        <div className="flex flex-col gap-2">
          <FormFile
            name="details.invoiceLogo"
            label="label"
            placeholder="test"
          />

          <FormInput
            name="details.invoiceNumber"
            label="invoiceNumber"
            placeholder="Invoice number"
          />

          <DatePickerFormField
            name="details.invoiceDate"
            label="issuedDate"
          />

          <DatePickerFormField
            name="details.dueDate"
            label="dueDate"
          />

         
        </div>

        {/* <div className="flex flex-col gap-2">
          <TemplateSelector />
        </div> */}
      </div>
    </section>
  );
};

export default InvoiceDetails;

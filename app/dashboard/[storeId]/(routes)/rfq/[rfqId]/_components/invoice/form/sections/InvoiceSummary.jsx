"use client";

// Components
import RichTextEditor from "../../../form-fields/RichTextEditor";
import Subheading from "../../../Subheading";
import Charges from "../Charges";

const InvoiceSummary = () => {
  return (
    <section>
      <Subheading>Summary:</Subheading>
      <div className="p-5 max-w-lg mx-auto ">
        <div className="flex flex-col gap-5 ">
          <Charges />
          <RichTextEditor
            name="details.additionalNotes"
            label="Additional Notes"
            placeholder="Your additional notes"
          />
          <RichTextEditor
            name="details.tc"
            label="Terms & Conditions"
            placeholder="Your Terms & Conditions notes"
          />
          <RichTextEditor
            name="details.pc"
            label="Payments Terms"
            placeholder="Your Payments Terms notes"
          />
        </div>
      </div>
    </section>
  );
};

export default InvoiceSummary;

"use client";

// Components
import FormTextarea from "../../../form-fields/FormTextarea";
import Subheading from "../../../Subheading";
import Charges from "../Charges";

const InvoiceSummary = () => {
  return (
    <section>
      <Subheading>Summary:</Subheading>
      <div className="p-5 max-w-lg mx-auto ">
        <div className="flex flex-col gap-5 ">
          {/* Final charges */}
          <Charges />
          {/* Additional notes & Payment terms */}
          <FormTextarea
            name="details.additionalNotes"
            label="Additional notes"
            placeholder="Your additional notes"
          />
          <FormTextarea
            name="details.tc"
            label="Terms & conditions"
            placeholder="Terms & conditions"
          />
        </div>
      </div>
    </section>
  );
};

export default InvoiceSummary;

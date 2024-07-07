"use client";

// Components
import FormTextarea from "../../../form-fields/FormTextarea";
import Subheading from "../../../Subheading";
import Charges from "../Charges";

const InvoiceSummary = () => {
  return (
    <section>
      <Subheading>Summary:</Subheading>
      <div className="flex flex-wrap gap-x-5 gap-y-10">
        <div className="flex flex-col gap-3">
          {/* Additional notes & Payment terms */}
          <FormTextarea
            name="details.additionalNotes"
            label="additionalNotes"
            placeholder="Your additional notes"
          />
        </div>

        {/* Final charges */}
        <Charges />
      </div>
    </section>
  );
};

export default InvoiceSummary;

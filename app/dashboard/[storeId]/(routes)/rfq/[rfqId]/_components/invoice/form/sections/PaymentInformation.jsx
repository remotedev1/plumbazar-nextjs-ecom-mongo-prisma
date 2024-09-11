"use client";

// Components
import FormInput from "../../../form-fields/FormInput";
import FormTextarea from "../../../form-fields/FormTextarea";
import Subheading from "../../../Subheading";

const PaymentInformation = () => {
  return (
    <section>
      <Subheading>Payment Info:</Subheading>
      <div className="flex flex-wrap gap-10 mt-5">
        <FormInput
          name="details.paymentInformation.bankName"
          label="Bank Name"
          placeholder="Bank Name"
          vertical
        />
        <FormInput
          name="details.paymentInformation.accountName"
          label="Account Name"
          placeholder="Account Name"
          vertical
        />
        <FormInput
          name="details.paymentInformation.accountNumber"
          label="Account Number"
          placeholder="Account Number"
          vertical
        />
        <FormInput
          name="details.paymentInformation.transactionId"
          label="Transaction Id"
          placeholder="Transaction Id"
          vertical
        />
          <FormTextarea
            name="details.paymentInformation.ptc"
            label="Payments Terms & conditions"
            placeholder="Payments Terms & conditions"
          />
      </div>
    </section>
  );
};

export default PaymentInformation;
